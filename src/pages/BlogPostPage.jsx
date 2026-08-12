import { useMemo, useState, useEffect, useCallback } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Seo, { orgSchema, breadcrumbSchema, articleSchema, faqSchema } from '../components/Seo';
import { PageSection, CtaBand, FaqList, Breadcrumbs } from '../components/PageKit';
import { PostCard } from '../sections/BlogTeaserSection';
import { getPostBySlug, getRelatedPosts, getWordCount, getAdjacentPosts } from '../data/blog';
import { SITE, WHATSAPP_LINK } from '../data/site';
import { FadeIn } from '../components/TextReveal';
import useLazyBackground from '../utils/useLazyBackground';
import { useToast } from '../components/Toast';
import { EASE } from '../utils/motion';
import { track, trackCta } from '../utils/analytics';

/* ─── slugify for heading anchors / table of contents ─── */
const anchor = (text) =>
  String(text)
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60);

/* ─── Block renderer ──────────────────────────────────── */
function Block({ block }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2
          id={anchor(block.text)}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 2.6vw, 2rem)',
            fontWeight: 600, color: '#fff', lineHeight: 1.22,
            letterSpacing: '-0.02em',
            marginTop: '56px', marginBottom: '20px',
            scrollMarginTop: '110px',
          }}
        >
          {block.text}
        </h2>
      );

    case 'h3':
      return (
        <h3
          id={anchor(block.text)}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.1875rem, 1.8vw, 1.375rem)',
            fontWeight: 600, color: '#fff', lineHeight: 1.32,
            marginTop: '38px', marginBottom: '14px',
            scrollMarginTop: '110px',
          }}
        >
          {block.text}
        </h3>
      );

    case 'p':
      return (
        <p
          style={{
            fontSize: '1.0625rem', lineHeight: 1.85,
            color: 'rgba(255,255,255,0.68)', marginBottom: '20px',
          }}
          dangerouslySetInnerHTML={{ __html: block.text }}
        />
      );

    case 'ul':
      return (
        <ul style={{ listStyle: 'none', margin: '0 0 26px', display: 'flex', flexDirection: 'column', gap: '13px' }}>
          {block.items.map((item, i) => (
            <li key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <span
                aria-hidden="true"
                style={{
                  flexShrink: 0, marginTop: '10px', width: '6px', height: '6px', borderRadius: '50%',
                  background: 'var(--color-primary)', boxShadow: '0 0 10px rgba(34,197,94,0.5)',
                }}
              />
              <span
                style={{ fontSize: '1.0313rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.66)' }}
                dangerouslySetInnerHTML={{ __html: item }}
              />
            </li>
          ))}
        </ul>
      );

    case 'ol':
      return (
        <ol style={{ listStyle: 'none', margin: '0 0 26px', display: 'flex', flexDirection: 'column', gap: '15px', counterReset: 'mc' }}>
          {block.items.map((item, i) => (
            <li key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <span
                style={{
                  flexShrink: 0, width: '26px', height: '26px', borderRadius: '50%',
                  border: '1px solid rgba(34,197,94,0.3)', background: 'rgba(34,197,94,0.07)',
                  color: 'var(--color-primary)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '3px',
                }}
              >
                {i + 1}
              </span>
              <span
                style={{ fontSize: '1.0313rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.66)' }}
                dangerouslySetInnerHTML={{ __html: item }}
              />
            </li>
          ))}
        </ol>
      );

    case 'table':
      return (
        <div
          style={{
            margin: '0 0 30px', overflowX: 'auto',
            borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)',
            background: 'rgba(31,41,55,0.22)',
            backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '520px' }}>
            <thead>
              <tr>
                {block.head.map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: 'left', padding: '15px 18px',
                      fontFamily: 'var(--font-mono)', fontSize: '0.6875rem',
                      letterSpacing: '0.12em', textTransform: 'uppercase',
                      color: 'var(--color-primary)',
                      borderBottom: '1px solid rgba(34,197,94,0.18)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      style={{
                        padding: '15px 18px', fontSize: '0.9375rem', lineHeight: 1.6,
                        color: ci === 0 ? 'rgba(255,255,255,0.82)' : 'rgba(255,255,255,0.58)',
                        fontWeight: ci === 0 ? 500 : 400,
                        borderBottom: ri === block.rows.length - 1 ? 'none' : '1px solid var(--border-subtle)',
                      }}
                      dangerouslySetInnerHTML={{ __html: cell }}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'callout':
      return (
        <aside
          style={{
            margin: '0 0 30px', padding: '26px 28px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(34,197,94,0.2)',
            background: 'linear-gradient(135deg, rgba(34,197,94,0.07), rgba(31,41,55,0.2))',
            backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
            borderLeft: '3px solid var(--color-primary)',
          }}
        >
          {block.title && (
            <p
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.6875rem',
                letterSpacing: '0.16em', textTransform: 'uppercase',
                color: 'var(--color-primary)', marginBottom: '12px',
              }}
            >
              ✦ {block.title}
            </p>
          )}
          <p
            style={{ fontSize: '1.0313rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.78)', margin: 0 }}
            dangerouslySetInnerHTML={{ __html: block.text }}
          />
        </aside>
      );

    case 'quote':
      return (
        <blockquote
          style={{
            margin: '0 0 30px', padding: '4px 0 4px 26px',
            borderLeft: '2px solid rgba(34,197,94,0.5)',
            fontFamily: 'var(--font-display)', fontSize: '1.25rem',
            fontStyle: 'italic', lineHeight: 1.6, color: 'rgba(255,255,255,0.8)',
          }}
          dangerouslySetInnerHTML={{ __html: block.text }}
        />
      );

    case 'cta':
      return (
        <div
          style={{
            margin: '44px 0', padding: '34px 32px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(34,197,94,0.18)',
            background: 'linear-gradient(150deg, rgba(34,197,94,0.08), rgba(31,41,55,0.26))',
            backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-display)', fontSize: '1.375rem', fontWeight: 600,
              color: '#fff', marginBottom: '12px', lineHeight: 1.3,
            }}
          >
            {block.title}
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, marginBottom: '24px', fontSize: '1rem' }}>
            {block.text}
          </p>
          <Link to={block.href} className="btn btn-primary" style={{ boxShadow: '0 0 28px rgba(34,197,94,0.24)' }}>
            {block.label}
          </Link>
        </div>
      );

    default:
      return null;
  }
}

