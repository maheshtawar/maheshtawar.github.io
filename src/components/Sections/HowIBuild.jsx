import { useReveal } from '../../hooks/useAnimations';

const PROCESS_STEPS = [
  {
    code: '01 // ZERO-TRUST CONTRACT',
    title: 'API Specification & Zero-Trust Security',
    description: 'RESTful endpoints with deterministic status codes, strict DTO validation, JWE token encryption, and gateway rate limiting.',
    tech: 'OpenAPI · JWE / AES · Rate Limiting · CSRF',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
  },
  {
    code: '02 // DOMAIN CORE',
    title: 'Clean Architecture & Strategy Patterns',
    description: 'Decoupled service layer implementing Strategy, Builder, and Template patterns with strict multi-tenant isolation and transactional boundaries.',
    tech: 'Java 17 · Spring Boot 3 · Design Patterns',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    code: '03 // IN-MEMORY CACHE',
    title: 'Sub-Millisecond Redis Caching Layer',
    description: 'Strategic write-through & look-aside caching for high-frequency OTP verification and tenant settings, offloading 85% of relational database queries.',
    tech: 'Redis · Key Expiration · <10ms P99 Latency',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    code: '04 // PERSISTENCE & ACID',
    title: 'Relational Database & Query Engineering',
    description: 'MySQL 8.0 schema design, composite B-tree indexing, server-side pagination, RowMapper streaming, and trigger-based audit logging.',
    tech: 'MySQL 8.0 · Custom JDBC · RowMappers · EXPLAIN',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    code: '05 // RIGOROUS TESTING',
    title: 'Automated Testing & Boundary Audits',
    description: 'JUnit 5 and Mockito test suites covering business edge cases, zero-trust boundary validation, and integration tests for mission-critical flows.',
    tech: 'JUnit 5 · Mockito · Integration Tests · Boundary Logic',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    code: '06 // RELIABLE DEPLOY',
    title: 'Automated CI/CD & Production Hardening',
    description: 'GitLab CI/CD automated build pipelines, containerized deployments, health-check probes, and a track record of zero deployment incidents.',
    tech: 'GitLab CI · Docker · Linux Daemons · Zero Incidents',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
  },
];

const ProcessStep = ({ step, isLast }) => {
  const stepRef = useReveal({ rootMargin: '0px 0px -40px 0px' });

  return (
    <div
      ref={stepRef}
      className="reveal"
      style={{
        display: 'flex',
        gap: 'clamp(1rem, 3vw, 2rem)',
        position: 'relative',
        paddingBottom: !isLast ? 'var(--space-xl)' : 0,
      }}
    >
      {/* Node Column with high-precision connector */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: '40px' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-accent)',
            boxShadow: 'var(--card-highlight)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent)',
            zIndex: 2,
            flexShrink: 0,
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {step.icon}
        </div>
        {!isLast && (
          <div
            style={{
              width: '1px',
              flex: 1,
              background: 'linear-gradient(to bottom, var(--border-hover), var(--border))',
              marginTop: '8px',
            }}
          />
        )}
      </div>

      {/* Step Body */}
      <div
        className="card"
        style={{
          flex: 1,
          padding: 'clamp(1rem, 2.5vw, 1.5rem)',
          marginTop: '-0.2rem',
          border: '1px solid var(--border)',
          boxShadow: 'var(--card-highlight)',
          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
          <span
            className="text-mono"
            style={{
              fontSize: '0.68rem',
              color: 'var(--accent-light)',
              fontWeight: 600,
              letterSpacing: '0.08em',
            }}
          >
            {step.code}
          </span>
          <span
            className="text-mono"
            style={{
              fontSize: '0.66rem',
              color: 'var(--text-muted)',
              background: 'var(--bg-tertiary)',
              padding: '2px 8px',
              borderRadius: '4px',
              border: '1px solid var(--border)',
            }}
          >
            {step.tech}
          </span>
        </div>

        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(0.98rem, 1.5vw, 1.15rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '6px',
            lineHeight: 1.35,
          }}
        >
          {step.title}
        </h3>

        <p
          className="text-small"
          style={{
            fontSize: '0.84rem',
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
            margin: 0,
          }}
        >
          {step.description}
        </p>
      </div>
    </div>
  );
};

const HowIBuild = () => {
  const headerRef = useReveal();

  return (
    <section id="philosophy" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container" style={{ maxWidth: '860px' }}>
        {/* Header */}
        <div className="section-header reveal" ref={headerRef}>
          <span className="text-label">Secure System Architecture</span>
          <h2 className="heading-section">How I Engineer Systems</h2>
          <p className="text-body">
            A deterministic, zero-trust engineering methodology for high-concurrency Java backend engines and resilient data infrastructure.
          </p>
        </div>

        {/* Process Steps Rail */}
        <div>
          {PROCESS_STEPS.map((step, i) => (
            <ProcessStep
              key={step.code}
              step={step}
              isLast={i === PROCESS_STEPS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowIBuild;
