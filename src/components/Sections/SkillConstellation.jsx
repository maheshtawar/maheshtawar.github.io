import { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

const NODES = [
  {
    id: 'Java 17',
    label: 'Java 17',
    category: 'Core Runtime',
    icon: '☕',
    x: 350,
    y: 200,
    isCore: true,
    role: 'Primary enterprise language powering high-scale microservices, concurrency, and OOP architecture.',
    usedIn: 'All MKCL tenant profiles, multi-tenant schedulers, enquiry systems.',
    impact: 'Engineered 15+ production features across 5 multi-tenant profiles.',
    connectedTo: ['Spring Boot', 'MySQL', 'Redis', 'Microservices', 'REST APIs', 'Docker', 'Security'],
  },
  {
    id: 'Spring Boot',
    label: 'Spring Boot',
    category: 'Framework',
    icon: '🍃',
    x: 210,
    y: 110,
    role: 'Production-grade enterprise framework for microservices, dependency injection, and REST endpoints.',
    usedIn: 'MKCL core services, dynamic receipt engine with QR codes & GST calculation.',
    impact: 'Zero-deployment architecture with config-driven notification & scheduling engines.',
    connectedTo: ['Java 17', 'REST APIs', 'Microservices', 'MySQL', 'Redis', 'Security'],
  },
  {
    id: 'Redis',
    label: 'Redis',
    category: 'In-Memory Cache',
    icon: '⚡',
    x: 150,
    y: 260,
    role: 'Ultra-low latency in-memory data store for OTP caching, session management, and lookup caching.',
    usedIn: 'OTP verification flows, rate limiting, and frequent query caching.',
    impact: 'Redis Certified Associate Developer. Slashed API latency from 2s to 65ms (97% reduction).',
    connectedTo: ['Java 17', 'Spring Boot', 'MySQL', 'REST APIs'],
  },
  {
    id: 'MySQL',
    label: 'MySQL 8.0',
    category: 'Relational DB',
    icon: '🗄️',
    x: 280,
    y: 340,
    role: 'High-volume transaction database with complex indexing, triggers, and multi-tenant partitioning.',
    usedIn: 'Registration pipelines, audit logs, student records, fee collection.',
    impact: 'Oracle Certified Professional Database Developer. Consolidated 8+ queries with custom RowMappers.',
    connectedTo: ['Java 17', 'Spring Boot', 'Redis'],
  },
  {
    id: 'Microservices',
    label: 'Microservices',
    category: 'Architecture',
    icon: '🌐',
    x: 490,
    y: 110,
    role: 'Decoupled autonomous services with tenant profile isolation and centralized logging.',
    usedIn: 'Migrated 10+ monolith schedulers to dedicated microservice containers.',
    impact: '80% operational overhead reduction through automated tenant job schedulers.',
    connectedTo: ['Java 17', 'Spring Boot', 'Docker', 'GitLab CI/CD'],
  },
  {
    id: 'REST APIs',
    label: 'REST APIs',
    category: 'API Engineering',
    icon: '📡',
    x: 370,
    y: 60,
    role: 'RESTful API contracts with server-side pagination, JWE/AES encryption, and validation.',
    usedIn: 'Enquiry-to-Admission workflow, bulk 1,000+ user reallocation, admin editing tools.',
    impact: 'Handled 500+ daily active centers with transactional consistency.',
    connectedTo: ['Spring Boot', 'Vue 3', 'Redis', 'Java 17', 'Security'],
  },
  {
    id: 'Security',
    label: 'Spring Security',
    category: 'Secure Systems',
    icon: '🛡️',
    x: 230,
    y: 35,
    role: 'Zero-trust enterprise security, method-level authorization, AES-256 and JWE token encryption.',
    usedIn: 'Secured OTP verification pipelines, sensitive tenant data access, and CSRF protection.',
    impact: 'Protected 50,000+ accounts from unauthorized access and eliminated tenant data leakage.',
    connectedTo: ['Spring Boot', 'Java 17', 'REST APIs', 'MySQL'],
  },
  {
    id: 'Vue 3',
    label: 'Vue.js 3',
    category: 'Frontend UI',
    icon: '🖥️',
    x: 550,
    y: 230,
    role: 'Reactive frontend user interfaces built with Composition API and PrimeVue component libraries.',
    usedIn: 'Dynamic forms for admission workflows, admin dashboards with image cropping.',
    impact: 'Fluid client experiences feeding into Spring Boot endpoints without page reloads.',
    connectedTo: ['REST APIs', 'Java 17'],
  },
  {
    id: 'Docker',
    label: 'Docker',
    category: 'DevOps & Containers',
    icon: '🐳',
    x: 470,
    y: 330,
    role: 'Reproducible containerization for local microservices orchestration and build artifacts.',
    usedIn: 'Tenant isolation workflows and continuous delivery packaging.',
    impact: 'Consistent multi-environment deployments across dev, staging, and production.',
    connectedTo: ['Microservices', 'GitLab CI/CD', 'Java 17'],
  },
  {
    id: 'GitLab CI/CD',
    label: 'GitLab CI/CD',
    category: 'Automation',
    icon: '🦊',
    x: 590,
    y: 330,
    role: 'Continuous integration and zero-downtime deployment pipelines for 5 tenant profiles.',
    usedIn: 'Automated test execution, building JARs, and production rollouts.',
    impact: 'Maintained 0 deployment incidents across 5 tenant profiles.',
    connectedTo: ['Docker', 'Microservices'],
  },
  {
    id: 'AI / Python',
    label: 'Python & AI',
    category: 'Machine Learning',
    icon: '🤖',
    x: 130,
    y: 160,
    role: 'Computer vision, real-time facial feature extraction, and ML automation pipelines.',
    usedIn: 'Face Recognition Attendance System with OpenCV & MySQL.',
    impact: 'Real-time multi-person attendance recognition desktop deployment.',
    connectedTo: ['MySQL'],
  },
];

const SkillConstellation = () => {
  const { selectTech, selectedTech } = usePortfolio();
  const [hoveredNode, setHoveredNode] = useState(null);

  const activeNodeId = hoveredNode || selectedTech || 'Java 17';
  const activeNode = NODES.find((n) => n.id === activeNodeId) || NODES[0];

  const isConnected = (sourceId, targetId) => {
    if (sourceId === targetId) return true;
    const node = NODES.find((n) => n.id === sourceId);
    return node?.connectedTo.includes(targetId) || false;
  };

  return (
    <div
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-xl)',
        padding: 'clamp(1.5rem, 3vw, 2.5rem)',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.4)',
      }}
    >
      <div style={{ marginBottom: 'var(--space-md)', textAlign: 'center' }}>
        <span className="text-label" style={{ display: 'block', marginBottom: '4px' }}>
          Interactive Architecture Map
        </span>
        <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)', fontWeight: 600 }}>
          Technology Constellation & Connections
        </h3>
        <p className="text-small" style={{ maxWidth: '600px', margin: '0 auto' }}>
          Explore how backend systems, databases, caching layers, and client interfaces connect in production.
          Hover or click any node to inspect architectural responsibility.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'var(--space-xl)',
          alignItems: 'center',
        }}
      >
        {/* SVG Network Graph Canvas */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '680px',
            margin: '0 auto',
            userSelect: 'none',
          }}
        >
          <svg
            viewBox="50 20 600 360"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              overflow: 'visible',
            }}
          >
            <defs>
              <linearGradient id="lineGradActive" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="lineGradInactive" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
              </linearGradient>
            </defs>

            {/* Connecting Edges */}
            {NODES.map((node) =>
              node.connectedTo.map((targetId) => {
                const targetNode = NODES.find((n) => n.id === targetId);
                if (!targetNode) return null;
                const isEdgeActive =
                  activeNode.id === node.id ||
                  activeNode.id === targetId ||
                  (isConnected(activeNode.id, node.id) && isConnected(activeNode.id, targetId));

                return (
                  <line
                    key={`${node.id}-${targetId}`}
                    x1={node.x}
                    y1={node.y}
                    x2={targetNode.x}
                    y2={targetNode.y}
                    stroke={isEdgeActive ? 'url(#lineGradActive)' : 'url(#lineGradInactive)'}
                    strokeWidth={isEdgeActive ? 2.5 : 1}
                    strokeDasharray={isEdgeActive ? 'none' : '4 4'}
                    style={{
                      transition: 'stroke 0.3s ease, stroke-width 0.3s ease',
                      filter: isEdgeActive ? 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.5))' : 'none',
                    }}
                  />
                );
              })
            )}

            {/* Nodes */}
            {NODES.map((node) => {
              const isActive = activeNode.id === node.id;
              const isRelated = isConnected(activeNode.id, node.id);

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  onClick={() => selectTech(node.id)}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Outer pulse aura for active/core */}
                  {(isActive || node.isCore) && (
                    <circle
                      r={node.isCore ? 34 : 28}
                      fill="none"
                      stroke={isActive ? 'var(--accent)' : 'rgba(16, 185, 129, 0.35)'}
                      strokeWidth={1.5}
                      strokeDasharray="4 3"
                      style={{
                        animation: 'spin 12s linear infinite',
                        transformOrigin: '0 0',
                      }}
                    />
                  )}

                  {/* Node Circle Background */}
                  <circle
                    r={node.isCore ? 26 : 21}
                    fill={
                      isActive
                        ? '#059669'
                        : isRelated
                        ? 'rgba(24, 25, 30, 0.95)'
                        : 'rgba(15, 16, 20, 0.85)'
                    }
                    stroke={
                      isActive
                        ? '#34d399'
                        : isRelated
                        ? 'rgba(16, 185, 129, 0.6)'
                        : 'rgba(255, 255, 255, 0.14)'
                    }
                    strokeWidth={isActive ? 2.5 : 1.5}
                    style={{
                      transition: 'all 0.25s ease',
                      filter: isActive ? 'drop-shadow(0 0 16px rgba(16, 185, 129, 0.7))' : 'none',
                    }}
                  />

                  {/* Icon */}
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={node.isCore ? '16' : '13'}
                  >
                    {node.icon}
                  </text>

                  {/* Label Text below node */}
                  <text
                    y={node.isCore ? 38 : 32}
                    textAnchor="middle"
                    fill={isActive ? '#ffffff' : isRelated ? '#e2e8f0' : '#94a3b8'}
                    fontSize="11"
                    fontFamily="var(--font-mono)"
                    fontWeight={isActive || node.isCore ? '700' : '500'}
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Dynamic Architectural Inspector Card */}
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.75)',
            border: '1px solid var(--border-accent)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-lg)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3), 0 0 20px var(--accent-glow)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-sm)' }}>
            <span className="badge" style={{ background: 'var(--accent-subtle)', color: 'var(--accent-light)' }}>
              {activeNode.category}
            </span>
            <span className="text-mono" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
              CONNECTED NODES: {activeNode.connectedTo.length}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--space-sm)' }}>
            <span style={{ fontSize: '1.6rem' }}>{activeNode.icon}</span>
            <h4 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-primary)' }}>
              {activeNode.label}
            </h4>
          </div>

          <p className="text-body" style={{ fontSize: '0.88rem', lineHeight: 1.6, marginBottom: 'var(--space-md)' }}>
            {activeNode.role}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: 'var(--space-lg)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--accent-light)' }}>Production Application:</strong> {activeNode.usedIn}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--success)' }}>Measured Impact:</strong> {activeNode.impact}
            </div>
          </div>

          {/* Action button to filter portfolio */}
          <button
            onClick={() => selectTech(activeNode.id)}
            className="btn btn-primary"
            style={{
              width: '100%',
              fontSize: '0.82rem',
              padding: '8px 16px',
              justifyContent: 'center',
            }}
          >
            {selectedTech === activeNode.id ? '✓ Currently Highlighting Across Portfolio' : `Trace ${activeNode.label} Across Projects & Experience`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillConstellation;
