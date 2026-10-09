import { useReveal, useCardGlow } from '../../hooks/useAnimations';
import { certificates } from '../../data/profile';

const CertCard = ({ cert }) => {
  const cardRef = useReveal({ rootMargin: '0px 0px -40px 0px' });
  const cardGlow = useCardGlow();
  const isFlagship = Boolean(cert.flagship);

  const getFlagshipBadge = () => {
    if (cert.issuer === 'Oracle') return 'ORACLE CERTIFIED OCP';
    if (cert.issuer === 'Redis') return 'REDIS CERTIFIED';
    return 'FLAGSHIP';
  };

  return (
    <a
      href={cert.link}
      target="_blank"
      rel="noopener noreferrer"
      ref={cardRef}
      className="card reveal"
      style={{
        padding: 'clamp(1.1rem, 2.5vw, 1.5rem)',
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        border: isFlagship ? '1px solid var(--border-accent)' : '1px solid var(--border)',
        boxShadow: isFlagship ? '0 0 24px var(--accent-subtle), var(--card-highlight)' : 'var(--card-highlight)',
        transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease, box-shadow 0.2s ease',
      }}
      {...cardGlow}
    >
      <div>
        {/* Issuer and Flagship Tag */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: 'var(--space-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                background: 'var(--bg-tertiary)',
                border: `1px solid ${cert.color}45`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: cert.color,
                flexShrink: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <span
              className="text-mono"
              style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                color: cert.color,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              {cert.issuer}
            </span>
          </div>

          {isFlagship && (
            <span
              className="text-mono"
              style={{
                fontSize: '0.62rem',
                fontWeight: 700,
                color: 'var(--accent-light)',
                background: 'var(--accent-subtle)',
                padding: '2px 8px',
                borderRadius: '4px',
                border: '1px solid var(--border-accent)',
                letterSpacing: '0.05em',
              }}
            >
              {getFlagshipBadge()}
            </span>
          )}
        </div>

        {/* Certificate Title */}
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)',
            fontWeight: 600,
            color: 'var(--text-primary)',
            lineHeight: 1.4,
            marginBottom: 'var(--space-md)',
          }}
        >
          {cert.name}
        </h3>
      </div>

      {/* Verification Action Link */}
      <div
        className="text-mono"
        style={{
          fontSize: '0.72rem',
          color: 'var(--text-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 'var(--space-sm)',
          borderTop: '1px solid var(--border)',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--success)', display: 'inline-block' }} />
          Official Credential
        </span>
        <span style={{ color: 'var(--accent)', fontWeight: 600 }}>Verify On {cert.issuer} ↗</span>
      </div>
    </a>
  );
};

const Certifications = () => {
  const headerRef = useReveal();

  return (
    <section id="certifications" className="section">
      <div className="container" style={{ maxWidth: '1060px' }}>
        {/* Header */}
        <div className="section-header reveal" ref={headerRef}>
          <span className="text-label">Verified Certifications</span>
          <h2 className="heading-section">Professional Credentials & Industry Badges</h2>
          <p className="text-body">
            Proctored industry verifications validating relational database architecture (Oracle OCP MySQL 8.0), distributed in-memory caching (Redis Certified), and full-stack engineering standards.
          </p>
        </div>

        {/* Certs Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: 'var(--space-lg)',
          }}
        >
          {certificates.map((cert, i) => (
            <CertCard key={i} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
