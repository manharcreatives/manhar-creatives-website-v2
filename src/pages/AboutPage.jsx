import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Seo, { orgSchema, breadcrumbSchema, faqSchema } from '../components/Seo';
import {
  PageHero, PageSection, SectionHeading, FaqList,
  GlassCard, StatStrip, SplitPoints,
} from '../components/PageKit';
import { ImageCard, WorkKitStyles } from '../components/WorkKit';
import { ViewAnimator } from '../utils/useInViewLenis';
import { prefersReducedMotion } from '../utils/motion';
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

/* The mosaic bed the six principles sit in. Mirrored spans on a
   twelve-column grid: wide, medium, narrow across the top row and
   the reverse underneath. Six cards in an auto-fitting grid
   resolved to four across and left two dead slots in the bottom
   row; this fills the block exactly, and the changing widths give
   the row a reading order instead of six equal claims. */
const PRINCIPLE_SPANS = [5, 4, 3, 3, 4, 5];

const STORY = [
  `We started in ${SITE.address.locality} — a town in North Gujarat full of businesses that have been doing excellent work for decades. Manufacturers with real capability. Traders with deep relationships. Clinics people genuinely trust. Almost none of it visible to anyone who did not already know about it.`,
  'Meanwhile, newer and often weaker competitors were winning enquiries simply because they showed up first on a phone screen. The gap was never quality. It was presentation, structure and visibility.',
  'That is the gap we exist to close. Not by making things look nicer — though they do — but by building the underlying systems that turn an established offline reputation into something a stranger can find, verify and act on.',
  'Since then the work has expanded well beyond websites. Businesses that solved visibility came back with a different problem: their operations were running on spreadsheets, WhatsApp threads and manual re-entry. So we started building the software to fix that too.',
];

/* ─── Story spread ────────────────────────────────────────
   Four paragraphs stacked under a heading in one 820px column is
   a document, not a page. Nothing tells a visitor how long the
   story runs, where they are in it, or gives the eye anywhere to
   rest between blocks of body copy.

   So the section is built as a spread with a reading state. The
   heading holds still on the left while the narrative scrolls
   past it, and under it a chapter counter tracks which paragraph
   is currently in the reading band — the numeral swaps, the ticks
   advance. On the right the paragraphs hang off a hairline rail
   that fills with scroll position, each taking its marker as it
   arrives, and the opening one is set as a lead because it
   carries the premise the other three answer.

   Every word is unchanged. What is new is that the section now
   behaves like something being read rather than something being
   displayed — and the left column has a live element in it, so
   the whitespace beside a sticky heading reads as composition
   instead of as a hole.
───────────────────────────────────────────────────────── */
function StoryParagraph({ text, lead = false, seen, marked }) {
  return (
    <div style={{ position: 'relative' }}>
      <span
        aria-hidden="true"
        className="mc-story__dot"
        style={{
          position: 'absolute',
          left: 'calc((var(--story-gutter)) * -1 - 3.5px)',
          top: lead ? '13px' : '11px',
          width: '7px', height: '7px', borderRadius: '50%',
          background: marked ? 'var(--color-primary)' : 'rgba(255,255,255,0.16)',
          boxShadow: marked ? '0 0 12px rgba(34,197,94,0.55)' : 'none',
          transform: marked ? 'scale(1)' : 'scale(0.7)',
          transition: 'background 0.5s ease, box-shadow 0.5s ease, transform 0.5s var(--ease-out-expo)',
        }}
      />
      <p
        className="mc-story__para"
        style={{
          color: lead ? 'rgba(255,255,255,0.82)' : 'rgba(255,255,255,0.64)',
          fontSize: lead ? 'clamp(1.125rem, 1.7vw, 1.375rem)' : '1.0625rem',
          lineHeight: lead ? 1.72 : 1.9,
          letterSpacing: lead ? '-0.01em' : 'normal',
          opacity: seen ? 1 : 0,
          transform: seen ? 'none' : 'translateY(14px)',
          transition: 'opacity 0.75s var(--ease-out-expo), transform 0.75s var(--ease-out-expo)',
        }}
      >
        {text}
      </p>
    </div>
  );
}

