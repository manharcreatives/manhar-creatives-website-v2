/* ═══════════════════════════════════════════════════════════
   MANHAR CREATIVES — Shared Constants
   Service, site and navigation data now live in src/data/.
   This file re-exports them so existing imports keep working,
   and holds the remaining page-level content.
   ═══════════════════════════════════════════════════════════ */

export { SERVICES, getServiceById, getServiceBySlug, SERVICE_SLUGS } from '../data/services';
export { SITE, NAV_LINKS, FOOTER_NAV, CITIES, CITY_SLUGS, STATS, WHATSAPP_LINK, ROUTES } from '../data/site';

// ─── BRAND COLORS ────────────────────────────────────
export const COLORS = {
  primary: '#22C55E',
  primaryDark: '#16A34A',
  accent: '#4ADE80',
  bg: '#0B0F0E',
  bgSecondary: '#111827',
  cardSurface: '#1F2937',
  textPrimary: '#FFFFFF',
  textSecondary: '#9CA3AF',
  textMuted: '#6B7280',
};

// ─── PROCESS STEPS ───────────────────────────────────
export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discovery',
    description: 'We begin by understanding your business, goals, audience, and requirements to establish a clear direction for the project.',
    detail: 'A structured conversation about what the business does, who it serves, what is working, and what the project must achieve. We document the goal in measurable terms before anything else begins.',
    outputs: ['Requirement brief', 'Goal definition', 'Audience profile', 'Success criteria'],
  },
  {
    step: '02',
    title: 'Research',
    description: 'We evaluate your market, competitors, and positioning to identify opportunities and make informed strategic decisions.',
    detail: 'We study how competitors present themselves, what customers search for, and where the gaps are. Decisions from this stage shape structure, messaging and priority, not aesthetics.',
    outputs: ['Competitor review', 'Keyword & search research', 'Positioning direction', 'Opportunity notes'],
  },
  {
    step: '03',
    title: 'Planning',
    description: 'We define project scope, priorities, timelines, and deliverables to create a structured execution plan.',
    detail: 'Scope is locked, the structure is mapped, and the timeline is agreed. You know exactly what is being built, in what order, and when each stage lands.',
    outputs: ['Scope document', 'Sitemap & structure', 'Timeline & milestones', 'Content requirements'],
  },
  {
    step: '04',
    title: 'Design & Development',
    description: 'We transform strategy into functional designs and digital solutions built for usability, consistency, and performance.',
    detail: 'Design and build happen against the agreed structure. Performance, accessibility, mobile behaviour and SEO foundations are engineered in as the work is built, not added afterwards.',
    outputs: ['Design system', 'Responsive build', 'Performance tuning', 'SEO foundation'],
  },
  {
    step: '05',
    title: 'Review & Refinement',
    description: 'Every element is reviewed, tested, and refined to ensure quality, accuracy, and a seamless user experience.',
    detail: 'Structured review rounds across devices and browsers. We test real conditions (mid-range phones, slower connections), not just the ideal case.',
    outputs: ['Cross-device testing', 'Revision rounds', 'Performance audit', 'Content proofing'],
  },
  {
    step: '06',
    title: 'Delivery & Support',
    description: 'Once approved, the project is delivered with the necessary guidance, support, and documentation for a smooth transition.',
    detail: 'Launch, handover and training. You receive the assets, the access, and a walkthrough, plus support after go-live so early questions do not become problems.',
    outputs: ['Full handover', 'Access & ownership', 'Training walkthrough', 'Post-launch support'],
  },
];

// ─── PROJECTS ────────────────────────────────────────
export const PROJECTS = [
  {
    title: 'InfoTech Placement',
    category: 'PLACEMENT WEBSITE',
    description: 'A career consulting & job placement website for InfoTech Placement LLC, featuring structured resume marketing, LinkedIn branding, interview prep, and a written interview guarantee across the US, Canada, UK, and New Zealand.',
    image: '/images/projects/infotech-placement.webp',
    video: 'https://res.cloudinary.com/mchtr6ii/video/upload/q_auto:eco/v1785423391/infotech_2nd_video_ejryeb_dn3w7r.mp4',
    url: 'https://www.infotechplacement.com/',
    tags: ['Website', 'Career Consulting', 'Job Placement'],
    year: '2025',
    industry: 'Recruitment & Placement',
    scope: ['Website Development', 'Content Structure', 'SEO Foundation'],
    outcome: 'A credibility-first website that presents a guarantee-backed service clearly enough for international candidates to act on it.',
  },
  {
    title: 'Averexa Placement',
    category: 'PLACEMENT WEBSITE',
    description: 'A placement consultancy website helping ambitious professionals land full-time roles in the US and Canada, with guaranteed interviews, expert preparation, and a dedicated recruiter at every step.',
    image: '/images/projects/averexa-placement.webp',
    video: 'https://res.cloudinary.com/yig3etij/video/upload/v1783422001/dq66me_uy7e0k.mp4',
    url: 'https://www.averexaplacement.com/',
    tags: ['Website', 'Placement', 'Recruitment'],
    year: '2025',
    industry: 'Recruitment & Placement',
    scope: ['Website Development', 'Conversion Structure', 'Responsive Design'],
    outcome: 'A structured conversion path that turns candidate interest into booked consultations.',
  },
  {
    title: 'Macron Industries',
    category: 'INDUSTRIAL WEBSITE',
    description: 'A modern industrial website designed to showcase capabilities, build credibility, and generate qualified business enquiries.',
    image: '/images/projects/macron-industries.webp',
    video: 'https://files.catbox.moe/8vvtmr.mp4',
    tags: ['Website', 'Industrial', 'Business'],
    url: 'https://www.macronindustries.com/',
    year: '2025',
    industry: 'Manufacturing & Industrial',
    scope: ['Website Development', 'Capability Presentation', 'Enquiry Funnel'],
    outcome: 'Manufacturing capability presented in a way procurement teams can evaluate without a call.',
  },
  {
    title: 'Manhar Creatives Brand System',
    category: 'INTERNAL BRAND PROJECT',
    description: 'A strategic brand identity system developed to create consistency, recognition, and long-term brand value across every touchpoint.',
    image: '/images/projects/brand-system.webp',
    tags: ['Brand Identity', 'Guidelines', 'Print Design'],
    year: '2024',
    industry: 'Internal',
    scope: ['Brand Strategy', 'Identity System', 'Guidelines', 'Print Collateral'],
    outcome: 'A complete identity system that keeps every asset consistent regardless of who produces it.',
  },
  {
    title: 'Restaurant QR Menu System',
    category: 'DIGITAL MENU SYSTEM',
    description: 'A fast, branded digital menu built for weak connections and real kitchen conditions, with instant price updates, one-tap availability toggles, and a review capture flow.',
    image: '/images/projects/qr-menu.webp',
    tags: ['Digital Menu', 'Hospitality', 'Web App'],
    year: '2024',
    industry: 'Restaurants & Hospitality',
    scope: ['Digital Menu System', 'Mobile Performance', 'Brand Application'],
    outcome: 'Menu changes that used to take a week of reprinting now take under a minute.',
  },
];

