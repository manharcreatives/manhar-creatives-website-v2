/* ═══════════════════════════════════════════════════════════
   MOTION PRIMITIVES

   One shared easing curve, one shared stagger pattern, and a
   single source of truth for "does this visitor want motion?".

   Framer's own <MotionConfig reducedMotion="user"> handles the
   transform/opacity side globally (see App.jsx). What lives here
   is the part Framer cannot know about: our own rAF counters,
   auto-scrolling marquees and timed reveals, which need to check
   the preference themselves before they start spending frames.
   ═══════════════════════════════════════════════════════════ */

import { useEffect, useState } from 'react';

/* The signature curve. Every animation in the site uses this or
   one of the two variants below — that consistency is most of
   what makes a set of animations read as one system. */
export const EASE = [0.16, 1, 0.3, 1];
export const EASE_SOFT = [0.22, 1, 0.36, 1];
export const EASE_IN_OUT = [0.85, 0, 0.15, 1];

const QUERY = '(prefers-reduced-motion: reduce)';

/** Synchronous read — safe to call during render and on the server. */
export function prefersReducedMotion() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia(QUERY).matches;
}

/** Live-updating version. Visitors can flip the OS setting mid-session. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(prefersReducedMotion);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
    const mq = window.matchMedia(QUERY);
    const onChange = (e) => setReduced(e.matches);

    if (mq.addEventListener) {
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    }
    /* Safari < 14 */
    mq.addListener(onChange);
    return () => mq.removeListener(onChange);
  }, []);

  return reduced;
}

/* ─── Stagger helpers ─────────────────────────────────────
   Used by every card grid on the site. Children arrive one
   after another rather than as a single slab, which is what
   makes a six-card grid feel considered instead of dumped.
───────────────────────────────────────────────────────── */

export function staggerContainer(stagger = 0.08, delayChildren = 0) {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}

export const staggerItem = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

export const staggerItemSoft = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

/**
 * Caps the cumulative delay on long lists. A 20-item grid with a
 * flat 0.08s step means the last card waits 1.6 seconds — long
 * enough that it reads as broken rather than choreographed.
 */
export function staggerDelay(index, step = 0.07, max = 0.42) {
  return Math.min(index * step, max);
}
