import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Rich, { Paragraphs } from './Rich';
import { Eyebrow, PageSection, SectionHeading } from './PageKit';
import { FadeIn } from './TextReveal';
import { ViewAnimator } from '../utils/useInViewLenis';
import { staggerDelay } from '../utils/motion';

/* ═══════════════════════════════════════════════════════════
   SERVICE KIT

   The blocks that make up a service page. They were previously
   assembled inline inside ServiceDetailPage from generic PageKit
   primitives, which is why all six service pages read the same:
   the same glass card in six different colours of nothing.

   Everything here takes its imagery from the service's `media`
   object, so a new service page is a data entry, not a rewrite.
   ═══════════════════════════════════════════════════════════ */

const EASE = [0.16, 1, 0.3, 1];

/* ─── Problem: copy left, evidence card right ─────────────
   The right-hand card carries the cost of inaction. It gets a
   photograph behind it at low opacity because a list of four
   failures on flat glass reads like a feature list — the image
   is what makes it land as a situation the reader recognises.
───────────────────────────────────────────────────────── */
export function ProblemBlock({ eyebrow = 'The problem', heading, body, points, image, cardTitle = 'What it is costing you' }) {
  return (
    <div
      className="split-points"
      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}
    >
      <ViewAnimator
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, margin: '-10%' }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="text-heading-2" style={{ color: '#fff', marginBottom: '24px', letterSpacing: '-0.025em' }}>
          {heading}
        </h2>
        <Paragraphs
          text={body}
          style={{ color: 'rgba(255,255,255,0.68)', lineHeight: 1.9, fontSize: '1.0625rem' }}
        />
      </ViewAnimator>

      <ViewAnimator
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, margin: '-10%' }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <div
          style={{
            position: 'relative', overflow: 'hidden', isolation: 'isolate',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid rgba(239,68,68,0.16)',
            boxShadow: '0 30px 70px rgba(0,0,0,0.5)',
            padding: 'clamp(30px, 3.4vw, 44px)',
          }}
        >
          {image && (
            <span
              aria-hidden="true"
              style={{
                position: 'absolute', inset: 0, zIndex: -2,
                backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center',
                opacity: 0.22,
              }}
            />
          )}
          <span
            aria-hidden="true"
            style={{
              position: 'absolute', inset: 0, zIndex: -1,
              background:
                'linear-gradient(155deg, rgba(11,15,14,0.9) 0%, rgba(24,12,12,0.82) 55%, rgba(45,14,14,0.72) 100%)',
              backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)',
            }}
          />

          <p
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'rgba(248,113,113,0.9)', marginBottom: '26px',
              display: 'flex', alignItems: 'center', gap: '12px',
            }}
          >
            <span style={{ height: '1px', width: '26px', background: 'rgba(248,113,113,0.55)' }} />
            {cardTitle}
          </p>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0' }}>
            {points.map((p, i) => (
              <li
                key={p}
                style={{
                  display: 'flex', gap: '16px', alignItems: 'flex-start',
                  padding: '18px 0',
                  borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    flexShrink: 0, marginTop: '2px',
                    fontFamily: 'var(--font-mono)', fontSize: '0.6875rem',
                    color: 'rgba(248,113,113,0.75)', letterSpacing: '0.06em',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <Rich
                  as="span"
                  text={p}
                  style={{ color: 'rgba(255,255,255,0.74)', lineHeight: 1.68, fontSize: '0.9688rem' }}
                />
              </li>
            ))}
          </ul>
        </div>
      </ViewAnimator>
    </div>
  );
}

