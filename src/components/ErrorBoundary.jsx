import { Component } from 'react';

/* ═══════════════════════════════════════════════════════════
   ERROR BOUNDARY

   Two levels of recovery, in order of how much they cost the
   visitor:

     1. "Try again" — clears the error state and re-renders. If
        the failure was transient (a chunk that failed to load,
        a race on first paint) this costs nothing and keeps
        their scroll position, their form input and their place.
     2. "Reload" — the nuclear option, offered second.

   Also offers a route home, because an error inside one section
   does not mean the rest of the site is broken.

   The technical detail is available on demand in development
   and hidden entirely in production: a stack trace tells a
   business owner nothing except that something is badly wrong.
   ═══════════════════════════════════════════════════════════ */

const isDev = typeof import.meta !== 'undefined' && import.meta.env?.DEV;

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, retries: 0 };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    /* Reported to Tag Manager so a spike in client-side crashes
       is visible in the same place as everything else, without
       taking on an error-monitoring vendor. */
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'mc_app_error',
        error_message: String(error?.message || error).slice(0, 300),
        error_path: typeof window !== 'undefined' ? window.location.pathname : '',
      });
    } catch {
      /* ignore */
    }

    if (isDev) console.error('ErrorBoundary caught:', error, info);
  }

  handleRetry = () => {
    this.setState((s) => ({ hasError: false, error: null, retries: s.retries + 1 }));
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    /* If retrying has already failed once, stop offering it as
       the primary action — repeating a button that does not work
       is worse than admitting it did not. */
    const retryExhausted = this.state.retries >= 2;

    const btnBase = {
      padding: '13px 30px',
      borderRadius: '40px',
      fontSize: '0.9375rem',
      cursor: 'pointer',
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      minHeight: '48px',
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
    };

    return (
      <div
        role="alert"
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          /* Route-level boundaries sit between the nav and the
             footer, so they take a shorter box than the root one
             that has the whole viewport to itself. */
          minHeight: this.props.inline ? '68vh' : '100vh',
          background: '#0B0F0E', color: '#fff',
          padding: this.props.inline ? '80px 24px' : '40px 24px',
          textAlign: 'center', fontFamily: 'var(--font-body)',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            width: '64px', height: '64px', marginBottom: '26px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: '50%', border: '1px solid rgba(34,197,94,0.28)',
            background: 'rgba(34,197,94,0.06)', color: '#22C55E', fontSize: '1.6rem',
          }}
        >
          ◆
        </div>

        {/* An inline boundary lives inside a page that already has
            an <h1>; two h1s on one page is a heading-structure
            error, so the nested case steps down to h2. */}
        {this.props.inline ? (
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 600, marginBottom: '14px' }}>
            Something went wrong
          </h2>
        ) : (
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 600, marginBottom: '14px' }}>
            Something went wrong
          </h1>
        )}

        <p style={{ color: 'rgba(255,255,255,0.62)', maxWidth: '460px', lineHeight: 1.75, marginBottom: '32px' }}>
          {retryExhausted
            ? 'That did not recover. Reloading the page usually clears it, and if it keeps happening, tell us and we will fix it.'
            : 'This part of the page failed to load. Trying again usually fixes it without losing where you were.'}
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {!retryExhausted && (
            <button
              type="button"
              onClick={this.handleRetry}
              style={{ ...btnBase, border: 'none', background: '#22C55E', color: '#0B0F0E' }}
            >
              ↻ Try again
            </button>
          )}

          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              ...btnBase,
              border: '1px solid #22C55E',
              background: retryExhausted ? '#22C55E' : 'transparent',
              color: retryExhausted ? '#0B0F0E' : '#22C55E',
            }}
          >
            Reload page
          </button>

          <a
            href="/"
            style={{ ...btnBase, border: '1px solid rgba(255,255,255,0.16)', background: 'transparent', color: 'rgba(255,255,255,0.7)' }}
          >
            Go to homepage
          </a>
        </div>

        <p style={{ marginTop: '34px', color: 'rgba(255,255,255,0.36)', fontSize: '0.875rem', lineHeight: 1.7 }}>
          Still stuck? Email{' '}
          <a href="mailto:info@manharcreatives.com" style={{ color: '#22C55E' }}>
            info@manharcreatives.com
          </a>{' '}
          or call{' '}
          <a href="tel:+919714571522" style={{ color: '#22C55E' }}>
            +91 97145 71522
          </a>
          .
        </p>

        {isDev && this.state.error && (
          <details style={{ marginTop: '28px', maxWidth: '620px', width: '100%', textAlign: 'left' }}>
            <summary style={{ cursor: 'pointer', color: 'rgba(255,255,255,0.4)', fontSize: '0.8125rem', fontFamily: 'var(--font-mono)' }}>
              Technical detail (development only)
            </summary>
            <pre
              style={{
                marginTop: '12px', padding: '16px', overflowX: 'auto',
                borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.03)', color: 'rgba(255,255,255,0.6)',
                fontSize: '0.75rem', lineHeight: 1.6, whiteSpace: 'pre-wrap',
              }}
            >
              {String(this.state.error?.stack || this.state.error)}
            </pre>
          </details>
        )}
      </div>
    );
  }
}
