import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experiences } from '../../data/profile';

gsap.registerPlugin(ScrollTrigger);

const Milestone = ({ exp, index, isLast }) => {
  const ref = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Glow animation for the dot
    gsap.fromTo(dotRef.current,
      { scale: 0, opacity: 0 },
      {
        scale: 1, opacity: 1, duration: 0.6,
        ease: 'back.out(3)',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  const typeColors = {
    promotion: '#6FA8FF',
    start: '#22c55e',
  };
  const color = typeColors[exp.type] || '#6FA8FF';

  return (
    <div ref={ref} style={{
      display: 'flex',
      gap: 'clamp(1rem, 3vw, 2.5rem)',
      position: 'relative',
      paddingBottom: isLast ? 0 : '3rem',
    }}>
      {/* Timeline line + dot */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexShrink: 0,
        width: '40px',
      }}>
        {/* Dot */}
        <div ref={dotRef} style={{
          width: '16px', height: '16px',
          borderRadius: '50%',
          background: color,
          boxShadow: `0 0 20px ${color}66`,
          border: '3px solid var(--bg-primary)',
          zIndex: 2,
          flexShrink: 0,
        }} />
        {/* Connecting line */}
        {!isLast && (
          <div style={{
            width: '2px',
            flex: 1,
            background: `linear-gradient(to bottom, ${color}44, transparent)`,
          }} />
        )}
      </div>

      {/* Content card */}
      <div className="glass-subtle" style={{
        flex: 1,
        padding: 'clamp(1rem, 2vw, 1.5rem)',
        marginTop: '-0.25rem',
      }}>
        {/* Period badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          marginBottom: '0.75rem',
        }}>
          <span className="text-mono" style={{
            fontSize: '0.7rem',
            color: color,
            background: `${color}15`,
            padding: '0.2rem 0.6rem',
            borderRadius: '4px',
            border: `1px solid ${color}30`,
          }}>
            {exp.period}
          </span>
          {exp.type === 'promotion' && (
            <span style={{
              fontSize: '0.65rem',
              fontFamily: 'var(--font-mono)',
              color: color,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>↑ Promoted</span>
          )}
        </div>

        {/* Title & Company */}
        <h3 style={{
          fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          color: 'var(--text-primary)',
          marginBottom: '0.25rem',
        }}>
          {exp.title}
        </h3>
        <p style={{
          fontSize: '0.85rem',
          color: 'var(--fog-gray)',
          marginBottom: '1rem',
        }}>
          {exp.company} · {exp.location}
        </p>

        {/* Highlights */}
        <ul style={{
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}>
          {exp.highlights.slice(0, 3).map((h, i) => (
            <li key={i} style={{
              display: 'flex',
              gap: '0.75rem',
              fontSize: '0.8rem',
              lineHeight: 1.5,
              color: 'var(--mountain-blue)',
            }}>
              <span style={{
                color: color,
                flexShrink: 0,
                marginTop: '0.2rem',
                fontSize: '0.5rem',
              }}>▸</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Experience = () => {
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
      id="experience"
      ref={sectionRef}
      className="journey-section"
      style={{ minHeight: '100vh', padding: '6rem 0' }}
    >
      <div className="section-content" style={{ maxWidth: '800px' }}>
        <div ref={titleRef} style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <span className="text-label">Elevation II</span>
          <h2 className="heading-section" style={{
            marginTop: '0.5rem',
            background: 'linear-gradient(180deg, var(--text-primary) 0%, var(--fog-gray) 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}>
            The Ascent
          </h2>
        </div>

        {/* Timeline */}
        <div>
          {experiences.map((exp, i) => (
            <Milestone
              key={i}
              exp={exp}
              index={i}
              isLast={i === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
