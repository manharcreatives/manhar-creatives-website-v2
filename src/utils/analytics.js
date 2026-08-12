/* ═══════════════════════════════════════════════════════════
   ANALYTICS — Google Tag Manager dataLayer

   GTM (GTM-MR352HNS) is already on the page. This module is the
   only place in the app that touches `dataLayer`, so every event
   name and parameter shape is defined once and stays consistent.

   Everything here is defensive: if GTM is blocked, hasn't loaded,
   or the visitor is a crawler, `push` is a no-op. Analytics must
   never be able to break a page.

   ── Setting these up in GTM ──────────────────────────────
   In GTM, create a "Custom Event" trigger for each event name
   below, and Data Layer Variables for the parameters you want:

     mc_cta_click        → cta_label, cta_location, cta_href
     mc_form_view        → form_id
     mc_form_start       → form_id, first_field
     mc_form_field_error → form_id, field, error
     mc_form_abandon     → form_id, last_field, fields_filled
     mc_form_submit      → form_id, project_type, contact_method
     mc_form_error       → form_id, reason
     mc_scroll_depth     → depth (25 / 50 / 75 / 100), page_path
     mc_video_play       → video_id, video_location
     mc_outbound_click   → link_url, link_domain, link_text
     mc_button_click     → button_text, button_location, button_href
                           (catch-all for every .btn; mc_cta_click is
                            the curated funnel — do not sum the two)
     mc_contact_click    → method (tel / mailto / whatsapp), value
     mc_share            → method, slug
     mc_print            → slug
     mc_article_feedback → slug, helpful (true / false)
     mc_copy             → copy_type (email / phone / link), value
     mc_blog_search      → search_term, results_count
     mc_page_view        → page_path, page_title   (SPA route change)

   ── UTM parameters ───────────────────────────────────────
   For campaign traffic, append UTMs to the *inbound* links you
   share, not to internal ones. Suggested convention:

     ?utm_source=instagram&utm_medium=bio&utm_campaign=website_launch
     ?utm_source=whatsapp&utm_medium=broadcast&utm_campaign=diwali_offer
     ?utm_source=googlebusiness&utm_medium=organic&utm_campaign=gbp_profile

   GTM reads these automatically into GA4 — no code needed here.
   ═══════════════════════════════════════════════════════════ */

const isBrowser = typeof window !== 'undefined';

/** Crawlers and the prerenderer should never pollute real analytics. */
function isBot() {
  if (!isBrowser) return true;
  if (navigator.webdriver) return true;
  return /bot|crawl|spider|headless|prerender|lighthouse|pagespeed/i.test(navigator.userAgent || '');
}

let enabled = null;
function analyticsEnabled() {
  if (enabled === null) enabled = isBrowser && !isBot();
  return enabled;
}

/** Base push. Everything else in this file funnels through here. */
export function track(event, params = {}) {
  if (!analyticsEnabled()) return;
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...params });
  } catch {
    /* Analytics failure must stay invisible to the visitor. */
  }
}

/* ─── Page views (SPA route changes) ──────────────────── */
export function trackPageView(path, title) {
  track('mc_page_view', {
    page_path: path,
    page_title: title || (isBrowser ? document.title : ''),
  });
}

/* ─── CTA clicks ──────────────────────────────────────── */
export function trackCta(label, location, href) {
  track('mc_cta_click', { cta_label: label, cta_location: location, cta_href: href || '' });
}

/* ─── Form funnel ─────────────────────────────────────── */
export const formEvents = {
  view: (formId) => track('mc_form_view', { form_id: formId }),
  start: (formId, firstField) => track('mc_form_start', { form_id: formId, first_field: firstField }),
  fieldError: (formId, field, error) =>
    track('mc_form_field_error', { form_id: formId, field, error }),
  abandon: (formId, lastField, fieldsFilled) =>
    track('mc_form_abandon', { form_id: formId, last_field: lastField, fields_filled: fieldsFilled }),
  submit: (formId, extra = {}) => track('mc_form_submit', { form_id: formId, ...extra }),
  error: (formId, reason) => track('mc_form_error', { form_id: formId, reason }),
};

