import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FadeIn } from '../components/TextReveal';
import { EASE, staggerDelay } from '../utils/motion';
import { trackCta } from '../utils/analytics';

/* Note for whoever maintains this next: the `features` arrays
   here were previously shuffled — "Brand Identity" listed QR
   menus and table reservations, "Business Systems" listed logo
   and typography. Nothing rendered them, so the error was
   invisible. They are corrected below and now displayed, which
   also means a future mix-up will be caught on sight.

   `versus` states the generic alternative each solution is
   competing against. Naming the alternative honestly is more
   persuasive than claiming there isn't one. */
const SOLUTIONS = [
  {
    icon: '◈',
    title: 'Website Development',
    tagline: 'Your digital headquarters.',
    description: 'Professionally designed websites that help businesses build trust, showcase their services, and create a stronger online presence.',
    benefits: ['Builds business credibility', 'Accessible 24/7', 'Supports customer enquiries'],
    features: ['Custom design', 'Mobile-first', 'Fast performance', 'CMS integration'],
    useCases: ['Local Businesses', 'Professional Services', 'Startups', 'Growing Brands'],
    versus: {
      generic: 'A template site or a social page',
      ours: 'Built around your services and search terms, on a domain and codebase you own outright.',
    },
    href: '/services/website-development',
    gradient: 'linear-gradient(135deg, rgba(34,197,94,0.12), rgba(74,222,128,0.05))',
  },
  {
    icon: '◉',
    title: 'Brand Identity',
    tagline: 'Clarity, consistency, trust.',
    description: 'Strategic brand systems that help businesses present themselves professionally and communicate with confidence across every customer touchpoint.',
    benefits: ['Stronger brand recognition', 'Consistent communication', 'Increased customer trust'],
    features: ['Logo & identity', 'Brand guidelines', 'Colour systems', 'Typography'],
    useCases: ['New Businesses', 'Rebranding Projects', 'Expanding Brands', 'Established Companies'],
    versus: {
      generic: 'A one-off logo file',
      ours: 'A documented system your printer, your team and your next designer can all apply without asking us.',
    },
    href: '/services/branding-identity',
    gradient: 'linear-gradient(135deg, rgba(74,222,128,0.12), rgba(34,197,94,0.05))',
  },
  {
    icon: '✦',
    title: 'Business Systems',
    tagline: 'Operations made simpler.',
    description: 'Practical digital systems that help businesses improve communication, customer experience, and day-to-day operations through structured digital tools and workflows.',
    benefits: ['Improved customer experience', 'More efficient operations', 'Better business communication'],
    features: ['Custom CRM Systems', 'Business Automation', 'Admin Dashboards', 'Internal Tools', 'API & System Integration'],
    useCases: ['Sales & CRM', 'Inventory & Orders', 'Billing & Accounts', 'Staff & Operations'],
    versus: {
      generic: 'Off-the-shelf software with a monthly seat fee',
      ours: 'Built to how your business already works, with no per-user pricing and no data held hostage.',
    },
    href: '/services/custom-software-development',
    gradient: 'linear-gradient(135deg, rgba(34,197,94,0.12), rgba(22,163,74,0.05))',
  },
];

export default function FeaturedSolutionsSection() {
  return (
    <section style={{ background: 'var(--bg)', padding: '160px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Background Image for Header */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '550px', zIndex: 0,
        backgroundImage: 'url(/images/backgrounds/featured-bg.webp)',
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
              FEATURED SOLUTIONS
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
            maxWidth: '700px',
          }}>
            Solutions built for{' '}
            <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.6)' }}>
              business growth.
            </span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p style={{
            fontSize: '1.0625rem',
            color: 'rgba(255,255,255,0.55)',
            maxWidth: '500px',
            lineHeight: 1.7,
            marginBottom: '80px',
          }}>
            The solutions most commonly chosen by businesses looking to strengthen their digital presence, improve credibility, and support long-term growth.
          </p>
        </FadeIn>

        <div className="fs-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2px', background: 'rgba(255,255,255,0.04)' }}>
          {SOLUTIONS.map((solution, i) => (
            <FadeIn key={solution.title} delay={staggerDelay(i, 0.1, 0.3)}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: EASE }}
                style={{
                  background: 'var(--bg)',
                  padding: '48px 40px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div className="fs-icon" style={{
                  width: '48px', height: '48px',
                  borderRadius: 'var(--radius-sm)',
                  background: solution.gradient,
                  border: '1px solid rgba(255,255,255,0.06)',
                  marginBottom: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  color: 'var(--color-primary)',
                }}>
                  {solution.icon}
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.75rem',
                  fontWeight: 600,
                  color: '#fff',
                  marginBottom: '8px',
                  lineHeight: 1.2,
                }}>
                  {solution.title}
                </h3>

                <p style={{
                  fontSize: '0.9375rem',
                  color: 'var(--color-primary)',
                  marginBottom: '16px',
                  fontWeight: 500,
                }}>
                  {solution.tagline}
                </p>

                <p style={{
                  fontSize: '0.9375rem',
                  color: 'rgba(255,255,255,0.55)',
                  lineHeight: 1.7,
                  marginBottom: '32px',
                  flex: 1,
                }}>
                  {solution.description}
                </p>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '24px', marginBottom: '24px' }}>
                  <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.48)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>Benefits</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {solution.benefits.map(b => (
                      <span key={b} style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--color-primary)', flexShrink: 0 }} />
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                {/* What is actually included */}
                <div style={{ marginBottom: '24px' }}>
                  <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.48)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
                    Includes
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {solution.features.map(f => (
                      <span key={f} style={{
                        fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)',
                        padding: '5px 12px', borderRadius: '40px',
                        border: '1px solid rgba(255,255,255,0.09)',
                        background: 'rgba(255,255,255,0.02)',
                      }}>
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* The honest comparison. Naming what people would
                    otherwise buy is the whole point of this block —
                    a differentiator with no "than what?" is a slogan. */}
                <div
                  style={{
                    marginBottom: '24px', padding: '16px 18px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid rgba(34,197,94,0.14)',
                    background: 'rgba(34,197,94,0.04)',
                  }}
                >
                  <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.48)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Instead of {solution.versus.generic}
                  </p>
                  <p style={{ fontSize: '0.8438rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.7 }}>
                    {solution.versus.ours}
                  </p>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '26px' }}>
                  {solution.useCases.map(uc => (
                    <span key={uc} style={{
                      fontSize: '0.75rem', color: 'rgba(255,255,255,0.48)',
                      padding: '4px 12px', borderRadius: '40px',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}>
                      {uc}
                    </span>
                  ))}
                </div>

                <Link
                  to={solution.href}
                  onClick={() => trackCta(`See examples: ${solution.title}`, 'featured_solutions', solution.href)}
                  style={{
                    marginTop: 'auto',
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    color: 'var(--color-primary)', textDecoration: 'none',
                    fontSize: '0.875rem', fontWeight: 600,
                    paddingBottom: '6px', width: 'fit-content',
                    borderBottom: '1px solid rgba(34,197,94,0.3)',
                    transition: 'border-color 0.28s ease, gap 0.28s var(--ease-out-expo)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.gap = '12px'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(34,197,94,0.3)'; e.currentTarget.style.gap = '8px'; }}
                >
                  See examples
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 992px) { .fs-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 768px) {
          .fs-grid { grid-template-columns: 1fr !important; }
          .fs-icon {
            width: 32px !important;
            height: 32px !important;
            font-size: 1rem !important;
            margin-bottom: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
