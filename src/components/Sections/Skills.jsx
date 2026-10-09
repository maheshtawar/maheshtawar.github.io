import { useState } from 'react';
import { useReveal, useCardGlow } from '../../hooks/useAnimations';
import { skills } from '../../data/profile';
import { usePortfolio } from '../../context/PortfolioContext';
import SkillConstellation from './SkillConstellation';

const SkillCard = ({ skill, isExpanded, onToggle, isHighlighted }) => {
  const cardGlow = useCardGlow();

  return (
    <div
      className={`card ${isHighlighted ? 'highlighted-item' : ''}`}
      style={{
        padding: 'var(--space-md)',
        cursor: 'pointer',
        border: isHighlighted ? '1.5px solid var(--accent)' : '1px solid var(--border)',
        boxShadow: isHighlighted ? '0 0 20px var(--accent-glow)' : 'none',
        transition: 'all 0.25s ease',
      }}
      onClick={onToggle}
      {...cardGlow}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(); } }}
      aria-expanded={isExpanded}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {isHighlighted && <span style={{ color: 'var(--accent)', fontSize: '0.8rem' }}>★</span>}
          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: isHighlighted ? 'var(--accent-light)' : 'var(--text-primary)' }}>
            {skill.name}
          </span>
        </div>
        <svg
          width="14" height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--text-muted)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transition: 'transform 0.2s var(--ease-out)', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
      {isExpanded && (
        <p className="text-small" style={{ marginTop: 'var(--space-sm)', fontSize: '0.78rem', lineHeight: 1.5, color: 'var(--text-muted)' }}>
          {skill.description}
        </p>
      )}
    </div>
  );
};

const CategoryGroup = ({ category, categoryIndex, expandedSkill, onToggleSkill, selectedTech }) => {
  const catRef = useReveal({ rootMargin: '0px 0px -40px 0px' });

  return (
    <div className="reveal" ref={catRef}>
      {/* Category Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-md)' }}>
        <span style={{ fontSize: '1.2rem' }}>{category.icon}</span>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
          {category.category}
        </h3>
        <span className="text-mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>
          {category.items.length} skills
        </span>
      </div>

      {/* Skill Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {category.items.map((skill, si) => {
          const isHighlighted = selectedTech && (
            skill.name.toLowerCase().includes(selectedTech.toLowerCase()) ||
            selectedTech.toLowerCase().includes(skill.name.toLowerCase())
          );
          return (
            <SkillCard
              key={`${categoryIndex}-${si}`}
              skill={skill}
              isExpanded={expandedSkill === `${categoryIndex}-${si}`}
              isHighlighted={Boolean(isHighlighted)}
              onToggle={() => onToggleSkill(`${categoryIndex}-${si}`)}
            />
          );
        })}
      </div>
    </div>
  );
};

const Skills = () => {
  const headerRef = useReveal();
  const { selectedTech, clearTechFilter } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedSkill, setExpandedSkill] = useState(null);

  const categories = ['All', ...skills.map(s => s.category)];
  const filtered = activeFilter === 'All' ? skills : skills.filter(s => s.category === activeFilter);

  return (
    <section id="skills" className="section">
      <div className="container">
        {/* Header */}
        <div className="section-header reveal" ref={headerRef}>
          <span className="text-label">Skills & Systems Ecosystem</span>
          <h2 className="heading-section">Architecture & Technical Stack</h2>
          <p className="text-body">
            Specialized in enterprise backend architecture with production experience spanning high-throughput APIs, caching, and data pipelines.
          </p>
        </div>

        {/* Part 1: Interactive Constellation Graph */}
        <div style={{ marginBottom: 'var(--space-3xl)' }}>
          <SkillConstellation />
        </div>

        {/* Global Active Filter Indicator (if selected) */}
        {selectedTech && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              padding: '10px 18px',
              borderRadius: '9999px',
              background: 'var(--accent-subtle)',
              border: '1px solid var(--border-accent)',
              maxWidth: 'fit-content',
              margin: '0 auto var(--space-xl) auto',
            }}
          >
            <span className="text-mono" style={{ fontSize: '0.8rem', color: 'var(--accent-light)' }}>
              Filtering by: <strong>{selectedTech}</strong>
            </span>
            <button
              onClick={clearTechFilter}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 'bold',
              }}
              title="Clear technology filter"
            >
              ✕ Clear
            </button>
          </div>
        )}

        {/* Category Filter Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'var(--space-xs)',
          flexWrap: 'wrap',
          marginBottom: 'var(--space-2xl)',
        }}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`tag${activeFilter === cat ? ' active' : ''}`}
              onClick={() => setActiveFilter(cat)}
              style={{
                cursor: 'pointer',
                borderColor: activeFilter === cat ? 'var(--accent)' : 'var(--border)',
                background: activeFilter === cat ? 'var(--accent-subtle)' : 'var(--bg-tertiary)',
                color: activeFilter === cat ? 'var(--accent)' : 'var(--text-secondary)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid with Cross-Highlighting */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-xl)', maxWidth: '1000px', margin: '0 auto' }}>
          {filtered.map((category, ci) => (
            <CategoryGroup
              key={category.category}
              category={category}
              categoryIndex={ci}
              expandedSkill={expandedSkill}
              selectedTech={selectedTech}
              onToggleSkill={(id) => setExpandedSkill(expandedSkill === id ? null : id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
