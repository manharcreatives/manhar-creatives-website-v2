import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Rich from './Rich';
import { Eyebrow } from './PageKit';

/* ═══════════════════════════════════════════════════════════
   SCROLL PANELS — pinned horizontal sequence

   A six-item deliverables grid is the single most skipped block
   on a services page: six equal cards give the eye no reason to
   stop at any one of them. Pinning the section and moving the
   panels sideways turns the same six items into a sequence the
   visitor walks through — each one gets the full screen, its own
   image and roughly a second of attention instead of a glance.

   How the pin works
   -----------------
   The outer wrapper is N screens tall. Inside it a sticky box
   holds the viewport at 100vh while that height scrolls past, and
   the track inside is translated horizontally in proportion to
   how far through the wrapper we are. Vertical scroll distance
   becomes horizontal travel; nothing is scroll-jacked, so a fast
   flick still moves at the speed the visitor expects.

   position:sticky needs no ancestor to be a scroll container —
   see the `overflow-x: clip` note on #root in index.css, which is
   what makes this work rather than silently degrading.

   Falls back to a snap-scrolling swipe rail on narrow screens and
   for anyone who asked for reduced motion. Both modes render the
   identical DOM, so the copy is in the page for search engines
   either way.
   ═══════════════════════════════════════════════════════════ */

const EASE = [0.16, 1, 0.3, 1];

/* ─── Scroll progress through an element ──────────────────
   Framer's useScroll resolves its own scroll container, and on
   this site that resolution is unreliable: Lenis drives scrolling
   and #root carries an overflow value, which between them left
   the progress value pinned at zero — the section stuck, the
   panels never moved.

   So progress is measured the same way useInViewLenis already
   measures visibility in this codebase: one rAF loop reading
   getBoundingClientRect. Whatever moves the page — Lenis, a
   trackpad, a keyboard, an anchor jump — this reads the truth.
───────────────────────────────────────────────────────── */
function useSectionProgress(ref) {
  const progress = useMotionValue(0);

  useEffect(() => {
    let raf;
    const tick = () => {
      const el = ref.current;
      if (el) {
        const r = el.getBoundingClientRect();
        const travel = r.height - window.innerHeight;

        /* Outside the pinned range the value is clamped rather than
           left stale, so re-entering the section from either end
           starts from the correct panel. */
        const next =
          travel > 0 ? Math.min(1, Math.max(0, -r.top / travel)) : 0;

        if (Math.abs(next - progress.get()) > 0.0001) progress.set(next);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ref, progress]);

  return progress;
}

/* Per-panel colour wash. The brief was explicitly "sab kuch green
   green mat karna" — so the accent stays for structure (index,
   rules, active progress) while each panel gets its own cool tint
   underneath the photograph. Reads as one system, six moods. */
const TINTS = [
  'linear-gradient(120deg, rgba(11,15,14,0.94) 0%, rgba(11,15,14,0.62) 46%, rgba(34,197,94,0.10) 100%)',
  'linear-gradient(120deg, rgba(9,13,20,0.94) 0%, rgba(12,17,24,0.60) 46%, rgba(56,132,255,0.12) 100%)',
  'linear-gradient(120deg, rgba(14,12,18,0.94) 0%, rgba(16,14,22,0.60) 46%, rgba(168,120,255,0.11) 100%)',
  'linear-gradient(120deg, rgba(16,13,10,0.94) 0%, rgba(20,16,12,0.60) 46%, rgba(255,168,76,0.11) 100%)',
  'linear-gradient(120deg, rgba(10,16,17,0.94) 0%, rgba(12,19,20,0.60) 46%, rgba(45,212,191,0.12) 100%)',
  'linear-gradient(120deg, rgba(15,12,14,0.94) 0%, rgba(18,14,17,0.60) 46%, rgba(244,114,182,0.10) 100%)',
];

function PanelBody({ panel, index, total, compact = false }) {
  return (
    <div
      style={{
        position: 'relative', zIndex: 2,
        maxWidth: compact ? '100%' : '620px',
        padding: compact ? '30px 26px 34px' : '0',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: compact ? '18px' : '26px' }}>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: compact ? '2rem' : 'clamp(2.5rem, 4vw, 3.75rem)',
            fontWeight: 600, lineHeight: 1,
            color: 'transparent',
            WebkitTextStroke: '1px rgba(255,255,255,0.42)',
            letterSpacing: '-0.02em',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <span style={{ height: '1px', width: compact ? '28px' : '52px', background: 'var(--color-primary)', opacity: 0.7 }} />
        <span
          style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.44)',
          }}
        >
          {String(total).padStart(2, '0')} steps
        </span>
      </div>

      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: compact ? '1.5rem' : 'clamp(1.875rem, 3.2vw, 2.75rem)',
          fontWeight: 600, lineHeight: 1.14, letterSpacing: '-0.025em',
          color: '#fff', marginBottom: compact ? '14px' : '20px',
        }}
      >
        {panel.title}
      </h3>

      <Rich
        as="p"
        text={panel.desc}
        style={{
          fontSize: compact ? '0.9375rem' : '1.0625rem',
          color: 'rgba(255,255,255,0.66)', lineHeight: 1.8,
          marginBottom: panel.points?.length ? (compact ? '18px' : '28px') : 0,
        }}
      />

      {panel.points?.length > 0 && (
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '11px' }}>
          {panel.points.map((pt) => (
            <li key={pt} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span
                aria-hidden="true"
                style={{
                  flexShrink: 0, marginTop: '8px', width: '5px', height: '5px', borderRadius: '50%',
                  background: 'var(--color-primary)', boxShadow: '0 0 10px rgba(34,197,94,0.6)',
                }}
              />
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: compact ? '0.875rem' : '0.9375rem', lineHeight: 1.65 }}>
                {pt}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function PanelMedia({ panel, index }) {
  return (
    <>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: `url(${panel.image})`,
          backgroundSize: 'cover',
          backgroundPosition: panel.focal || 'center',
        }}
      />
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 1, background: TINTS[index % TINTS.length] }} />
      {/* Vertical falloff keeps the copy legible over a busy photograph
          without flattening the image into a grey slab. */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(to top, rgba(11,15,14,0.78) 0%, transparent 42%)',
        }}
      />
    </>
  );
}

