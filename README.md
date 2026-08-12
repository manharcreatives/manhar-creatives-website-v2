# Manhar Creatives — Website

A premium, multi-page brand experience for **Manhar Creatives**, a digital solutions & branding company based in Visnagar, Gujarat, serving clients across India and worldwide.

Vite + React 19 · Framer Motion · React Three Fiber · Lenis · React Router 7 · fully prerendered for SEO.

---

## ✨ What's on the site

**26 real, individually prerendered pages** — not a single-page scroll.

| Section | Routes |
|---|---|
| Home | `/` |
| Services | `/services` + 6 service detail pages |
| Work | `/projects` |
| Company | `/about`, `/process`, `/contact` |
| Blog | `/blog` + 8 long-form articles |
| Local SEO | `/ahmedabad`, `/mehsana`, `/visnagar` |
| Legal | `/privacy-policy`, `/terms-and-conditions` |
| 404 | custom `NotFoundPage` + static `404.html` |

### Services

1. **Website Development**
2. **Custom Software Development** — CRM, ERP modules, dashboards, business automation, API integrations
3. **Branding & Identity**
4. **Social Media Design**
5. **Print & Offline Branding**
6. **Digital Presence Setup**

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Build | Vite 8 (Rolldown) |
| Routing | React Router 7 (`BrowserRouter`) |
| Animation | Framer Motion 12 · GSAP |
| 3D | React Three Fiber / Drei |
| Scroll | Lenis |
| Data | Supabase (enquiries) + Google Apps Script (form → Sheets + email) |
| Prerender | Puppeteer (all routes → static HTML) |
| Deploy | Vercel |

---

## 📁 Project Structure

```
public/
├── images/            # All imagery — WebP only (~6 MB total)
├── sitemap.xml        # Generated from the route manifest
└── robots.txt         # Generated (includes AI/answer-engine bots)

scripts/
└── generate-sitemap.mjs   # sitemap.xml + robots.txt from src/data/site.js

src/
├── data/              # ★ Single source of truth
│   ├── site.js        # Business facts, nav, cities, ROUTES manifest
│   ├── services.js    # Full service catalogue (copy, SEO, FAQs, deliverables)
│   └── blog/          # One file per article + index.js registry
├── components/
│   ├── Seo.jsx        # Per-route head manager + JSON-LD schema builders
│   ├── PageKit.jsx    # Shared premium page primitives
│   ├── Navigation.jsx # Real page links + services mega-menu
│   └── ...
├── pages/             # One component per route
├── sections/          # Homepage sections
├── three/             # R3F components
├── utils/             # Hooks, constants, animation helpers
├── App.jsx            # Router + shell
└── index.css          # Design system (CSS custom properties)

prerender.mjs          # Renders every route to its own static HTML file
vercel.json            # Redirects, cache headers, security headers
```

### Adding content

Everything is data-driven — you rarely need to touch a component.

- **New blog article** → create `src/data/blog/<slug>.js`, import it in `src/data/blog/index.js`. Route, sitemap entry, schema, related links and blog card all appear automatically.
- **New service** → add an entry to `src/data/services.js`. Nav menu, services page, footer, detail page, city pages and sitemap all update.
- **New route type** → add it to `ROUTES` in `src/data/site.js` so the sitemap and prerenderer pick it up.

---

## 🚀 Getting Started

```bash
npm install

npm run dev        # dev server
npm run build      # vite build → sitemap → prerender all 26 routes
npm run build:fast # skip prerender (faster local checks)
npm run preview    # preview the production build
```

`npm run build` needs a Chromium download for Puppeteer. If it's missing:

```bash
npx puppeteer browsers install chrome
```

To skip prerendering entirely: `SKIP_PRERENDER=1 npm run build`

---

## 🔍 SEO

- **Per-route metadata** — every page writes its own title, description, keywords, canonical, OG/Twitter tags and hreflang via `src/components/Seo.jsx`
- **Structured data per route** — Organization, WebSite, ProfessionalService, Service, BlogPosting, FAQPage, BreadcrumbList, HowTo, ContactPage, CollectionPage
- **Prerendering** — every route is written as its own static HTML file, so crawlers get fully rendered content instead of an empty SPA shell
- **Sitemap & robots** — generated from the route manifest on every build; AI/answer-engine crawlers explicitly allowed
- **Internal linking** — services ↔ cities ↔ blog articles cross-link throughout
- **Legacy URLs** — old single-page and city/service URLs 301-redirect to their new homes (`vercel.json`)

## ⚡ Performance

- All imagery is **WebP**, capped at 1800px — total image payload reduced from ~68 MB to ~6 MB
- Route-level code splitting (`React.lazy`) — the homepage bundle stays light
- Lazy-loaded background images via `useLazyBackground`
- `content-visibility: auto` on off-screen sections
- Immutable cache headers on `/assets`, `/images`, `/videos`

---

## 📬 Contact Form

Submits to a Google Apps Script web app (writes to Google Sheets + sends an email notification) and mirrors the record into Supabase. Configure in `src/sections/ContactExperience.jsx` and `.env`:

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

---

## ⚖️ Legal pages

`/privacy-policy` and `/terms-and-conditions` are written from this project's actual data flows (contact form, Supabase, Google Analytics / Tag Manager, WhatsApp, chat widget) under Indian jurisdiction. **They are a solid starting point, not legal advice — have a lawyer review them before relying on them.**

---

## 📄 License

Private — All rights reserved. Manhar Creatives.
