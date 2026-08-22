import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PageHero, PageSection, CtaBand } from '../components/PageKit';
import { SITE } from '../data/site';

const anchor = (text) =>
  String(text).toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').slice(0, 60);

function Body({ blocks }) {
  return blocks.map((b, i) => {
    if (b.type === 'p') {
      return (
        <p
          key={i}
          style={{ fontSize: '1rem', lineHeight: 1.85, color: 'rgba(255,255,255,0.62)', marginBottom: '18px' }}
          dangerouslySetInnerHTML={{ __html: b.text }}
        />
      );
    }
    if (b.type === 'ul') {
      return (
        <ul key={i} style={{ listStyle: 'none', margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {b.items.map((item, j) => (
            <li key={j} style={{ display: 'flex', gap: '13px', alignItems: 'flex-start' }}>
              <span
                aria-hidden="true"
                style={{
                  flexShrink: 0, marginTop: '9px', width: '5px', height: '5px', borderRadius: '50%',
                  background: 'var(--color-primary)', boxShadow: '0 0 8px rgba(34,197,94,0.5)',
                }}
              />
              <span
                style={{ fontSize: '0.9688rem', lineHeight: 1.78, color: 'rgba(255,255,255,0.6)' }}
                dangerouslySetInnerHTML={{ __html: item }}
              />
            </li>
          ))}
        </ul>
      );
    }
    if (b.type === 'table') {
      return (
        <div
          key={i}
          style={{
            margin: '0 0 26px', overflowX: 'auto', borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)', background: 'rgba(31,41,55,0.2)',
            backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '480px' }}>
            <thead>
              <tr>
                {b.head.map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: 'left', padding: '14px 18px', fontFamily: 'var(--font-mono)',
                      fontSize: '0.6563rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                      color: 'var(--color-primary)', borderBottom: '1px solid rgba(34,197,94,0.16)',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      style={{
                        padding: '14px 18px', fontSize: '0.9063rem', lineHeight: 1.65,
                        color: ci === 0 ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.55)',
                        borderBottom: ri === b.rows.length - 1 ? 'none' : '1px solid var(--border-subtle)',
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
    }
    if (b.type === 'callout') {
      return (
        <aside
          key={i}
          style={{
            margin: '0 0 26px', padding: '22px 24px', borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(34,197,94,0.18)', borderLeft: '3px solid var(--color-primary)',
            background: 'linear-gradient(135deg, rgba(34,197,94,0.06), rgba(31,41,55,0.18))',
            backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
          }}
        >
          <p
            style={{ fontSize: '0.9688rem', lineHeight: 1.78, color: 'rgba(255,255,255,0.74)', margin: 0 }}
            dangerouslySetInnerHTML={{ __html: b.text }}
          />
        </aside>
      );
    }
    return null;
  });
}

export default function LegalLayout({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  background,
  updated,
  sections,
  breadcrumbs,
}) {
  const [activeId, setActiveId] = useState(sections[0] ? anchor(sections[0].heading) : '');

  const items = useMemo(
    () => sections.map((s) => ({ id: anchor(s.heading), text: s.heading })),
    [sections]
  );

  useEffect(() => {
    const onScroll = () => {
      let current = items[0]?.id;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top <= 160) current = it.id;
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [items]);

  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        titleAccent={titleAccent}
        subtitle={subtitle}
        background={background}
        breadcrumbs={breadcrumbs}
        compact
      >
        <div
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            padding: '10px 20px', borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-light)', background: 'rgba(255,255,255,0.025)',
            fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)',
          }}
        >
          <span
            style={{
              width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-primary)',
              boxShadow: '0 0 8px rgba(34,197,94,0.7)',
            }}
          />
          Last updated: {updated}
        </div>
      </PageHero>

      <PageSection style={{ paddingTop: 0 }}>
        <div
          className="legal-layout"
          style={{ display: 'grid', gridTemplateColumns: '260px minmax(0,1fr)', gap: '64px', alignItems: 'start' }}
        >
          {/* Sticky index */}
          <aside className="legal-toc" style={{ position: 'sticky', top: '110px' }}>
            <p
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.18em',
                textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '18px',
              }}
            >
              Contents
            </p>
            <nav
              style={{
                display: 'flex', flexDirection: 'column', gap: '2px',
                borderLeft: '1px solid var(--border-subtle)',
              }}
            >
              {items.map((it, i) => {
                const on = activeId === it.id;
                return (
                  <a
                    key={it.id}
                    href={`#${it.id}`}
                    style={{
                      fontSize: '0.8125rem', lineHeight: 1.5, padding: '8px 0 8px 16px',
                      marginLeft: '-1px',
                      borderLeft: `1px solid ${on ? 'var(--color-primary)' : 'transparent'}`,
                      color: on ? 'var(--color-primary)' : 'rgba(255,255,255,0.42)',
                      textDecoration: 'none', transition: 'all 0.25s',
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-mono)', opacity: 0.5, marginRight: '8px' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {it.text}
                  </a>
                );
              })}
            </nav>
          </aside>

          {/* Content */}
          <div style={{ maxWidth: '780px' }}>
            {sections.map((s, i) => (
              <section
                key={s.heading}
                id={anchor(s.heading)}
                style={{
                  marginBottom: '52px',
                  paddingBottom: i === sections.length - 1 ? 0 : '44px',
                  borderBottom: i === sections.length - 1 ? 'none' : '1px solid var(--border-subtle)',
                  scrollMarginTop: '110px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: '20px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.8125rem',
                      color: 'var(--color-primary)', opacity: 0.7,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2
                    style={{
                      fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3125rem, 2.2vw, 1.75rem)',
                      fontWeight: 600, color: '#fff', lineHeight: 1.25, letterSpacing: '-0.02em',
                    }}
                  >
                    {s.heading}
                  </h2>
                </div>
                <Body blocks={s.blocks} />
              </section>
            ))}

            {/* Contact box */}
            <div
              style={{
                marginTop: '48px', padding: '30px 28px', borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(34,197,94,0.16)',
                background: 'linear-gradient(150deg, rgba(34,197,94,0.06), rgba(31,41,55,0.24))',
                backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-display)', fontSize: '1.1875rem', fontWeight: 600,
                  color: '#fff', marginBottom: '14px',
                }}
              >
                Questions about this policy?
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.58)', lineHeight: 1.8, fontSize: '0.9688rem', marginBottom: '20px' }}>
                Write to us and we will respond within a reasonable time.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', fontSize: '0.9375rem' }}>
                <a href={`mailto:${SITE.email}`} style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
                  {SITE.email}
                </a>
                <a href={`tel:${SITE.phoneRaw}`} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
                  {SITE.phone}
                </a>
                <span style={{ color: 'rgba(255,255,255,0.48)' }}>
                  {SITE.address.locality}, {SITE.address.region}, {SITE.address.country}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '22px', flexWrap: 'wrap' }}>
                <Link to="/contact" className="btn btn-primary" style={{ padding: '11px 24px', fontSize: '0.8438rem', minHeight: '40px' }}>
                  Contact Us
                </Link>
                <Link
                  to={title.includes('Privacy') ? '/terms-and-conditions' : '/privacy-policy'}
                  className="btn btn-outline"
                  style={{ padding: '11px 24px', fontSize: '0.8438rem', minHeight: '40px' }}
                >
                  {title.includes('Privacy') ? 'Terms & Conditions' : 'Privacy Policy'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </PageSection>

      <CtaBand
        eyebrow="Still here?"
        title="Let’s talk about your project instead."
        text="Now that the fine print is out of the way, tell us what you are trying to build."
        secondaryLabel="Explore Services"
        secondaryHref="/services"
      />

      <style>{`
        @media (max-width: 1024px) {
          .legal-layout { grid-template-columns: 1fr !important; gap: 0 !important; }
          .legal-toc { display: none !important; }
        }
      `}</style>
    </>
  );
}
