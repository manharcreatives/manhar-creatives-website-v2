import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EASE, prefersReducedMotion } from '../utils/motion';

/* ═══════════════════════════════════════════════════════════
   SCROLL TO TOP

   Sits directly above the floating call button. The call button
   is hardcoded in index.html at 24px from the bottom and is
   58px tall, so this one starts at 24 + 58 + 14 = 96px and the
   two never touch — including once the iOS home indicator's
   safe-area inset is added to both.

   The ring around the button is a live scroll indicator: it
   fills as the page is read, so the control tells you where you
   are as well as offering to take you back.
   ═══════════════════════════════════════════════════════════ */

const SIZE = 46;
const RADIUS = 20;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const SHOW_AFTER = 300;

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ringRef = useRef(null);

  useEffect(() => {
    let frame = null;

    const measure = () => {
      frame = null;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;

      setVisible(y > SHOW_AFTER && max > SHOW_AFTER);

      const ring = ringRef.current;
      if (ring) {
        const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
        ring.style.strokeDashoffset = String(CIRCUMFERENCE * (1 - p));
      }
    };

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const toTop = useCallback(() => {
    const instant = prefersReducedMotion();

    /* Lenis owns the scroll position on pointer devices — calling
       window.scrollTo behind its back leaves the two out of sync
       and the page snaps back on the next wheel event. */
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: instant ? 0 : 1.05, immediate: instant });
      return;
    }
    window.scrollTo({ top: 0, behavior: instant ? 'auto' : 'smooth' });
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={toTop}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          aria-label="Scroll back to top"
          title="Back to top"
          className="mc-scroll-top"
          initial={{ opacity: 0, scale: 0.7, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 12 }}
          transition={{ duration: 0.3, ease: EASE }}
          whileTap={{ scale: 0.9 }}
          style={{
            position: 'fixed',
            right: 'max(24px, env(safe-area-inset-right, 24px))',
            bottom: 'calc(96px + env(safe-area-inset-bottom, 0px))',
            zIndex: 2147483646,
            width: SIZE,
            height: SIZE,
            padding: 0,
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `1px solid ${hovered ? 'rgba(34,197,94,0.65)' : 'rgba(34,197,94,0.28)'}`,
            background: hovered ? 'rgba(34,197,94,0.16)' : 'rgba(11,15,14,0.82)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            boxShadow: hovered
              ? '0 10px 34px rgba(0,0,0,0.5), 0 0 26px rgba(34,197,94,0.35)'
              : '0 6px 22px rgba(0,0,0,0.42)',
            color: 'var(--color-primary)',
            transition: 'background 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease',
            WebkitTapHighlightColor: 'transparent',
            /* Own compositing layer, same reasoning as the call button */
            transform: 'translateZ(0)',
            isolation: 'isolate',
          }}
        >
          {/* Progress ring */}
          <svg
            width={SIZE}
            height={SIZE}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            aria-hidden="true"
            style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}
          >
            <circle
              cx={SIZE / 2} cy={SIZE / 2} r={RADIUS}
              fill="none" stroke="rgba(34,197,94,0.12)" strokeWidth="1.5"
            />
            <circle
              ref={ringRef}
              cx={SIZE / 2} cy={SIZE / 2} r={RADIUS}
              fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE}
              style={{ transition: 'stroke-dashoffset 0.1s linear' }}
            />
          </svg>

          {/* Chevron */}
          <svg
            width="17" height="17" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true"
            style={{
              position: 'relative',
              transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
              transition: 'transform 0.28s var(--ease-out-expo)',
            }}
          >
            <line x1="12" y1="19" x2="12" y2="6" />
            <polyline points="5 12 12 5 19 12" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
