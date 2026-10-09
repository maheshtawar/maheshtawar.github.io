import { useReveal } from '../../hooks/useAnimations';
import { personalInfo, education } from '../../data/profile';

const About = () => {
  const headerRef = useReveal();
  const contentRef = useReveal({ rootMargin: '0px 0px -60px 0px' });

  return (
    <section id="about" className="section" style={{ position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal" ref={headerRef}>
          <span className="text-label">Engineering Foundation</span>
          <h2 className="heading-section">Architecture & High-Scale Systems</h2>
          <p className="text-body">
            Writing resilient, zero-downtime backend software that solves complex real-world operational bottlenecks.
          </p>
        </div>

        {/* Editorial Asymmetric Grid */}
        <div
          className="reveal"
          ref={contentRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: 'var(--space-xl)',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Narrative Biography & Philosophy */}
          <div
            className="card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-xl)',
              padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            }}
          >
            <div>
              <span className="text-label" style={{ display: 'block', marginBottom: '6px' }}>Current Position</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                {personalInfo.currentRole}
              </h3>
              <p className="text-mono" style={{ fontSize: '0.82rem', color: 'var(--accent)' }}>
                {personalInfo.currentCompany} · {personalInfo.location}
              </p>
            </div>

            <p className="text-body" style={{ fontSize: '0.95rem' }}>
              {personalInfo.bio}
            </p>

            {/* Engineering Principle Quote */}
            <div
              style={{
                borderLeft: '2px solid var(--accent)',
                paddingLeft: 'var(--space-md)',
                background: 'var(--accent-subtle)',
                padding: 'var(--space-md)',
                borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
              }}
            >
              <span className="text-mono" style={{ fontSize: '0.68rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '4px' }}>
                Engineering Mindset
              </span>
              <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--text-primary)', lineHeight: 1.6, margin: 0 }}>
                "{personalInfo.philosophy}"
              </p>
            </div>

            {/* DevSecOps Architecture in Action Visual */}
            <div
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: '1px solid var(--border)',
                boxShadow: 'var(--card-highlight), 0 10px 30px rgba(0, 0, 0, 0.4)',
              }}
            >
              <img
                src={personalInfo.engineeringImage}
                alt={`${personalInfo.fullName} designing DevSecOps & AI Security Flow`}
                loading="lazy"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'cover',
                  maxHeight: '260px',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '8px 14px',
                  background: 'linear-gradient(to top, rgba(9, 9, 11, 0.92) 0%, rgba(9, 9, 11, 0.5) 70%, transparent 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '6px',
                }}
              >
                <span className="text-mono" style={{ fontSize: '0.68rem', color: 'var(--accent-light)', fontWeight: 600 }}>
                  LAB // DEVSECOPS & SECURE ARCHITECTURE
                </span>
                <span className="text-mono" style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>
                  AWS · AI SECURITY · ANOMALY DETECTION
                </span>
              </div>
            </div>

            {/* Education Rail */}
            <div>
              <span className="text-label" style={{ display: 'block', marginBottom: 'var(--space-sm)' }}>
                Academic Background
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                {education.map((edu, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      padding: '8px 0',
                      borderBottom: i !== education.length - 1 ? '1px solid var(--border)' : 'none',
                      flexWrap: 'wrap',
                      gap: '4px',
                    }}
                  >
                    <div>
                      <p style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)', margin: 0 }}>
                        {edu.degree}
                      </p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
                        {edu.institution}
                      </p>
                    </div>
                    <span className="text-mono" style={{ fontSize: '0.72rem', color: 'var(--accent)' }}>
                      {edu.period}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Unified Engineering Bento Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
            {/* Impact Metric Chips */}
            <div
              className="card"
              style={{
                padding: 'clamp(1.5rem, 3vw, 2rem)',
              }}
            >
              <span className="text-label" style={{ display: 'block', marginBottom: 'var(--space-md)' }}>
                Production Track Record
              </span>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 'var(--space-md)',
                }}
              >
                {personalInfo.stats.map((stat, i) => (
                  <div
                    key={i}
                    style={{
                      padding: 'var(--space-md)',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 'clamp(1.6rem, 3vw, 2rem)',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        color: 'var(--accent)',
                        letterSpacing: '-0.03em',
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="text-mono"
                      style={{
                        fontSize: '0.68rem',
                        color: 'var(--text-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        marginTop: '2px',
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Dual Flagship Certification Highlight */}
              <div
                style={{
                  marginTop: 'var(--space-md)',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--accent-subtle)',
                  border: '1px solid var(--border-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <div style={{ color: 'var(--accent)', fontSize: '1.1rem', flexShrink: 0 }}>🛡️</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>
                  <strong style={{ color: 'var(--accent-light)' }}>Dual Industry Certified:</strong> Oracle Certified Professional (MySQL 8.0) & Redis Certified Associate Developer.
                </div>
              </div>
            </div>

            {/* Core Competencies Bento */}
            <div
              className="card"
              style={{
                padding: 'clamp(1.5rem, 3vw, 2rem)',
              }}
            >
              <span className="text-label" style={{ display: 'block', marginBottom: 'var(--space-md)' }}>
                Core Engineering Capabilities
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  'Secure System Architecture & AES-256/JWE OTP Encryption (50K+ accounts secured)',
                  'Zero-Leakage Multi-Tenant Isolation & Enterprise Spring Security RBAC',
                  'High-Throughput REST APIs & Decoupled Spring Boot Microservices',
                  'Sub-100ms Database Query Optimization (Oracle OCP MySQL 8.0 & Redis)',
                  'Config-Driven Zero-Deployment Engines (Email, SMS, Teams)',
                  'Transactional Integrity & Trigger-Based Forensic Audit Logging',
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '6px 0',
                    }}
                  >
                    <span style={{ color: 'var(--accent)', fontSize: '0.85rem' }}>✦</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{item}</span>
                  </div>
                ))}
              </div>

              {/* Stack exploration tags */}
              <div style={{ marginTop: 'var(--space-lg)', paddingTop: 'var(--space-md)', borderTop: '1px solid var(--border)' }}>
                <span className="text-label" style={{ display: 'block', marginBottom: '8px', fontSize: '0.68rem' }}>
                  Active Focus Areas
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {personalInfo.exploring.map((item, i) => (
                    <span
                      key={i}
                      className="text-mono"
                      style={{
                        fontSize: '0.72rem',
                        padding: '4px 9px',
                        borderRadius: '6px',
                        background: 'var(--accent-subtle)',
                        border: '1px solid var(--border-accent)',
                        color: 'var(--accent-light)',
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
