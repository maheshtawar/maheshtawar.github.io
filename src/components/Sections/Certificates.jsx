import React from 'react';
import { certificates, sectionConfig } from '../../data/profile';
import ScrollReveal from '../UI/ScrollReveal';
import GlowCard from '../UI/GlowCard';

const Certificates = () => {
  return (
    <section id="certificates" style={{ padding: 'var(--section-padding)' }}>
      <div className="container">
        <ScrollReveal>
          <h2 className="section-title">{sectionConfig.certificates.title}</h2>
        </ScrollReveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          maxWidth: '1100px',
          margin: '0 auto',
        }}>
          {certificates.map((cert, index) => (
            <ScrollReveal key={index} delay={index * 100} animation="animate-scale-in">
              <GlowCard
                style={{ padding: '1.5rem', height: '100%' }}
                glowColor={`${cert.color}15`}
              >
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  {/* Header with icon */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '1rem',
                  }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: `linear-gradient(135deg, ${cert.color}20, ${cert.color}08)`,
                      border: `1px solid ${cert.color}25`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <i className="pi pi-verified" style={{
                        fontSize: '1.2rem',
                        color: cert.color,
                      }} />
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      color: cert.color,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}>
                      {cert.issuer}
                    </div>
                  </div>

                  {/* Certificate Name */}
                  <h4 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    lineHeight: 1.4,
                    margin: '0 0 auto',
                    paddingBottom: '1rem',
                  }}>
                    {cert.name}
                  </h4>

                  {/* View Button */}
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      color: 'var(--text-secondary)',
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      background: 'rgba(148,163,184,0.04)',
                      border: '1px solid var(--border-subtle)',
                      transition: 'all 0.3s ease',
                      alignSelf: 'flex-start',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = cert.color;
                      e.currentTarget.style.borderColor = `${cert.color}40`;
                      e.currentTarget.style.background = `${cert.color}08`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-secondary)';
                      e.currentTarget.style.borderColor = 'var(--border-subtle)';
                      e.currentTarget.style.background = 'rgba(148,163,184,0.04)';
                    }}
                  >
                    <i className="pi pi-external-link" style={{ fontSize: '0.8rem' }} />
                    View Credential
                  </a>
                </div>
              </GlowCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
