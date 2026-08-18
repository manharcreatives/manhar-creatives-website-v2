import { Link } from 'react-router-dom';
import Seo, { orgSchema, breadcrumbSchema, faqSchema } from '../components/Seo';
import {
  PageHero, PageSection, SectionHeading, FaqList,
  GlassCard, StatStrip, SplitPoints,
} from '../components/PageKit';
import { ImageCard, WorkKitStyles } from '../components/WorkKit';
import { ViewAnimator } from '../utils/useInViewLenis';
import { SERVICES } from '../data/services';
import { SITE, STATS, CITIES } from '../data/site';

const EASE = [0.16, 1, 0.3, 1];

/* Each principle carries its own photograph. Six identical glass
   cards made six different commitments read as one block of text
   nobody finished — the image is what makes each one a separate
   thought. Paths are slots: drop new artwork over the filename. */
const PRINCIPLES = [
  {
    image: '/images/about/principle-01.webp',
    title: 'Business outcome over appearance',
    desc: 'A beautiful website that generates nothing is a failed project. Every decision we make is judged against whether it helps the business get found, get trusted, or get contacted.',
  },
  {
    image: '/images/about/principle-02.webp',
    title: 'Say the honest thing',
    desc: 'We will tell you when you need less than you asked for, when an off-the-shelf tool beats a custom build, and when the problem is not the thing you think it is. Agreement is easy; usefulness is not.',
  },
  {
    image: '/images/about/principle-03.webp',
    title: 'You own everything',
    desc: 'Source code, domain, hosting account, data. All registered in your name, all handed over in full. No lock-in, no leverage, no awkward conversation if you ever want to move.',
  },
  {
    image: '/images/about/principle-04.webp',
    title: 'Scope before start',
    desc: 'A written scope and a fixed price before work begins. Anything new is a change request with its own quote — never a silent delay or a surprise invoice at the end.',
  },
  {
    image: '/images/about/principle-05.webp',
    title: 'Build systems, not deliverables',
    desc: 'A logo is an asset; a brand system keeps every future design consistent. A page is a deliverable; a structured site keeps ranking. We build the thing that keeps working after we leave.',
  },
  {
    image: '/images/about/principle-06.webp',
    title: 'Support after launch',
    desc: 'Handover includes training, documentation and a support period. The relationship does not end the moment the final invoice is settled.',
  },
];

const ABOUT_FAQS = [
  {
    q: 'Where is Manhar Creatives based?',
    a: `We are based in ${SITE.address.locality}, ${SITE.address.region}, India. We work extensively across Ahmedabad, Mehsana and North Gujarat, and deliver projects for clients across India and internationally.`,
  },
  {
    q: 'How big is the team?',
    a: 'We are a focused studio rather than a large agency. That means you speak directly to the people doing the work, decisions happen quickly, and nothing gets lost between account managers and delivery teams.',
  },
  {
    q: 'What makes you different from other agencies?',
    a: 'Three things: we scope and price in writing before starting, you own everything we build outright, and we tell you honestly when you need less than you asked for. Most disputes in this industry trace back to one of those three being absent.',
  },
  {
    q: 'What languages do you work in?',
    a: 'English, Hindi and Gujarati. Project documentation is typically in English; conversations happen in whichever language you are most comfortable with.',
  },
  {
    q: 'Do you take on small projects?',
    a: 'Yes. A single landing page, a logo refresh, or a Google Business Profile setup are all legitimate starting points. We would rather do one thing properly and earn the next project than oversell an engagement you did not need.',
  },
];

