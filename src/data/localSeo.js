/* ═══════════════════════════════════════════════════════════
   MANHAR CREATIVES — Service × City local SEO matrix

   These pages exist because "website development in Mehsana" and
   "website development in Ahmedabad" are genuinely different
   searches: different competition, different industries, different
   buying behaviour. Each combination below carries its own written
   angle so the page earns the ranking instead of being the same
   template with a place name swapped in.

   Imported by the app AND by build scripts (sitemap, prerender),
   so this file must stay free of JSX and browser-only APIs.
   ═══════════════════════════════════════════════════════════ */

import { SERVICES } from './services.js';
import { CITIES, CITY_SLUGS } from './site.js';

/* ─── The written angle for each service in each city ──── */
const ANGLES = {
  'web-dev': {
    ahmedabad:
      'Ahmedabad is the one market in Gujarat where a weak website actively costs you deals. Buyers here compare three or four suppliers before the first call, and the comparison happens on a phone, in under a minute. We build Ahmedabad businesses sites that survive that minute — fast on mobile data, clear about what you do, and structured so the enquiry form is never more than one tap away.',
    mehsana:
      'Most Mehsana businesses we meet have a genuine reputation built over twenty or thirty years and a website that undersells it badly — or none at all. That gap is an advantage, not an embarrassment: local search competition here is thin enough that a properly built, properly structured site can reach the first page in months rather than years.',
    visnagar:
      'We are based in Visnagar, so these projects usually start across a table rather than over a call. The businesses here — manufacturers, traders, clinics, institutes — are known locally by name and invisible to everyone else. A website is how that existing trust reaches the customer two towns over who has never heard of you.',
  },
  'custom-software': {
    ahmedabad:
      'Ahmedabad businesses hit the ceiling of spreadsheets earlier than most, because they scale faster. When four people are maintaining the same Excel file and nobody trusts the numbers, off-the-shelf software usually forces you to change how you work. We build the system around your existing process instead — CRM, inventory, billing or dispatch, shaped to how your team already operates.',
    mehsana:
      'Mehsana runs on dairy, agri-processing, engineering and distribution — businesses with real operational complexity and, very often, no software beyond WhatsApp and a ledger. Custom software here is rarely about dashboards; it is about knowing what stock actually exists, which invoice is unpaid, and which order is late, without phoning three people to find out.',
    visnagar:
      'For Visnagar manufacturers and traders, the useful software is almost never the big-name product with two hundred features you will not use. It is a small, exact system: orders in, production tracked, dispatch logged, payments visible. We build that, train your staff on it in their own language, and hand over the source code.',
  },
  branding: {
    ahmedabad:
      'In Ahmedabad you are rarely the only credible option, so recognition does real commercial work. A coherent identity — one logo system, one palette, one type hierarchy used consistently across pitch decks, packaging, signage and social — is what makes a mid-sized company read as an established one in a market full of established ones.',
    mehsana:
      'Plenty of Mehsana businesses have a logo that was drawn once, years ago, and has since been redrawn slightly differently by every printer who touched it. We rebuild it properly — a single mark with defined variations, exact colour values, and a written guideline document so the next vendor cannot quietly change it again.',
    visnagar:
      'Visnagar businesses are known by reputation, not by branding, which works perfectly until you need to sell outside the district. Identity work here is about giving that reputation a form that travels — something a buyer in Ahmedabad or Mumbai recognises as professional before they have met you.',
  },
  social: {
    ahmedabad:
      'Ahmedabad audiences see polished content from national brands all day, which sets the bar for yours. Generic template posts read as generic immediately. We build a social system on your actual brand — templates your team can fill in, campaign sets designed to work as a sequence, and festival creatives that do not look bought off a stock site.',
    mehsana:
      'For most Mehsana businesses social media is where local customers check whether you are still active and still credible, not where they discover you. That means consistency matters more than volume — a steady, on-brand feed beats an occasional burst of unrelated designs, and it is far cheaper to sustain.',
    visnagar:
      'In Visnagar, Instagram and WhatsApp status are genuinely where local reach happens — for shops, clinics, institutes and studios alike. We design creatives that read clearly at thumbnail size on a mid-range phone, because that is the only screen most of your audience will ever see them on.',
  },
  print: {
    ahmedabad:
      'Ahmedabad still runs on printed material at exactly the moments that matter — the exhibition stall, the distributor meeting, the product that reaches a shelf. We prepare print artwork properly: correct dielines, correct colour values, correct bleed, supplied press-ready so the printer cannot introduce their own interpretation.',
    mehsana:
      'Across Mehsana industrial belt, catalogues and company profiles are still how a supplier gets evaluated. We build those as a designed document with a real grid and hierarchy — not a Word file exported to PDF — so your capability reads as seriously as it deserves to.',
    visnagar:
      'Visiting cards, shop signage, festival banners, product labels — in Visnagar these are the brand for most businesses, far more than any website. We design them as one coordinated set so a customer meets the same brand on the board outside and the card in their hand.',
  },
  'digital-presence': {
    ahmedabad:
      'Ahmedabad local search is genuinely contested — the map three-pack is fought over, and an unoptimised Google Business Profile simply loses. We set the profile up properly: correct categories, service areas, products, photos, posting cadence, and a review flow, so that when someone nearby searches, you are in the result rather than under it.',
    mehsana:
      'This is usually the highest-return work available to a Mehsana business, and the cheapest. Competition on local search terms is still low, which means a correctly configured Google Business Profile with real photos, accurate hours and steady reviews can put you at the top of the map results for your category in weeks.',
    visnagar:
      'A large share of Visnagar businesses have either no Google listing or one auto-generated with wrong hours and a wrong pin. Fixing that — correct location, correct category, real photographs, working directions, WhatsApp Business and a proper business email — is often the single change that produces the first measurable increase in calls.',
  },
};