/* ─── Video ───────────────────────────────────────────── */
export function trackVideoPlay(videoId, location) {
  track('mc_video_play', { video_id: videoId, video_location: location });
}

/* ─── Copy to clipboard ───────────────────────────────── */
export function trackCopy(type, value) {
  track('mc_copy', { copy_type: type, value });
}

/* ─── Blog search ─────────────────────────────────────── */
export function trackBlogSearch(term, count) {
  track('mc_blog_search', { search_term: term, results_count: count });
}

/* ─── Scroll depth ────────────────────────────────────────
   Fires once per threshold per page. The `reset` returned by the
   initialiser is called on route change so a five-page session
   reports five sets of depths rather than one.
───────────────────────────────────────────────────────── */

const DEPTHS = [25, 50, 75, 100];

export function initScrollDepth() {
  if (!analyticsEnabled()) return () => {};

  let fired = new Set();
  let frame = null;

  const measure = () => {
    frame = null;
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    /* Short pages are 100% read the moment they load — reporting
       that as a scroll milestone would inflate every number. */
    if (max < 240) return;

    const pct = Math.min(100, Math.round(((window.scrollY + window.innerHeight) / doc.scrollHeight) * 100));

    DEPTHS.forEach((d) => {
      if (pct >= d && !fired.has(d)) {
        fired.add(d);
        track('mc_scroll_depth', { depth: d, page_path: window.location.pathname });
      }
    });
  };

  const onScroll = () => {
    if (frame === null) frame = requestAnimationFrame(measure);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  /* Exposed so the router can clear milestones between pages. */
  initScrollDepth.reset = () => { fired = new Set(); };

  return () => {
    if (frame !== null) cancelAnimationFrame(frame);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
    delete initScrollDepth.reset;
  };
}

export function resetScrollDepth() {
  if (typeof initScrollDepth.reset === 'function') initScrollDepth.reset();
}

/* ─── Delegated link tracking ─────────────────────────────
   One listener on document instead of an onClick on every anchor
   in forty files. Catches outbound links, tel:, mailto: and
   WhatsApp — the four things worth knowing about.
───────────────────────────────────────────────────────── */

/** Nearest ancestor with an id — the best available answer to
 *  "which part of the page was this clicked in?" without adding
 *  a data attribute to every element on the site. */
function sectionOf(el) {
  const section = el.closest?.('[id]');
  return section?.id || 'unknown';
}

export function initLinkTracking() {
  if (!analyticsEnabled()) return () => {};

  const onClick = (e) => {
    const el = e.target?.closest?.('a[href], button');
    if (!el) return;

    const text = (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 80);

    /* Buttons: catch-all only. The curated funnel (mc_cta_click)
       is pushed explicitly at the important call-to-actions with
       a hand-written label; this is the long tail. Separate event
       names on purpose, so the two never double-count each other
       in a report. */
    if (el.tagName === 'BUTTON') {
      if (el.classList.contains('btn')) {
        track('mc_button_click', { button_text: text, button_location: sectionOf(el) });
      }
      return;
    }

    const href = el.getAttribute('href') || '';

    if (href.startsWith('tel:')) {
      track('mc_contact_click', { method: 'tel', value: href.replace('tel:', '') });
      return;
    }
    if (href.startsWith('mailto:')) {
      track('mc_contact_click', { method: 'mailto', value: href.replace('mailto:', '') });
      return;
    }
    if (/^https?:/i.test(href)) {
      let host = '';
      try { host = new URL(href, window.location.href).hostname; } catch { host = ''; }
      if (host && host !== window.location.hostname) {
        if (/wa\.me|whatsapp/i.test(host)) {
          track('mc_contact_click', { method: 'whatsapp', value: href });
        }
        track('mc_outbound_click', { link_url: href, link_domain: host, link_text: text });
      }
      return;
    }

    /* Internal links styled as buttons — the CTAs on the inner
       pages that do not carry an explicit trackCta call. */
    if (el.classList.contains('btn')) {
      track('mc_button_click', {
        button_text: text,
        button_location: sectionOf(el),
        button_href: href,
      });
    }
  };

  document.addEventListener('click', onClick, { capture: true, passive: true });
  return () => document.removeEventListener('click', onClick, { capture: true });
}
