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

function PostCard({ post, index, featured = false, query = '' }) {
  const [h, setH] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

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
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          textDecoration: 'none',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          border: `1px solid ${h ? 'rgba(34,197,94,0.26)' : 'var(--border-subtle)'}`,
          background: h ? 'rgba(31,41,55,0.4)' : 'rgba(31,41,55,0.22)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: h
            ? '0 20px 50px rgba(0,0,0,0.45), 0 0 42px rgba(34,197,94,0.07)'
            : '0 4px 20px rgba(0,0,0,0.3)',
          transform: h ? 'translateY(-5px)' : 'translateY(0)',
          transition: 'all 0.35s var(--ease-out-expo)',
        }}
      >
        {/* Cover */}
        <div
          style={{
            position: 'relative',
            paddingBottom: featured ? '52%' : '56%',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, rgba(34,197,94,0.1), rgba(11,15,14,0.9))',
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
                transform: h ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 0.7s var(--ease-out-expo), opacity 0.6s var(--ease-out-expo)',
              }}
            />
          )}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(11,15,14,0.85) 0%, rgba(11,15,14,0.15) 60%, transparent 100%)',
            }}
          />
          <span
            style={{
              position: 'absolute', left: '18px', bottom: '16px',
              fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: 'var(--color-primary)',
              padding: '6px 12px', borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(34,197,94,0.28)',
              background: 'rgba(11,15,14,0.72)',
              backdropFilter: 'blur(8px)',
            }}
          >
            {post.category}
          </span>
        </div>

        {/* Body */}
        <div style={{ padding: featured ? '30px 30px 26px' : '26px 24px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: featured ? '1.375rem' : '1.125rem',
              fontWeight: 600, lineHeight: 1.32,
              color: h ? 'var(--color-primary)' : '#fff',
              marginBottom: '12px',
              transition: 'color 0.3s ease',
            }}
          >
            <Highlight text={post.title} query={query} />
          </h3>
          <p
            style={{
              fontSize: '0.9063rem', color: 'rgba(255,255,255,0.52)',
              lineHeight: 1.7, flex: 1, marginBottom: '20px',
            }}
          >
            <Highlight text={post.excerpt} query={query} />
          </p>
          <div
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              gap: '12px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)',
            }}
          >
            <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.48)', fontFamily: 'var(--font-mono)' }}>
              {post.dateLabel} · {post.readTime}
            </span>
            <motion.span
              animate={{ x: h ? 4 : 0 }}
              transition={{ duration: 0.25 }}
              style={{ color: 'var(--color-primary)', fontSize: '0.8125rem', fontWeight: 600, whiteSpace: 'nowrap' }}
            >
              Read →
            </motion.span>
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
                Honest, detailed writing on websites, custom software, branding and local visibility —
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
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
