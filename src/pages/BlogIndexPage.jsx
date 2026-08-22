import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Seo, { orgSchema, breadcrumbSchema } from '../components/Seo';
import { PageHero, PageSection, CtaBand } from '../components/PageKit';
import { PostCard } from '../sections/BlogTeaserSection';
import { POSTS, CATEGORIES } from '../data/blog';
import { SITE } from '../data/site';
import { FadeIn } from '../components/TextReveal';
import { FOCUS_SEARCH_EVENT } from '../components/KeyboardShortcuts';
import { EASE } from '../utils/motion';
import { trackBlogSearch } from '../utils/analytics';

/* ─── Search index ────────────────────────────────────────
   Eight posts, all bundled — there is nothing to gain from a
   server round trip, and a client-side index means results
   appear as fast as the visitor can type.

   Built once at module scope: the post data is static, so
   rebuilding it on every keystroke would be pure waste.
───────────────────────────────────────────────────────── */
const strip = (html) => String(html).replace(/<[^>]+>/g, ' ');

const SEARCH_INDEX = POSTS.map((post) => {
  const body = (post.content || [])
    .map((b) => b.text || (b.items || []).join(' ') || (b.rows || []).flat().join(' ') || b.title || '')
    .join(' ');

  const faqs = (post.faqs || []).map((f) => `${f.q} ${f.a}`).join(' ');

  return {
    slug: post.slug,
    /* Title and excerpt are weighted by being searched separately —
       a term in the headline is a better match than one buried in
       paragraph forty. */
    title: post.title.toLowerCase(),
    summary: `${post.excerpt} ${post.category} ${(post.keywords || []).join(' ')}`.toLowerCase(),
    body: strip(`${body} ${faqs}`).toLowerCase(),
  };
});

const INDEX_BY_SLUG = Object.fromEntries(SEARCH_INDEX.map((e) => [e.slug, e]));

function scorePost(post, query) {
  const entry = INDEX_BY_SLUG[post.slug];
  if (!entry) return 0;

  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return 0;

  let score = 0;
  for (const term of terms) {
    /* Every term must appear somewhere, otherwise a two-word
       query returns everything that matched either word. */
    const inTitle = entry.title.includes(term);
    const inSummary = entry.summary.includes(term);
    const inBody = entry.body.includes(term);
    if (!inTitle && !inSummary && !inBody) return 0;

    if (inTitle) score += 10;
    if (inSummary) score += 4;
    if (inBody) score += 1;
  }
  return score;
}

const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': `${SITE.url}/blog#blog`,
  name: `${SITE.name}: Insights & Resources`,
  description:
    'Practical guides on website development, custom software, CRM systems, branding, local SEO and business growth for Indian businesses.',
  url: `${SITE.url}/blog`,
  publisher: { '@id': `${SITE.url}/#organization` },
  blogPost: POSTS.map((p) => ({
    '@type': 'BlogPosting',
    headline: p.title,
    description: p.excerpt,
    url: `${SITE.url}/blog/${p.slug}`,
    datePublished: p.date,
    dateModified: p.updated || p.date,
    image: `${SITE.url}${p.image}`,
    author: { '@type': 'Organization', name: SITE.name },
  })),
};

