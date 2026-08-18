import { useParams, Navigate, Link } from 'react-router-dom';
import Seo, { orgSchema, breadcrumbSchema, faqSchema, serviceSchema } from '../components/Seo';
import { PageHero, PageSection, HeroStats, SectionHeading, FeatureGrid, TagRow } from '../components/PageKit';
import {
  ProblemBlock, ApproachSection, TechStack, LocalReach,
  FaqBlock, RelatedServices, FurtherReading, ServiceKitStyles,
} from '../components/ServiceKit';
import ScrollPanels from '../components/ScrollPanels';
import { getServiceBySlug, SERVICES } from '../data/services';
import { CITIES, SITE } from '../data/site';
import { POSTS } from '../data/blog';

/* ═══════════════════════════════════════════════════════════
   SERVICE DETAIL PAGE

   One template renders all six service pages. Everything that
   makes a page feel specific — the photography, the argument,
   the deliverable panels, the stack — comes out of the service
   entry in data/services.js.

   Entries written before the richer shape existed still render:
   every new field falls back to the old one rather than throwing,
   so a service can be upgraded on its own schedule.
   ═══════════════════════════════════════════════════════════ */

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  if (!service) return <Navigate to="/services" replace />;

  const media = service.media || {};
  const heroImage = media.hero || service.image;

  const hero = service.hero || {};
  const heroTitle = hero.title || service.title;
  const heroAccent = hero.accent;
  const heroSubtitle = hero.subtitle || service.description;

  const stats = service.heroStats || (service.heroStat ? [service.heroStat] : []);

  const related = (service.related || [])
    .map((id) => SERVICES.find((s) => s.id === id))
    .filter(Boolean);

  /* Blog posts that share keywords with this service — internal linking */
  const relatedPosts = POSTS.filter((p) =>
    p.tags.some(
      (t) =>
        service.title.toLowerCase().includes(t.toLowerCase()) ||
        t.toLowerCase().includes(service.category.toLowerCase())
    )
  ).slice(0, 3);

  const posts = relatedPosts.length ? relatedPosts : POSTS.slice(0, 3);

  /* Deliverables become the pinned panel sequence. A service that
     has not had its panel imagery written yet borrows the hero
     image so the section still reads as designed. */
  const panels = (service.deliverables || []).map((d) => ({
    ...d,
    image: d.image || heroImage,
  }));

  const local = service.local;

  return (
    <>
      <Seo
        path={`/services/${service.slug}`}
        title={service.metaTitle}
        description={service.metaDescription}
        keywords={service.keywords}
        image={heroImage}
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

      <ServiceKitStyles />

      {/* ── Hero ── */}
      <PageHero
        fullscreen
        scrollCue
        eyebrow={service.category}
        title={heroTitle}
        titleAccent={heroAccent}
        subtitle={heroSubtitle}
        background={heroImage}
        bgOpacity={0.55}
        imageSide="right"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: service.shortTitle, path: `/services/${service.slug}` },
        ]}
      >
        <div style={{ display: 'flex', gap: 'clamp(24px, 4vw, 44px)', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link to="/contact" className="btn btn-primary" style={{ boxShadow: '0 0 30px rgba(34,197,94,0.26)' }}>
            Book a Discovery Call
          </Link>
          <HeroStats stats={stats} />
        </div>
      </PageHero>

      {/* ── Problem ── */}
      <PageSection style={{ paddingBottom: 'var(--space-2xl)' }}>
        <ProblemBlock
          heading={service.problem.heading}
          body={service.problem.body}
          points={service.problem.points}
          image={media.problem || service.image}
        />
      </PageSection>

      {/* ── Approach ── */}
      <ApproachSection
        heading={service.solution.heading}
        body={service.solution.body}
        pillars={service.solution.pillars || []}
        quote={service.solution.quote}
        image={media.approach || service.image}
      />

      {/* ── Deliverables: pinned horizontal sequence ── */}
      <ScrollPanels
        id="what-you-get"
        eyebrow="WHAT YOU GET"
        title={`Included in every ${service.shortTitle.toLowerCase()} project —`}
        accent="written into the scope before work starts"
        subtitle="Defined deliverables, agreed up front, so you know exactly what you are paying for."
        panels={panels}
      />

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

      {/* ── Stack ── */}
      {service.techStack ? (
        <TechStack
          items={service.techStack}
          title="The stack behind"
          accent="your website"
          subtitle="Not a list of logos. Each of these is here for a reason, and this is the reason."
        />
      ) : (
        service.tech && (
          <PageSection tint>
            <SectionHeading eyebrow="TOOLS & TECHNOLOGY" title="Built with" accent="proven tools" />
            <TagRow items={service.tech} accent />
          </PageSection>
        )
      )}

      {/* ── Local availability ── */}
      <LocalReach
        heading={local?.heading || `${service.shortTitle} across Gujarat and India`}
        body={
          local?.body ||
          `We are based in ${SITE.address.locality} and deliver ${service.title.toLowerCase()} projects across Ahmedabad, Mehsana, North Gujarat and the rest of India. Being locally based means face-to-face meetings when they help — and everything else handled over calls, WhatsApp and shared documents.`
        }
        points={
          local?.points || [
            'Direct communication with the people actually doing the work',
            'Written scope and fixed pricing before the project starts',
            'You own the code, the domain, the hosting and the data',
            'Support after launch, not silence after handover',
          ]
        }
        stat={local?.stat}
        cities={Object.values(CITIES)}
        linkFor={(c) => `/${service.slug}-in-${c.slug}`}
        linkLabel={(c) => `${service.shortTitle} in ${c.name}`}
        image={media.local || service.image}
      />

      {/* ── FAQ ── */}
      <FaqBlock
        faqs={service.faqs}
        eyebrow={`${service.shortTitle} · common questions`}
        heading="What people ask before they commit"
        note={service.faqNote}
        image={media.faq || service.image}
      />

      {/* ── Related services ── */}
      {related.length > 0 && (
        <RelatedServices items={related} title="Works well" accent="alongside" />
      )}

      {/* ── Related reading (internal links) ── */}
      <FurtherReading posts={posts} heading="Worth reading before you decide" />
    </>
  );
}
