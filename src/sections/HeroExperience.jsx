import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MagneticButton from '../components/MagneticButton';
import AuroraField from '../components/AuroraField';
import { prefersReducedMotion } from '../utils/motion';
import { trackCta, trackVideoPlay } from '../utils/analytics';

const VIDEO_URL = 'https://files.catbox.moe/24krt8.mp4';

/* Save-Data and 2G/3G connections: the film is decoration, and
   decoration should not cost a visitor on a metered connection
   several megabytes before the headline is readable. AuroraField
   is already behind it and carries the same mood at ~0 bytes. */
function shouldSkipVideo() {
  if (typeof navigator === 'undefined') return true;
  if (prefersReducedMotion()) return true;

  const c = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (!c) return false;
  if (c.saveData) return true;
  return ['slow-2g', '2g', '3g'].includes(c.effectiveType);
}

export default function HeroExperience() {
  const sectionRef = useRef(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  /* Decided after mount so the prerendered HTML is identical for
     every visitor and the decision uses real client conditions. */
  const [allowVideo, setAllowVideo] = useState(false);

  useEffect(() => {
    const skip = shouldSkipVideo();
    console.log('[Hero] Video allowed:', !skip);
    setAllowVideo(!skip);
  }, []);

  /* Fallback: if video doesn't load within 4s, show it anyway
     so it doesn't block the hero on slow connections. */
  useEffect(() => {
    if (!allowVideo) {
      console.log('[Hero] allowVideo is false, skipping video');
      return;
    }
    console.log('[Hero] Setting 4s timeout for video');
    const timeout = setTimeout(() => {
      console.log('[Hero] 4s timeout fired, setting videoReady');
      setVideoReady(true);
    }, 4000);
    return () => clearTimeout(timeout);
  }, [allowVideo]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '700px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Layer 0: Video Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <AuroraField />
        {allowVideo && !videoFailed && (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
            tabIndex={-1}
            /* A failed load is not an error state here — the aurora
               field underneath is a complete background on its own,
               so we simply stop trying and show nothing. */
            onError={(e) => {
              console.log('[Hero] Video error:', e);
              setVideoFailed(true);
            }}
            onCanPlay={() => {
              console.log('[Hero] Video canplay event fired');
              setVideoReady(true);
            }}
            onPlaying={() => {
              console.log('[Hero] Video playing');
              trackVideoPlay('hero_film', 'homepage_hero');
            }}
            onLoadedMetadata={() => console.log('[Hero] Video metadata loaded')}
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover',
              opacity: videoReady ? 0.6 : 0,
              transition: 'opacity 1.2s var(--ease-out-expo)',
            }}
          >
            <source src={VIDEO_URL} type="video/mp4" />
          </video>
        )}
      </div>

      {/* Gradient overlays */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '25%', background: 'linear-gradient(to top, var(--bg), transparent)', zIndex: 1, pointerEvents: 'none' }} />

      {/* Copy scrim — the background film cycles through bright frames, and
          the headline has to stay legible on all of them, not just the dark
          ones. Soft-edged so it never reads as a box. */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'radial-gradient(58% 46% at 50% 48%, rgba(8,12,11,0.55) 0%, rgba(8,12,11,0.28) 45%, transparent 78%)',
        }}
      />

      {/* Hero Content */}
      <div className="container hero-content-container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px', paddingTop: 'clamp(40px, 10vh, 80px)' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="pill"
          style={{ color: '#4ADE80', textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}
        >
          <span className="pill-dot" />
          YOUR DIGITAL PRESENCE SPEAKS FIRST
        </motion.div>

        {/* Heading — unchanged */}
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'clamp(2rem, 9vw, 5.5rem)',
            lineHeight: 1.06, letterSpacing: '-0.03em',
            maxWidth: '900px',
            textShadow: '0 4px 40px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)',
          }}
        >
          We <span className="gradient-text">Design</span>, We{' '}
          <span className="gradient-text">Build</span>,{' '}
          <span className="gradient-text">You Grow</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3, duration: 0.8 }}
          style={{
            color: 'rgba(255,255,255,0.85)',
            fontSize: '1.125rem',
            maxWidth: '580px',
            lineHeight: 1.7,
            textShadow: '0 2px 30px rgba(0,0,0,0.9)',
          }}
        >
          We build digital foundations that help businesses strengthen credibility, improve visibility, and create a lasting presence in the market.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 0.8 }}
          style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '12px', width: '100%' }}
        >
          <MagneticButton
            as="a"
            href="#contact"
            onClick={() => trackCta("Let's Discuss Your Project", 'hero', '#contact')}
            className="btn btn-primary hero-btn"
            style={{ padding: '14px 32px', fontSize: '0.9375rem', boxShadow: '0 0 40px rgba(34,197,94,0.3)' }}
          >
            Let's Discuss Your Project
          </MagneticButton>
          <MagneticButton
            as="a"
            href="#projects"
            onClick={() => trackCta('Explore Our Work', 'hero', '#projects')}
            className="btn btn-outline hero-btn"
          >
            Explore Our Work
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 0.8 }}
          style={{ display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', marginTop: '8px' }}
        >
          {[
            'Website Development',
            'Custom Software & CRM',
            'Branding',
            'Social Media',
            'Print Solutions',
            'Digital Presence',
          ].map((item, i) => (
            <span key={i} style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)',
              letterSpacing: '0.05em',
            }}>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--color-primary)', opacity: 0.6 }} />
              {item}
            </span>
          ))}
        </motion.div>
      </div>
      <style>{`
        @media (max-width: 480px) {
          .hero-btn { width: 100% !important; justify-content: center; }
          .hero-content-container { padding-top: 20px !important; }
        }
      `}</style>
    </section>
  );
}
