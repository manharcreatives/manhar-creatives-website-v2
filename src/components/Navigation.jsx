import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../data/site';
import { SERVICES } from '../data/services';
import { EASE } from '../utils/motion';
import { trackCta } from '../utils/analytics';

/* Homepage sections that correspond to a top-level nav item. The
   homepage covers the same ground as the inner pages, so while a
   visitor is reading the services block the "Services" link is a
   useful place marker — but it is *not* aria-current, because
   clicking it navigates away rather than staying put. */
const HOME_SECTIONS = {
  '/services': 'services',
  '/projects': 'projects',
  '/about': 'about',
  '/process': 'process',
  '/blog': 'insights',
  '/contact': 'contact',
};

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

/* ─── Which homepage section is being read? ───────────────
   IntersectionObserver rather than a scroll handler: the
   browser does the geometry off the main thread, which matters
   on a page with a WebGL canvas and a background video already
   competing for frames.

   The rootMargin band is a 40%-tall strip across the middle of
   the viewport, so a section becomes "current" when it reaches
   reading position, not when its first pixel appears.
───────────────────────────────────────────────────────── */
function useActiveSection(enabled) {
  const [active, setActive] = useState('');

  useEffect(() => {
    if (!enabled || typeof IntersectionObserver === 'undefined') {
      setActive('');
      return;
    }

    const ids = Object.values(HOME_SECTIONS);
    const visible = new Map();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visible.set(e.target.id, e.intersectionRatio);
          else visible.delete(e.target.id);
        });

        /* Two sections can straddle the band at once — the one
           occupying more of it wins, which stops the indicator
           flickering between neighbours mid-scroll. */
        let best = '';
        let bestRatio = 0;
        visible.forEach((ratio, id) => {
          if (ratio > bestRatio) { bestRatio = ratio; best = id; }
        });

        setActive((prev) => (prev === best ? prev : best));
      },
      { rootMargin: '-30% 0px -30% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    /* Sections mount progressively (lazy sections, images resizing
       the page), so observe on the next frame and re-check once. */
    const attach = () => {
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el) io.observe(el);
      });
    };
    attach();
    const t = setTimeout(attach, 900);

    return () => { clearTimeout(t); io.disconnect(); };
  }, [enabled]);

  /* Reflect the current section in the URL so a copied link lands
     where the visitor was. `replaceState` rather than push — this
     must never fill the back button with forty history entries. */
  useEffect(() => {
    if (!enabled) return;
    const target = active ? `#${active}` : '';
    if (window.location.hash === target) return;
    if (!active && !window.location.hash) return;

    window.history.replaceState(
      window.history.state,
      '',
      `${window.location.pathname}${window.location.search}${target}`
    );
  }, [active, enabled]);

  return active;
}

/* ─── Desktop nav link ────────────────────────────────── */
function NavLink({ href, label, active, inView, onEnter, onLeave, hasMenu }) {
  const [hovered, setHovered] = useState(false);
  const on = hovered || active || inView;

  return (
    <Link
      to={href}
      onMouseEnter={() => { setHovered(true); onEnter?.(); }}
      onMouseLeave={() => { setHovered(false); onLeave?.(); }}
      onFocus={() => { setHovered(true); onEnter?.(); }}
      onBlur={() => { setHovered(false); onLeave?.(); }}
      aria-current={active ? 'page' : undefined}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 16px',
        borderRadius: 'var(--radius-md)',
        fontSize: '0.8125rem',
        fontWeight: 500,
        color: on ? 'var(--text-primary)' : 'var(--text-secondary)',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        background: on ? 'rgba(255,255,255,0.06)' : 'transparent',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
      {hasMenu && (
        <span
          aria-hidden="true"
          style={{
            fontSize: '0.55rem',
            opacity: 0.65,
            transform: on ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s var(--ease-out-expo)',
          }}
        >
          ▾
        </span>
      )}

      {/* Marker for the current page, and a dimmer one for the
          homepage section currently in view.

          Deliberately *not* a shared `layoutId` element: framer
          writes its own transform for a layout animation, which
          would overwrite the translateX(-50%) doing the centring
          here — the exact failure documented on the mega-menu
          below. Opacity and width are animated instead, which
          need no transform at all. */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute', bottom: '2px', left: '50%',
          transform: 'translateX(-50%)',
          width: active ? '14px' : inView ? '10px' : '0px',
          height: '1.5px', borderRadius: '2px',
          background: 'var(--color-primary)',
          boxShadow: '0 0 8px rgba(34,197,94,0.7)',
          opacity: active ? 1 : inView ? 0.6 : 0,
          transition: 'width 0.4s var(--ease-out-expo), opacity 0.3s ease',
        }}
      />
    </Link>
  );
}

