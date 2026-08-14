import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { personalInfo } from '../../data/profile';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const indicatorRef = useRef(null);

  const navItems = [
    { id: 'hero', label: 'Home', icon: 'pi-home' },
    { id: 'skills', label: 'Skills', icon: 'pi-cog' },
    { id: 'projects', label: 'Projects', icon: 'pi-briefcase' },
    { id: 'experience', label: 'Experience', icon: 'pi-history' },
    { id: 'certificates', label: 'Certificates', icon: 'pi-verified' },
    { id: 'contact', label: 'Contact', icon: 'pi-envelope' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Scrolled state (blur background)
      setScrolled(currentScrollY > 50);

      // Hide/show on scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentScrollY;

      // Active section detection
      const sections = navItems.map(item => document.getElementById(item.id)).filter(Boolean);
      for (let i = sections.length - 1; i >= 0; i--) {
        const rect = sections[i].getBoundingClientRect();
        if (rect.top <= 150) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  // Mobile menu animation
  useEffect(() => {
    if (mobileOpen) {
      anime({
        targets: '.mobile-nav-item',
        translateX: [-40, 0],
        opacity: [0, 1],
        delay: anime.stagger(60),
        duration: 500,
        easing: 'easeOutExpo',
      });
    }
  }, [mobileOpen]);

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrolled ? '0.6rem 2rem' : '1rem 2rem',
          background: scrolled ? 'rgba(6, 9, 24, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(148, 163, 184, 0.06)' : '1px solid transparent',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
        }}
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <div
            onClick={() => scrollToSection('hero')}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.4rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
            }}
          >
            <span style={{ color: 'var(--text-primary)' }}>{personalInfo.firstName}</span>
            <span style={{
              background: 'var(--gradient-primary)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>.dev</span>
          </div>

          {/* Desktop Nav Links */}
          <div className="nav-links-desktop" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                style={{
                  background: activeSection === item.id ? 'rgba(124,58,237,0.12)' : 'transparent',
                  border: 'none',
                  color: activeSection === item.id ? 'var(--primary-light)' : 'var(--text-secondary)',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== item.id) {
                    e.currentTarget.style.color = 'var(--text-primary)';
                    e.currentTarget.style.background = 'rgba(148,163,184,0.06)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== item.id) {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Social + Mobile Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer"
              className="nav-social-link"
              style={{
                width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '8px', color: 'var(--text-secondary)', transition: 'all 0.3s ease',
                background: 'transparent',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'rgba(148,163,184,0.08)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent'; }}
            >
              <i className="pi pi-github" style={{ fontSize: '1.1rem' }} />
            </a>
            <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer"
              className="nav-social-link"
              style={{
                width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '8px', color: 'var(--text-secondary)', transition: 'all 0.3s ease',
                background: 'transparent',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'rgba(148,163,184,0.08)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent'; }}
            >
              <i className="pi pi-linkedin" style={{ fontSize: '1.1rem' }} />
            </a>

            {/* Mobile Hamburger */}
            <button
              className="mobile-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '1.5rem',
                cursor: 'pointer',
                padding: '0.25rem',
              }}
            >
              <i className={`pi ${mobileOpen ? 'pi-times' : 'pi-bars'}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="mobile-nav-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            background: 'rgba(6, 9, 24, 0.95)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              className="mobile-nav-item"
              onClick={() => scrollToSection(item.id)}
              style={{
                background: 'none',
                border: 'none',
                color: activeSection === item.id ? 'var(--primary-light)' : 'var(--text-primary)',
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                fontWeight: 600,
                padding: '0.75rem 2rem',
                cursor: 'pointer',
                opacity: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              <i className={`pi ${item.icon}`} style={{ fontSize: '1.2rem', color: 'var(--accent)' }} />
              {item.label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-social-link { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
