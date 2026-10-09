import { useState } from 'react';
import { useReveal } from '../../hooks/useAnimations';
import { experiences } from '../../data/profile';
import { usePortfolio } from '../../context/PortfolioContext';

// Milestone detailed Problem -> Implementation -> Result data
const MILESTONE_BREAKDOWNS = {
  0: {
    problem: 'Manual code deployments were required every time admission enquiry formats or notification templates changed across colleges.',
    implementation: 'Architected dynamic config-driven form builders and database-templated notification engines (Teams, Email, SMS) using Java 17 and Spring Boot.',
    result: 'Zero deployment incidents; eliminated repeated code changes across 5 multi-tenant profiles; successfully processed bulk reallocation of 1,000+ users.',
  },
  1: {
    problem: 'Peak-hour admissions generated high database load with API latency spiking up to 2 seconds for 500+ daily active centers.',
    implementation: 'Introduced Redis caching layer for OTP verification, server-side pagination, parallel query execution, and indexed MySQL joins.',
    result: 'Slashed API response time from 2s to 65ms (97% latency reduction), enabling 10,000+ users to re-register smoothly.',
  },
  2: {
    problem: 'Job execution was tightly coupled inside monolith codebase, requiring manual intervention and risking memory bottlenecks.',
    implementation: 'Decoupled and migrated 10+ schedulers into dedicated Spring Boot microservice containers with custom JDBC RowMappers and trigger-based audit logging.',
    result: 'Automated 100% of routine batch jobs, reducing operational maintenance overhead by ~80% and securing 50,000+ accounts.',
  },
};

