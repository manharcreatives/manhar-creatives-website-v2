import {
  createContext, useContext, useState, useCallback, useRef, useEffect, useMemo,
} from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { EASE } from '../utils/motion';

/* ═══════════════════════════════════════════════════════════
   TOAST NOTIFICATIONS

   Transient confirmations — "Copied", "Message sent", "That
   didn't go through". Deliberately small in scope: a toast is
   for something the visitor already knows they did. Anything
   they need to read carefully belongs inline, next to the thing
   it is about, not in a corner that disappears.

   Rendered through a portal into <body> so no ancestor's
   overflow, transform or stacking context can clip it — the
   same class of bug that made the floating call button vanish
   on Android Chrome.
   ═══════════════════════════════════════════════════════════ */

const ToastContext = createContext(null);

const TYPES = {
  success: {
    accent: '#22C55E',
    tint: 'rgba(34,197,94,0.10)',
    border: 'rgba(34,197,94,0.32)',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  error: {
    accent: '#F87171',
    tint: 'rgba(239,68,68,0.10)',
    border: 'rgba(239,68,68,0.34)',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    ),
  },
  info: {
    accent: '#60A5FA',
    tint: 'rgba(96,165,250,0.10)',
    border: 'rgba(96,165,250,0.32)',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
  },
};

const MAX_VISIBLE = 3;

function ToastCard({ toast, onDismiss }) {
  const config = TYPES[toast.type] || TYPES.info;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 40, scale: 0.94 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 40, scale: 0.94, transition: { duration: 0.22, ease: EASE } }}
      transition={{ duration: 0.36, ease: EASE }}
      role="status"
      style={{
        pointerEvents: 'auto',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        minWidth: '260px',
        maxWidth: '380px',
        padding: '14px 16px',
        borderRadius: 'var(--radius-md)',
        border: `1px solid ${config.border}`,
        background: `linear-gradient(135deg, ${config.tint}, rgba(11,15,14,0.94))`,
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        boxShadow: '0 18px 46px rgba(0,0,0,0.5)',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          flexShrink: 0, marginTop: '1px',
          width: '22px', height: '22px', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: config.tint, color: config.accent,
        }}
      >
        {config.icon}
      </span>

      <div style={{ flex: 1, minWidth: 0 }}>
        {toast.title && (
          <p style={{ color: '#fff', fontSize: '0.9063rem', fontWeight: 600, lineHeight: 1.4, marginBottom: toast.message ? '3px' : 0 }}>
            {toast.title}
          </p>
        )}
        {toast.message && (
          <p style={{ color: 'rgba(255,255,255,0.62)', fontSize: '0.8438rem', lineHeight: 1.55 }}>
            {toast.message}
          </p>
        )}
        {toast.action && (
          <button
            type="button"
            onClick={() => { toast.action.onClick?.(); onDismiss(toast.id); }}
            style={{
              marginTop: '10px', padding: '6px 14px', borderRadius: 'var(--radius-full)',
              border: `1px solid ${config.border}`, background: 'transparent',
              color: config.accent, fontSize: '0.75rem', fontFamily: 'var(--font-mono)',
              letterSpacing: '0.04em', cursor: 'pointer', minHeight: '30px',
            }}
          >
            {toast.action.label}
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
        style={{
          flexShrink: 0, width: '24px', height: '24px', padding: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'rgba(255,255,255,0.48)', borderRadius: '6px',
          transition: 'color 0.2s ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </motion.div>
  );
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const dismiss = useCallback((id) => {
    const t = timers.current.get(id);
    if (t) { clearTimeout(t); timers.current.delete(id); }
    setToasts((list) => list.filter((x) => x.id !== id));
  }, []);

  const push = useCallback((toast) => {
    const id = `t${Date.now()}${Math.random().toString(36).slice(2, 7)}`;
    const duration = toast.duration ?? 5000;

    setToasts((list) => {
      const next = [...list, { ...toast, id }];
      /* Cap the stack. A visitor who clicks "copy" eight times
         should see the newest confirmations, not a wall. */
      return next.length > MAX_VISIBLE ? next.slice(next.length - MAX_VISIBLE) : next;
    });

    if (duration > 0) {
      timers.current.set(id, setTimeout(() => dismiss(id), duration));
    }
    return id;
  }, [dismiss]);

  /* Clear every pending timer if the provider ever unmounts. */
  useEffect(() => {
    const map = timers.current;
    return () => { map.forEach(clearTimeout); map.clear(); };
  }, []);

  const api = useMemo(() => ({
    toast: push,
    success: (title, message, opts) => push({ type: 'success', title, message, ...opts }),
    error: (title, message, opts) => push({ type: 'error', title, message, duration: 7000, ...opts }),
    info: (title, message, opts) => push({ type: 'info', title, message, ...opts }),
    dismiss,
  }), [push, dismiss]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      {mounted && createPortal(
        <div
          className="mc-toast-viewport"
          aria-live="polite"
          aria-atomic="false"
          style={{
            position: 'fixed',
            top: 'calc(env(safe-area-inset-top, 0px) + 84px)',
            right: '20px',
            zIndex: 2147483646,
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            pointerEvents: 'none',
            maxWidth: 'calc(100vw - 40px)',
          }}
        >
          <AnimatePresence initial={false}>
            {toasts.map((t) => (
              <ToastCard key={t.id} toast={t} onDismiss={dismiss} />
            ))}
          </AnimatePresence>
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}

/* A no-op fallback keeps components usable outside the provider
   (Storybook, isolated tests, the prerenderer) instead of throwing. */
const NOOP_API = {
  toast: () => {}, success: () => {}, error: () => {}, info: () => {}, dismiss: () => {},
};

export function useToast() {
  return useContext(ToastContext) || NOOP_API;
}

export default ToastProvider;
