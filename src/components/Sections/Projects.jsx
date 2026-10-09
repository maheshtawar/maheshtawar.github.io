import { useState } from 'react';
import { useReveal } from '../../hooks/useAnimations';
import { projects } from '../../data/profile';
import { usePortfolio } from '../../context/PortfolioContext';

// Interactive Architecture Flow Layer definitions
const ARCHITECTURE_LAYERS = [
  {
    name: 'Client / UI',
    tech: 'Vue 3 / Tkinter',
    detail: 'Responsive frontend interface handling user inputs, validation, and reactive state updates.',
    techKeywords: ['Vue 3', 'React', 'HTML5', 'Tkinter'],
  },
  {
    name: 'API Gateway',
    tech: 'REST / Reverse Proxy',
    detail: 'Handles routing, request rate-limiting, CORS, and token validation (JWE / AES encryption).',
    techKeywords: ['REST APIs', 'Spring Security', 'Nginx'],
  },
  {
    name: 'Business Core',
    tech: 'Java 17 / Spring Boot',
    detail: 'Service layer implementing Strategy Pattern, transactional boundaries, and multi-tenant isolation.',
    techKeywords: ['Java 17', 'Spring Boot', 'Microservices', 'Python'],
  },
  {
    name: 'Cache Layer',
    tech: 'Redis In-Memory',
    detail: 'Buffers OTP flows and frequent tenant configs; bypassed 85% of redundant DB queries.',
    techKeywords: ['Redis'],
  },
  {
    name: 'Persistence',
    tech: 'MySQL 8.0 / JDBC',
    detail: 'ACID transactional persistence with optimized indexes, stored procedures, and audit trail tables.',
    techKeywords: ['MySQL', 'JDBC / JdbcTemplate', 'SQL'],
  },
];