const TimelineItem = ({ exp, index, isLast, selectedTech }) => {
  const itemRef = useReveal({ rootMargin: '0px 0px -40px 0px' });
  const [showBreakdown, setShowBreakdown] = useState(true);

  const typeColors = {
    promotion: 'var(--accent)',
    start: 'var(--success)',
  };
  const color = typeColors[exp.type] || 'var(--accent)';

  const isHighlighted = selectedTech && exp.technologies.some(
    (t) => t.toLowerCase().includes(selectedTech.toLowerCase()) || selectedTech.toLowerCase().includes(t.toLowerCase())
  );

  const breakdown = MILESTONE_BREAKDOWNS[index];

  return (
    <div
      ref={itemRef}
      className={`reveal ${isHighlighted ? 'highlighted-timeline' : ''}`}
      style={{
        display: 'flex',
        gap: 'clamp(1rem, 3vw, 2.5rem)',
        position: 'relative',
        paddingBottom: isLast ? 0 : 'var(--space-3xl)',
      }}
    >
      {/* Timeline Node Column with dynamic glow */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: '40px' }}>
        <div
          style={{
            width: isHighlighted ? '20px' : '16px',
            height: isHighlighted ? '20px' : '16px',
            borderRadius: '50%',
            background: isHighlighted ? 'var(--accent-light)' : color,
            boxShadow: isHighlighted ? '0 0 18px var(--accent-light), 0 0 30px var(--accent)' : `0 0 12px ${color}`,
            border: '3px solid var(--bg-primary)',
            zIndex: 2,
            flexShrink: 0,
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
        {!isLast && (
          <div
            style={{
              width: '2px',
              flex: 1,
              background: isHighlighted
                ? 'linear-gradient(to bottom, var(--accent), var(--border))'
                : 'linear-gradient(to bottom, var(--border-hover), transparent)',
              marginTop: '8px',
            }}
          />
        )}
      </div>

      {/* Content Card */}
      <div
        className="card"
        style={{
          flex: 1,
          marginTop: '-0.35rem',
          padding: 'clamp(1.2rem, 3vw, 2rem)',
          border: isHighlighted ? '1.5px solid var(--accent)' : '1px solid var(--border)',
          boxShadow: isHighlighted ? '0 0 30px var(--accent-glow)' : 'var(--shadow-md)',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Period + Promotion Pill */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: 'var(--space-sm)', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              className="text-mono"
              style={{
                fontSize: '0.72rem',
                color: color,
                background: `${color}15`,
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-sm)',
                border: `1px solid ${color}30`,
                fontWeight: 600,
              }}
            >
              {exp.period}
            </span>

            {exp.type === 'promotion' && (
              <span
                className="text-mono"
                style={{
                  fontSize: '0.65rem',
                  color: 'var(--accent)',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  background: 'var(--accent-subtle)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  border: '1px solid var(--border-accent)',
                }}
              >
                ↑ PROMOTED
              </span>
            )}
          </div>

          {isHighlighted && (
            <span className="text-mono" style={{ fontSize: '0.68rem', color: 'var(--accent-light)', fontWeight: 600 }}>
              ★ MATCHES: {selectedTech}
            </span>
          )}
        </div>

        {/* Title & Role */}
        <h3
          style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '4px',
          }}
        >
          {exp.title}
        </h3>
        <p className="text-small" style={{ marginBottom: 'var(--space-md)', color: 'var(--text-muted)' }}>
          {exp.role} • <strong style={{ color: 'var(--text-secondary)' }}>{exp.company}</strong> • {exp.location}
        </p>

        {/* Production Highlights List */}
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: 'var(--space-lg)' }}>
          {exp.highlights.map((h, i) => (
            <li
              key={i}
              style={{
                display: 'flex',
                gap: '0.6rem',
                fontSize: '0.85rem',
                lineHeight: 1.6,
                color: 'var(--text-secondary)',
              }}
            >
              <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '0.25rem', fontSize: '0.5rem' }}>▸</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>

        {/* Problem → Implementation → Result Deep-Dive Tab */}
        {breakdown && (
          <div
            style={{
              background: 'var(--bg-tertiary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              padding: 'var(--space-md)',
              marginBottom: 'var(--space-md)',
            }}
          >
            <div
              onClick={() => setShowBreakdown(!showBreakdown)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                marginBottom: showBreakdown ? '10px' : 0,
              }}
            >
              <span className="text-mono" style={{ fontSize: '0.72rem', color: 'var(--accent-light)', fontWeight: 600 }}>
                {showBreakdown ? '▼ Engineering Impact Breakdown' : '▶ Show Problem → Implementation → Result'}
              </span>
              <span className="text-mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                CASE STUDY
              </span>
            </div>

            {showBreakdown && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', paddingTop: '4px' }}>
                <div style={{ fontSize: '0.78rem' }}>
                  <strong style={{ color: 'var(--warning)', display: 'block', marginBottom: '2px' }}>Problem</strong>
                  <span style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>{breakdown.problem}</span>
                </div>
                <div style={{ fontSize: '0.78rem' }}>
                  <strong style={{ color: 'var(--accent-light)', display: 'block', marginBottom: '2px' }}>Implementation</strong>
                  <span style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>{breakdown.implementation}</span>
                </div>
                <div style={{ fontSize: '0.78rem' }}>
                  <strong style={{ color: 'var(--success)', display: 'block', marginBottom: '2px' }}>Result & Metric</strong>
                  <span style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>{breakdown.result}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Technologies Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {exp.technologies.map((tech) => (
            <span
              key={tech}
              className="tag"
              style={{
                fontSize: '0.7rem',
                background: selectedTech && tech.toLowerCase().includes(selectedTech.toLowerCase()) ? 'var(--accent-subtle)' : undefined,
                borderColor: selectedTech && tech.toLowerCase().includes(selectedTech.toLowerCase()) ? 'var(--accent)' : undefined,
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Experience = () => {
  const headerRef = useReveal();
  const { selectedTech } = usePortfolio();

  return (
    <section id="experience" className="section">
      <div className="container" style={{ maxWidth: '900px' }}>
        {/* Header */}
        <div className="section-header reveal" ref={headerRef}>
          <span className="text-label">Career Progression & Impact</span>
          <h2 className="heading-section">Experience & Milestones</h2>
          <p className="text-body">
            2× Promoted in 2 Years at MKCL. From monolith maintenance to architecting zero-deployment microservices and high-throughput databases.
          </p>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {experiences.map((exp, index) => (
            <TimelineItem
              key={exp.period}
              exp={exp}
              index={index}
              isLast={index === experiences.length - 1}
              selectedTech={selectedTech}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
