import { useState } from 'react';
import { motion } from 'framer-motion';
import { ViewAnimator } from '../utils/useInViewLenis';
import { staggerDelay } from '../utils/motion';
import { Eyebrow } from './PageKit';
import { trackVideoPlay } from '../utils/analytics';

/* ═══════════════════════════════════════════════════════════
   WORK KIT

   A portfolio grid treats every project as interchangeable —
   nine thumbnails, nine equal claims on attention, and the
   visitor leaves knowing you have "done websites".

   These are case rows instead: one project per full-width band,
   alternating side, each carrying the facts a prospect actually
   evaluates — year, industry, what was in scope, and what
   changed as a result. The live link is the proof.
   ═══════════════════════════════════════════════════════════ */

const EASE = [0.16, 1, 0.3, 1];

export function CaseRow({ project, index }) {
  const [h, setH] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const reverse = index % 2 === 1;
  const live = Boolean(project.url);

  const Media = (
    <div
      style={{
        position: 'relative',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        border: `1px solid ${h ? 'rgba(34,197,94,0.3)' : 'var(--border-subtle)'}`,
        boxShadow: h ? '0 34px 76px rgba(0,0,0,0.58)' : '0 12px 40px rgba(0,0,0,0.4)',
        aspectRatio: '16 / 11',
        transition: 'border-color 0.4s ease, box-shadow 0.5s var(--ease-out-expo)',
      }}
    >
      {project.video && !videoFailed ? (
        <>
          {/* The poster is painted as a real background layer rather
              than relying on the <video poster> attribute alone —
              Safari drops the poster the instant metadata arrives,
              leaving a black rectangle until the first frame decodes.
              This one stays until the video is playable. */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              backgroundImage: `url(${project.image})`,
              backgroundSize: 'cover', backgroundPosition: 'center',
              opacity: videoReady ? 0 : 1,
              transition: 'opacity 0.8s var(--ease-out-expo)',
            }}
          />
          {!videoReady && (
            <div
              aria-hidden="true"
              style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                pointerEvents: 'none', zIndex: 1,
              }}
            >
              <span className="mc-spinner" style={{ opacity: 0.55 }} />
            </div>
          )}
          <motion.video
            autoPlay loop muted playsInline preload="metadata" poster={project.image}
            aria-label={`${project.title}, ${project.category.toLowerCase()}`}
            tabIndex={-1}
            onCanPlay={() => setVideoReady(true)}
            onPlaying={() => trackVideoPlay(project.title, 'projects_page')}
            onError={() => setVideoFailed(true)}
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
              opacity: videoReady ? 1 : 0,
              transform: h ? 'scale(1.05)' : 'scale(1)',
              transition: 'opacity 0.8s var(--ease-out-expo), transform 0.9s var(--ease-out-expo)',
            }}
          >
            <source src={project.video} type="video/mp4" />
          </motion.video>
        </>
      ) : (
        <img
          src={project.image}
          alt={`${project.title}, ${project.category.toLowerCase()}`}
          loading="lazy"
          decoding="async"
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
            transform: h ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.9s var(--ease-out-expo)',
          }}
        />
      )}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          background: h
            ? 'linear-gradient(to top, rgba(11,15,14,0.5) 0%, transparent 55%)'
            : 'linear-gradient(to top, rgba(11,15,14,0.62) 0%, transparent 55%)',
          transition: 'background 0.4s ease',
        }}
      />
      <span
        style={{
          position: 'absolute', top: '18px', left: '18px',
          fontFamily: 'var(--font-mono)', fontSize: '0.6125rem',
          letterSpacing: '0.16em', textTransform: 'uppercase',
          color: 'var(--color-accent)',
          padding: '6px 12px', borderRadius: 'var(--radius-full)',
          border: '1px solid rgba(34,197,94,0.3)', background: 'rgba(11,15,14,0.7)',
          backdropFilter: 'blur(8px)',
        }}
      >
        {project.category}
      </span>
    </div>
  );

  const Body = (
    <div>
      <div
        style={{
          display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px',
          fontFamily: 'var(--font-mono)', fontSize: '0.6875rem',
          letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 600,
            color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.28)',
            letterSpacing: '-0.02em', textTransform: 'none',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <span style={{ height: '1px', width: '32px', background: 'var(--color-primary)', opacity: 0.6 }} />
        {project.year} · {project.industry}
      </div>

      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.5rem, 2.6vw, 2.125rem)',
          fontWeight: 600, lineHeight: 1.16, letterSpacing: '-0.025em',
          color: '#fff', marginBottom: '16px',
        }}
      >
        {project.title}
      </h3>

      <p style={{ color: 'rgba(255,255,255,0.62)', lineHeight: 1.8, fontSize: '0.9688rem', marginBottom: '24px' }}>
        {project.description}
      </p>

      {/* The outcome line is the only part a prospect is really
          reading for — so it gets a rule and its own colour. */}
      {project.outcome && (
        <div
          style={{
            paddingLeft: '18px', borderLeft: '2px solid var(--color-primary)',
            marginBottom: '26px',
          }}
        >
          <span
            style={{
              display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.625rem',
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--color-primary)', marginBottom: '9px',
            }}
          >
            Result
          </span>
          <p style={{ color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, fontSize: '0.9688rem' }}>
            {project.outcome}
          </p>
        </div>
      )}

      {project.scope?.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
          {project.scope.map((sc) => (
            <span
              key={sc}
              style={{
                padding: '6px 14px', borderRadius: 'var(--radius-full)',
                border: '1px solid rgba(255,255,255,0.09)', background: 'rgba(255,255,255,0.025)',
                fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)',
                fontFamily: 'var(--font-mono)', letterSpacing: '0.02em',
              }}
            >
              {sc}
            </span>
          ))}
        </div>
      )}

      {live ? (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setH(true)}
          onMouseLeave={() => setH(false)}
          onFocus={() => setH(true)}
          onBlur={() => setH(false)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            height: '48px', padding: '0 26px', borderRadius: 'var(--radius-full)',
            textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600,
            color: h ? '#04120A' : '#0B0F0E',
            background: h ? 'var(--color-primary)' : '#F4F6F5',
            boxShadow: h ? '0 12px 30px rgba(34,197,94,0.3)' : '0 4px 14px rgba(0,0,0,0.3)',
            transition: 'background 0.35s var(--ease-out-expo), box-shadow 0.35s var(--ease-out-expo), color 0.3s ease',
          }}
        >
          Visit the live site
          <motion.span animate={{ x: h ? 3 : 0 }} transition={{ duration: 0.28 }}>↗</motion.span>
        </a>
      ) : (
        <span
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            height: '48px', padding: '0 24px', borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-light)', fontSize: '0.8125rem',
            color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-mono)',
          }}
        >
          Internal project
        </span>
      )}
    </div>
  );

  return (
    <ViewAnimator
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-8%' }}
      transition={{ duration: 0.8, ease: EASE }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      className="mc-case-row"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(36px, 5vw, 72px)',
        alignItems: 'center',
        padding: 'clamp(40px, 5vw, 68px) 0',
        borderTop: index === 0 ? 'none' : '1px solid var(--border-subtle)',
      }}
    >
      {reverse ? (
        <>
          <div className="mc-case-row__body">{Body}</div>
          <div className="mc-case-row__media">{Media}</div>
        </>
      ) : (
        <>
          <div className="mc-case-row__media">{Media}</div>
          <div className="mc-case-row__body">{Body}</div>
        </>
      )}
    </ViewAnimator>
  );
}

