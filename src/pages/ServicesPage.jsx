import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Seo, { orgSchema, breadcrumbSchema, faqSchema } from '../components/Seo';
import { PageHero, PageSection, SectionHeading, FaqList, StatStrip } from '../components/PageKit';
import ServiceComparison from '../components/ServiceComparison';
import { ViewAnimator } from '../utils/useInViewLenis';
import { WorkKitStyles } from '../components/WorkKit';
import { SERVICES } from '../data/services';
import { SITE, STATS } from '../data/site';
import { INDUSTRIES } from '../utils/constants';

const EASE = [0.16, 1, 0.3, 1];

const SERVICE_FAQS = [
  {
    q: 'Which service should I start with?',
    a: 'Whichever is limiting you now. Cannot be found or verified online: Digital Presence & Growth and a website. Team buried in spreadsheets: Custom Software. Business looks inconsistent: Branding. We will say which gives you the fastest return.',
  },
  {
    q: 'Can I combine multiple services?',
    a: 'Yes, and it is usually more efficient. Branding, website and digital presence reinforce each other. Combined projects are scoped in phases, so you see results early rather than waiting for everything at once.',
  },
  {
    q: 'Do you work with businesses outside Gujarat?',
    a: 'Yes. We are based in Visnagar, work across Ahmedabad, Mehsana and North Gujarat, and deliver for clients across India. Most collaboration runs over calls, WhatsApp and shared documents.',
  },
  {
    q: 'How do you price projects?',
    a: 'We scope first and quote a fixed price before starting. Pricing follows scope: pages, custom functionality, content and integrations. Anything outside the agreed scope is quoted separately and needs your approval.',
  },
  {
    q: 'What if I am not sure what I need?',
    a: 'That is the normal starting point. Describe the business problem rather than the solution, and we will map what is actually required, including when you need less than you think.',
  },
  {
    q: 'Do you also do SEO, Meta Ads or AI automation?',
    a: 'On request, once scoped to your specific need. These need ongoing monthly work rather than a one-time build, so we discuss and price them separately after understanding what you are trying to achieve. They are not part of our six fixed-scope services.',
  },
];

/* ─── On-request offerings ─────────────────────────────────
   Retainer-style work — SEO, Meta Ads, AI automation — that runs
   on ongoing monthly effort rather than a fixed-scope build, and
   that the team isn't ready to formally list as a seventh or
   eighth service yet. Deliberately lighter than ServiceCard: no
   photography, no hover reveal, no detail page to link to — a
   flat, quiet row that reads as "also available", not as part of
   the committed six above it. */
const ON_REQUEST = [
  {
    icon: '◐',
    title: 'SEO Growth Retainer',
    desc: 'Ongoing search ranking work: content, on-page and technical SEO, tracked monthly. Scoped after your website or Digital Presence & Growth is live.',
    image: '/images/cards/on-request-seo.webp',
  },
  {
    icon: '▣',
    title: 'Meta Ads Management',
    desc: 'Instagram and Facebook ad campaigns: creative, targeting and budget management, reported monthly. Ad spend billed separately from our fee.',
    image: '/images/cards/on-request-ads.webp',
  },
  {
    icon: '⬢',
    title: 'AI & Automation Solutions',
    desc: 'Workflow automation and AI tools built around one specific business process, quoted once we understand what you’re trying to automate.',
    image: '/images/cards/on-request-automation.webp',
  },
];

/* ─── On-request card ─────────────────────────────────────
   The brief asked for a specific soft-UI ("neumorphic") card
   effect — a surface that reads as pressed out of its own
   background via a dark shadow and a faint light-catching edge,
   rather than a bordered box. Kept in the brand's dark palette
   instead of the light-grey reference: the card's base colour is
   `--bg` itself, so the shadow pair is what creates the shape,
   not a fill colour or a border. A vignetted background image
   sits behind the content as ambient texture (not a photograph
   competing with the effect), and the icon well is pressed in
   with an inset version of the same shadow pair — the two
   directions soft-UI normally uses together. This is deliberately
   more distinctive than every other card on the page, since the
   brief flagged this section as not noticeable enough. */
