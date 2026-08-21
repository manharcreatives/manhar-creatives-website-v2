import { motion } from 'framer-motion';
import { FadeIn } from '../components/TextReveal';

const VALUE_PROPS = [
  {
    number: '01',
    title: 'Strategic Approach',
    description: 'Every project starts from a blank canvas, built around your business, goals and requirements. Never a repurposed website, never a template in new colours — what you get is built for you, and only you.',
    image: '/images/cards/value-strategic.webp',
  },
  {
    number: '02',
    title: 'Professional Execution',
    description: "Execution stays precise and professional, but it feels personal — like working with your own team. We don't stop at the brief; once we understand your business, we bring you strategic ideas that help it grow further.",
    image: '/images/cards/value-execution.webp',
  },
  {
    number: '03',
    title: "Client Satisfaction First",
    description: "Within the agreed scope, we work until you're genuinely happy with the outcome — not just signed off. Most clients love the very first draft, because it's designed only for them, never adapted from someone else's work.",
    image: '/images/cards/value-business.webp',
  },
  {
    number: '04',
    title: 'Structured Workflow',
    description: 'A clear process and timelines you can rely on. If we commit to a delivery date, that date holds — structure here is not just a promise, it is how every project actually runs.',
    image: '/images/cards/value-workflow.webp',
  },
  {
    number: '05',
    title: 'Growth-Focused Thinking',
    description: "We don't build for the sake of finishing a task. Every decision, from structure to design, is made while thinking about what actually grows your business — not just what fills the brief.",
    image: '/images/cards/value-growth.webp',
  },
  {
    number: '06',
    title: 'Reliable Collaboration',
    description: 'Projects matter, but the relationship matters just as much. We invest in genuine collaboration and long-term trust — once a business partners with us, they rarely feel the need to look anywhere else.',
    image: '/images/cards/value-collaboration.webp',
  },
];

export default function ValuePropsSection() {
  return (
    <section style={{ background: 'var(--bg)', padding: '100px 0', position: 'relative' }}>
      <div className="container">
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{ height: '1px', width: '40px', background: 'var(--color-primary)' }} />
            <span className="text-caption" style={{ color: 'var(--color-primary)', letterSpacing: '0.15em' }}>
              WHY CHOOSE US
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 600, lineHeight: 1.1,
            letterSpacing: '-0.02em', color: '#fff',
            maxWidth: '700px',
          }}>
            <span>Structured </span>
            <span style={{ color: '#22C55E', textShadow: '0 0 30px rgba(34,197,94,0.3)' }}>Solutions</span>
            <span>. </span>
            <br />
            <span>Purposeful </span>
            <span style={{ color: '#22C55E', textShadow: '0 0 30px rgba(34,197,94,0.3)' }}>Execution</span>
            <span>.</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p style={{
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.55)',
            maxWidth: '650px',
            lineHeight: 1.7,
            marginTop: '24px',
            marginBottom: '48px',
          }}>
            We combine structured execution, original design thinking, and business-focused strategy to deliver solutions built only for you — never templated, never copied.
          </p>
        </FadeIn>

        <div className="value-props-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2px', background: 'rgba(255,255,255,0.04)' }}>
          {VALUE_PROPS.map((prop, i) => (
            <FadeIn key={prop.title} delay={0.15 + i * 0.08} direction="left">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="value-prop-card"
                style={{
                  background: 'var(--bg)',
                  padding: '32px 28px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Image — 150px height */}
                <img className="value-prop-image"
                  src={prop.image}
                  alt={`${prop.title} — ${prop.description.slice(0, 60)}`}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '150px',
                    borderRadius: '4px',
                    objectFit: 'cover',
                    marginBottom: '20px',
                  }}
                />
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--color-primary)',
                  marginBottom: '16px',
                  letterSpacing: '0.1em',
                }}>
                  {prop.number}
                </span>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.375rem',
                  fontWeight: 600,
                  color: '#fff',
                  marginBottom: '12px',
                  lineHeight: 1.2,
                }}>
                  {prop.title}
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'rgba(255,255,255,0.55)',
                  lineHeight: 1.65,
                  flex: 1,
                }}>
                  {prop.description}
                </p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) {
          .value-props-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 768px) {
          .value-props-grid { grid-template-columns: 1fr !important; }
          .value-prop-card { padding: 24px 20px !important; }
        }
      `}</style>
    </section>
  );
}
