import { Link } from 'react-router-dom';
import Seo, { orgSchema, breadcrumbSchema, faqSchema } from '../components/Seo';
import { PageHero, PageSection, SectionHeading, FaqList, GlassCard } from '../components/PageKit';
import { ViewAnimator } from '../utils/useInViewLenis';
import ContactExperience from '../sections/ContactExperience';
import { SITE, WHATSAPP_LINK, CITIES } from '../data/site';
import { SERVICES } from '../data/services';

const EASE = [0.16, 1, 0.3, 1];

const CONTACT_FAQS = [
  {
    q: 'How quickly will I get a response?',
    a: 'We typically respond within one working day, and usually much faster on WhatsApp. If your enquiry is urgent, calling is the quickest route.',
  },
  {
    q: 'What should I have ready for the first call?',
    a: 'Nothing formal. It helps to know roughly what the business does, who your customers are, what is currently not working, and any timeline or budget constraints. If you do not have answers yet, that is exactly what the call is for.',
  },
  {
    q: 'Is the discovery call free?',
    a: 'Yes. The first conversation is a genuine discussion about your requirements with no obligation and no cost. We would rather establish whether we are the right fit before either side commits.',
  },
  {
    q: 'Do you work with clients remotely?',
    a: 'Yes. Most of our work happens over calls, WhatsApp and shared documents. For clients in Visnagar, Mehsana and Ahmedabad, in-person meetings are straightforward when they add value.',
  },
  {
    q: 'What information do you need to give a quote?',
    a: 'The type of project, rough scale (number of pages or scope of functionality), whether content and images exist, any integrations required, and your target timeline. We scope first and quote a fixed price before any work begins.',
  },
];

