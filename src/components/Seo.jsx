import { useEffect } from 'react';
import { SITE } from '../data/site';
import { plain } from './Rich';

/* ═══════════════════════════════════════════════════════════
   SEO — per-route head manager
   Writes title, meta, canonical, OG/Twitter and JSON-LD into
   <head>. Because the prerender step captures the live DOM
   after render, whatever this writes ends up in the static
   HTML that Google and social crawlers receive.
   ═══════════════════════════════════════════════════════════ */

const MANAGED = 'data-mc-seo';

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
  el.setAttribute(MANAGED, 'true');
}

function upsertLink(rel, href, extra = {}) {
  if (!href) return;
  const selector = extra.hreflang
    ? `link[rel="${rel}"][hreflang="${extra.hreflang}"]`
    : `link[rel="${rel}"]`;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
  Object.entries(extra).forEach(([k, v]) => el.setAttribute(k, v));
  el.setAttribute(MANAGED, 'true');
}

export default function Seo({
  title,
  description,
  path = '/',
  image,
  keywords,
  type = 'website',
  schema,
  noindex = false,
  publishedTime,
  modifiedTime,
  articleSection,
}) {
  useEffect(() => {
    const url = `${SITE.url}${path === '/' ? '/' : path}`;
    const fullTitle = title || `${SITE.name} — Digital Solutions & Branding`;
    const desc = description || SITE.description;
    const img = `${SITE.url}${image || SITE.ogImage}`;

    /* ── Title ── */
    document.title = fullTitle;

    /* ── Standard meta ── */
    upsertMeta('name', 'description', desc);
    if (keywords) {
      upsertMeta('name', 'keywords', Array.isArray(keywords) ? keywords.join(', ') : keywords);
    }
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    upsertMeta('name', 'author', SITE.name);

    /* ── Canonical + hreflang ── */
    upsertLink('canonical', url);
    upsertLink('alternate', url, { hreflang: 'en-IN' });
    upsertLink('alternate', url, { hreflang: 'x-default' });

    /* ── Open Graph ── */
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:site_name', SITE.name);
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', desc);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', img);
    upsertMeta('property', 'og:image:width', '1200');
    upsertMeta('property', 'og:image:height', '630');
    upsertMeta('property', 'og:locale', 'en_IN');
    if (publishedTime) upsertMeta('property', 'article:published_time', publishedTime);
    if (modifiedTime) upsertMeta('property', 'article:modified_time', modifiedTime);
    if (articleSection) upsertMeta('property', 'article:section', articleSection);

    /* ── Twitter ── */
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', desc);
    upsertMeta('name', 'twitter:image', img);

    /* ── JSON-LD (route-scoped) ── */
    document.head
      .querySelectorAll('script[data-mc-schema="route"]')
      .forEach((n) => n.remove());

    if (schema) {
      const blocks = Array.isArray(schema) ? schema : [schema];
      blocks.filter(Boolean).forEach((block) => {
        const s = document.createElement('script');
        s.type = 'application/ld+json';
        s.setAttribute('data-mc-schema', 'route');
        s.textContent = JSON.stringify(block);
        document.head.appendChild(s);
      });
    }
  }, [
    title, description, path, image, keywords, type,
    noindex, publishedTime, modifiedTime, articleSection,
    JSON.stringify(schema),
  ]);

  return null;
}

/* ─── SCHEMA BUILDERS ─────────────────────────────────────
   Copy in the data files marks emphasis with **double asterisks**
   for <Rich> to render. Structured data is machine-read and has
   no renderer, so every string that comes from that copy is put
   through `plain()` on the way out — otherwise Google ingests the
   asterisks verbatim as part of the description.
───────────────────────────────────────────────────────── */

export const orgSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE.url}/#organization`,
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}${SITE.logo}`,
  image: `${SITE.url}${SITE.ogImage}`,
  description: SITE.description,
  email: SITE.email,
  telephone: SITE.phoneRaw,
  foundingDate: SITE.founded,
  slogan: SITE.tagline,
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.locality,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.countryCode,
  },
  sameAs: [SITE.instagram],
});

export const breadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: `${SITE.url}${item.path}`,
  })),
});

export const faqSchema = (faqs) => {
  if (!faqs || !faqs.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: plain(f.q),
      acceptedAnswer: { '@type': 'Answer', text: plain(f.a) },
    })),
  };
};

export const serviceSchema = (service) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE.url}/services/${service.slug}#service`,
  name: service.title,
  description: plain(service.description),
  serviceType: service.title,
  url: `${SITE.url}/services/${service.slug}`,
  /* The hero photograph, not the generic site OG image — this is
     what shows up beside the service in rich results. */
  image: `${SITE.url}${service.media?.hero || service.image}`,
  provider: { '@id': `${SITE.url}/#organization` },
  areaServed: [
    { '@type': 'City', name: 'Ahmedabad' },
    { '@type': 'City', name: 'Mehsana' },
    { '@type': 'City', name: 'Visnagar' },
    { '@type': 'State', name: 'Gujarat' },
    { '@type': 'Country', name: 'India' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: `${service.title} Deliverables`,
    itemListElement: (service.deliverables || []).map((d) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: plain(d.title), description: plain(d.desc) },
    })),
  },
});

export const articleSchema = (post, wordCount) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  '@id': `${SITE.url}/blog/${post.slug}#article`,
  headline: post.title,
  alternativeHeadline: post.h1,
  description: plain(post.excerpt),
  image: `${SITE.url}${post.image}`,
  datePublished: post.date,
  dateModified: post.updated || post.date,
  wordCount,
  articleSection: post.category,
  keywords: (post.keywords || []).join(', '),
  inLanguage: 'en-IN',
  author: {
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
  },
  publisher: { '@id': `${SITE.url}/#organization` },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${SITE.url}/blog/${post.slug}`,
  },
});

export const localBusinessSchema = (city) => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE.url}/${city.slug}#localbusiness`,
  name: `${SITE.name} — ${city.name}`,
  description: `Website development, custom software, branding and digital presence services in ${city.name}, ${city.region}.`,
  url: `${SITE.url}/${city.slug}`,
  telephone: SITE.phoneRaw,
  email: SITE.email,
  image: `${SITE.url}${SITE.ogImage}`,
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address.street,
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
  areaServed: { '@type': 'City', name: city.name },
  parentOrganization: { '@id': `${SITE.url}/#organization` },
});
