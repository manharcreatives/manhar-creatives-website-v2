import { Link } from 'react-router-dom';
import Seo, { orgSchema, breadcrumbSchema, faqSchema } from '../components/Seo';
import { PageHero, PageSection, SectionHeading, FaqList, GlassCard } from '../components/PageKit';
import ProcessFlow from '../components/ProcessFlow';
import { ViewAnimator } from '../utils/useInViewLenis';
import { PROCESS_STEPS } from '../utils/constants';
import { SITE } from '../data/site';

const EASE = [0.16, 1, 0.3, 1];

const PROCESS_FAQS = [
  {
    q: 'How long does each stage take?',
    a: 'Discovery and research typically take 2–4 days. Planning takes 1–2 days. Design and development is the longest stage — 1–3 weeks for a website, 4–8 weeks for a custom software module. Review adds a few days, and delivery is same-day once approved.',
  },
  {
    q: 'What do you need from me during the project?',
    a: 'Three things: content and images, timely feedback at each review point, and one nominated person authorised to give approvals. Projects slow down almost exclusively because of delays in these three, not because of development time.',
  },
  {
    q: 'How many revision rounds are included?',
    a: 'The number is stated in your proposal — typically two to three structured rounds per stage. A revision round means one consolidated set of feedback, not an open-ended series of individual changes. Additional rounds are quoted separately.',
  },
  {
    q: 'What happens if requirements change mid-project?',
    a: 'We raise a change request with its own scope and quote, and you decide whether to approve it. We do not silently absorb new work and then deliver late — that is how projects lose both timeline and trust.',
  },
  {
    q: 'What does handover include?',
    a: 'Full source files, source code, domain and hosting access registered in your name, a walkthrough of how to use and update everything, and a support period for any bugs or defects in the delivered work.',
  },
];

export default function ProcessPage() {
  return (
    <>
      <Seo
        path="/process"
        title={`Our Process — How We Deliver Projects | ${SITE.name}`}
        description="A six-stage process built to remove uncertainty: discovery, research, planning, build, review and delivery. Written scope and fixed pricing before anything starts."
        keywords={[
          'web development process',
          'design process agency',
          'project workflow',
          'how we work',
          'software development process india',
        ]}
        schema={[
          orgSchema(),
          faqSchema(PROCESS_FAQS),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Process', path: '/process' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How Manhar Creatives delivers a project',
            description: 'Our six-stage delivery process from discovery to launch and support.',
            step: PROCESS_STEPS.map((s, i) => ({
              '@type': 'HowToStep',
              position: i + 1,
              name: s.title,
              text: s.detail || s.description,
              url: `${SITE.url}/process#step-${s.step}`,
            })),
          },
        ]}
      />

      <PageHero
        fullscreen
        scrollCue
        eyebrow="OUR PROCESS"
        title="Six stages. No"
        titleAccent="guesswork."
        subtitle="Most project failures are not technical — they are the result of unclear scope, undefined approvals and silent delays. Our process exists to make each of those impossible."
        background="/images/pages/process-hero.webp"
        bgOpacity={0.55}
        imageSide="left"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Process', path: '/process' },
        ]}
      >
        <Link to="/contact" className="btn btn-primary" style={{ boxShadow: '0 0 30px rgba(34,197,94,0.26)' }}>
          Start a Project
        </Link>
      </PageHero>

      {/* ── Timeline ── */}
      <ProcessFlow
        steps={PROCESS_STEPS}
        image="/images/pages/process-flow.webp"
        eyebrow="THE PROCESS"
        title="Six stages, in order,"
        accent="with nothing hidden between them"
      />


      {/* ── What makes it work ── */}
      <PageSection tint>
        <SectionHeading
          eyebrow="WHY IT WORKS"
          title="Three rules that prevent"
          accent="most project failures"
          center
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {[
            {
              t: 'Scope is written before work starts',
              d: 'A documented scope with fixed pricing. If something new comes up, it becomes a change request with its own quote — not an invisible delay or an argument at the end.',
            },
            {
              t: 'One person approves',
              d: 'Every project has a single nominated decision-maker on your side. Feedback from five people with conflicting opinions is the fastest way to a project that never ends.',
            },
            {
              t: 'Every stage has a defined output',
              d: 'You always know what is being produced and what "done" looks like at each stage. Nothing moves forward on a vague verbal agreement.',
            },
          ].map((r, i) => (
            <ViewAnimator
              key={r.t}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.55, delay: i * 0.09, ease: EASE }}
              style={{ height: '100%' }}
            >
              <GlassCard>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.0625rem', fontWeight: 600, color: '#fff', marginBottom: '12px', lineHeight: 1.38 }}>
                  {r.t}
                </h3>
                <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.54)', lineHeight: 1.78 }}>{r.d}</p>
              </GlassCard>
            </ViewAnimator>
          ))}
        </div>
      </PageSection>

      {/* ── Typical timelines ── */}
      <PageSection>
        <SectionHeading
          eyebrow="TIMELINES"
          title="How long things"
          accent="usually take"
          subtitle="Realistic ranges assuming content and feedback arrive on time. Your specific timeline is confirmed in the proposal."
        />
        <div
          style={{
            overflowX: 'auto', borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)', background: 'rgba(31,41,55,0.2)',
            backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '520px' }}>
            <thead>
              <tr>
                {['Project type', 'Typical timeline', 'Main dependency'].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: 'left', padding: '16px 22px', fontFamily: 'var(--font-mono)',
                      fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                      color: 'var(--color-primary)', borderBottom: '1px solid rgba(34,197,94,0.16)',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Landing page', '3–7 days', 'Content readiness'],
                ['Business website (5–10 pages)', '1–3 weeks', 'Content and image sourcing'],
                ['Premium custom website', '3–6 weeks', 'Design approval rounds'],
                ['Brand identity system', '2–4 weeks', 'Direction approval'],
                ['Custom software module', '4–8 weeks', 'Process clarity from your team'],
                ['Multi-module system', 'Phased, 3–6 months', 'Phase-by-phase sign-off'],
                ['Google Business Profile setup', '3–5 days + verification', 'Google verification method'],
              ].map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      style={{
                        padding: '16px 22px', fontSize: '0.9375rem', lineHeight: 1.6,
                        color: ci === 0 ? 'rgba(255,255,255,0.84)' : 'rgba(255,255,255,0.55)',
                        fontWeight: ci === 0 ? 500 : 400,
                        borderBottom: ri === 6 ? 'none' : '1px solid var(--border-subtle)',
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      {/* ── FAQ ── */}
      <PageSection tint>
        <div style={{ maxWidth: '880px', margin: '0 auto' }}>
          <FaqList faqs={PROCESS_FAQS} title="Process — common questions" />
        </div>
      </PageSection>


      <style>{`
        @media (max-width: 640px) {
          .process-line { display: none !important; }
          .process-row { flex-direction: column !important; gap: 14px !important; }
        }
      `}</style>
    </>
  );
}
