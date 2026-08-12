/* ═══════════════════════════════════════════════════════════
   AURORA FIELD

   A CSS-only ambient layer that sits underneath the hero film.
   Two jobs:

   1. The hero video is a 4K file from a third-party CDN. Until it
      buffers, the hero would otherwise be a flat black rectangle —
      which reads as broken rather than cinematic. This fills that
      gap with something that looks deliberate.
   2. Once the video fades in on top at 35% opacity, this keeps
      depth in the darker regions instead of letting them go muddy.

   No canvas, no JS loop — three gradient layers and keyframes, so
   it costs nothing on the main thread and degrades to a static
   gradient under prefers-reduced-motion.
   ═══════════════════════════════════════════════════════════ */

export default function AuroraField() {
  return (
    <div className="aurora-field" aria-hidden="true">
      <div className="aurora-base" />
      <div className="aurora-blob aurora-blob-a" />
      <div className="aurora-blob aurora-blob-b" />
      <div className="aurora-blob aurora-blob-c" />
      {/* Vignette sits under the grid — above it, it swallowed the floor
          lines exactly where they are strongest. */}
      <div className="aurora-vignette" />

      <style>{`
        .aurora-field {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .aurora-base {
          position: absolute;
          inset: 0;
          background: radial-gradient(120% 120% at 50% 0%,
            #16241e 0%, #0E1513 45%, var(--bg) 100%);
        }

        /* ─── Drifting light ─────────────────────────────── */
        .aurora-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          will-change: transform;
        }
        .aurora-blob-a {
          width: 46vw; height: 46vw;
          top: -14%; left: 8%;
          background: radial-gradient(circle,
            rgba(34,197,94,0.30) 0%, rgba(34,197,94,0) 68%);
          animation: aurora-drift-a 22s ease-in-out infinite;
        }
        .aurora-blob-b {
          width: 40vw; height: 40vw;
          top: 6%; right: 4%;
          background: radial-gradient(circle,
            rgba(74,222,128,0.22) 0%, rgba(74,222,128,0) 70%);
          animation: aurora-drift-b 27s ease-in-out infinite;
        }
        .aurora-blob-c {
          width: 54vw; height: 34vw;
          bottom: -18%; left: 26%;
          background: radial-gradient(circle,
            rgba(22,163,74,0.26) 0%, rgba(22,163,74,0) 72%);
          animation: aurora-drift-c 31s ease-in-out infinite;
        }

        @keyframes aurora-drift-a {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50%      { transform: translate3d(6%, 5%, 0) scale(1.12); }
        }
        @keyframes aurora-drift-b {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1.06); }
          50%      { transform: translate3d(-7%, 6%, 0) scale(0.94); }
        }
        @keyframes aurora-drift-c {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50%      { transform: translate3d(4%, -6%, 0) scale(1.1); }
        }


        .aurora-vignette {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(95% 75% at 50% 42%, transparent 46%, rgba(11,15,14,0.55) 100%);
        }

        @media (prefers-reduced-motion: reduce) {
          .aurora-blob { animation: none; }
        }
      `}</style>
    </div>
  );
}
