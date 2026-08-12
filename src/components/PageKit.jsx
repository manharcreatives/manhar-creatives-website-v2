import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FadeIn } from './TextReveal';
import LazyImage from './LazyImage';
import { ViewAnimator } from '../utils/useInViewLenis';
import useLazyBackground from '../utils/useLazyBackground';
import { staggerDelay } from '../utils/motion';
import { trackCta } from '../utils/analytics';

/* ═══════════════════════════════════════════════════════════
   PAGE KIT
   Shared premium building blocks for all inner pages so every
   new page inherits the same typography, easing, blur values
   and green accent language as the original single-page site.
   ═══════════════════════════════════════════════════════════ */

const EASE = [0.16, 1, 0.3, 1];

/* ─── Eyebrow label with the signature rule ───────────── */
export function Eyebrow({ children, center = false, style = {} }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '24px',
        justifyContent: center ? 'center' : 'flex-start',
        ...style,
      }}
    >
      <div style={{ height: '1px', width: '40px', background: 'var(--color-primary)', opacity: 0.6 }} />
      <span
        className="text-caption"
        style={{ color: 'var(--color-primary)', letterSpacing: '0.18em', fontFamily: 'var(--font-mono)' }}
      >
        {children}
      </span>
    </div>
  );
}

/* ─── Breadcrumb trail ────────────────────────────────────
   Full trail on desktop. On a phone a four-level trail wraps to
   three lines and pushes the H1 below the fold, so the narrow
   layout collapses to a single "← back to parent" link — which
   is the only part of a breadcrumb anyone taps anyway.
───────────────────────────────────────────────────────── */
export function Breadcrumbs({ items = [] }) {
  if (!items.length) return null;

  const parent = items.length > 1 ? items[items.length - 2] : items[0];

  return (
    <nav
      aria-label="Breadcrumb"
      className="mc-breadcrumbs"
      style={{ marginBottom: '28px', fontSize: '0.8125rem', fontFamily: 'var(--font-mono)' }}
    >
      <ol
        className="mc-breadcrumbs__full"
        style={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px',
          listStyle: 'none', margin: 0, padding: 0,
        }}
      >
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.path + item.name} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              {last ? (
                <span style={{ color: 'rgba(255,255,255,0.48)' }} aria-current="page">{item.name}</span>
              ) : (
                <Link
                  to={item.path}
                  style={{ color: 'rgba(255,255,255,0.62)', textDecoration: 'none', transition: 'color 0.25s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-primary)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.62)'; }}
                >
                  {item.name}
                </Link>
              )}
              {!last && <span aria-hidden="true" style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>}
            </li>
          );
        })}
      </ol>

      {/* Hidden on desktop by the stylesheet in <PageKitStyles>. */}
      <Link
        to={parent.path}
        className="mc-breadcrumbs__back"
        style={{
          display: 'none', alignItems: 'center', gap: '8px',
          color: 'rgba(255,255,255,0.6)', textDecoration: 'none', minHeight: '38px',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        {parent.name}
      </Link>
    </nav>
  );
}

