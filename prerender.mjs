/* ═══════════════════════════════════════════════════════════
   MULTI-ROUTE PRERENDERER
   Renders every route in the manifest with a real browser and
   writes each one to its own static HTML file, complete with
   the per-route <title>, meta, canonical and JSON-LD that the
   Seo component injects at runtime.

   Result: Google, Bing and social crawlers receive fully
   rendered HTML for every page instead of an empty SPA shell.
   ═══════════════════════════════════════════════════════════ */

import { launch } from 'puppeteer';
import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { extname, join, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const ROOT = fileURLToPath(new URL('.', import.meta.url));
const DIST = join(ROOT, 'dist');
const PORT = Number(process.env.PRERENDER_PORT || 45678);

if (process.env.SKIP_PRERENDER) {
  console.log('[prerender] Skipped (SKIP_PRERENDER set)');
  process.exit(0);
}

const { ALL_ROUTES: ROUTES } = await import(pathToFileURL(join(ROOT, 'src/data/routes.js')));

/* CI installs Puppeteer's own Chrome; a local dev machine usually has not.
   Fall back to an installed browser so `npm run build` works either way. */
function findChrome() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) return process.env.PUPPETEER_EXECUTABLE_PATH;
  const candidates = [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ];
  return candidates.find((p) => existsSync(p)) || undefined;
}

const MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
};

/* ─── Static file server with SPA fallback ────────────── */
const server = createServer((req, res) => {
  const url = decodeURIComponent(req.url.replace(/\?.*$/, ''));
  const filePath = join(DIST, url === '/' ? 'index.html' : url);
  try {
    const content = readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] || 'application/octet-stream' });
    res.end(content);
  } catch {
    if (url.startsWith('/assets/') || extname(url)) {
      res.writeHead(404);
      return res.end('Not found');
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(readFileSync(join(DIST, 'index.html')));
  }
});

/* ─── Write a rendered route to disk ──────────────────── */
function writeRoute(routePath, html) {
  const target =
    routePath === '/'
      ? join(DIST, 'index.html')
      : join(DIST, routePath.replace(/^\//, ''), 'index.html');

  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, html, 'utf-8');
  return target;
}

/* ─── Main ────────────────────────────────────────────── */
server.listen(PORT, async () => {
  console.log(`[prerender] Serving dist/ on http://localhost:${PORT}`);
  console.log(`[prerender] Rendering ${ROUTES.length} routes...\n`);

  let browser;
  const failures = [];

  try {
    try {
      browser = await launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
      });
    } catch (err) {
      const fallback = findChrome();
      if (!fallback) throw err;
      console.log(`[prerender] Bundled Chrome missing — using ${fallback}`);
      browser = await launch({
        headless: true,
        executablePath: fallback,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
      });
    }

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    page.on('pageerror', (err) => console.warn('    ! page error:', err.message));

    for (const route of ROUTES) {
      const url = `http://localhost:${PORT}${route.path}`;
      try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

        /* Wait until React has mounted and Seo has written a title */
        await page
          .waitForFunction(
            () =>
              document.title &&
              document.title.length > 0 &&
              document.querySelector('#root')?.children.length > 0,
            { timeout: 25000 }
          )
          .catch(() => {});

        /* The homepage plays an intro film over the content. Wait it out so
           the captured HTML is the real page, not the curtain. */
        await page
          .waitForFunction(() => !document.querySelector('.preloader'), { timeout: 12000 })
          .catch(() => {});

        /* Let lazy chunks and in-view animations settle */
        await new Promise((r) => setTimeout(r, 1200));

        /* Reveal anything still mid-animation so crawlers see the copy */
        await page.evaluate(() => {
          document.querySelectorAll('[style*="opacity: 0"]').forEach((el) => {
            el.style.opacity = '1';
            el.style.transform = 'none';
          });
        });

        const html = await page.content();
        writeRoute(route.path, html);

        const title = await page.title();
        console.log(
          `  ✓ ${route.path.padEnd(44)} ${(html.length / 1024).toFixed(0).padStart(4)} KB  ${title.slice(0, 54)}`
        );
      } catch (err) {
        failures.push({ path: route.path, error: err.message });
        console.error(`  ✗ ${route.path} — ${err.message}`);
      }
    }

    /* 404 fallback for hosts that serve a static 404.html */
    try {
      await page.goto(`http://localhost:${PORT}/__not-found__`, {
        waitUntil: 'networkidle2',
        timeout: 30000,
      });
      await new Promise((r) => setTimeout(r, 700));
      writeFileSync(join(DIST, '404.html'), await page.content(), 'utf-8');
      console.log('  ✓ /404.html');
    } catch {
      /* non-fatal */
    }

    console.log(
      `\n[prerender] Done — ${ROUTES.length - failures.length}/${ROUTES.length} routes rendered.`
    );
    if (failures.length) {
      console.error('[prerender] Failed routes:', failures.map((f) => f.path).join(', '));
    }
  } catch (err) {
    console.error('[prerender] Fatal:', err.message);
    process.exitCode = 1;
  } finally {
    if (browser) await browser.close();
    server.close();
  }
});
