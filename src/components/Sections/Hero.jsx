import { useEffect, useRef, useState } from 'react';
import { personalInfo } from '../../data/profile';
import { usePortfolio } from '../../context/PortfolioContext';
import MagneticButton from '../UI/MagneticButton';

const ROLES = [
  'Java Backend Developer',
  'Secure Systems Engineer',
  'Spring Boot Specialist',
  'Zero-Trust Auth & Encryption Architect',
  'Database Optimization Engineer',
  'High-Throughput API Developer',
];

const CODE_FRAGMENTS = [
  'public class SecureGatewayService {',
  '@PreAuthorize("hasAuthority(\'TENANT_ADMIN\')")',
  '@Cacheable(value = "tenant_otp", key = "#id")',
  'AES256.encrypt(otpPayload, tenantSecret);',
  'SELECT * FROM registrations WHERE tenant_id = ?;',
  'apiLatency: 2000ms -> 65ms (97% cut)',
  'Zero-Trust: 50,000+ accounts secured',
];

const TECH_BADGES = [
  'Java 17',
  'Spring Boot',
  'Spring Security',
  'Microservices',
  'MySQL',
  'Redis',
  'AES / JWE',
  'Docker',
];

const Hero = () => {
  const { selectTech, selectedTech, setIsCommandPaletteOpen } = usePortfolio();
  const [roleIndex, setRoleIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const avatarCardRef = useRef(null);

  // Role rotator with smooth fade-in-out transition
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
        setIsTransitioning(false);
      }, 350);
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  // Mouse parallax tracking
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });

    if (avatarCardRef.current) {
      const tiltX = -y * 14;
      const tiltY = x * 14;
      avatarCardRef.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
    }
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    if (avatarCardRef.current) {
      avatarCardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    }
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        minHeight: 'calc(100vh - var(--nav-height))',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(2.5rem, 6vh, 5rem) clamp(1rem, 4vw, 2.5rem)',
      }}
    >
      {/* Background Interactive Lighting Follower */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, rgba(6, 182, 212, 0.04) 40%, transparent 70%)',
          transform: `translate(-50%, -50%) translate3d(${mousePos.x * 60}px, ${mousePos.y * 60}px, 0)`,
          pointerEvents: 'none',
          zIndex: 0,
          transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Floating subtle code fragments in background */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        {CODE_FRAGMENTS.map((frag, idx) => {
          const depthMultiplier = (idx % 3 + 1) * 15;
          const topPercent = 15 + idx * 14;
          const leftPercent = (idx % 2 === 0 ? 8 : 65) + (idx * 5) % 15;
          return (
            <div
              key={idx}
              className="text-mono"
              style={{
                position: 'absolute',
                top: `${topPercent}%`,
                left: `${leftPercent}%`,
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
                opacity: 0.16,
                transform: `translate3d(${mousePos.x * depthMultiplier}px, ${mousePos.y * depthMultiplier}px, 0)`,
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                userSelect: 'none',
              }}
            >
              {frag}
            </div>
          );
        })}
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Real-Time System Status HUD Banner */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            padding: '6px 14px',
            borderRadius: '9999px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-accent)',
            boxShadow: 'var(--card-highlight), var(--shadow-sm)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            marginBottom: 'var(--space-lg)',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: 'var(--success)',
                boxShadow: '0 0 10px var(--success)',
                animation: 'pulse 2s infinite',
              }}
            />
            <span className="text-mono" style={{ fontSize: '0.72rem', color: 'var(--text-primary)', fontWeight: 600 }}>
              SYSTEM: 200 OK
            </span>
          </div>

          <span style={{ color: 'var(--border)' }}>|</span>

          <span className="text-mono" style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>
            ROLE: <strong style={{ color: 'var(--text-primary)' }}>Senior Project Associate I @ MKCL</strong>
          </span>

          <span style={{ color: 'var(--border)' }}>|</span>

          <span className="text-mono" style={{ fontSize: '0.68rem', color: 'var(--accent-light)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <span>🛡️</span>
            <span>SECURE SYSTEM DEV: 50K+ ACCOUNTS</span>
          </span>

          <span style={{ color: 'var(--border)' }}>|</span>

          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="text-mono"
            style={{
              fontSize: '0.68rem',
              color: 'var(--accent)',
              background: 'var(--accent-subtle)',
              border: '1px solid var(--border-accent)',
              borderRadius: '4px',
              padding: '2px 7px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span>PRESS ⌘K</span>
          </button>
        </div>

        {/* Hero Main Flex Layout */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'clamp(2rem, 5vw, 4rem)',
            flexWrap: 'wrap',
          }}
        >
          {/* Left Narrative Column */}
          <div style={{ flex: '1 1 520px', maxWidth: '680px' }}>
            {/* Identity Salutation */}
            <p
              className="text-mono"
              style={{
                fontSize: '0.85rem',
                color: 'var(--accent)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: 'var(--space-xs)',
              }}
            >
              Secure Backend Architect & Full Stack Engineer
            </p>

            {/* Name Heading with subtle gradient */}
            <h1
              className="heading-hero"
              style={{
                marginBottom: 'var(--space-md)',
                letterSpacing: '-0.03em',
              }}
            >
              {personalInfo.fullName}
            </h1>

            {/* Sophisticated Dynamic Role Rotator */}
            <div
              style={{
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: 'var(--space-lg)',
              }}
            >
              <span className="text-mono" style={{ color: 'var(--accent)', fontSize: '1.15rem' }}>
                $
              </span>
              <span
                className="text-mono"
                style={{
                  fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  opacity: isTransitioning ? 0 : 1,
                  transform: isTransitioning ? 'translateY(6px)' : 'translateY(0)',
                  transition: 'opacity 0.35s ease, transform 0.35s ease',
                  borderBottom: '2px solid var(--accent)',
                  paddingBottom: '2px',
                }}
              >
                {ROLES[roleIndex]}
              </span>
            </div>

            {/* Value Proposition Bio */}
            <p
              className="text-body"
              style={{
                fontSize: '1.05rem',
                lineHeight: 1.7,
                maxWidth: '600px',
                marginBottom: 'var(--space-xl)',
                color: 'var(--text-secondary)',
              }}
            >
              {personalInfo.bio}
            </p>

            {/* Interactive Magnetic CTA Cluster */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-md)',
                flexWrap: 'wrap',
                marginBottom: 'var(--space-2xl)',
              }}
            >
              <MagneticButton
                className="btn btn-primary"
                onClick={() => scrollTo('projects')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <span>Explore Case Studies</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </MagneticButton>

              <MagneticButton
                className="btn btn-secondary"
                onClick={() => scrollTo('contact')}
              >
                Let's Connect
              </MagneticButton>

              <MagneticButton
                as="a"
                href={personalInfo.resume}
                download="Mahesh_Tawar.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                Resume ↗
              </MagneticButton>

              <MagneticButton
                as="a"
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
                title="Connect on LinkedIn"
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  LinkedIn ↗
                </span>
              </MagneticButton>
            </div>

            {/* Key Verified Performance Metrics */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
                gap: 'clamp(1rem, 2vw, 1.8rem)',
                paddingTop: 'var(--space-md)',
                borderTop: '1px solid var(--border)',
              }}
            >
              {personalInfo.stats.map((stat, i) => (
                <div key={i}>
                  <div
                    style={{
                      fontSize: 'clamp(1.5rem, 2.5vw, 1.85rem)',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      color: 'var(--accent-light)',
                      lineHeight: 1.1,
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
                      marginTop: '4px',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: 3D Interactive Profile Avatar & Tech Constellation Aura */}
          <div
            style={{
              flex: '0 1 340px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <div
              ref={avatarCardRef}
              className="avatar-container"
              data-cursor="explore"
              style={{
                width: 'clamp(210px, 26vw, 270px)',
                height: 'clamp(210px, 26vw, 270px)',
                borderRadius: '28px',
                position: 'relative',
                transition: 'transform 0.15s ease-out, box-shadow 0.3s ease',
                boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.6), 0 0 35px var(--accent-glow)',
                border: '2px solid rgba(255, 255, 255, 0.12)',
                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.95))',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
            >
              {/* Profile Image */}
              <img
                src={personalInfo.profileImage}
                alt={`${personalInfo.fullName} — ${personalInfo.headline}`}
                loading="eager"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 20%',
                  display: 'block',
                  borderRadius: '26px',
                }}
              />

              {/* Dynamic mouse-following reflection shine */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `radial-gradient(circle at ${50 + mousePos.x * 60}% ${50 + mousePos.y * 60}%, rgba(255, 255, 255, 0.18) 0%, transparent 60%)`,
                  pointerEvents: 'none',
                  borderRadius: '26px',
                }}
              />

              {/* Floating verified promotion badge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  right: '12px',
                  padding: '6px 12px',
                  borderRadius: '10px',
                  background: 'var(--bg-card)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid var(--border-accent)',
                  boxShadow: 'var(--card-highlight), 0 4px 16px rgba(0, 0, 0, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span className="text-mono" style={{ fontSize: '0.68rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                  2× PROMOTED IN 2 YRS
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent)' }}>✦</span>
              </div>
            </div>

            {/* Clickable Tech Ecosystem Tags (triggers global cross-highlighting) */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px',
                justifyContent: 'center',
                maxWidth: '320px',
                marginTop: 'var(--space-lg)',
              }}
            >
              {TECH_BADGES.map((tech) => {
                const isSelected = selectedTech === tech;
                return (
                  <button
                    key={tech}
                    onClick={() => selectTech(tech)}
                    className="tag"
                    style={{
                      cursor: 'pointer',
                      border: isSelected ? '1px solid var(--accent)' : '1px solid var(--border)',
                      background: isSelected ? 'var(--accent)' : 'var(--bg-tertiary)',
                      color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                      boxShadow: isSelected ? '0 0 14px var(--accent-glow)' : 'none',
                      transition: 'all 0.2s ease',
                      fontSize: '0.72rem',
                    }}
                    title={`Click to cross-highlight ${tech} across experience & projects`}
                  >
                    {tech}
                  </button>
                );
              })}
            </div>
            <span
              className="text-mono"
              style={{
                fontSize: '0.62rem',
                color: 'var(--text-muted)',
                marginTop: '6px',
                letterSpacing: '0.04em',
              }}
            >
              ✦ Click any technology to trace across portfolio
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
