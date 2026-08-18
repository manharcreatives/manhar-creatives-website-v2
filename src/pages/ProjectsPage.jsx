import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Seo, { orgSchema, breadcrumbSchema, faqSchema } from '../components/Seo';
import { PageHero, PageSection, SectionHeading, FaqList, StatStrip } from '../components/PageKit';
import { CaseRow, CapabilityGroups, WorkKitStyles } from '../components/WorkKit';
import { ViewAnimator } from '../utils/useInViewLenis';
import { PROJECTS, INDUSTRIES } from '../utils/constants';
import { SITE, STATS } from '../data/site';

const EASE = [0.16, 1, 0.3, 1];

const CAPABILITIES = [
  {
    title: 'Interfaces people finish using',
    desc: 'Front-end work built mobile-first and tested on the screens your customers actually own, not just the one it was designed on.',
    tools: ['React', 'Next.js', 'Tailwind CSS', 'Figma', 'WordPress', 'Shopify'],
  },
  {
    title: 'Systems that hold your data',
    desc: 'Back-end, database and integration work for anything the site has to remember, calculate or send somewhere else.',
    tools: ['Node.js', 'Python', 'PostgreSQL', 'Supabase', 'REST APIs'],
  },
  {
    title: 'Speed that survives a weak signal',
    desc: 'Performance treated as a build decision. Measured before handover, on a throttled connection, not on office fibre.',
    tools: ['Core Web Vitals', 'Vercel', 'Cloudflare', 'Image optimisation'],
  },
  {
    title: 'Structure search engines can read',
    desc: 'Semantic markup, schema and clean URLs so a page can be indexed correctly the day it goes live.',
    tools: ['Schema Markup', 'Sitemaps', 'Semantic HTML', 'Local SEO'],
  },
  {
    title: 'Identity that stays consistent',
    desc: 'Brand systems and print-ready artwork so the business looks like one company across screen, paper and signage.',
    tools: ['Adobe Creative Suite', 'Figma', 'Brand guidelines', 'CMYK / print prep'],
  },
  {
    title: 'Proof that it is working',
    desc: 'Analytics and event tracking configured at handover, so enquiries can be traced back to what produced them.',
    tools: ['Google Analytics 4', 'Google Tag Manager', 'Search Console', 'Event tracking'],
  },
];

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
        description="Selected work — business websites, industrial and placement platforms, brand systems and digital menus. Live links where the site is public, no mockups."
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

      <WorkKitStyles />

      <PageHero
        fullscreen
        scrollCue
        eyebrow="SELECTED WORK"
        title="Work built to"
        titleAccent="do a job."
        subtitle="Every project here started with a specific business problem — credibility, visibility, operational drag — and was measured against whether it solved it, not whether it looked good in a portfolio."
        background="/images/pages/work-hero.webp"
        bgOpacity={0.55}
        imageSide="left"
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

      {/* ── Case rows ──
          One project per band rather than a thumbnail grid. Each
          carries year, industry, scope and the result — the things
          a prospect is actually comparing — and links to the live
          site, because a working site proves what a screenshot
          cannot. */}
      <PageSection style={{ paddingTop: 'var(--space-2xl)' }}>
        <SectionHeading
          eyebrow="SELECTED WORK"
          title="Five projects,"
          accent="and what each one had to fix"
          subtitle="No mockups and no invented metrics. Where the site is live, the link goes straight to it."
        />
        <div>
          {PROJECTS.map((p, i) => (
            <CaseRow key={p.title} project={p} index={i} />
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
        <SectionHeading
          eyebrow="CAPABILITIES"
          title="What we bring to"
          accent="every project"
          subtitle="Grouped by what it does for your business rather than by what it is called. The tools are listed as evidence, not as the argument."
        />
        <CapabilityGroups groups={CAPABILITIES} />
      </PageSection>

      <PageSection tint>
        <div style={{ maxWidth: '880px', margin: '0 auto' }}>
          <FaqList faqs={WORK_FAQS} title="About our work" />
        </div>
      </PageSection>

    </>
  );
}