function OnRequestCard({ item, index }) {
  const [h, setH] = useState(false);

  return (
    <ViewAnimator
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-8%' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
      style={{ height: '100%' }}
    >
      <div
        className="mc-on-request-card"
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          position: 'relative',
          isolation: 'isolate',
          overflow: 'hidden',
          height: '100%',
          padding: '34px 28px',
          borderRadius: 'var(--radius-xl)',
          /* A flat fill the exact colour of the page would leave the
             shadow pair to do all the work — on a near-black theme
             that reads as almost nothing. A faint directional gradient
             (lighter where the highlight lands, darker where the shadow
             falls) sells the "pressed out of its own surface" illusion
             the same way the box-shadow's two directions do. */
          background: 'linear-gradient(155deg, #161e1a 0%, #0d1211 45%, #07090a 100%)',
          transform: h ? 'translateY(-6px)' : 'translateY(0)',
          boxShadow: h
            ? '18px 18px 40px rgba(0,0,0,0.72), -12px -12px 30px rgba(255,255,255,0.08), 0 0 56px rgba(34,197,94,0.2), inset 0 1px 0 rgba(255,255,255,0.06)'
            : '14px 14px 32px rgba(0,0,0,0.68), -10px -10px 26px rgba(255,255,255,0.06), 0 0 30px rgba(34,197,94,0.05), inset 0 1px 0 rgba(255,255,255,0.04)',
          transition: 'transform 0.45s var(--ease-out-expo), box-shadow 0.45s var(--ease-out-expo), background 0.45s ease',
        }}
      >
        {/* Ambient art — low-opacity and vignetted into the card's own
            surface, so it reads as texture behind the soft-UI shape
            rather than a photo competing with it. */}
        <span
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, zIndex: 0,
            backgroundImage: `url(${item.image})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            opacity: h ? 0.22 : 0.14,
            transform: h ? 'scale(1.05)' : 'scale(1)',
            transition: 'opacity 0.5s ease, transform 0.9s var(--ease-out-expo)',
          }}
        />
        <span
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, zIndex: 0,
            /* Fades the art into the card's own tone rather than a flat
               var(--bg) — matches the gradient above so no visible seam
               forms where the vignette takes over from the artwork. */
            background: 'radial-gradient(120% 100% at 30% 0%, transparent 0%, rgba(13,18,17,0.97) 78%)',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <span
            aria-hidden="true"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '44px', height: '44px', borderRadius: 'var(--radius-full)',
              background: '#0a0e0d',
              boxShadow: h
                ? 'inset 4px 4px 9px rgba(0,0,0,0.65), inset -4px -4px 9px rgba(255,255,255,0.07), 0 0 20px rgba(34,197,94,0.32)'
                : 'inset 4px 4px 9px rgba(0,0,0,0.6), inset -4px -4px 9px rgba(255,255,255,0.06)',
              color: 'var(--color-primary)', fontSize: '1.125rem',
              marginBottom: '20px',
              transition: 'box-shadow 0.4s ease',
            }}
          >
            {item.icon}
          </span>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.0625rem', fontWeight: 600, color: '#fff', marginBottom: '10px' }}>
            {item.title}
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.58)', lineHeight: 1.72, marginBottom: '20px' }}>
            {item.desc}
          </p>
          <Link
            to="/contact"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: h ? 'var(--color-accent)' : 'var(--color-primary)', textDecoration: 'none',
              transition: 'color 0.3s ease',
            }}
          >
            Ask us about this →
          </Link>
        </div>
      </div>
    </ViewAnimator>
  );
}

/* ─── Service card ────────────────────────────────────────
   The old card was a glass rectangle carrying an icon, a title,
   a tagline, a paragraph, four chips and a link — six services
   of that is a wall of text nobody finishes. This one leads with
   the photograph and holds back the detail until hover, so the
   grid can be read at a glance and still rewards a pause.

   Cards alternate size: the first of every three spans two
   columns. An even grid of six identical boxes is the thing that
   makes a services page look like a price list.
───────────────────────────────────────────────────────── */
function ServiceCard({ service, index, wide = false }) {
  const [h, setH] = useState(false);
  const image = service.media?.hero || service.image;

  return (
    <ViewAnimator
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-8%' }}
      transition={{ duration: 0.65, delay: (index % 3) * 0.09, ease: EASE }}
      style={{ height: '100%', gridColumn: wide ? 'span 2' : 'span 1' }}
      className={wide ? 'mc-service-card mc-service-card--wide' : 'mc-service-card'}
    >
      <Link
        to={`/services/${service.slug}`}
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        onFocus={() => setH(true)}
        onBlur={() => setH(false)}
        style={{
          position: 'relative',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          height: '100%', minHeight: wide ? '400px' : '400px',
          padding: 'clamp(26px, 3vw, 38px)',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden', isolation: 'isolate',
          textDecoration: 'none',
          border: `1px solid ${h ? 'rgba(34,197,94,0.34)' : 'var(--border-subtle)'}`,
          boxShadow: h
            ? '0 28px 64px rgba(0,0,0,0.55), 0 0 48px rgba(34,197,94,0.08)'
            : '0 6px 24px rgba(0,0,0,0.34)',
          transform: h ? 'translateY(-6px)' : 'translateY(0)',
          transition: 'transform 0.45s var(--ease-out-expo), box-shadow 0.45s var(--ease-out-expo), border-color 0.35s ease',
        }}
      >
        <span
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, zIndex: -2,
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            transform: h ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.9s var(--ease-out-expo)',
          }}
        />
        <span
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, zIndex: -1,
            background: h
              ? 'linear-gradient(to top, rgba(11,15,14,0.96) 14%, rgba(11,15,14,0.7) 58%, rgba(34,197,94,0.14) 100%)'
              : 'linear-gradient(to top, rgba(11,15,14,0.96) 14%, rgba(11,15,14,0.78) 58%, rgba(11,15,14,0.46) 100%)',
            transition: 'background 0.45s ease',
          }}
        />

        {/* Index sits top-right, the one piece of furniture that
            tells you how far through the set you are. */}
        <span
          aria-hidden="true"
          style={{
            position: 'absolute', top: '22px', right: '24px',
            fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
            color: h ? 'var(--color-accent)' : 'rgba(255,255,255,0.32)',
            transition: 'color 0.3s ease',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <span
          style={{
            alignSelf: 'flex-start',
            fontFamily: 'var(--font-mono)', fontSize: '0.6125rem',
            letterSpacing: '0.16em', textTransform: 'uppercase',
            color: 'var(--color-accent)',
            padding: '6px 12px', borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(34,197,94,0.3)', background: 'rgba(11,15,14,0.6)',
            backdropFilter: 'blur(8px)', marginBottom: '18px',
          }}
        >
          {service.category}
        </span>

        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: wide ? 'clamp(1.5rem, 2.4vw, 1.875rem)' : '1.375rem',
            fontWeight: 600, color: '#fff', marginBottom: '10px', lineHeight: 1.24,
            letterSpacing: '-0.02em',
          }}
        >
          {service.title}
        </h3>

        <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.68)', lineHeight: 1.66, marginBottom: '18px', maxWidth: '480px' }}>
          {service.tagline}
        </p>

        {/* Feature chips reveal on hover — present for the visitor
            who is comparing, invisible to the one who is scanning. */}
        <div
          style={{
            display: 'flex', flexWrap: 'wrap', gap: '7px',
            maxHeight: h ? '80px' : '0px',
            opacity: h ? 1 : 0,
            overflow: 'hidden',
            marginBottom: h ? '20px' : '0px',
            transition: 'max-height 0.45s var(--ease-out-expo), opacity 0.35s ease, margin-bottom 0.45s var(--ease-out-expo)',
          }}
        >
          {service.features.slice(0, 4).map((f) => (
            <span
              key={f}
              style={{
                padding: '5px 12px', borderRadius: 'var(--radius-full)',
                border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)',
                fontSize: '0.7188rem', color: 'rgba(255,255,255,0.66)', whiteSpace: 'nowrap',
              }}
            >
              {f}
            </span>
          ))}
        </div>

        <span
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '9px',
            color: h ? 'var(--color-accent)' : 'rgba(255,255,255,0.86)',
            fontSize: '0.8438rem', fontWeight: 600, transition: 'color 0.3s ease',
          }}
        >
          Explore this service
          <motion.span animate={{ x: h ? 4 : 0 }} transition={{ duration: 0.28 }}>→</motion.span>
        </span>
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
        title="Services: Websites, Software, Branding & Local SEO | Manhar Creatives"
        description="Website development, custom software and CRM, branding, social and print design, and Google Business Profile setup for businesses across Gujarat and India."
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

      <WorkKitStyles />

      <PageHero
        fullscreen
        scrollCue
        eyebrow="OUR SERVICES"
        title="Six services."
        titleAccent="One growth system."
        subtitle="Every service here removes one specific thing **holding the business back**. Start with the one costing you the most."
        background="/images/pages/services-hero.webp"
        bgOpacity={0.55}
        imageSide="right"
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
      <PageSection>
        <SectionHeading
          eyebrow="WHAT WE DO"
          title="Six ways a business gets"
          accent="found, believed and chosen"
          subtitle="Most businesses need one or two, not all six. We will say which."
        />
        <div className="mc-service-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} wide={i % 3 === 0} />
          ))}
        </div>
      </PageSection>

      {/* ── Comparison ── */}
      <PageSection>
        <SectionHeading
          eyebrow="SIDE BY SIDE"
          title="Which one"
          accent="fixes your problem?"
          subtitle="The three most often chosen between, compared on what actually decides it."
        />
        <ServiceComparison />
      </PageSection>

      {/* ── On request ── */}
      <PageSection tint>
        <SectionHeading
          eyebrow="ALSO AVAILABLE"
          title="Need something more"
          accent="specific?"
          subtitle="Ongoing work outside our six fixed-scope services, scoped and priced once we understand exactly what you need."
        />
        <div
          className="mc-on-request-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}
        >
          {ON_REQUEST.map((item, i) => (
            <OnRequestCard key={item.title} item={item} index={i} />
          ))}
        </div>
        <style>{`
          @media (max-width: 1024px) {
            .mc-on-request-grid { grid-template-columns: 1fr 1fr !important; }
          }
          @media (max-width: 768px) {
            .mc-on-request-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </PageSection>

      {/* ── Stats ── */}
      <PageSection tint>
        <StatStrip stats={STATS} />
      </PageSection>

      {/* ── Industries ── */}
      <PageSection background="/images/backgrounds/industries-bg.webp" bgOpacity={0.09}>
        <SectionHeading
          eyebrow="INDUSTRIES"
          title="Who we"
          accent="build for"
          subtitle="Different industries fail online in different ways. We adapt to the sector, not a template."
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
          subtitle="The same six stages every time, so you always know what comes next."
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
    </>
  );
}
