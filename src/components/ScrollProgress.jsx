import { useEffect, useRef } from 'react';

/* ═══════════════════════════════════════════════════════════
   SCROLL PROGRESS

   A hairline that fills across the top of the viewport as the
   page is read. On pages this long it does real work — it tells
   a visitor whether they are two screens or ten from the end.

   Driven by a rAF-throttled scroll listener writing directly to
   `transform`, so it never triggers layout and never re-renders.
   ═══════════════════════════════════════════════════════════ */

export default function ScrollProgress() {
  const barRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    let frame = null;

    const update = () => {
      frame = null;
      const el = barRef.current;
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.transform = `scaleX(${p})`;

      /* Both layers fade together: on a page too short to scroll,
         a lone empty track pinned to the top is just a stray line. */
      const shown = p > 0.005 ? '1' : '0';
      el.style.opacity = shown;
      if (trackRef.current) trackRef.current.style.opacity = shown;
    };

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="mc-no-print"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        /* 3px rather than 2px. At 2px the bar was competing with
           the nav's own 1px top glow line and reading as part of
           the border rather than as a progress indicator. */
        height: '3px',
        zIndex: 'calc(var(--z-nav) + 1)',
        pointerEvents: 'none',
        /* A faint track behind the fill so the bar communicates
           "you are 20% through" rather than just "something is
           green over here". */
        background: 'rgba(255,255,255,0.045)',
        opacity: 0,
        transition: 'opacity 0.3s ease',
      }}
      ref={trackRef}
    >
      <div
        ref={barRef}
        style={{
          height: '100%',
          transformOrigin: '0 50%',
          transform: 'scaleX(0)',
          opacity: 0,
          background: 'linear-gradient(90deg, #16A34A, #22C55E 45%, #4ADE80)',
          boxShadow: '0 0 14px rgba(34,197,94,0.75)',
          transition: 'opacity 0.3s ease',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
