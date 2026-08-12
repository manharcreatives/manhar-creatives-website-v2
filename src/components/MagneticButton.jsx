import { useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { prefersReducedMotion } from '../utils/motion';

/* ═══════════════════════════════════════════════════════════
   MAGNETIC BUTTON

   The button leans toward the cursor as it approaches. Three
   guards keep it from being a liability:

   1. Pull is skipped entirely under prefers-reduced-motion.
   2. It is skipped on touch devices — there is no cursor to
      follow, and the mousemove handler fires on tap on some
      Android browsers, making the button jump away from the
      finger that is trying to press it.
   3. Unrecognised props are forwarded. Previously `target`,
      `rel`, `type`, `disabled` and aria attributes were dropped
      on the floor, which silently broke `target="_blank"` on
      the download link and made disabled submit states
      impossible.
   ═══════════════════════════════════════════════════════════ */

function isCoarsePointer() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia?.('(pointer: coarse)').matches ?? false;
}

export default function MagneticButton({
  children,
  className = '',
  style = {},
  as = 'button',
  href,
  onClick,
  strength = 0.3,
  disabled = false,
  ...rest
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = useCallback((e) => {
    if (!ref.current || disabled) return;
    if (prefersReducedMotion() || isCoarsePointer()) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  }, [strength, x, y, disabled]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const Component = as === 'a' ? motion.a : motion.button;

  return (
    <Component
      ref={ref}
      className={className}
      style={{ ...style, x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      href={href}
      disabled={as === 'a' ? undefined : disabled}
      aria-disabled={disabled || undefined}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      {...rest}
    >
      {children}
    </Component>
  );
}
