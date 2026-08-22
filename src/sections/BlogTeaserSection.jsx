import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FadeIn } from '../components/TextReveal';
import { ViewAnimator } from '../utils/useInViewLenis';
import useLazyBackground from '../utils/useLazyBackground';
import { POSTS } from '../data/blog';
import { EASE, staggerDelay } from '../utils/motion';

/* Escape anything the visitor typed before it reaches a RegExp —
   a search for "C++" or "(2026)" would otherwise throw. */
function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/* Wraps search matches in <mark> so a result explains *why* it
   matched. Returns the plain string when there is no query, so
   the non-search path allocates nothing. */
function Highlight({ text, query }) {
  const parts = useMemo(() => {
    const q = (query || '').trim();
    if (!q || q.length < 2) return null;
    try {
      return String(text).split(new RegExp(`(${escapeRe(q)})`, 'ig'));
    } catch {
      return null;
    }
  }, [text, query]);

  if (!parts) return text;

  const lower = query.trim().toLowerCase();
  return parts.map((part, i) =>
    part.toLowerCase() === lower ? (
      <mark
        key={i}
        style={{
          background: 'rgba(34,197,94,0.22)',
          color: 'var(--color-accent)',
          borderRadius: '3px',
          padding: '0 2px',
        }}
      >
        {part}
      </mark>
    ) : (
      part
    )
  );
}

/* ── Icons ───────────────────────────────────────────────
   The project ships no icon library on purpose (every KB in the
   bundle is a KB of Core Web Vitals). These are 1.1KB of inline
   SVG that inherit currentColor, so they re-theme for free. */
function IconCalendar({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </svg>
  );
}

function IconClock({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 2" />
    </svg>
  );
}