/* ─── Share row ───────────────────────────────────────────
   The reading-progress bar that used to live here has been
   removed: <ScrollProgress> in the app shell already draws one
   at the same coordinates, and two bars stacked at 0,0 meant
   the article page rendered a doubled, slightly mismatched
   line at the top of the viewport.
───────────────────────────────────────────────────────── */
function ShareRow({ post }) {
  const [copied, setCopied] = useState(false);
  const [nativeShare, setNativeShare] = useState(false);
  const toast = useToast();
  const url = `${SITE.url}/blog/${post.slug}`;
  const text = encodeURIComponent(`${post.title} — ${url}`);

  /* navigator.share only exists on mobile and only over https.
     Checking on mount rather than during render keeps the
     prerendered markup identical to the first client paint. */
  useEffect(() => {
    setNativeShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function');
  }, []);

  const links = [
    { label: 'WhatsApp', href: `https://wa.me/?text=${text}` },
    { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { label: 'X', href: `https://twitter.com/intent/tweet?text=${text}` },
    { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    { label: 'Email', href: `mailto:?subject=${encodeURIComponent(post.title)}&body=${text}` },
  ];

  const pill = {
    padding: '8px 16px', borderRadius: 'var(--radius-full)',
    border: '1px solid var(--border-light)', fontSize: '0.8125rem',
    color: 'rgba(255,255,255,0.55)', textDecoration: 'none',
    fontFamily: 'var(--font-mono)', transition: 'all 0.25s',
    background: 'transparent', cursor: 'pointer', minHeight: '38px',
  };

  const hoverOn = (e) => {
    e.currentTarget.style.borderColor = 'rgba(34,197,94,0.45)';
    e.currentTarget.style.color = 'var(--color-primary)';
  };
  const hoverOff = (e) => {
    e.currentTarget.style.borderColor = 'var(--border-light)';
    e.currentTarget.style.color = 'rgba(255,255,255,0.55)';
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success('Link copied', url);
      track('mc_copy', { copy_type: 'link', value: url });
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
      toast.error('Could not copy', 'Copy the address from your browser bar instead.');
    }
  };

  const shareNative = async () => {
    try {
      await navigator.share({ title: post.title, text: post.excerpt, url });
      track('mc_share', { method: 'native', slug: post.slug });
    } catch {
      /* The visitor cancelled the sheet — nothing to report. */
    }
  };

  return (
    <div
      className="mc-no-print"
      style={{
        display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap',
        padding: '24px 0', borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)', margin: '52px 0 0',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.16em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.48)', marginRight: '6px',
        }}
      >
        Found this useful? Share it
      </span>

      {nativeShare && (
        <button type="button" onClick={shareNative} style={pill} onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
          Share…
        </button>
      )}

      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target={l.href.startsWith('mailto:') ? undefined : '_blank'}
          rel="noopener noreferrer"
          onClick={() => track('mc_share', { method: l.label.toLowerCase(), slug: post.slug })}
          style={pill}
          onMouseEnter={hoverOn}
          onMouseLeave={hoverOff}
        >
          {l.label}
        </a>
      ))}

      <button
        type="button"
        onClick={copy}
        style={{
          ...pill,
          borderColor: copied ? 'rgba(34,197,94,0.5)' : 'var(--border-light)',
          color: copied ? 'var(--color-primary)' : 'rgba(255,255,255,0.55)',
        }}
      >
        {copied ? '✓ Copied' : 'Copy link'}
      </button>

      <button
        type="button"
        onClick={() => { track('mc_print', { slug: post.slug }); window.print(); }}
        style={pill}
        onMouseEnter={hoverOn}
        onMouseLeave={hoverOff}
      >
        Print
      </button>
    </div>
  );
}