/* ─── Services mega-menu ──────────────────────────────────
   A dropdown is a shop window, not a table of contents. The
   previous version listed six services as icon-and-text rows,
   which is what every agency site does and what nobody reads.

   This version is photograph-led: one image per service, a
   hovered card that lifts out of the grid, and a featured pane
   on the left that swaps to whichever service the cursor is on.
   The visitor sees the work before they read the label.
───────────────────────────────────────────────────────── */
function ServicesMenu({ open, onEnter, onLeave }) {
  const [hovered, setHovered] = useState(0);
  const featured = SERVICES[hovered] || SERVICES[0];
  const featuredImage = featured.media?.hero || featured.image;

  return (
    <AnimatePresence>
      {open && (
        /* Centring lives on this wrapper, not on the animated panel.
           Framer writes its own `transform` for the y-slide, which silently
           replaced an inline translateX(-50%) — the panel then started at
           the halfway mark and ran 880px off the right edge. */
        <div
          className="hide-md"
          style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'min(1080px, calc(100vw - 32px))',
            paddingTop: '8px',
            zIndex: 'var(--z-nav)',
          }}
        >
        <motion.div
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.26, ease: EASE }}
          style={{
            width: '100%',
            overflow: 'hidden',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid rgba(34,197,94,0.16)',
            background: 'rgba(9,12,11,0.96)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            boxShadow: '0 34px 90px rgba(0,0,0,0.7), 0 0 70px rgba(34,197,94,0.06)',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '288px 1fr' }}>

            {/* ── Featured pane ── */}
            <div
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRight: '1px solid rgba(255,255,255,0.07)',
                minHeight: '340px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '26px 24px',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={featured.id}
                  aria-hidden="true"
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  style={{
                    position: 'absolute', inset: 0, zIndex: 0,
                    backgroundImage: `url(${featuredImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              </AnimatePresence>
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute', inset: 0, zIndex: 1,
                  background:
                    'linear-gradient(to top, rgba(9,12,11,0.97) 6%, rgba(9,12,11,0.72) 46%, rgba(9,12,11,0.35) 100%)',
                }}
              />

              <div style={{ position: 'relative', zIndex: 2 }}>
                <span
                  style={{
                    display: 'inline-block',
                    fontFamily: 'var(--font-mono)', fontSize: '0.5938rem',
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: 'var(--color-accent)', marginBottom: '12px',
                  }}
                >
                  {featured.category}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)', fontSize: '1.1875rem',
                    fontWeight: 600, color: '#fff', lineHeight: 1.25, marginBottom: '10px',
                  }}
                >
                  {featured.title}
                </h3>
                <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: '16px' }}>
                  {featured.tagline}
                </p>
                <Link
                  to={`/services/${featured.slug}`}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-accent)',
                    textDecoration: 'none', fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.04em',
                  }}
                >
                  OPEN SERVICE ↗
                </Link>
              </div>
            </div>

            {/* ── Service tiles ── */}
            <div style={{ padding: '18px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {SERVICES.map((s, i) => {
                  const isHot = hovered === i;
                  return (
                    <Link
                      key={s.id}
                      to={`/services/${s.slug}`}
                      onMouseEnter={() => setHovered(i)}
                      onFocus={() => setHovered(i)}
                      style={{
                        position: 'relative',
                        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                        minHeight: '128px', padding: '14px',
                        borderRadius: 'var(--radius-md)',
                        overflow: 'hidden', isolation: 'isolate',
                        textDecoration: 'none',
                        border: `1px solid ${isHot ? 'rgba(34,197,94,0.4)' : 'rgba(255,255,255,0.07)'}`,
                        transform: isHot ? 'translateY(-3px)' : 'none',
                        boxShadow: isHot ? '0 14px 32px rgba(0,0,0,0.5)' : 'none',
                        transition: 'transform 0.35s var(--ease-out-expo), border-color 0.3s ease, box-shadow 0.35s ease',
                      }}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          position: 'absolute', inset: 0, zIndex: -2,
                          backgroundImage: `url(${s.media?.hero || s.image})`,
                          backgroundSize: 'cover', backgroundPosition: 'center',
                          transform: isHot ? 'scale(1.08)' : 'scale(1)',
                          transition: 'transform 0.7s var(--ease-out-expo)',
                        }}
                      />
                      <span
                        aria-hidden="true"
                        style={{
                          position: 'absolute', inset: 0, zIndex: -1,
                          background: isHot
                            ? 'linear-gradient(to top, rgba(9,12,11,0.94) 18%, rgba(9,12,11,0.5) 70%, rgba(34,197,94,0.16) 100%)'
                            : 'linear-gradient(to top, rgba(9,12,11,0.95) 18%, rgba(9,12,11,0.74) 70%, rgba(9,12,11,0.6) 100%)',
                          transition: 'background 0.35s ease',
                        }}
                      />
                      <span
                        style={{
                          display: 'block', color: '#fff', fontSize: '0.8125rem',
                          fontWeight: 600, lineHeight: 1.3,
                          fontFamily: 'var(--font-display)',
                        }}
                      >
                        {s.shortTitle}
                      </span>
                      <span
                        style={{
                          display: 'block', marginTop: '5px',
                          fontFamily: 'var(--font-mono)', fontSize: '0.5938rem',
                          letterSpacing: '0.14em', textTransform: 'uppercase',
                          color: isHot ? 'var(--color-accent)' : 'rgba(255,255,255,0.4)',
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {s.category}
                      </span>
                    </Link>
                  );
                })}
              </div>

              <div
                style={{
                  marginTop: '16px', paddingTop: '15px', borderTop: '1px solid var(--border-subtle)',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap',
                }}
              >
                <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.5)' }}>
                  Not sure which one you need? We will tell you honestly.
                </span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Link
                    to="/services"
                    style={{
                      padding: '8px 16px', borderRadius: 'var(--radius-full)',
                      border: '1px solid var(--border-light)', fontSize: '0.75rem',
                      color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontFamily: 'var(--font-mono)',
                    }}
                  >
                    All services
                  </Link>
                  <Link
                    to="/contact"
                    style={{
                      padding: '8px 16px', borderRadius: 'var(--radius-full)',
                      border: '1px solid rgba(34,197,94,0.4)', background: 'rgba(34,197,94,0.08)',
                      fontSize: '0.75rem', color: 'var(--color-primary)', textDecoration: 'none',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    Book a call
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════ */
export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const menuTimer = useRef(null);
  const menuButtonRef = useRef(null);
  const mobilePanelRef = useRef(null);
  const { pathname } = useLocation();
  const activeSection = useActiveSection(pathname === '/');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Close everything on navigation */
  useEffect(() => {
    setMobileOpen(false);
    setMenuOpen(false);
    setMobileServices(false);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth > 768) setMobileOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* Lock body scroll while the mobile overlay is open */
  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [mobileOpen]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      if (mobileOpen) { setMobileOpen(false); menuButtonRef.current?.focus(); }
      if (menuOpen) setMenuOpen(false);
    }
  }, [mobileOpen, menuOpen]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  /* ── Mobile overlay focus trap ─────────────────────────
     A full-screen menu that Tab can escape leaves keyboard and
     screen-reader users navigating the page underneath while the
     overlay still covers it. Focus moves in on open, cycles
     inside, and returns to the hamburger on close.
  ─────────────────────────────────────────────────────── */
  useEffect(() => {
    if (!mobileOpen) return;

    const panel = mobilePanelRef.current;
    if (!panel) return;

    const first = panel.querySelector(FOCUSABLE);
    const raf = requestAnimationFrame(() => first?.focus());

    const trap = (e) => {
      if (e.key !== 'Tab') return;

      const items = Array.from(panel.querySelectorAll(FOCUSABLE))
        .filter((el) => el.offsetParent !== null);
      if (items.length === 0) return;

      const firstEl = items[0];
      const lastEl = items[items.length - 1];

      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };

    document.addEventListener('keydown', trap, true);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', trap, true);
    };
  }, [mobileOpen]);

  const openMenu = () => { clearTimeout(menuTimer.current); setMenuOpen(true); };
  const closeMenu = () => { menuTimer.current = setTimeout(() => setMenuOpen(false), 160); };

  const toggleMobile = useCallback(() => setMobileOpen((o) => !o), []);

  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>

      <header>
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className="nav-fixed"
          aria-label="Main navigation"
          style={{
            position: 'fixed', top: 0, left: 0, right: 0,
            zIndex: 'var(--z-nav)',
            padding: scrolled ? '12px 0' : '18px 0',
            transition: 'padding 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Blur backdrop */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute', inset: 0,
              background: scrolled ? 'rgba(11,15,14,0.82)' : 'rgba(11,15,14,0.25)',
              backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
              borderBottom: `1px solid ${scrolled ? 'var(--border-subtle)' : 'transparent'}`,
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
          {/* Top glow line */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(var(--color-primary-rgb), 0.22), transparent)',
              opacity: scrolled ? 1 : 0, transition: 'opacity 0.4s ease',
            }}
          />

          <div
            className="container"
            style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}
          >
            {/* Logo */}
            <Link to="/" aria-label="Manhar Creatives, home" style={{ display: 'flex', alignItems: 'center', zIndex: 2, flexShrink: 0 }}>
              <img
                src="/images/logos/nav-logo.webp"
                alt="Manhar Creatives"
                fetchPriority="high"
                decoding="async"
                style={{ width: 120, height: 'auto' }}
              />
            </Link>

            {/* Desktop links */}
            <div
              className="hide-lg"
              style={{
                display: 'flex', alignItems: 'center', gap: '2px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-full)',
                padding: '4px',
              }}
            >
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.label}
                  href={link.href}
                  label={link.label}
                  hasMenu={link.hasMenu}
                  active={isActive(link.href)}
                  inView={activeSection !== '' && HOME_SECTIONS[link.href] === activeSection}
                  onEnter={link.hasMenu ? openMenu : () => setMenuOpen(false)}
                  onLeave={link.hasMenu ? closeMenu : undefined}
                />
              ))}
            </div>

            {/* CTA + hamburger */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', zIndex: 2, flexShrink: 0 }}>
              <Link
                to="/contact"
                onClick={() => trackCta('Book a Discovery Call', 'header')}
                className="btn btn-primary nav-cta hide-sm"
                style={{
                  padding: '10px 20px', fontSize: '0.8125rem', minHeight: '38px',
                  boxShadow: '0 0 24px rgba(34,197,94,0.25)',
                }}
              >
                Book a Discovery Call
              </Link>

              <button
                ref={menuButtonRef}
                onClick={toggleMobile}
                className="mobile-menu-btn"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '8px', minWidth: '44px', minHeight: '44px', alignItems: 'center', justifyContent: 'flex-end' }}
              >
                <span style={{ width: 24, display: 'flex', flexDirection: 'column', gap: mobileOpen ? 0 : 6, alignItems: 'flex-end' }}>
                  <span
                    style={{
                      display: 'block', width: 24, height: 2, background: 'var(--text-primary)',
                      borderRadius: 2, transition: 'all 0.3s ease',
                      transform: mobileOpen ? 'rotate(45deg) translateY(1px)' : 'none',
                    }}
                  />
                  <span
                    style={{
                      display: 'block', width: mobileOpen ? 0 : 16, height: 2, background: 'var(--text-primary)',
                      borderRadius: 2, transition: 'all 0.3s ease', opacity: mobileOpen ? 0 : 1,
                    }}
                  />
                  <span
                    style={{
                      display: 'block', width: mobileOpen ? 24 : 20, height: 2, background: 'var(--text-primary)',
                      borderRadius: 2, transition: 'all 0.3s ease',
                      transform: mobileOpen ? 'rotate(-45deg) translateY(-1px)' : 'none',
                    }}
                  />
                </span>
              </button>
            </div>

            <ServicesMenu open={menuOpen} onEnter={openMenu} onLeave={closeMenu} />
          </div>
        </motion.nav>
      </header>

      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={mobilePanelRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            /* Slides in from the right and eases out with the same
               curve as everything else, rather than a flat fade —
               the direction tells you it is a panel over the page,
               not a new page. */
            initial={{ opacity: 0, x: '18%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '14%', transition: { duration: 0.24, ease: EASE } }}
            transition={{ duration: 0.42, ease: EASE }}
            style={{
              position: 'fixed', inset: 0, zIndex: 99,
              background: 'rgba(11,15,14,0.97)',
              backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <div style={{ padding: '104px 24px 48px', display: 'flex', flexDirection: 'column', gap: '4px', minHeight: '100%' }}>
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.05, duration: 0.4, ease: EASE }}
                >
                  {link.hasMenu ? (
                    <>
                      <button
                        onClick={() => setMobileServices((v) => !v)}
                        aria-expanded={mobileServices}
                        style={{
                          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          padding: '16px 4px', background: 'none', border: 'none', cursor: 'pointer',
                          borderBottom: '1px solid var(--border-subtle)',
                          fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 500,
                          color: isActive(link.href) ? 'var(--color-primary)' : '#fff',
                          letterSpacing: '-0.02em', minHeight: '56px',
                        }}
                      >
                        {link.label}
                        <span
                          aria-hidden="true"
                          style={{
                            fontSize: '0.85rem', color: 'var(--color-primary)',
                            transform: mobileServices ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s var(--ease-out-expo)',
                          }}
                        >
                          ▾
                        </span>
                      </button>
                      <div
                        style={{
                          maxHeight: mobileServices ? '620px' : '0px',
                          opacity: mobileServices ? 1 : 0,
                          overflow: 'hidden',
                          transition: 'max-height 0.45s var(--ease-out-expo), opacity 0.3s ease',
                        }}
                      >
                        <div style={{ padding: '12px 0 12px 14px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          {SERVICES.map((s) => (
                            <Link
                              key={s.id}
                              to={`/services/${s.slug}`}
                              style={{
                                display: 'flex', alignItems: 'center', gap: '12px',
                                padding: '13px 10px', borderRadius: 'var(--radius-md)',
                                color: 'rgba(255,255,255,0.65)', fontSize: '0.9688rem',
                                textDecoration: 'none', minHeight: '48px',
                              }}
                            >
                              <span style={{ color: 'var(--color-primary)', fontSize: '0.9rem' }}>{s.icon}</span>
                              {s.shortTitle}
                            </Link>
                          ))}
                          <Link
                            to="/services"
                            style={{
                              padding: '13px 10px', color: 'var(--color-primary)',
                              fontSize: '0.875rem', fontFamily: 'var(--font-mono)', textDecoration: 'none',
                            }}
                          >
                            View all services →
                          </Link>
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      to={link.href}
                      aria-current={isActive(link.href) ? 'page' : undefined}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        gap: '16px', padding: '16px 4px',
                        borderBottom: '1px solid var(--border-subtle)',
                        fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 500,
                        color: isActive(link.href) ? 'var(--color-primary)' : '#fff',
                        textDecoration: 'none', letterSpacing: '-0.02em', minHeight: '56px',
                      }}
                    >
                      {link.label}
                      {/* The current page is marked with a dot as well
                          as colour — colour alone is not a signal for
                          a colour-blind visitor. */}
                      {isActive(link.href) && (
                        <span
                          aria-hidden="true"
                          style={{
                            width: '7px', height: '7px', borderRadius: '50%',
                            background: 'var(--color-primary)',
                            boxShadow: '0 0 10px rgba(34,197,94,0.8)', flexShrink: 0,
                          }}
                        />
                      )}
                    </Link>
                  )}
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34, duration: 0.35 }}
                style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}
              >
                <Link
                  to="/contact"
                  onClick={() => trackCta('Book a Discovery Call', 'mobile_menu')}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '16px 32px' }}
                >
                  Book a Discovery Call
                </Link>

                {/* Only shown to visitors who actually have the key —
                   telling a phone user to press Esc is noise. */}
                <p className="mobile-esc-hint" style={{ display: 'none', textAlign: 'center', marginTop: '10px', color: 'rgba(255,255,255,0.48)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                  Press <kbd style={{ padding: '2px 7px', border: '1px solid rgba(255,255,255,0.14)', borderRadius: '4px', fontSize: '0.7rem' }}>Esc</kbd> to close
                </p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '12px' }}>
                  {[
                    { label: 'Privacy Policy', href: '/privacy-policy' },
                    { label: 'Terms & Conditions', href: '/terms-and-conditions' },
                  ].map((l) => (
                    <Link
                      key={l.href}
                      to={l.href}
                      style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.48)', textDecoration: 'none', fontFamily: 'var(--font-mono)' }}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .skip-link {
          position: absolute; left: -9999px; top: 0; z-index: 999;
          background: var(--color-primary); color: #0B0F0E;
          padding: 12px 24px; border-radius: 0 0 8px 0; font-weight: 600;
        }
        .skip-link:focus { left: 0; }
        @media (max-width: 1024px) {
          .hide-lg { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (max-width: 560px) {
          .nav-cta { display: none !important; }
        }
        /* A physical keyboard is the only context where the Esc
           hint is useful — a fine pointer is the best available
           proxy for one. */
        @media (pointer: fine) {
          .mobile-esc-hint { display: block !important; }
        }
      `}</style>
    </>
  );
}