function StorySpread({ eyebrow, title, paragraphs }) {
  const trackRef = useRef(null);
  const fillRef = useRef(null);
  const paraRefs = useRef([]);

  /* One rAF loop drives all three states — rail fill, which
     paragraphs have been revealed, and which chapter is active.
     Four separate observers would mean four getBoundingClientRect
     calls a frame for what is one measurement pass.

     rAF + getBoundingClientRect rather than a scroll-linked motion
     value, for the same reason the rest of the site does it: Lenis
     drives the scroll here and framer's container resolution does
     not survive it. The rail is written straight to `transform`,
     so filling it never re-renders a paragraph — only the two
     indices below are state, and they change four times each. */
  const [revealed, setRevealed] = useState(-1);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduced = prefersReducedMotion();

    if (reduced && fillRef.current) {
      fillRef.current.style.transform = 'scaleY(1)';
      setRevealed(paragraphs.length - 1);
    }

    let frame = null;
    let lastRevealed = reduced ? paragraphs.length - 1 : -1;
    let lastActive = 0;

    const update = () => {
      frame = null;
      const el = trackRef.current;
      if (!el) return;
      const vh = window.innerHeight;

      if (!reduced && fillRef.current) {
        const r = el.getBoundingClientRect();
        /* Filled up to whatever has passed the lower quarter of
           the viewport — the line the eye is actually reading on. */
        const p = r.height > 0 ? (vh * 0.78 - r.top) / r.height : 0;
        fillRef.current.style.transform = `scaleY(${Math.min(1, Math.max(0, p))})`;
      }

      let nextRevealed = lastRevealed;
      let nextActive = 0;

      paraRefs.current.forEach((node, i) => {
        if (!node) return;
        const top = node.getBoundingClientRect().top;
        if (top < vh * 0.9 && i > nextRevealed) nextRevealed = i;
        /* Active = the last paragraph whose top has crossed the
           middle of the screen, so the counter changes when the
           chapter actually arrives rather than when it peeks in. */
        if (top < vh * 0.55) nextActive = i;
      });

      if (nextRevealed !== lastRevealed) { lastRevealed = nextRevealed; setRevealed(nextRevealed); }
      if (nextActive !== lastActive) { lastActive = nextActive; setActive(nextActive); }
    };

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [paragraphs.length]);

  return (
    <>
      <style>{`
        .mc-story {
          display: grid;
          grid-template-columns: minmax(0, 0.86fr) minmax(0, 1.14fr);
          gap: clamp(36px, 6vw, 96px);
          align-items: start;
        }

        /* Below two comfortable columns the sticky heading has
           nothing to sit beside, so it becomes a normal heading
           and the chapter counter — which only means anything
           next to the text it counts — drops out. */
        @media (max-width: 900px) {
          .mc-story { grid-template-columns: 1fr; gap: 30px; }
          .mc-story__head { position: static !important; }
          .mc-story__chapters { display: none !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .mc-story__para { opacity: 1 !important; transform: none !important; }
          .mc-story__dot  { transform: none !important; }
        }
      `}</style>

      <div className="mc-story">
        <div className="mc-story__head" style={{ position: 'sticky', top: 'clamp(96px, 13vh, 132px)' }}>
          <ViewAnimator
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-6%' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <p
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.18em',
                textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '20px',
              }}
            >
              {eyebrow}
            </p>
            <h2 className="text-heading-2" style={{ color: '#fff' }}>
              {title}
            </h2>

            {/* Chapter counter. The outlined numeral is the same
                device the case rows and the capability ledger use
                for their indices — here it is live. */}
            <div
              className="mc-story__chapters"
              aria-hidden="true"
              style={{
                marginTop: 'clamp(34px, 4vw, 52px)',
                paddingTop: 'clamp(24px, 3vw, 34px)',
                borderTop: '1px solid var(--border-subtle)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', height: 'clamp(46px, 5.5vw, 74px)' }}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={active}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.34, ease: EASE }}
                    style={{
                      display: 'inline-block',
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(2.75rem, 5vw, 4.5rem)',
                      fontWeight: 600, lineHeight: 1, letterSpacing: '-0.03em',
                      color: 'transparent', WebkitTextStroke: '1px rgba(34,197,94,0.55)',
                    }}
                  >
                    {String(active + 1).padStart(2, '0')}
                  </motion.span>
                </AnimatePresence>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.6875rem',
                    letterSpacing: '0.16em', color: 'rgba(255,255,255,0.32)',
                  }}
                >
                  / {String(paragraphs.length).padStart(2, '0')}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '18px' }}>
                {paragraphs.map((_, i) => (
                  <span
                    key={i}
                    style={{
                      height: '2px', borderRadius: '2px',
                      width: i === active ? '40px' : '18px',
                      background: i <= active ? 'var(--color-primary)' : 'rgba(255,255,255,0.14)',
                      opacity: i === active ? 1 : i < active ? 0.45 : 1,
                      transition: 'width 0.55s var(--ease-out-expo), background 0.4s ease, opacity 0.4s ease',
                    }}
                  />
                ))}
              </div>
            </div>
          </ViewAnimator>
        </div>

        <div
          ref={trackRef}
          style={{
            '--story-gutter': 'clamp(22px, 2.6vw, 42px)',
            position: 'relative',
            paddingLeft: 'var(--story-gutter)',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              position: 'absolute', left: 0, top: '12px', bottom: '12px',
              width: '1px', background: 'rgba(255,255,255,0.07)',
            }}
          />
          <span
            ref={fillRef}
            aria-hidden="true"
            style={{
              position: 'absolute', left: 0, top: '12px', bottom: '12px', width: '1px',
              background: 'linear-gradient(180deg, #16A34A, #22C55E 45%, #4ADE80)',
              boxShadow: '0 0 12px rgba(34,197,94,0.5)',
              transformOrigin: '50% 0', transform: 'scaleY(0)', willChange: 'transform',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(26px, 3.2vw, 38px)' }}>
            {paragraphs.map((p, i) => (
              <div key={i} ref={(n) => { paraRefs.current[i] = n; }}>
                <StoryParagraph text={p} lead={i === 0} seen={i <= revealed} marked={i <= active} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

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
        <StorySpread
          eyebrow="Our story"
          title="Good businesses, invisible online"
          paragraphs={STORY}
        />
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
        <div className="mc-principle-grid">
          {PRINCIPLES.map((p, i) => (
            <div key={p.title} className={`mc-principle-cell--${PRINCIPLE_SPANS[i]}`}>
              {/* Top row runs taller than the bottom one: the eye
                  lands there first, and a mosaic with two identical
                  rows is just a grid with uneven columns. */}
              <ImageCard item={p} index={i} minHeight={i < 3 ? '400px' : '330px'} />
            </div>
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