/* ─── Approach: full-viewport statement ───────────────────
   Given the whole screen and a photograph, because this is the
   one block on the page that has to be believed rather than
   scanned. Three pillars underneath carry the "how".
───────────────────────────────────────────────────────── */
export function ApproachSection({ eyebrow = 'Our approach', heading, body, pillars = [], image, quote }) {
  return (
    <section
      style={{
        position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center',
        background: 'var(--bg)', overflow: 'hidden', padding: 'clamp(90px, 12vh, 140px) 0',
      }}
    >
      {image && (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, zIndex: 0,
            backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center',
            opacity: 0.3,
          }}
        />
      )}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background:
            'linear-gradient(to right, rgba(11,15,14,0.96) 0%, rgba(11,15,14,0.82) 48%, rgba(11,15,14,0.55) 100%)',
        }}
      />
      <span
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(to bottom, var(--bg) 0%, transparent 22%, transparent 78%, var(--bg) 100%)',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '860px' }}>
          <FadeIn><Eyebrow>{eyebrow}</Eyebrow></FadeIn>
          <FadeIn delay={0.08}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4.4vw, 3.5rem)',
                fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.03em',
                color: '#fff', marginBottom: '28px',
              }}
            >
              {heading}
            </h2>
          </FadeIn>
          <FadeIn delay={0.14}>
            <Paragraphs
              text={body}
              style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.95, fontSize: 'clamp(1rem, 1.3vw, 1.125rem)', maxWidth: '760px' }}
            />
          </FadeIn>
        </div>

        {pillars.length > 0 && (
          <div
            className="mc-pillars"
            style={{
              display: 'grid', gridTemplateColumns: `repeat(${Math.min(pillars.length, 3)}, 1fr)`,
              gap: '1px', marginTop: 'clamp(48px, 6vh, 72px)',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 'var(--radius-lg)', overflow: 'hidden',
            }}
          >
            {pillars.map((p, i) => (
              <ViewAnimator
                key={p.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '-6%' }}
                transition={{ duration: 0.6, delay: staggerDelay(i, 0.1, 0.3), ease: EASE }}
                style={{ background: 'rgba(11,15,14,0.72)', backdropFilter: 'blur(14px)', padding: 'clamp(24px, 2.6vw, 34px)' }}
              >
                <span
                  style={{
                    display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.6875rem',
                    letterSpacing: '0.18em', color: 'var(--color-primary)', marginBottom: '14px',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.0625rem', fontWeight: 600, color: '#fff', marginBottom: '10px', lineHeight: 1.35 }}>
                  {p.title}
                </h3>
                <Rich as="p" text={p.desc} style={{ fontSize: '0.9063rem', color: 'rgba(255,255,255,0.58)', lineHeight: 1.72 }} />
              </ViewAnimator>
            ))}
          </div>
        )}

        {quote && (
          <FadeIn delay={0.2}>
            <p
              style={{
                marginTop: 'clamp(40px, 5vh, 60px)', maxWidth: '680px',
                paddingLeft: '22px', borderLeft: '2px solid var(--color-primary)',
                fontFamily: 'var(--font-display)', fontSize: 'clamp(1.0625rem, 1.6vw, 1.375rem)',
                fontStyle: 'italic', fontWeight: 400, lineHeight: 1.55, color: 'rgba(255,255,255,0.82)',
              }}
            >
              {quote}
            </p>
          </FadeIn>
        )}
      </div>
    </section>
  );
}

/* ─── Tech stack: logo, role, and how we actually use it ──
   A row of pills naming eight technologies proves nothing — every
   agency lists the same eight. What a prospect can evaluate is
   why each one is in the stack, which is what this block says.
───────────────────────────────────────────────────────── */
export function TechStack({ items = [], eyebrow = 'Tools & technology', title, accent, subtitle }) {
  return (
    <PageSection tint>
      <SectionHeading eyebrow={eyebrow} title={title} accent={accent} subtitle={subtitle} />
      <div
        style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1px', background: 'var(--border-subtle)',
          border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden',
        }}
      >
        {items.map((t, i) => (
          <TechCell key={t.name} tech={t} index={i} />
        ))}
      </div>
    </PageSection>
  );
}

