import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Seo, { orgSchema, breadcrumbSchema, faqSchema } from '../components/Seo';
import { PageHero, PageSection, SectionHeading, CtaBand, FaqList, StatStrip, TagRow } from '../components/PageKit';
import { ViewAnimator } from '../utils/useInViewLenis';
import { PROJECTS, INDUSTRIES } from '../utils/constants';
import { SITE, STATS } from '../data/site';

const EASE = [0.16, 1, 0.3, 1];

const WORK_FAQS = [
  {
    q: 'Can I see live examples of your work?',
    a: 'Yes — most of the projects on this page link directly to the live website. We prefer showing working sites over static mockups, because a screenshot cannot demonstrate speed, mobile behaviour or how the site actually converts.',
  },
  {
    q: 'Will my project be shown publicly?',
    a: 'Only if you are comfortable with it. We display visual design and a general description, never confidential business information, customer data or commercial terms. If you would prefer the project stays private, tell us and we exclude it entirely.',
  },
  {
    q: 'Do you work in my industry?',
    a: 'We work across manufacturing, trading, healthcare, hospitality, education, retail, professional services and startups. What matters more than industry familiarity is understanding your specific customer and what they need to believe before contacting you.',
  },
  {
    q: 'Can you improve an existing website instead of rebuilding it?',
    a: 'Often, yes — and it is frequently the better decision. Sometimes the design is fine and the real problem is speed, messaging or structure. We audit before recommending a rebuild, because a redesign that fixes the wrong problem is expensive and disappointing.',
  },
];

