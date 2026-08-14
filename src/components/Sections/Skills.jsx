import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '../../data/profile';

gsap.registerPlugin(ScrollTrigger);

const SkillMarker = ({ skill, index, total }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current,
      { opacity: 0, x: index % 2 === 0 ? -40 : 40, scale: 0.8 },
      {
        opacity: 1, x: 0, scale: 1,
        duration: 0.8,
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
    <div ref={ref} className="glass-subtle" style={{
      padding: '1.25rem 1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      transition: 'all 0.3s var(--ease-out)',
      cursor: 'default',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.border = '1px solid rgba(111, 168, 255, 0.3)';
      e.currentTarget.style.boxShadow = '0 0 30px rgba(111, 168, 255, 0.1)';
      e.currentTarget.style.transform = 'translateY(-2px)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.05)';
      e.currentTarget.style.boxShadow = 'none';
      e.currentTarget.style.transform = 'translateY(0)';
    }}
    >
      {/* Glow dot */}
      <div style={{
        width: '8px', height: '8px', borderRadius: '50%',
        background: 'var(--accent)',
        boxShadow: '0 0 12px var(--glow)',
        flexShrink: 0,
      }} />

      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: '0.95rem',
          fontWeight: 600,
          color: 'var(--text-primary)',
        }}>{skill.name}</div>
      </div>

      {/* Level bar */}
      <div style={{
        width: '80px', height: '3px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '2px',
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${skill.level}%`,
          height: '100%',
          background: 'linear-gradient(90deg, var(--accent), var(--warm-sunlight))',
          borderRadius: '2px',
          transition: 'width 1s var(--ease-out)',
        }} />
      </div>
    </div>
  );
};

const Skills = () => {
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
      id="skills"
      ref={sectionRef}
      className="journey-section"
      style={{ minHeight: '100vh', padding: '6rem 0' }}
    >
      <div className="section-content">
        {/* Section header */}
        <div ref={titleRef} style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <span className="text-label">Elevation I</span>
          <h2 className="heading-section" style={{
            marginTop: '0.5rem',
            background: 'linear-gradient(180deg, var(--text-primary) 0%, var(--fog-gray) 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}>
            Tools I Climb With
          </h2>
        </div>

        {/* Skills grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
        }}>
          {skills.map((category, ci) => (
            <div key={ci} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {/* Category header */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                marginBottom: '0.5rem', paddingLeft: '0.5rem',
              }}>
                <div style={{
                  width: '3px', height: '20px',
                  background: 'var(--accent)',
                  borderRadius: '2px',
                }} />
                <span className="text-mono" style={{ color: 'var(--fog-gray)', fontWeight: 600 }}>
                  {category.title}
                </span>
              </div>

              {category.items.map((skill, si) => (
                <SkillMarker
                  key={si}
                  skill={skill}
                  index={ci * 10 + si}
                  total={category.items.length}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
