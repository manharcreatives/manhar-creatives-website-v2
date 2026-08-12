/* ═══════════════════════════════════════════════════════════
   ROUTE MANIFEST (complete)

   site.js holds the core routes and localSeo.js holds the
   service × city matrix. They are merged here rather than in
   site.js so that localSeo.js can import site.js without the
   two forming an import cycle.

   Consumed by the sitemap generator and the prerenderer.
   ═══════════════════════════════════════════════════════════ */

import { ROUTES } from './site.js';
import { SERVICE_CITY_PAGES } from './localSeo.js';

export const ALL_ROUTES = [
  ...ROUTES,
  ...SERVICE_CITY_PAGES.map((p) => ({
    path: p.path,
    priority: 0.75,
    changefreq: 'monthly',
  })),
];

export default ALL_ROUTES;
