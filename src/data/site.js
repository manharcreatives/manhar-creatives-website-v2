/* ═══════════════════════════════════════════════════════════
   MANHAR CREATIVES — Site Configuration
   Business facts, navigation, cities and the route manifest.
   Imported by the app AND by build scripts (prerender, sitemap),
   so this file must stay free of JSX and browser-only APIs.
   ═══════════════════════════════════════════════════════════ */

import { SERVICES } from './services.js';
import { POSTS } from './blog/index.js';

/* ─── BUSINESS ────────────────────────────────────────── */
export const SITE = {
  name: 'Manhar Creatives',
  legalName: 'Manhar Creatives',
  tagline: 'We Design, We Build, You Grow.',
  url: 'https://www.manharcreatives.com',
  domain: 'manharcreatives.com',
  email: 'info@manharcreatives.com',
  phone: '+91 97145 71522',
  phoneRaw: '+919714571522',
  whatsapp: '919714571522',
  instagram: 'https://instagram.com/manhar.creatives',
  companyProfile:
    'https://drive.google.com/uc?export=download&id=1RdGn0DZyyL_f2liZHFeJVqLUyYGWKSny',
  address: {
    street: 'Sona Complex, A-252, Kansa Cross Road, Opp. Khodiyar Hotel',
    locality: 'Visnagar',
    region: 'Gujarat',
    country: 'India',
    countryCode: 'IN',
    postalCode: '384315',
  },
  geo: { lat: '23.7047957', lng: '72.5359769' },
  mapsUrl: 'https://maps.app.goo.gl/XibakBTyA6x1ECLJ7',
  founded: '2022',
  ogImage: '/og-image.png',
  logo: '/images/logos/nav-logo.webp',
  description:
    'Manhar Creatives is a premium digital solutions and branding company in Gujarat, India — building websites, custom software, brand identities and digital presence systems that help businesses grow.',
};

