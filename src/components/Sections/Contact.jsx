import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalInfo, education, certificates } from '../../data/profile';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'center center',
        scrub: 0.5,
      },
    });

    tl.fromTo(titleRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1 }
    ).fromTo(contentRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1 },
      '-=0.5'
    );

    return () => tl.kill();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="journey-section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '6rem 2rem',
        position: 'relative',
      }}
    >
      {/* Summit glow effect */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '60%',
        height: '60%',
        background: 'radial-gradient(ellipse, rgba(111,168,255,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
        maxWidth: '700px',
      }}>
        {/* Summit label */}
        <span className="text-label" style={{ color: 'var(--warm-sunlight)' }}>
          ◆ The Summit
        </span>

        {/* Title */}
        <h2
          ref={titleRef}
          className="heading-display"
          style={{
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            background: 'linear-gradient(135deg, var(--snow-white), var(--accent), var(--warm-sunlight))',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            opacity: 0,
          }}
        >
          Let's Build Something Great.
        </h2>

        <div ref={contentRef} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2.5rem',
          opacity: 0,
        }}>
          <p style={{
            fontSize: '1rem',
            color: 'var(--fog-gray)',
            lineHeight: 1.7,
            maxWidth: '500px',
          }}>
            The journey doesn't end here. I'm always looking for new mountains to climb
            and problems to solve. Let's connect.
          </p>

          {/* Contact links */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'center',
          }}>
            {[
              { label: 'GitHub', href: personalInfo.social.github, icon: '⟁' },
              { label: 'LinkedIn', href: personalInfo.social.linkedin, icon: '◈' },
              { label: 'Email', href: `mailto:${personalInfo.email}`, icon: '✉' },
              { label: 'Resume', href: personalInfo.resume, icon: '📄' },
            ].map((link, i) => (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-subtle"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  transition: 'all 0.3s var(--ease-out)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.border = '1px solid var(--accent)';
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(111, 168, 255, 0.15)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span>{link.icon}</span>
                {link.label}
              </a>
            ))}
          </div>

          {/* Education & Certs summary */}
          <div style={{
            display: 'flex',
            gap: '2rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: '1rem',
          }}>
            {/* Education */}
            <div className="glass-subtle" style={{ padding: '1.25rem 1.5rem', minWidth: '260px' }}>
              <div className="text-label" style={{ marginBottom: '0.75rem', fontSize: '0.65rem' }}>
                Education
              </div>
              {education.map((edu, i) => (
                <div key={i} style={{ marginBottom: i < education.length - 1 ? '0.75rem' : 0 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {edu.degree}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--mountain-blue)' }}>
                    {edu.institution}
                  </div>
                  <div className="text-mono" style={{ fontSize: '0.65rem', color: 'var(--accent)', marginTop: '0.15rem' }}>
                    {edu.period}
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="glass-subtle" style={{ padding: '1.25rem 1.5rem', minWidth: '260px' }}>
              <div className="text-label" style={{ marginBottom: '0.75rem', fontSize: '0.65rem' }}>
                Certifications ({certificates.length})
              </div>
              {certificates.slice(0, 3).map((cert, i) => (
                <a
                  key={i}
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.5rem',
                    textDecoration: 'none',
                    transition: 'color 0.3s',
                    color: 'var(--text-primary)',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}
                >
                  <div style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    background: cert.color, flexShrink: 0,
                  }} />
                  <span style={{ fontSize: '0.8rem', lineHeight: 1.3 }}>{cert.name}</span>
                </a>
              ))}
              {certificates.length > 3 && (
                <div className="text-mono" style={{ fontSize: '0.65rem', color: 'var(--mountain-blue)', marginTop: '0.25rem' }}>
                  +{certificates.length - 3} more
                </div>
              )}
            </div>
          </div>

          {/* Final signature */}
          <div style={{
            marginTop: '2rem',
            textAlign: 'center',
          }}>
            <div style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              marginBottom: '0.5rem',
            }}>
              MAHESH TAWAR
            </div>
            <div className="text-mono" style={{
              fontSize: '0.7rem',
              color: 'var(--mountain-blue)',
              letterSpacing: '0.15em',
            }}>
              The journey doesn't end here.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