export default function ScrollPanels({ panels = [], eyebrow, title, accent, subtitle, id }) {
  const wrapRef = useRef(null);
  const [swipe, setSwipe] = useState(true);   /* assume the safe mode until measured */
  const n = panels.length;

  useEffect(() => {
    const narrow = window.matchMedia('(max-width: 1024px)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setSwipe(narrow.matches || reduced.matches);
    sync();
    narrow.addEventListener('change', sync);
    reduced.addEventListener('change', sync);
    return () => {
      narrow.removeEventListener('change', sync);
      reduced.removeEventListener('change', sync);
    };
  }, []);

  const scrollYProgress = useSectionProgress(wrapRef);

  /* Viewport width is read into state rather than used as a `vw`
     unit so the travel distance is a plain number — motion values
     interpolate numbers exactly, and a resize recomputes it. */
  const [vw, setVw] = useState(typeof window === 'undefined' ? 1440 : window.innerWidth);
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* Travel is (n-1) screens, so the last panel lands flush. */
  const raw = useTransform(scrollYProgress, [0, 1], [0, -(n - 1) * vw]);
  const x = useSpring(raw, { stiffness: 110, damping: 28, mass: 0.32 });
  const progress = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  if (!n) return null;

  /* ── Narrow / reduced-motion: snap rail ── */
  if (swipe) {
    return (
      <section id={id} style={{ position: 'relative', background: 'var(--bg)', padding: 'var(--space-4xl) 0', overflow: 'hidden' }}>
        <div className="container" style={{ marginBottom: '36px' }}>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h2 className="text-heading-2" style={{ color: '#fff', marginBottom: subtitle ? '16px' : 0, maxWidth: '720px' }}>
            {title}{' '}
            {accent && <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'rgba(255,255,255,0.55)' }}>{accent}</span>}
          </h2>
          {subtitle && (
            <Rich as="p" text={subtitle} style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem', lineHeight: 1.75, maxWidth: '620px' }} />
          )}
        </div>

        <div
          className="mc-panel-rail"
          style={{
            display: 'flex', gap: '16px', overflowX: 'auto', scrollSnapType: 'x mandatory',
            padding: '0 24px 20px', WebkitOverflowScrolling: 'touch',
          }}
        >
          {panels.map((panel, i) => (
            <article
              key={panel.title}
              style={{
                position: 'relative', flex: '0 0 84vw', maxWidth: '460px',
                minHeight: '480px', borderRadius: 'var(--radius-xl)', overflow: 'hidden',
                border: '1px solid var(--border-subtle)', scrollSnapAlign: 'center',
                display: 'flex', alignItems: 'flex-end',
              }}
            >
              <PanelMedia panel={panel} index={i} />
              <PanelBody panel={panel} index={i} total={n} compact />
            </article>
          ))}
        </div>
      </section>
    );
  }

  /* ── Desktop: pinned horizontal sequence ── */
  return (
    <section
      id={id}
      ref={wrapRef}
      /* Scroll distance per panel. At 92vh the six panels cost five
         and a half screens on their own — nearly half the page — and
         the section starts to feel like a detour rather than a beat.
         62vh still gives each panel a comfortable, readable dwell. */
      style={{ position: 'relative', background: 'var(--bg)', height: `${n * 62}vh` }}
    >
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        {/* Heading stays put while the panels move under it — it is
            the one fixed reference point in a moving section. */}
        <div
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, zIndex: 4,
            padding: 'clamp(70px, 9vh, 104px) 0 clamp(30px, 5vh, 56px)',
            background: 'linear-gradient(to bottom, rgba(11,15,14,0.92) 0%, rgba(11,15,14,0.74) 38%, rgba(11,15,14,0.34) 72%, transparent 100%)',
            pointerEvents: 'none',
          }}
        >
          <div className="container">
            {eyebrow && <Eyebrow style={{ marginBottom: '14px' }}>{eyebrow}</Eyebrow>}
            <h2
              className="text-heading-3"
              style={{ color: '#fff', margin: 0, maxWidth: '640px', textShadow: '0 2px 24px rgba(0,0,0,0.6)' }}
            >
              {title}{' '}
              {accent && <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'rgba(255,255,255,0.6)' }}>{accent}</span>}
            </h2>
          </div>
        </div>

        <motion.div style={{ display: 'flex', width: `${n * 100}vw`, height: '100%', x }}>
          {panels.map((panel, i) => (
            <article
              key={panel.title}
              style={{
                position: 'relative', width: '100vw', height: '100%', flexShrink: 0,
                display: 'flex', alignItems: 'center',
                borderRight: i < n - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}
            >
              <PanelMedia panel={panel} index={i} />
              <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '90px' }}>
                <PanelBody panel={panel} index={i} total={n} />
              </div>
            </article>
          ))}
        </motion.div>

        {/* Progress rail — tells the visitor the section is finite,
            which is the thing a pinned section otherwise hides. */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 5,
            height: '3px', background: 'rgba(255,255,255,0.07)',
          }}
        >
          <motion.div style={{ height: '100%', width: progress, background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))' }} />
        </div>
      </div>
    </section>
  );
}