export const WHATSAPP_LINK = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
  'Hello Manhar Creatives,\n\nI would like to discuss a project for my business.\n\nPlease let me know how we can get started.\n\nThank you.'
)}`;

/* ─── NAVIGATION ──────────────────────────────────────── */
export const NAV_LINKS = [
  { label: 'Services', href: '/services', hasMenu: true },
  { label: 'Work', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Process', href: '/process' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export const FOOTER_NAV = {
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Process', href: '/process' },
    { label: 'Our Work', href: '/projects' },
    { label: 'Contact', href: '/contact' },
  ],
  Services: SERVICES.map((s) => ({ label: s.shortTitle, href: `/services/${s.slug}` })),
  Resources: [
    { label: 'Blog & Insights', href: '/blog' },
    { label: 'Company Profile', href: SITE.companyProfile, external: true },
    { label: 'Ahmedabad', href: '/ahmedabad' },
    { label: 'Mehsana', href: '/mehsana' },
    { label: 'Visnagar', href: '/visnagar' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms & Conditions', href: '/terms-and-conditions' },
  ],
};

/* ─── CITIES (local SEO landing pages) ────────────────── */
export const CITIES = {
  ahmedabad: {
    slug: 'ahmedabad',
    name: 'Ahmedabad',
    region: 'Gujarat',
    short: 'the commercial capital of Gujarat',
    intro:
      'Ahmedabad is Gujarat’s commercial engine — a city where textile houses, chemical manufacturers, real estate developers, healthcare groups and a fast-growing startup ecosystem all compete for the same attention. Digital credibility is not optional here; it is the baseline a customer checks before making the first call.',
    context: [
      'One of India’s densest concentrations of SMEs and family-run manufacturing businesses',
      'A mature startup and D2C ecosystem centred around SG Highway, Prahlad Nagar and GIFT City',
      'High competition on local search terms — the three-pack is genuinely contested',
      'Buyers routinely verify a company online before responding to a quotation',
    ],
    industries: ['Manufacturing & Industrial', 'Real Estate', 'Healthcare & Clinics', 'Retail & D2C', 'Startups & SaaS', 'Education'],
    areas: ['SG Highway', 'Prahlad Nagar', 'Satellite', 'Bodakdev', 'Navrangpura', 'Maninagar', 'Bopal', 'Vastrapur', 'CG Road', 'GIFT City'],
    keywords: [
      'website development ahmedabad',
      'web design company ahmedabad',
      'branding agency ahmedabad',
      'custom software development ahmedabad',
      'crm development ahmedabad',
      'logo design ahmedabad',
      'digital agency ahmedabad',
      'seo services ahmedabad',
    ],
  },
  mehsana: {
    slug: 'mehsana',
    name: 'Mehsana',
    region: 'North Gujarat',
    short: 'a fast-growing industrial and trading hub in North Gujarat',
    intro:
      'Mehsana anchors North Gujarat’s industrial belt — dairy, oil and gas, agri-processing, engineering and a dense network of trading businesses. Many are decades old, well-run, and almost invisible online. That gap is the single largest untapped advantage available to businesses here.',
    context: [
      'A strong industrial base — dairy, ONGC-linked services, agri-processing and engineering',
      'Established businesses with strong offline reputation but minimal digital presence',
      'Local search competition is significantly lower than in Ahmedabad — ranking is achievable faster',
      'Buyers increasingly research suppliers online before visiting in person',
    ],
    industries: ['Dairy & Agro', 'Oil & Gas Services', 'Engineering & Fabrication', 'Trading & Distribution', 'Healthcare', 'Education'],
    areas: ['Mehsana City', 'Modhera Road', 'Highway Road', 'Radhanpur Road', 'Nagalpur', 'Dediyasan GIDC'],
    keywords: [
      'website development mehsana',
      'web designer mehsana',
      'branding agency mehsana',
      'custom software mehsana',
      'digital marketing mehsana',
      'logo design mehsana',
      'business website mehsana',
    ],
  },
  visnagar: {
    slug: 'visnagar',
    name: 'Visnagar',
    region: 'North Gujarat',
    short: 'our home town in North Gujarat',
    intro:
      'Visnagar is where Manhar Creatives is based. We know the businesses here — the manufacturers, traders, clinics, educational institutions and retail establishments that have built reputation over generations through word of mouth. Our work is about translating that existing trust into a digital presence that reaches beyond the people who already know you.',
    context: [
      'A strong manufacturing and trading base with deep generational business relationships',
      'Reputation is built locally through word of mouth — but new customers search online first',
      'Very low local search competition means well-built pages rank quickly',
      'Being locally based means face-to-face meetings, not just calls and emails',
    ],
    industries: ['Manufacturing', 'Trading & Wholesale', 'Education', 'Healthcare & Clinics', 'Retail', 'Agriculture'],
    areas: ['Visnagar', 'Kamana', 'Vadnagar Road', 'Unjha Road', 'Kheralu Road', 'Gozaria'],
    keywords: [
      'website development visnagar',
      'web designer visnagar',
      'branding agency visnagar',
      'custom software visnagar',
      'logo design visnagar',
      'digital agency visnagar',
      'website company north gujarat',
    ],
  },
};

export const CITY_SLUGS = Object.keys(CITIES);

/* ─── SERVICE AREAS (structured data + copy) ──────────── */
export const SERVICE_AREAS = [
  'Ahmedabad', 'Gandhinagar', 'Mehsana', 'Visnagar', 'Vadnagar', 'Unjha', 'Patan',
  'Palanpur', 'Himatnagar', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar',
  'Anand', 'Nadiad', 'Bharuch', 'Navsari', 'Junagadh', 'Gujarat', 'India',
];

/* ─── ROUTE MANIFEST ──────────────────────────────────── */
/* Drives the router, the sitemap and the prerender crawler. */
export const ROUTES = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/services', priority: 0.9, changefreq: 'monthly' },
  ...SERVICES.map((s) => ({
    path: `/services/${s.slug}`,
    priority: 0.9,
    changefreq: 'monthly',
  })),
  { path: '/projects', priority: 0.8, changefreq: 'monthly' },
  { path: '/about', priority: 0.8, changefreq: 'monthly' },
  { path: '/process', priority: 0.7, changefreq: 'monthly' },
  { path: '/contact', priority: 0.8, changefreq: 'monthly' },
  { path: '/blog', priority: 0.8, changefreq: 'weekly' },
  ...POSTS.map((p) => ({
    path: `/blog/${p.slug}`,
    priority: 0.7,
    changefreq: 'monthly',
    lastmod: p.updated || p.date,
  })),
  ...CITY_SLUGS.map((c) => ({ path: `/${c}`, priority: 0.7, changefreq: 'monthly' })),
  { path: '/privacy-policy', priority: 0.3, changefreq: 'yearly' },
  { path: '/terms-and-conditions', priority: 0.3, changefreq: 'yearly' },
];

export const ROUTE_PATHS = ROUTES.map((r) => r.path);

/* ─── LEGACY REDIRECTS ────────────────────────────────── */
/* Old service-in-city URLs → the relevant city page section. */
export const LEGACY_REDIRECTS = (() => {
  const map = {};
  const legacyServiceSlugs = {
    'web-development': 'web-dev',
    'restaurant-solutions': 'custom-software',
    branding: 'branding',
    'social-media-design': 'social',
    'print-branding': 'print',
    'digital-presence': 'digital-presence',
  };
  Object.entries(legacyServiceSlugs).forEach(([legacy, id]) => {
    CITY_SLUGS.forEach((city) => {
      map[`/${legacy}-in-${city}`] = `/${city}#${id}`;
    });
    map[`/services/${legacy}`] = `/services/${SERVICES.find((s) => s.id === id).slug}`;
  });
  return map;
})();

/* ─── STATS ───────────────────────────────────────────── */
export const STATS = [
  { value: 4, suffix: '+', label: 'Years Experience' },
  { value: 50, suffix: '+', label: 'Projects Completed' },
  { value: 100, suffix: '%', label: 'Custom, Client-Focused Work' },
  { value: 24, suffix: '/7', label: 'Online Presence' },
];

export default SITE;
