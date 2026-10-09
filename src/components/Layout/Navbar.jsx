import { useState, useEffect, useRef } from 'react';
import { personalInfo, navItems } from '../../data/profile';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolio } from '../../context/PortfolioContext';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { selectedTech, clearTechFilter, setIsCommandPaletteOpen } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 40);
      lastScrollY.current = currentY;

      // Active section detection
      for (let i = navItems.length - 1; i >= 0; i--) {
        const el = document.getElementById(navItems[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            setActiveSection(navItems[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileOpen(false);
    }
  };

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="navbar-inner">
          {/* Logo */}
          <button className="nav-logo" onClick={() => scrollTo('hero')} aria-label="Go to top">
            <span>{personalInfo.firstName}</span>
            <span className="nav-logo-accent">.dev</span>
          </button>

          {/* Active Global Technology Filter Indicator */}
          {selectedTech && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '3px 10px',
                borderRadius: '9999px',
                background: 'var(--accent-subtle)',
                border: '1px solid var(--accent)',
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--accent-light)',
              }}
            >
              <span>⚡ {selectedTech}</span>
              <button
                onClick={clearTechFilter}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  padding: 0,
                  marginLeft: '4px',
                }}
                title="Clear technology filter"
              >
                ✕
              </button>
            </div>
          )}

          {/* Desktop Navigation Links */}
          <div className="nav-links">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`nav-link${activeSection === item.id ? ' active' : ''}`}
                onClick={() => scrollTo(item.id)}
                aria-label={`Go to ${item.label}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Action Tools */}
          <div className="nav-actions">
            {/* Command Palette Trigger Button */}
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="text-mono"
              aria-label="Open command palette"
              title="Open Command Palette (⌘K or /)"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 10px',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-secondary)',
                fontSize: '0.72rem',
                cursor: 'pointer',
                transition: 'all var(--duration-fast) ease',
              }}
            >
              <span>⌘K</span>
              <span className="visually-hidden">Open Command Center</span>
            </button>

            {/* Theme toggle */}
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {/* Social links */}
            <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="GitHub profile">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>

            <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="LinkedIn profile">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>

            {/* Resume CTA (Desktop) */}
            <a
              href={personalInfo.resume}
              download="Mahesh_Tawar.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-resume-btn"
            >
              Resume ↗
            </a>

            {/* Mobile Toggle */}
            <button
              className={`nav-toggle${mobileOpen ? ' open' : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <span className="nav-toggle-bar" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <div className={`mobile-nav${mobileOpen ? ' open' : ''}`} role="dialog" aria-modal="true">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`mobile-nav-link${activeSection === item.id ? ' active' : ''}`}
            onClick={() => scrollTo(item.id)}
          >
            {item.label}
          </button>
        ))}
        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button
            onClick={() => {
              setMobileOpen(false);
              setIsCommandPaletteOpen(true);
            }}
            className="btn btn-secondary"
            style={{ fontSize: '0.8rem' }}
          >
            ⌘K Command Center
          </button>
          <a
            href={personalInfo.resume}
            download="Mahesh_Tawar.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ fontSize: '0.8rem' }}
          >
            Resume ↗
          </a>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
