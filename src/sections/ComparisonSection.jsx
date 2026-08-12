import { motion } from 'framer-motion';
import { FadeIn } from '../components/TextReveal';

const COMPARISONS = [
  {
    aspect: 'Strategy',
    typical: 'Trend-chasing, one-size-fits-all templates',
    manhar: 'Data-driven, custom strategy tailored to your business goals',
  },
  {
    aspect: 'Research',
    typical: 'Minimal or no market research conducted',
    manhar: 'Deep market analysis, competitor review, and audience insights',
  },
  {
    aspect: 'Execution',
    typical: 'Slow, disjointed handoffs between teams',
    manhar: 'Integrated design & development with seamless collaboration',
  },
  {
    aspect: 'Scalability',
    typical: 'Solutions that work today but break tomorrow',
    manhar: 'Built on scalable architecture that grows with your business',
  },
  {
    aspect: 'Communication',
    typical: 'Weekly updates with limited transparency',
    manhar: 'Real-time previews, direct access, and complete visibility',
  },
  {
    aspect: 'Business Focus',
    typical: 'Focused on visual appeal, not business outcomes',
    manhar: 'Every decision tied to measurable growth and ROI',
  },
];

export default function ComparisonSection() {
  return (
    <section style={{ background: 'var(--bg)', padding: '160px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Background Image for Header */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '550px', zIndex: 0,
        backgroundImage: 'url(/images/backgrounds/comparison-bg.webp)',
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: 0.1,
      }} />
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '550px', zIndex: 1,
        background: 'linear-gradient(to bottom, var(--bg) 0%, transparent 30%, transparent 70%, var(--bg) 100%)',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ height: '1px', width: '40px', background: 'var(--color-primary)' }} />
            <span className="text-caption" style={{ color: 'var(--color-primary)', letterSpacing: '0.15em' }}>
              THE DIFFERENCE
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: 600, lineHeight: 1.1,
            marginBottom: '16px',
            letterSpacing: '-0.02em', color: '#fff',
            maxWidth: '800px',
          }}>
            Why our approach is{' '}
            <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.6)' }}>
              fundamentally different
            </span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p style={{
            fontSize: '1.0625rem',
            color: 'rgba(255,255,255,0.55)',
            maxWidth: '550px',
            lineHeight: 1.7,
            marginBottom: '80px',
          }}>
            We don't just build things that look good. We build systems that work - and we do it differently than most.
          </p>
        </FadeIn>

        {/* ── DESKTOP TABLE (hidden on mobile) ── */}
        <div className="comparison-desktop" style={{ border: '1px solid rgba(255,255,255,0.06)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
          {/* Header Row */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1.2fr 1.8fr 1.8fr',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(34,197,94,0.04)',
          }}>
            <div style={{ padding: '20px 24px' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-primary)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>Aspect</span>
            </div>
            <div style={{ padding: '20px 24px', borderLeft: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.48)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>Typical Agency</span>
            </div>
            <div style={{ padding: '20px 24px', borderLeft: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-primary)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>Manhar Creatives</span>
            </div>
          </div>

          {/* Comparison Rows */}
          {COMPARISONS.map((item, i) => (
            <FadeIn key={item.aspect} delay={0.1 + i * 0.06}>
              <motion.div
                whileHover={{ background: 'rgba(255,255,255,0.02)' }}
                style={{
                  display: 'grid', gridTemplateColumns: '1.2fr 1.8fr 1.8fr',
                  borderBottom: i < COMPARISONS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  transition: 'background 0.3s ease',
                }}
              >
                <div style={{ padding: '24px', display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600, color: '#fff' }}>
                    {item.aspect}
                  </span>
                </div>
                <div style={{ padding: '24px', display: 'flex', alignItems: 'center', borderLeft: '1px solid rgba(255,255,255,0.04)' }}>
                  <span style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.48)', lineHeight: 1.6 }}>
                    {item.typical}
                  </span>
                </div>
                <div style={{ padding: '24px', display: 'flex', alignItems: 'center', borderLeft: '1px solid rgba(255,255,255,0.04)' }}>
                  <span style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
                    {item.manhar}
                  </span>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* ── MOBILE CARDS (hidden on desktop) ── */}
        <div className="comparison-mobile">
          {COMPARISONS.map((item, i) => (
            <FadeIn key={`mob-${item.aspect}`} delay={0.05 + i * 0.06}>
              <div style={{
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '12px',
                overflow: 'hidden',
                marginBottom: i < COMPARISONS.length - 1 ? '12px' : '0',
              }}>
                {/* Aspect label */}
                <div style={{
                  padding: '14px 18px',
                  background: 'rgba(34,197,94,0.06)',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: '#fff',
                    letterSpacing: '-0.01em',
                  }}>
                    {item.aspect}
                  </span>
                </div>

                {/* Typical Agency */}
                <div style={{
                  padding: '14px 18px',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  background: 'rgba(255,255,255,0.01)',
                }}>
                  <div style={{
                    fontSize: '0.65rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.48)',
                    fontWeight: 600,
                    marginBottom: '6px',
                  }}>
                    Typical Agency
                  </div>
                  <p style={{
                    fontSize: '0.9rem',
                    color: 'rgba(255,255,255,0.48)',
                    lineHeight: 1.55,
                    margin: 0,
                  }}>
                    {item.typical}
                  </p>
                </div>

                {/* Manhar Creatives */}
                <div style={{
                  padding: '14px 18px',
                  background: 'rgba(34,197,94,0.04)',
                }}>
                  <div style={{
                    fontSize: '0.65rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--color-primary)',
                    fontWeight: 600,
                    marginBottom: '6px',
                  }}>
                    Manhar Creatives
                  </div>
                  <p style={{
                    fontSize: '0.9rem',
                    color: 'rgba(255,255,255,0.82)',
                    lineHeight: 1.55,
                    margin: 0,
                  }}>
                    {item.manhar}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <style>{`
        .comparison-desktop { display: block; }
        .comparison-mobile  { display: none;  }

        @media (max-width: 768px) {
          .comparison-desktop { display: none;  }
          .comparison-mobile  { display: block; }
        }
      `}</style>
    </section>
  );
}
