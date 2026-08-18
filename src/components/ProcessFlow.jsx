import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════
   PROCESS FLOW — curved 3D scroll sequence

   The six stages were a vertical stack of glass cards down a
   timeline. Correct, complete, and completely flat: nothing about
   it made a visitor feel the project moving through stages.

   Here the stages sit on a curve in three dimensions. The track
   rotates around Y as you scroll, so each card swings toward the
   viewer, holds the front position while it is readable, then
   turns away as the next one arrives. Depth does the work that a
   scroll animation on a flat card cannot: the stage you are
   reading is physically nearest, and the ones after it are
   visibly still to come.

   Implementation notes
   --------------------
   - Perspective lives on the stage wrapper, transform-style
     preserve-3d on the track, so the cards are real 3D children
     rather than scaled rectangles.
   - Scroll progress is measured with rAF + getBoundingClientRect
     for the same reason ScrollPanels does it: Lenis drives the
     scroll on this site and framer's own scroll container
     resolution does not survive it.
   - Anyone who asked for reduced motion, and any screen too
     narrow to hold a curve, gets a plain vertical list. The DOM
     is identical in both, so the copy is always in the page.
   ═══════════════════════════════════════════════════════════ */

const EASE = [0.16, 1, 0.3, 1];

function useSectionProgress(ref) {
  const progress = useMotionValue(0);

  useEffect(() => {
    let raf;
    const tick = () => {
      const el = ref.current;
      if (el) {
        const r = el.getBoundingClientRect();
        const travel = r.height - window.innerHeight;
        const next = travel > 0 ? Math.min(1, Math.max(0, -r.top / travel)) : 0;
        if (Math.abs(next - progress.get()) > 0.0001) progress.set(next);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ref, progress]);

  return progress;
}

/* Cards are placed around the inside of a cylinder. RADIUS sets
   how deep the curve runs — larger reads as a gentler arc, and
   too large flattens the effect back to a carousel.

   RADIUS and SPREAD have to be read together. The arc a card
   occupies is RADIUS × SPREAD in radians; if that comes out
   narrower than the card itself, neighbours overlap and the
   whole row reads as a stack instead of a sequence. At 1080 and
   40° the arc is ~754px against a 560px card, which leaves a
   real gap on both sides. */
const RADIUS = 1080;
const SPREAD = 40;

function Card({ step, index, total, progress }) {
  /* Where this card sits on the cylinder, in degrees, at rest. */
  const spread = SPREAD;
  const base = index * spread;

  /* The track's own rotation, driven by scroll. */
  const rotation = useTransform(progress, [0, 1], [0, -spread * (total - 1)]);

  /* Front-most when the track rotation cancels this card's offset. */
  const distance = useTransform(rotation, (r) => Math.abs(r + base));
  const opacity = useTransform(distance, [0, spread * 0.9, spread * 2], [1, 0.42, 0.12]);
  const scale = useTransform(distance, [0, spread * 2], [1, 0.9]);

  return (
    /* Placement and animation are deliberately on two different
       elements. Framer writes its own `transform` for scale, which
       silently overwrites an inline transform string on the same
       node — the cards ended up spinning in place instead of sitting
       on the curve. The outer node owns position in 3D and never
       animates; the inner node owns opacity and scale and never
       positions. */
    <article
      id={`step-${step.step}`}
      style={{
        position: 'absolute',
        top: '50%', left: '50%',
        width: 'min(560px, 46vw)',
        marginLeft: 'min(-280px, -23vw)',
        marginTop: '-200px',
        transformStyle: 'preserve-3d',
        transform: `rotateY(${base}deg) translateZ(${RADIUS}px)`,
        scrollMarginTop: '110px',
      }}
    >
      <motion.div
        style={{ opacity, scale }}
      >
      <div
        style={{
          position: 'relative',
          padding: 'clamp(28px, 3vw, 40px)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid rgba(34,197,94,0.2)',
          background: 'linear-gradient(160deg, rgba(20,28,26,0.94) 0%, rgba(11,15,14,0.96) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 40px 90px rgba(0,0,0,0.66), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
          <span
            style={{
              fontFamily: 'var(--font-display)', fontSize: '2.75rem', fontWeight: 600, lineHeight: 1,
              color: 'transparent', WebkitTextStroke: '1px rgba(34,197,94,0.6)', letterSpacing: '-0.02em',
            }}
          >
            {step.step}
          </span>
          <span style={{ height: '1px', flex: 1, background: 'linear-gradient(to right, rgba(34,197,94,0.5), transparent)' }} />
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(1.375rem, 2.4vw, 1.875rem)',
            fontWeight: 600, color: '#fff', marginBottom: '14px', letterSpacing: '-0.025em',
          }}
        >
          {step.title}
        </h2>

        <p style={{ color: 'rgba(255,255,255,0.66)', lineHeight: 1.78, fontSize: '0.9688rem', marginBottom: '12px' }}>
          {step.description}
        </p>

        {step.detail && (
          <p style={{ color: 'rgba(255,255,255,0.46)', lineHeight: 1.75, fontSize: '0.875rem', marginBottom: '20px' }}>
            {step.detail}
          </p>
        )}

        {step.outputs && (
          <>
            <p
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.625rem', letterSpacing: '0.16em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.44)', marginBottom: '11px',
              }}
            >
              What you receive
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
              {step.outputs.map((o) => (
                <span
                  key={o}
                  style={{
                    padding: '5px 13px', borderRadius: 'var(--radius-full)',
                    border: '1px solid rgba(34,197,94,0.2)', background: 'rgba(34,197,94,0.05)',
                    fontSize: '0.7188rem', color: 'var(--color-primary)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {o}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
      </motion.div>
    </article>
  );
}

/* ─── Flat fallback ───────────────────────────────────── */
function FlatList({ steps }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {steps.map((step) => (
        <article
          key={step.step}
          id={`step-${step.step}`}
          style={{
            padding: 'clamp(24px, 4vw, 34px)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid rgba(34,197,94,0.16)',
            background: 'rgba(20,28,26,0.6)',
            scrollMarginTop: '110px',
          }}
        >
          <span
            style={{
              display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.8125rem',
              color: 'var(--color-primary)', marginBottom: '14px', letterSpacing: '0.1em',
            }}
          >
            {step.step}
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', fontWeight: 600, color: '#fff', marginBottom: '12px' }}>
            {step.title}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.64)', lineHeight: 1.78, fontSize: '0.9375rem', marginBottom: '10px' }}>
            {step.description}
          </p>
          {step.detail && (
            <p style={{ color: 'rgba(255,255,255,0.46)', lineHeight: 1.75, fontSize: '0.875rem', marginBottom: '18px' }}>
              {step.detail}
            </p>
          )}
          {step.outputs && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
              {step.outputs.map((o) => (
                <span
                  key={o}
                  style={{
                    padding: '5px 13px', borderRadius: 'var(--radius-full)',
                    border: '1px solid rgba(34,197,94,0.2)', background: 'rgba(34,197,94,0.05)',
                    fontSize: '0.7188rem', color: 'var(--color-primary)', fontFamily: 'var(--font-mono)',
                  }}
                >
                  {o}
                </span>
              ))}
            </div>
          )}
        </article>
      ))}
    </div>
  );
}

export default function ProcessFlow({ steps = [], image, eyebrow = 'The process', title, accent }) {
  const wrapRef = useRef(null);
  const [flat, setFlat] = useState(true);
  const n = steps.length;

  useEffect(() => {
    const narrow = window.matchMedia('(max-width: 1024px)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setFlat(narrow.matches || reduced.matches);
    sync();
    narrow.addEventListener('change', sync);
    reduced.addEventListener('change', sync);
    return () => {
      narrow.removeEventListener('change', sync);
      reduced.removeEventListener('change', sync);
    };
  }, []);

  const progress = useSectionProgress(wrapRef);
  const spread = SPREAD;
  const rawRotation = useTransform(progress, [0, 1], [0, -spread * (n - 1)]);
  const rotation = useSpring(rawRotation, { stiffness: 90, damping: 26, mass: 0.35 });

  /* The backdrop drifts and tilts against the cards, which is most
     of what sells the depth — a static background behind a rotating
     object reads as a sticker, not a space. */
  const bgShift = useTransform(progress, [0, 1], ['-6%', '6%']);
  const bgTilt = useTransform(rotation, (r) => `rotateY(${r * 0.12}deg) scale(1.18)`);
  const railWidth = useTransform(progress, [0, 1], ['0%', '100%']);

  if (!n) return null;

  if (flat) {
    return (
      <section style={{ position: 'relative', background: 'var(--bg)', padding: 'var(--space-4xl) 0', overflow: 'hidden' }}>
        {image && (
          <span
            aria-hidden="true"
            style={{
              position: 'absolute', inset: 0, zIndex: 0,
              backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.16,
            }}
          />
        )}
        <span
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background: 'linear-gradient(to bottom, var(--bg) 0%, rgba(11,15,14,0.86) 30%, rgba(11,15,14,0.86) 70%, var(--bg) 100%)',
          }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <FlatList steps={steps} />
        </div>
      </section>
    );
  }

  return (
    <section
      ref={wrapRef}
      style={{ position: 'relative', background: 'var(--bg)', height: `${n * 88}vh` }}
    >
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        {/* Backdrop */}
        {image && (
          <motion.span
            aria-hidden="true"
            style={{
              position: 'absolute', inset: '-10%', zIndex: 0,
              backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center',
              opacity: 0.26, x: bgShift, transform: bgTilt,
            }}
          />
        )}
        <span
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background:
              'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(11,15,14,0.55) 0%, rgba(11,15,14,0.93) 68%, var(--bg) 100%)',
          }}
        />

        {/* Heading */}
        <div
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, zIndex: 4,
            padding: 'clamp(72px, 10vh, 108px) 0 0', pointerEvents: 'none',
            background: 'linear-gradient(to bottom, rgba(11,15,14,0.9) 0%, rgba(11,15,14,0.5) 60%, transparent 100%)',
          }}
        >
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '14px' }}>
              <span style={{ height: '1px', width: '40px', background: 'var(--color-primary)', opacity: 0.6 }} />
              <span
                className="text-caption"
                style={{ color: 'var(--color-primary)', letterSpacing: '0.18em', fontFamily: 'var(--font-mono)' }}
              >
                {eyebrow}
              </span>
            </div>
            <h2 className="text-heading-3" style={{ color: '#fff', margin: 0, maxWidth: '620px', textShadow: '0 2px 24px rgba(0,0,0,0.7)' }}>
              {title}{' '}
              {accent && <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'rgba(255,255,255,0.6)' }}>{accent}</span>}
            </h2>
          </div>
        </div>

        {/* 3D stage */}
        <div
          style={{
            position: 'absolute', inset: 0, zIndex: 2,
            perspective: '1400px',
            perspectiveOrigin: '50% 50%',
          }}
        >
          {/* Pull the cylinder back so the front card sits at a
              comfortable reading distance. This lives on a plain
              wrapper: framer orders its transforms translate → scale
              → rotate, which would apply the push-back before the
              rotation and flatten the whole curve. */}
          <div style={{ position: 'absolute', inset: 0, transformStyle: 'preserve-3d', transform: `translateZ(-${RADIUS}px)` }}>
            <motion.div
              style={{ position: 'absolute', inset: 0, transformStyle: 'preserve-3d', rotateY: rotation }}
            >
              {steps.map((step, i) => (
                <Card key={step.step} step={step} index={i} total={n} progress={progress} />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Stage markers */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', bottom: '38px', left: 0, right: 0, zIndex: 5,
            display: 'flex', justifyContent: 'center', gap: '10px',
          }}
        >
          {steps.map((s) => (
            <span
              key={s.step}
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.625rem',
                letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)',
              }}
            >
              {s.step}
            </span>
          ))}
        </div>

        <div
          aria-hidden="true"
          style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 5, height: '3px', background: 'rgba(255,255,255,0.07)' }}
        >
          <motion.div
            style={{ height: '100%', width: railWidth, background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))' }}
          />
        </div>
      </div>
    </section>
  );
}
