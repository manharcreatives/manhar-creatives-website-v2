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

    /* ── Imagery ──────────────────────────────────────────
       Every slot is a real file path. Replacing the artwork is
       dropping a new .webp over the same filename — no code
       change, no import to update, nothing to rebuild by hand.
       See docs/image-brief.md for the prompt behind each one.
    ───────────────────────────────────────────────────── */
    media: {
      hero: '/images/services/web-dev/hero.webp',
      problem: '/images/services/web-dev/problem.webp',
      approach: '/images/services/web-dev/approach.webp',
      local: '/images/services/web-dev/local.webp',
      faq: '/images/services/web-dev/faq.webp',
    },

    /* ── Page-level content ── */
    metaTitle: 'Website Development Company in Gujarat — Manhar Creatives',
    metaDescription:
      'Custom website development in Ahmedabad, Mehsana, Visnagar and across India. Fast, mobile-first, SEO-ready business sites built to turn visitors into enquiries.',
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

    hero: {
      title: 'Website development for businesses',
      accent: 'that are tired of being overlooked',
      subtitle:
        'A visitor decides in **eight seconds** whether your business is worth contacting. We build sites that win those seconds — fast on phones, clear about what you do.',
    },

    heroStats: [
      { value: '2–6', label: 'Weeks to launch' },
      { value: '70%+', label: 'Of your visitors arrive on a phone' },
      { value: '8 sec', label: 'To earn the first impression' },
    ],

    problem: {
      heading: 'Every day, your website quietly hands people to your competitor',
      body: [
        'Someone hears your name and searches. For the first few seconds they are not reading your site, they are **judging** it. Slow, cramped on a phone, or vague about what you do, and they open the next tab and call your competitor.',
      ],
      points: [
        '**Eight seconds.** That is the window before a visitor leaves',
        'More than **70% of your traffic is on a phone**',
        'A **three-second load** drops you down Google and loses users',
        'Traffic with no clear next step is **just a bill**',
        'A dated design says the **business behind it is dated**',
      ],
    },

    solution: {
      heading: 'We do not build websites. We build the reason someone chooses you.',
      body: [
        'A website is the room where a buying decision happens, before you speak to anyone. So we start there: who lands here, what they must believe, and the one action that matters. Structure, speed and SEO first — **visual design once the argument is right**.',
      ],
      pillars: [
        {
          title: 'Decision-first structure',
          desc: 'Sitemap, page order and messaging mapped to how your customer decides — not what looks tidy in navigation.',
        },
        {
          title: 'Fast by construction',
          desc: 'Optimised media, minimal blocking scripts and Core Web Vitals handled during development — not cleaned up afterwards.',
        },
        {
          title: 'Found, then trusted',
          desc: 'Semantic structure, schema and clean URLs so Google can read it — a design that makes people stay.',
        },
      ],
      quote: 'We design, we build, you grow. The website is where that sentence starts proving itself.',
    },

    deliverables: [
      {
        title: 'Strategy & Structure',
        desc: 'Before a pixel is drawn, we agree what the site must **prove**, and in what order.',
        points: [
          'Sitemap and page-by-page content outline',
          'One primary action defined per page',
        ],
        image: '/images/services/web-dev/01-strategy.webp',
      },
      {
        title: 'Custom Interface Design',
        desc: 'A design system built for **your** brand — not a template with your logo dropped in.',
        points: [
          'Desktop, tablet and mobile layouts designed, not guessed',
          'Reusable component set for future pages',
        ],
        image: '/images/services/web-dev/02-design.webp',
      },
      {
        title: 'Responsive Development',
        desc: 'Hand-built, mobile-first front-end that behaves on **every screen a real customer owns**, including a five-year-old Android.',
        points: [
          'Tested across browsers and real device widths',
          'Accessible markup, keyboard and screen-reader safe',
        ],
        image: '/images/services/web-dev/03-development.webp',
      },
      {
        title: 'Performance Engineering',
        desc: 'Media, fonts and scripts handled during the build, so it is **fast on the first visit**.',
        points: [
          'Optimised, correctly sized and lazy-loaded media',
          'Core Web Vitals measured before handover',
        ],
        image: '/images/services/web-dev/04-performance.webp',
      },
      {
        title: 'On-Page SEO Foundation',
        desc: 'The technical groundwork ranking depends on — **built in, not sold back to you later**.',
        points: [
          'Schema markup, sitemap, robots and clean URLs',
          'Local SEO structure for city and service pages',
        ],
        image: '/images/services/web-dev/05-seo.webp',
      },
      {
        title: 'Analytics, Handover & Support',
        desc: 'You leave **owning it** — code, domain, hosting, data, and support after launch.',
        points: [
          'Analytics, Search Console and Tag Manager configured',
          'Recorded walkthrough and written documentation',
        ],
        image: '/images/services/web-dev/06-handover.webp',
      },
    ],

    /* Plain list kept for the home page and structured data. */
    tech: ['React', 'Next.js', 'Vite', 'Tailwind CSS', 'Node.js', 'WordPress', 'Vercel', 'Cloudflare'],

    techStack: [
      {
        name: 'React',
        role: 'Interface layer',
        logo: '/images/tech/react.webp',
        points: [
          'Component architecture so new pages reuse proven parts',
          'Keeps large sites fast as sections are added',
        ],
      },
      {
        name: 'Next.js',
        role: 'Rendering & SEO',
        logo: '/images/tech/nextjs.webp',
        points: [
          'Server rendering so Google sees content, not empty shells',
          'For sites needing scale, routing depth or a blog',
        ],
      },
      {
        name: 'Vite',
        role: 'Build tooling',
        logo: '/images/tech/vite.webp',
        points: [
          'Lean production bundles, so visitors download less code',
          'Fast iteration during the build, so reviews stay short',
        ],
      },
      {
        name: 'Tailwind CSS',
        role: 'Design system',
        logo: '/images/tech/tailwind.webp',
        points: [
          'Enforces one spacing and colour scale across every page',
          'Keeps the stylesheet small instead of growing per section',
        ],
      },
      {
        name: 'Node.js',
        role: 'Server & APIs',
        logo: '/images/tech/nodejs.webp',
        points: [
          'Powers forms, integrations and anything the site must reach',
          'One language front and back — faster to maintain',
        ],
      },
      {
        name: 'WordPress',
        role: 'Content management',
        logo: '/images/tech/wordpress.webp',
        points: [
          'Chosen when your team publishes without calling a developer',
          'Built lean and hardened — not twenty stacked plugins',
        ],
      },
      {
        name: 'Vercel',
        role: 'Hosting & delivery',
        logo: '/images/tech/vercel.webp',
        points: [
          'Global edge delivery, fast loading outside your city too',
          'Every deploy is previewable and reversible',
        ],
      },
      {
        name: 'Cloudflare',
        role: 'Security & speed',
        logo: '/images/tech/cloudflare.webp',
        points: [
          'CDN caching, DDoS protection and SSL handled properly',
          'Image and asset optimisation at the network edge',
        ],
      },
    ],

    local: {
      heading: 'Built in Gujarat, delivered across India',
      body:
        'Based in Visnagar, building for businesses across Ahmedabad, Mehsana, North Gujarat and the rest of India. Local means you can **sit across a table** when it helps; everything else runs over calls, WhatsApp and shared documents.',
      points: [
        'You talk to the people doing the work',
        'Written scope and fixed pricing before anything starts',
        'You own the code, domain, hosting and data',
        'Support after launch, not silence after handover',
      ],
      stat: { value: 'Visnagar', label: 'Based in North Gujarat, working nationwide' },
    },

    faqNote:
      'These come up in almost every first call. If yours is not here, **ask it directly** — you get a straight answer.',

    faqs: [
      {
        q: 'How long does it take to build a business website?',
        a: 'A minimum of two weeks. A focused landing page or small business site is typically ready in 2 to 3 weeks. A larger multi-page corporate site with custom sections, content and integrations usually runs 4 to 6 weeks. Anyone promising a serious website in three days is using a template or skipping what makes it work. You get a written timeline before we begin.',
      },
      {
        q: 'Will my website work properly on mobile?',
        a: 'Yes. Every site is designed mobile-first and tested across real phone widths, tablets and desktop browsers. Most of your visitors arrive on a phone, so the mobile experience is designed first and the desktop layout expanded from it — not the other way around, which is how sites end up cramped on the screen that matters most.',
      },
      {
        q: 'Do you build websites that rank on Google?',
        a: 'We build the technical foundation ranking depends on — semantic structure, fast loading, schema markup, clean URLs, sitemaps and mobile usability. That is the part a developer controls. Rankings also depend on content, local signals and consistency over months, which we can support through ongoing SEO and content work. We will tell you honestly which of the two your business needs.',
      },
      {
        q: 'Can I update the website myself after launch?',
        a: 'Yes. Depending on the build we either connect a content management system or provide a simple editing workflow, plus a recorded handover walkthrough. If you would rather not manage it at all, we offer ongoing maintenance — but that is your choice, not a lock-in.',
      },
      {
        q: 'What does a website cost?',
        a: 'Cost follows scope — number of pages, custom functionality, content requirements and integrations. We scope the project first and share a fixed quote before starting, so there is no mid-project surprise. If your budget is better spent on something other than a new website, we will say so.',
      },
      {
        q: 'What do you need from me to start?',
        a: 'A conversation about what the business needs to achieve, whatever brand assets you already have, and a point of contact who can approve decisions. Content and photography can come from you or from us — we will tell you which parts genuinely need your input and which we can handle without holding up the build.',
      },
    ],

    related: ['branding', 'digital-presence', 'custom-software'],
  },

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

    /* ── Imagery ──────────────────────────────────────────
       Every slot is a real file path. Replacing the artwork is
       dropping a new .webp over the same filename — no code
       change, no import to update, nothing to rebuild by hand.
       See docs/image-brief.md for the prompt behind each one.
    ───────────────────────────────────────────────────── */
    media: {
      hero: '/images/services/custom-software/hero.webp',
      problem: '/images/services/custom-software/problem.webp',
      approach: '/images/services/custom-software/approach.webp',
      local: '/images/services/custom-software/local.webp',
      faq: '/images/services/custom-software/faq.webp',
    },

    /* ── Page-level content ── */
    metaTitle: 'Custom Software & CRM Development Company in Gujarat — Manhar Creatives',
    metaDescription:
      'Custom CRM, ERP modules, admin dashboards and business automation built around your actual workflow. Replace spreadsheets and manual work with one system you own.',
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

    hero: {
      title: 'Custom software and CRM systems',
      accent: 'for the process you have already built',
      subtitle:
        'Your process lives in spreadsheets, WhatsApp threads and **one person’s memory**, where every handoff costs minutes and occasional expensive mistakes. We build the system that holds it instead.',
    },

    heroStats: [
      { value: '6–12', label: 'Weeks to a first working module' },
      { value: '₹0', label: 'Per-user licence once it is yours' },
      { value: '100%', label: 'Source code and data in your name' },
    ],

    problem: {
      heading: 'Every week, your team rebuilds the same information by hand',
      body: [
        'One Excel file for orders, a WhatsApp group for the field team, another sheet for payments. Nobody notices the week they stopped agreeing. Now a simple question — what is pending with this customer — takes **four files and two phone calls** to answer.',
      ],
      points: [
        'Sales, dispatch and accounts each enter **the same order**',
        'Month-end takes days — every number needs **reconciling first**',
        'Ready-made tools make your process **bend around their limits**',
        'Per-user licences rise with every hire — **rented forever**',
        'Critical knowledge sits in **one person’s laptop** and walks out',
      ],
    },

    solution: {
      heading: 'We build the version of your process that does not depend on anyone remembering.',
      body: [
        'We sit with the people doing the work, not only the owner, and that map becomes the specification. We build the smallest system removing the most manual work. One module live and useful beats **a platform delivered in nine months and rejected in a week**.',
      ],
      pillars: [
        {
          title: 'Mapped before built',
          desc: 'Every screen traces back to a real step in your operation, including the exceptions and shortcuts nobody documents.',
        },
        {
          title: 'Shipped in phases',
          desc: 'Most expensive manual process goes live first, on its own. You judge it on **hours saved this month**.',
        },
        {
          title: 'Yours to keep',
          desc: 'Repository, database and hosting registered to you on day one. No per-user licence, no lock-in clause, no renewal.',
        },
      ],
      quote:
        'We design, we build, you grow — in software, the same team handling twice the work without twice the effort.',
    },

    deliverables: [
      {
        title: 'Process Discovery',
        desc: 'A week or two watching the work, ending in a written specification you can **disagree with**.',
        points: [
          'Workflow walkthrough with the people doing the job',
          'Written scope, module list and phase plan',
        ],
        image: '/images/services/custom-software/01-discovery.webp',
      },
      {
        title: 'System Architecture',
        desc: 'Data model, roles and integrations decided before development — getting this wrong makes change **expensive later**.',
        points: [
          'Schema built for the reports you will want',
          'Integration and data migration plan agreed up front',
        ],
        image: '/images/services/custom-software/02-architecture.webp',
      },
      {
        title: 'Core CRM Build',
        desc: 'First working module: lead capture, pipeline, follow-up, live while the rest is **still being built**.',
        points: [
          'Enquiry capture from website, phone and WhatsApp',
          'Follow-up reminders with full customer history',
        ],
        image: '/images/services/custom-software/03-crm.webp',
      },
      {
        title: 'Automation & Rules',
        desc: 'Invoices, reminders, approvals, stock alerts and scheduled reports run on their own, **without needing a person**.',
        points: [
          'Automated invoices, receipts and payment reminders',
          'Approval routing with a complete audit trail',
        ],
        image: '/images/services/custom-software/04-automation.webp',
      },
      {
        title: 'Dashboards & Reporting',
        desc: 'Live numbers by role: no exports, no month-end wait, the answer is **already on the screen**.',
        points: [
          'Role-based dashboards for each department',
          'Sales, receivables, stock and staff performance views',
        ],
        image: '/images/services/custom-software/05-dashboards.webp',
      },
      {
        title: 'Migration & Handover',
        desc: 'Data cleaned and migrated, staff trained on their own screens, and you finish **owning the system**.',
        points: [
          'Data migration from spreadsheets and legacy software',
          'Source code, database and hosting handed over',
        ],
        image: '/images/services/custom-software/06-handover.webp',
      },
    ],

    useCases: [
      {
        title: 'Sales & CRM',
        desc: 'Track every enquiry from first contact to closed deal, with automated follow-ups so nothing goes cold.',
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
        desc: 'A secure client login to check order status, download invoices and raise requests without calling you.',
      },
      {
        title: 'Reporting & Analytics',
        desc: 'Management dashboards that answer real questions instantly instead of waiting for a month-end file.',
      },
    ],

    /* Plain list kept for the home page and structured data. */
    tech: [
      'React', 'Node.js', 'Python', 'PostgreSQL', 'MySQL', 'Supabase',
      'REST APIs', 'Next.js', 'Docker', 'AWS', 'Cloud Hosting',
    ],

    techStack: [
      {
        name: 'React',
        role: 'Application interface',
        logo: '/images/tech/react.webp',
        points: [
          'Tables and forms stay quick at thousands of rows',
          'One component set reused across modules, so screens match',
        ],
      },
      {
        name: 'Node.js',
        role: 'Application server',
        logo: '/images/tech/nodejs.webp',
        points: [
          'Runs business rules, permissions and scheduled jobs',
          'Live integrations with WhatsApp, payment gateways and existing software',
        ],
      },
      {
        name: 'Python',
        role: 'Data & automation',
        logo: '/images/tech/python.webp',
        points: [
          'Cleans and imports years of messy spreadsheet data',
          'Runs reconciliation, bulk document generation and heavy reporting',
        ],
      },
      {
        name: 'PostgreSQL',
        role: 'Primary database',
        logo: '/images/tech/postgresql.webp',
        points: [
          'Default when records relate — orders, stock, ledgers, approvals',
          'Transaction safety, so half-finished entries never corrupt closing numbers',
        ],
      },
      {
        name: 'MySQL',
        role: 'Database alternative',
        logo: '/images/tech/mysql.webp',
        points: [
          'Chosen when your systems or hosting already run it',
          'Migration stays simple, with no forced platform change',
        ],
      },
      {
        name: 'Supabase',
        role: 'Managed backend',
        logo: '/images/tech/supabase.webp',
        points: [
          'Auth, storage and database without a server to maintain',
          'Postgres underneath, so data moves out cleanly later',
        ],
      },
      {
        name: 'REST APIs',
        role: 'System integration',
        logo: '/images/tech/restapis.webp',
        points: [
          'Connects Tally, WhatsApp Business, payment gateways and your website',
          'Documented endpoints, so any future developer can extend it',
        ],
      },
      {
        name: 'Next.js',
        role: 'Customer portals',
        logo: '/images/tech/nextjs.webp',
        points: [
          'For customer and vendor portals outside the internal system',
          'Server rendering keeps public pages fast and indexable',
        ],
      },
      {
        name: 'Docker',
        role: 'Deployment consistency',
        logo: '/images/tech/docker.webp',
        points: [
          'Same behaviour on our machines, test server and yours',
          'Changing hosting provider is configuration, not a rebuild',
        ],
      },
      {
        name: 'AWS',
        role: 'Cloud infrastructure',
        logo: '/images/tech/aws.webp',
        points: [
          'Deployed in your AWS account: your bill, your data',
          'Automated backups and snapshots, restore-tested before go-live',
        ],
      },
      {
        name: 'Cloud Hosting',
        role: 'Hosting & backups',
        logo: '/images/tech/cloudhosting.webp',
        points: [
          'Indian or regional servers keep latency and cost down',
          'Monitoring, SSL and scheduled backups configured at setup',
        ],
      },
    ],

    local: {
      heading: 'Built in North Gujarat, running in businesses across India',
      body:
        'Based in Visnagar, building for businesses in Ahmedabad, Mehsana, North Gujarat and the rest of India. Discovery works best **in your office, watching the work**, and the fortnight after go-live is easier when someone answers at eight in the morning.',
      points: [
        'Discovery done on site, where the process actually happens',
        'You talk to the people writing the code',
        'Written scope and fixed pricing before each phase',
        'Repository, database and hosting accounts registered in your name',
      ],
      stat: { value: 'Visnagar', label: 'Based in North Gujarat, building for clients nationwide' },
    },

    faqNote:
      'Custom software is a heavier decision than a website. If you should **not** build this year, that is what you will hear.',

    faqs: [
      {
        q: 'What is custom software development?',
        a: 'Software built for one business instead of sold to thousands — your stage names, your approval rules, your GST formats, the exception you make for one large customer every month. A ready-made product handles the common eighty per cent well and leaves the rest to people. Custom becomes worth building when that remaining twenty per cent is where your hours, errors and margin quietly go.',
      },
      {
        q: 'Why build a custom CRM instead of buying a ready-made one?',
        a: 'Buy ready-made if your process looks like everybody else’s: few stages, one team, standard reports; live next week, far cheaper. Custom pays when you rent per user for features nobody opens, your process needs three fields it will not add, or enquiry data only means something beside inventory and billing. Past fifteen to twenty users, three years of per-seat fees often exceeds a focused build.',
      },
      {
        q: 'How much does custom software cost in India?',
        a: 'Any figure quoted before discovery is a guess. One focused module — CRM, job-card system, inventory tool — is measured in lakhs, not tens of lakhs. Multi-department, covering sales, stock and accounts, is several times that. We price in phases: fund one module, check it saved the hours we claimed, then commit. If a ₹3,000-a-month subscription solves it for another year, we will say so.',
      },
      {
        q: 'How long does a custom software project take?',
        a: 'Discovery is one to two weeks. A focused first module is typically six to twelve weeks to production use, and the last two of those are testing and data migration. Larger multi-module systems run several months, in phases that each work alone. Anyone quoting a full ERP in six weeks is describing a demo, not a system your accounts team will trust at month end.',
      },
      {
        q: 'Can it integrate with the tools we already use?',
        a: 'Usually, yes. We connect WhatsApp Business, Razorpay and other payment gateways, Google Workspace, Tally, Shopify and WooCommerce regularly. Some Indian business software exposes no real API, so integration becomes scheduled import and export, not live sync — workable, but a file exchange. Some integrations carry platform charges, WhatsApp being the obvious example. Both get checked during discovery, so costs are known before you approve scope.',
      },
      {
        q: 'Who owns the software and the data?',
        a: 'You do, in writing. Source code lives in a repository in your name, the database sits in a hosting account you control, and credentials are handed to you at handover. There is no per-user licence and nothing preventing another developer from working on the system later. We ask only that you keep the documentation, because that makes the system maintainable by anyone.',
      },
      {
        q: 'What happens if we stop working with you?',
        a: 'The system keeps running, which is the point of putting code, database and hosting in your name from day one. At the close of any engagement you receive the current source, a schema document, environment details and deployment steps, so another developer can take over without reverse-engineering our decisions. We would rather keep a client because the work is good than because leaving is painful.',
      },
      {
        q: 'Is our business data secure?',
        a: 'Role-based access, encrypted connections, hashed passwords, audit logs on the records that matter, and automated backups we restore-test before go-live — an untested backup is not a backup. If your data is sensitive, or a client contract demands it, we deploy inside your own cloud account so nothing sits with us. No system is unbreakable, but one staff member’s mistake cannot expose everything.',
      },
      {
        q: 'When should we not build custom software?',
        a: 'If your process is standard and a subscription does it, buy it — accounting, payroll and email marketing are almost always a mistake to build. If nobody follows the process, software just makes the mess faster. If the workflow still changes monthly, wait — you would be building a moving target. Custom fits a settled process, specific to how you win, and expensive by hand.',
      },
    ],

    related: ['web-dev', 'digital-presence', 'branding'],
  },

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

    /* ── Imagery ──────────────────────────────────────────
       Every slot is a real file path. Replacing the artwork is
       dropping a new .webp over the same filename — no code
       change, no import to update, nothing to rebuild by hand.
       See docs/image-brief.md for the prompt behind each one.
    ───────────────────────────────────────────────────── */
    media: {
      hero: '/images/services/branding/hero.webp',
      problem: '/images/services/branding/problem.webp',
      approach: '/images/services/branding/approach.webp',
      local: '/images/services/branding/local.webp',
      faq: '/images/services/branding/faq.webp',
    },

    /* ── Page-level content ── */
    metaTitle: 'Branding & Logo Design Agency in Gujarat — Manhar Creatives',
    metaDescription:
      'Brand identity, logo design and brand guidelines for businesses across Gujarat. One mark, one palette, and rules that keep every future design consistent.',
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

    hero: {
      title: 'Brand identity and logo design',
      accent: 'so the quality shows before you say a word',
      subtitle:
        'People meet your business before they meet you — a board, a bill, a forwarded screenshot. We build the identity behind them: **one mark, one palette, rules that hold**.',
    },

    heroStats: [
      { value: '3–5', label: 'Weeks from discovery to handover' },
      { value: '30+', label: 'Logo files across print and digital formats' },
      { value: '7–10', label: 'Years before a built identity needs revisiting' },
    ],

    problem: {
      heading: 'You keep losing work to businesses that are worse at the job',
      body: [
        'The logo was a rush job years ago — a JPG on WhatsApp, stretched onto banners since. The competitor two streets away does worse work, but his board, bill book and van agree, so **customers who cannot judge the work judge what they see**.',
      ],
      points: [
        'Only a **JPG** — no vector, no source file',
        'Board, bill book and Instagram show **three different colours**',
        'Every new design starts from zero — **no rules written down**',
        'The printer redraws the mark, so **two versions circulate**',
        'Nothing says what you do better — **you look interchangeable**',
      ],
    },

    solution: {
      heading: 'A logo is a signature. The identity is the handwriting behind it.',
      body: [
        'Work begins with three questions: who you lose deals to, what a customer believes in four seconds, and the gap between them. The system — mark, palette, type, written rules — is handed over with sources, so **you never negotiate for an editable version of your logo**.',
      ],
      pillars: [
        {
          title: 'Positioned, then drawn',
          desc: 'Who you compete against, and what a customer must believe in four seconds — settled before anything is drawn.',
        },
        {
          title: 'Built for the hard applications',
          desc: 'Tested at favicon size, in one colour, embroidered on a shirt and stretched across a hoarding.',
        },
        {
          title: 'Rules that outlast us',
          desc: 'Written guidelines and organised files, so the next designer or sign vendor gets it right without calling us.',
        },
      ],
      quote:
        'We design, we build, you grow — and with identity, growth means charging what the work is actually worth.',
    },

    deliverables: [
      {
        title: 'Brand Discovery',
        desc: 'Your market, the three competitors you genuinely lose to, and **what people assume before you speak**.',
        points: [
          'Audit of every existing asset in circulation',
          'Written creative direction agreed before design begins',
        ],
        image: '/images/services/branding/01-discovery.webp',
      },
      {
        title: 'Logo System',
        desc: 'One primary mark plus horizontal, stacked, monogram and single-colour versions — **vector from the first line**.',
        points: [
          'Primary mark with horizontal and stacked lockups',
          'Black, white and single-colour variants for print',
        ],
        image: '/images/services/branding/02-logo.webp',
      },
      {
        title: 'Colour & Type',
        desc: 'The palette and typefaces that carry the brand **when the logo is nowhere on screen**.',
        points: [
          'HEX, RGB, CMYK and Pantone for every colour',
          'Display and body typefaces with licensing checked',
        ],
        image: '/images/services/branding/03-colour-type.webp',
      },
      {
        title: 'Brand Guidelines',
        desc: 'Minimum sizes, clear space, usage rules — written so **a printer can follow it without ringing anyone**.',
        points: [
          'Do and do-not examples from real misuse',
          'Colour, type and imagery direction in one PDF',
        ],
        image: '/images/services/branding/04-guidelines.webp',
      },
      {
        title: 'Brand Applications',
        desc: 'Visiting card, letterhead, bill format, signage, vehicle branding and social profiles — designed as **one set**.',
        points: [
          'Visiting card, letterhead and invoice format',
          'Signage, standee and vehicle branding artwork',
        ],
        image: '/images/services/branding/05-applications.webp',
      },
      {
        title: 'Files & Handover',
        desc: 'Print, web and office formats plus editable sources — **yours outright, no retainer needed to open them**.',
        points: [
          'AI, EPS, SVG, PDF, PNG and JPG variants',
          'Recorded walkthrough of the guidelines and files',
        ],
        image: '/images/services/branding/06-handover.webp',
      },
    ],

    /* Plain list kept for the home page and structured data. */
    tech: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma', 'InDesign'],

    techStack: [
      {
        name: 'Adobe Illustrator',
        role: 'Vector mark drawing',
        logo: '/images/tech/adobeillustrator.webp',
        points: [
          'Vector curves that scale from favicon to hoarding',
          'Editable .ai source handed to you, not withheld',
        ],
      },
      {
        name: 'Adobe Photoshop',
        role: 'Imagery and mockups',
        logo: '/images/tech/adobephotoshop.webp',
        points: [
          'Photo treatment keeping brand imagery consistent across the set',
          'Realistic signage, card and packaging mockups approved before printing',
        ],
      },
      {
        name: 'Figma',
        role: 'Digital application',
        logo: '/images/tech/figma.webp',
        points: [
          'Identity tested live as buttons, headers and mobile screens',
          'Shared review links instead of trading screenshots',
        ],
      },
      {
        name: 'InDesign',
        role: 'Guidelines and layout',
        logo: '/images/tech/indesign.webp',
        points: [
          'Guidelines and multi-page collateral built on a typographic grid',
          'Press-ready PDFs with bleed, crop marks and CMYK handled',
        ],
      },
    ],

    local: {
      heading: 'Built in Visnagar, applied wherever you trade',
      body:
        'Based in Visnagar, working across Ahmedabad, Mehsana, North Gujarat and the rest of India. Proximity earns its keep at the **printing and fabrication stage** — the colour proof, the sign vendor, the sample that comes back wrong.',
      points: [
        'Artwork prepared to your printer and sign vendor specifications',
        'Bilingual lockups for Gujarati and English',
        'You talk to the designers, not an account manager',
        'Source files, font licensing notes and full ownership',
      ],
      stat: { value: 'Visnagar', label: 'Based in North Gujarat, working nationwide' },
    },

    faqNote:
      'Branding is the easiest place to spend money on something that changes nothing. Start with **whether you should be doing this now**.',

    faqs: [
      {
        q: 'What is included in a brand identity project?',
        a: 'Discovery, a logo system, colour and type, a written guidelines document, application designs and full file handover. That means one primary mark plus horizontal, stacked, monogram and single-colour versions; colours specified separately for screen, print and fabric; typefaces with licensing checked; and the visiting card, letterhead, bill format and social profiles. Scope is agreed in writing before we start.',
      },
      {
        q: 'How is this different from just buying a logo?',
        a: 'A logo is one file. An identity is the decisions that keep every future file consistent — colour, typeface, clear space, one-colour print. Buy only a logo and within eight months three versions are in circulation. If you are six months old with no signage, collateral or staff, a well-drawn mark and a two-page rules sheet may be enough, and we will say so.',
      },
      {
        q: 'Do you rebrand existing businesses?',
        a: 'Yes. First an audit of what you already own — recognition, a colour people associate with you. That is years of spend, so the result is usually evolution rather than replacement: the equity stays, the execution gets fixed. A clean break is right only when the identity works against you — wrong industry signals, a legal conflict, or a name that no longer describes the business.',
      },
      {
        q: 'How many logo concepts will I see?',
        a: 'Two or three, each a strategic argument, not a decoration. Studios presenting fifteen options are usually presenting one they believe in and fourteen to make it look chosen, which moves the decision from strategy to taste. Each concept is shown in context: on a board, on a card, on a phone, in one colour. Then two rounds of refinement on the direction you pick.',
      },
      {
        q: 'What file formats do I receive?',
        a: 'Vector source in AI and EPS, SVG for web, layered PDF, plus PNG with transparency and JPG at several sizes. Each exists for every variant — primary, horizontal, stacked, monogram — in full colour, all black, all white and single colour. Folders are labelled by use rather than format. Editable sources are included; some studios hold those back, we hand them over.',
      },
      {
        q: 'Do I own the copyright to the logo?',
        a: 'Yes. On final payment, ownership of the final artwork transfers to you in writing — use it, modify it, trademark it, hand it to any designer. Typefaces are the exception: licensed, never owned, so we specify fonts you can legally use and flag which need buying for signage or web embedding. We also check obvious trademark conflicts in your category, but registrability is a lawyer job.',
      },
      {
        q: 'What if I do not like any of the concepts?',
        a: 'Usually that means discovery missed something, not that the drawing is bad. We go back to the brief and you get a further round of directions at no extra cost. If a second presentation lands nowhere, we refund the balance of the unstarted stages rather than push through a mark you will resent. We will say if the problem is four opinions and no decision-maker.',
      },
      {
        q: 'Is a rebrand the right spend for my business right now?',
        a: 'Often it is not. Ask: do people not know you, or know you and choose somebody else? If nobody knows you exist, the money works harder in a website, a Google Business Profile and photographs of your work. If enquiries die at the quotation stage, the identity is the problem. Spending ₹1.5 lakh on collateral while your website loses enquiries weekly is the wrong order.',
      },
    ],

    related: ['print', 'social', 'web-dev'],
  },

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

    /* ── Imagery ──────────────────────────────────────────
       Every slot is a real file path. Replacing the artwork is
       dropping a new .webp over the same filename — no code
       change, no import to update, nothing to rebuild by hand.
       See docs/image-brief.md for the prompt behind each one.
    ───────────────────────────────────────────────────── */
    media: {
      hero: '/images/services/social/hero.webp',
      problem: '/images/services/social/problem.webp',
      approach: '/images/services/social/approach.webp',
      local: '/images/services/social/local.webp',
      faq: '/images/services/social/faq.webp',
    },

    /* ── Page-level content ── */
    metaTitle: 'Social Media Design & Content Creatives in Gujarat — Manhar Creatives',
    metaDescription:
      'Social media design for Instagram, Facebook and LinkedIn — branded post templates and reusable creative systems that make your feed look like one company.',
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

    hero: {
      title: 'Social media design and post templates',
      accent: 'so the feed finally looks like one company',
      subtitle:
        'A feed stitched from five templates tells customers how seriously you take your business. We build direction, templates and creatives — **design only, not posting, captions or ads**.',
    },

    heroStats: [
      { value: '2–3', label: 'Weeks from direction to first batch of creatives' },
      { value: '12+', label: 'Editable templates in a standard kit' },
      { value: '6', label: 'Formats covered across feed, story and reel' },
    ],

    problem: {
      heading: 'You post every week, and it has never once brought you a customer',
      body: [
        'Look at your last nine posts the way a stranger does: a festival greeting in one font, an offer in another, a quote card from a free app. They read like **five different businesses sharing one account**, and buyers read the grid, not the caption.',
      ],
      points: [
        'Nine recent posts, **five different fonts**, five different businesses',
        'Made in Canva by **whoever was free**, with no rules',
        'Likes from friends and staff, **not one traceable enquiry**',
        'Text sized for a laptop, **unreadable at thumb speed**',
        'A competitor **worse at the actual work** looks more professional',
      ],
    },

    solution: {
      heading: 'Recognition is not built by posting more. It is built by posting the same way.',
      body: [
        'A short set of decisions made once — headline position, colour roles, photo crop — then applied without re-arguing weekly. A post takes twenty minutes instead of an afternoon. We design the system and creatives; **we do not run accounts, write captions or buy ads**.',
      ],
      pillars: [
        {
          title: 'Direction before decoration',
          desc: 'Grid rhythm, type scale, colour roles and photo treatment agreed on paper before a single post is designed.',
        },
        {
          title: 'Templates, not one-offs',
          desc: 'Every layout is an editable template with the rules locked in, so the next fifty posts stay consistent.',
        },
        {
          title: 'Judged at phone size',
          desc: 'Checked the way it will be seen — scrolled past on a mid-range Android, not a designer’s monitor.',
        },
      ],
      quote:
        'We design, we build, you grow — on social, growth starts when a stranger recognises your post before the name.',
    },

    deliverables: [
      {
        title: 'Visual Direction',
        desc: 'How the feed behaves as a whole, so it never becomes **a folder of unrelated pictures**.',
        points: [
          'Feed grid and format plan, agreed upfront',
          'Colour roles for offers, tips and festivals',
        ],
        image: '/images/services/social/01-direction.webp',
      },
      {
        title: 'Template System',
        desc: 'Editable templates for the post types you actually publish, with **locked layouts and open text fields**.',
        points: [
          'Twelve+ templates: announcement, offer, tip, testimonial, product',
          'Built in Figma or Canva, whichever you use',
        ],
        image: '/images/services/social/02-templates.webp',
      },
      {
        title: 'Post & Carousel Design',
        desc: 'A finished launch batch, with carousels built as **a sequence with a reason to swipe**.',
        points: [
          'Feed posts in square and portrait',
          'Correct platform dimensions, source files included',
        ],
        image: '/images/services/social/03-posts.webp',
      },
      {
        title: 'Story & Reel Covers',
        desc: 'Story frames and a reel cover set, so the profile stays **readable as a wall**.',
        points: [
          'Story templates for offers, polls and reposts',
          'Safe areas checked against platform icons',
        ],
        image: '/images/services/social/04-stories.webp',
      },
      {
        title: 'Profile & Highlights',
        desc: 'Profile image, highlight covers and bio structure designed together — **the shopfront of the account**.',
        points: [
          'Profile image tested at circular thumbnail size',
          'Highlight cover set with clear labelling',
        ],
        image: '/images/services/social/05-profile.webp',
      },
      {
        title: 'Handover Kit',
        desc: 'Templates, fonts, exports and a usage sheet — **yours to keep, editable without us**.',
        points: [
          'Editable Figma or Canva files, your account',
          'Recorded walkthrough of editing and exporting',
        ],
        image: '/images/services/social/06-handover.webp',
      },
    ],

    /* Plain list kept for the home page and structured data. */
    tech: ['Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'After Effects'],

    techStack: [
      {
        name: 'Figma',
        role: 'Template building',
        logo: '/images/tech/figma.webp',
        points: [
          'Template system assembled with components and locked grids',
          'Exports feed, story and reel sizes in one pass',
        ],
      },
      {
        name: 'Adobe Photoshop',
        role: 'Image work',
        logo: '/images/tech/adobephotoshop.webp',
        points: [
          'Cleans up photos you already have, no shoot needed',
          'One colour and crop treatment across the whole batch',
        ],
      },
      {
        name: 'Adobe Illustrator',
        role: 'Graphics and icons',
        logo: '/images/tech/adobeillustrator.webp',
        points: [
          'Icons, badges and offer devices that look yours',
          'Vector artwork moves from story frame to printed standee',
        ],
      },
      {
        name: 'After Effects',
        role: 'Motion posts',
        logo: '/images/tech/aftereffects.webp',
        points: [
          'Animated versions of the static templates for reels',
          'Exported light enough to upload on shop wifi',
        ],
      },
    ],

    local: {
      heading: 'Designed in Visnagar, posted from wherever you trade',
      body:
        'We are based in Visnagar and design for businesses in Ahmedabad, Mehsana and across India. Locally it earns its keep two ways — **the post has to read in Gujarati as well as English**, and festival dates that actually matter.',
      points: [
        'Bilingual layouts that work in Gujarati and English',
        'Festival creatives planned around dates your customers keep',
        'You talk to the designer, not an account manager',
        'Templates and source files transferred to your account',
      ],
      stat: { value: 'Visnagar', label: 'Based in North Gujarat, designing for clients nationwide' },
    },

    faqNote:
      'These answers include the parts most studios leave out — including **when this is not the thing to spend on yet**.',

    faqs: [
      {
        q: 'Do you also manage the social media accounts?',
        a: 'No. We design the system and creatives; we do not post, write captions, reply to comments or run ads. That needs somebody inside your business who can answer a price question at nine at night — a staff member, trained intern or social manager. You get templates, a usage sheet and a content structure. **Ask us what a fair rate is; we take no cut.**',
      },
      {
        q: 'Can you match our existing brand?',
        a: 'Yes. Where guidelines exist we work inside them — palette, typefaces, logo lockups, clear space. Where they do not, we define the minimum: two or three colour roles, a heading and body typeface, a logo placement rule, a grid. That is not a full identity project and is not priced like one. **If your signboard, bill book and website already disagree, fix the identity first.**',
      },
      {
        q: 'What formats do you deliver?',
        a: 'Square and portrait feed posts, carousels, story frames, reel covers, profile images and highlight covers — exported at correct dimensions for Instagram, Facebook and LinkedIn, not one size stretched across three. Editable Figma or Canva files included. Text sits inside safe areas, clear of the username, caption fold and story reply box. **Motion versions ship as MP4, light enough to upload on a shop connection.**',
      },
      {
        q: 'Can we edit the templates ourselves afterwards?',
        a: 'Yes. Layouts, grids and logo positions are locked; text, photos and prices are open. Someone with no design background can change a price, drop in a photo and export in ten minutes. Files sit in your own Figma or Canva account, not ours, with a recorded walkthrough and one-page sheet. **Templates cover routine posting; a campaign with a genuinely new idea needs a fresh set.**',
      },
      {
        q: 'How many designs come in one batch?',
        a: 'A standard kit is twelve or more templates plus a launch batch of finished posts, the split written into scope upfront. Announcement, offer, tip, testimonial, product or menu highlight and a festival frame cover most of a year. Ongoing monthly batches from the same system cost less. **If your team can post three good creatives a week from the templates, we scope the system only.**',
      },
      {
        q: 'What do you need from us to start?',
        a: 'Your logo in vector; if you lack one, we will say whether it survives at social sizes. Real photographs of your work, premises or team, even on a phone — stock imagery looks like every other account. A list of what you sell and the next step you want. One person who can approve: **three opinions and no decision-maker turns two weeks into two months.**',
      },
      {
        q: 'Do we actually need social media design yet?',
        a: 'Sometimes not. If you cannot say in one sentence what you sell and why someone should choose you, fix the offer first. A Google Business Profile with real photographs and reviews brings more enquiries this quarter. If your website is losing enquiries, ₹25,000 does more work there. **Social design pays when the offer is clear, the work is worth showing and somebody posts consistently.**',
      },
    ],

    related: ['branding', 'print', 'digital-presence'],
  },

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

    /* ── Imagery ──────────────────────────────────────────
       Every slot is a real file path. Replacing the artwork is
       dropping a new .webp over the same filename — no code
       change, no import to update, nothing to rebuild by hand.
       See docs/image-brief.md for the prompt behind each one.
    ───────────────────────────────────────────────────── */
    media: {
      hero: '/images/services/print/hero.webp',
      problem: '/images/services/print/problem.webp',
      approach: '/images/services/print/approach.webp',
      local: '/images/services/print/local.webp',
      faq: '/images/services/print/faq.webp',
    },

    /* ── Page-level content ── */
    metaTitle: 'Print Design & Offline Branding in Gujarat — Manhar Creatives',
    metaDescription:
      'Print design and offline branding in Gujarat: cards, brochures, signage and packaging, with press-ready artwork that prints exactly as it was approved.',
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

    hero: {
      title: 'Print design and offline branding',
      accent: 'where the buying decision actually happens',
      subtitle:
        'Print is the part of your brand a person **physically holds**. One wrong colour profile, one bad bleed, and you have paid for the mistake five thousand times.',
    },

    heroStats: [
      { value: '1–3', label: 'Weeks from brief to press-ready artwork' },
      { value: '300 DPI', label: 'CMYK minimum on every file that goes to press' },
      { value: '3 mm', label: 'Bleed on all four edges, with crop marks' },
    ],

    problem: {
      heading: 'The card in their pocket is undoing what your website did',
      body: [
        'A card is held for a second, then put away. Thin stock, a logo pulled wide, and in a drawer beside a competitor’s it loses the comparison in silence. Signage is worse: it stays up six years, and the reprint gets **billed to you**.',
      ],
      points: [
        'A card that feels **flimsy the moment it is held**',
        'Signage laid out by the **printer’s operator in ten minutes**',
        'A logo **stretched out of shape** on a two-year banner',
        'Colours that came back from the press **entirely different**',
        'A rejected file, so you pay **twice for one run**',
      ],
    },

    solution: {
      heading: 'Print is specified before it is designed — that order is the whole job',
      body: [
        'Trim size, paper weight and finish, the press, colour mode, resolution, bleed and quantity are settled before layout begins. Skip that and you are **designing for a screen and hoping the press agrees** — then ordering five thousand flyers to hand out four hundred.',
      ],
      pillars: [
        {
          title: 'Specified, then designed',
          desc: 'Trim size, paper, finish, press, colour mode and quantity agreed before layout begins, not guessed afterwards.',
        },
        {
          title: 'Built for the machine',
          desc: 'CMYK, bleed on all four edges, crop marks, outlined type, correct resolution, dielines matched to the fabricator’s template.',
        },
        {
          title: 'One brand on every surface',
          desc: 'Card, board, brochure, label and website on the same colour values, typefaces and spacing.',
        },
      ],
      quote:
        'We design, we build, you grow: growth starts when the thing in a customer’s hand stops arguing with your price.',
    },

    deliverables: [
      {
        title: 'Stationery System',
        desc: 'Visiting cards, letterheads, envelopes, bill books and invoice formats designed as **one coordinated set**.',
        points: [
          'Visiting card with paper weight and finish specified',
          'Bill book and invoice format your accounts use',
        ],
        image: '/images/services/print/01-stationery.webp',
      },
      {
        title: 'Brochures & Profiles',
        desc: 'Company profiles, catalogues and multi-page brochures built on a **proper typographic grid**.',
        points: [
          'Page flow planned around the buyer’s questions',
          'Page count and imposition checked against the binding',
        ],
        image: '/images/services/print/02-brochures.webp',
      },
      {
        title: 'Signage & Outdoor',
        desc: 'Storefront boards, flex banners, standees and hoardings drawn for **the distance they will be read from**.',
        points: [
          'Supplied in the format your flex vendor runs',
          'Colour specified separately for vinyl, backlit and painted',
        ],
        image: '/images/services/print/03-signage.webp',
      },
      {
        title: 'Packaging & Labels',
        desc: 'Cartons, pouches, sleeves and labels built to the **converter’s own dieline**, statutory panels included.',
        points: [
          'Ingredient, weight, MRP and licence panels placed correctly',
          'Physical mockup approved before any plate is made',
        ],
        image: '/images/services/print/04-packaging.webp',
      },
      {
        title: 'Print-Ready Artwork',
        desc: 'Files packaged so **a printer opens them and goes straight to plate**, nothing to interpret.',
        points: [
          'PDF/X in CMYK, 3 mm bleed, crop marks',
          'Packaged source file, links and a specification sheet',
        ],
        image: '/images/services/print/05-artwork.webp',
      },
      {
        title: 'Press Coordination',
        desc: 'We deal with the printer, or you order yourself — often **cheaper and completely fine**.',
        points: [
          'Quotes compared on stock and finish, not rate',
          'Physical proof signed off before the full run',
        ],
        image: '/images/services/print/06-press.webp',
      },
    ],

    /* Plain list kept for the home page and structured data. */
    tech: ['Adobe InDesign', 'Adobe Illustrator', 'Adobe Photoshop', 'CorelDRAW'],

    techStack: [
      {
        name: 'Adobe InDesign',
        role: 'Multi-page layout',
        logo: '/images/tech/adobeindesign.webp',
        points: [
          'Brochures and catalogues built on a master grid',
          'Exports PDF/X with bleed, crop marks and CMYK',
        ],
      },
      {
        name: 'Adobe Illustrator',
        role: 'Vector and dielines',
        logo: '/images/tech/adobeillustrator.webp',
        points: [
          'Logos and signage drawn as vector, so boards scale',
          'Dielines built to the converter’s template, separate layer',
        ],
      },
      {
        name: 'Adobe Photoshop',
        role: 'Image preparation',
        logo: '/images/tech/adobephotoshop.webp',
        points: [
          'Photographs corrected, resized and sharpened for CMYK, not screen',
          'Realistic mockups approved before money reaches the press',
        ],
      },
      {
        name: 'CorelDRAW',
        role: 'Local press files',
        logo: '/images/tech/coreldraw.webp',
        points: [
          'Gujarat sign shops run Corel, so we supply CDR',
          'Removes the redraw-by-eye step that changes your logo',
        ],
      },
    ],

    local: {
      heading: 'Near the press, which is where print is won or lost',
      body:
        'Based in Visnagar, working across Ahmedabad, Mehsana and North Gujarat. Nearby, we choose stock by hand, check the proof under real light and stand at the machine for **the first sheets**. Further away, files and a written specification go out.',
      points: [
        'Paper, board and finish selected by hand',
        'Proof and press checks in person where colour matters',
        'Artwork in the formats local printers run, CorelDRAW included',
        'Bilingual Gujarati and English layouts for cards, boards, labels',
      ],
      stat: { value: 'Visnagar', label: 'Based in North Gujarat, printing coordinated nationwide' },
    },

    faqNote:
      'Print is the one service where the honest answer usually saves you money, so several of these talk you **out of spending**.',

    faqs: [
      {
        q: 'Do you handle the actual printing?',
        a: 'We design and supply production-ready artwork; printing we coordinate. We own no press, and a studio adding a margin on a printer you could ring directly is charging for a phone call. Near Visnagar, Mehsana and Ahmedabad we compare quotes on stock and finish, check the proof and attend the press when colour must be exact. Elsewhere, take the files and order direct, usually cheaper.',
      },
      {
        q: 'What files will I receive?',
        a: 'PDF/X in CMYK with 3 mm bleed and crop marks, plus the packaged source: INDD or AI with links and fonts, or CDR for Corel vendors. Images at 300 DPI final size, type outlined or embedded, dielines on their own layer. One-page specification sheet: trim size, paper stock, weight, finish, colour mode, ink coverage, quantity, plus low-resolution PDFs and JPGs for internal approval.',
      },
      {
        q: 'Can I take the files to my own printer?',
        a: 'Yes, better still if you already have someone reliable. Files are yours on final payment: no watermark, no locked layers, no version that only opens while you pay us. If your printer wants a different format, colour profile or a CDR, we supply it free. We will not guarantee the output of a press we have never seen; bring us in at proofing for that.',
      },
      {
        q: 'How do you make sure the printed colour matches what I approved on screen?',
        a: 'Close, never identical; anyone promising exact has not printed much. CMYK from the first file, never RGB converted late; Pantone where the budget allows a spot colour; stock accounted for, since the same ink reads duller on uncoated than coated. Packaging, signboards and profiles get a physical proof on the actual stock. A proof costs ₹500; reprinting five thousand cartons does not.',
      },
      {
        q: 'What do you need from me to start?',
        a: 'Four things. Logo in vector: AI, EPS, SVG or PDF, not a JPG; if none exists, we redraw it, or the identity becomes the first job. Final text approved by whoever can change it; corrections after plates mean reprints. Full-resolution photographs, not WhatsApp copies. For packaging, the converter’s dieline plus statutory content: ingredients, net weight, MRP, licence numbers. We lay it out; verification is yours.',
      },
      {
        q: 'Can you match my printed materials to my website?',
        a: 'Yes, the main reason to use one studio for both. One brand system: same typefaces, spacing and tone, colour converted deliberately for print rather than eyeballed. The CMYK build sits as close to your site HEX as print allows; the print typeface is the same family or a licensed companion. Printing consistent material for an undefined identity multiplies the inconsistency; spend on the identity first.',
      },
      {
        q: 'How much should I actually print?',
        a: 'Less than you are about to order. A falling per-piece rate is how storerooms fill. Work backwards from six months of distribution. Cards: 500 per person covers a year. Profiles: 50–100 digital beats 1,000 offset you will revise after ten meetings. Flyers: only what you will distribute. Spend the difference on paper — a heavier card with a decent finish adds about ₹2 a piece.',
      },
    ],

    related: ['branding', 'social', 'digital-presence'],
  },

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

    /* ── Imagery ──────────────────────────────────────────
       Every slot is a real file path. Replacing the artwork is
       dropping a new .webp over the same filename — no code
       change, no import to update, nothing to rebuild by hand.
       See docs/image-brief.md for the prompt behind each one.
    ───────────────────────────────────────────────────── */
    media: {
      hero: '/images/services/digital-presence/hero.webp',
      problem: '/images/services/digital-presence/problem.webp',
      approach: '/images/services/digital-presence/approach.webp',
      local: '/images/services/digital-presence/local.webp',
      faq: '/images/services/digital-presence/faq.webp',
    },

    /* ── Page-level content ── */
    metaTitle: 'Google Business Profile & Local SEO Setup in Gujarat — Manhar Creatives',
    metaDescription:
      'Google Business Profile setup and local SEO for Gujarat businesses, so customers searching nearby can find, verify and contact you before a competitor does.',
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

    hero: {
      title: 'Google Business Profile and local search setup',
      accent: 'because the customer is already searching',
      subtitle:
        'Someone nearby is searching your service and “near me”. They call one of three businesses Google shows, and an unclaimed, half-filled listing **is not one of them**.',
    },

    heroStats: [
      { value: '1–2', label: 'Weeks to claim and build the profile out' },
      { value: '8+', label: 'Profiles and listings made to say the same thing' },
      { value: '76%', label: 'Of nearby phone searches end in a visit within a day' },
    ],

    problem: {
      heading: 'They were looking for you specifically, and they still called somebody else',
      body: [
        'A customer half-forgets your name, searches the service instead, and sees a map. Your listing has no photos, an old phone number, wrong hours. **They do not ring to check.** They tap the one above, which filled in the fields you left blank.',
      ],
      points: [
        'A listing you have **never once logged into**',
        'Hours, phone or address **wrong on the map**',
        'No photos, so customers see **a grey Street View shot**',
        'A competitor with **eleven reviews ranking above you**',
        'Enquiries lost **before the conversation started**, never on price',
      ],
    },

    solution: {
      heading: 'The cheapest ground in local search is still sitting there unclaimed',
      body: [
        'Categories decide which searches you are eligible for. Photos are the proof, reviews the tiebreaker. **Every one is a field somebody has to complete.** This is a one-time correction, not a monthly retainer — after handover, keeping it right takes minutes a week.',
      ],
      pillars: [
        {
          title: 'Claimed, not just created',
          desc: 'Ownership verified and transferred **into your own Google account**, including recovering a listing an old agency still holds.',
        },
        {
          title: 'Every field completed',
          desc: 'Categories, services, attributes, hours and description completed deliberately — **on a map listing, the fields are the ranking signals**.',
        },
        {
          title: 'Proof over polish',
          desc: 'Real photographs of your premises, team and work, plus **a review routine you can actually keep**.',
        },
      ],
      quote:
        'We design, we build, you grow — growth here starts with being the business that appears when someone is already looking.',
    },

    deliverables: [
      {
        title: 'Audit & Claim',
        desc: 'We find every listing already under your name and get **ownership into your account**, not ours.',
        points: [
          'Ownership recovered where somebody else holds the profile',
          'Verification handled and tracked through to approval',
        ],
        image: '/images/services/digital-presence/01-audit.webp',
      },
      {
        title: 'Profile Build-Out',
        desc: '**Categories chosen from what customers type**, not from what the trade calls it.',
        points: [
          'Services, description, attributes and service areas entered',
          'Regular, festival and special hours set correctly',
        ],
        image: '/images/services/digital-presence/02-profile.webp',
      },
      {
        title: 'Photos & Proof',
        desc: 'We curate what you have — and say when **a half-day of real photography** does more.',
        points: [
          'Logo, cover, exterior, interior, team and work photos',
          'Phone photographs cleaned up, never replaced with stock',
        ],
        image: '/images/services/digital-presence/03-photos.webp',
      },
      {
        title: 'Contact Channels',
        desc: 'Domain email and WhatsApp Business configured so an enquiry **lands somewhere a person will see it**.',
        points: [
          'Business email on your own domain, not Gmail',
          'WhatsApp Business profile, catalogue, greeting and quick replies',
        ],
        image: '/images/services/digital-presence/04-channels.webp',
      },
      {
        title: 'Review System',
        desc: 'A routine, not a campaign — because **an answered review beats a five-star one**.',
        points: [
          'Review link and printable QR for the counter',
          'Response templates for positive, mixed and angry reviews',
        ],
        image: '/images/services/digital-presence/05-reviews.webp',
      },
      {
        title: 'Listings & Handover',
        desc: 'Name, address and phone identical everywhere, tracking connected, and **the keys handed to you**.',
        points: [
          'NAP corrected across directories, social profiles and website',
          'Ownership transferred, logins handed over, walkthrough recorded',
        ],
        image: '/images/services/digital-presence/06-handover.webp',
      },
    ],

    /* Plain list kept for the home page and structured data. */
    tech: ['Google Business Profile', 'Google Search Console', 'Google Analytics 4', 'Google Tag Manager', 'WhatsApp Business'],

    techStack: [
      {
        name: 'Google Business Profile',
        role: 'Map presence',
        logo: '/images/tech/googlebusinessprofile.webp',
        points: [
          'Where claiming, verification, categories, hours and photos are done',
          'Its call, direction and message counts show what moved',
        ],
      },
      {
        name: 'Google Search Console',
        role: 'Search visibility',
        logo: '/images/tech/googlesearchconsole.webp',
        points: [
          'Shows the real queries bringing people to your site',
          'Flags indexing and mobile problems holding the profile back',
        ],
      },
      {
        name: 'Google Analytics 4',
        role: 'Visitor data',
        logo: '/images/tech/googleanalytics4.webp',
        points: [
          'Separates traffic from the map listing from everything else',
          'Enquiry form and click-to-call marked as conversions',
        ],
      },
      {
        name: 'Google Tag Manager',
        role: 'Event tracking',
        logo: '/images/tech/googletagmanager.webp',
        points: [
          'Tracks calls, WhatsApp taps and directions without a developer',
          'Every tag in one container you own',
        ],
      },
      {
        name: 'WhatsApp Business',
        role: 'Customer contact',
        logo: '/images/tech/whatsappbusiness.webp',
        points: [
          'Catalogue, greeting and quick replies so questions answer themselves',
          'Linked everywhere, because most Indian customers message before calling',
        ],
      },
    ],

    local: {
      heading: 'Local search is the one service where being local counts',
      body:
        'Based in Visnagar, we set up profiles in Ahmedabad, Mehsana, across North Gujarat and the rest of India. **The search that matters happens in your language and your taluka** — and we see the same result pages your customers see.',
      points: [
        'Categories chosen from what customers here actually type',
        'Profiles written for English and Gujarati, including transliterated searches',
        'Hours set around festival and market closures',
        'Ownership transferred to your own Google account, never ours',
      ],
      stat: { value: 'Visnagar', label: 'Based in North Gujarat, setting up profiles nationwide' },
    },

    faqNote:
      'This service attracts exaggerated promises, so these answers say what can be controlled and **what we refuse to do for you**.',

    faqs: [
      {
        q: 'How long does Google Business Profile verification take?',
        a: 'Setup takes one to two weeks. Verification runs on Google’s timetable, and the method — video, phone, email or postcard — is assigned by Google. Video is most common: one sitting, if signage, premises, equipment and address proof are ready. Smooth cases verify in days; a rejected first attempt stretches it to two or three weeks. We submit, coach the recording, and re-file without charging again.',
      },
      {
        q: 'Will this help me rank on Google Maps?',
        a: 'It makes you eligible and removes Google’s reasons to rank you below someone else. Position is relevance, distance and prominence. Relevance — category and service accuracy — we control completely. Prominence — reviews, photos, activity, consistent details — we control most of. Distance we cannot touch, and **nobody can promise a position**: anyone guaranteeing the top of the map pack has not read Google’s guidelines.',
      },
      {
        q: 'Do I need a website for a Google Business Profile?',
        a: 'No. It works without one, and on a limited budget it is the right first spend: cheaper, faster, reaching people ready to buy. A serious buyer taps the website link to check you are real, and a linked site gives Google more to verify against. Put the next money there. If you have a site nobody visits, this is the missing half, not a redesign.',
      },
      {
        q: 'How long before we actually see results?',
        a: 'First movement two to four weeks after verification; fair judgement at three months. Some get calls within days, because they were invisible and the category was wrong. In a crowded Ahmedabad category, three hundred reviews and eight years of activity mean months, and reviews move it. We record a baseline — calls, direction requests, searches, photo views — so at ninety days you compare numbers, not impressions.',
      },
      {
        q: 'Can you get us reviews, or arrange a few to start with?',
        a: 'No. We build the system that earns them and will not buy or arrange one. Google detects bought reviews — five stars from new accounts, same week, devices nowhere near you. Outcomes run from silent filtering — you paid for nothing — to a consumer alert or suspension, weeks to undo. Review gating, asking only happy customers, breaches Google’s policy. **Twenty genuine reviews beat a hundred bought ones.**',
      },
      {
        q: 'What if our listing is already claimed by somebody else?',
        a: 'Usually an old agency, a former employee, or a personal account. Google has an ownership request: we submit from your account; the holder has seven days to respond. Ignore it and ownership transfers; refuse, and you appeal with proof — registration, utility bill, signage, GST — decided in a few weeks. **We will not create a second listing**: duplicates split reviews and ranking signals and invite suspension.',
      },
      {
        q: 'What do you need from us to start?',
        a: 'Proof of address: registration, GST, utility bill or rent agreement. The phone number and email you want listed — codes arrive there. Your exact name as on the board — keyword-stuffed versions are penalised. Opening hours, including closing days. Photographs of premises, team and work, even phone shots. What you sell, in your customers’ words. One decision-maker available for a twenty-minute video verification call.',
      },
    ],

    related: ['web-dev', 'branding', 'social'],
  },
];

/* ─── HELPERS ─────────────────────────────────────────── */
export const getServiceBySlug = (slug) => SERVICES.find((s) => s.slug === slug);
export const getServiceById = (id) => SERVICES.find((s) => s.id === id);
export const SERVICE_SLUGS = SERVICES.map((s) => s.slug);
