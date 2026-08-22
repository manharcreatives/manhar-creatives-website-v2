import { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '../components/TextReveal';
import { EASE, staggerDelay } from '../utils/motion';

/* `detail` is what the benefit looks like in practice. The
   headline claims are necessarily general — this is where each
   one becomes checkable. Deliberately no invented percentages:
   a made-up "+47% conversions" is worth less than nothing to a
   business owner who has heard it from five other agencies. */
const BENEFITS = [
  {
    icon: '◈',
    title: 'Credibility & Authority',
    description: 'A brand and website built specifically for your business, never a template, help you establish credibility and create a stronger first impression than competitors running generic setups.',
    image: '/images/cards/benefit-credibility.webp',
    detail: 'In practice: a site that loads fast, states clearly what you do, and shows real work, built for you and no one else, so a prospect who searched your name before replying to your quotation finds a company, not a placeholder.',
    proof: ['Clear service pages', 'Real project evidence', 'Consistent contact details'],
  },
  {
    icon: '◇',
    title: 'Brand Recognition',
    description: 'Consistent branding helps businesses communicate clearly, stand out from competitors, and remain memorable.',
    image: '/images/cards/benefit-recognition.webp',
    detail: 'In practice: one logo system, one colour set, one typeface pairing, applied identically across your website, invoices, signage and social posts, so people recognise you before they read the name.',
    proof: ['Logo & usage rules', 'Colour and type system', 'Templates your team can reuse'],
  },
  {
    icon: '○',
    title: 'Customer Trust',
    description: 'Clear communication, professional presentation, and reliable experiences help customers feel confident choosing your business.',
    image: '/images/cards/benefit-trust.webp',
    detail: 'In practice: honest pages that answer the questions people actually ask before buying (what it includes, how long it takes, what happens next) rather than making them phone to find out.',
    proof: ['Plain-language service copy', 'Answered FAQs', 'Visible policies and terms'],
  },
  {
    icon: '◎',
    title: 'Online Visibility',
    description: 'A strong digital presence improves discoverability and helps potential customers find your business more easily.',
    image: '/images/cards/benefit-visibility.webp',
    detail: 'In practice: correct on-page and technical SEO built into the site at launch, structured data, a complete Google Business Profile and city-level pages, so you appear for the searches people in your area are already making. Ongoing SEO growth work, once you want it, is scoped separately after the foundation is live.',
    proof: ['Structured data & sitemaps', 'Google Business Profile setup', 'Location-specific pages'],
  },
  {
    icon: '✦',
    title: 'Consistent Communication',
    description: 'Unified communication channels help businesses respond faster, maintain professionalism, and improve customer interactions.',
    image: '/images/cards/benefit-communication.webp',
    detail: 'In practice: every enquiry lands in one place (email, sheet and CRM together) instead of being split across WhatsApp, a form nobody checks and a notebook.',
    proof: ['Single enquiry inbox', 'Automatic CRM record', 'Defined response process'],
  },
  {
    icon: '◆',
    title: 'Scalable Foundation',
    description: 'Structured systems and scalable digital infrastructure (built with where your business is headed in mind, not just where it is today) support long-term growth without requiring constant rebuilding.',
    image: '/images/cards/benefit-scalable.webp',
    detail: 'In practice: you own the code, the domain and the accounts. Adding a service, a location or a language later is an edit, not a rebuild, and not a fresh negotiation.',
    proof: ['Full ownership of assets', 'Documented structure', 'Room to add pages and features'],
  },
];

/* ─── One benefit card ────────────────────────────────────
   Collapsed by default. The six headline claims are what the
   section is for; the specifics are one click away for the
   visitor who wants to check whether we mean it.
───────────────────────────────────────────────────────── */
function BenefitCard({ benefit, index }) {
  const [open, setOpen] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const panelId = `${useId()}-detail`;

  return (
    <FadeIn delay={staggerDelay(index, 0.07, 0.32)}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="benefit-card"
        style={{
          background: 'var(--bg)',
          padding: '48px 40px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          className="benefit-image-wrap"
          style={{
            position: 'relative', width: '100%', height: '160px',
            borderRadius: '4px', overflow: 'hidden', marginBottom: '24px',
            background: 'linear-gradient(135deg, rgba(34,197,94,0.08), rgba(11,15,14,0.9))',
          }}
        >
          <img
            className="benefit-image"
            src={benefit.image}
            alt={`${benefit.title}: ${benefit.description.slice(0, 60)}`}
            loading="lazy"
            decoding="async"
            onLoad={() => setImgLoaded(true)}
            onError={(e) => { e.currentTarget.style.display = 'none'; setImgLoaded(true); }}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              opacity: imgLoaded ? 1 : 0,
              transform: imgLoaded ? 'scale(1)' : 'scale(1.03)',
              transition: 'opacity 0.7s var(--ease-out-expo), transform 0.9s var(--ease-out-expo)',
            }}
          />
        </div>

        <div className="benefit-icon" style={{
          width: '48px', height: '48px',
          borderRadius: 'var(--radius-sm)',
          background: 'rgba(34,197,94,0.08)',
          border: '1px solid rgba(34,197,94,0.15)',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.25rem',
          color: 'var(--color-primary)',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          transition: 'transform 0.5s var(--ease-out-expo)',
        }}>
          {benefit.icon}
        </div>

        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.375rem',
          fontWeight: 600,
          color: '#fff',
          marginBottom: '16px',
          lineHeight: 1.2,
        }}>
          {benefit.title}
        </h3>

        <p style={{
          fontSize: '0.9375rem',
          color: 'rgba(255,255,255,0.55)',
          lineHeight: 1.7,
          flex: 1,
        }}>
          {benefit.description}
        </p>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={panelId}
          style={{
            marginTop: '20px', padding: '10px 0',
            display: 'flex', alignItems: 'center', gap: '10px',
            background: 'none', border: 'none', cursor: 'pointer',
            color: open ? 'var(--color-primary)' : 'rgba(255,255,255,0.5)',
            fontFamily: 'var(--font-mono)', fontSize: '0.7188rem',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            transition: 'color 0.25s ease', minHeight: '44px', textAlign: 'left',
          }}
        >
          {open ? 'Less' : 'What this means'}
          <span
            aria-hidden="true"
            style={{
              display: 'inline-block',
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
              key="detail"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.34, ease: EASE }}
              style={{ overflow: 'hidden' }}
            >
              <p style={{
                fontSize: '0.875rem', color: 'rgba(255,255,255,0.68)',
                lineHeight: 1.75, paddingTop: '4px', marginBottom: '16px',
              }}>
                {benefit.detail}
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {benefit.proof.map((p) => (
                  <li
                    key={p}
                    style={{
                      padding: '6px 13px', borderRadius: 'var(--radius-full)',
                      border: '1px solid rgba(34,197,94,0.2)',
                      background: 'rgba(34,197,94,0.05)',
                      fontSize: '0.7188rem', fontFamily: 'var(--font-mono)',
                      color: 'var(--color-primary)',
                    }}
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </FadeIn>
  );
}

export default function BenefitsSection() {
  return (
    <section style={{ background: 'var(--bg)', padding: '160px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Background Image for Header */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '550px', zIndex: 0,
        backgroundImage: 'url(/images/backgrounds/benefits-bg.webp)',
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: 0.2,
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
              RESULTS & BENEFITS
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
            Designed to deliver{' '}
            <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.6)' }}>
              real business value.
            </span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p style={{
            fontSize: '1.0625rem',
            color: 'rgba(255,255,255,0.55)',
            maxWidth: '540px',
            lineHeight: 1.7,
            marginBottom: '80px',
          }}>
            Every solution is designed to strengthen credibility, improve customer experience, and support long-term business growth.
          </p>
        </FadeIn>

        <div className="benefits-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2px', background: 'rgba(255,255,255,0.04)' }}>
          {BENEFITS.map((benefit, i) => (
            <BenefitCard key={benefit.title} benefit={benefit} index={i} />
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) {
          .benefits-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 768px) {
          .benefits-grid { grid-template-columns: 1fr !important; }
          .benefit-card { padding: 32px 24px !important; }
          .benefit-image-wrap { height: 200px !important; margin-bottom: 0 !important; margin-top: 24px !important; order: 10 !important; }
          .benefit-icon {
            width: 28px !important;
            height: 28px !important;
            font-size: 0.75rem !important;
            margin-bottom: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}
