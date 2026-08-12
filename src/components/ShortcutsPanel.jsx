import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { EASE } from '../utils/motion';

/* ═══════════════════════════════════════════════════════════
   SHORTCUTS PANEL

   Split out from KeyboardShortcuts.jsx and loaded on demand.
   The listener that watches for "?" is a few hundred bytes and
   has to be in the main bundle; this dialog is markup that most
   visitors will never open, so it should not be part of what
   everyone downloads before the homepage paints.

   Contains a real focus trap: focus moves in on open, Tab cycles
   within the dialog, and Esc closes. A modal you can Tab out of
   silently strands keyboard and screen-reader users behind an
   overlay they cannot see past.
   ═══════════════════════════════════════════════════════════ */

const SHORTCUTS = [
  { keys: ['/'], label: 'Focus search', context: 'Blog' },
  { keys: ['Ctrl', 'K'], label: 'Focus search / open this panel', context: 'Anywhere' },
  { keys: ['?'], label: 'Show keyboard shortcuts', context: 'Anywhere' },
  { keys: ['Esc'], label: 'Close menu, dropdown or dialog', context: 'Anywhere' },
  { keys: ['Tab'], label: 'Move through links and controls', context: 'Anywhere' },
  { keys: ['Shift', 'Tab'], label: 'Move backwards', context: 'Anywhere' },
  { keys: ['Enter'], label: 'Activate the focused link or button', context: 'Anywhere' },
];

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function Key({ children }) {
  return (
    <kbd
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        minWidth: '26px', height: '26px', padding: '0 8px',
        borderRadius: '6px',
        border: '1px solid rgba(255,255,255,0.14)',
        borderBottomWidth: '2px',
        background: 'rgba(255,255,255,0.05)',
        color: 'rgba(255,255,255,0.82)',
        fontFamily: 'var(--font-mono)', fontSize: '0.7188rem', lineHeight: 1,
      }}
    >
      {children}
    </kbd>
  );
}

export default function ShortcutsPanel({ open, onClose }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const panel = panelRef.current;
    const first = panel?.querySelector(FOCUSABLE);
    const raf = requestAnimationFrame(() => (first || panel)?.focus());

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panel) return;

      const items = Array.from(panel.querySelectorAll(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null
      );
      if (items.length === 0) {
        e.preventDefault();
        return;
      }

      const firstEl = items[0];
      const lastEl = items[items.length - 1];

      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown, true);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKeyDown, true);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
          style={{
            position: 'fixed', inset: 0, zIndex: 2147483645,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px',
            background: 'rgba(5,8,7,0.72)',
            backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
          }}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mc-shortcuts-title"
            tabIndex={-1}
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: EASE }}
            style={{
              width: '100%', maxWidth: '520px', maxHeight: '82vh', overflowY: 'auto',
              padding: '30px 28px',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid rgba(34,197,94,0.16)',
              background: 'linear-gradient(160deg, rgba(34,197,94,0.05), rgba(11,15,14,0.96))',
              boxShadow: '0 34px 90px rgba(0,0,0,0.7)',
              outline: 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '24px' }}>
              <div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '10px' }}>
                  ✦ Shortcuts
                </p>
                <h2 id="mc-shortcuts-title" style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', fontWeight: 600, color: '#fff', lineHeight: 1.25 }}>
                  Keyboard shortcuts
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close shortcuts"
                style={{
                  flexShrink: 0, width: '34px', height: '34px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '50%', border: '1px solid var(--border-subtle)',
                  background: 'transparent', color: 'rgba(255,255,255,0.5)', cursor: 'pointer',
                  transition: 'all 0.24s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(34,197,94,0.45)';
                  e.currentTarget.style.color = 'var(--color-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {SHORTCUTS.map((s) => (
                <li
                  key={s.label}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    gap: '18px', padding: '13px 4px',
                    borderBottom: '1px solid var(--border-subtle)',
                  }}
                >
                  <span style={{ color: 'rgba(255,255,255,0.68)', fontSize: '0.9063rem', lineHeight: 1.5 }}>
                    {s.label}
                    <span style={{ display: 'block', color: 'rgba(255,255,255,0.48)', fontSize: '0.7188rem', fontFamily: 'var(--font-mono)', marginTop: '3px' }}>
                      {s.context}
                    </span>
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0 }}>
                    {s.keys.map((k, i) => (
                      <span key={k} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                        {i > 0 && <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.7rem' }}>+</span>}
                        <Key>{k}</Key>
                      </span>
                    ))}
                  </span>
                </li>
              ))}
            </ul>

            <p style={{ marginTop: '22px', color: 'rgba(255,255,255,0.48)', fontSize: '0.8125rem', lineHeight: 1.65 }}>
              Press <Key>?</Key> at any time to bring this back.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
