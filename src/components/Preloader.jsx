import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { prefersReducedMotion } from '../utils/motion';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading');
  const videoRef = useRef(null);
  const revealedRef = useRef(false);

  const triggerReveal = useCallback((immediate = false) => {
    if (revealedRef.current) return;
    revealedRef.current = true;
    setProgress(100);
    setPhase('reveal');
    setTimeout(() => {
      setPhase('done');
      onComplete?.();
    }, immediate ? 0 : 1200);
  }, [onComplete]);

  /* A four-second full-screen intro film is precisely the kind of
     thing prefers-reduced-motion exists to opt out of. Someone who
     has set that preference gets the site immediately. */
  useEffect(() => {
    if (prefersReducedMotion()) triggerReveal(true);
  }, [triggerReveal]);

  // ─── MOBILE FIX ────────────────────────────────────────────────────────────
  // On mobile Chrome/Safari, autoplay is often blocked or the video stalls
  // on slow connections. If onEnded never fires, the app stays on the preloader
  // forever and FloatingCall (and everything else) never mounts.
  // Hard 4-second timeout guarantees the app always loads on mobile.
  // Keep this long enough for the intro film to actually play out — cutting it
  // short is what makes the entrance feel broken rather than cinematic.
  useEffect(() => {
    const hardTimeout = setTimeout(() => {
      triggerReveal();
    }, 4000);

    return () => clearTimeout(hardTimeout);
  }, [triggerReveal]);

  const handleTimeUpdate = useCallback(() => {
    const vid = videoRef.current;
    if (!vid || !vid.duration) return;
    const p = (vid.currentTime / vid.duration) * 100;
    setProgress(Math.min(p, 100));
  }, []);

  const handleVideoEnd = useCallback(() => {
    triggerReveal();
  }, [triggerReveal]);

  // If video errors (network fail, format unsupported, autoplay policy) → complete immediately
  const handleVideoError = useCallback(() => {
    triggerReveal();
  }, [triggerReveal]);

  // If video stalls or suspends on slow mobile connections → complete after short delay
  const handleVideoStall = useCallback(() => {
    setTimeout(() => triggerReveal(), 1500);
  }, [triggerReveal]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="preloader"
          role="status"
          aria-live="polite"
          aria-label="Loading Manhar Creatives"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 'var(--z-preloader)',
            background: 'var(--bg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '32px',
          }}
        >
          {/* Grid + Glow overlay */}
          <div className="preloader-grid" aria-hidden="true" />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
            {/* Animated Logo Video */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: 'clamp(260px, 40vw, 500px)' }}
            >
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                preload="auto"
                aria-hidden="true"
                tabIndex={-1}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleVideoEnd}
                onError={handleVideoError}
                onStalled={handleVideoStall}
                onSuspend={handleVideoStall}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 12,
                  display: 'block',
                  backgroundColor: 'var(--bg)',
                  mixBlendMode: 'normal',
                }}
              >
                <source
                  src="/videos/preloader.mp4"
                  type="video/mp4"
                />
              </video>
            </motion.div>

            {/* Progress Bar */}
            <div
              style={{
                width: 200,
                height: 2,
                background: 'rgba(255,255,255,0.06)',
                borderRadius: 'var(--radius-full)',
                overflow: 'hidden',
              }}
            >
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))',
                  borderRadius: 'var(--radius-full)',
                  boxShadow: '0 0 12px rgba(var(--color-primary-rgb), 0.5)',
                }}
              />
            </div>

            {/* Text */}
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 0.75, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--text-secondary)',
                textShadow: '0 0 20px rgba(0,0,0,0.6)',
              }}
            >
              {phase === 'reveal' ? 'Welcome' : 'Loading experience'}
            </motion.p>
          </div>

          {/* Reveal animation overlay */}
          {phase === 'reveal' && (
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.6, ease: [0.85, 0, 0.15, 1] }}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'var(--bg)',
                transformOrigin: 'bottom',
                zIndex: 2,
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