/* Search phrasings this page is genuinely the best answer for. */
function localKeywords(service, city) {
  const s = service.shortTitle.toLowerCase();
  return [
    `${s} in ${city.name.toLowerCase()}`,
    `${s} ${city.name.toLowerCase()}`,
    `best ${s} company ${city.name.toLowerCase()}`,
    `${s} near me`,
    `${s} services near me ${city.name.toLowerCase()}`,
    `top ${s} agency ${city.name.toLowerCase()}`,
    `affordable ${s} ${city.name.toLowerCase()}`,
    `${s} company in ${city.region.toLowerCase()}`,
  ];
}

function localFaqs(service, city) {
  return [
    {
      q: `Do you provide ${service.shortTitle.toLowerCase()} in ${city.name}?`,
      a: `Yes. We deliver ${service.shortTitle.toLowerCase()} for businesses across ${city.name} and the wider ${city.region} region, including ${city.areas.slice(0, 4).join(', ')}. We are based in Visnagar, Gujarat, so in-person meetings are straightforward when a project benefits from one.`,
    },
    {
      q: `How much does ${service.shortTitle.toLowerCase()} cost in ${city.name}?`,
      a: `There is no fixed package. Pricing depends on scope — how much needs to be built, whether content and assets already exist, and what has to integrate with your existing systems. We scope the work first and issue a written quote with a fixed price and timeline before anything starts, so the number does not move mid-project.`,
    },
    {
      q: `Which ${city.name} industries do you usually work with?`,
      a: `Most of our ${city.name} work sits in ${city.industries.slice(0, 4).join(', ')} and similar sectors. The industry matters less than the problem — the underlying job is usually the same shape regardless of what the business sells.`,
    },
    {
      q: `Will this help my business show up when someone in ${city.name} searches nearby?`,
      a: `Partly, and it is worth being precise about how. Local "near me" results are driven mainly by your Google Business Profile, your proximity to the searcher, and your review activity. What we control is the foundation underneath — a fast, correctly structured site with local business schema, accurate NAP details and a properly configured Google Business Profile. That is what makes you eligible to rank; distance and reviews then decide the order.`,
    },
    {
      q: `Do we have to meet in person to start?`,
      a: `No. Most projects run entirely over calls and WhatsApp. That said, we are in North Gujarat, so meeting in ${city.name} is genuinely practical if you would rather sit down and talk it through.`,
    },
  ];
}

/* ─── The matrix ──────────────────────────────────────── */
export const SERVICE_CITY_PAGES = SERVICES.flatMap((service) =>
  CITY_SLUGS.map((citySlug) => {
    const city = CITIES[citySlug];
    const slug = `${service.slug}-in-${citySlug}`;
    return {
      slug,
      path: `/${slug}`,
      service,
      city,
      angle: (ANGLES[service.id] || {})[citySlug] || service.description,
      keywords: localKeywords(service, city),
      faqs: localFaqs(service, city),
      metaTitle: `${service.shortTitle} in ${city.name} | ${city.region} — Manhar Creatives`,
      metaDescription:
        `${service.shortTitle} for businesses in ${city.name}, ${city.region}. ` +
        `${service.tagline} Fixed written scope and pricing, full ownership handed over, locally based in North Gujarat.`,
    };
  })
);

export const SERVICE_CITY_SLUGS = SERVICE_CITY_PAGES.map((p) => p.slug);

export function getServiceCityPage(slug) {
  return SERVICE_CITY_PAGES.find((p) => p.slug === slug) || null;
}

/* Sibling links: same service elsewhere, and other services here. */
export function siblingsFor(page) {
  return {
    sameServiceOtherCities: SERVICE_CITY_PAGES.filter(
      (p) => p.service.id === page.service.id && p.city.slug !== page.city.slug
    ),
    otherServicesSameCity: SERVICE_CITY_PAGES.filter(
      (p) => p.city.slug === page.city.slug && p.service.id !== page.service.id
    ),
  };
}