function IconArrowUpRight({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

/* ── PostCard ─────────────────────────────────────────────
   Structure, top to bottom: framed cover image (the card pads
   around it so the image reads as an inset plate, not a header
   band), category + read-time chips floating on the image,
   then title, excerpt, a compact meta line, and a full-width
   CTA pill paired with a circular action button.

   Why the pill: the previous card ended in a "Read →" text link,
   which is the single most-ignored element on a card. A solid,
   full-width pill gives the card an unambiguous action target,
   raises perceived click affordance on mobile (where hover states
   do not exist at all), and is the only element on the card that
   turns brand-green — so the accent means "this is the action"
   rather than decorating six things at once. */
function PostCard({ post, index, featured = false, query = '' }) {
  const [h, setH] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  const pad = featured ? 12 : 10;   /* frame around the cover image */
  const bodyPad = featured ? 22 : 18;

  return (
    <ViewAnimator
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-8%' }}
      transition={{ duration: 0.65, delay: staggerDelay(index, 0.09, 0.45), ease: EASE }}
      style={{ height: '100%' }}
    >
      <Link
        to={`/blog/${post.slug}`}
        aria-label={`Read article: ${post.title}`}
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        onFocus={() => setH(true)}
        onBlur={() => setH(false)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          textDecoration: 'none',
          padding: `${pad}px`,
          borderRadius: 'var(--radius-xl)',
          border: `1px solid ${h ? 'rgba(34,197,94,0.32)' : 'var(--border-subtle)'}`,
          background: h
            ? 'linear-gradient(180deg, rgba(31,41,55,0.62) 0%, rgba(11,15,14,0.86) 100%)'
            : 'linear-gradient(180deg, rgba(31,41,55,0.34) 0%, rgba(11,15,14,0.72) 100%)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          boxShadow: h
            ? '0 26px 60px rgba(0,0,0,0.5), 0 0 48px rgba(34,197,94,0.09), inset 0 1px 0 rgba(255,255,255,0.06)'
            : '0 6px 24px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.04)',
          transform: h ? 'translateY(-6px)' : 'translateY(0)',
          transition: 'transform 0.45s var(--ease-out-expo), box-shadow 0.45s var(--ease-out-expo), border-color 0.35s ease, background 0.45s ease',
        }}
      >
        {/* ── Cover plate ── */}
        <div
          style={{
            position: 'relative',
            paddingBottom: featured ? '58%' : '66%',
            overflow: 'hidden',
            borderRadius: 'var(--radius-lg)',
            background: 'linear-gradient(135deg, rgba(34,197,94,0.12), rgba(11,15,14,0.9))',
            /* isolation keeps the image's scale transform from bleeding
               over the rounded corners in Safari */
            isolation: 'isolate',
          }}
        >
          {/* Blur wash sits under the image and clears as it lands,
              so the card never shows a hard empty rectangle. */}
          <span
            aria-hidden="true"
            className={imgLoaded || imgFailed ? '' : 'mc-img-shimmer'}
            style={{
              position: 'absolute', inset: 0,
              opacity: imgLoaded ? 0 : 1,
              transition: 'opacity 0.6s var(--ease-out-expo)',
              pointerEvents: 'none',
            }}
          />
          {!imgFailed && (
            <img
              src={post.image}
              alt={post.imageAlt || post.title}
              loading="lazy"
              decoding="async"
              onLoad={() => setImgLoaded(true)}
              onError={() => { setImgFailed(true); setImgLoaded(true); }}
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                objectFit: 'cover',
                opacity: imgLoaded ? 1 : 0,
                transform: h ? 'scale(1.06)' : 'scale(1)',
                transition: 'transform 0.9s var(--ease-out-expo), opacity 0.6s var(--ease-out-expo)',
              }}
            />
          )}

          {/* Scrim: top only, and only strong enough to hold the chips.
              The old card darkened the bottom 60% of every image for a
              caption that no longer sits there. */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute', inset: 0,
              background:
                'linear-gradient(to bottom, rgba(11,15,14,0.62) 0%, rgba(11,15,14,0.12) 34%, transparent 62%, rgba(11,15,14,0.28) 100%)',
            }}
          />

          {/* Chip row floating on the image */}
          <div
            style={{
              position: 'absolute', top: '12px', left: '12px', right: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.6125rem',
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: h ? '#04120A' : 'var(--color-accent)',
                padding: '6px 11px', borderRadius: 'var(--radius-full)',
                border: `1px solid ${h ? 'var(--color-primary)' : 'rgba(34,197,94,0.32)'}`,
                background: h ? 'var(--color-primary)' : 'rgba(11,15,14,0.66)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                transition: 'background 0.35s ease, color 0.35s ease, border-color 0.35s ease',
              }}
            >
              {post.category}
            </span>

            <span
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                fontFamily: 'var(--font-mono)', fontSize: '0.6125rem',
                letterSpacing: '0.06em',
                color: 'rgba(255,255,255,0.86)',
                padding: '6px 10px', borderRadius: 'var(--radius-full)',
                border: '1px solid rgba(255,255,255,0.14)',
                background: 'rgba(11,15,14,0.6)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                whiteSpace: 'nowrap',
              }}
            >
              <IconClock size={12} />
              {String(post.readTime || '').replace(' read', '')}
            </span>
          </div>
        </div>

        {/* ── Body ── */}
        <div
          style={{
            padding: `${bodyPad + 2}px ${bodyPad - 4}px ${bodyPad - 8}px`,
            display: 'flex', flexDirection: 'column', flex: 1,
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: featured ? '1.4375rem' : '1.1563rem',
              fontWeight: 600, lineHeight: 1.3,
              letterSpacing: '-0.01em',
              color: h ? 'var(--color-accent)' : '#fff',
              marginBottom: '10px',
              transition: 'color 0.3s ease',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            <Highlight text={post.title} query={query} />
          </h3>

          <p
            style={{
              fontSize: '0.875rem',
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.65,
              marginBottom: '16px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            <Highlight text={post.excerpt} query={query} />
          </p>

          {/* Meta line — pushed to the bottom so every card in a row
              lines its CTA up on the same baseline regardless of how
              long the title runs. */}
          <div
            style={{
              marginTop: 'auto',
              display: 'flex', alignItems: 'center', gap: '14px',
              fontFamily: 'var(--font-mono)', fontSize: '0.6875rem',
              letterSpacing: '0.04em',
              color: 'rgba(255,255,255,0.46)',
              marginBottom: '16px',
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: 'var(--color-primary)', display: 'inline-flex' }}><IconCalendar /></span>
              {post.dateLabel}
            </span>
            <span aria-hidden="true" style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(255,255,255,0.24)' }} />
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: 'var(--color-primary)', display: 'inline-flex' }}><IconClock /></span>
              {post.readTime}
            </span>
          </div>

          {/* ── Action row ──
              Presentational only: the whole card is already the link,
              so nesting a real <button> here would be invalid markup
              and would double the tab stops on the blog index. */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              aria-hidden="true"
              style={{
                flex: 1,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                height: '46px', borderRadius: 'var(--radius-full)',
                fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 600,
                letterSpacing: '0.01em',
                color: h ? '#04120A' : '#0B0F0E',
                background: h ? 'var(--color-primary)' : '#F4F6F5',
                boxShadow: h
                  ? '0 10px 28px rgba(34,197,94,0.28)'
                  : '0 4px 14px rgba(0,0,0,0.28)',
                transition: 'background 0.35s var(--ease-out-expo), box-shadow 0.35s var(--ease-out-expo), color 0.35s ease',
              }}
            >
              Read article
              <motion.span
                animate={{ x: h ? 3 : 0 }}
                transition={{ duration: 0.28, ease: EASE }}
                style={{ display: 'inline-flex' }}
              >
                <IconArrowUpRight size={15} />
              </motion.span>
            </span>

            <span
              aria-hidden="true"
              style={{
                width: '46px', height: '46px', flexShrink: 0,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '50%',
                border: `1px solid ${h ? 'rgba(34,197,94,0.45)' : 'rgba(255,255,255,0.12)'}`,
                background: h ? 'rgba(34,197,94,0.12)' : 'rgba(255,255,255,0.04)',
                color: h ? 'var(--color-accent)' : 'rgba(255,255,255,0.65)',
                transition: 'all 0.35s var(--ease-out-expo)',
              }}
            >
              <IconArrowUpRight size={17} />
            </span>
          </div>
        </div>
      </Link>
    </ViewAnimator>
  );
}

export default function BlogTeaserSection() {
  const bgRef = useLazyBackground('/images/backgrounds/blog-bg.webp');
  const posts = POSTS.slice(0, 3);

  return (
    <section
      id="insights"
      style={{ position: 'relative', background: 'var(--bg)', padding: 'var(--space-5xl) 0', overflow: 'hidden' }}
    >
      <div
        ref={bgRef}
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(to bottom, var(--bg) 0%, transparent 30%, transparent 70%, var(--bg) 100%)',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div
          className="blog-teaser-head"
          style={{
            display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            gap: '32px', marginBottom: '56px', flexWrap: 'wrap',
          }}
        >
          <div style={{ maxWidth: '620px' }}>
            <FadeIn>
              <div className="pill" style={{ marginBottom: '22px' }}>
                <span className="pill-dot" />INSIGHTS & RESOURCES
              </div>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h2 className="text-heading-2" style={{ color: '#fff', marginBottom: '16px' }}>
                Practical guides that{' '}
                <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'rgba(255,255,255,0.55)' }}>
                  actually help
                </span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.14}>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1.0313rem', lineHeight: 1.75 }}>
                Honest, detailed writing on websites, custom software, branding and local visibility,
                including the parts most agencies would rather not explain.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <Link
              to="/blog"
              className="btn btn-outline"
              style={{ whiteSpace: 'nowrap' }}
            >
              View all articles →
            </Link>
          </FadeIn>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(316px, 1fr))',
            gap: '26px',
          }}
        >
          {posts.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .blog-teaser-head { flex-direction: column; align-items: flex-start; gap: 24px; }
        }
      `}</style>
    </section>
  );
}

export { PostCard };
