import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Seo, { orgSchema, breadcrumbSchema, faqSchema } from '../components/Seo';
import { PageHero, PageSection, SectionHeading, CtaBand, FaqList, StatStrip } from '../components/PageKit';
import ServiceComparison from '../components/ServiceComparison';
import { ViewAnimator } from '../utils/useInViewLenis';
import { SERVICES } from '../data/services';
import { SITE, STATS } from '../data/site';
import { INDUSTRIES } from '../utils/constants';

const EASE = [0.16, 1, 0.3, 1];

const SERVICE_FAQS = [
  {
    q: 'Which service should I start with?',
    a: 'It depends on what is currently limiting you. If customers cannot find or verify you online, start with Digital Presence Setup and a website. If your team is drowning in spreadsheets and manual work, start with Custom Software. If your business looks inconsistent across touchpoints, start with Branding. We will tell you honestly which one gives you the fastest return.',
  },
  {
    q: 'Can I combine multiple services?',
    a: 'Yes, and it is usually more efficient. Branding, website and digital presence work particularly well together because each reinforces the others. We scope combined projects in phases so you see results early rather than waiting for everything at once.',
  },
  {
    q: 'Do you work with businesses outside Gujarat?',
    a: 'Yes. We are based in Visnagar and work extensively across Ahmedabad, Mehsana and North Gujarat, but we deliver projects for clients across India and internationally. Most collaboration happens over calls, WhatsApp and shared documents.',
  },
  {
    q: 'How do you price projects?',
    a: 'We scope first and quote a fixed price before starting, so there are no mid-project surprises. Pricing depends on scope — pages, custom functionality, content requirements and integrations. Anything outside the agreed scope is quoted separately and requires your approval.',
  },
  {
    q: 'What if I am not sure what I need?',
    a: 'That is the normal starting point. Book a discovery call and describe the business problem rather than the solution. We will map out what is actually required — and we will tell you when you need less than you think.',
  },
];

function ServiceCard({ service, index }) {
  const [h, setH] = useState(false);

  return (
    <ViewAnimator
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-8%' }}
      transition={{ duration: 0.65, delay: (index % 3) * 0.09, ease: EASE }}
      style={{ height: '100%' }}
    >
      <Link
        to={`/services/${service.slug}`}
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          position: 'relative',
          display: 'flex', flexDirection: 'column', height: '100%',
          padding: '36px 32px 32px',
          borderRadius: 'var(--radius-lg)',
          border: `1px solid ${h ? 'rgba(34,197,94,0.3)' : 'var(--border-subtle)'}`,
          background: h ? 'rgba(31,41,55,0.44)' : 'rgba(31,41,55,0.24)',
          backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          textDecoration: 'none',
          boxShadow: h
            ? '0 20px 52px rgba(0,0,0,0.46), 0 0 46px rgba(34,197,94,0.07)'
            : '0 4px 20px rgba(0,0,0,0.3)',
          transform: h ? 'translateY(-6px)' : 'translateY(0)',
          transition: 'all 0.38s var(--ease-out-expo)',
          overflow: 'hidden',
        }}
      >
        {/* corner glow */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', top: '-90px', right: '-90px',
            width: '220px', height: '220px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(34,197,94,0.16) 0%, transparent 70%)',
            opacity: h ? 1 : 0, transition: 'opacity 0.4s ease', pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <span
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '48px', height: '48px', borderRadius: 'var(--radius-md)',
                background: h ? 'rgba(34,197,94,0.15)' : 'rgba(34,197,94,0.07)',
                border: `1px solid ${h ? 'rgba(34,197,94,0.32)' : 'rgba(34,197,94,0.14)'}`,
                color: 'var(--color-primary)', fontSize: '1.35rem',
                transition: 'all 0.35s var(--ease-out-expo)',
              }}
            >
              {service.icon}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.22)' }}>
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-display)', fontSize: '1.3125rem', fontWeight: 600,
              color: h ? 'var(--color-primary)' : '#fff', marginBottom: '10px', lineHeight: 1.28,
              transition: 'color 0.3s ease',
            }}
          >
            {service.title}
          </h3>

          <p style={{ fontSize: '0.9063rem', color: 'var(--color-primary)', opacity: 0.75, marginBottom: '14px', fontWeight: 500 }}>
            {service.tagline}
          </p>

          <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.52)', lineHeight: 1.75, flex: 1, marginBottom: '24px' }}>
            {service.description}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', marginBottom: '24px' }}>
            {service.features.slice(0, 4).map((f) => (
              <span
                key={f}
                style={{
                  padding: '5px 12px', borderRadius: 'var(--radius-full)',
                  border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)',
                  fontSize: '0.7188rem', color: 'rgba(255,255,255,0.48)',
                }}
              >
                {f}
              </span>
            ))}
          </div>

          <div
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              paddingTop: '18px', borderTop: '1px solid var(--border-subtle)',
            }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.48)' }}>
              {service.category}
            </span>
            <motion.span
              animate={{ x: h ? 5 : 0 }}
              transition={{ duration: 0.25 }}
              style={{ color: 'var(--color-primary)', fontSize: '0.8438rem', fontWeight: 600 }}
            >
              Explore →
            </motion.span>
          </div>
        </div>
      </Link>
    </ViewAnimator>
  );
}

const serviceListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Manhar Creatives Services',
  itemListElement: SERVICES.map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: s.title,
    description: s.description,
    url: `${SITE.url}/services/${s.slug}`,
  })),
};

export default function ServicesPage() {
  return (
    <>
      <Seo
        path="/services"
        title="Our Services — Websites, Custom Software, Branding & Digital Presence | Manhar Creatives"
        description="Website development, custom software and CRM systems, branding and identity, social media design, print branding and Google Business Profile setup for businesses across Gujarat and India."
        keywords={[
          'digital solutions company gujarat',
          'website development services',
          'custom software development services',
          'crm development services india',
          'branding services ahmedabad',
          'social media design services',
          'print design services gujarat',
          'google business profile services',
          'business automation services',
        ]}
        schema={[
          orgSchema(),
          serviceListSchema,
          faqSchema(SERVICE_FAQS),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
          ]),
        ]}
      />

      <PageHero
        eyebrow="OUR SERVICES"
        title="Six services. One"
        titleAccent="growth system."
        subtitle="We do not sell deliverables. Every service exists to fix a specific business constraint — visibility, credibility, consistency or operational drag. Start with the one that is costing you the most."
        background="/images/backgrounds/services-bg.webp"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ]}
      >
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          <Link to="/contact" className="btn btn-primary" style={{ boxShadow: '0 0 30px rgba(34,197,94,0.26)' }}>
            Book a Discovery Call
          </Link>
          <Link to="/projects" className="btn btn-outline">See Our Work</Link>
        </div>
      </PageHero>

      {/* ── Service grid ── */}
      <PageSection style={{ paddingTop: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </PageSection>

      {/* ── Comparison ── */}
      <PageSection style={{ paddingTop: 0 }}>
        <SectionHeading
          eyebrow="SIDE BY SIDE"
          title="Which one"
          accent="fixes your problem?"
          subtitle="The three services businesses most often choose between, compared on the things that actually decide it. Turn rows off to focus on what matters to you."
        />
        <ServiceComparison />
      </PageSection>

      {/* ── Stats ── */}
      <PageSection tint style={{ paddingTop: 0 }}>
        <StatStrip stats={STATS} />
      </PageSection>

      {/* ── Industries ── */}
      <PageSection background="/images/backgrounds/industries-bg.webp" bgOpacity={0.09}>
        <SectionHeading
          eyebrow="INDUSTRIES"
          title="Who we"
          accent="build for"
          subtitle="Different industries fail online in different ways. We adapt the approach to the sector rather than applying one template to everything."
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1px', background: 'var(--border-subtle)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          {INDUSTRIES.map((ind, i) => (
            <ViewAnimator
              key={ind.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.07, ease: EASE }}
              style={{ background: 'rgba(11,15,14,0.78)', padding: '28px 26px' }}
            >
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600, color: '#fff', marginBottom: '10px' }}>
                {ind.name}
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.48)', lineHeight: 1.7 }}>
                {ind.desc}
              </p>
            </ViewAnimator>
          ))}
        </div>
      </PageSection>

      {/* ── How engagements work ── */}
      <PageSection>
        <SectionHeading
          eyebrow="HOW WE WORK"
          title="A process built to remove"
          accent="uncertainty"
          subtitle="Every engagement follows the same six stages, so you always know what is happening, what comes next, and what is expected from you."
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {[
            { n: '01', t: 'Discovery', d: 'We understand the business, the goal and the constraint before proposing anything.' },
            { n: '02', t: 'Scope & Quote', d: 'A written scope with fixed pricing and a clear timeline. No surprises later.' },
            { n: '03', t: 'Build', d: 'Design and development against the agreed structure, with staged reviews.' },
            { n: '04', t: 'Deliver & Support', d: 'Launch, handover, training and support after go-live.' },
          ].map((s, i) => (
            <ViewAnimator
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
              style={{
                padding: '30px 26px', borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-subtle)', background: 'rgba(31,41,55,0.2)',
                backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', height: '100%',
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--color-primary)', opacity: 0.7, display: 'block', marginBottom: '16px' }}>
                {s.n}
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.0625rem', fontWeight: 600, color: '#fff', marginBottom: '10px' }}>
                {s.t}
              </h3>
              <p style={{ fontSize: '0.9063rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.72 }}>{s.d}</p>
            </ViewAnimator>
          ))}
        </div>
        <div style={{ marginTop: '32px' }}>
          <Link to="/process" className="btn btn-outline">See the full process →</Link>
        </div>
      </PageSection>

      {/* ── FAQ ── */}
      <PageSection tint>
        <div style={{ maxWidth: '880px', margin: '0 auto' }}>
          <FaqList faqs={SERVICE_FAQS} title="Questions before you start" />
        </div>
      </PageSection>

      <CtaBand
        eyebrow="Start here"
        title="Not sure which service you need?"
        text="Describe the business problem, not the solution. We will tell you what actually fixes it — and what does not."
        secondaryLabel="Read Our Guides"
        secondaryHref="/blog"
      />
    </>
  );
}