/* ─── Page hero ───────────────────────────────────────── */
export function PageHero({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  background,
  breadcrumbs,
  children,
  align = 'left',
  compact = false,
}) {
  const bgRef = useLazyBackground(background);
  const centered = align === 'center';

  return (
    <section
      style={{
        position: 'relative',
        background: 'var(--bg)',
        padding: compact ? '150px 0 60px' : '170px 0 90px',
        overflow: 'hidden',
      }}
    >
      {/* Background image layer */}
      {background && (
        <div
          ref={bgRef}
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, zIndex: 0,
            backgroundSize: 'cover', backgroundPosition: 'center',
            opacity: 0.16,
          }}
        />
      )}

      {/* Gradient mask */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background:
            'linear-gradient(to bottom, rgba(11,15,14,0.92) 0%, rgba(11,15,14,0.65) 40%, var(--bg) 100%)',
        }}
      />

      {/* Ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', zIndex: 1, pointerEvents: 'none',
          top: '-140px', left: centered ? '50%' : '10%',
          transform: centered ? 'translateX(-50%)' : 'none',
          width: '620px', height: '620px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,197,94,0.10) 0%, transparent 68%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: centered ? 'center' : 'left' }}>
        {breadcrumbs && (
          <div style={{ display: 'flex', justifyContent: centered ? 'center' : 'flex-start' }}>
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}

        {eyebrow && <FadeIn><Eyebrow center={centered}>{eyebrow}</Eyebrow></FadeIn>}

        <FadeIn delay={0.08}>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)',
              fontWeight: 600, lineHeight: 1.08, color: '#fff',
              letterSpacing: '-0.03em', marginBottom: '20px',
              maxWidth: centered ? '900px' : '1000px',
              marginLeft: centered ? 'auto' : 0,
              marginRight: centered ? 'auto' : 0,
            }}
          >
            {title}
            {titleAccent && (
              <>
                <br />
                <span
                  style={{
                    fontStyle: 'italic', fontWeight: 400,
                    background: 'linear-gradient(135deg, #22C55E, #4ADE80)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text', display: 'inline-block', paddingRight: '10px',
                  }}
                >
                  {titleAccent}
                </span>
              </>
            )}
          </h1>
        </FadeIn>

        {subtitle && (
          <FadeIn delay={0.16}>
            <p
              style={{
                fontSize: 'clamp(1rem, 1.4vw, 1.1875rem)',
                color: 'rgba(255,255,255,0.6)', lineHeight: 1.75,
                maxWidth: '660px',
                margin: centered ? '0 auto' : 0,
              }}
            >
              {subtitle}
            </p>
          </FadeIn>
        )}

        {children && <FadeIn delay={0.24}><div style={{ marginTop: '40px' }}>{children}</div></FadeIn>}
      </div>
    </section>
  );
}

/* ─── Section wrapper with optional background ────────── */
export function PageSection({ children, background, id, style = {}, bgOpacity = 0.1, tint = false }) {
  const bgRef = useLazyBackground(background);
  return (
    <section
      id={id}
      style={{ position: 'relative', background: 'var(--bg)', padding: 'var(--space-4xl) 0', overflow: 'hidden', ...style }}
    >
      {background && (
        <>
          <div
            ref={bgRef}
            aria-hidden="true"
            style={{
              position: 'absolute', inset: 0, zIndex: 0,
              backgroundSize: 'cover', backgroundPosition: 'center', opacity: bgOpacity,
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: 'absolute', inset: 0, zIndex: 1,
              background: 'linear-gradient(to bottom, var(--bg) 0%, transparent 35%, transparent 65%, var(--bg) 100%)',
            }}
          />
        </>
      )}
      {tint && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, zIndex: 0,
            background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(34,197,94,0.05) 0%, transparent 70%)',
          }}
        />
      )}
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>{children}</div>
    </section>
  );
}

/* ─── Section heading block ───────────────────────────── */
export function SectionHeading({ eyebrow, title, accent, subtitle, center = false, maxWidth = '720px' }) {
  return (
    <div style={{ textAlign: center ? 'center' : 'left', marginBottom: '56px' }}>
      {eyebrow && <FadeIn><Eyebrow center={center}>{eyebrow}</Eyebrow></FadeIn>}
      <FadeIn delay={0.08}>
        <h2
          className="text-heading-2"
          style={{
            color: '#fff', marginBottom: subtitle ? '18px' : 0,
            maxWidth, marginLeft: center ? 'auto' : 0, marginRight: center ? 'auto' : 0,
          }}
        >
          {title}{' '}
          {accent && <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'rgba(255,255,255,0.55)' }}>{accent}</span>}
        </h2>
      </FadeIn>
      {subtitle && (
        <FadeIn delay={0.14}>
          <p
            style={{
              fontSize: '1.0625rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75,
              maxWidth: '620px', marginLeft: center ? 'auto' : 0, marginRight: center ? 'auto' : 0,
            }}
          >
            {subtitle}
          </p>
        </FadeIn>
      )}
    </div>
  );
}

