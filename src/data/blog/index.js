/* ═══════════════════════════════════════════════════════════
   MANHAR CREATIVES — Blog Registry
   Add a new post file, import it, add it to POSTS. That is all.
   Routes, sitemap, related-post links and JSON-LD derive from here.
   ═══════════════════════════════════════════════════════════ */

import websiteCost from './website-development-cost-india.js';
import crmComparison from './custom-crm-vs-readymade-crm.js';
import gbpChecklist from './google-business-profile-optimization-checklist.js';
import chooseCompany from './how-to-choose-web-development-company.js';
import brandingGuide from './small-business-branding-guide.js';
import webVitals from './website-speed-core-web-vitals-guide.js';
import qrMenu from './restaurant-qr-menu-system-guide.js';
import automation from './business-automation-guide-india.js';

/* Newest first — this order drives the blog index page */
export const POSTS = [
  websiteCost,
  crmComparison,
  gbpChecklist,
  chooseCompany,
  brandingGuide,
  webVitals,
  qrMenu,
  automation,
];

export const POST_SLUGS = POSTS.map((p) => p.slug);

export const getPostBySlug = (slug) => POSTS.find((p) => p.slug === slug);

export const getRelatedPosts = (post, limit = 3) => {
  if (!post) return [];
  const explicit = (post.related || [])
    .map((slug) => POSTS.find((p) => p.slug === slug))
    .filter(Boolean);

  if (explicit.length >= limit) return explicit.slice(0, limit);

  const fallback = POSTS.filter(
    (p) => p.slug !== post.slug && !explicit.some((e) => e.slug === p.slug)
  );
  return [...explicit, ...fallback].slice(0, limit);
};

/* Previous / next in publication order, for the article footer.
   POSTS is newest-first, so "previous article" (the one published
   before this one) is the *next* index — naming it by index would
   read backwards to anyone maintaining this later. */
export const getAdjacentPosts = (post) => {
  const i = POSTS.findIndex((p) => p.slug === post?.slug);
  if (i === -1) return { newer: null, older: null };
  return {
    newer: i > 0 ? POSTS[i - 1] : null,
    older: i < POSTS.length - 1 ? POSTS[i + 1] : null,
  };
};

export const CATEGORIES = [...new Set(POSTS.map((p) => p.category))];

export const FEATURED_POSTS = POSTS.filter((p) => p.featured);

/* Plain-text word count — used for readingTime + Article schema */
export const getWordCount = (post) =>
  (post.content || []).reduce((total, block) => {
    const text =
      block.text ||
      (block.items || []).join(' ') ||
      (block.rows || []).flat().join(' ') ||
      '';
    return total + String(text).replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  }, 0);

export default POSTS;
