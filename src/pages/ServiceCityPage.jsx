import { Link } from 'react-router-dom';
import Seo, { orgSchema, breadcrumbSchema, faqSchema } from '../components/Seo';
import {
  PageHero, PageSection, SectionHeading, CtaBand, FaqList,
  GlassCard, FeatureGrid, TagRow,
} from '../components/PageKit';
import { ViewAnimator } from '../utils/useInViewLenis';
import { getServiceCityPage, siblingsFor } from '../data/localSeo';
import { SITE } from '../data/site';
import NotFoundPage from './NotFoundPage';

const EASE = [0.16, 1, 0.3, 1];

/* Service offered in a specific place — the schema type Google reads for
   "<service> near me" style queries. Ties the offer to a real geography
   and back to the single Organization node. */
const localServiceSchema = (page) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE.url}${page.path}#service`,
  name: `${page.service.shortTitle} in ${page.city.name}`,
  description: page.metaDescription,
  serviceType: page.service.title,
  url: `${SITE.url}${page.path}`,
  provider: {
    '@type': 'ProfessionalService',
    '@id': `${SITE.url}/#localbusiness`,
    name: SITE.name,
    telephone: SITE.phoneRaw,
    email: SITE.email,
    url: SITE.url,
    image: `${SITE.url}${SITE.ogImage}`,
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
  },
  areaServed: [
    { '@type': 'City', name: page.city.name },
    { '@type': 'AdministrativeArea', name: page.city.region },
    { '@type': 'State', name: 'Gujarat' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: `${page.service.shortTitle} — ${page.city.name}`,
    itemListElement: (page.service.deliverables || []).map((d) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: d.title, description: d.desc },
    })),
  },
});

