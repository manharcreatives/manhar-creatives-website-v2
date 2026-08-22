import { Link } from 'react-router-dom';
import Seo, { orgSchema, breadcrumbSchema, faqSchema, localBusinessSchema } from '../components/Seo';
import {
  PageHero, PageSection, SectionHeading, CtaBand, FaqList,
  GlassCard, TagRow, StatStrip,
} from '../components/PageKit';
import { ViewAnimator } from '../utils/useInViewLenis';
import { SERVICES } from '../data/services';
import { CITIES, SITE, STATS } from '../data/site';
import { POSTS } from '../data/blog';

const EASE = [0.16, 1, 0.3, 1];

const cityFaqs = (city) => [
  {
    q: `Do you provide website development services in ${city.name}?`,
    a: `Yes. We deliver website development, custom software, branding, social media design, print branding and digital presence setup for businesses in ${city.name} and across ${city.region}. We are based in ${SITE.address.locality}, so in-person meetings are straightforward where they help.`,
  },
  {
    q: `How much does a website cost for a business in ${city.name}?`,
    a: 'Cost depends on scope: number of unique page templates, custom functionality, content requirements and integrations. A professional multi-page business website typically falls between ₹25,000 and ₹80,000, with premium custom builds above that. We scope first and quote a fixed price before starting.',
  },
  {
    q: `Can you help my ${city.name} business rank on Google?`,
    a: `We build the technical and structural foundation that ranking depends on (fast loading, semantic structure, schema markup, clean URLs, mobile usability) and set up your Google Business Profile properly for local map visibility. Rankings also depend on content and consistency over time, which we can support on an ongoing basis.`,
  },
  {
    q: `Do you work with small businesses in ${city.name}?`,
    a: 'Yes. Most of our clients are small and mid-sized businesses: manufacturers, traders, clinics, retailers, educational institutions and service companies. We scope projects so you can start with the highest-impact piece rather than paying for everything at once.',
  },
  {
    q: `How do we start a project?`,
    a: `Book a discovery call or message us on WhatsApp. We will discuss what your business is trying to achieve, recommend the most sensible starting point, and share a written scope with fixed pricing before any work begins.`,
  },
];

