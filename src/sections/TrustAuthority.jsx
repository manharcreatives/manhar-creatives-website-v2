import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from '../components/TextReveal';
import { useInViewLenis } from '../utils/useInViewLenis';
import { STATS } from '../utils/constants';

function AnimatedCounter({ value, suffix = '', decimals = 0, duration = 2 }) {
  const [count, setCount] = useState(0);
  const [ref, isInView] = useInViewLenis({ once: false });

  useEffect(() => {
    if (!isInView) {
      setCount(0);
      return;
    }
    let start = 0;
    const end = value;
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(start + (end - start) * eased);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} style={{ fontFamily: 'var(--font-display)' }}>
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}{suffix}
    </span>
  );
}

export default function TrustAuthority() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  const capabilities = [
    { title: 'Strategic Thinking', desc: 'Every project begins with understanding the business, audience, and objectives to ensure decisions are made with purpose and direction.' },
    { title: 'Structured Execution', desc: 'Clear processes, defined deliverables, and transparent communication help keep projects organized, efficient, and aligned with expectations.' },
    { title: 'Long-Term Value', desc: 'We create digital assets and brand systems designed to remain effective, relevant, and scalable as businesses continue to grow.' },
  ];

  return (
    <section ref={ref} id="trust" style={{ position: 'relative', overflow: 'hidden', padding: '160px 0' }}>
      
      {/* Background Image Parallax */}
      <motion.div style={{
        position: 'absolute', inset: -100, zIndex: 0,
        backgroundImage: 'url(/images/backgrounds/trust-bg.webp)',
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: 0.2,
        y
      }} />

      {/* Overlay to blend with dark theme */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to bottom, var(--bg) 0%, rgba(11,15,14,0.6) 50%, var(--bg) 100%)'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          
          {/* Left: Text & Capabilities */}
          <div>
            <FadeIn>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{ height: '1px', width: '40px', background: 'var(--color-primary)' }} />
                <span className="text-caption" style={{ color: 'var(--color-primary)', letterSpacing: '0.15em' }}>
                  THE STUDIO
                </span>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.1}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: 600,
                lineHeight: 1.1,
                marginBottom: '32px',
                letterSpacing: '-0.02em',
                color: '#fff'
              }}>
                Built for{' '}
                <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.7)' }}>Business Growth</span>
              </h2>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <p style={{
                fontSize: '1.125rem',
                color: 'rgba(255,255,255,0.8)',
                lineHeight: 1.7,
                marginBottom: '64px',
                maxWidth: '500px'
              }}>
                Manhar Creatives is a digital solutions and branding company focused on helping businesses establish credibility, strengthen their presence, and create professional digital foundations for growth.
                <br /><br />
                We combine strategy, design, and technology to deliver solutions that are practical, professional, and aligned with business objectives.
                <br /><br />
                <strong style={{ color: 'var(--color-primary)' }}>We Design. We Build. You Grow.</strong>
              </p>
            </FadeIn>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              {capabilities.map((cap, i) => (
                <FadeIn key={i} delay={0.3 + (i * 0.1)}>
                  <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '24px' }}>
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: '#fff',
                      marginBottom: '12px'
                    }}>
                      {cap.title}
                    </h3>
                    <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                      {cap.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Right: Large Stats Display */}
          <div style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(20px)',
            padding: '2px'
          }}>
            {STATS.map((stat, i) => (
              <FadeIn key={i} delay={0.4 + (i * 0.1)} direction="left">
                <div className="stat-box" style={{
                  background: 'rgba(11,15,14,0.9)',
                  padding: '64px 48px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start'
                }}>
                  <div style={{
                    fontSize: 'clamp(3.5rem, 6vw, 5.5rem)',
                    fontWeight: 600,
                    color: '#fff',
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                    marginBottom: '16px'
                  }}>
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} decimals={stat.decimals || 0} />
                  </div>
                  <div style={{
                    fontSize: '0.875rem',
                    color: 'rgba(255,255,255,0.5)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}>
                    {stat.label}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
        <style>{`
          @media (max-width: 992px) {
            [style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; gap: 40px !important; }
            .stat-box { padding: 40px 32px !important; }
          }
        `}</style>
      </div>
    </section>
  );
}
