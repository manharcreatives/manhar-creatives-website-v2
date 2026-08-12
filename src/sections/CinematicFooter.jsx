import { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ViewAnimator } from '../utils/useInViewLenis';
import { FOOTER_NAV, SITE, WHATSAPP_LINK } from '../data/site';
import CopyButton from '../components/CopyButton';
import { prefersReducedMotion, useReducedMotion } from '../utils/motion';
import { trackCta } from '../utils/analytics';

/* ── Floating particle ──────────────────────────────────── */
function Particle({ x, y, size, opacity, duration, delay }) {
  return (
    <motion.div
      style={{
        position: 'absolute', left: `${x}%`, top: `${y}%`,
        width: size, height: size, borderRadius: '50%',
        background: '#22C55E', pointerEvents: 'none',
        boxShadow: '0 0 6px rgba(34,197,94,0.8)',
      }}
      animate={{ opacity: [0, opacity, 0], y: [0, -80, -160], scale: [1, 0.7, 0.2] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeOut' }}
    />
  );
}

/* ── Magnetic CTA button ────────────────────────────────── */
function MagneticBtn({ children, href, internal = false, onClick }) {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 200, damping: 20 });
  const y = useSpring(0, { stiffness: 200, damping: 20 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e) => {
    /* Guard the ref — this fires on pointer events that can
       arrive during unmount — and skip the pull entirely when
       the visitor has asked for reduced motion. */
    const node = ref.current;
    if (!node || prefersReducedMotion()) return;
    const r = node.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.35);
    y.set((e.clientY - r.top - r.height / 2) * 0.35);
  };
  const onLeave = () => { x.set(0); y.set(0); setHovered(false); };

  const MotionAnchor = internal ? motion(Link) : motion.a;
  const linkProps = internal ? { to: href } : { href };

  return (
    <MotionAnchor
      ref={ref} {...linkProps}
      style={{ x, y, display: 'inline-block', textDecoration: 'none' }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <motion.div
        animate={{
          background: hovered ? 'linear-gradient(135deg,#22C55E,#4ADE80)' : 'transparent',
          borderColor: hovered ? '#4ADE80' : 'rgba(34,197,94,0.4)',
          boxShadow: hovered
            ? '0 0 48px rgba(34,197,94,0.5), 0 0 100px rgba(34,197,94,0.2)'
            : '0 0 0px rgba(34,197,94,0)',
          color: hovered ? '#0B0F0E' : '#22C55E',
        }}
        transition={{ duration: 0.3 }}
        style={{
          padding: '18px 48px', borderRadius: '9999px',
          border: '1px solid rgba(34,197,94,0.4)',
          fontFamily: 'var(--font-body)', fontWeight: 700,
          fontSize: '1rem', letterSpacing: '0.05em', cursor: 'pointer',
        }}
      >
        {children}
      </motion.div>
    </MotionAnchor>
  );
}

/* ── Social pill ────────────────────────────────────────── */
function SocialLink({ label, href, icon }) {
  const [h, setH] = useState(false);
  return (
    <motion.a
      href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      animate={{
        borderColor: h ? 'rgba(34,197,94,0.6)' : 'rgba(255,255,255,0.08)',
        background: h ? 'rgba(34,197,94,0.08)' : 'rgba(0,0,0,0)',
        y: h ? -4 : 0,
        boxShadow: h ? '0 8px 28px rgba(34,197,94,0.2)' : '0 0 0px rgba(34,197,94,0)',
      }}
      transition={{ duration: 0.22 }}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '10px',
        padding: '10px 20px', borderRadius: '9999px',
        border: '1px solid rgba(255,255,255,0.08)',
        textDecoration: 'none',
        color: h ? '#22C55E' : 'rgba(255,255,255,0.5)',
        fontSize: '0.8125rem', fontFamily: 'var(--font-mono)',
        letterSpacing: '0.1em', transition: 'color 0.22s',
      }}
    >
      <span style={{ fontSize: '1rem' }}>{icon}</span>{label}
    </motion.a>
  );
}