// Project Detail Case Study Modal
const ProjectModal = ({ project, onClose }) => {
  const [selectedLayerIndex, setSelectedLayerIndex] = useState(2); // Default to Business Core

  if (!project) return null;

  const currentLayer = ARCHITECTURE_LAYERS[selectedLayerIndex];

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
      style={{ zIndex: 10005, padding: 'clamp(1rem, 4vw, 2.5rem)' }}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '840px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: 'clamp(1.5rem, 4vw, 2.5rem)',
          border: '1px solid var(--border-accent)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 35px var(--accent-glow)',
        }}
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
          style={{ position: 'absolute', top: '1.2rem', right: '1.2rem' }}
        >
          ✕
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: 'var(--space-xl)', paddingRight: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="badge" style={{ background: 'var(--accent-subtle)', color: 'var(--accent-light)' }}>
              {project.category} CASE STUDY
            </span>
            {project.featured && (
              <span className="badge" style={{ background: 'rgba(34, 197, 94, 0.15)', color: 'var(--success)' }}>
                FEATURED PRODUCTION
              </span>
            )}
          </div>
          <h3 className="heading-section" style={{ fontSize: '1.75rem', marginBottom: '4px' }}>
            {project.title}
          </h3>
          <p className="text-mono" style={{ color: 'var(--accent)', fontSize: '0.85rem' }}>
            {project.subtitle}
          </p>
        </div>

        {/* Executive Problem vs Solution Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'var(--space-md)',
            marginBottom: 'var(--space-xl)',
          }}
        >
          <div
            style={{
              padding: 'var(--space-md)',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(239, 68, 68, 0.06)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <span style={{ color: 'var(--error)' }}>⚠️</span>
              <strong className="text-mono" style={{ fontSize: '0.75rem', color: 'var(--error)', textTransform: 'uppercase' }}>
                Engineering Problem
              </strong>
            </div>
            <p className="text-small" style={{ color: 'var(--text-secondary)' }}>
              {project.problem}
            </p>
          </div>

          <div
            style={{
              padding: 'var(--space-md)',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(34, 197, 94, 0.06)',
              border: '1px solid rgba(34, 197, 94, 0.2)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <span style={{ color: 'var(--success)' }}>✓</span>
              <strong className="text-mono" style={{ fontSize: '0.75rem', color: 'var(--success)', textTransform: 'uppercase' }}>
                Engineered Solution
              </strong>
            </div>
            <p className="text-small" style={{ color: 'var(--text-secondary)' }}>
              {project.solution}
            </p>
          </div>
        </div>

        {/* Interactive Architecture Flow Diagram */}
        <div
          style={{
            marginBottom: 'var(--space-xl)',
            padding: 'var(--space-md)',
            background: 'var(--bg-tertiary)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span className="text-label" style={{ color: 'var(--accent-light)' }}>
              Interactive End-to-End Architecture Flow
            </span>
            <span className="text-mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
              CLICK ANY NODE TO INSPECT
            </span>
          </div>

          {/* Interactive Flow Pipeline Nodes */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              overflowX: 'auto',
              paddingBottom: '8px',
            }}
          >
            {ARCHITECTURE_LAYERS.map((layer, index) => {
              const isSelected = index === selectedLayerIndex;
              return (
                <div key={layer.name} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <button
                    onClick={() => setSelectedLayerIndex(index)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      background: isSelected ? 'var(--accent)' : 'var(--bg-secondary)',
                      color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                      border: isSelected ? '1px solid var(--accent-light)' : '1px solid var(--border)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected ? '0 0 14px var(--accent-glow)' : 'none',
                    }}
                  >
                    <div style={{ fontSize: '0.75rem', fontWeight: 600 }}>{layer.name}</div>
                    <div className="text-mono" style={{ fontSize: '0.65rem', opacity: isSelected ? 0.9 : 0.6 }}>
                      {layer.tech}
                    </div>
                  </button>
                  {index < ARCHITECTURE_LAYERS.length - 1 && (
                    <span style={{ color: 'var(--accent)', fontSize: '0.8rem', opacity: 0.7 }}>➔</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Active Layer Deep Dive Card */}
          <div
            style={{
              marginTop: '12px',
              padding: '12px 14px',
              borderRadius: '8px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-accent)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="badge" style={{ background: 'var(--accent-subtle)', color: 'var(--accent-light)', fontSize: '0.7rem' }}>
                {currentLayer.name} Layer
              </span>
              <span className="text-mono" style={{ fontSize: '0.75rem', color: 'var(--text-primary)' }}>
                {currentLayer.tech}
              </span>
            </div>
            <p className="text-small" style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              {currentLayer.detail}
            </p>
          </div>
        </div>

        {/* Key Engineering Features */}
        {project.keyFeatures && (
          <div style={{ marginBottom: 'var(--space-xl)' }}>
            <span className="text-label" style={{ display: 'block', marginBottom: 'var(--space-sm)' }}>
              Core Engineering Achievements
            </span>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {project.keyFeatures.map((f, i) => (
                <li key={i} style={{ display: 'flex', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <span style={{ color: 'var(--accent)', marginTop: '0.2rem', fontSize: '0.5rem' }}>▸</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technologies Used */}
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <span className="text-label" style={{ display: 'block', marginBottom: 'var(--space-sm)' }}>
            Technologies & Tools
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {project.tags.map((tag, i) => (
              <span key={i} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Links */}
        <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              View Source Repository ↗
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              Live Preview / Video Demo ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const headerRef = useReveal();
  const { selectedTech } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const categories = ['All', 'AI/ML', 'Frontend', 'Utility'];

  const filteredProjects = projects.filter((p) => {
    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
    return true;
  });

  return (
    <section id="projects" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal" ref={headerRef}>
          <span className="text-label">Engineering Case Studies</span>
          <h2 className="heading-section">Featured Systems & Projects</h2>
          <p className="text-body">
            Production-grade systems, computer vision models, and full-stack software built for performance and scale.
          </p>
        </div>

        {/* Category Filter */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'var(--space-xs)',
            flexWrap: 'wrap',
            marginBottom: 'var(--space-2xl)',
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              className={`tag${selectedCategory === cat ? ' active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
              style={{
                cursor: 'pointer',
                borderColor: selectedCategory === cat ? 'var(--accent)' : 'var(--border)',
                background: selectedCategory === cat ? 'var(--accent-subtle)' : 'var(--bg-tertiary)',
                color: selectedCategory === cat ? 'var(--accent)' : 'var(--text-secondary)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--space-xl)',
            maxWidth: '1100px',
            margin: '0 auto',
          }}
        >
          {filteredProjects.map((project, index) => {
            const isHighlighted = selectedTech && project.tags.some(
              (tag) => tag.toLowerCase().includes(selectedTech.toLowerCase()) || selectedTech.toLowerCase().includes(tag.toLowerCase())
            );

            return (
              <div
                key={index}
                data-cursor="project"
                onClick={() => setActiveModalProject(project)}
                className="card project-card-interactive"
                style={{
                  padding: 'var(--space-xl)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: isHighlighted ? '1.5px solid var(--accent)' : '1px solid var(--border)',
                  boxShadow: isHighlighted ? '0 0 24px var(--accent-glow)' : 'var(--shadow-md)',
                  transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease, box-shadow 0.2s ease',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Active filter highlight badge */}
                {isHighlighted && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'var(--accent)',
                      color: '#ffffff',
                      fontSize: '0.65rem',
                      fontFamily: 'var(--font-mono)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontWeight: 600,
                    }}
                  >
                    MATCHES: {selectedTech}
                  </div>
                )}

                <div>
                  {/* Category & Badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-md)' }}>
                    <span className="badge">{project.category}</span>
                    {project.featured && (
                      <span className="badge" style={{ background: 'rgba(34, 197, 94, 0.1)', color: 'var(--success)' }}>
                        ★ Featured
                      </span>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <h3
                    style={{
                      fontSize: '1.35rem',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      marginBottom: '4px',
                      lineHeight: 1.3,
                    }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-mono" style={{ color: 'var(--accent)', fontSize: '0.78rem', marginBottom: 'var(--space-md)' }}>
                    {project.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-body" style={{ fontSize: '0.9rem', lineHeight: 1.6, marginBottom: 'var(--space-lg)' }}>
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tech stack badges */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: 'var(--space-lg)' }}>
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="tag"
                        style={{
                          fontSize: '0.7rem',
                          background: selectedTech && tag.toLowerCase().includes(selectedTech.toLowerCase()) ? 'var(--accent-subtle)' : undefined,
                          borderColor: selectedTech && tag.toLowerCase().includes(selectedTech.toLowerCase()) ? 'var(--accent)' : undefined,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Open Case Study prompt CTA */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: 'var(--space-sm)',
                      borderTop: '1px solid var(--border)',
                      fontSize: '0.82rem',
                      color: 'var(--accent-light)',
                      fontWeight: 600,
                    }}
                  >
                    <span>Inspect Architecture & Case Study</span>
                    <span style={{ fontSize: '1.1rem' }}>➔</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Case Study Deep-Dive Modal */}
      {activeModalProject && (
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      )}
    </section>
  );
};

export default Projects;
