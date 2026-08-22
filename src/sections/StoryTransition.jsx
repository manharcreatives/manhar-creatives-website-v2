import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from '../components/TextReveal';
import useLazyBackground from '../utils/useLazyBackground';

export default function StoryTransition() {
  const ref = useRef(null);
  const bgRef = useLazyBackground('/images/backgrounds/story-bg.webp');
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yBg  = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
  const yText = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);

  const ts = '0 4px 24px rgba(0,0,0,0.8), 0 0 12px rgba(0,0,0,0.5)';

  return (
    <section ref={ref} id="about" style={{
      position: 'relative',
      minHeight: '120vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      background: '#000'
    }}>

      {/* Cinematic Background Layer */}
      <motion.div ref={bgRef} style={{
        position: 'absolute',
        inset: -100,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.55,
        y: yBg,
        zIndex: 0
      }} />

      {/* Atmospheric overlays */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.4) 100%)'
      }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to bottom, rgba(11,15,14,0.6) 0%, transparent 25%, transparent 75%, rgba(11,15,14,0.6) 100%)'
      }} />

      {/* Floating UI Elements for depth */}
      <motion.div
        className="about-floating"
        style={{
          position: 'absolute', right: '10%', top: '20%', zIndex: 2,
          y: useTransform(scrollYProgress, [0, 1], ['50%', '-50%']),
          opacity: 0.95
        }}
      >
        <img src="/images/story/floating-top.webp"           alt="Manhar Creatives workspace: branding and web design studio serving Ahmedabad, Mehsana and Visnagar, Gujarat"
             loading="lazy" decoding="async"
             style={{ width: '300px', height: '400px', objectFit: 'cover', mixBlendMode: 'screen' }} />
      </motion.div>

      <motion.div
        className="about-floating"
        style={{
          position: 'absolute', left: '5%', bottom: '10%', zIndex: 2,
          y: useTransform(scrollYProgress, [0, 1], ['-50%', '50%']),
          opacity: 0.9
        }}
      >
        <img src="/images/story/floating-bottom.webp" alt="Design desk at Manhar Creatives: digital solutions for businesses across Gujarat"
             loading="lazy" decoding="async"
             style={{ width: '400px', height: '250px', objectFit: 'cover', mixBlendMode: 'screen' }} />
      </motion.div>

      <div style={{
        position: 'absolute',
        top: '40%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'min(75vw, 750px)',
        height: '500px',
        background: 'radial-gradient(ellipse at center, rgba(11,15,14,0.7) 0%, transparent 65%)',
        zIndex: 2,
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <motion.div className="container" style={{ position: 'relative', zIndex: 3, y: yText }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>

          <FadeIn>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '32px' }}>
              <div style={{ height: '1px', width: '60px', background: 'var(--color-primary)' }} />
              <span className="text-caption" style={{ color: 'var(--color-primary)', letterSpacing: '0.2em', textShadow: ts }}>
                ABOUT MANHAR CREATIVES
              </span>
              <div style={{ height: '1px', width: '60px', background: 'var(--color-primary)' }} />
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.25rem, 5vw, 4rem)',
              fontWeight: 600,
              lineHeight: 1.1,
              marginBottom: '36px',
              letterSpacing: '-0.03em',
              color: '#fff',
              textShadow: ts,
            }}>
              Building Strong{' '}
              <span style={{ color: '#22C55E', textShadow: ts }}>Digital</span>{' '}
              Foundations for{' '}
              <span style={{ color: '#22C55E', textShadow: ts }}>Growth</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p style={{
              fontSize: 'clamp(1.0625rem, 1.8vw, 1.25rem)',
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.75,
              maxWidth: '600px',
              margin: '0 auto 16px',
              fontWeight: 400,
              textShadow: '0 2px 16px rgba(0,0,0,0.7)',
            }}>
              Manhar Creatives is a digital solutions and branding partner, building websites, custom software and brand systems that help businesses grow with strength, professionalism, and purpose.
            </p>
            <p style={{
              fontSize: 'clamp(1.0625rem, 1.8vw, 1.25rem)',
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.75,
              maxWidth: '600px',
              margin: '0 auto',
              fontWeight: 400,
              textShadow: '0 2px 16px rgba(0,0,0,0.7)',
            }}>
              We combine strategic thinking, market understanding, structured design, and purposeful digital execution to help businesses improve visibility, strengthen credibility, and create a lasting impact in the market.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="about-grid" style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '32px',
              marginTop: '64px', textAlign: 'left', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto'
            }}>
              {[
                {
                  num: '01',
                  title: 'Mission',
                  desc: 'To build credible and high-impact brand presence through strategic thinking, structured digital systems, and growth-focused execution.',
                },
                {
                  num: '02',
                  title: 'Vision',
                  desc: 'To become a trusted strategic partner for businesses by building strong, scalable, and growth-driven digital systems.',
                },
                {
                  num: '03',
                  title: 'Core Values',
                  isList: true,
                  items: [
                    'Purpose-Driven Work',
                    'Professional Excellence',
                    'Simplicity with Strategy',
                    'Growth-Focused Thinking',
                    'Long-Term Relationships',
                  ],
                },
              ].map((item, i) => (
                <div key={i} style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '20px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-primary)', display: 'block', marginBottom: '12px', letterSpacing: '0.1em', textShadow: ts }}>{item.num}</span>
                  <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', color: '#fff', marginBottom: '10px', fontWeight: 600, textShadow: ts }}>{item.title}</h3>
                  {item.isList ? (
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {item.items.map((v) => (
                        <li key={v} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5, textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}>
                          <span style={{ color: '#22C55E', fontSize: '0.6rem' }}>◆</span>
                          {v}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}>{item.desc}</p>
                  )}
                </div>
              ))}
            </div>
          </FadeIn>

        </div>
      </motion.div>

      <style>{`
        @media (max-width: 992px) {
          .about-floating { display: none !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </section>
  );
}
