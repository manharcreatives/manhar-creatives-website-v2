import { useParams, Navigate, Link } from 'react-router-dom';
import Seo, { orgSchema, breadcrumbSchema, faqSchema, serviceSchema } from '../components/Seo';
import {
  PageHero, PageSection, SectionHeading, CtaBand, FaqList,
  FeatureGrid, TagRow, SplitPoints, GlassCard,
} from '../components/PageKit';
import { ViewAnimator } from '../utils/useInViewLenis';
import { getServiceBySlug, SERVICES } from '../data/services';
import { CITIES, SITE } from '../data/site';
import { POSTS } from '../data/blog';

const EASE = [0.16, 1, 0.3, 1];

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  if (!service) return <Navigate to="/services" replace />;

  const related = (service.related || [])
    .map((id) => SERVICES.find((s) => s.id === id))
    .filter(Boolean);

  /* Blog posts that share keywords with this service — internal linking */
  const relatedPosts = POSTS.filter((p) =>
    p.tags.some((t) => service.title.toLowerCase().includes(t.toLowerCase()) || t.toLowerCase().includes(service.category.toLowerCase()))
  ).slice(0, 3);

  const posts = relatedPosts.length ? relatedPosts : POSTS.slice(0, 3);

  return (
    <>
      <Seo
        path={`/services/${service.slug}`}
        title={service.metaTitle}
        description={service.metaDescription}
        keywords={service.keywords}
        image={service.image}
        schema={[
          orgSchema(),
          serviceSchema(service),
          faqSchema(service.faqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: service.title, path: `/services/${service.slug}` },
          ]),
        ]}
      />

      <PageHero
        eyebrow={service.category}
        title={service.title}
        subtitle={service.description}
        background={service.image}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: service.shortTitle, path: `/services/${service.slug}` },
        ]}
      >
        <div style={{ display: 'flex', gap: '28px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link to="/contact" className="btn btn-primary" style={{ boxShadow: '0 0 30px rgba(34,197,94,0.26)' }}>
            Book a Discovery Call
          </Link>
          {service.heroStat && (
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 600,
                  color: 'var(--color-primary)', lineHeight: 1,
                }}
              >
                {service.heroStat.value}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,0.48)',
                }}
              >
                {service.heroStat.label}
              </span>
            </div>
          )}
        </div>
      </PageHero>

      {/* ── Problem ── */}
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
            <p
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.18em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.48)', marginBottom: '18px',
              }}
            >
              The problem
            </p>
            <h2 className="text-heading-3" style={{ color: '#fff', marginBottom: '20px' }}>
              {service.problem.heading}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.85, fontSize: '1.0313rem' }}>
              {service.problem.body}
            </p>
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
                  textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '22px',
                }}
              >
                What this looks like
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {service.problem.points.map((p) => (
                  <li key={p} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <span
                      aria-hidden="true"
                      style={{
                        flexShrink: 0, marginTop: '4px', width: '18px', height: '18px',
                        borderRadius: '50%', border: '1px solid rgba(239,68,68,0.35)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'rgba(239,68,68,0.75)', fontSize: '0.65rem',
                      }}
                    >
                      ✕
                    </span>
                    <span style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.72, fontSize: '0.9375rem' }}>{p}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </ViewAnimator>
        </div>
      </PageSection>

      {/* ── Solution ── */}
      <PageSection tint>
        <div style={{ maxWidth: '780px' }}>
          <p
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '18px',
            }}
          >
            Our approach
          </p>
          <h2 className="text-heading-2" style={{ color: '#fff', marginBottom: '22px' }}>
            {service.solution.heading}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.62)', lineHeight: 1.9, fontSize: '1.0938rem' }}>
            {service.solution.body}
          </p>
        </div>
      </PageSection>

      {/* ── Deliverables ── */}
      <PageSection background="/images/backgrounds/process-bg.webp" bgOpacity={0.08}>
        <SectionHeading
          eyebrow="WHAT YOU GET"
          title="Included in every"
          accent={service.shortTitle.toLowerCase() + ' project'}
          subtitle="Defined deliverables, written into the scope before work begins — so you know exactly what you are paying for."
        />
        <FeatureGrid items={service.deliverables} numbered />
      </PageSection>

      {/* ── Use cases (custom software only) ── */}
      {service.useCases && (
        <PageSection>
          <SectionHeading
            eyebrow="USE CASES"
            title="Where custom software"
            accent="pays for itself"
            subtitle="The workflows businesses most often ask us to build — each one replacing manual effort with something reliable."
          />
          <FeatureGrid items={service.useCases} />
        </PageSection>
      )}

      {/* ── Tech / tools ── */}
      {service.tech && (
        <PageSection tint style={{ paddingTop: 0 }}>
          <div
            style={{
              padding: '38px 34px', borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)', background: 'rgba(31,41,55,0.2)',
              backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.18em',
                textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '22px',
              }}
            >
              Tools & technology
            </p>
            <TagRow items={service.tech} accent />
          </div>
        </PageSection>
      )}

      {/* ── Local availability ── */}
      <PageSection>
        <SplitPoints
          heading={`${service.shortTitle} across Gujarat and India`}
          body={`We are based in ${SITE.address.locality} and deliver ${service.title.toLowerCase()} projects across Ahmedabad, Mehsana, North Gujarat and the rest of India. Being locally based means face-to-face meetings when they help — and everything else handled over calls, WhatsApp and shared documents.`}
          points={[
            'Direct communication with the people actually doing the work',
            'Written scope and fixed pricing before the project starts',
            'You own the code, the domain, the hosting and the data',
            'Support after launch, not silence after handover',
          ]}
        />
        <div style={{ marginTop: '36px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {Object.values(CITIES).map((c) => (
            <Link
              key={c.slug}
              to={`/${service.slug}-in-${c.slug}`}
              style={{
                padding: '9px 20px', borderRadius: 'var(--radius-full)',
                border: '1px solid rgba(34,197,94,0.22)', background: 'rgba(34,197,94,0.04)',
                fontSize: '0.8438rem', color: 'var(--color-primary)', textDecoration: 'none',
                transition: 'all 0.25s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(34,197,94,0.1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(34,197,94,0.04)'; }}
            >
              {service.shortTitle} in {c.name} ↗
            </Link>
          ))}
        </div>
      </PageSection>

      {/* ── FAQ ── */}
      <PageSection tint>
        <div style={{ maxWidth: '880px', margin: '0 auto' }}>
          <FaqList faqs={service.faqs} title={`${service.shortTitle} — common questions`} />
        </div>
      </PageSection>

      {/* ── Related services ── */}
      {related.length > 0 && (
        <PageSection>
          <SectionHeading eyebrow="RELATED SERVICES" title="Works well" accent="alongside" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {related.map((r, i) => (
              <ViewAnimator
                key={r.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
                style={{ height: '100%' }}
              >
                <Link to={`/services/${r.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                  <GlassCard>
                    <span
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        width: '40px', height: '40px', borderRadius: 'var(--radius-sm)',
                        background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.16)',
                        color: 'var(--color-primary)', fontSize: '1.05rem', marginBottom: '18px',
                      }}
                    >
                      {r.icon}
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.0625rem', fontWeight: 600, color: '#fff', marginBottom: '10px' }}>
                      {r.title}
                    </h3>
                    <p style={{ fontSize: '0.9063rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.72, marginBottom: '16px' }}>
                      {r.tagline}
                    </p>
                    <span style={{ color: 'var(--color-primary)', fontSize: '0.8125rem', fontWeight: 600 }}>Explore →</span>
                  </GlassCard>
                </Link>
              </ViewAnimator>
            ))}
          </div>
        </PageSection>
      )}

      {/* ── Related reading (internal links) ── */}
      <PageSection tint style={{ paddingTop: 0 }}>
        <p
          style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '20px',
          }}
        >
          Further reading
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {posts.map((p) => (
            <Link
              key={p.slug}
              to={`/blog/${p.slug}`}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                gap: '20px', padding: '20px 22px', textDecoration: 'none',
                borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)',
                background: 'rgba(255,255,255,0.015)', transition: 'all 0.28s',
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
              <span style={{ color: '#fff', fontSize: '0.9688rem', fontWeight: 500, lineHeight: 1.5 }}>{p.title}</span>
              <span style={{ color: 'var(--color-primary)', fontSize: '0.8125rem', whiteSpace: 'nowrap', fontFamily: 'var(--font-mono)' }}>
                {p.readTime} →
              </span>
            </Link>
          ))}
        </div>
      </PageSection>

      <CtaBand
        eyebrow={service.category}
        title={`Ready to start your ${service.shortTitle.toLowerCase()} project?`}
        text="Book a discovery call. We will scope it honestly and tell you plainly what it takes."
        secondaryLabel="All Services"
        secondaryHref="/services"
      />
    </>
  );
}