export default function CityPage({ citySlug }) {
  const city = CITIES[citySlug];
  if (!city) return null;

  const faqs = cityFaqs(city);

  return (
    <>
      <Seo
        path={`/${city.slug}`}
        title={`Website Development & Custom Software Company in ${city.name} | Manhar Creatives`}
        description={`Website development, custom software and CRM, branding, and Google Business Profile setup for businesses in ${city.name}, ${city.region}. Locally based, fixed pricing, full ownership of code and data.`}
        keywords={city.keywords}
        schema={[
          orgSchema(),
          localBusinessSchema(city),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: city.name, path: `/${city.slug}` },
          ]),
        ]}
      />

      <PageHero
        eyebrow={`${city.name.toUpperCase()} · ${city.region.toUpperCase()}`}
        title={`Digital solutions for businesses in`}
        titleAccent={city.name}
        subtitle={city.intro}
        background="/images/backgrounds/trust-bg.webp"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: city.name, path: `/${city.slug}` },
        ]}
      >
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          <Link to="/contact" className="btn btn-primary" style={{ boxShadow: '0 0 30px rgba(34,197,94,0.26)' }}>
            Book a Discovery Call
          </Link>
          <Link to="/projects" className="btn btn-outline">See Our Work</Link>
        </div>
      </PageHero>

      {/* ── Local context ── */}
      <PageSection style={{ paddingTop: 0 }}>
        <div
          className="split-points"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'start' }}
        >
          <ViewAnimator
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-10%' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <h2 className="text-heading-3" style={{ color: '#fff', marginBottom: '22px' }}>
              What we see in the {city.name} market
            </h2>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {city.context.map((c) => (
                <li key={c} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <span
                    aria-hidden="true"
                    style={{
                      flexShrink: 0, marginTop: '8px', width: '6px', height: '6px', borderRadius: '50%',
                      background: 'var(--color-primary)', boxShadow: '0 0 10px rgba(34,197,94,0.55)',
                    }}
                  />
                  <span style={{ color: 'rgba(255,255,255,0.62)', lineHeight: 1.78, fontSize: '0.9688rem' }}>{c}</span>
                </li>
              ))}
            </ul>
          </ViewAnimator>

          <ViewAnimator
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-10%' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <GlassCard padding="34px 32px">
              <p
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.16em',
                  textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '20px',
                }}
              >
                Industries we serve in {city.name}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '13px', marginBottom: '28px' }}>
                {city.industries.map((ind) => (
                  <div key={ind} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ color: 'var(--color-primary)', fontSize: '0.9rem' }}>✦</span>
                    <span style={{ color: 'rgba(255,255,255,0.68)', fontSize: '0.9375rem' }}>{ind}</span>
                  </div>
                ))}
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.16em',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,0.48)', marginBottom: '14px',
                }}
              >
                Areas covered
              </p>
              <p style={{ color: 'rgba(255,255,255,0.48)', fontSize: '0.875rem', lineHeight: 1.8 }}>
                {city.areas.join(' · ')}
              </p>
            </GlassCard>
          </ViewAnimator>
        </div>
      </PageSection>

      {/* ── Services in this city (anchor targets for legacy URLs) ── */}
      <PageSection background="/images/backgrounds/services-bg.webp" bgOpacity={0.08}>
        <SectionHeading
          eyebrow="SERVICES"
          title={`What we deliver in`}
          accent={city.name}
          subtitle={`Every service below is available to businesses in ${city.name} and the surrounding ${city.region} region.`}
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {SERVICES.map((s, i) => (
            <ViewAnimator
              key={s.id}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-8%' }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: EASE }}
              style={{ height: '100%' }}
            >
              {/* Points at the service × city landing page, not the generic
                  service page — that is the one written for this market. */}
              <div id={s.id} style={{ height: '100%', scrollMarginTop: '110px' }}>
                <Link to={`/${s.slug}-in-${city.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                  <GlassCard>
                    <span
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        width: '42px', height: '42px', borderRadius: 'var(--radius-sm)',
                        background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.16)',
                        color: 'var(--color-primary)', fontSize: '1.1rem', marginBottom: '18px',
                      }}
                    >
                      {s.icon}
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.0625rem', fontWeight: 600, color: '#fff', marginBottom: '10px', lineHeight: 1.35 }}>
                      {s.shortTitle} in {city.name}
                    </h3>
                    <p style={{ fontSize: '0.9063rem', color: 'rgba(255,255,255,0.52)', lineHeight: 1.75, marginBottom: '18px' }}>
                      {s.description}
                    </p>
                    <span style={{ color: 'var(--color-primary)', fontSize: '0.8125rem', fontWeight: 600 }}>Learn more →</span>
                  </GlassCard>
                </Link>
              </div>
            </ViewAnimator>
          ))}
        </div>
      </PageSection>

      {/* ── Why us ── */}
      <PageSection tint>
        <SectionHeading
          eyebrow="WHY MANHAR CREATIVES"
          title={`Why ${city.name} businesses`}
          accent="work with us"
          center
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '48px' }}>
          {[
            { t: 'Locally based', d: `We are in ${SITE.address.locality}, ${SITE.address.region}, not an offshore team you never speak to. In-person meetings when they help, everything else over calls and WhatsApp.` },
            { t: 'Fixed scope, fixed price', d: 'A written scope and a fixed quote before work starts. Anything outside it is quoted separately and needs your approval: no surprise invoices.' },
            { t: 'You own everything', d: 'Source code, domain, hosting account and data are registered in your name and handed over in full. No lock-in, ever.' },
            { t: 'Built to be found', d: 'Performance, semantic structure, schema markup and Google Business Profile setup are part of the build, not an upsell afterwards.' },
            { t: 'Straight answers', d: 'We will tell you when you need less than you asked for, and when an off-the-shelf tool serves you better than a custom build.' },
            { t: 'Support after launch', d: 'Handover includes training and a support period. We do not disappear the day the invoice is settled.' },
          ].map((item, i) => (
            <ViewAnimator
              key={item.t}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: EASE }}
              style={{ height: '100%' }}
            >
              <GlassCard>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.0625rem', fontWeight: 600, color: '#fff', marginBottom: '12px' }}>
                  {item.t}
                </h3>
                <p style={{ fontSize: '0.9063rem', color: 'rgba(255,255,255,0.52)', lineHeight: 1.75 }}>{item.d}</p>
              </GlassCard>
            </ViewAnimator>
          ))}
        </div>
        <StatStrip stats={STATS} />
      </PageSection>

      {/* ── Reading + keywords ── */}
      <PageSection>
        <div className="split-points" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
          <div>
            <p
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.18em',
                textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '22px',
              }}
            >
              Useful reading
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {POSTS.slice(0, 4).map((p) => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
                    padding: '18px 20px', textDecoration: 'none', borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)', background: 'rgba(255,255,255,0.015)',
                    transition: 'all 0.28s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(34,197,94,0.26)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}
                >
                  <span style={{ color: '#fff', fontSize: '0.9375rem', lineHeight: 1.5 }}>{p.title}</span>
                  <span style={{ color: 'var(--color-primary)', fontSize: '0.8125rem', whiteSpace: 'nowrap' }}>→</span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.18em',
                textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '22px',
              }}
            >
              What we are known for in {city.name}
            </p>
            <TagRow items={city.keywords} />
            <p style={{ color: 'rgba(255,255,255,0.48)', fontSize: '0.875rem', lineHeight: 1.8, marginTop: '24px' }}>
              Also serving nearby: {Object.values(CITIES).filter((c) => c.slug !== city.slug).map((c) => c.name).join(', ')} and the wider {city.region} region.
            </p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '18px', flexWrap: 'wrap' }}>
              {Object.values(CITIES)
                .filter((c) => c.slug !== city.slug)
                .map((c) => (
                  <Link
                    key={c.slug}
                    to={`/${c.slug}`}
                    style={{
                      padding: '8px 18px', borderRadius: 'var(--radius-full)',
                      border: '1px solid rgba(34,197,94,0.22)', fontSize: '0.8125rem',
                      color: 'var(--color-primary)', textDecoration: 'none',
                    }}
                  >
                    {c.name} ↗
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </PageSection>

      {/* ── FAQ ── */}
      <PageSection tint>
        <div style={{ maxWidth: '880px', margin: '0 auto' }}>
          <FaqList faqs={faqs} title={`${city.name}: frequently asked questions`} />
        </div>
      </PageSection>

      <CtaBand
        eyebrow={city.name}
        title={`Let’s grow your ${city.name} business.`}
        text="Book a discovery call and we will map out what your business actually needs, starting with the piece that pays back fastest."
        secondaryLabel="View All Services"
        secondaryHref="/services"
      />
    </>
  );
}