export default function AboutPage() {
  return (
    <>
      <Seo
        path="/about"
        title={`About Us — Digital Solutions & Branding Company in Gujarat | ${SITE.name}`}
        description={`${SITE.name} is a digital solutions and branding company based in ${SITE.address.locality}, ${SITE.address.region}. We build websites, custom software, brand systems and digital presence for businesses that want to grow — with fixed scope, full ownership and honest advice.`}
        keywords={[
          'about manhar creatives',
          'digital agency gujarat',
          'branding company visnagar',
          'web development company mehsana',
          'creative agency north gujarat',
          'software company gujarat',
        ]}
        schema={[
          orgSchema(),
          faqSchema(ABOUT_FAQS),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: `About ${SITE.name}`,
            url: `${SITE.url}/about`,
            mainEntity: { '@id': `${SITE.url}/#organization` },
          },
        ]}
      />

      <WorkKitStyles />

      <PageHero
        fullscreen
        scrollCue
        eyebrow="ABOUT US"
        title="We don’t sell websites."
        titleAccent="We build growth systems."
        subtitle={`${SITE.name} is a digital solutions and branding company based in ${SITE.address.locality}, ${SITE.address.region}. We work with businesses that have built real reputation offline and need that same credibility to exist online.`}
        background="/images/pages/about-hero.webp"
        bgOpacity={0.55}
        imageSide="right"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ]}
      >
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          <Link to="/contact" className="btn btn-primary" style={{ boxShadow: '0 0 30px rgba(34,197,94,0.26)' }}>
            Work With Us
          </Link>
          <Link to="/projects" className="btn btn-outline">See Our Work</Link>
        </div>
      </PageHero>

      {/* ── Stats ── */}
      <PageSection style={{ paddingTop: 0 }}>
        <StatStrip stats={STATS} />
      </PageSection>

      {/* ── Story ── */}
      <PageSection>
        <div style={{ maxWidth: '820px' }}>
          <p
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '20px',
            }}
          >
            Our story
          </p>
          <h2 className="text-heading-2" style={{ color: '#fff', marginBottom: '28px' }}>
            Good businesses, invisible online
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              `We started in ${SITE.address.locality} — a town in North Gujarat full of businesses that have been doing excellent work for decades. Manufacturers with real capability. Traders with deep relationships. Clinics people genuinely trust. Almost none of it visible to anyone who did not already know about it.`,
              'Meanwhile, newer and often weaker competitors were winning enquiries simply because they showed up first on a phone screen. The gap was never quality. It was presentation, structure and visibility.',
              'That is the gap we exist to close. Not by making things look nicer — though they do — but by building the underlying systems that turn an established offline reputation into something a stranger can find, verify and act on.',
              'Since then the work has expanded well beyond websites. Businesses that solved visibility came back with a different problem: their operations were running on spreadsheets, WhatsApp threads and manual re-entry. So we started building the software to fix that too.',
            ].map((p, i) => (
              <ViewAnimator
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '-6%' }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
              >
                <p style={{ color: 'rgba(255,255,255,0.64)', lineHeight: 1.9, fontSize: '1.0625rem' }}>{p}</p>
              </ViewAnimator>
            ))}
          </div>
        </div>
      </PageSection>

      {/* ── Philosophy ── */}
      <PageSection tint background="/images/backgrounds/benefits-bg.webp" bgOpacity={0.07}>
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 52px' }}>
          <p
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '24px',
            }}
          >
            ✦ Our philosophy
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 600, lineHeight: 1.12, letterSpacing: '-0.03em', color: '#fff',
            }}
          >
            We Design, We Build,{' '}
            <span
              style={{
                fontStyle: 'italic',
                background: 'linear-gradient(135deg, #22C55E, #4ADE80)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                display: 'inline-block', paddingRight: '10px',
              }}
            >
              You Grow
            </span>
          </h2>
        </div>
      </PageSection>

      {/* ── Principles ── */}
      <PageSection style={{ paddingTop: 0 }}>
        <SectionHeading
          eyebrow="HOW WE OPERATE"
          title="Six principles we"
          accent="actually follow"
          subtitle="Not values on a wall. These are the specific commitments that shape how every project runs."
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {PRINCIPLES.map((p, i) => (
            <ImageCard key={p.title} item={p} index={i} minHeight="330px" />
          ))}
        </div>
      </PageSection>

      {/* ── What we do ── */}
      <PageSection tint>
        <SplitPoints
          heading="What we actually do"
          body="Six services, each addressing a specific business constraint. Most clients start with one and expand as the return becomes visible."
          points={SERVICES.map((s) => `${s.title} — ${s.tagline}`)}
        />
        <div style={{ marginTop: '34px' }}>
          <Link to="/services" className="btn btn-outline">Explore all services →</Link>
        </div>
      </PageSection>

      {/* ── Where we work ── */}
      <PageSection>
        <SectionHeading
          eyebrow="WHERE WE WORK"
          title="Rooted locally,"
          accent="working nationally"
          subtitle={`Based in ${SITE.address.locality}, delivering across Gujarat and India. Locally based means face-to-face meetings when they help — and everything else handled over calls, WhatsApp and shared documents.`}
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {Object.values(CITIES).map((c, i) => (
            <ViewAnimator
              key={c.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
              style={{ height: '100%' }}
            >
              <Link to={`/${c.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                <GlassCard>
                  <p
                    style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.16em',
                      textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '14px',
                    }}
                  >
                    {c.region}
                  </p>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: '#fff', marginBottom: '12px' }}>
                    {c.name}
                  </h3>
                  <p style={{ fontSize: '0.9063rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, marginBottom: '16px' }}>
                    {c.short.charAt(0).toUpperCase() + c.short.slice(1)}.
                  </p>
                  <span style={{ color: 'var(--color-primary)', fontSize: '0.8125rem', fontWeight: 600 }}>
                    View {c.name} page →
                  </span>
                </GlassCard>
              </Link>
            </ViewAnimator>
          ))}
        </div>
      </PageSection>

      {/* ── FAQ ── */}
      <PageSection tint>
        <div style={{ maxWidth: '880px', margin: '0 auto' }}>
          <FaqList faqs={ABOUT_FAQS} title="About us — common questions" />
        </div>
      </PageSection>

    </>
  );
}