function ProjectCard({ project, index }) {
  const [h, setH] = useState(false);
  const isExternal = Boolean(project.url);

  const inner = (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        position: 'relative', display: 'flex', flexDirection: 'column', height: '100%',
        borderRadius: 'var(--radius-lg)', overflow: 'hidden',
        border: `1px solid ${h ? 'rgba(34,197,94,0.28)' : 'var(--border-subtle)'}`,
        background: h ? 'rgba(31,41,55,0.42)' : 'rgba(31,41,55,0.22)',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        boxShadow: h ? '0 22px 54px rgba(0,0,0,0.48), 0 0 44px rgba(34,197,94,0.06)' : '0 4px 20px rgba(0,0,0,0.3)',
        transform: h ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all 0.38s var(--ease-out-expo)',
      }}
    >
      <div
        style={{
          position: 'relative', paddingBottom: '58%', overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(34,197,94,0.1), rgba(11,15,14,0.9))',
        }}
      >
        <img
          src={project.image}
          alt={`${project.title} — ${project.category.toLowerCase()} by ${SITE.name}`}
          loading="lazy"
          decoding="async"
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
            transform: h ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.75s var(--ease-out-expo)',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(11,15,14,0.9) 0%, rgba(11,15,14,0.15) 55%, transparent 100%)',
          }}
        />
        <span
          style={{
            position: 'absolute', left: '20px', bottom: '18px',
            fontFamily: 'var(--font-mono)', fontSize: '0.6375rem', letterSpacing: '0.16em',
            color: 'var(--color-primary)', padding: '6px 13px', borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(34,197,94,0.28)', background: 'rgba(11,15,14,0.75)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {project.category}
        </span>
        {project.year && (
          <span
            style={{
              position: 'absolute', right: '20px', top: '18px',
              fontFamily: 'var(--font-mono)', fontSize: '0.6875rem',
              color: 'rgba(255,255,255,0.55)', padding: '5px 12px',
              borderRadius: 'var(--radius-full)', background: 'rgba(11,15,14,0.7)',
              backdropFilter: 'blur(8px)',
            }}
          >
            {project.year}
          </span>
        )}
      </div>

      <div style={{ padding: '28px 28px 26px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3
          style={{
            fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600,
            color: h ? 'var(--color-primary)' : '#fff', marginBottom: '12px', lineHeight: 1.3,
            transition: 'color 0.3s ease',
          }}
        >
          {project.title}
        </h3>
        <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.52)', lineHeight: 1.75, marginBottom: '20px' }}>
          {project.description}
        </p>

        {project.outcome && (
          <div
            style={{
              padding: '16px 18px', borderRadius: 'var(--radius-md)', marginBottom: '20px',
              border: '1px solid rgba(34,197,94,0.14)', background: 'rgba(34,197,94,0.04)',
              borderLeft: '2px solid rgba(34,197,94,0.5)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.625rem', letterSpacing: '0.16em',
                textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '8px',
              }}
            >
              Outcome
            </p>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.62)', lineHeight: 1.7 }}>
              {project.outcome}
            </p>
          </div>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', marginBottom: '20px' }}>
          {(project.scope || project.tags).map((t) => (
            <span
              key={t}
              style={{
                padding: '5px 12px', borderRadius: 'var(--radius-full)',
                border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)',
                fontSize: '0.7188rem', color: 'rgba(255,255,255,0.48)',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <div
          style={{
            marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: '12px', paddingTop: '18px', borderTop: '1px solid var(--border-subtle)',
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'rgba(255,255,255,0.48)' }}>
            {project.industry}
          </span>
          {isExternal && (
            <motion.span
              animate={{ x: h ? 4 : 0 }}
              transition={{ duration: 0.25 }}
              style={{ color: 'var(--color-primary)', fontSize: '0.8125rem', fontWeight: 600, whiteSpace: 'nowrap' }}
            >
              Visit site ↗
            </motion.span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <ViewAnimator
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-8%' }}
      transition={{ duration: 0.65, delay: (index % 2) * 0.1, ease: EASE }}
      style={{ height: '100%' }}
    >
      {isExternal ? (
        <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
          {inner}
        </a>
      ) : (
        <div style={{ height: '100%' }}>{inner}</div>
      )}
    </ViewAnimator>
  );
}

const portfolioSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: `Our Work — ${SITE.name}`,
  url: `${SITE.url}/projects`,
  description: 'Selected websites, brand systems and digital solutions built by Manhar Creatives.',
  hasPart: PROJECTS.map((p) => ({
    '@type': 'CreativeWork',
    name: p.title,
    description: p.description,
    ...(p.url ? { url: p.url } : {}),
    image: `${SITE.url}${p.image}`,
    creator: { '@id': `${SITE.url}/#organization` },
  })),
};

export default function ProjectsPage() {
  return (
    <>
      <Seo
        path="/projects"
        title={`Our Work — Websites, Brand Systems & Digital Projects | ${SITE.name}`}
        description="Selected work by Manhar Creatives — business websites, industrial and placement platforms, brand identity systems and digital menu solutions built for real businesses across India."
        keywords={[
          'web design portfolio india',
          'website development case studies',
          'branding portfolio gujarat',
          'agency portfolio ahmedabad',
          'business website examples',
        ]}
        schema={[
          orgSchema(),
          portfolioSchema,
          faqSchema(WORK_FAQS),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Work', path: '/projects' },
          ]),
        ]}
      />

      <PageHero
        eyebrow="SELECTED WORK"
        title="Work built to"
        titleAccent="do a job."
        subtitle="Every project here started with a specific business problem — credibility, visibility, operational drag — and was measured against whether it solved it, not whether it looked good in a portfolio."
        background="/images/backgrounds/featured-bg.webp"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Work', path: '/projects' },
        ]}
      >
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          <Link to="/contact" className="btn btn-primary" style={{ boxShadow: '0 0 30px rgba(34,197,94,0.26)' }}>
            Start Your Project
          </Link>
          <Link to="/services" className="btn btn-outline">View Services</Link>
        </div>
      </PageHero>

      <PageSection style={{ paddingTop: 0 }}>
        <StatStrip stats={STATS} />
      </PageSection>

      <PageSection style={{ paddingTop: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </PageSection>

      {/* ── Industries ── */}
      <PageSection tint background="/images/backgrounds/industries-bg.webp" bgOpacity={0.07}>
        <SectionHeading
          eyebrow="SECTORS"
          title="Industries we"
          accent="build for"
          subtitle="Different sectors fail online in different ways. We adapt the approach rather than reusing one template."
        />
        <div
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1px',
            background: 'var(--border-subtle)', border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)', overflow: 'hidden',
          }}
        >
          {INDUSTRIES.map((ind, i) => (
            <ViewAnimator
              key={ind.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.06, ease: EASE }}
              style={{ background: 'rgba(11,15,14,0.78)', padding: '26px 24px' }}
            >
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.9688rem', fontWeight: 600, color: '#fff', marginBottom: '10px' }}>
                {ind.name}
              </h3>
              <p style={{ fontSize: '0.8438rem', color: 'rgba(255,255,255,0.48)', lineHeight: 1.7 }}>{ind.desc}</p>
            </ViewAnimator>
          ))}
        </div>
      </PageSection>

      {/* ── Capabilities ── */}
      <PageSection>
        <SectionHeading eyebrow="CAPABILITIES" title="What we bring to" accent="every project" />
        <TagRow
          items={[
            'React', 'Next.js', 'Node.js', 'Python', 'PostgreSQL', 'Supabase', 'Tailwind CSS',
            'WordPress', 'Shopify', 'Figma', 'Adobe Creative Suite', 'Vercel', 'Cloudflare',
            'REST APIs', 'Core Web Vitals', 'Schema Markup', 'Google Analytics 4', 'Google Tag Manager',
          ]}
          accent
        />
      </PageSection>

      <PageSection tint>
        <div style={{ maxWidth: '880px', margin: '0 auto' }}>
          <FaqList faqs={WORK_FAQS} title="About our work" />
        </div>
      </PageSection>

      <CtaBand
        eyebrow="Your project next"
        title="Let’s build something worth showing."
        text="Tell us what the business needs to achieve. We will scope it honestly and build it properly."
        secondaryLabel="Read Our Guides"
        secondaryHref="/blog"
      />
    </>
  );
}
