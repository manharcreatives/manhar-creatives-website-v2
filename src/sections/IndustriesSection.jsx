import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FadeIn } from '../components/TextReveal';
import { useReducedMotion } from '../utils/motion';

/* Each industry carries the two things a visitor in that trade is
   actually looking for: concrete deliverables, and a route into
   the matching service page. The challenge/solution copy explains
   the problem; these answer "so what do I buy?".

   Restaurants now also link to Custom Software & CRM — QR ordering
   and table-reservation systems are Custom Software deliverables
   post-restructure, not a separate restaurant product. Manufacturing
   & Industrial and Trading & Distribution are new: both trades are
   already established elsewhere in the site's content (city pages,
   the general INDUSTRIES list in constants.js) but were missing a
   full entry here. */
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
      { label: 'Custom Software & CRM', href: '/services/custom-software-development' },
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
    letter: 'M',
    icon: '▣',
    name: 'Manufacturing & Industrial',
    challenge: 'Presenting technical capability and production capacity in a way procurement teams can evaluate without a phone call, while internal coordination still runs on spreadsheets and WhatsApp.',
    solution: 'Capability-led websites built for technical buyers, paired with internal systems (inventory, production tracking, order status) that replace manual coordination.',
    deliverables: ['Capability & process pages', 'Enquiry-to-quote funnel', 'Internal inventory / CRM system', 'Certifications & compliance display'],
    services: [
      { label: 'Website Development', href: '/services/website-development' },
      { label: 'Custom Software & CRM', href: '/services/custom-software-development' },
    ],
  },
  {
    letter: 'T',
    icon: '◐',
    name: 'Trading & Distribution',
    challenge: 'Managing supplier and buyer relationships, stock levels, and order status across phone calls and ledgers, with no single system anyone can check.',
    solution: 'Custom CRM and inventory systems that replace spreadsheet workflows, paired with a professional web presence established traders can point new buyers to.',
    deliverables: ['Custom CRM & inventory system', 'Order & dispatch tracking', 'Business website', 'Digital catalogue'],
    services: [
      { label: 'Custom Software & CRM', href: '/services/custom-software-development' },
      { label: 'Website Development', href: '/services/website-development' },
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

const GAP = 28;

/* ─── One industry panel ───────────────────────────────────
   Unlike the hairline-grid card this replaces, a panel here has
   the whole width of a horizontal track to work with, so every
   field the old card disclosed on click — deliverables, linked
   services — is shown directly. Nothing is hidden behind a toggle;
   the redesign changes presentation and count, not content.
───────────────────────────────────────────────────────── */
function IndustryPanel({ industry, index, total }) {
  return (
    <div
      className="industry-panel"
      style={{
        flex: '0 0 min(84vw, 420px)',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 'var(--radius-lg)',
        padding: '40px 34px',
        position: 'relative',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: 'absolute', top: '26px', right: '30px',
          fontFamily: 'var(--font-mono)', fontSize: '0.6875rem',
          color: 'rgba(255,255,255,0.28)', letterSpacing: '0.1em',
        }}
      >
        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '26px', paddingRight: '48px' }}>
        <div style={{
          width: '48px', height: '48px', borderRadius: 'var(--radius-sm)',
          background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          position: 'relative',
        }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1875rem', fontWeight: 600, color: 'var(--color-primary)' }}>
            {industry.letter}
          </span>
          <span
            aria-hidden="true"
            style={{ position: 'absolute', top: '-6px', right: '-6px', fontSize: '0.75rem', color: 'var(--color-primary)', opacity: 0.6 }}
          >
            {industry.icon}
          </span>
        </div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3125rem', fontWeight: 600, color: '#fff', lineHeight: 1.2 }}>
          {industry.name}
        </h3>
      </div>

      <div style={{
        padding: '15px 16px', background: 'rgba(255,255,255,0.02)',
        borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255,255,255,0.04)',
        marginBottom: '12px',
      }}>
        <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.48)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
          Challenge
        </span>
        <p style={{ fontSize: '0.8438rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
          {industry.challenge}
        </p>
      </div>

      <div style={{
        padding: '15px 16px', background: 'rgba(34,197,94,0.04)',
        borderRadius: 'var(--radius-sm)', border: '1px solid rgba(34,197,94,0.1)',
        marginBottom: '20px',
      }}>
        <span style={{ fontSize: '0.65rem', color: 'var(--color-primary)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
          Our Solution
        </span>
        <p style={{ fontSize: '0.8438rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
          {industry.solution}
        </p>
      </div>

      <div style={{ marginBottom: '20px', flex: 1 }}>
        <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
          What we build
        </span>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {industry.deliverables.map((d) => (
            <li key={d} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <span aria-hidden="true" style={{ flexShrink: 0, marginTop: '7px', width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-primary)' }} />
              <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.62)', lineHeight: 1.6 }}>{d}</span>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: 'auto' }}>
        {industry.services.map((s) => (
          <Link
            key={s.href}
            to={s.href}
            style={{
              padding: '7px 13px', borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(34,197,94,0.24)',
              background: 'rgba(34,197,94,0.05)',
              fontSize: '0.7188rem', fontFamily: 'var(--font-mono)',
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
    </div>
  );
}

/* ─── Fallback: native horizontal snap-scroll ──────────────
   Used on small screens and whenever the visitor has asked the
   OS for reduced motion — pinning the section for a scroll-jacked
   translateX is exactly the kind of motion that setting exists to
   avoid, and vh-based pin heights are unreliable on mobile browser
   chrome anyway. A plain swipeable track still reads as "horizontal,
   not a grid" without either problem. ─────────────────────── */
function IndustryTrackStatic({ industries }) {
  return (
    <div
      className="industries-track-static"
      style={{
        display: 'flex', gap: `${GAP}px`, overflowX: 'auto',
        WebkitOverflowScrolling: 'touch', scrollSnapType: 'x proximity',
        padding: '4px clamp(24px, 6vw, 80px) 28px',
      }}
    >
      {industries.map((industry, i) => (
        <div key={industry.name} style={{ scrollSnapAlign: 'start' }}>
          <IndustryPanel industry={industry} index={i} total={industries.length} />
        </div>
      ))}
    </div>
  );
}

/* ─── Pinned horizontal track ───────────────────────────────
   The section's vertical scroll is converted to horizontal
   panel movement while the viewport is pinned — distinct from
   every other scroll treatment on this page: ServicesUniverse
   parallaxes full-bleed panels vertically, ProcessJourney keeps
   a fixed image following a hovered step in a vertical list,
   ProjectShowcase stacks full-screen panels with a scale/y
   parallax. Nothing else on the homepage moves content
   horizontally against a vertical scroll.

   This deliberately does NOT use `position: sticky` (the first
   version did, and it broke): every section on this page — this
   one included — sets `overflow: hidden` for its own background
   effects, and an `overflow: hidden` ancestor changes a sticky
   element's containing block so it stops tracking the real
   viewport, drifting off the top of the screen mid-scroll instead
   of staying put. ProcessJourney.jsx hit the same wall already and
   solves it with a `position: fixed` panel whose visible area is
   clipped every frame to the section's own on-screen bounds via
   `clipPath`, driven by a small rAF loop rather than CSS sticky —
   this reuses that exact, already-proven pattern. */
function IndustryTrackPinned({ industries }) {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const rafRef = useRef(null);
  const [maxScroll, setMaxScroll] = useState(0);
  const [progress, setProgress] = useState(0);
  const [clip, setClip] = useState({
    top: 0,
    bottom: typeof window === 'undefined' ? 900 : window.innerHeight,
  });

  useEffect(() => {
    function measure() {
      if (!trackRef.current) return;
      const trackWidth = trackRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      setMaxScroll(Math.max(0, trackWidth - viewportWidth));
    }
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    function tick() {
      if (wrapperRef.current) {
        const rect = wrapperRef.current.getBoundingClientRect();
        const scrollableDistance = Math.max(1, rect.height - window.innerHeight);
        const raw = -rect.top / scrollableDistance;
        setProgress(Math.max(0, Math.min(1, raw)));
        setClip({
          top: Math.max(0, rect.top),
          bottom: Math.min(window.innerHeight, rect.bottom),
        });
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const viewportH = typeof window === 'undefined' ? 900 : window.innerHeight;
  const trackX = -progress * maxScroll;

  return (
    <div ref={wrapperRef} style={{ height: `calc(100vh + ${maxScroll}px)`, position: 'relative' }}>
      <div
        style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center',
          clipPath: `inset(${clip.top}px 0px ${viewportH - clip.bottom}px 0px)`,
        }}
      >
        <div
          ref={trackRef}
          style={{
            display: 'flex', gap: `${GAP}px`, alignItems: 'stretch',
            paddingLeft: 'clamp(24px, 6vw, 80px)', paddingRight: 'clamp(24px, 6vw, 80px)',
            transform: `translateX(${trackX}px)`,
            willChange: 'transform',
          }}
        >
          {industries.map((industry, i) => (
            <IndustryPanel key={industry.name} industry={industry} index={i} total={industries.length} />
          ))}
        </div>

        {/* Scroll progress rail — the only cue a visitor needs that
            vertical scrolling is what's driving this. */}
        <div style={{
          position: 'absolute', bottom: '48px', left: 'clamp(24px, 6vw, 80px)', right: 'clamp(24px, 6vw, 80px)',
          height: '2px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden',
        }}>
          <div style={{ height: '100%', background: 'var(--color-primary)', transformOrigin: '0% 50%', transform: `scaleX(${progress})` }} />
        </div>
      </div>
    </div>
  );
}

export default function IndustriesSection() {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 900);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 900);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const usePinned = !isMobile && !reducedMotion;

  return (
    <section style={{ background: 'var(--bg)', padding: '160px 0 120px', position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative', zIndex: 2, marginBottom: '64px' }}>
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
            maxWidth: '520px',
            lineHeight: 1.7,
          }}>
            Different industries operate differently. Our solutions are adapted to specific business models, customer expectations, and operational requirements.
            {usePinned && <span style={{ display: 'block', marginTop: '10px', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>Keep scrolling: eight industries, one continuous track.</span>}
          </p>
        </FadeIn>
      </div>

      {usePinned ? (
        <IndustryTrackPinned industries={INDUSTRIES_DATA} />
      ) : (
        <IndustryTrackStatic industries={INDUSTRIES_DATA} />
      )}

      {/* Local intent: someone who recognised their industry above
          usually wants to know whether we work in their city. */}
      <div className="container" style={{ position: 'relative', zIndex: 2, marginTop: usePinned ? '48px' : '8px' }}>
        <FadeIn delay={0.15}>
          <div
            style={{
              padding: '22px 26px',
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
        .industry-panel { min-height: 520px; }
        .industries-track-static::-webkit-scrollbar { display: none; }
        .industries-track-static { scrollbar-width: none; }
        @media (max-width: 640px) {
          .industry-panel { padding: 32px 26px !important; min-height: 480px; }
        }
      `}</style>
    </section>
  );
}
