import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sections = [
  { id: 'hero', label: 'Base Camp' },
  { id: 'skills', label: 'Tools' },
  { id: 'experience', label: 'Ascent' },
  { id: 'projects', label: 'Portals' },
  { id: 'contact', label: 'Summit' },
];

const MountainNav = () => {
  const [active, setActive] = useState('hero');
  const [visible, setVisible] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    // Show nav only after the laptop intro (scroll past ~35%)
    ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        setVisible(self.progress > 0.15);
      },
    });

    // Track which section is active
    sections.forEach(section => {
      const el = document.getElementById(section.id);
      if (!el) return;

      ScrollTrigger.create({
        trigger: el,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActive(section.id),
        onEnterBack: () => setActive(section.id),
      });
    });
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      ref={navRef}
      className="mountain-nav"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(-50%)' : 'translateY(-50%) translateX(20px)',
        transition: 'all 0.6s var(--ease-out)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
      aria-label="Section navigation"
    >
      {sections.map((section, i) => (
        <React.Fragment key={section.id}>
          <button
            className={`nav-dot ${active === section.id ? 'active' : ''}`}
            onClick={() => scrollTo(section.id)}
            aria-label={`Go to ${section.label}`}
            title={section.label}
          >
            <span className="nav-label">{section.label}</span>
          </button>
          {i < sections.length - 1 && <div className="nav-line" />}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default MountainNav;
