
import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from '../components/TextReveal';
import { ViewAnimator } from '../utils/useInViewLenis';
import { PROJECTS } from '../utils/constants';
import { trackCta, trackVideoPlay } from '../utils/analytics';

function FullscreenProject({ project, index }) {
  const ref = useRef(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <div ref={ref} style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      minHeight: '800px',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
    }}>
      {project.video && !videoFailed ? (
        <>
          {/* The poster is painted as a real background layer rather
              than relying on the <video poster> attribute alone —
              Safari drops the poster the instant metadata arrives,
              leaving a black rectangle until the first frame
              decodes. This one stays until the video is playable. */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute', inset: 0, zIndex: 0,
              backgroundImage: `url(${project.image})`,
              backgroundSize: 'cover', backgroundPosition: 'center',
              opacity: videoReady ? 0 : 1,
              transition: 'opacity 0.8s var(--ease-out-expo)',
            }}
          />
          {!videoReady && (
            <div
              aria-hidden="true"
              style={{
                position: 'absolute', inset: 0, zIndex: 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                pointerEvents: 'none',
              }}
            >
              <span className="mc-spinner" style={{ opacity: 0.55 }} />
            </div>
          )}
          <motion.video
            autoPlay loop muted playsInline preload="metadata" poster={project.image}
            aria-label={`${project.title}: showreel`}
            tabIndex={-1}
            onCanPlay={() => setVideoReady(true)}
            onPlaying={() => trackVideoPlay(project.title, 'project_showcase')}
            onError={() => setVideoFailed(true)}
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', zIndex: 0,
              opacity: videoReady ? 1 : 0,
              transition: 'opacity 0.8s var(--ease-out-expo)',
              scale,
            }}
          >
            <source src={project.video} type="video/mp4" />
          </motion.video>
          <div style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background: 'linear-gradient(to top, rgba(11,15,14,0.95) 0%, rgba(11,15,14,0.2) 50%, transparent 100%)',
            pointerEvents: 'none',
          }} />
        </>
      ) : project.url && !project.useImage ? (
        <>
          <iframe
            src={project.url}
            title={project.title}
            loading="lazy"
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              border: 'none', zIndex: 0,
            }}
          />
          <div style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background: 'linear-gradient(to top, rgba(11,15,14,0.95) 0%, rgba(11,15,14,0.2) 50%, transparent 100%)',
            pointerEvents: 'none',
          }} />
        </>
      ) : (
        <>
          {/* Background Image with Parallax */}
          <motion.div
            role="img"
            aria-label={`${project.title} showcase`}
            style={{
              position: 'absolute',
              inset: -100,
              backgroundImage: `url(${project.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              y,
              scale,
              zIndex: 0
            }}
          />

          {/* Dark Gradient Overlay for text readability */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(11,15,14,0.95) 0%, rgba(11,15,14,0.4) 50%, rgba(11,15,14,0.1) 100%)',
            zIndex: 1
          }} />
        </>
      )}

      {/* Content */}
      <div className="container project-content-container" style={{ position: 'relative', zIndex: 2, paddingTop: '20vh' }}>
        <ViewAnimator
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-20%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: '800px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <span style={{ fontSize: '1rem', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <div style={{ height: '1px', width: '40px', background: 'var(--text-primary)', opacity: 0.5 }} />
            <span className="text-caption" style={{ color: 'var(--text-primary)', letterSpacing: '0.2em' }}>
              {project.category}
            </span>
          </div>
          
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 7vw, 6rem)',
            fontWeight: 600,
            lineHeight: 1.05,
            marginBottom: '32px',
            letterSpacing: '-0.03em',
            color: '#fff'
          }}>
            {project.title}
          </h3>

          <p style={{
            fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
            color: 'rgba(255,255,255,0.8)',
            lineHeight: 1.6,
            marginBottom: '40px',
            maxWidth: '600px',
            fontWeight: 400
          }}>
            {project.description}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '48px' }}>
            {project.tags.map(t => (
              <span key={t} style={{
                padding: '8px 20px',
                borderRadius: '40px',
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(10px)',
                color: '#fff',
                fontSize: '0.875rem'
              }}>
                {t}
              </span>
            ))}
          </div>

          {(project.url || project.showCta) && (
            <a
              href={project.ctaUrl || project.url || '#'}
              target={(project.ctaUrl || project.url) ? '_blank' : undefined}
              rel={(project.ctaUrl || project.url) ? 'noopener noreferrer' : undefined}
              onClick={() => trackCta(`View project: ${project.title}`, 'project_showcase', project.ctaUrl || project.url)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                color: '#fff',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                borderBottom: '1px solid rgba(255,255,255,0.3)',
                paddingBottom: '8px',
                transition: 'border-color 0.3s'
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#fff'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'}
            >
              {(project.ctaUrl || project.url) ? 'View Website' : 'View Project'}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          )}
        </ViewAnimator>
      </div>
    </div>
  );
}

export default function ProjectShowcase() {
  return (
    <section id="projects" style={{ background: 'var(--bg)' }}>
      <div style={{ padding: 'var(--space-5xl) 0', textAlign: 'center' }}>
        <FadeIn><div className="pill" style={{ margin: '0 auto 24px', width: 'fit-content' }}><span className="pill-dot" />SHOWCASE</div></FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="text-heading-1" style={{ maxWidth: '800px', margin: '0 auto 16px' }}>
            Built for Real <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Businesses</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p style={{
            fontSize: '1.0625rem',
            color: 'rgba(255,255,255,0.55)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            A selection of digital solutions, websites, and branding systems designed to solve real business challenges and strengthen business presence.
          </p>
        </FadeIn>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {PROJECTS.map((project, i) => (
          <FullscreenProject key={project.title} project={project} index={i} />
        ))}
      </div>
      <style>{`
        @media (max-width: 480px) {
          .project-content-container { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>
    </section>
  );
}
