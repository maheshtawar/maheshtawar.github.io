import { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useTheme } from '../../context/ThemeContext';
import { personalInfo, projects, navItems } from '../../data/profile';
import { exportMessagesToExcel } from '../../utils/excelExport';

const CommandPaletteModal = ({ onClose }) => {
  const { selectTech, copyEmail, showToast } = usePortfolio();
  const { theme, toggleTheme } = useTheme();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const scrollTo = (id) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const allItems = [
    // Navigation items
    ...navItems.map((item) => ({
      id: `nav-${item.id}`,
      type: 'Navigation',
      label: `Jump to ${item.label}`,
      subtext: `Go directly to #${item.id} section`,
      icon: '➔',
      action: () => scrollTo(item.id),
    })),
    // Projects direct
    ...projects.map((proj) => ({
      id: `proj-${proj.title}`,
      type: 'Projects',
      label: proj.title,
      subtext: `${proj.category} • ${proj.tags.join(', ')}`,
      icon: '📂',
      action: () => {
        scrollTo('projects');
      },
    })),
    // Filter by key tech
    {
      id: 'tech-java',
      type: 'Filter Stack',
      label: 'Focus: Java 17 & Spring Boot',
      subtext: 'Cross-highlight core backend systems',
      icon: '☕',
      action: () => {
        selectTech('Java 17');
        scrollTo('skills');
      },
    },
    {
      id: 'tech-redis',
      type: 'Filter Stack',
      label: 'Focus: Redis Caching & 97% Latency Cut',
      subtext: 'Cross-highlight caching and high-throughput modules',
      icon: '⚡',
      action: () => {
        selectTech('Redis');
        scrollTo('experience');
      },
    },
    {
      id: 'tech-mysql',
      type: 'Filter Stack',
      label: 'Focus: MySQL Database Optimization',
      subtext: 'Cross-highlight query consolidation & transactions',
      icon: '🗄️',
      action: () => {
        selectTech('MySQL');
        scrollTo('skills');
      },
    },
    {
      id: 'tech-security',
      type: 'Filter Stack',
      label: 'Focus: Secure Systems & Spring Security',
      subtext: 'AES-256/JWE encryption, RBAC & 50K+ accounts secured',
      icon: '🛡️',
      action: () => {
        selectTech('Spring Security');
        scrollTo('skills');
      },
    },
    {
      id: 'tech-microservices',
      type: 'Filter Stack',
      label: 'Focus: Microservices Architecture',
      subtext: 'Cross-highlight decoupled schedulers and tenant isolation',
      icon: '🌐',
      action: () => {
        selectTech('Microservices');
        scrollTo('experience');
      },
    },
    // Direct Actions
    {
      id: 'act-export-excel',
      type: 'Actions',
      label: 'Export Contact Messages to Excel (.csv)',
      subtext: 'Download received inquiries in Excel format',
      icon: '📊',
      action: () => {
        exportMessagesToExcel();
        showToast('Exported contact messages to Excel');
        onClose();
      },
    },
    {
      id: 'act-copy-email',
      type: 'Actions',
      label: `Copy Email Address (${personalInfo.email})`,
      subtext: 'Quick copy to clipboard',
      icon: '📋',
      action: () => {
        copyEmail();
        onClose();
      },
    },
    {
      id: 'act-resume',
      type: 'Actions',
      label: 'View / Download Resume (PDF)',
      subtext: 'Opens Google Drive official CV',
      icon: '📄',
      action: () => {
        window.open(personalInfo.resume, '_blank');
        onClose();
      },
    },
    {
      id: 'act-theme',
      type: 'Actions',
      label: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
      subtext: 'Toggle workstation appearance',
      icon: theme === 'dark' ? '☀️' : '🌙',
      action: () => {
        toggleTheme();
        onClose();
      },
    },
    {
      id: 'act-github',
      type: 'Actions',
      label: 'Open GitHub Profile',
      subtext: 'github.com/maheshtawar',
      icon: '🐙',
      action: () => {
        window.open(personalInfo.social.github, '_blank');
        onClose();
      },
    },
    {
      id: 'act-linkedin',
      type: 'Actions',
      label: 'Open LinkedIn Profile',
      subtext: 'linkedin.com/in/maheshtawar',
      icon: '💼',
      action: () => {
        window.open(personalInfo.social.linkedin, '_blank');
        onClose();
      },
    },
  ];

  const filteredItems = allItems.filter((item) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      item.label.toLowerCase().includes(q) ||
      item.subtext.toLowerCase().includes(q) ||
      item.type.toLowerCase().includes(q)
    );
  });

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Command Center"
      style={{
        zIndex: 10003,
        padding: 'clamp(1rem, 5vw, 3rem)',
        alignItems: 'flex-start',
        paddingTop: 'clamp(3rem, 10vh, 6rem)',
      }}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '640px',
          width: '100%',
          padding: 0,
          overflow: 'hidden',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-accent)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 35px var(--accent-glow)',
        }}
      >
        {/* Search header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '16px 20px',
          borderBottom: '1px solid var(--border)',
          background: 'var(--bg-tertiary)',
        }}>
          <span style={{ color: 'var(--accent)', fontSize: '1.1rem' }}>⌘</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or jump to section... (or press Esc to exit)"
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.95rem',
            }}
          />
          <span className="text-mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', border: '1px solid var(--border)', padding: '2px 6px', borderRadius: '4px' }}>
            ESC
          </span>
        </div>

        {/* Results list */}
        <div
          ref={listRef}
          style={{
            maxHeight: '380px',
            overflowY: 'auto',
            padding: '8px',
          }}
        >
          {filteredItems.length === 0 ? (
            <div style={{ padding: '32px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <p className="text-small">No commands matching "{query}"</p>
              <span className="text-mono" style={{ fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>
                Try searching "projects", "skills", "redis", or "email"
              </span>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: isSelected ? 'var(--accent-subtle)' : 'transparent',
                    border: isSelected ? '1px solid var(--border-accent)' : '1px solid transparent',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 500, color: isSelected ? 'var(--accent-light)' : 'var(--text-primary)' }}>
                        {item.label}
                      </div>
                      <div className="text-mono" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        {item.subtext}
                      </div>
                    </div>
                  </div>
                  <span className="text-mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    {item.type}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 18px',
          borderTop: '1px solid var(--border)',
          background: 'var(--bg-tertiary)',
          fontSize: '0.72rem',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-mono)',
        }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <span style={{ color: 'var(--accent)' }}>Mahesh Tawar CLI Engine</span>
        </div>
      </div>
    </div>
  );
};

const CommandPalette = () => {
  const { isCommandPaletteOpen, setIsCommandPaletteOpen } = usePortfolio();

  if (!isCommandPaletteOpen) return null;

  return <CommandPaletteModal onClose={() => setIsCommandPaletteOpen(false)} />;
};

export default CommandPalette;
