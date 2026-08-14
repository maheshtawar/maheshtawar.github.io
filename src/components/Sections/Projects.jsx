import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../../data/profile';

gsap.registerPlugin(ScrollTrigger);

const ProjectPortal = ({ project, index }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current,
      { opacity: 0, y: 60, rotateY: index % 2 === 0 ? -5 : 5 },
      {
        opacity: 1, y: 0, rotateY: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [index]);

  return (
    <div
      ref={ref}
      className="glass"
      style={{
        padding: '2px',
        borderRadius: '20px',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(111,168,255,0.15), rgba(11,20,32,0.8))',
        transition: 'all 0.4s var(--ease-out)',
        cursor: 'default',
        perspective: '1000px',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 20px 60px rgba(111, 168, 255, 0.15)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{
        background: 'rgba(8, 11, 16, 0.9)',
        borderRadius: '18px',
        overflow: 'hidden',
      }}>
        {/* Project preview area */}
        <div style={{
          height: '200px',
          background: `linear-gradient(135deg, ${
            index === 0 ? '#1a1a2e, #16213e' :
            index === 1 ? '#0f1923, #1a2d40' :
            '#1a1a1a, #2d2d2d'
          })`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Decorative grid */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(111,168,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(111,168,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px',
          }} />

          {/* Project icon */}
          <div style={{
            fontSize: '3rem',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            color: 'rgba(111, 168, 255, 0.2)',
            letterSpacing: '-0.05em',
          }}>
            {project.title.split(' ').map(w => w[0]).join('')}
          </div>

          {/* Floating accent orb */}
          <div style={{
            position: 'absolute',
            top: '20%',
            right: '15%',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(111,168,255,0.15), transparent)',
            filter: 'blur(10px)',
            animation: 'float 4s ease-in-out infinite',
          }} />
        </div>

        {/* Content */}
        <div style={{ padding: '1.5rem' }}>
          <h3 style={{
            fontSize: '1.15rem',
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '0.25rem',
          }}>
            {project.title}
          </h3>
          <p className="text-mono" style={{
            fontSize: '0.7rem',
            color: 'var(--accent)',
            marginBottom: '0.75rem',
          }}>
            {project.subtitle}
          </p>
          <p style={{
            fontSize: '0.85rem',
            color: 'var(--mountain-blue)',
            lineHeight: 1.5,
            marginBottom: '1rem',
          }}>
            {project.description}
          </p>

          {/* Tags */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.4rem',
            marginBottom: '1.25rem',
          }}>
            {project.tags.map((tag, i) => (
              <span key={i} style={{
                fontSize: '0.65rem',
                fontFamily: 'var(--font-mono)',
                padding: '0.2rem 0.5rem',
                borderRadius: '4px',
                background: 'rgba(111, 168, 255, 0.1)',
                color: 'var(--accent)',
                border: '1px solid rgba(111, 168, 255, 0.15)',
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div style={{
            display: 'flex',
            gap: '1rem',
          }}>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--fog-gray)',
                  textDecoration: 'none',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--fog-gray)'}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--fog-gray)',
                  textDecoration: 'none',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--fog-gray)'}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    if (!titleRef.current) return;
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="journey-section"
      style={{ minHeight: '100vh', padding: '6rem 0' }}
    >
      <div className="section-content">
        <div ref={titleRef} style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <span className="text-label">Elevation III</span>
          <h2 className="heading-section" style={{
            marginTop: '0.5rem',
            background: 'linear-gradient(180deg, var(--text-primary) 0%, var(--fog-gray) 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}>
            Mountain Portals
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
        }}>
          {projects.map((project, i) => (
            <ProjectPortal key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