/* ─── Capabilities ────────────────────────────────────────
   Eighteen technology chips in a row tells a prospect nothing —
   they cannot tell React from Tailwind and they should not have
   to. Grouped by what the capability does for them, with the
   tools listed underneath as evidence rather than as the point.

   Laid out as an index, not as a card grid. Six items in an
   auto-fitting grid resolve to four columns on a desktop and
   leave two dead cells sitting under the last row — the one
   thing that makes an otherwise finished page look unfinished.
   A stacked ledger cannot orphan a cell at any width, and it
   buys something a grid never had: a single vertical rhythm the
   eye can run down, with the numeral, the claim and the evidence
   each holding their own column all the way through.
───────────────────────────────────────────────────────── */
export function CapabilityGroups({ groups = [] }) {
  return (
    <div
      style={{
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        background: 'rgba(11,15,14,0.74)',
        overflow: 'hidden',
      }}
    >
      {groups.map((g, i) => (
        <CapabilityRow key={g.title} group={g} index={i} last={i === groups.length - 1} />
      ))}
    </div>
  );
}

function CapabilityRow({ group, index, last }) {
  const [h, setH] = useState(false);

  return (
    <ViewAnimator
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-4%' }}
      transition={{ duration: 0.55, delay: staggerDelay(index, 0.06, 0.3), ease: EASE }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      className="mc-cap-row"
      style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: 'clamp(56px, 6vw, 88px) minmax(0, 0.82fr) minmax(0, 1.18fr)',
        gap: 'clamp(18px, 2.4vw, 40px)',
        alignItems: 'start',
        padding: 'clamp(26px, 3vw, 40px) clamp(20px, 2.4vw, 34px)',
        borderBottom: last ? 'none' : '1px solid var(--border-subtle)',
      }}
    >
      {/* Hover wash, running left to right so it reads as the row
          lighting up from the numeral rather than as a flat fill. */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(90deg, rgba(34,197,94,0.07) 0%, rgba(34,197,94,0.02) 42%, transparent 78%)',
          opacity: h ? 1 : 0,
          transition: 'opacity 0.45s ease',
        }}
      />
      {/* Accent rail on the active row — the same device the case
          rows use for their result line, at row scale. */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px',
          background: 'var(--color-primary)',
          transformOrigin: '50% 0',
          transform: h ? 'scaleY(1)' : 'scaleY(0)',
          transition: 'transform 0.5s var(--ease-out-expo)',
        }}
      />

      <span
        className="mc-cap-row__num"
        style={{
          position: 'relative',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.5rem, 2.6vw, 2.375rem)',
          fontWeight: 600, lineHeight: 1, letterSpacing: '-0.02em',
          color: h ? 'var(--color-primary)' : 'transparent',
          WebkitTextStroke: `1px ${h ? 'rgba(34,197,94,0.5)' : 'rgba(255,255,255,0.24)'}`,
          transition: 'color 0.4s ease, -webkit-text-stroke-color 0.4s ease',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <h3
        style={{
          position: 'relative',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.0625rem, 1.55vw, 1.375rem)',
          fontWeight: 600, color: '#fff', lineHeight: 1.28, letterSpacing: '-0.015em',
          transform: h ? 'translateX(4px)' : 'none',
          transition: 'transform 0.45s var(--ease-out-expo)',
        }}
      >
        {group.title}
      </h3>

      <div style={{ position: 'relative' }}>
        <p style={{ fontSize: '0.9063rem', color: 'rgba(255,255,255,0.56)', lineHeight: 1.75, marginBottom: '18px' }}>
          {group.desc}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {group.tools.map((t) => (
            <span
              key={t}
              style={{
                padding: '4px 11px', borderRadius: 'var(--radius-full)',
                border: `1px solid ${h ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.08)'}`,
                background: 'rgba(255,255,255,0.02)',
                fontSize: '0.6875rem',
                color: h ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.44)',
                fontFamily: 'var(--font-mono)',
                transition: 'color 0.35s ease, border-color 0.35s ease',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </ViewAnimator>
  );
}

/* ─── Image-backed principle / value card ─────────────────
   Used on the About page. Same idea as the service cards: the
   photograph carries the feeling, the copy carries the claim.
───────────────────────────────────────────────────────── */
export function ImageCard({ item, index, minHeight = '300px' }) {
  const [h, setH] = useState(false);

  return (
    <ViewAnimator
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-6%' }}
      transition={{ duration: 0.62, delay: staggerDelay(index % 3, 0.09, 0.28), ease: EASE }}
      style={{ height: '100%' }}
    >
      <div
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          height: '100%', minHeight,
          padding: 'clamp(24px, 2.6vw, 32px)',
          borderRadius: 'var(--radius-xl)', overflow: 'hidden', isolation: 'isolate',
          border: `1px solid ${h ? 'rgba(34,197,94,0.3)' : 'var(--border-subtle)'}`,
          boxShadow: h ? '0 26px 58px rgba(0,0,0,0.5)' : '0 6px 24px rgba(0,0,0,0.32)',
          transform: h ? 'translateY(-5px)' : 'none',
          transition: 'transform 0.45s var(--ease-out-expo), box-shadow 0.45s var(--ease-out-expo), border-color 0.35s ease',
        }}
      >
        <span
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, zIndex: -2,
            backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center',
            transform: h ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.9s var(--ease-out-expo)',
          }}
        />
        <span
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, zIndex: -1,
            background: h
              ? 'linear-gradient(to top, rgba(11,15,14,0.96) 16%, rgba(11,15,14,0.74) 62%, rgba(34,197,94,0.13) 100%)'
              : 'linear-gradient(to top, rgba(11,15,14,0.96) 16%, rgba(11,15,14,0.82) 62%, rgba(11,15,14,0.5) 100%)',
            transition: 'background 0.45s ease',
          }}
        />

        <span
          aria-hidden="true"
          style={{
            position: 'absolute', top: '20px', left: '22px',
            fontFamily: 'var(--font-mono)', fontSize: '0.6875rem',
            letterSpacing: '0.1em',
            color: h ? 'var(--color-accent)' : 'rgba(255,255,255,0.4)',
            transition: 'color 0.3s ease',
          }}
        >
          {item.label || String(index + 1).padStart(2, '0')}
        </span>

        <h3
          style={{
            fontFamily: 'var(--font-display)', fontSize: '1.1875rem', fontWeight: 600,
            color: '#fff', marginBottom: '10px', lineHeight: 1.3,
          }}
        >
          {item.title}
        </h3>
        <p style={{ fontSize: '0.9063rem', color: 'rgba(255,255,255,0.64)', lineHeight: 1.72 }}>
          {item.desc}
        </p>
      </div>
    </ViewAnimator>
  );
}