/* ── Footer nav link ────────────────────────────────────── */
function FooterLink({ href, children, external = false }) {
  const [h, setH] = useState(false);

  const style = {
    display: 'flex', alignItems: 'center', gap: '10px',
    fontSize: '0.9375rem', color: h ? '#fff' : 'rgba(255,255,255,0.5)',
    textDecoration: 'none', transition: 'color 0.28s', width: 'fit-content',
  };

  const inner = (
    <>
      <motion.span
        animate={{ width: h ? '18px' : '0px', opacity: h ? 1 : 0 }}
        transition={{ duration: 0.22 }}
        style={{ display: 'inline-block', height: '1px', background: '#22C55E', overflow: 'hidden', flexShrink: 0 }}
      />
      {children}
    </>
  );

  const handlers = { onMouseEnter: () => setH(true), onMouseLeave: () => setH(false) };

  if (external || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={style} {...handlers}>
        {inner}
      </a>
    );
  }

  return (
    <Link to={href} style={style} {...handlers}>
      {inner}
    </Link>
  );
}

/* ── Single MANHAR letter with hover glow ───────────────── */
function GlowLetter({ char }) {
  const [h, setH] = useState(false);
  return (
    <motion.span
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      animate={{
        scale: h ? 1.05 : 1,
        y: h ? -8 : 0,
      }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'inline-block',
        cursor: 'default',
        color: 'transparent',
        WebkitTextStroke: h ? '1.5px rgba(34,197,94,0.85)' : '1px rgba(255,255,255,0.09)',
        textShadow: h
          ? '0 0 40px rgba(34,197,94,0.7), 0 0 80px rgba(34,197,94,0.35)'
          : 'none',
        transition: 'webkit-text-stroke 0.2s, text-shadow 0.2s',
        filter: h ? 'drop-shadow(0 0 20px rgba(34,197,94,0.6))' : 'none',
      }}
    >
      {char}
    </motion.span>
  );
}

/* ─────────────────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────────────────── */
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: 15 + Math.random() * 75,
  size: 1 + Math.random() * 2.5,
  opacity: 0.3 + Math.random() * 0.5,
  duration: 4 + Math.random() * 6,
  delay: Math.random() * 6,
}));

const MANHAR_LETTERS = ['M', 'A', 'N', 'H', 'A', 'R'];