function TechCell({ tech, index }) {
  const [h, setH] = useState(false);

  return (
    <ViewAnimator
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-5%' }}
      transition={{ duration: 0.5, delay: staggerDelay(index % 3, 0.07, 0.21), ease: EASE }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: h ? 'rgba(31,41,55,0.44)' : 'rgba(11,15,14,0.7)',
        padding: '30px 28px',
        transition: 'background 0.32s ease',
        height: '100%',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '18px' }}>
        <span
          style={{
            width: '52px', height: '52px', flexShrink: 0,
            borderRadius: 'var(--radius-md)',
            border: `1px solid ${h ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.09)'}`,
            background: 'rgba(255,255,255,0.03)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
            transition: 'border-color 0.32s ease, transform 0.4s var(--ease-out-expo)',
            transform: h ? 'translateY(-2px)' : 'none',
          }}
        >
          {/* The 3D logo renders here. Until it exists the monogram
              keeps the grid aligned rather than collapsing the row. */}
          <img
            src={tech.logo}
            alt={`${tech.name} logo`}
            loading="lazy"
            decoding="async"
            onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'flex'; }}
            style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '9px' }}
          />
          <span
            aria-hidden="true"
            style={{
              display: 'none', alignItems: 'center', justifyContent: 'center',
              width: '100%', height: '100%',
              fontFamily: 'var(--font-display)', fontSize: '1.0625rem', fontWeight: 600,
              color: 'var(--color-primary)',
            }}
          >
            {tech.name.slice(0, 2)}
          </span>
        </span>

        <div style={{ minWidth: 0 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.0625rem', fontWeight: 600, color: '#fff', lineHeight: 1.3 }}>
            {tech.name}
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'var(--color-primary)', marginTop: '5px',
            }}
          >
            {tech.role}
          </p>
        </div>
      </div>

      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '9px' }}>
        {tech.points.map((p) => (
          <li key={p} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <span aria-hidden="true" style={{ color: 'var(--color-primary)', opacity: 0.7, fontSize: '0.75rem', marginTop: '3px' }}>→</span>
            <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem', lineHeight: 1.62 }}>{p}</span>
          </li>
        ))}
      </ul>
    </ViewAnimator>
  );
}

/* ─── Local reach ─────────────────────────────────────────
   Local intent is a real search behaviour ("web design company
   near me"), so this block does double duty: it answers the
   trust question a local buyer has, and it is the internal-link
   hub for the city landing pages.
───────────────────────────────────────────────────────── */
export function LocalReach({ heading, body, points = [], cities = [], linkFor, linkLabel, image, stat }) {
  return (
    <section style={{ position: 'relative', background: 'var(--bg)', padding: 'var(--space-4xl) 0', overflow: 'hidden' }}>
      {image && (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, zIndex: 0,
            backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center right',
            opacity: 0.52,
            /* These are golden-hour frames; the lift keeps the warmth
               from going muddy once the mask sits on top of it. */
            filter: 'saturate(1.12) brightness(1.14)',
          }}
        />
      )}
      {/* The copy sits in the left column, so the mask stays heavy there
          and opens up on the right — the photograph is meant to be seen,
          not buried under another sheet of black. */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(105deg, var(--bg) 0%, rgba(11,15,14,0.88) 40%, rgba(11,15,14,0.3) 100%)',
        }}
      />
      <span
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(to bottom, var(--bg) 0%, transparent 18%, transparent 82%, var(--bg) 100%)',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="split-points" style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: '60px', alignItems: 'center' }}>
          <ViewAnimator
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-10%' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <Eyebrow>Where we work</Eyebrow>
            <h2 className="text-heading-2" style={{ color: '#fff', marginBottom: '22px', letterSpacing: '-0.025em' }}>
              {heading}
            </h2>
            <Rich as="p" text={body} style={{ color: 'rgba(255,255,255,0.66)', lineHeight: 1.88, fontSize: '1.0313rem', marginBottom: '30px' }} />

            <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="mc-local-points">
              {points.map((p) => (
                <li key={p} style={{ display: 'flex', gap: '11px', alignItems: 'flex-start' }}>
                  <span
                    aria-hidden="true"
                    style={{
                      flexShrink: 0, marginTop: '3px', width: '17px', height: '17px', borderRadius: '50%',
                      border: '1px solid rgba(34,197,94,0.4)', color: 'var(--color-primary)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.5625rem',
                    }}
                  >
                    ✓
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.62)', lineHeight: 1.6, fontSize: '0.9063rem' }}>{p}</span>
                </li>
              ))}
            </ul>
          </ViewAnimator>

          <ViewAnimator
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-10%' }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          >
            <div
              style={{
                borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-subtle)',
                background: 'rgba(11,15,14,0.62)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
                padding: 'clamp(26px, 3vw, 38px)', boxShadow: '0 28px 64px rgba(0,0,0,0.45)',
              }}
            >
              {stat && (
                <div style={{ marginBottom: '26px', paddingBottom: '24px', borderBottom: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', fontWeight: 600, color: 'var(--color-primary)', lineHeight: 1 }}>
                    {stat.value}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.48)', marginTop: '10px' }}>
                    {stat.label}
                  </div>
                </div>
              )}

              <p
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.16em',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,0.44)', marginBottom: '18px',
                }}
              >
                Serving these cities
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {cities.map((c) => (
                  <Link
                    key={c.slug}
                    to={linkFor(c)}
                    className="mc-city-link"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px',
                      padding: '15px 18px', borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)', background: 'rgba(255,255,255,0.02)',
                      textDecoration: 'none', transition: 'all 0.3s var(--ease-out-expo)',
                    }}
                  >
                    <span style={{ color: '#fff', fontSize: '0.9375rem', fontWeight: 500 }}>
                      {linkLabel(c)}
                    </span>
                    <span aria-hidden="true" style={{ color: 'var(--color-primary)', fontSize: '0.9375rem', flexShrink: 0 }}>↗</span>
                  </Link>
                ))}
              </div>
            </div>
          </ViewAnimator>
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ with supporting image ───────────────────────────
   The accordion moves to the right, and the left column carries
   the reassurance — a photograph plus a direct line to a human.
   The questions people open here are buying questions; the point
   of the left column is that answering them is a conversation.