/* ─── Glass card with hover lift ──────────────────────── */
export function GlassCard({ children, style = {}, hover = true, padding = '36px 32px' }) {
  const [h, setH] = useState(false);
  const cardRef = useRef(null);

  /* Cursor-tracked spotlight. Written straight to CSS custom properties on
     the node rather than through React state — this fires on every mousemove,
     and re-rendering the card sixty times a second to move a gradient would
     be the one thing on the page that stutters. */
  const trackPointer = useCallback((e) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--spot-x', `${e.clientX - r.left}px`);
    el.style.setProperty('--spot-y', `${e.clientY - r.top}px`);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={() => hover && setH(true)}
      onMouseLeave={() => hover && setH(false)}
      onMouseMove={hover ? trackPointer : undefined}
      animate={{ y: h ? -5 : 0 }}
      transition={{ duration: 0.32, ease: EASE }}
      style={{
        position: 'relative',
        isolation: 'isolate',
        overflow: 'hidden',
        background: h ? 'rgba(31,41,55,0.42)' : 'rgba(31,41,55,0.26)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: `1px solid ${h ? 'rgba(34,197,94,0.28)' : 'var(--border-subtle)'}`,
        borderRadius: 'var(--radius-lg)',
        padding,
        height: '100%',
        boxShadow: h ? '0 18px 48px rgba(0,0,0,0.45), 0 0 40px rgba(34,197,94,0.06)' : '0 4px 20px rgba(0,0,0,0.28)',
        transition: 'background 0.32s ease, border-color 0.32s ease, box-shadow 0.32s ease',
        ...style,
      }}
    >
      {hover && (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: -1,
            pointerEvents: 'none',
            opacity: h ? 1 : 0,
            transition: 'opacity 0.4s ease',
            background:
              'radial-gradient(340px circle at var(--spot-x, 50%) var(--spot-y, 0px), rgba(34,197,94,0.13), transparent 68%)',
          }}
        />
      )}
      {children}
    </motion.div>
  );
}

