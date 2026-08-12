import { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FadeIn } from '../components/TextReveal';
import { EASE, staggerDelay } from '../utils/motion';

/* Each industry now carries the two things a visitor in that
   trade is actually looking for: concrete deliverables, and a
   route into the matching service page. The challenge/solution
   copy explains the problem; these answer "so what do I buy?". */
const INDUSTRIES_DATA = [
  {
    letter: 'R',
    icon: '◉',
    name: 'Restaurants',
    challenge: 'Delivering a consistent customer experience while managing reservations, menus, and daily operations efficiently.',
    solution: 'Integrated restaurant systems combining websites, QR menus, reservations, and digital branding into one seamless customer journey.',
    deliverables: ['QR menu system', 'Table reservations', 'Menu & brand design', 'Google Business Profile'],
    services: [
      { label: 'Website Development', href: '/services/website-development' },
      { label: 'Digital Presence', href: '/services/digital-presence' },
    ],
  },
  {
    letter: 'C',
    icon: '◈',
    name: 'Cafés',
    challenge: 'Standing out in competitive local markets while encouraging repeat visits and customer loyalty.',
    solution: 'Strong visual branding, professional websites, and digital presence strategies designed to attract and retain customers.',
    deliverables: ['Brand identity', 'Social media kit', 'Menu & signage', 'Local search setup'],
    services: [
      { label: 'Branding & Identity', href: '/services/branding-identity' },
      { label: 'Social Media Design', href: '/services/social-media-design' },
    ],
  },
  {
    letter: 'H',
    icon: '✦',
    name: 'Hotels',
    challenge: 'Building trust online while managing guest inquiries, bookings, and service expectations across multiple channels.',
    solution: 'Professional hospitality websites, booking-focused experiences, and brand systems that strengthen guest confidence.',
    deliverables: ['Booking-focused website', 'Gallery & room pages', 'Enquiry workflow', 'Brand system'],
    services: [
      { label: 'Website Development', href: '/services/website-development' },
      { label: 'Digital Presence', href: '/services/digital-presence' },
    ],
  },
  {
    letter: 'Cl',
    icon: '◇',
    name: 'Clinics',
    challenge: 'Establishing credibility and simplifying appointment-related communication for patients.',
    solution: 'Professional healthcare websites, appointment systems, and digital communication tools designed to improve patient experience.',
    deliverables: ['Appointment enquiry system', 'Doctor & service pages', 'Patient information', 'Local visibility'],
    services: [
      { label: 'Website Development', href: '/services/website-development' },
      { label: 'Digital Presence', href: '/services/digital-presence' },
    ],
  },
  {
    letter: 'RS',
    icon: '○',
    name: 'Retail & Service Businesses',
    challenge: 'Building trust, generating enquiries, and standing out in increasingly competitive local markets.',
    solution: 'Professional websites, branding systems, and digital foundations that help businesses attract and convert customers.',
    deliverables: ['Business website', 'Product & service catalogue', 'Enquiry capture', 'Print & offline collateral'],
    services: [
      { label: 'Website Development', href: '/services/website-development' },
      { label: 'Print & Offline Branding', href: '/services/print-branding' },
    ],
  },
  {
    letter: 'St',
    icon: '◆',
    name: 'Startups',
    challenge: 'Launching with limited market recognition while building credibility and attracting early customers.',
    solution: 'Scalable branding, websites, and digital systems built to support growth from day one.',
    deliverables: ['Launch website', 'Full brand identity', 'Custom CRM / dashboard', 'Investor-ready collateral'],
    services: [
      { label: 'Custom Software & CRM', href: '/services/custom-software-development' },
      { label: 'Branding & Identity', href: '/services/branding-identity' },
    ],
  },
];

const CITY_LINKS = [
  { label: 'Ahmedabad', href: '/ahmedabad' },
  { label: 'Mehsana', href: '/mehsana' },
  { label: 'Visnagar', href: '/visnagar' },
];