/* ─── "Was this helpful?" ─────────────────────────────────
   One question, two buttons, no follow-up form. The value is in
   the ratio across articles, not in individual responses — and
   a free-text box here would collect three answers a year.
───────────────────────────────────────────────────────── */
function HelpfulPrompt({ post }) {
  const [answer, setAnswer] = useState(null);
  const toast = useToast();

  const respond = (value) => {
    setAnswer(value);
    track('mc_article_feedback', { slug: post.slug, helpful: value });
    toast.success(
      value ? 'Thanks — noted' : 'Thanks for telling us',
      value
        ? 'Good to know this one landed.'
        : 'We will look at what this guide is missing.'
    );
  };

  const btn = {
    display: 'inline-flex', alignItems: 'center', gap: '8px',
    padding: '10px 20px', borderRadius: 'var(--radius-full)',
    border: '1px solid var(--border-light)', background: 'transparent',
    color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem',
    cursor: 'pointer', transition: 'all 0.25s', minHeight: '42px',
  };

  return (
    <div
      className="mc-no-print"
      style={{
        marginTop: '32px', padding: '26px 24px',
        borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)',
        background: 'rgba(31,41,55,0.18)',
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {answer === null ? (
          <motion.div
            key="ask"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '18px', flexWrap: 'wrap' }}
          >
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9688rem', fontWeight: 500 }}>
              Was this guide helpful?
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button" onClick={() => respond(true)} style={btn}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(34,197,94,0.5)'; e.currentTarget.style.color = 'var(--color-primary)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
              >
                <span aria-hidden="true">👍</span> Yes
              </button>
              <button
                type="button" onClick={() => respond(false)} style={btn}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
              >
                <span aria-hidden="true">👎</span> Not really
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="thanks"
            role="status"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '18px', flexWrap: 'wrap' }}
          >
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
              {answer
                ? 'Thanks. If it raised a question it did not answer, ask us directly.'
                : 'Thanks — that is useful. Tell us what you were looking for and we will cover it.'}
            </p>
            <Link
              to="/contact"
              onClick={() => trackCta('Ask a question', 'blog_feedback')}
              className="btn btn-outline"
              style={{ padding: '10px 22px', fontSize: '0.8125rem', minHeight: '40px', whiteSpace: 'nowrap' }}
            >
              Ask a question
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Previous / next article ─────────────────────────── */
function AdjacentNav({ newer, older }) {
  if (!newer && !older) return null;

  const Card = ({ post, direction }) => {
    const [h, setH] = useState(false);
    const isPrev = direction === 'prev';

    return (
      <Link
        to={`/blog/${post.slug}`}
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        rel={isPrev ? 'prev' : 'next'}
        style={{
          display: 'flex', gap: '16px', alignItems: 'center',
          padding: '18px 20px', borderRadius: 'var(--radius-lg)',
          border: `1px solid ${h ? 'rgba(34,197,94,0.28)' : 'var(--border-subtle)'}`,
          background: h ? 'rgba(31,41,55,0.38)' : 'rgba(31,41,55,0.18)',
          textDecoration: 'none',
          flexDirection: isPrev ? 'row' : 'row-reverse',
          textAlign: isPrev ? 'left' : 'right',
          transition: 'all 0.32s var(--ease-out-expo)',
          transform: h ? 'translateY(-3px)' : 'none',
          height: '100%',
        }}
      >
        <img
          src={post.image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }}
          style={{
            flexShrink: 0, width: '68px', height: '68px', objectFit: 'cover',
            borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)',
          }}
        />
        <span style={{ minWidth: 0, flex: 1 }}>
          <span
            style={{
              display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: 'var(--color-primary)', marginBottom: '8px',
            }}
          >
            {isPrev ? '← Previous' : 'Next →'}
          </span>
          <span
            style={{
              display: 'block', fontFamily: 'var(--font-display)', fontSize: '1rem',
              fontWeight: 600, lineHeight: 1.4,
              color: h ? 'var(--color-primary)' : '#fff',
              transition: 'color 0.28s ease',
            }}
          >
            {post.title}
          </span>
          <span style={{ display: 'block', marginTop: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'rgba(255,255,255,0.48)' }}>
            {post.dateLabel} · {post.readTime}
          </span>
        </span>
      </Link>
    );
  };

  return (
    <nav
      aria-label="More articles"
      className="mc-no-print adjacent-nav"
      style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px',
        marginTop: '40px',
      }}
    >
      {/* Empty cell keeps "next" on the right when there is no
          previous article, so the two never swap sides. */}
      {older ? <Card post={older} direction="prev" /> : <span />}
      {newer ? <Card post={newer} direction="next" /> : <span />}
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════ */
export default function BlogPostPage() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);
  const heroRef = useLazyBackground(post?.image);

  const toc = useMemo(
    () => (post?.content || []).filter((b) => b.type === 'h2').map((b) => ({ id: anchor(b.text), text: b.text })),
    [post]
  );

  if (!post) return <Navigate to="/blog" replace />;

  const related = getRelatedPosts(post, 3);
  const wordCount = getWordCount(post);
  const { newer, older } = getAdjacentPosts(post);

  /* The stored readTime is authored per post; this is the
     computed one at 200 wpm. Showing the larger of the two keeps
     the estimate honest if an article grows after publication. */
  const computedMinutes = Math.max(1, Math.round(wordCount / 200));

  return (
    <>
      <Seo
        path={`/blog/${post.slug}`}
        title={post.metaTitle}
        description={post.metaDescription}
        keywords={post.keywords}
        image={post.image}
        type="article"
        publishedTime={post.date}
        modifiedTime={post.updated || post.date}
        articleSection={post.category}
        schema={[
          orgSchema(),
          articleSchema(post, wordCount),
          faqSchema(post.faqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      {/* ── Article hero ── */}
      <section style={{ position: 'relative', background: 'var(--bg)', padding: '150px 0 56px', overflow: 'hidden' }}>
        <div
          ref={heroRef}
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, zIndex: 0,
            backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.14,
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background: 'linear-gradient(to bottom, rgba(11,15,14,0.9) 0%, rgba(11,15,14,0.7) 45%, var(--bg) 100%)',
          }}
        />
        <div className="container container-narrow" style={{ position: 'relative', zIndex: 2 }}>
          <Breadcrumbs
            items={[
              { name: 'Home', path: '/' },
              { name: 'Blog', path: '/blog' },
              { name: post.category, path: '/blog' },
            ]}
          />

          <FadeIn>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '22px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.16em',
                  textTransform: 'uppercase', color: 'var(--color-primary)',
                  padding: '6px 14px', borderRadius: 'var(--radius-full)',
                  border: '1px solid rgba(34,197,94,0.28)', background: 'rgba(34,197,94,0.06)',
                }}
              >
                {post.category}
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4.6vw, 3.5rem)',
                fontWeight: 600, lineHeight: 1.12, letterSpacing: '-0.03em',
                color: '#fff', marginBottom: '22px',
              }}
            >
              {post.h1 || post.title}
            </h1>
          </FadeIn>

          <FadeIn delay={0.14}>
            <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, maxWidth: '720px', marginBottom: '28px' }}>
              {post.excerpt}
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div
              style={{
                display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap',
                fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.48)',
              }}
            >
              <span>{SITE.name}</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>
                Published <time dateTime={post.date}>{post.dateLabel}</time>
              </span>
              {post.updated && post.updated !== post.date && (
                <>
                  <span style={{ opacity: 0.4 }}>·</span>
                  <span style={{ color: 'rgba(34,197,94,0.75)' }}>
                    Updated{' '}
                    <time dateTime={post.updated}>
                      {new Date(post.updated).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric',
                      })}
                    </time>
                  </span>
                </>
              )}
              <span style={{ opacity: 0.4 }}>·</span>
              <span>{post.readTime || `${computedMinutes} min read`}</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>{wordCount.toLocaleString('en-IN')} words</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Article body ── */}
      <section style={{ background: 'var(--bg)', paddingBottom: 'var(--space-4xl)' }}>
        <div className="container container-narrow">
          <div className="article-layout" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 240px', gap: '56px', alignItems: 'start' }}>
            {/* Body */}
            <article className="mc-prose">
              {post.content.map((block, i) => (
                <Block key={i} block={block} />
              ))}

              <ShareRow post={post} />

              <HelpfulPrompt post={post} />

              <AdjacentNav newer={newer} older={older} />

              {/* Author / trust box */}
              <div
                style={{
                  marginTop: '32px', padding: '28px 26px',
                  borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)',
                  background: 'rgba(31,41,55,0.22)',
                  backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                  display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap',
                }}
              >
                <img
                  src="/images/logos/nav-logo.webp"
                  alt={SITE.name}
                  loading="lazy"
                  style={{ width: '110px', height: 'auto', flexShrink: 0 }}
                />
                <div style={{ flex: 1, minWidth: '240px' }}>
                  <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, fontSize: '0.9375rem', marginBottom: '16px' }}>
                    Written by the team at <strong style={{ color: '#fff' }}>{SITE.name}</strong> — a digital solutions
                    and branding company in {SITE.address.locality}, {SITE.address.region}. We build websites,
                    custom software and brand systems for businesses across India.
                  </p>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <Link to="/contact" className="btn btn-primary" style={{ padding: '10px 22px', fontSize: '0.8125rem', minHeight: '38px' }}>
                      Work with us
                    </Link>
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline"
                      style={{ padding: '10px 22px', fontSize: '0.8125rem', minHeight: '38px' }}
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </article>

            {/* Sticky TOC */}
            <aside className="article-toc" style={{ position: 'sticky', top: '110px' }}>
              <p
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.18em',
                  textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '18px',
                }}
              >
                On this page
              </p>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '11px', borderLeft: '1px solid var(--border-subtle)', paddingLeft: '16px' }}>
                {toc.map((t) => (
                  <a
                    key={t.id}
                    href={`#${t.id}`}
                    style={{
                      fontSize: '0.8125rem', lineHeight: 1.5, color: 'rgba(255,255,255,0.48)',
                      textDecoration: 'none', transition: 'color 0.22s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-primary)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
                  >
                    {t.text}
                  </a>
                ))}
              </nav>
            </aside>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      {post.faqs?.length > 0 && (
        <PageSection tint>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <FaqList faqs={post.faqs} title="Common questions" />
          </div>
        </PageSection>
      )}

      {/* ── Related ── */}
      {related.length > 0 && (
        <PageSection>
          <h2 className="text-heading-3" style={{ color: '#fff', marginBottom: '36px' }}>
            Continue reading
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {related.map((p, i) => (
              <PostCard key={p.slug} post={p} index={i} />
            ))}
          </div>
        </PageSection>
      )}

      <CtaBand
        eyebrow="Ready when you are"
        title="Let’s turn this into something built."
        text="Book a discovery call and we will map out exactly what your business needs — and what it does not."
        secondaryLabel="See Our Services"
        secondaryHref="/services"
      />

      <style>{`
        @media (max-width: 1024px) {
          .article-layout { grid-template-columns: 1fr !important; gap: 0 !important; }
          .article-toc { display: none !important; }
        }
        @media (max-width: 640px) {
          /* Two 68px thumbnails plus two titles in one row on a
             phone leaves about four words each. */
          .adjacent-nav { grid-template-columns: 1fr !important; }
          .adjacent-nav > a[rel="next"] { flex-direction: row !important; text-align: left !important; }
        }
        /* Printing an article should produce the article: the
           header block, the body, and nothing that only works
           on a screen. */
        @media print {
          .article-layout { display: block !important; }
          .mc-prose h2 { font-size: 15pt !important; margin-top: 20pt !important; }
          .mc-prose h3 { font-size: 12.5pt !important; }
          .mc-prose p, .mc-prose li { font-size: 10.5pt !important; line-height: 1.55 !important; }
          blockquote { border-left: 2px solid #999 !important; padding-left: 10pt !important; }
        }
      `}</style>
    </>
  );
}