export default function ServiceCityPage({ slug }) {
  const page = getServiceCityPage(slug);
  if (!page) return <NotFoundPage />;

  const { service, city, angle, faqs } = page;
  const { sameServiceOtherCities, otherServicesSameCity } = siblingsFor(page);

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: city.name, path: `/${city.slug}` },
    { name: `${service.shortTitle} in ${city.name}`, path: page.path },
  ];

  return (
    <>
      <Seo
        path={page.path}
        title={page.metaTitle}
        description={page.metaDescription}
        keywords={page.keywords}
        image={service.image}
        schema={[
          orgSchema(),
          localServiceSchema(page),
          faqSchema(faqs),
          breadcrumbSchema(crumbs),
        ]}
      />

      <PageHero
        eyebrow={`${service.category} · ${city.name.toUpperCase()}`}
        title={`${service.shortTitle} in`}
        titleAccent={city.name}
        subtitle={angle}
        background={`/images/backgrounds/${service.id === 'web-dev' ? 'services' : 'trust'}-bg.webp`}
        breadcrumbs={crumbs}
      >
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          <Link to="/contact" className="btn btn-primary" style={{ boxShadow: '0 0 30px rgba(34,197,94,0.26)' }}>
            Get a Fixed Quote
          </Link>
          <Link to={`/services/${service.slug}`} className="btn btn-outline">
            Full {service.shortTitle} Details
          </Link>
        </div>
      </PageHero>

      {/* ── Why this matters here ── */}
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
            <h2 className="text-heading-3" style={{ color: '#fff', marginBottom: '20px' }}>
              {service.problem?.heading || `Why this matters in ${city.name}`}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.58)', lineHeight: 1.85, fontSize: '1rem', marginBottom: '26px' }}>
              {service.problem?.body}
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {(service.problem?.points || []).map((p) => (
                <li key={p} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <span
                    aria-hidden="true"
                    style={{
                      flexShrink: 0, marginTop: '8px', width: '6px', height: '6px', borderRadius: '50%',
                      background: 'var(--color-primary)', boxShadow: '0 0 10px rgba(34,197,94,0.55)',
                    }}
                  />
                  <span style={{ color: 'rgba(255,255,255,0.62)', lineHeight: 1.78, fontSize: '0.9688rem' }}>{p}</span>
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
                {city.name} — market context
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                {city.context.map((c) => (
                  <li key={c} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--color-primary)', fontSize: '0.85rem', marginTop: '2px' }}>✦</span>
                    <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9063rem', lineHeight: 1.7 }}>{c}</span>
                  </li>
                ))}
              </ul>

              <p
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.16em',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,0.48)', marginBottom: '14px',
                }}
              >
                Areas we cover
              </p>
              <p style={{ color: 'rgba(255,255,255,0.48)', fontSize: '0.875rem', lineHeight: 1.8 }}>
                {city.areas.join(' · ')}
              </p>
            </GlassCard>
          </ViewAnimator>
        </div>
      </PageSection>

      {/* ── What you actually receive ── */}
      <PageSection tint>
        <SectionHeading
          eyebrow="WHAT YOU GET"
          title={`${service.shortTitle} delivered in`}
          accent={city.name}
          subtitle={service.solution?.body}
        />
        <FeatureGrid
          items={(service.deliverables || []).map((d) => ({ title: d.title, desc: d.desc }))}
          numbered
        />
      </PageSection>

      {/* ── Industries here ── */}
      <PageSection>
        <SectionHeading
          eyebrow={`${city.name.toUpperCase()} INDUSTRIES`}
          title="Who we usually build this for in"
          accent={city.name}
          center
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '16px' }}>
          {city.industries.map((ind, i) => (
            <ViewAnimator
              key={ind}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.07, ease: EASE }}
            >
              <div
                style={{
                  padding: '22px 20px', borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)', background: 'rgba(255,255,255,0.015)',
                  display: 'flex', alignItems: 'center', gap: '12px',
                }}
              >
                <span style={{ color: 'var(--color-primary)' }}>✦</span>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9375rem' }}>{ind}</span>
              </div>
            </ViewAnimator>
          ))}
        </div>
      </PageSection>

      {/* ── FAQ ── */}
      <PageSection tint>
        <div style={{ maxWidth: '880px', margin: '0 auto' }}>
          <FaqList faqs={faqs} title={`${service.shortTitle} in ${city.name} — questions we get asked`} />
        </div>
      </PageSection>

      {/* ── Internal linking: the other 17 combinations ── */}
      <PageSection>
        <div className="split-points" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
          <div>
            <p
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.18em',
                textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '22px',
              }}
            >
              {service.shortTitle} elsewhere
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '30px' }}>
              {sameServiceOtherCities.map((p) => (
                <Link
                  key={p.slug}
                  to={p.path}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
                    padding: '16px 20px', textDecoration: 'none', borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)', background: 'rgba(255,255,255,0.015)',
                    transition: 'border-color 0.28s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(34,197,94,0.26)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}
                >
                  <span style={{ color: '#fff', fontSize: '0.9375rem' }}>
                    {p.service.shortTitle} in {p.city.name}
                  </span>
                  <span style={{ color: 'var(--color-primary)', fontSize: '0.8125rem' }}>→</span>
                </Link>
              ))}
            </div>

            <Link to={`/${city.slug}`} className="btn btn-outline">
              Everything we do in {city.name} →
            </Link>
          </div>

          <div>
            <p
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.18em',
                textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '22px',
              }}
            >
              Other services in {city.name}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '30px' }}>
              {otherServicesSameCity.map((p) => (
                <Link
                  key={p.slug}
                  to={p.path}
                  style={{
                    padding: '9px 18px', borderRadius: 'var(--radius-full)',
                    border: '1px solid rgba(34,197,94,0.22)', fontSize: '0.8125rem',
                    color: 'var(--color-primary)', textDecoration: 'none',
                  }}
                >
                  {p.service.shortTitle} ↗
                </Link>
              ))}
            </div>

            <p
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.18em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.48)', marginBottom: '16px',
              }}
            >
              Searches this page answers
            </p>
            <TagRow items={page.keywords} />
          </div>
        </div>
      </PageSection>

      <CtaBand
        eyebrow={`${city.name} · ${service.category}`}
        title={`${service.shortTitle} for your ${city.name} business.`}
        text="Tell us what the business does and what this project needs to change. You get a written scope and a fixed price before anything starts."
        secondaryLabel={`All services in ${city.name}`}
        secondaryHref={`/${city.slug}`}
      />
    </>
  );
}