export default function BlogIndexPage() {
  const [active, setActive] = useState('All');
  const [query, setQuery] = useState('');
  const searchRef = useRef(null);
  const trimmed = query.trim();
  const searching = trimmed.length >= 2;

  const filtered = useMemo(() => {
    const byCategory = active === 'All' ? POSTS : POSTS.filter((p) => p.category === active);
    if (!searching) return byCategory;

    return byCategory
      .map((p) => ({ post: p, score: scorePost(p, trimmed) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((r) => r.post);
  }, [active, trimmed, searching]);

  /* Report the search once the visitor stops typing, not on every
     keystroke — otherwise "website" arrives as seven separate
     searches and the report is meaningless. */
  useEffect(() => {
    if (!searching) return;
    const t = setTimeout(() => trackBlogSearch(trimmed, filtered.length), 900);
    return () => clearTimeout(t);
  }, [trimmed, searching, filtered.length]);

  /* `/` and ⌘K focus the field. preventDefault tells the global
     shortcut handler that this page took the key, so it does not
     also open the shortcuts panel. */
  useEffect(() => {
    const onFocusRequest = (e) => {
      if (!searchRef.current) return;
      e.preventDefault();
      searchRef.current.focus();
      searchRef.current.select();
    };
    document.addEventListener(FOCUS_SEARCH_EVENT, onFocusRequest);
    return () => document.removeEventListener(FOCUS_SEARCH_EVENT, onFocusRequest);
  }, []);

  const clearSearch = useCallback(() => {
    setQuery('');
    searchRef.current?.focus();
  }, []);

  const resetAll = useCallback(() => {
    setQuery('');
    setActive('All');
  }, []);

  const onSearchKeyDown = useCallback((e) => {
    if (e.key === 'Escape' && query) {
      e.preventDefault();
      e.stopPropagation();
      setQuery('');
    }
  }, [query]);

  return (
    <>
      <Seo
        path="/blog"
        title="Blog: Website, Software & Branding Guides | Manhar Creatives"
        description="Detailed guides on website cost, custom CRM, Google Business Profile, branding and site speed, written for business owners rather than developers."
        keywords={[
          'website development blog india',
          'custom software insights',
          'crm guide india',
          'local seo blog',
          'branding guide small business',
          'business automation articles',
          'website cost guide',
        ]}
        schema={[
          orgSchema(),
          blogSchema,
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
          ]),
        ]}
      />

      <PageHero
        fullscreen
        scrollCue
        eyebrow="INSIGHTS & RESOURCES"
        title="Guides worth"
        titleAccent="actually reading."
        subtitle="Detailed, honest writing on websites, custom software, branding and getting found online: including the numbers, trade-offs and uncomfortable answers most agencies leave out."
        background="/images/pages/blog-hero.webp"
        bgOpacity={0.55}
        imageSide="right"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
        ]}
      />

      <PageSection style={{ paddingTop: 0 }}>
        {/* Search */}
        <FadeIn>
          <div style={{ marginBottom: '26px' }}>
            <label htmlFor="blog-search" className="visually-hidden">
              Search articles
            </label>
            <div
              className="blog-search"
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '14px 18px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-light)',
                background: 'rgba(31,41,55,0.24)',
                backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
                transition: 'border-color 0.28s var(--ease-out-expo), box-shadow 0.28s var(--ease-out-expo)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.42)" strokeWidth="2" strokeLinecap="round" aria-hidden="true" style={{ flexShrink: 0 }}>
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>

              <input
                id="blog-search"
                ref={searchRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onSearchKeyDown}
                placeholder="Search articles: cost, CRM, SEO, branding…"
                autoComplete="off"
                aria-describedby="blog-search-status"
                style={{
                  flex: 1, minWidth: 0,
                  background: 'transparent', border: 'none', outline: 'none',
                  color: '#fff', fontSize: '0.9688rem', fontFamily: 'var(--font-body)',
                }}
              />

              {query ? (
                <button
                  type="button"
                  onClick={clearSearch}
                  aria-label="Clear search"
                  style={{
                    flexShrink: 0, width: '28px', height: '28px', padding: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: 'none', borderRadius: '50%', background: 'rgba(255,255,255,0.06)',
                    color: 'rgba(255,255,255,0.6)', cursor: 'pointer',
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              ) : (
                <kbd
                  className="blog-search-kbd"
                  aria-hidden="true"
                  style={{
                    flexShrink: 0, padding: '3px 8px', borderRadius: '5px',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: 'rgba(255,255,255,0.48)',
                    fontFamily: 'var(--font-mono)', fontSize: '0.6875rem',
                  }}
                >
                  /
                </kbd>
              )}
            </div>
          </div>
        </FadeIn>

        {/* Category filter */}
        <FadeIn>
          <div
            style={{
              display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px', marginBottom: '20px',
              paddingBottom: '24px', borderBottom: '1px solid var(--border-subtle)',
            }}
          >
            {['All', ...CATEGORIES].map((cat) => {
              const on = active === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  aria-pressed={on}
                  style={{
                    padding: '9px 18px',
                    borderRadius: 'var(--radius-full)',
                    border: `1px solid ${on ? 'rgba(34,197,94,0.42)' : 'var(--border-light)'}`,
                    background: on ? 'rgba(34,197,94,0.1)' : 'transparent',
                    color: on ? 'var(--color-primary)' : 'rgba(255,255,255,0.5)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.06em',
                    cursor: 'pointer',
                    transition: 'all 0.28s var(--ease-out-expo)',
                    minHeight: '38px',
                  }}
                >
                  {cat}
                  {cat !== 'All' && (
                    <span style={{ opacity: 0.5, marginLeft: '7px' }}>
                      {POSTS.filter((p) => p.category === cat).length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* Result count — a live region so the number is announced as it
            changes rather than only being visible. It doubles as the
            heading for the list below, which keeps the document outline
            continuous (h1 → h2 → the h3 on each card) without adding a
            second visible title to the page. */}
        <h2
          id="blog-search-status"
          role="status"
          aria-live="polite"
          style={{
            fontWeight: 400, letterSpacing: '0.06em',
            marginBottom: '28px', minHeight: '20px',
            fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
            letterSpacing: '0.06em', color: 'rgba(255,255,255,0.48)',
          }}
        >
          {searching || active !== 'All'
            ? `${filtered.length} article${filtered.length === 1 ? '' : 's'}${searching ? ` matching “${trimmed}”` : ` in ${active}`}`
            : `${POSTS.length} articles`}
        </h2>

        {/* Grid */}
        <AnimatePresence mode="wait" initial={false}>
          {filtered.length > 0 ? (
            <motion.div
              key={`${active}-${searching ? trimmed : ''}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: EASE }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '24px',
              }}
            >
              {filtered.map((post, i) => (
                <PostCard key={post.slug} post={post} index={i} query={searching ? trimmed : ''} />
              ))}
            </motion.div>
          ) : (
            /* Empty state. Offers a way forward rather than a dead
               end — the categories are the fastest route back to
               something readable. */
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              style={{
                padding: 'clamp(44px, 7vw, 76px) 28px',
                textAlign: 'center',
                borderRadius: 'var(--radius-lg)',
                border: '1px dashed var(--border-light)',
                background: 'rgba(31,41,55,0.16)',
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  width: '54px', height: '54px', margin: '0 auto 22px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '50%', border: '1px solid rgba(34,197,94,0.22)',
                  background: 'rgba(34,197,94,0.06)', color: 'var(--color-primary)',
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>

              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', fontWeight: 600, color: '#fff', marginBottom: '12px' }}>
                {searching ? `Nothing matches “${trimmed}”` : `No articles in ${active} yet`}
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9688rem', lineHeight: 1.75, maxWidth: '460px', margin: '0 auto 26px' }}>
                {searching
                  ? 'Try a broader term, such as “cost”, “CRM”, “SEO” or “branding”, or browse everything we have written.'
                  : 'We are still writing for this category. In the meantime, the other guides cover most of the same ground.'}
              </p>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button type="button" onClick={resetAll} className="btn btn-outline" style={{ padding: '11px 24px', fontSize: '0.875rem' }}>
                  Show all articles
                </button>
                <Link to="/contact" className="btn btn-ghost" style={{ padding: '11px 22px', fontSize: '0.875rem', color: 'var(--color-primary)' }}>
                  Ask us directly →
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Topic cross-links — internal linking for SEO */}
        <FadeIn>
          <div
            style={{
              marginTop: '72px', padding: '36px 32px',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
              background: 'rgba(31,41,55,0.22)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.18em',
                textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '20px',
              }}
            >
              Explore our services
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {[
                { label: 'Website Development', href: '/services/website-development' },
                { label: 'Custom Software & CRM', href: '/services/custom-software-development' },
                { label: 'Branding & Identity', href: '/services/branding-identity' },
                { label: 'Social Media Design', href: '/services/social-media-design' },
                { label: 'Print & Offline Branding', href: '/services/print-branding' },
                { label: 'Digital Presence & Growth', href: '/services/digital-presence' },
                { label: 'Ahmedabad', href: '/ahmedabad' },
                { label: 'Mehsana', href: '/mehsana' },
                { label: 'Visnagar', href: '/visnagar' },
              ].map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  style={{
                    padding: '8px 16px', borderRadius: 'var(--radius-full)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    fontSize: '0.8125rem', color: 'rgba(255,255,255,0.55)',
                    textDecoration: 'none', transition: 'all 0.25s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(34,197,94,0.4)';
                    e.currentTarget.style.color = 'var(--color-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.55)';
                  }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </FadeIn>
      </PageSection>


      <style>{`
        .blog-search:focus-within {
          border-color: rgba(34,197,94,0.5);
          box-shadow: 0 0 0 3px rgba(34,197,94,0.12);
        }
        /* Safari draws its own clear button inside type="search";
           we already have one and two is confusing. */
        #blog-search::-webkit-search-cancel-button,
        #blog-search::-webkit-search-decoration { -webkit-appearance: none; appearance: none; }
        /* The "/" hint is meaningless without a keyboard. */
        @media (pointer: coarse) { .blog-search-kbd { display: none !important; } }
      `}</style>
    </>
  );
}