/* ─────────────────────────────────────────────────────────
   MAIN FOOTER
───────────────────────────────────────────────────────── */
export default function CinematicFooter() {
  const footerRef  = useRef(null);
  const glowRef    = useRef(null);
  const [year]     = useState(new Date().getFullYear());
  const reduceMotion = useReducedMotion();

  // MANHAR parallax
  const manharMX = useMotionValue(0);
  const manharX  = useSpring(manharMX, { stiffness: 40, damping: 15 });

  const handleMouse = useCallback((e) => {
    const r = footerRef.current?.getBoundingClientRect();
    if (!r) return;
    // Move glow blob to mouse position
    if (glowRef.current) {
      glowRef.current.style.left = (e.clientX - r.left) + 'px';
      glowRef.current.style.top  = (e.clientY - r.top)  + 'px';
    }
    // MANHAR parallax
    const cx = (e.clientX - r.left - r.width / 2) / r.width;
    manharMX.set(cx * -20);
  }, [manharMX]);

  return (
    <footer
      ref={footerRef}
      onMouseMove={handleMouse}
      role="contentinfo"
      aria-label="Site footer"
      style={{ position: 'relative', overflow: 'hidden', background: '#0B0F0E' }}
    >
      {/* ── Animated sweeping top border ─────────────────── */}
      <motion.div
        animate={{ backgroundPosition: ['0% 50%', '200% 50%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '1px', zIndex: 3,
          background: 'linear-gradient(90deg, transparent, #22C55E, #4ADE80, #22C55E, transparent)',
          backgroundSize: '200% 100%',
        }}
      />

      {/* ── Particles ───────────────────────────────────────
          Twenty independent infinite animations are pure
          decoration, so they are skipped outright rather than
          sped up when the visitor has asked for reduced motion —
          a 0.01ms loop still repaints on every frame. */}
      {!reduceMotion && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          {PARTICLES.map(p => <Particle key={p.id} {...p} />)}
        </div>
      )}

      {/* ── Mouse-following glow blob (DOM ref, no motion value) ── */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute', zIndex: 0, pointerEvents: 'none',
          width: '600px', height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,197,94,0.07) 0%, transparent 70%)',
          filter: 'blur(24px)',
          transform: 'translate(-50%, -50%)',
          left: '50%', top: '50%',
          transition: 'left 0.12s ease-out, top 0.12s ease-out',
        }}
      />

      {/* ── Dot grid ──────────────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(34,197,94,0.12) 1px, transparent 1px)',
        backgroundSize: '44px 44px',
        maskImage: 'radial-gradient(ellipse 90% 70% at 50% 0%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 0%, black 20%, transparent 100%)',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '120px', paddingBottom: '48px' }}>

        {/* ══ CTA ═════════════════════════════════════════ */}
        <ViewAnimator
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: '100px' }}
        >
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            letterSpacing: '0.25em', color: '#22C55E',
            marginBottom: '20px', textTransform: 'uppercase',
          }}>
            ✦ Ready to grow?
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 600, lineHeight: 1.05,
            letterSpacing: '-0.03em', color: '#fff',
            marginBottom: '24px',
          }}>
            Let's Build{' '}
            <span style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #22C55E, #4ADE80)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
              paddingRight: '14px',
            }}>
              Something That Works
            </span>.
          </h2>
          <p style={{
            fontSize: '1.0625rem',
            color: 'rgba(255,255,255,0.55)',
            maxWidth: '480px',
            margin: '0 auto 40px',
            lineHeight: 1.7,
          }}>
            Get in touch to discuss your project goals, explore how we can help, or schedule a consultation.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <MagneticBtn href="/contact" internal onClick={() => trackCta('Book a Discovery Call', 'footer', '/contact')}>
              Book a Discovery Call
            </MagneticBtn>
            <motion.a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 6 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '18px 28px', color: 'rgba(255,255,255,0.48)',
                fontFamily: 'var(--font-body)', fontWeight: 600,
                fontSize: '1rem', textDecoration: 'none', transition: 'color 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
            >
              Send a Message →
            </motion.a>
          </div>
        </ViewAnimator>

        {/* ── Divider ───────────────────────────────────── */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)', marginBottom: '80px' }} />

        {/* ══ 3-COL GRID ══════════════════════════════════ */}
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.6fr repeat(4, 1fr)', gap: '48px', marginBottom: '80px' }}>

          {/* Brand */}
          <ViewAnimator initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.6 }}>
            <img
              src="/images/logos/footer-logo.webp"
              alt="Manhar Creatives — Website Development, Branding & Digital Solutions in Ahmedabad, Mehsana, Visnagar, Gujarat"
              loading="lazy" decoding="async"
              style={{ height: 48, width: 'auto', marginBottom: '20px' }}
            />
            <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.48)', lineHeight: 1.8, maxWidth: '300px', marginBottom: '28px' }}>
              A digital solutions and branding partner focused on helping businesses build credible, professional, and growth-oriented digital presence.
            </p>
            {/* Contact details are copyable as well as clickable.
                On a desktop `mailto:` opens a mail client many
                people have never configured — copying the address
                is the action they were going to take anyway. */}
            <address style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontStyle: 'normal' }}>
              {[
                { icon: '◎', text: 'info@manharcreatives.com', href: 'mailto:info@manharcreatives.com', copy: 'email' },
                { icon: '◈', text: '+91 97145 71522', href: 'tel:+919714571522', copy: 'phone' },
                { icon: '◆', text: 'Visnagar, Gujarat, India', href: null, copy: null },
              ].map(({ icon, text, href, copy }) => (
                <span key={text} style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                  <motion.a
                    href={href || undefined}
                    whileHover={href && !prefersReducedMotion() ? { x: 5 } : {}}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      color: 'rgba(255,255,255,0.48)', fontSize: '0.875rem',
                      textDecoration: 'none', cursor: href ? 'pointer' : 'default',
                      transition: 'color 0.25s',
                    }}
                    onMouseEnter={e => { if (href) e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; }}
                    onMouseLeave={e => { if (href) e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
                  >
                    <span aria-hidden="true" style={{ fontSize: '0.85rem' }}>{icon}</span>
                    {text}
                  </motion.a>
                  {copy && <CopyButton value={text} type={copy} iconOnly label={`Copy ${copy}`} />}
                </span>
              ))}
            </address>
            </ViewAnimator>

          {/* Link columns */}
          {Object.entries(FOOTER_NAV).map(([heading, links], col) => (
            <ViewAnimator
              key={heading}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.08 * (col + 1) }}
            >
              <h4 id={`footer-nav-${heading.toLowerCase()}`} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#22C55E', marginBottom: '26px', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                {heading}
              </h4>
              <nav aria-labelledby={`footer-nav-${heading.toLowerCase()}`} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {links.map(l => (
                  <FooterLink key={l.label} href={l.href} external={l.external}>{l.label}</FooterLink>
                ))}
              </nav>
            </ViewAnimator>
          ))}
        </div>

        {/* ══ SOCIAL PILLS ════════════════════════════════ */}
        <ViewAnimator
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: false }} transition={{ duration: 0.6, delay: 0.25 }}
          style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '88px' }}
        >
          <SocialLink href="https://instagram.com/manhar.creatives" icon="✦" label="@manhar.creatives" />
          <SocialLink href="mailto:info@manharcreatives.com"        icon="◎"  label="Email Us"          />
          <SocialLink href="tel:+919714571522"                       icon="◈" label="+91 97145 71522"   />
          <a
            href="https://drive.google.com/uc?export=download&id=1RdGn0DZyyL_f2liZHFeJVqLUyYGWKSny"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '10px 20px', borderRadius: '9999px',
              border: '1px solid rgba(255,255,255,0.08)',
              textDecoration: 'none',
              color: 'rgba(255,255,255,0.5)',
              fontSize: '0.8125rem', fontFamily: 'var(--font-mono)',
              letterSpacing: '0.1em',
              transition: 'all 0.22s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(34,197,94,0.6)'; e.currentTarget.style.background = 'rgba(34,197,94,0.08)'; e.currentTarget.style.color = '#22C55E'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(34,197,94,0.2)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(0,0,0,0)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.boxShadow = '0 0 0px rgba(34,197,94,0)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <span style={{ fontSize: '1.2rem', display: 'flex', lineHeight: 1 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </span>Company Profile
          </a>
        </ViewAnimator>

        {/* ══ GIANT MANHAR - per-letter hover glow ════════ */}
        <div style={{ position: 'relative', overflow: 'visible' }}>
          {/* Ambient glow */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '70%', height: '100%',
            background: 'radial-gradient(ellipse, rgba(34,197,94,0.05) 0%, transparent 65%)',
            filter: 'blur(60px)', pointerEvents: 'none',
          }} />

          <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />

          <ViewAnimator
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ x: manharX }}
          >
            <div style={{
              fontFamily: 'var(--font-display)', fontWeight: 600,
              fontSize: 'clamp(5rem, 18vw, 15rem)',
              letterSpacing: '-0.04em',
              textAlign: 'center', lineHeight: 0.9,
              userSelect: 'none',
              display: 'flex', justifyContent: 'center',
              paddingTop: '16px', paddingBottom: '12px',
            }}>
              {MANHAR_LETTERS.map((char, i) => (
                <GlowLetter key={i} char={char} />
              ))}
            </div>
          </ViewAnimator>

          <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />
        </div>

        {/* ══ BOTTOM BAR ══════════════════════════════════ */}
        <div
          className="footer-bottom"
          style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', flexWrap: 'wrap', gap: '18px',
            paddingTop: '32px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.48)', fontFamily: 'var(--font-mono)' }}>
              © {year} {SITE.name} — All rights reserved.
            </span>
            <span aria-hidden="true" style={{ color: 'rgba(255,255,255,0.12)' }}>|</span>
            <nav style={{ display: 'flex', gap: '18px', flexWrap: 'wrap' }} aria-label="Legal">
              {[
                { label: 'Privacy Policy', href: '/privacy-policy' },
                { label: 'Terms & Conditions', href: '/terms-and-conditions' },
                { label: 'Sitemap', href: '/sitemap.xml', external: true },
              ].map((l) =>
                l.external ? (
                  <a
                    key={l.href}
                    href={l.href}
                    style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.48)', fontFamily: 'var(--font-mono)', textDecoration: 'none', transition: 'color 0.25s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#22C55E'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.32)'; }}
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link
                    key={l.href}
                    to={l.href}
                    style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.48)', fontFamily: 'var(--font-mono)', textDecoration: 'none', transition: 'color 0.25s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#22C55E'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.32)'; }}
                  >
                    {l.label}
                  </Link>
                )
              )}
            </nav>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <motion.span
              animate={{ opacity: [1, 0.2, 1], scale: [1, 0.8, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: '7px', height: '7px', borderRadius: '50%',
                background: '#22C55E', display: 'inline-block',
                boxShadow: '0 0 8px rgba(34,197,94,0.7)',
              }}
            />
            <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.48)', fontFamily: 'var(--font-mono)' }}>
              Available for new projects
            </span>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 1100px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 560px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
          .footer-bottom { flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>
    </footer>
  );
}