// ─── FAQ ─────────────────────────────────────────────
export const FAQS = [
  {
    q: 'What types of businesses do you work with?',
    a: 'We work with manufacturers, traders, clinics, retail businesses, service companies, educational institutions, hospitality businesses and startups. Our solutions are tailored to the goals, challenges, and growth stage of each business.',
  },
  {
    q: 'What services does Manhar Creatives offer?',
    a: 'Our core services are website development, custom software development (including CRM, ERP modules and business automation), branding and identity design, social media design, print and offline branding, and digital presence setup. Every solution is designed to strengthen credibility, improve visibility, and support business growth.',
  },
  {
    q: 'Do you build custom software and CRM systems?',
    a: 'Yes. We build custom CRM systems, admin dashboards, internal tools, business automation and API integrations designed around your existing workflow, so your team stops working around software limitations. You own the source code and the data outright, with no per-user licence cost.',
  },
  {
    q: 'Do you also handle SEO, Meta Ads or AI automation?',
    a: 'On request, once scoped to your specific need. These involve ongoing monthly work rather than a one-time build, so we discuss and price them separately after understanding what you are trying to achieve; they sit alongside our six core services rather than being one of them.',
  },
  {
    q: 'How does your project process work?',
    a: 'Every project follows a structured workflow: Discovery, Research, Planning, Design & Development, Review & Refinement, and Delivery & Support. This ensures clarity, transparency, and consistent quality throughout the project.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'Most websites are completed within 1–3 weeks. Branding projects typically take 2–4 weeks, and custom software modules take 4–8 weeks depending on scope. A clear timeline is provided before work begins.',
  },
  {
    q: 'Do you work with businesses outside Gujarat?',
    a: 'Yes. We are based in Visnagar and work extensively across Ahmedabad, Mehsana and North Gujarat, but we deliver projects for clients across India and internationally. Most collaboration happens over calls, WhatsApp and shared documents.',
  },
  {
    q: 'Do you provide support after project completion?',
    a: 'Yes. We offer ongoing support, maintenance, updates, and future enhancements for businesses that want continued assistance after launch or delivery.',
  },
  {
    q: 'How do I get started?',
    a: 'Book a discovery call or contact us through WhatsApp, email, or our contact form. We will discuss your business, understand your requirements, and recommend the most suitable solution for your goals.',
  },
];

// ─── STORY STAGES ────────────────────────────────────
export const STORY_STAGES = [
  'Chaos', 'Clarity', 'Strategy', 'Design', 'Systems', 'Digital Presence', 'Customers', 'Growth'
];

// ─── INDUSTRIES SERVED ───────────────────────────────
export const INDUSTRIES = [
  { name: 'Manufacturing & Industrial', desc: 'Capability-led websites and internal systems for factories, fabricators and industrial suppliers.' },
  { name: 'Restaurants & Hospitality', desc: 'Digital menus, restaurant websites and brand systems built for real service conditions.' },
  { name: 'Healthcare & Clinics', desc: 'Trust-first digital presence for clinics, dentists, diagnostics and specialists.' },
  { name: 'Retail & D2C', desc: 'Storefronts, catalogues and brand identity that translate offline reputation online.' },
  { name: 'Trading & Distribution', desc: 'Custom CRM, inventory and order systems that replace spreadsheet workflows.' },
  { name: 'Education', desc: 'Institution websites, admission funnels and communication systems.' },
  { name: 'Professional Services', desc: 'Credibility-driven websites for consultants, advisors and agencies.' },
  { name: 'Startups & SaaS', desc: 'Launch-ready brand identity, landing pages and product interfaces.' },
];
