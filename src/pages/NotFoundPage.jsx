import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import { SERVICES } from '../data/services';
import { POSTS } from '../data/blog';

const QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Our Work', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Process', href: '/process' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function NotFoundPage() {
  return (
    <>
      <Seo
        path="/404"
        title="Page Not Found | Manhar Creatives"
        description="The page you are looking for does not exist or has been moved."
        noindex
      />

      <section
        style={{
          position: 'relative', background: 'var(--bg)', minHeight: '92vh',
          display: 'flex', alignItems: 'center', padding: '160px 0 90px', overflow: 'hidden',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', top: '-160px', left: '50%', transform: 'translateX(-50%)',
            width: '760px', height: '620px', borderRadius: '50%', pointerEvents: 'none',
            background: 'radial-gradient(circle, rgba(34,197,94,0.11) 0%, transparent 68%)',
            filter: 'blur(56px)',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
            backgroundImage: 'radial-gradient(rgba(34,197,94,0.09) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black 10%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black 10%, transparent 100%)',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            <p
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.25em',
                textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '24px',
              }}
            >
              ✦ Error 404
            </p>

            <div
              style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(5rem, 16vw, 12rem)',
                fontWeight: 600, lineHeight: 0.9, letterSpacing: '-0.05em', marginBottom: '24px',
                color: 'transparent', WebkitTextStroke: '1px rgba(34,197,94,0.35)',
                textShadow: '0 0 60px rgba(34,197,94,0.18)',
              }}
            >
              404
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3.4vw, 2.5rem)',
                fontWeight: 600, color: '#fff', marginBottom: '18px', letterSpacing: '-0.025em',
              }}
            >
              This page doesn’t exist.
            </h1>

            <p
              style={{
                color: 'rgba(255,255,255,0.55)', fontSize: '1.0625rem', lineHeight: 1.75,
                maxWidth: '480px', margin: '0 auto 40px',
              }}
            >
              It may have been moved, renamed, or never existed at all. Here is where you probably wanted to go.
            </p>

            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '56px' }}>
              <Link to="/" className="btn btn-primary" style={{ boxShadow: '0 0 30px rgba(34,197,94,0.26)' }}>
                Back to Home
              </Link>
              <Link to="/contact" className="btn btn-outline">Contact Us</Link>
            </div>

            {/* Quick links */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' }}>
              {QUICK_LINKS.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  style={{
                    padding: '8px 18px', borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--border-light)', fontSize: '0.8125rem',
                    color: 'rgba(255,255,255,0.55)', textDecoration: 'none',
                    fontFamily: 'var(--font-mono)', transition: 'all 0.25s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(34,197,94,0.42)';
                    e.currentTarget.style.color = 'var(--color-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-light)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.55)';
                  }}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Popular destinations */}
            <div
              className="nf-grid"
              style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px',
                maxWidth: '840px', margin: '0 auto', textAlign: 'left',
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.16em',
                    textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '16px',
                  }}
                >
                  Our services
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {SERVICES.map((s) => (
                    <Link
                      key={s.id}
                      to={`/services/${s.slug}`}
                      style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9063rem', textDecoration: 'none', transition: 'color 0.22s' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-primary)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
                    >
                      {s.shortTitle}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.16em',
                    textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '16px',
                  }}
                >
                  Popular reading
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {POSTS.slice(0, 6).map((p) => (
                    <Link
                      key={p.slug}
                      to={`/blog/${p.slug}`}
                      style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9063rem', textDecoration: 'none', lineHeight: 1.5, transition: 'color 0.22s' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-primary)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
                    >
                      {p.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <style>{`
          @media (max-width: 700px) {
            .nf-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          }
        `}</style>
      </section>
    </>
  );
}
