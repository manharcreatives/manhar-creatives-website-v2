import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from '../components/TextReveal';
import { ViewAnimator } from '../utils/useInViewLenis';
import { FAQS } from '../utils/constants';

function FAQItem({ item, index }) {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => setOpen(o => !o), []);

  /* Previously the whole card was a `role="button"` div with a
     manual Enter/Space handler. Two problems with that: the
     accessible name included the answer text once expanded (so
     screen readers announced the entire answer as the button
     label), and the answer's own links became unreachable
     children of a control. The trigger is now a real <button>
     wrapping only the question row. */
  return (
    <ViewAnimator
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ delay: Math.min(index * 0.08, 0.4), duration: 0.5 }}
      style={{
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        padding: '32px 0',
      }}
    >
      <h3 style={{ margin: 0 }}>
        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-controls={`faq-answer-${index}`}
          id={`faq-question-${index}`}
          style={{
            width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            gap: '24px', padding: 0, background: 'none', border: 'none',
            cursor: 'pointer', textAlign: 'left', font: 'inherit', color: 'inherit',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
            <span
              aria-hidden="true"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.875rem',
                color: open ? 'var(--color-primary)' : 'rgba(255,255,255,0.45)',
                marginTop: '4px',
                transition: 'color 0.3s',
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <span style={{
              fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
              fontWeight: 400,
              color: open ? '#fff' : 'rgba(255,255,255,0.72)',
              transition: 'color 0.3s',
              fontFamily: 'var(--font-display)',
              lineHeight: 1.4,
            }}>
              {item.q}
            </span>
          </span>
          <motion.span
            aria-hidden="true"
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: '40px', height: '40px',
              borderRadius: '50%',
              border: `1px solid ${open ? 'var(--color-primary)' : 'rgba(255,255,255,0.2)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
              color: open ? 'var(--color-primary)' : 'rgba(255,255,255,0.5)',
              transition: 'border-color 0.3s, color 0.3s',
            }}
          >
            <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>+</span>
          </motion.span>
        </button>
      </h3>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ overflow: 'hidden' }}
        id={`faq-answer-${index}`}
        role="region"
        aria-labelledby={`faq-question-${index}`}
        /* Collapsed content must leave the tab order and the
           accessibility tree, not just be visually clipped —
           height:0 + overflow:hidden hides it from eyes only. */
        aria-hidden={!open}
        inert={!open}
      >
        <p style={{ 
          paddingTop: '24px', 
          paddingLeft: '45px', // Align with text, not number
          fontSize: '1.0625rem', 
          color: 'rgba(255,255,255,0.6)', 
          lineHeight: 1.8, 
          maxWidth: '600px' 
        }}>
          {item.a}
        </p>
      </motion.div>
    </ViewAnimator>
  );
}

export default function FAQSection() {
  return (
    <section style={{ background: 'var(--bg)', padding: '160px 0', position: 'relative' }}>
      <div className="container">

        {/* ── Full-width header above grid ── */}
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ height: '1px', width: '40px', background: 'var(--color-primary)' }} />
            <span className="text-caption" style={{ color: 'var(--color-primary)', letterSpacing: '0.15em' }}>
              CLARITY
            </span>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 5vw, 4.5rem)',
            fontWeight: 600, lineHeight: 1.1,
            marginBottom: '16px',
            letterSpacing: '-0.02em', color: '#fff',
          }}>
            Frequently <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.6)' }}>Asked Questions</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p style={{
            fontSize: '1.0625rem',
            color: 'rgba(255,255,255,0.55)',
            maxWidth: '500px',
            lineHeight: 1.7,
            marginBottom: '64px',
          }}>
            Clear answers to common questions about our process, services, timelines, and how we work.
          </p>
        </FadeIn>

        {/* ── Two-column: image left, FAQ right ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '80px', alignItems: 'stretch' }}>

          {/* Left: full-height wrapper → sticky image */}
          <div style={{ position: 'relative' }}>
            <FadeIn delay={0.15}>
              <div style={{ position: 'sticky', top: '120px' }}>
                <div style={{ position: 'relative', paddingBottom: '200%', overflow: 'hidden', borderRadius: '4px' }}>
                  <img
                    src="/images/backgrounds/faq-bg.webp"
                    alt="Abstract architectural pattern representing structured business solutions by Manhar Creatives"
                    loading="lazy" decoding="async"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(1.1)' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,15,14,0.8), transparent)' }} />
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right: FAQ Accordions */}
          <div>
            {FAQS.map((faq, i) => <FAQItem key={i} item={faq} index={i} />)}
          </div>

        </div>

        <style>{`
          @media (max-width: 992px) {
            [style*="grid-template-columns: 1fr 1.2fr"] { grid-template-columns: 1fr !important; gap: 40px !important; }
            [style*="position: sticky"] { position: relative !important; top: 0 !important; }
          }
        `}</style>
      </div>
    </section>
  );
}
