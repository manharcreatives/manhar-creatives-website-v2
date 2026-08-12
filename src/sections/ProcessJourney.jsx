import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '../components/TextReveal';
import { PROCESS_STEPS } from '../utils/constants';

const PROCESS_DATA = PROCESS_STEPS.map((step, index) => {
  const images = [
    '/images/process/discovery.webp',
    '/images/process/research.webp',
    '/images/process/planning.webp',
    '/images/process/design-dev.webp',
    '/images/process/review.webp',
    '/images/process/delivery.webp',
  ];
  return { ...step, image: images[index] };
});

const imageVariants = {
  hidden:  { opacity: 0, scale: 0.88, x: -20 },
  visible: { opacity: 1, scale: 1,    x: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, scale: 0.92, x: 20,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
};

const zoomVariants = {
  animate: {
    scale: [1, 1.06, 1],
    transition: { duration: 9, repeat: Infinity, ease: 'easeInOut' },
  },
};

const IMAGE_H_VH = 52; // image height as % of viewport height

export default function ProcessJourney() {
  const sectionRef  = useRef(null);
  const rightColRef = useRef(null);
  const stepRefs    = useRef([]);
  const rafRef      = useRef(null);

  const [hoveredIndex,  setHoveredIndex ] = useState(null);
  const [imageTopPx,    setImageTopPx   ] = useState(0);
  const [panelWidth,    setPanelWidth   ] = useState(0);
  const [sectionActive, setSectionActive] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth <= 900
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 900);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // live-updated clip boundaries (section top/bottom in viewport px)
  const [clipTop,    setClipTop   ] = useState(0);
  const [clipBottom, setClipBottom] = useState(
    typeof window === 'undefined' ? 900 : window.innerHeight
  );

  // ── IntersectionObserver: show/hide panel ──────────────────
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => setSectionActive(e.isIntersecting),
      { threshold: 0.05 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // ── Measure: width of left column (mirrors right col start) ─
  useEffect(() => {
    const measure = () => {
      if (!rightColRef.current) return;
      const r = rightColRef.current.getBoundingClientRect();
      setPanelWidth(r.left);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // ── Master RAF: update clip bounds + image position ─────────
  useEffect(() => {
    const tick = () => {
      // 1. Update section clip bounds
      if (sectionRef.current) {
        const sr = sectionRef.current.getBoundingClientRect();
        setClipTop(   Math.max(0,                   sr.top));
        setClipBottom(Math.min(window.innerHeight,   sr.bottom));
      }

      // 2. Update image vertical position to follow hovered step
      if (hoveredIndex !== null) {
        const el = stepRefs.current[hoveredIndex];
        if (el && sectionRef.current) {
          const sr       = sectionRef.current.getBoundingClientRect();
          const imgH     = window.innerHeight * (IMAGE_H_VH / 100);
          const rect     = el.getBoundingClientRect();
          const center   = rect.top + rect.height / 2;
          const ideal    = center - imgH / 2;

          // clamp: image must stay inside section's visible area
          const minTop   = Math.max(0,                        sr.top);
          const maxTop   = Math.min(window.innerHeight - imgH, sr.bottom - imgH);
          const clamped  = Math.max(minTop, Math.min(maxTop, ideal));

          setImageTopPx(clamped);
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [hoveredIndex]); // re-run when hover changes

  return (
    <section
      ref={sectionRef}
      id="process"
      style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Background Image for Header */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '650px', zIndex: 0,
        backgroundImage: 'url(/images/backgrounds/process-bg.webp)',
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: 0.2,
      }} />
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '650px', zIndex: 1,
        background: 'linear-gradient(to bottom, var(--bg) 0%, transparent 30%, transparent 70%, var(--bg) 100%)',
      }} />

      {/* ══ FIXED IMAGE PANEL — only on hover, clipped to section ══ */}
      <AnimatePresence>
        {sectionActive && panelWidth > 60 && hoveredIndex !== null && (
          <motion.div
            key="img-panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              left: 0,
              top: 0,
              width: panelWidth,
              height: '100vh',
              zIndex: 40,
              pointerEvents: 'none',
              // hard-clip: image is physically invisible outside section
              clipPath: `inset(${clipTop}px 0px ${(typeof window === 'undefined' ? 900 : window.innerHeight) - clipBottom}px 0px)`,
            }}
          >
            {/* image box — spring-animates to follow hovered phase */}
            <motion.div
              animate={{ y: imageTopPx }}
              transition={{ type: 'spring', stiffness: 110, damping: 20, mass: 0.9 }}
              style={{
                position: 'absolute',
                top: 0,
                left:  'clamp(24px, 6vw, 80px)',
                right: '32px',
                height: `${IMAGE_H_VH}vh`,
                borderRadius: '10px',
                overflow: 'hidden',
              }}
            >
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={hoveredIndex}
                  variants={imageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  style={{ position: 'absolute', inset: 0 }}
                >
                  <motion.div
                    variants={zoomVariants}
                    animate="animate"
                    style={{ width: '100%', height: '100%' }}
                  >
                    <img
                      src={PROCESS_DATA[hoveredIndex].image}
                      alt={PROCESS_DATA[hoveredIndex].title}
                      loading="lazy"
                      decoding="async"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </motion.div>

                  {/* bottom label */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    padding: '48px 28px 28px',
                    background: 'linear-gradient(to top, rgba(11,15,14,0.9) 0%, transparent 100%)',
                  }}>
                    <div style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                      letterSpacing: '0.22em', color: 'var(--color-primary)', marginBottom: '6px',
                    }}>
                      PHASE {PROCESS_DATA[hoveredIndex].step}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-display)', fontSize: '1.4rem',
                      fontWeight: 600, color: '#fff', letterSpacing: '-0.02em',
                    }}>
                      {PROCESS_DATA[hoveredIndex].title}
                    </div>
                  </div>

                  {/* right edge vignette */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to right, transparent 65%, rgba(11,15,14,0.45))',
                  }} />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ HEADER ════════════════════════════════════════════ */}
      <div className="container" style={{ paddingTop: '160px', paddingBottom: '80px', position: 'relative', zIndex: 2 }}>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ height: '1px', width: '40px', background: 'var(--color-primary)' }} />
            <span className="text-caption" style={{ color: 'var(--color-primary)', letterSpacing: '0.15em' }}>
              OUR METHOD
            </span>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 6vw, 5.5rem)',
            fontWeight: 600, lineHeight: 1.1, marginBottom: '32px',
            letterSpacing: '-0.02em', color: '#fff', maxWidth: '900px',
          }}>
            From strategy<br />
            to execution,<br />
            <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.6)' }}>
              with purpose.
            </span>
          </h2>
        </FadeIn>
      </div>

      {/* ══ TWO-COLUMN LAYOUT ════════════════════════════════ */}
      <div className="process-grid">
        {/* Left spacer — empty space reserved for the fixed panel */}
        <div className="process-left-spacer" aria-hidden="true" />

        {/* Right: scrollable phases */}
        <div
          ref={rightColRef}
          className="process-right-col"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {PROCESS_DATA.map((step, i) => {
            const active = isMobile ? (selectedIndex !== null && selectedIndex === i) : hoveredIndex === i;
            return (
              <div
                key={step.step}
                ref={el => { stepRefs.current[i] = el; }}
                className="process-step"
                onMouseEnter={() => { if (!isMobile) setHoveredIndex(i); }}
                onClick={() => { if (isMobile) { setSelectedIndex(i); stepRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' }); } }}
                style={{
                  cursor: 'pointer',
                  minHeight: isMobile ? 'auto' : '40vh',
                  paddingTop: isMobile ? '36px' : '0',
                  paddingBottom: isMobile ? '36px' : '0',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: isMobile ? 'flex-start' : 'center',
                  opacity: isMobile ? 1 : (hoveredIndex === null ? 0.6 : (active ? 1 : 0.2)),
                  transition: 'opacity 0.4s ease, border-color 0.3s ease',
                  paddingLeft: '20px',
                  borderLeft: `2px solid ${active ? 'var(--color-primary)' : (isMobile ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.08)')}`,
                  position: 'relative',
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: isMobile ? '0.75rem' : '1.25rem',
                  letterSpacing: isMobile ? '0.18em' : '0',
                  color: isMobile ? 'var(--color-primary)' : (active ? 'var(--color-primary)' : 'var(--text-muted)'),
                  marginBottom: '12px',
                }}>
                  PHASE {step.step}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: isMobile ? 'clamp(1.6rem, 7vw, 2.2rem)' : 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 600,
                  color: isMobile ? '#fff' : (active ? '#fff' : 'rgba(255,255,255,0.4)'),
                  marginBottom: isMobile ? '14px' : '24px', lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  transition: 'color 0.4s ease',
                }}>
                  {step.title}
                </h3>

                {/* Mobile image — shown between title and description */}
                {isMobile && (
                  <div
                    style={{
                      position: 'relative',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      marginBottom: '16px',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                      lineHeight: 0,
                      width: '100%',
                    }}
                  >
                    <img
                      src={step.image}
                      alt={step.title}
                      loading="lazy"
                      decoding="async"
                      style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        borderRadius: '10px',
                      }}
                    />
                  </div>
                )}

                <p style={{
                  color: isMobile ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.7)',
                  fontSize: isMobile ? '0.975rem' : '1.125rem', lineHeight: 1.7, maxWidth: '480px',
                }}>
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        /* ── Process Journey Layout ── */
        .process-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 clamp(24px, 3vw, 48px);
          position: relative;
          z-index: 2;
        }
        .process-left-spacer {
          display: block;
        }
        .process-right-col {
          padding-bottom: 20vh;
          padding-left: 40px;
        }

        @media (max-width: 900px) {
          .process-grid {
            grid-template-columns: 1fr;
            padding: 0 16px;
          }
          .process-left-spacer {
            display: none;
          }
          .process-right-col {
            padding-left: 0;
            padding-bottom: 60px;
          }
          /* All mobile phase cards: full opacity, consistent appearance */
          .process-step {
            opacity: 1 !important;
            border-left-color: rgba(255,255,255,0.12) !important;
          }
        }
      `}</style>
    </section>
  );
}
