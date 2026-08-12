import { useState, useCallback, useEffect, useRef, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';

import SmoothScroll from './components/SmoothScroll';
import Preloader from './components/Preloader';
import Navigation from './components/Navigation';
import CinematicFooter from './sections/CinematicFooter';
import ScrollProgress from './components/ScrollProgress';
import ScrollToTop from './components/ScrollToTop';
import PageTransition from './components/PageTransition';
import KeyboardShortcuts from './components/KeyboardShortcuts';
import { ToastProvider } from './components/Toast';
import { PageKitStyles } from './components/PageKit';
import { LEGACY_REDIRECTS } from './data/site';
import { SERVICE_CITY_PAGES } from './data/localSeo';
import { initScrollDepth, initLinkTracking, resetScrollDepth, trackPageView } from './utils/analytics';
import { prefersReducedMotion } from './utils/motion';

import ErrorBoundary from './components/ErrorBoundary';
import HomePage from './pages/HomePage';

/* ─────────────────────────────────────────────────────────
   Code-split routes, with one retry.

   A dynamic import fails for two ordinary reasons: the visitor
   momentarily lost connectivity, or we deployed while their tab
   was open and the hashed chunk they are asking for no longer
   exists. The first is fixed by asking again; the second is
   fixed by a reload, which is what the second failure triggers.

   Without this, either case produces a permanently blank page
   with a ChunkLoadError in a console nobody is reading.
───────────────────────────────────────────────────────── */
function lazyWithRetry(factory) {
  return lazy(() =>
    factory().catch(async (err) => {
      await new Promise((r) => setTimeout(r, 700));
      try {
        return await factory();
      } catch {
        /* Only reload once per session — a reload loop is worse
           than an error screen. */
        const KEY = 'mc:chunk-reloaded';
        if (typeof sessionStorage !== 'undefined' && !sessionStorage.getItem(KEY)) {
          sessionStorage.setItem(KEY, '1');
          window.location.reload();
        }
        throw err;
      }
    })
  );
}

/* Inner pages are code-split — the homepage bundle stays light */
const ServicesPage = lazyWithRetry(() => import('./pages/ServicesPage'));
const ServiceDetailPage = lazyWithRetry(() => import('./pages/ServiceDetailPage'));
const AboutPage = lazyWithRetry(() => import('./pages/AboutPage'));
const ProcessPage = lazyWithRetry(() => import('./pages/ProcessPage'));
const ProjectsPage = lazyWithRetry(() => import('./pages/ProjectsPage'));
const ContactPage = lazyWithRetry(() => import('./pages/ContactPage'));
const BlogIndexPage = lazyWithRetry(() => import('./pages/BlogIndexPage'));
const BlogPostPage = lazyWithRetry(() => import('./pages/BlogPostPage'));
const CityPage = lazyWithRetry(() => import('./pages/CityPage'));
const ServiceCityPage = lazyWithRetry(() => import('./pages/ServiceCityPage'));
const PrivacyPolicyPage = lazyWithRetry(() => import('./pages/PrivacyPolicyPage'));
const TermsPage = lazyWithRetry(() => import('./pages/TermsPage'));
const NotFoundPage = lazyWithRetry(() => import('./pages/NotFoundPage'));

/* ─────────────────────────────────────────────────────────
   Scroll behaviour on route change:
   new page → top; same page with #hash → scroll to element.

   The reset is deferred by one page-transition exit (220ms) so
   the outgoing page fades out where the visitor left it rather
   than snapping to the top mid-fade. Hash links keep their own
   slightly longer delay — the target element does not exist
   until the incoming route has painted.
───────────────────────────────────────────────────────── */
const EXIT_MS = 230;

function ScrollManager() {
  const { pathname, hash } = useLocation();
  const isFirst = useRef(true);

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const t = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          if (window.__lenis) {
            window.__lenis.scrollTo(el, {
              duration: prefersReducedMotion() ? 0 : 0.8,
              offset: -80,
              immediate: prefersReducedMotion(),
            });
          } else {
            el.scrollIntoView({
              behavior: prefersReducedMotion() ? 'auto' : 'smooth',
              block: 'start',
            });
          }
          return;
        }
        window.scrollTo(0, 0);
      }, EXIT_MS + 120);
      return () => clearTimeout(t);
    }

    const jump = () => {
      if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
    };

    /* First paint has no outgoing page to wait for. */
    if (isFirst.current) {
      isFirst.current = false;
      jump();
      return;
    }

    const t = setTimeout(jump, EXIT_MS);
    return () => clearTimeout(t);
  }, [pathname, hash]);

  return null;
}

