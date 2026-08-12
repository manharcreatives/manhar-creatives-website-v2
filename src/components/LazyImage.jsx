import { useState, useRef, useCallback } from 'react';

/* ═══════════════════════════════════════════════════════════
   LAZY IMAGE — blur-up (LQIP)

   The site has no pre-generated thumbnail pipeline, so instead
   of shipping a second tiny file per image we paint a blurred
   colour wash underneath and cross-fade the real image over it
   once it has decoded. Same perceived effect as a true LQIP,
   zero extra requests.

   The placeholder is a dark green-tinted gradient rather than a
   flat grey box because every image on this site sits on a near
   black surface — a grey rectangle is more visible than nothing.

   `onError` is handled: a broken image collapses to the
   placeholder plus its alt text instead of a browser glyph.
   ═══════════════════════════════════════════════════════════ */

const PLACEHOLDER =
  'linear-gradient(135deg, rgba(34,197,94,0.09) 0%, rgba(31,41,55,0.42) 45%, rgba(11,15,14,0.85) 100%)';

export default function LazyImage({
  src,
  alt = '',
  /** aspect-ratio box, e.g. '16 / 9' or '4 / 3'. Prevents layout shift. */
  ratio,
  /** cover (default) or contain */
  fit = 'cover',
  position = 'center',
  className = '',
  style = {},
  imgStyle = {},
  /** above-the-fold images should skip lazy loading */
  priority = false,
  sizes,
  srcSet,
  radius = 'var(--radius-lg)',
  onLoad,
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const imgRef = useRef(null);

  /* An image restored from cache can finish before React attaches
     the handler, leaving it stuck at opacity 0 forever. The ref
     callback checks `complete` to catch exactly that case. */
  const attach = useCallback((node) => {
    imgRef.current = node;
    if (node && node.complete && node.naturalWidth > 0) setLoaded(true);
  }, []);

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: radius,
        background: PLACEHOLDER,
        aspectRatio: ratio,
        ...style,
      }}
    >
      {/* Blur wash — fades out as the real image fades in */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          background: PLACEHOLDER,
          filter: 'blur(18px)',
          transform: 'scale(1.12)',
          opacity: loaded ? 0 : 1,
          transition: 'opacity 0.6s var(--ease-out-expo)',
          pointerEvents: 'none',
        }}
      />

      {/* Soft shimmer while we wait. Stops the moment the image
          lands, and never runs at all for reduced-motion users. */}
      {!loaded && !failed && (
        <span
          aria-hidden="true"
          className="mc-img-shimmer"
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
        />
      )}

      {!failed && (
        <img
          ref={attach}
          src={src}
          alt={alt}
          srcSet={srcSet}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => { setLoaded(true); onLoad?.(); }}
          onError={() => { setFailed(true); setLoaded(true); }}
          style={{
            position: ratio ? 'absolute' : 'relative',
            inset: ratio ? 0 : undefined,
            width: '100%',
            height: ratio ? '100%' : 'auto',
            objectFit: fit,
            objectPosition: position,
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'scale(1)' : 'scale(1.03)',
            transition: 'opacity 0.7s var(--ease-out-expo), transform 0.9s var(--ease-out-expo)',
            ...imgStyle,
          }}
        />
      )}

      {failed && (
        <span
          style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px', textAlign: 'center',
            color: 'rgba(255,255,255,0.48)', fontSize: '0.8125rem',
            fontFamily: 'var(--font-mono)', lineHeight: 1.5,
          }}
        >
          {alt || 'Image unavailable'}
        </span>
      )}
    </div>
  );
}
