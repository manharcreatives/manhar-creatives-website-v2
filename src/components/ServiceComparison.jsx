import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ViewAnimator } from '../utils/useInViewLenis';
import { EASE } from '../utils/motion';
import { trackCta } from '../utils/analytics';

/* ═══════════════════════════════════════════════════════════
   SERVICE COMPARISON

   Three services, side by side, on the dimensions a business
   owner actually weighs: when it is the right call, how long it
   takes, how much of their time it costs, and what they end up
   owning.

   No pricing column. Pricing here is scoped per project — a
   range wide enough to be honest would be too wide to be useful,
   and a narrow one would be a number we could not stand behind.
   The "Book a call" row is where that conversation belongs.

   The row toggles exist because different visitors are weighing
   different things: someone with a deadline wants the timeline
   row and nothing else. Hiding rows is faster than reading past
   them.
   ═══════════════════════════════════════════════════════════ */

const COLUMNS = [
  {
    key: 'website',
    name: 'Website Development',
    tagline: 'Be found, be believed',
    href: '/services/website-development',
  },
  {
    key: 'software',
    name: 'Custom Software & CRM',
    tagline: 'Stop doing it by hand',
    href: '/services/custom-software-development',
  },
  {
    key: 'branding',
    name: 'Branding & Identity',
    tagline: 'Look like one company',
    href: '/services/branding-identity',
  },
];

const ROWS = [
  {
    key: 'problem',
    label: 'Start here when',
    defaultOn: true,
    values: {
      website: 'Customers cannot find you, or find you and are not convinced.',
      software: 'Your team is running the business on spreadsheets, WhatsApp and memory.',
      branding: 'You look like a different company on every touchpoint.',
    },
  },
  {
    key: 'timeline',
    label: 'Typical timeline',
    defaultOn: true,
    values: {
      website: '3–6 weeks',
      software: '6–14 weeks',
      branding: '2–4 weeks',
    },
    emphasis: true,
  },
  {
    key: 'complexity',
    label: 'Complexity',
    defaultOn: true,
    values: { website: 2, software: 3, branding: 1 },
    type: 'scale',
  },
  {
    key: 'involvement',
    label: 'Your time required',
    defaultOn: true,
    values: {
      website: 'Content, approvals and one review round per stage.',
      software: 'Highest — we need to understand how you actually work today.',
      branding: 'Two or three decision points. Mostly reviewing directions.',
    },
  },
  {
    key: 'own',
    label: 'What you own at the end',
    defaultOn: true,
    values: {
      website: 'Domain, hosting account, source code, all content and images.',
      software: 'Source code, database and every account. No per-seat licence.',
      branding: 'Full logo suite, source files, and written usage guidelines.',
    },
  },
  {
    key: 'ongoing',
    label: 'Ongoing commitment',
    defaultOn: false,
    values: {
      website: 'Optional maintenance. Nothing is locked to us.',
      software: 'Support window included; changes quoted per request.',
      branding: 'None. The guidelines let anyone apply it correctly.',
    },
  },
  {
    key: 'pairs',
    label: 'Works well with',
    defaultOn: false,
    values: {
      website: 'Branding, Digital Presence Setup',
      software: 'Website Development',
      branding: 'Print & Offline, Social Media Design',
    },
  },
];

/* A three-dot scale rather than a number: "complexity: 2" invites
   a question about the units, three filled dots does not. */
function Scale({ value }) {
  const labels = { 1: 'Straightforward', 2: 'Moderate', 3: 'Involved' };
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '9px' }}>
      <span style={{ display: 'inline-flex', gap: '4px' }} aria-hidden="true">
        {[1, 2, 3].map((n) => (
          <span
            key={n}
            style={{
              width: '7px', height: '7px', borderRadius: '50%',
              background: n <= value ? 'var(--color-primary)' : 'rgba(255,255,255,0.14)',
              boxShadow: n <= value ? '0 0 8px rgba(34,197,94,0.5)' : 'none',
            }}
          />
        ))}
      </span>
      <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.6)' }}>{labels[value]}</span>
    </span>
  );
}

function Cell({ row, colKey }) {
  const value = row.values[colKey];
  if (row.type === 'scale') return <Scale value={value} />;

  return (
    <span
      style={{
        fontSize: row.emphasis ? '1rem' : '0.9063rem',
        fontFamily: row.emphasis ? 'var(--font-display)' : 'var(--font-body)',
        fontWeight: row.emphasis ? 600 : 400,
        color: row.emphasis ? 'var(--color-primary)' : 'rgba(255,255,255,0.66)',
        lineHeight: 1.7,
      }}
    >
      {value}
    </span>
  );
}