export function WorkKitStyles() {
  return (
    <style>{`
      /* ─── Sector matrix ───────────────────────────────────
         Fixed columns, not auto-fit: eight cells divide cleanly
         by four, two and one, so the block is a filled rectangle
         at every width instead of a five-across row with three
         empty slots trailing it. The 1px gap is the hairline
         rule — the container behind it supplies the colour. */
      .mc-sector-grid {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 1px;
      }

      @media (max-width: 1040px) {
        .mc-sector-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      }

      @media (max-width: 560px) {
        .mc-sector-grid { grid-template-columns: minmax(0, 1fr); }
      }

      /* ─── Capability ledger ───────────────────────────────
         Three columns need roughly 900px before the middle one
         stops setting two-word lines. Below that the numeral
         keeps its gutter and the claim sits on top of its own
         evidence, which is the reading order anyway. */
      @media (max-width: 980px) {
        .mc-cap-row {
          grid-template-columns: clamp(40px, 7vw, 56px) minmax(0, 1fr) !important;
          gap: 12px 16px !important;
        }
        .mc-cap-row > h3  { grid-column: 2 !important; grid-row: 1 !important; }
        .mc-cap-row > div { grid-column: 2 !important; grid-row: 2 !important; }
      }

      /* ─── Principle mosaic ────────────────────────────────
         Six cards in an auto-fitting grid land as four-plus-two
         and leave a hole in the bottom row. A fixed twelve-column
         bed with mirrored 5/4/3 spans fills the block exactly at
         every breakpoint, and the widths changing down the page
         is what stops six equal rectangles reading as a table. */
      .mc-principle-grid {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        gap: 20px;
      }
      .mc-principle-cell--5 { grid-column: span 5; }
      .mc-principle-cell--4 { grid-column: span 4; }
      .mc-principle-cell--3 { grid-column: span 3; }

      @media (max-width: 1100px) {
        .mc-principle-grid > * { grid-column: span 6 !important; }
      }

      @media (max-width: 640px) {
        .mc-principle-grid { gap: 16px; }
        .mc-principle-grid > * { grid-column: span 12 !important; }
      }

      @media (max-width: 900px) {
        .mc-case-row { grid-template-columns: 1fr !important; gap: 28px !important; }
        /* On one column the image always leads, whatever the row index —
           an alternating layout that alternates nothing just looks random. */
        .mc-case-row__media { order: 1; }
        .mc-case-row__body  { order: 2; }
      }

      @media (max-width: 1024px) {
        .mc-service-grid { grid-template-columns: repeat(2, 1fr) !important; }
        .mc-service-card--wide { grid-column: span 2 !important; }
      }

      @media (max-width: 680px) {
        .mc-service-grid { grid-template-columns: 1fr !important; }
        .mc-service-card--wide { grid-column: span 1 !important; }
      }
    `}</style>
  );
}
