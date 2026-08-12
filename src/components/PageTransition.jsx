import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EASE } from '../utils/motion';

/* ═══════════════════════════════════════════════════════════
   PAGE TRANSITION

   A short cross-fade between routes. Deliberately short: 0.22s
   out, 0.34s in. Route transitions are the one animation a
   visitor sits through on every single navigation, so anything
   longer stops reading as polish and starts reading as lag.

   The page lifts slightly on exit and settles on entry, which
   gives the change a direction without moving enough to make
   the layout feel unstable.

   `initial={false}` matters for more than taste — it means the
   very first paint (and therefore the prerendered HTML that
   crawlers receive) is the finished state, not opacity: 0.
   ═══════════════════════════════════════════════════════════ */

/* Entry is opacity only — no `y`. That is not just taste: a
   transform on this wrapper makes it a containing block for the
   `position: fixed` panel inside ProcessJourney, and any window
   where that is true is a window where the section can break.
   Fading in with no transform means the incoming page never has
   one at all.

   Exit keeps the lift, because the outgoing page is on its way
   out and nothing inside it is still being interacted with. */
const variants = {
  initial: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: { duration: 0.34, ease: EASE },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.22, ease: EASE },
  },
};

export default function PageTransition({ routeKey, children }) {
  /* `AnimatePresence initial={false}` already suppresses the entry
     animation on first mount, but it does so through context. This
     component is what stands between a crawler and the page copy,
     so the guard is made explicit rather than inherited: on the
     very first render the wrapper is handed `initial={false}`
     directly, and the element paints at its final opacity.

     Getting this wrong does not look like a bug — the page renders
     correctly for humans and ships `opacity: 0` to Googlebot. */
  const mounted = useRef(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    mounted.current = true;
    setReady(true);
  }, []);

  return (
    <AnimatePresence mode="wait" initial={false}>
      {/* No `will-change` on this wrapper, and this is load-bearing.
          `will-change: transform` makes the element a containing
          block for every `position: fixed` descendant in Chrome —
          permanently, not just while animating. ProcessJourney's
          hover panel is `position: fixed` with a `clipPath` computed
          in viewport coordinates, so with will-change set it was
          being positioned against this div instead of the viewport
          and clipped out of existence. The section's cards simply
          stopped appearing.

          Framer only writes `transform` during the 340ms entry
          animation and resets it to `none` afterwards, so no
          containing block survives the transition. */}
      <motion.div
        key={routeKey}
        variants={variants}
        initial={ready ? 'initial' : false}
        animate="enter"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