export default function ServiceComparison() {
  const [hidden, setHidden] = useState(
    () => new Set(ROWS.filter((r) => !r.defaultOn).map((r) => r.key))
  );

  const visibleRows = useMemo(() => ROWS.filter((r) => !hidden.has(r.key)), [hidden]);

  const toggle = (key) => {
    setHidden((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const headCell = {
    padding: '22px 20px',
    textAlign: 'left',
    verticalAlign: 'top',
    borderBottom: '1px solid rgba(34,197,94,0.18)',
  };

  const bodyCell = {
    padding: '20px',
    textAlign: 'left',
    verticalAlign: 'top',
    borderBottom: '1px solid var(--border-subtle)',
  };

  return (
    <div>
      {/* Row toggles */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '9px', marginBottom: '24px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.48)', marginRight: '4px' }}>
          Compare on
        </span>
        {ROWS.map((r) => {
          const on = !hidden.has(r.key);
          return (
            <button
              key={r.key}
              type="button"
              onClick={() => toggle(r.key)}
              aria-pressed={on}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '7px',
                padding: '7px 14px', borderRadius: 'var(--radius-full)',
                border: `1px solid ${on ? 'rgba(34,197,94,0.4)' : 'var(--border-light)'}`,
                background: on ? 'rgba(34,197,94,0.09)' : 'transparent',
                color: on ? 'var(--color-primary)' : 'rgba(255,255,255,0.45)',
                fontFamily: 'var(--font-mono)', fontSize: '0.7188rem',
                cursor: 'pointer', transition: 'all 0.25s var(--ease-out-expo)',
                minHeight: '36px',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: '13px', height: '13px', borderRadius: '3px',
                  border: `1px solid ${on ? 'var(--color-primary)' : 'rgba(255,255,255,0.22)'}`,
                  background: on ? 'var(--color-primary)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#0B0F0E', fontSize: '0.6rem', lineHeight: 1,
                }}
              >
                {on ? '✓' : ''}
              </span>
              {r.label}
            </button>
          );
        })}
      </div>

      {/* ── Table (desktop) ── */}
      <ViewAnimator
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-8%' }}
        transition={{ duration: 0.6, ease: EASE }}
        className="svc-compare-table"
        style={{
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
          background: 'rgba(31,41,55,0.2)',
          backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
          overflowX: 'auto',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '760px' }}>
          <caption className="visually-hidden">
            Comparison of Website Development, Custom Software and Branding services
          </caption>
          <thead>
            <tr>
              <th scope="col" style={{ ...headCell, width: '19%' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.48)' }}>
                  Service
                </span>
              </th>
              {COLUMNS.map((c) => (
                <th key={c.key} scope="col" style={{ ...headCell, width: '27%' }}>
                  <Link
                    to={c.href}
                    onClick={() => trackCta(`Compare — ${c.name}`, 'service_comparison', c.href)}
                    style={{ textDecoration: 'none', display: 'block' }}
                  >
                    <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '1.0625rem', fontWeight: 600, color: '#fff', lineHeight: 1.35, marginBottom: '6px' }}>
                      {c.name}
                    </span>
                    <span style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--color-primary)', opacity: 0.85 }}>
                      {c.tagline}
                    </span>
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {visibleRows.map((r) => (
                <motion.tr
                  key={r.key}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <th
                    scope="row"
                    style={{
                      ...bodyCell,
                      fontFamily: 'var(--font-mono)', fontSize: '0.7188rem',
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.48)', fontWeight: 400,
                    }}
                  >
                    {r.label}
                  </th>
                  {COLUMNS.map((c) => (
                    <td key={c.key} style={bodyCell}>
                      <Cell row={r} colKey={c.key} />
                    </td>
                  ))}
                </motion.tr>
              ))}
            </AnimatePresence>

            <tr>
              <td style={{ ...bodyCell, borderBottom: 'none' }} />
              {COLUMNS.map((c) => (
                <td key={c.key} style={{ ...bodyCell, borderBottom: 'none' }}>
                  <Link
                    to={c.href}
                    onClick={() => trackCta(`Learn more — ${c.name}`, 'service_comparison', c.href)}
                    className="btn btn-outline"
                    style={{ padding: '10px 20px', fontSize: '0.8125rem', minHeight: '40px' }}
                  >
                    Details →
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </ViewAnimator>

      {/* ── Cards (mobile) ──
          A 760px-wide table on a 360px screen is a horizontal
          scroll nobody discovers. Below 900px each service
          becomes its own card and the comparison becomes a
          sequence instead of a grid. */}
      <div className="svc-compare-cards" style={{ display: 'none', flexDirection: 'column', gap: '16px' }}>
        {COLUMNS.map((c) => (
          <div
            key={c.key}
            style={{
              padding: '26px 24px',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
              background: 'rgba(31,41,55,0.22)',
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>
              {c.name}
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-primary)', marginBottom: '20px' }}>{c.tagline}</p>

            <dl style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: 0 }}>
              {visibleRows.map((r) => (
                <div key={r.key}>
                  <dt style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.48)', marginBottom: '6px' }}>
                    {r.label}
                  </dt>
                  <dd style={{ margin: 0 }}>
                    <Cell row={r} colKey={c.key} />
                  </dd>
                </div>
              ))}
            </dl>

            <Link
              to={c.href}
              onClick={() => trackCta(`Learn more — ${c.name}`, 'service_comparison_mobile', c.href)}
              className="btn btn-outline"
              style={{ marginTop: '22px', padding: '11px 22px', fontSize: '0.8125rem', width: '100%' }}
            >
              {c.name} details →
            </Link>
          </div>
        ))}
      </div>

      <p style={{ marginTop: '22px', fontSize: '0.8438rem', color: 'rgba(255,255,255,0.48)', lineHeight: 1.7 }}>
        Timelines assume content and approvals arrive on schedule. Every project is scoped and
        quoted in writing before work starts —{' '}
        <Link to="/contact" className="mc-link" style={{ color: 'var(--color-primary)' }}>
          book a call
        </Link>{' '}
        and we will tell you which of these you actually need.
      </p>

      <style>{`
        @media (max-width: 900px) {
          .svc-compare-table { display: none !important; }
          .svc-compare-cards { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