/* ─── One industry card ───────────────────────────────────
   The deliverables panel is disclosed rather than always
   visible: six cards each listing four bullets plus two links
   is a wall, and the challenge/solution pair is the part that
   earns the read.

   Implemented as a real <button> with aria-expanded, not a
   hover-only reveal — hover is unavailable on the phones most
   of these visitors are holding.
───────────────────────────────────────────────────────── */
function IndustryCard({ industry, index }) {
  const [open, setOpen] = useState(false);
  const panelId = `${useId()}-panel`;

  return (
    <FadeIn delay={staggerDelay(index, 0.06, 0.3)}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: EASE }}
        style={{
          background: 'var(--bg)',
          padding: '40px 36px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: 'var(--radius-sm)',
            background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            position: 'relative',
          }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-primary)' }}>
              {industry.letter}
            </span>
            <span
              aria-hidden="true"
              style={{
                position: 'absolute', top: '-6px', right: '-6px',
                fontSize: '0.7rem', color: 'var(--color-primary)', opacity: 0.6,
              }}
            >
              {industry.icon}
            </span>
          </div>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.375rem',
            fontWeight: 600,
            color: '#fff',
          }}>
            {industry.name}
          </h3>
        </div>

        <div style={{
          padding: '16px', background: 'rgba(255,255,255,0.02)',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid rgba(255,255,255,0.04)',
          marginBottom: '16px',
          flex: 1,
        }}>
          <span style={{
            fontSize: '0.65rem', color: 'rgba(255,255,255,0.48)',
            letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '6px',
          }}>
            Challenge
          </span>
          <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
            {industry.challenge}
          </p>
        </div>

        <div style={{
          padding: '16px', background: 'rgba(34,197,94,0.04)',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid rgba(34,197,94,0.1)',
        }}>
          <span style={{
            fontSize: '0.65rem', color: 'var(--color-primary)',
            letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '6px',
          }}>
            Our Solution
          </span>
          <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
            {industry.solution}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={panelId}
          style={{
            marginTop: '18px', padding: '10px 0',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            width: '100%', background: 'none', border: 'none', cursor: 'pointer',
            color: open ? 'var(--color-primary)' : 'rgba(255,255,255,0.5)',
            fontFamily: 'var(--font-mono)', fontSize: '0.7188rem',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            transition: 'color 0.25s ease', minHeight: '44px',
          }}
        >
          {open ? 'Hide what we build' : 'What we build for them'}
          <span
            aria-hidden="true"
            style={{
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.32s var(--ease-out-expo)',
              fontSize: '0.7rem', color: 'var(--color-primary)',
            }}
          >
            ▾
          </span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={panelId}
              key="panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.34, ease: EASE }}
              style={{ overflow: 'hidden' }}
            >
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '9px', paddingTop: '4px', marginBottom: '18px' }}>
                {industry.deliverables.map((d) => (
                  <li key={d} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span
                      aria-hidden="true"
                      style={{
                        flexShrink: 0, marginTop: '8px', width: '4px', height: '4px',
                        borderRadius: '50%', background: 'var(--color-primary)',
                      }}
                    />
                    <span style={{ fontSize: '0.8438rem', color: 'rgba(255,255,255,0.62)', lineHeight: 1.6 }}>{d}</span>
                  </li>
                ))}
              </ul>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {industry.services.map((s) => (
                  <Link
                    key={s.href}
                    to={s.href}
                    style={{
                      padding: '7px 14px', borderRadius: 'var(--radius-full)',
                      border: '1px solid rgba(34,197,94,0.24)',
                      background: 'rgba(34,197,94,0.05)',
                      fontSize: '0.75rem', fontFamily: 'var(--font-mono)',
                      color: 'var(--color-primary)', textDecoration: 'none',
                      transition: 'background 0.24s ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(34,197,94,0.13)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(34,197,94,0.05)'; }}
                  >
                    {s.label} →
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </FadeIn>
  );
}

export default function IndustriesSection() {
  return (
    <section style={{ background: 'var(--bg)', padding: '160px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Background Image for Header */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '550px', zIndex: 0,
        backgroundImage: 'url(/images/backgrounds/industries-bg.webp)',
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
              INDUSTRIES WE SERVE
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
            Designed around{' '}
            <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.6)' }}>
              real business challenges
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
            Different industries operate differently. Our solutions are adapted to specific business models, customer expectations, and operational requirements.
          </p>
        </FadeIn>

        <div className="industries-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2px', background: 'rgba(255,255,255,0.04)' }}>
          {INDUSTRIES_DATA.map((industry, i) => (
            <IndustryCard key={industry.name} industry={industry} index={i} />
          ))}
        </div>

        {/* Local intent: someone who recognised their industry above
            usually wants to know whether we work in their city. */}
        <FadeIn delay={0.15}>
          <div
            style={{
              marginTop: '40px', padding: '22px 26px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              gap: '18px', flexWrap: 'wrap',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
              background: 'rgba(31,41,55,0.2)',
            }}
          >
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
              Working across Gujarat and remotely across India.
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {CITY_LINKS.map((c) => (
                <Link
                  key={c.href}
                  to={c.href}
                  style={{
                    padding: '8px 16px', borderRadius: 'var(--radius-full)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    fontSize: '0.8125rem', fontFamily: 'var(--font-mono)',
                    color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
                    transition: 'all 0.25s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(34,197,94,0.4)';
                    e.currentTarget.style.color = 'var(--color-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                  }}
                >
                  {c.label}
                </Link>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      <style>{`
        @media (max-width: 992px) { .industries-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 640px) { .industries-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