/* ─── Analytics: SPA page views + scroll depth per page ── */
function AnalyticsManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const stopDepth = initScrollDepth();
    const stopLinks = initLinkTracking();
    return () => { stopDepth(); stopLinks(); };
  }, []);

  useEffect(() => {
    resetScrollDepth();
    /* Wait a tick so <Seo> has swapped document.title first —
       otherwise every page view reports the previous page's title. */
    const t = setTimeout(() => trackPageView(pathname), 60);
    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}

/* ─── Route-level loading state ───────────────────────── */
function RouteFallback() {
  return (
    <div
      style={{
        minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg)',
      }}
      aria-busy="true"
      aria-live="polite"
    >
      <div
        style={{
          width: 34, height: 34, borderRadius: '50%',
          border: '2px solid rgba(34,197,94,0.18)',
          borderTopColor: 'var(--color-primary)',
          animation: 'rotate-slow 0.9s linear infinite',
        }}
      />
      <span className="visually-hidden">Loading page</span>
    </div>
  );
}

/* ─── Legacy URL handling (old single-page anchors) ───── */
function LegacyRedirect() {
  const { pathname } = useLocation();
  const target = LEGACY_REDIRECTS[pathname.replace(/\/$/, '')];
  if (target) return <Navigate to={target} replace />;
  return <NotFoundPage />;
}

/* ─── Shell ───────────────────────────────────────────── */
function Shell() {
  const location = useLocation();
  const { pathname } = location;
  const isHome = pathname === '/';
  const [loaded, setLoaded] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.location.pathname !== '/';
  });

  const handlePreloaderComplete = useCallback(() => setLoaded(true), []);
  const preloading = isHome && !loaded;

  /* Hold the page still behind the intro film. The app itself still
     renders underneath — returning the preloader *instead of* the app
     meant crawlers (and the prerenderer) received an empty shell with
     no copy and no JSON-LD on the single most important page. */
  useEffect(() => {
    if (!preloading) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [preloading]);

  return (
    <SmoothScroll>
      {preloading && <Preloader onComplete={handlePreloaderComplete} />}
      <div className="noise-overlay" aria-hidden="true" />
      <ScrollManager />
      <AnalyticsManager />
      <ScrollProgress />
      <Navigation />
      <main id="main-content">
        <PageTransition routeKey={pathname}>
          {/* Keyed by route: a crash on one page is contained to
              that page, and navigating away clears it rather than
              leaving the visitor stuck on an error screen with a
              working nav they cannot reach. */}
          <ErrorBoundary key={pathname} inline>
          <Suspense fallback={<RouteFallback />}>
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />

              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:slug" element={<ServiceDetailPage />} />

              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/process" element={<ProcessPage />} />
              <Route path="/contact" element={<ContactPage />} />

              <Route path="/blog" element={<BlogIndexPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />

              <Route path="/ahmedabad" element={<CityPage citySlug="ahmedabad" />} />
              <Route path="/mehsana" element={<CityPage citySlug="mehsana" />} />
              <Route path="/visnagar" element={<CityPage citySlug="visnagar" />} />

              {/* Service × city landing pages — "<service> in <city>" */}
              {SERVICE_CITY_PAGES.map((p) => (
                <Route key={p.slug} path={p.path} element={<ServiceCityPage slug={p.slug} />} />
              ))}

              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-and-conditions" element={<TermsPage />} />

              {/* Common alternates */}
              <Route path="/work" element={<Navigate to="/projects" replace />} />
              <Route path="/insights" element={<Navigate to="/blog" replace />} />
              <Route path="/terms" element={<Navigate to="/terms-and-conditions" replace />} />
              <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />

              <Route path="*" element={<LegacyRedirect />} />
            </Routes>
          </Suspense>
          </ErrorBoundary>
        </PageTransition>
      </main>
      <CinematicFooter />
      <ScrollToTop />
      <KeyboardShortcuts />
      <PageKitStyles />
    </SmoothScroll>
  );
}

export default function App() {
  return (
    /* reducedMotion="user" makes every framer-motion transform and
       layout animation in the app respect the OS setting without
       each component having to ask. Opacity fades still run, which
       is the behaviour the spec intends: content should still
       appear, it just should not move. */
    <MotionConfig reducedMotion="user">
      <ToastProvider>
        <BrowserRouter>
          <Shell />
        </BrowserRouter>
      </ToastProvider>
    </MotionConfig>
  );
}