───────────────────────────────────────────────────────── */
export function FaqBlock({ faqs = [], eyebrow = 'Questions', heading, image, note, ctaLabel = 'Ask us directly', ctaHref = '/contact' }) {
  const [open, setOpen] = useState(0);
  if (!faqs.length) return null;

  return (
    <PageSection style={{ paddingTop: 'var(--space-3xl)' }}>
      <div className="mc-faq-grid" style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: '56px', alignItems: 'start' }}>
        <ViewAnimator
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-8%' }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ position: 'sticky', top: '110px' }}
          className="mc-faq-aside"
        >
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="text-heading-2" style={{ color: '#fff', marginBottom: '22px', letterSpacing: '-0.025em' }}>
            {heading}
          </h2>
          {note && (
            <Rich as="p" text={note} style={{ color: 'rgba(255,255,255,0.58)', lineHeight: 1.8, fontSize: '0.9688rem', marginBottom: '28px' }} />
          )}

          {image && (
            <div
              style={{
                position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden',
                border: '1px solid var(--border-subtle)', marginBottom: '26px',
                aspectRatio: '4 / 3', boxShadow: '0 24px 56px rgba(0,0,0,0.45)',
              }}
            >
              <img
                src={image}
                alt=""
                loading="lazy"
                decoding="async"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(11,15,14,0.75) 0%, transparent 55%)',
                }}
              />
            </div>
          )}

          <Link
            to={ctaHref}
            className="btn btn-outline"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            {ctaLabel}
          </Link>
        </ViewAnimator>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <ViewAnimator
                key={f.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '-4%' }}
                transition={{ duration: 0.5, delay: staggerDelay(i, 0.05, 0.25), ease: EASE }}
              >
                <div
                  style={{
                    position: 'relative', overflow: 'hidden',
                    borderRadius: 'var(--radius-md)',
                    border: `1px solid ${isOpen ? 'rgba(34,197,94,0.26)' : 'var(--border-subtle)'}`,
                    background: isOpen ? 'rgba(34,197,94,0.04)' : 'rgba(255,255,255,0.014)',
                    transition: 'border-color 0.32s ease, background 0.32s ease',
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px',
                      background: 'var(--color-primary)',
                      transform: isOpen ? 'scaleY(1)' : 'scaleY(0)',
                      transformOrigin: 'top',
                      transition: 'transform 0.4s var(--ease-out-expo)',
                    }}
                  />
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: '18px',
                      padding: '22px 24px', background: 'none', border: 'none', cursor: 'pointer',
                      textAlign: 'left', minHeight: '60px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.08em',
                        color: isOpen ? 'var(--color-primary)' : 'rgba(255,255,255,0.32)',
                        flexShrink: 0, transition: 'color 0.3s ease',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      style={{
                        flex: 1,
                        fontFamily: 'var(--font-display)', fontSize: '1.0313rem', fontWeight: 500,
                        lineHeight: 1.45, color: isOpen ? 'var(--color-accent)' : '#fff',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {f.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      aria-hidden="true"
                      style={{
                        flexShrink: 0, width: '26px', height: '26px', borderRadius: '50%',
                        border: `1px solid ${isOpen ? 'rgba(34,197,94,0.4)' : 'rgba(255,255,255,0.12)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'var(--color-primary)', fontSize: '0.9375rem', lineHeight: 1,
                      }}
                    >
                      +
                    </motion.span>
                  </button>
                  <div
                    style={{
                      maxHeight: isOpen ? '520px' : '0px',
                      opacity: isOpen ? 1 : 0,
                      transition: 'max-height 0.45s var(--ease-out-expo), opacity 0.3s ease, padding 0.3s ease',
                      padding: isOpen ? '0 24px 24px 66px' : '0 24px 0 66px',
                      overflow: 'hidden',
                    }}
                  >
                    <Rich as="p" text={f.a} style={{ color: 'rgba(255,255,255,0.62)', lineHeight: 1.82, fontSize: '0.9688rem', maxWidth: '640px' }} />
                  </div>
                </div>
              </ViewAnimator>
            );
          })}
        </div>
      </div>
    </PageSection>
  );
}

/* ─── Related services ────────────────────────────────────
   Photograph-led, same visual language as the blog card, so a
   visitor moving between the two does not feel handed off to a
   different website.
───────────────────────────────────────────────────────── */
export function RelatedServices({ items = [], eyebrow = 'Related services', title, accent }) {
  return (
    <PageSection style={{ paddingBottom: 'var(--space-2xl)' }}>
      <SectionHeading eyebrow={eyebrow} title={title} accent={accent} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '22px' }}>
        {items.map((r, i) => (
          <RelatedCard key={r.id} service={r} index={i} />
        ))}
      </div>
    </PageSection>
  );
}

function RelatedCard({ service, index }) {
  const [h, setH] = useState(false);
  const img = service.media?.hero || service.image;

  return (
    <ViewAnimator
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-6%' }}
      transition={{ duration: 0.6, delay: staggerDelay(index, 0.09, 0.3), ease: EASE }}
      style={{ height: '100%' }}
    >
      <Link
        to={`/services/${service.slug}`}
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        onFocus={() => setH(true)}
        onBlur={() => setH(false)}
        style={{
          position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          height: '100%', minHeight: '320px', overflow: 'hidden', isolation: 'isolate',
          padding: '30px 28px', textDecoration: 'none',
          borderRadius: 'var(--radius-xl)',
          border: `1px solid ${h ? 'rgba(34,197,94,0.34)' : 'var(--border-subtle)'}`,
          boxShadow: h ? '0 26px 58px rgba(0,0,0,0.5), 0 0 44px rgba(34,197,94,0.08)' : '0 6px 24px rgba(0,0,0,0.32)',
          transform: h ? 'translateY(-6px)' : 'none',
          transition: 'transform 0.45s var(--ease-out-expo), box-shadow 0.45s var(--ease-out-expo), border-color 0.35s ease',
        }}
      >
        <span
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, zIndex: -2,
            backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center',
            transform: h ? 'scale(1.07)' : 'scale(1)',
            transition: 'transform 0.9s var(--ease-out-expo)',
          }}
        />
        <span
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, zIndex: -1,
            background: h
              ? 'linear-gradient(to top, rgba(11,15,14,0.95) 12%, rgba(11,15,14,0.72) 52%, rgba(34,197,94,0.14) 100%)'
              : 'linear-gradient(to top, rgba(11,15,14,0.95) 12%, rgba(11,15,14,0.78) 52%, rgba(11,15,14,0.42) 100%)',
            transition: 'background 0.45s ease',
          }}
        />

        <span
          style={{
            alignSelf: 'flex-start',
            fontFamily: 'var(--font-mono)', fontSize: '0.6125rem', letterSpacing: '0.16em',
            textTransform: 'uppercase', color: 'var(--color-accent)',
            padding: '6px 12px', borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(34,197,94,0.3)', background: 'rgba(11,15,14,0.6)',
            backdropFilter: 'blur(8px)', marginBottom: '18px',
          }}
        >
          {service.category}
        </span>

        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: '#fff', marginBottom: '10px', lineHeight: 1.28 }}>
          {service.title}
        </h3>
        <p style={{ fontSize: '0.9063rem', color: 'rgba(255,255,255,0.62)', lineHeight: 1.68, marginBottom: '20px' }}>
          {service.tagline}
        </p>
        <span
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '9px',
            color: h ? 'var(--color-accent)' : 'rgba(255,255,255,0.85)',
            fontSize: '0.8438rem', fontWeight: 600, transition: 'color 0.3s ease',
          }}
        >
          Explore this service
          <motion.span animate={{ x: h ? 4 : 0 }} transition={{ duration: 0.28 }}>→</motion.span>
        </span>
      </Link>
    </ViewAnimator>
  );
}

/* ─── Further reading ─────────────────────────────────────
   Numbered index rather than a stack of link rows, and it keeps
   its own top padding so it never collides with the section
   above it.
───────────────────────────────────────────────────────── */
export function FurtherReading({ posts = [], eyebrow = 'Further reading', heading = 'Worth reading before you decide' }) {
  if (!posts.length) return null;

  return (
    <PageSection tint style={{ paddingTop: 'var(--space-3xl)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '32px', flexWrap: 'wrap', marginBottom: '38px' }}>
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="text-heading-3" style={{ color: '#fff', margin: 0, maxWidth: '580px' }}>{heading}</h2>
        </div>
        <Link to="/blog" className="btn btn-outline" style={{ whiteSpace: 'nowrap' }}>All articles →</Link>
      </div>

      <div style={{ display: 'grid', gap: '10px' }}>
        {posts.map((p, i) => (
          <ReadingRow key={p.slug} post={p} index={i} />
        ))}
      </div>
    </PageSection>
  );
}

function ReadingRow({ post, index }) {
  const [h, setH] = useState(false);

  return (
    <ViewAnimator
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-4%' }}
      transition={{ duration: 0.5, delay: staggerDelay(index, 0.07, 0.21), ease: EASE }}
    >
      <Link
        to={`/blog/${post.slug}`}
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        onFocus={() => setH(true)}
        onBlur={() => setH(false)}
        className="mc-reading-row"
        style={{
          position: 'relative', display: 'grid', gridTemplateColumns: 'auto 84px 1fr auto',
          alignItems: 'center', gap: '22px', padding: '18px 22px',
          textDecoration: 'none', borderRadius: 'var(--radius-md)',
          border: `1px solid ${h ? 'rgba(34,197,94,0.24)' : 'var(--border-subtle)'}`,
          background: h ? 'rgba(34,197,94,0.045)' : 'rgba(255,255,255,0.014)',
          transition: 'all 0.32s var(--ease-out-expo)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.6875rem',
            color: h ? 'var(--color-primary)' : 'rgba(255,255,255,0.3)',
            transition: 'color 0.3s ease',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <span
          className="mc-reading-thumb"
          style={{
            width: '84px', height: '58px', borderRadius: 'var(--radius-sm)', overflow: 'hidden',
            border: '1px solid var(--border-subtle)', flexShrink: 0, display: 'block',
            background: 'linear-gradient(135deg, rgba(34,197,94,0.12), rgba(11,15,14,0.9))',
          }}
        >
          <img
            src={post.image}
            alt=""
            loading="lazy"
            decoding="async"
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transform: h ? 'scale(1.08)' : 'scale(1)',
              transition: 'transform 0.7s var(--ease-out-expo)',
            }}
          />
        </span>

        <span style={{ minWidth: 0 }}>
          <span style={{ display: 'block', color: '#fff', fontSize: '0.9688rem', fontWeight: 500, lineHeight: 1.45, marginBottom: '5px' }}>
            {post.title}
          </span>
          <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.04em' }}>
            {post.category} · {post.readTime}
          </span>
        </span>

        <motion.span
          animate={{ x: h ? 4 : 0 }}
          transition={{ duration: 0.28 }}
          style={{ color: 'var(--color-primary)', fontSize: '1rem', whiteSpace: 'nowrap' }}
        >
          →
        </motion.span>
      </Link>
    </ViewAnimator>
  );
}

/* ─── Responsive rules for the blocks above ───────────── */
export function ServiceKitStyles() {
  return (
    <style>{`
      .mc-city-link:hover,
      .mc-city-link:focus-visible {
        border-color: rgba(34,197,94,0.32) !important;
        background: rgba(34,197,94,0.07) !important;
        transform: translateX(4px);
      }

      @media (max-width: 1024px) {
        .mc-faq-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        .mc-faq-aside { position: static !important; }
        .mc-pillars { grid-template-columns: 1fr !important; }
      }

      @media (max-width: 720px) {
        .mc-local-points { grid-template-columns: 1fr !important; }
        .mc-reading-row { grid-template-columns: auto 1fr auto !important; gap: 14px !important; }
        .mc-reading-thumb { display: none !important; }
      }

      /* The rail is a swipe affordance, not a scrollbar to look at. */
      .mc-panel-rail { scrollbar-width: none; }
      .mc-panel-rail::-webkit-scrollbar { display: none; }
    `}</style>
  );
}
