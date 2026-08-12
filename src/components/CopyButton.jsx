import { useState, useCallback, useRef, useEffect } from 'react';
import { useToast } from './Toast';
import { trackCopy } from '../utils/analytics';

/* ═══════════════════════════════════════════════════════════
   COPY TO CLIPBOARD

   Wraps an email address, phone number or URL so it can be
   copied in one click. Two things worth noting:

   1. `navigator.clipboard` is unavailable on plain http and in
      older Safari, so there is a textarea + execCommand fallback.
      A copy control that silently fails is worse than no control.

   2. It confirms twice — inline (the icon flips to a tick) and
      through a toast. The inline tick is for the person watching
      their cursor; the toast is for screen readers, which get it
      through the live region.
   ═══════════════════════════════════════════════════════════ */

async function writeToClipboard(text) {
  if (navigator.clipboard?.writeText && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      /* fall through to the legacy path */
    }
  }

  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '-1000px';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, text.length);
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

export default function CopyButton({
  value,
  /** 'email' | 'phone' | 'link' — used for the toast copy and analytics */
  type = 'link',
  label,
  children,
  className = '',
  style = {},
  iconOnly = false,
}) {
  const [copied, setCopied] = useState(false);
  const toast = useToast();
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const LABELS = {
    email: 'Email address copied',
    phone: 'Phone number copied',
    link: 'Link copied',
  };

  const copy = useCallback(async (e) => {
    e?.preventDefault();
    e?.stopPropagation();

    const ok = await writeToClipboard(value);

    if (ok) {
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2200);
      toast.success(LABELS[type] || LABELS.link, value);
      trackCopy(type, value);
    } else {
      toast.error('Could not copy', `Select and copy it manually: ${value}`);
    }
  }, [value, type, toast]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <button
      type="button"
      onClick={copy}
      className={`mc-copy-btn ${className}`}
      aria-label={copied ? 'Copied' : (label || `Copy ${type}`)}
      title={copied ? 'Copied' : (label || `Copy ${type}`)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: iconOnly ? 0 : '7px',
        padding: iconOnly ? '5px' : '5px 10px',
        borderRadius: 'var(--radius-sm)',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        color: copied ? 'var(--color-primary)' : 'rgba(255,255,255,0.42)',
        fontSize: '0.75rem',
        fontFamily: 'var(--font-mono)',
        transition: 'color 0.24s ease, background 0.24s ease',
        ...style,
      }}
    >
      {copied ? (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
      {!iconOnly && (children || (copied ? 'Copied' : 'Copy'))}
    </button>
  );
}