/* ─── Numbered / icon feature grid ────────────────────── */
export function FeatureGrid({ items, columns = 3, numbered = false, minWidth = '280px' }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}, 1fr))`,
        gap: '20px',
      }}
    >
      {items.map((item, i) => (
        <ViewAnimator
          key={item.title}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-8%' }}
          /* Delay resets per row (`i % columns`) so a long grid
             does not accumulate a two-second wait by the bottom,
             and is capped in case `columns` is set generously. */
          transition={{ duration: 0.6, delay: staggerDelay(i % columns, 0.08, 0.32), ease: EASE }}
          style={{ height: '100%' }}
        >
          <GlassCard>
            {numbered ? (
              <span
                style={{
                  display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.8125rem',
                  color: 'var(--color-primary)', opacity: 0.75, marginBottom: '16px', letterSpacing: '0.1em',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
            ) : (
              <span
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '42px', height: '42px', borderRadius: 'var(--radius-sm)',
                  background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.16)',
                  color: 'var(--color-primary)', fontSize: '1.1rem', marginBottom: '20px',
                }}
              >
                {item.icon || '✦'}
              </span>
            )}
            <h3
              style={{
                fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 600,
                color: '#fff', marginBottom: '12px', lineHeight: 1.35,
              }}
            >
              {item.title}
            </h3>
            <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75 }}>
              {item.desc}
            </p>
          </GlassCard>
        </ViewAnimator>
      ))}
    </div>
  );
}

/* ─── Tag / chip row ──────────────────────────────────── */
export function TagRow({ items, accent = false }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      {items.map((t) => (
        <span
          key={t}
          style={{
            padding: '7px 15px',
            borderRadius: 'var(--radius-full)',
            border: `1px solid ${accent ? 'rgba(34,197,94,0.22)' : 'rgba(255,255,255,0.09)'}`,
            background: accent ? 'rgba(34,197,94,0.05)' : 'rgba(255,255,255,0.02)',
            fontSize: '0.8125rem',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.02em',
            color: accent ? 'var(--color-primary)' : 'rgba(255,255,255,0.5)',
          }}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

/* ─── Accordion FAQ ───────────────────────────────────── */
export function FaqList({ faqs, title = 'Frequently asked questions' }) {
  const [open, setOpen] = useState(0);
  if (!faqs?.length) return null;

  return (
    <div>
      {title && (
        <h2 className="text-heading-3" style={{ color: '#fff', marginBottom: '32px' }}>{title}</h2>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div
              key={f.q}
              style={{
                border: `1px solid ${isOpen ? 'rgba(34,197,94,0.22)' : 'var(--border-subtle)'}`,
                borderRadius: 'var(--radius-md)',
                background: isOpen ? 'rgba(34,197,94,0.035)' : 'rgba(255,255,255,0.015)',
                overflow: 'hidden',
                transition: 'all 0.32s var(--ease-out-expo)',
              }}
            >
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  gap: '20px', padding: '22px 24px', background: 'none', border: 'none',
                  cursor: 'pointer', textAlign: 'left', color: isOpen ? 'var(--color-primary)' : '#fff',
                  fontFamily: 'var(--font-display)', fontSize: '1.0625rem', fontWeight: 500,
                  lineHeight: 1.45, transition: 'color 0.3s ease', minHeight: '56px',
                }}
              >
                <span>{f.q}</span>
                <span
                  style={{
                    flexShrink: 0, width: '22px', height: '22px', position: 'relative',
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    transition: 'transform 0.35s var(--ease-out-expo)',
                    color: 'var(--color-primary)',
                  }}
                  aria-hidden="true"
                >
                  <span style={{ position: 'absolute', top: '10px', left: 0, width: '22px', height: '1.5px', background: 'currentColor' }} />
                  <span style={{ position: 'absolute', left: '10px', top: 0, width: '1.5px', height: '22px', background: 'currentColor' }} />
                </span>
              </button>
              <div
                style={{
                  maxHeight: isOpen ? '460px' : '0px',
                  opacity: isOpen ? 1 : 0,
                  transition: 'max-height 0.45s var(--ease-out-expo), opacity 0.3s ease, padding 0.3s ease',
                  padding: isOpen ? '0 24px 24px' : '0 24px',
                  overflow: 'hidden',
                }}
              >
                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, fontSize: '0.9688rem', maxWidth: '760px' }}>
                  {f.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Closing CTA band ────────────────────────────────── */
export function CtaBand({
  eyebrow = 'Next step',
  title = 'Let’s build something that works.',
  text = 'Tell us what your business needs to achieve. We will tell you honestly what it takes.',
  primaryLabel = 'Book a Discovery Call',
  primaryHref = '/contact',
  secondaryLabel,
  secondaryHref,
}) {
  return (
    <PageSection tint style={{ padding: 'var(--space-4xl) 0' }}>
      <ViewAnimator
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-10%' }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{
          position: 'relative',
          textAlign: 'center',
          padding: 'clamp(40px, 6vw, 72px) clamp(24px, 5vw, 64px)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid rgba(34,197,94,0.14)',
          background: 'linear-gradient(160deg, rgba(34,197,94,0.07) 0%, rgba(31,41,55,0.24) 55%, rgba(11,15,14,0.4) 100%)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', top: '-50%', left: '50%', transform: 'translateX(-50%)',
            width: '700px', height: '500px', pointerEvents: 'none',
            background: 'radial-gradient(ellipse, rgba(34,197,94,0.13) 0%, transparent 70%)',
            filter: 'blur(46px)',
          }}
        />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <p
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.25em',
              color: 'var(--color-primary)', textTransform: 'uppercase', marginBottom: '18px',
            }}
          >
            ✦ {eyebrow}
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 4vw, 3rem)',
              fontWeight: 600, color: '#fff', lineHeight: 1.12, letterSpacing: '-0.025em',
              marginBottom: '18px', maxWidth: '760px', margin: '0 auto 18px',
            }}
          >
            {title}
          </h2>
          <p
            style={{
              color: 'rgba(255,255,255,0.55)', fontSize: '1.0625rem', lineHeight: 1.75,
              maxWidth: '520px', margin: '0 auto 36px',
            }}
          >
            {text}
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to={primaryHref}
              onClick={() => trackCta(primaryLabel, 'cta_band', primaryHref)}
              className="btn btn-primary"
              style={{ boxShadow: '0 0 32px rgba(34,197,94,0.28)' }}
            >
              {primaryLabel}
            </Link>
            {secondaryLabel && (
              <Link
                to={secondaryHref}
                onClick={() => trackCta(secondaryLabel, 'cta_band', secondaryHref)}
                className="btn btn-outline"
              >
                {secondaryLabel}
              </Link>
            )}
          </div>
        </div>
      </ViewAnimator>
    </PageSection>
  );
}

/* ─── Stat strip ──────────────────────────────────────── */
export function StatStrip({ stats }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1px',
        background: 'var(--border-subtle)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
      }}
    >
      {stats.map((s, i) => (
        <ViewAnimator
          key={s.label}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
          style={{ background: 'rgba(11,15,14,0.7)', padding: '30px 22px', textAlign: 'center' }}
        >
          <div
            style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              fontWeight: 600, color: 'var(--color-primary)', lineHeight: 1, marginBottom: '10px',
            }}
          >
            {s.value}{s.suffix || ''}
          </div>
          <div
            style={{
              fontSize: '0.75rem', color: 'rgba(255,255,255,0.48)', fontFamily: 'var(--font-mono)',
              letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 1.5,
            }}
          >
            {s.label}
          </div>
        </ViewAnimator>
      ))}
    </div>
  );
}

/* ─── Two-column split with checklist ─────────────────── */
export function SplitPoints({ heading, body, points, image, reverse = false, imageAlt = '' }) {
  return (
    <div
      className="split-points"
      style={{
        display: 'grid',
        gridTemplateColumns: image ? '1fr 1fr' : '1fr',
        gap: '56px',
        alignItems: 'center',
        direction: reverse ? 'rtl' : 'ltr',
      }}
    >
      <ViewAnimator
        initial={{ opacity: 0, x: reverse ? 36 : -36 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, margin: '-10%' }}
        transition={{ duration: 0.75, ease: EASE }}
        style={{ direction: 'ltr' }}
      >
        <h2 className="text-heading-3" style={{ color: '#fff', marginBottom: '20px' }}>{heading}</h2>
        {body && (
          <p style={{ color: 'rgba(255,255,255,0.58)', lineHeight: 1.85, fontSize: '1.0313rem', marginBottom: points ? '28px' : 0 }}>
            {body}
          </p>
        )}
        {points && (
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {points.map((p) => (
              <li key={p} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <span
                  style={{
                    flexShrink: 0, marginTop: '7px', width: '6px', height: '6px',
                    borderRadius: '50%', background: 'var(--color-primary)',
                    boxShadow: '0 0 10px rgba(34,197,94,0.55)',
                  }}
                />
                <span style={{ color: 'rgba(255,255,255,0.62)', lineHeight: 1.75, fontSize: '0.9688rem' }}>{p}</span>
              </li>
            ))}
          </ul>
        )}
      </ViewAnimator>

      {image && (
        <ViewAnimator
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, margin: '-10%' }}
          transition={{ duration: 0.85, ease: EASE }}
          style={{ direction: 'ltr' }}
        >
          <div
            style={{
              position: 'relative', borderRadius: 'var(--radius-lg)',
              overflow: 'hidden', boxShadow: '0 28px 60px rgba(0,0,0,0.5)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            {/* aspect-ratio reserves the box up front, so the image
                landing cannot shove the copy beside it down the
                page — the layout-shift cause this pattern usually
                has once the padding-bottom hack is removed. */}
            <LazyImage
              src={image}
              alt={imageAlt || heading}
              ratio="100 / 78"
              radius="0"
            />
            <div
              aria-hidden="true"
              style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: 'linear-gradient(135deg, rgba(34,197,94,0.06) 0%, transparent 55%)',
              }}
            />
          </div>
        </ViewAnimator>
      )}
    </div>
  );
}

/* ─── Responsive helpers used by the pages above ──────── */
export function PageKitStyles() {
  return (
    <style>{`
      @media (max-width: 900px) {
        .split-points { grid-template-columns: 1fr !important; gap: 36px !important; direction: ltr !important; }
      }

      /* Breadcrumbs: full trail → single back link on narrow screens */
      @media (max-width: 640px) {
        .mc-breadcrumbs__full { display: none !important; }
        .mc-breadcrumbs__back { display: inline-flex !important; }
      }

      /* A breadcrumb is navigation; it is not part of the article. */
      @media print {
        .mc-breadcrumbs { display: none !important; }
      }
    `}</style>
  );
}
