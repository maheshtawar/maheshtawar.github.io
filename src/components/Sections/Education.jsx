import React from 'react';
import { education, sectionConfig } from '../../data/profile';
import ScrollReveal from '../UI/ScrollReveal';
import GlowCard from '../UI/GlowCard';

const Education = () => {
  return (
    <section id="education" style={{ padding: 'var(--section-padding)' }}>
      <div className="container">
        <ScrollReveal>
          <h2 className="section-title">{sectionConfig.education.title}</h2>
        </ScrollReveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          maxWidth: '700px',
          margin: '0 auto',
        }}>
          {education.map((edu, index) => (
            <ScrollReveal key={index} delay={index * 150} animation="animate-fade-up">
              <GlowCard style={{ padding: '1.5rem' }} glowColor="rgba(16,185,129,0.1)">
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(34,211,238,0.08))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <i className={`pi ${edu.icon}`} style={{
                      fontSize: '1.3rem',
                      color: 'var(--accent-green)',
                    }} />
                  </div>
                  <div>
                    <h4 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.05rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      margin: '0 0 0.25rem',
                    }}>
                      {edu.degree}
                    </h4>
                    <div style={{
                      fontSize: '0.85rem',
                      color: 'var(--text-secondary)',
                      marginBottom: '0.4rem',
                    }}>
                      {edu.institution}
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'var(--accent-green)',
                      background: 'rgba(16,185,129,0.08)',
                      padding: '2px 10px',
                      borderRadius: '12px',
                      border: '1px solid rgba(16,185,129,0.15)',
                    }}>
                      {edu.period}
                    </span>
                  </div>
                </div>
              </GlowCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
