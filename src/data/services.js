/* ═══════════════════════════════════════════════════════════
   MANHAR CREATIVES — Service Catalogue
   Single source of truth for service pages, home sections,
   navigation, footer, sitemap and JSON-LD structured data.
   ═══════════════════════════════════════════════════════════ */

export const SERVICES = [
  /* ─────────────────────────────────────────────────────── */
  {
    id: 'web-dev',
    slug: 'website-development',
    category: 'WEB DEV',
    icon: '◈',
    title: 'Website Development',
    shortTitle: 'Website Development',
    tagline: 'Professional websites built for credibility.',
    description:
      'Custom websites designed to showcase your business, strengthen trust, and create a professional digital presence. Every website is built with clarity, performance, and user experience in mind.',
    image: '/images/services/web-dev.webp',
    layout: 'left',
    features: [
      'Business Websites',
      'Corporate Websites',
      'Landing Pages',
      'Portfolio Websites',
      'Startup Websites',
    ],

    /* ── Page-level content ── */
    metaTitle: 'Website Development Company in Gujarat | Custom Web Design — Manhar Creatives',
    metaDescription:
      'Custom website development for businesses in Ahmedabad, Mehsana, Visnagar and across India. Fast, mobile-first, SEO-ready business websites, landing pages and corporate sites built to convert visitors into customers.',
    keywords: [
      'website development company',
      'custom website design',
      'business website development',
      'corporate website design',
      'landing page development',
      'responsive web design',
      'react website development',
      'seo friendly website',
      'website redesign services',
      'fast loading website',
    ],

    heroStat: { value: '1–3', label: 'Weeks to launch' },

    problem: {
      heading: 'Most business websites quietly lose customers',
      body:
        'A website that loads slowly, breaks on mobile, or fails to explain what the business actually does will cost enquiries every single day — silently. Visitors do not complain, they simply leave and choose a competitor who looks more credible. For most businesses the website is the first real impression, and a weak first impression is expensive.',
      points: [
        'Visitors judge credibility in seconds — an outdated design signals an outdated business',
        'Over 70% of traffic is mobile, yet most small business sites are still designed desktop-first',
        'Slow pages get pushed down in Google rankings and abandoned by users',
        'Without a clear structure and call to action, traffic never converts into enquiries',
      ],
    },

    solution: {
      heading: 'Websites engineered as business assets',
      body:
        'We do not treat a website as a design deliverable. We treat it as a growth system — structured around who your customer is, what they need to believe before they contact you, and the single action you want them to take. Design, copy structure, performance and SEO foundations are built together, not bolted on afterwards.',
    },

    deliverables: [
      {
        title: 'Strategy & Structure',
        desc: 'Sitemap, page hierarchy, messaging structure and conversion path defined before a single pixel is designed.',
      },
      {
        title: 'Custom Interface Design',
        desc: 'A design system built for your brand — typography, colour, spacing and components, not a recycled template.',
      },
      {
        title: 'Responsive Development',
        desc: 'Hand-built, mobile-first front-end that behaves correctly on every screen size and browser.',
      },
      {
        title: 'Performance Engineering',
        desc: 'Optimised images, lazy loading, minimal blocking scripts and Core Web Vitals tuning.',
      },
      {
        title: 'On-Page SEO Foundation',
        desc: 'Semantic HTML, meta structure, schema markup, sitemap, robots and clean crawlable URLs.',
      },
      {
        title: 'Analytics & Handover',
        desc: 'Google Analytics, Search Console, Tag Manager and a walkthrough so you can operate it confidently.',
      },
    ],

    tech: ['React', 'Next.js', 'Vite', 'Tailwind CSS', 'Node.js', 'WordPress', 'Vercel', 'Cloudflare'],

    faqs: [
      {
        q: 'How long does it take to build a business website?',
        a: 'Most business websites are delivered in 1–3 weeks. A single landing page can be ready in under a week, while a larger multi-page corporate site with custom sections typically takes 3–4 weeks. We share a clear timeline before work begins.',
      },
      {
        q: 'Will my website work properly on mobile?',
        a: 'Yes. Every site we build is designed mobile-first and tested across phones, tablets and desktop browsers. Since most visitors arrive on mobile, the mobile experience is designed first and the desktop layout is expanded from it.',
      },
      {
        q: 'Do you build websites that rank on Google?',
        a: 'We build the technical foundation that ranking depends on — semantic structure, fast loading, schema markup, clean URLs, sitemaps and mobile usability. Rankings also depend on content and consistency over time, which we can support through ongoing SEO and content work.',
      },
      {
        q: 'Can I update the website myself after launch?',
        a: 'Yes. Depending on the build, we either connect a content management system or provide a simple editing workflow, plus a handover walkthrough. We also offer ongoing maintenance if you would rather not manage it yourself.',
      },
      {
        q: 'What does a website cost?',
        a: 'Cost depends on scope — number of pages, custom functionality, content requirements and integrations. We scope the project first and share a fixed quote before starting, so there are no surprises mid-project.',
      },
    ],

    related: ['branding', 'digital-presence', 'custom-software'],
  },

  /* ─────────────────────────────────────────────────────── */
  {
    id: 'custom-software',
    slug: 'custom-software-development',
    category: 'SOFTWARE',
    icon: '⬡',
    title: 'Custom Software Development',
    shortTitle: 'Custom Software',
    tagline: 'Software built around how your business actually runs.',
    description:
      'Custom CRM, ERP modules, internal dashboards, admin panels and business automation tools built around your exact workflow — replacing scattered spreadsheets and manual processes with one reliable system.',
    image: '/images/services/custom-software.webp',
    layout: 'right',
    features: [
      'Custom CRM Systems',
      'Business Automation',
      'Admin Dashboards',
      'Internal Tools',
      'API & System Integration',
    ],

    metaTitle: 'Custom Software & CRM Development Company in Gujarat — Manhar Creatives',
    metaDescription:
      'Custom software development, CRM systems, ERP modules, admin dashboards and business process automation built for Indian businesses. Replace spreadsheets and manual work with software designed around your workflow.',
    keywords: [
      'custom software development',
      'custom crm development',
      'crm software company',
      'erp software development',
      'business process automation',
      'internal tools development',
      'admin dashboard development',
      'inventory management software',
      'saas development company',
      'api integration services',
      'workflow automation software',
      'bespoke software development india',
    ],

    heroStat: { value: '100%', label: 'Built to your workflow' },

    problem: {
      heading: 'Your business has outgrown its spreadsheets',
      body:
        'Most growing businesses run on a patchwork of Excel files, WhatsApp threads, paper registers and off-the-shelf tools that almost fit. Every one of those gaps is filled by a person doing manual work — re-entering data, chasing updates, reconciling numbers. It works until volume grows, and then it quietly caps how big the business can get.',
      points: [
        'The same data gets entered three times in three different places',
        'Nobody can answer a simple question without opening four files',
        'Off-the-shelf software forces your process to bend around its limitations',
        'Per-user SaaS licence costs keep rising as the team grows',
        'Critical business knowledge lives in one person’s head or laptop',
      ],
    },

    solution: {
      heading: 'One system, designed around your process',
      body:
        'We map how your business actually operates — the real steps, approvals, exceptions and handoffs — and build software that matches it. Not a generic product you adapt to, but a system that fits the way your team already works, removes the manual steps, and gives management a single source of truth. You own the software outright, with no per-user licensing.',
    },

    deliverables: [
      {
        title: 'Process Discovery & Mapping',
        desc: 'We document your current workflow end to end, identify bottlenecks and manual handoffs, and define exactly what the system must do.',
      },
      {
        title: 'Custom CRM Development',
        desc: 'Lead capture, pipeline stages, follow-up reminders, customer history and sales reporting — structured around your actual sales process.',
      },
      {
        title: 'Business Automation',
        desc: 'Automated invoicing, reminders, notifications, approvals, report generation and scheduled tasks that remove repetitive manual work.',
      },
      {
        title: 'Admin Dashboards & Reporting',
        desc: 'Role-based dashboards that show live business numbers — sales, inventory, staff performance, receivables — without exporting anything.',
      },
      {
        title: 'Integrations & APIs',
        desc: 'Connect payment gateways, WhatsApp Business, Tally, Google Workspace, e-commerce platforms and existing systems so data flows automatically.',
      },
      {
        title: 'Deployment, Training & Support',
        desc: 'Secure hosting, data migration from your existing files, staff training and ongoing support after go-live.',
      },
    ],

    useCases: [
      {
        title: 'Sales & CRM',
        desc: 'Track every enquiry from first contact to closed deal, with automated follow-ups so no lead goes cold.',
      },
      {
        title: 'Inventory & Orders',
        desc: 'Live stock levels, purchase orders, supplier records and low-stock alerts across multiple locations.',
      },
      {
        title: 'Billing & Accounts',
        desc: 'Quotation to invoice to payment tracking, with GST-ready formats and automatic outstanding reminders.',
      },
      {
        title: 'Staff & Operations',
        desc: 'Attendance, task assignment, job cards, service scheduling and productivity reporting in one place.',
      },
      {
        title: 'Customer Portals',
        desc: 'Give clients a secure login to check order status, download invoices and raise requests without calling you.',
      },
      {
        title: 'Reporting & Analytics',
        desc: 'Management dashboards that answer real questions instantly instead of waiting for a month-end file.',
      },
    ],

    tech: [
      'React', 'Node.js', 'Python', 'PostgreSQL', 'MySQL', 'Supabase',
      'REST APIs', 'Next.js', 'Docker', 'AWS', 'Cloud Hosting',
    ],

    faqs: [
      {
        q: 'What is custom software development?',
        a: 'Custom software is built specifically for one business rather than sold as a ready-made product. Instead of changing how you work to fit a tool, the software is designed around your existing process — your stages, your approvals, your reports, your terminology.',
      },
      {
        q: 'Why build a custom CRM instead of buying a ready-made one?',
        a: 'Ready-made CRMs are excellent when your process matches theirs. They become expensive and frustrating when it does not — you pay per user every month, you cannot change core behaviour, and your data lives on someone else’s platform. A custom CRM is a one-time build you own, shaped exactly to your sales process, with no per-user licence cost as you grow.',
      },
      {
        q: 'How much does custom software cost in India?',
        a: 'Cost depends on scope. A focused internal tool or single-department CRM is a modest project; a multi-module system covering sales, inventory and accounts is significantly larger. We scope in phases so you can start with the highest-impact module, prove the value, and expand from there rather than paying for everything upfront.',
      },
      {
        q: 'How long does a custom software project take?',
        a: 'A focused module typically takes 4–8 weeks from discovery to go-live. Larger multi-module systems are delivered in phases, with each phase usable on its own so your team gets value before the full system is complete.',
      },
      {
        q: 'Can it integrate with the tools we already use?',
        a: 'Yes. We regularly integrate WhatsApp Business, payment gateways, Google Workspace, Tally, e-commerce platforms and existing databases. If a system has an API, it can usually be connected; where it does not, we build import and export workflows instead.',
      },
      {
        q: 'Who owns the software and the data?',
        a: 'You do. You own the source code and the data outright. There is no vendor lock-in and no per-user subscription, and the system can be hosted on your own cloud account if you prefer.',
      },
      {
        q: 'Is our business data secure?',
        a: 'Security is built in from the start — role-based access control, encrypted connections, hashed credentials, audit logs and regular backups. We can also deploy to a private cloud environment under your own account for full control.',
      },
    ],

    related: ['web-dev', 'digital-presence', 'branding'],
  },

  /* ─────────────────────────────────────────────────────── */
  {
    id: 'branding',
    slug: 'branding-identity',
    category: 'BRANDING',
    icon: '✦',
    title: 'Branding & Identity',
    shortTitle: 'Branding & Identity',
    tagline: 'Professional identities that build trust.',
    description:
      'Strategic branding solutions that help businesses establish consistency, improve recognition, and create a strong professional image across digital and physical touchpoints.',
    image: '/images/services/branding.webp',
    layout: 'left',
    features: ['Logo Design', 'Brand Identity', 'Brand Guidelines', 'Visual Systems', 'Business Branding'],

    metaTitle: 'Branding Agency & Logo Design in Gujarat | Brand Identity — Manhar Creatives',
    metaDescription:
      'Professional brand identity design, logo design and brand guidelines for businesses in Ahmedabad, Mehsana and Visnagar. Build recognition, consistency and trust across every customer touchpoint.',
    keywords: [
      'branding agency',
      'logo design services',
      'brand identity design',
      'brand guidelines',
      'visual identity design',
      'corporate branding',
      'rebranding services',
      'brand strategy',
      'startup branding',
    ],

    heroStat: { value: '360°', label: 'Brand consistency' },

    problem: {
      heading: 'Inconsistent branding makes good businesses look small',
      body:
        'When the logo on the signboard does not match the one on Instagram, when every quotation uses a different font, when the colours change depending on who made the file — customers notice, even if they cannot name what feels off. Inconsistency reads as disorganisation, and disorganisation reads as risk.',
      points: [
        'Different versions of the logo floating across files, signage and social media',
        'No defined colours or typography, so every new design starts from scratch',
        'The brand looks completely different online versus in print',
        'Nothing about the identity communicates what makes the business different',
      ],
    },

    solution: {
      heading: 'A brand system, not just a logo',
      body:
        'We build identities as systems — a primary mark with proper variations, a defined colour palette, a typographic hierarchy, usage rules and ready-to-use assets. The result is a brand that stays consistent no matter who is producing the next design, and that looks equally correct on a business card, a storefront and a phone screen.',
    },

    deliverables: [
      { title: 'Brand Discovery', desc: 'Positioning, audience, competitors and the perception gap the identity needs to close.' },
      { title: 'Logo Design & Variations', desc: 'Primary mark, secondary lockups, monogram, and horizontal/stacked versions for every context.' },
      { title: 'Colour System', desc: 'Primary, secondary and neutral palettes with exact HEX, RGB, CMYK and Pantone values.' },
      { title: 'Typography System', desc: 'Display and body typefaces with a defined hierarchy for headings, body and captions.' },
      { title: 'Brand Guidelines', desc: 'A usage document covering spacing, minimum sizes, do-and-don’t rules and application examples.' },
      { title: 'Asset Pack', desc: 'Print-ready and web-ready files in every required format, organised and handed over cleanly.' },
    ],

    tech: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma', 'InDesign'],

    faqs: [
      { q: 'What is included in a brand identity project?', a: 'A complete identity project includes brand discovery, logo design with all necessary variations, a defined colour and typography system, a brand guidelines document, and a full asset pack in print and digital formats.' },
      { q: 'How is this different from just buying a logo?', a: 'A logo is one asset. An identity is the system that keeps every future design consistent — colours, type, spacing and rules. Without that system, the logo drifts and consistency breaks down within months.' },
      { q: 'Do you rebrand existing businesses?', a: 'Yes. Rebranding projects start with an audit of what currently exists and what equity is worth keeping, so the new identity feels like an evolution rather than a business your existing customers no longer recognise.' },
      { q: 'How many logo concepts will I see?', a: 'We present a focused set of strategically distinct directions rather than dozens of variations, then refine the chosen direction through revision rounds until it is right.' },
    ],

    related: ['print', 'social', 'web-dev'],
  },

  /* ─────────────────────────────────────────────────────── */
  {
    id: 'social',
    slug: 'social-media-design',
    category: 'SOCIAL',
    icon: '◎',
    title: 'Social Media Design',
    shortTitle: 'Social Media Design',
    tagline: 'Consistent communication across platforms.',
    description:
      'Professional social media creatives designed to strengthen brand presence, maintain consistency, and help businesses communicate effectively with their audience.',
    image: '/images/services/social.webp',
    layout: 'right',
    features: ['Social Media Posts', 'Campaign Creatives', 'Content Visuals', 'Brand Communication', 'Promotional Designs'],

    metaTitle: 'Social Media Design & Content Creatives in Gujarat — Manhar Creatives',
    metaDescription:
      'Professional social media design for Instagram, Facebook and LinkedIn. Branded post templates, campaign creatives and content systems that keep your business consistent and recognisable online.',
    keywords: [
      'social media design',
      'instagram post design',
      'social media creatives',
      'social media branding',
      'campaign design',
      'content design services',
      'social media templates',
      'facebook ad creatives',
    ],

    heroStat: { value: '1', label: 'Consistent brand voice' },

    problem: {
      heading: 'Random posts do not build a brand',
      body:
        'Most business social media looks like it was made by five different people, because it usually was. Every post uses a different layout, a different font and a different tone. The audience never develops visual recognition, so the account produces activity without producing brand equity.',
      points: [
        'Every post looks unrelated to the last one',
        'Text is unreadable on a phone screen',
        'No template system, so each post takes hours to produce',
        'Promotions look identical to competitors’ promotions',
      ],
    },

    solution: {
      heading: 'A design system for your feed',
      body:
        'We build a reusable visual system — grid, type scale, colour usage and layout templates — so every post is instantly recognisable as yours, and future posts take minutes instead of hours to produce. Campaigns are designed as sets, not one-offs.',
    },

    deliverables: [
      { title: 'Social Brand Kit', desc: 'Colour, type and layout rules adapted specifically for feed, story and reel formats.' },
      { title: 'Post Template System', desc: 'Editable templates for announcements, offers, testimonials, tips and product highlights.' },
      { title: 'Campaign Creative Sets', desc: 'Coordinated multi-post campaigns designed to work as a sequence in the feed.' },
      { title: 'Profile & Highlight Design', desc: 'Profile images, highlight covers and bio structure that present a complete brand.' },
      { title: 'Festival & Seasonal Creatives', desc: 'On-brand festival greetings and seasonal promotions that avoid the generic template look.' },
      { title: 'Content Guidance', desc: 'Suggested posting structure and content pillars so the account has direction, not just design.' },
    ],

    tech: ['Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'After Effects'],

    faqs: [
      { q: 'Do you also manage the social media accounts?', a: 'Our core service is design and creative systems. We produce the creatives and the templates; posting and community management can be handled by your team or arranged separately.' },
      { q: 'Can you match our existing brand?', a: 'Yes. If brand guidelines exist we work strictly within them. If they do not, we can define the minimum visual rules needed to keep the feed consistent.' },
      { q: 'What formats do you deliver?', a: 'Square and portrait feed posts, stories, reel covers and carousels — exported at the correct dimensions for each platform, plus editable source files where applicable.' },
    ],

    related: ['branding', 'print', 'digital-presence'],
  },

  /* ─────────────────────────────────────────────────────── */
  {
    id: 'print',
    slug: 'print-branding',
    category: 'PRINT',
    icon: '◆',
    title: 'Print & Offline Branding',
    shortTitle: 'Print & Offline Branding',
    tagline: 'Professional branding beyond the screen.',
    description:
      'High-quality print and offline branding materials designed to reinforce your brand identity and create a consistent experience across every customer touchpoint.',
    image: '/images/services/print.webp',
    layout: 'left',
    features: ['Business Cards', 'Brochures', 'Flyers', 'Signage', 'Marketing Materials'],

    metaTitle: 'Print Design & Offline Branding in Gujarat | Brochures, Signage — Manhar Creatives',
    metaDescription:
      'Print-ready brochure design, business cards, flyers, signage, packaging and marketing materials for businesses in Gujarat. Consistent offline branding that matches your digital presence.',
    keywords: [
      'print design services',
      'brochure design',
      'business card design',
      'flyer design',
      'signage design',
      'packaging design',
      'catalogue design',
      'offline branding',
      'marketing collateral design',
    ],

    heroStat: { value: '300', label: 'DPI print-ready' },

    problem: {
      heading: 'Print is where brand consistency usually breaks',
      body:
        'A business invests in a good website, then hands a blurry, stretched logo to a local printer for the visiting card. Customers experience both. When the physical materials look cheaper than the digital ones, the digital ones stop being believed.',
      points: [
        'Low-resolution logos stretched onto banners and boards',
        'Colours that look completely different in print than on screen',
        'Files rejected by printers for missing bleed or wrong colour mode',
        'Every printed item designed independently, with no visual relationship',
      ],
    },

    solution: {
      heading: 'Print-ready files that printers do not send back',
      body:
        'Every file is prepared correctly for production — CMYK colour, proper bleed and margins, outlined type, 300 DPI assets and the right file format for the press. The design stays visually consistent with your digital brand, so the physical and online experience reinforce each other.',
    },

    deliverables: [
      { title: 'Business Stationery', desc: 'Visiting cards, letterheads, envelopes and invoice formats as a coordinated set.' },
      { title: 'Brochures & Catalogues', desc: 'Multi-page company profiles and product catalogues with a proper grid and typographic hierarchy.' },
      { title: 'Flyers & Standees', desc: 'Promotional material designed to be readable at a glance and at the correct viewing distance.' },
      { title: 'Signage & Hoardings', desc: 'Storefront boards, banners and large-format artwork prepared at the correct scale and resolution.' },
      { title: 'Packaging & Labels', desc: 'Product packaging and label design built to dieline, ready for production.' },
      { title: 'Print-Ready Handover', desc: 'CMYK, bleed, crop marks, outlined fonts and packaged files your printer can use immediately.' },
    ],

    tech: ['Adobe InDesign', 'Adobe Illustrator', 'Adobe Photoshop', 'CorelDRAW'],

    faqs: [
      { q: 'Do you handle the actual printing?', a: 'We deliver production-ready artwork and can coordinate with your printer to make sure the output matches the design. Printing itself is usually arranged locally, which keeps cost and turnaround under your control.' },
      { q: 'What files will I receive?', a: 'Print-ready PDFs with bleed and crop marks, plus source files where relevant. Everything is supplied in CMYK at 300 DPI with fonts outlined.' },
      { q: 'Can you match my printed materials to my website?', a: 'Yes — that is the point of the service. We work from the same brand system so colour, typography and tone stay consistent across both.' },
    ],

    related: ['branding', 'social', 'digital-presence'],
  },

  /* ─────────────────────────────────────────────────────── */
  {
    id: 'digital-presence',
    slug: 'digital-presence',
    category: 'DIGITAL PRESENCE',
    icon: '⟐',
    title: 'Digital Presence Setup',
    shortTitle: 'Digital Presence Setup',
    tagline: 'Build a stronger online presence.',
    description:
      'Essential digital setup services that help businesses present a professional image online, improve discoverability, and maintain consistency across key digital platforms.',
    image: '/images/services/digital-presence.webp',
    layout: 'right',
    features: ['Google Business Profile', 'Business Email Setup', 'WhatsApp Business', 'Online Presence Setup', 'Digital Optimization'],

    metaTitle: 'Google Business Profile & Local SEO Setup in Gujarat — Manhar Creatives',
    metaDescription:
      'Google Business Profile setup and optimisation, business email, WhatsApp Business and local SEO foundations so customers can find, verify and contact your business instantly.',
    keywords: [
      'google business profile setup',
      'google my business optimization',
      'local seo services',
      'google maps listing',
      'business email setup',
      'whatsapp business setup',
      'online presence setup',
      'local business seo',
    ],

    heroStat: { value: '46%', label: 'Of Google searches are local' },

    problem: {
      heading: 'Customers search for you and find nothing',
      body:
        'Nearly half of all Google searches have local intent. When someone searches for your service in your city and your business does not appear on Maps — or appears with wrong hours, no photos and no reviews — that customer goes to whoever does appear. This is the cheapest visibility available to a local business, and most never claim it.',
      points: [
        'No Google Business Profile, or an unclaimed one with wrong information',
        'Using a personal Gmail address for business communication',
        'No reviews, or reviews that are never responded to',
        'Business details that differ across every platform',
      ],
    },

    solution: {
      heading: 'Claim the ground where customers actually look',
      body:
        'We set up and optimise the platforms that decide whether a local customer finds you, trusts you and contacts you — Google Business Profile and Maps, professional business email, WhatsApp Business, and consistent business information everywhere it appears.',
    },

    deliverables: [
      { title: 'Google Business Profile', desc: 'Claiming, verification, full category and service setup, business description and photo optimisation.' },
      { title: 'Google Maps Optimisation', desc: 'Accurate location pin, service areas, hours, attributes and everything that affects local map ranking.' },
      { title: 'Professional Business Email', desc: 'Domain-based email setup so you communicate from yourname@yourbusiness.com, not a personal Gmail.' },
      { title: 'WhatsApp Business Setup', desc: 'Business profile, catalogue, quick replies, greeting and away messages configured properly.' },
      { title: 'Review System', desc: 'A review request workflow plus response templates so ratings build steadily instead of accidentally.' },
      { title: 'NAP Consistency Audit', desc: 'Name, address and phone number made identical across every directory and platform — a direct local ranking factor.' },
    ],

    tech: ['Google Business Profile', 'Google Search Console', 'Google Analytics 4', 'Google Tag Manager', 'WhatsApp Business'],

    faqs: [
      { q: 'How long does Google Business Profile verification take?', a: 'Verification usually takes a few days to two weeks depending on the method Google assigns — postcard, phone or video. We handle the setup and guide you through the verification step.' },
      { q: 'Will this help me rank on Google Maps?', a: 'A complete, accurate and active profile is the single biggest factor in local map visibility, alongside proximity and reviews. Setup gets you eligible; consistency and reviews improve position over time.' },
      { q: 'Do I need a website for a Google Business Profile?', a: 'No, but it helps significantly. A profile linked to a real website converts far better and ranks more reliably than one without.' },
    ],

    related: ['web-dev', 'branding', 'social'],
  },
];

/* ─── HELPERS ─────────────────────────────────────────── */
export const getServiceBySlug = (slug) => SERVICES.find((s) => s.slug === slug);
export const getServiceById = (id) => SERVICES.find((s) => s.id === id);
export const SERVICE_SLUGS = SERVICES.map((s) => s.slug);
