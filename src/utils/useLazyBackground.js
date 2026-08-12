import { useEffect, useRef } from 'react';

/**
 * Attaches a decorative background-image to an element only once it is near the
 * viewport. The image is decoded off-DOM first so it never paints half-drawn —
 * a background that pops in mid-download is what makes a cinematic section feel
 * cheap, so we trade a few ms for one clean paint.
 */
export function useLazyBackground(imageUrl, rootMargin = '1400px 0px') {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !imageUrl) return;

    let cancelled = false;

    const apply = () => {
      const img = new Image();
      img.decoding = 'async';
      img.src = imageUrl;

      const paint = () => {
        if (cancelled || !ref.current) return;
        ref.current.style.backgroundImage = `url(${imageUrl})`;
      };

      if (img.decode) {
        img.decode().then(paint).catch(paint);
      } else {
        img.onload = paint;
        img.onerror = paint;
      }
    };

    if (typeof IntersectionObserver === 'undefined') {
      apply();
      return () => { cancelled = true; };
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            apply();
            io.disconnect();
          }
        });
      },
      { rootMargin }
    );

    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
    };
  }, [imageUrl, rootMargin]);

  return ref;
}

export default useLazyBackground;