const CHANNELS = [
  {
    label: 'Call',
    value: SITE.phone,
    href: `tel:${SITE.phoneRaw}`,
    desc: 'Fastest for urgent enquiries. Mon–Sat, 9:30am to 7:00pm IST.',
    icon: '◈',
    external: false,
  },
  {
    label: 'WhatsApp',
    value: 'Message us',
    href: WHATSAPP_LINK,
    desc: 'Best for quick questions, sharing references or sending files.',
    icon: '◉',
    external: true,
  },
  {
    label: 'Email',
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    desc: 'Best for detailed briefs, documents and formal enquiries.',
    icon: '◎',
    external: false,
  },
  {
    label: 'Instagram',
    value: '@manhar.creatives',
    href: SITE.instagram,
    desc: 'See recent work, brand systems and design in progress.',
    icon: '✦',
    external: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <Seo
        path="/contact"
        title={`Contact Us — Book a Discovery Call | ${SITE.name}`}
        description={`Get in touch with ${SITE.name} for website development, custom software, CRM systems, branding and digital presence. Based in ${SITE.address.locality}, ${SITE.address.region} — serving clients across India. Free discovery call, fixed pricing.`}
        keywords={[
          'contact manhar creatives',
          'website development enquiry gujarat',
          'hire web developer visnagar',
          'custom software enquiry india',
          'branding agency contact ahmedabad',
          'book discovery call',
        ]}
        schema={[
          orgSchema(),
          faqSchema(CONTACT_FAQS),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: `Contact ${SITE.name}`,
            url: `${SITE.url}/contact`,
            mainEntity: {
              '@type': 'Organization',
              '@id': `${SITE.url}/#organization`,
              contactPoint: [
                {
                  '@type': 'ContactPoint',
                  telephone: SITE.phoneRaw,
                  email: SITE.email,
                  contactType: 'customer service',
                  areaServed: 'IN',
                  availableLanguage: ['English', 'Hindi', 'Gujarati'],
                },
              ],
            },
          },
        ]}
      />

      <PageHero
        eyebrow="GET IN TOUCH"
        title="Tell us what you’re"
        titleAccent="trying to build."
        subtitle="Describe the business problem rather than the solution. We will tell you honestly what it takes to fix it — including when you need less than you think."
        background="/images/backgrounds/contact-bg.webp"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ]}
      />

      {/* ── Channels ── */}
      <PageSection style={{ paddingTop: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          {CHANNELS.map((c, i) => (
            <ViewAnimator
              key={c.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: EASE }}
              style={{ height: '100%' }}
            >
              <a
                href={c.href}
                {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                style={{ textDecoration: 'none', display: 'block', height: '100%' }}
              >
                <GlassCard padding="30px 26px">
                  <span
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: '42px', height: '42px', borderRadius: 'var(--radius-sm)',
                      background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.16)',
                      color: 'var(--color-primary)', fontSize: '1.05rem', marginBottom: '20px',
                    }}
                  >
                    {c.icon}
                  </span>
                  <p
                    style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.16em',
                      textTransform: 'uppercase', color: 'rgba(255,255,255,0.48)', marginBottom: '10px',
                    }}
                  >
                    {c.label}
                  </p>
                  <p style={{ color: '#fff', fontSize: '1rem', fontWeight: 500, marginBottom: '12px', wordBreak: 'break-word' }}>
                    {c.value}
                  </p>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.48)', lineHeight: 1.7 }}>{c.desc}</p>
                </GlassCard>
              </a>
            </ViewAnimator>
          ))}
        </div>
      </PageSection>

      {/* ── The actual form (reused section) ── */}
      <ContactExperience />

      {/* ── What happens next ── */}
      <PageSection tint>
        <SectionHeading
          eyebrow="WHAT HAPPENS NEXT"
          title="Four steps from message to"
          accent="project start"
          center
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '20px' }}>
          {[
            { n: '01', t: 'We respond', d: 'Within one working day — usually much faster on WhatsApp.' },
            { n: '02', t: 'Discovery call', d: 'A genuine conversation about your business, goals and constraints. Free, no obligation.' },
            { n: '03', t: 'Written proposal', d: 'Scope, deliverables, timeline and fixed pricing, in writing.' },
            { n: '04', t: 'Project starts', d: 'On approval and advance payment, work begins against the agreed plan.' },
          ].map((s, i) => (
            <ViewAnimator
              key={s.n}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
              style={{ height: '100%' }}
            >
              <GlassCard padding="28px 24px">
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--color-primary)', opacity: 0.7, display: 'block', marginBottom: '14px' }}>
                  {s.n}
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600, color: '#fff', marginBottom: '10px' }}>
                  {s.t}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.72 }}>{s.d}</p>
              </GlassCard>
            </ViewAnimator>
          ))}
        </div>
      </PageSection>

      {/* ── Location + quick links ── */}
      <PageSection>
        <div className="split-points" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
          <div>
            <p
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.18em',
                textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '20px',
              }}
            >
              Where we are
            </p>
            <h2 className="text-heading-3" style={{ color: '#fff', marginBottom: '18px' }}>
              {SITE.address.locality}, {SITE.address.region}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.58)', lineHeight: 1.85, fontSize: '1rem', marginBottom: '26px' }}>
              We are based in {SITE.address.locality}, North Gujarat, and work with clients across Ahmedabad,
              Mehsana, the wider Gujarat region, the rest of India and internationally. In-person meetings
              are straightforward for local clients; everything else runs smoothly over calls and WhatsApp.
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {Object.values(CITIES).map((c) => (
                <Link
                  key={c.slug}
                  to={`/${c.slug}`}
                  style={{
                    padding: '9px 20px', borderRadius: 'var(--radius-full)',
                    border: '1px solid rgba(34,197,94,0.22)', background: 'rgba(34,197,94,0.04)',
                    fontSize: '0.8438rem', color: 'var(--color-primary)', textDecoration: 'none',
                  }}
                >
                  {c.name} ↗
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.18em',
                textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '20px',
              }}
            >
              Enquire about a service
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {SERVICES.map((s) => (
                <Link
                  key={s.id}
                  to={`/services/${s.slug}`}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
                    padding: '16px 20px', textDecoration: 'none', borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)', background: 'rgba(255,255,255,0.015)',
                    transition: 'all 0.28s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(34,197,94,0.26)';
                    e.currentTarget.style.background = 'rgba(34,197,94,0.04)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.015)';
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <span style={{ color: 'var(--color-primary)', fontSize: '0.95rem' }}>{s.icon}</span>
                    <span style={{ color: '#fff', fontSize: '0.9375rem' }}>{s.shortTitle}</span>
                  </span>
                  <span style={{ color: 'var(--color-primary)', fontSize: '0.8125rem' }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </PageSection>

      {/* ── FAQ ── */}
      <PageSection tint>
        <div style={{ maxWidth: '880px', margin: '0 auto' }}>
          <FaqList faqs={CONTACT_FAQS} title="Before you get in touch" />
        </div>
      </PageSection>
    </>
  );
}
