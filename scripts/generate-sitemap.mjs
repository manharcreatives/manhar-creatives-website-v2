/* ═══════════════════════════════════════════════════════════
   Generates public/sitemap.xml, dist/sitemap.xml and robots.txt
   from the single route manifest in src/data/site.js.
   Run automatically as part of `npm run build`.
   ═══════════════════════════════════════════════════════════ */

import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');

const { SITE } = await import(pathToFileURL(join(ROOT, 'src/data/site.js')));
const { ALL_ROUTES: ROUTES } = await import(pathToFileURL(join(ROOT, 'src/data/routes.js')));

const today = new Date().toISOString().slice(0, 10);

/* ─── sitemap.xml ─────────────────────────────────────── */
const urls = ROUTES.map((r) => {
  const loc = `${SITE.url}${r.path === '/' ? '/' : r.path}`;
  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    `    <lastmod>${r.lastmod || today}</lastmod>`,
    `    <changefreq>${r.changefreq || 'monthly'}</changefreq>`,
    `    <priority>${(r.priority ?? 0.5).toFixed(1)}</priority>`,
    '  </url>',
  ].join('\n');
}).join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;

/* ─── robots.txt ──────────────────────────────────────── */
const robots = `# ─────────────────────────────────────────────
# ${SITE.name} — robots.txt
# ─────────────────────────────────────────────

User-agent: *
Allow: /

# ── AI / answer engines (explicitly welcomed) ──
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

# ── Nothing to hide ──
Disallow: /api/

# ── Sitemap ──────────────────────────────────
Sitemap: ${SITE.url}/sitemap.xml
`;

const targets = ['public', 'dist'].filter((d) => existsSync(join(ROOT, d)));
if (!targets.includes('public')) {
  mkdirSync(join(ROOT, 'public'), { recursive: true });
  targets.push('public');
}

targets.forEach((dir) => {
  writeFileSync(join(ROOT, dir, 'sitemap.xml'), sitemap, 'utf-8');
  writeFileSync(join(ROOT, dir, 'robots.txt'), robots, 'utf-8');
});

console.log(`[sitemap] ${ROUTES.length} URLs written to: ${targets.join(', ')}`);
