import React, { useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';

const MagneticButton = ({ children, onClick, variant = 'primary', icon, className = '', ...props }) => {
  const btnRef = useRef(null);
  const rippleRef = useRef(null);

  const handleMouseMove = (e) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    anime({
      targets: btn,
      translateX: x * 0.3,
      translateY: y * 0.3,
      duration: 400,
      easing: 'easeOutExpo',
    });
  };

  const handleMouseLeave = () => {
    anime({
      targets: btnRef.current,
      translateX: 0,
      translateY: 0,
      duration: 600,
      easing: 'easeOutElastic(1, 0.5)',
    });
  };

  const handleClick = (e) => {
    // Ripple effect
    const btn = btnRef.current;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: rgba(255,255,255,0.4);
      left: ${x}px;
      top: ${y}px;
      transform: translate(-50%, -50%) scale(0);
      pointer-events: none;
    `;
    btn.appendChild(ripple);

    anime({
      targets: ripple,
      scale: [0, 4],
      opacity: [0.4, 0],
      duration: 600,
      easing: 'easeOutExpo',
      complete: () => ripple.remove(),
    });

    onClick?.(e);
  };

  const isPrimary = variant === 'primary';

  return (
    <button
      ref={btnRef}
      className={`magnetic-btn ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.8rem 1.8rem',
        fontFamily: 'var(--font-display)',
        fontSize: '0.95rem',
        fontWeight: 600,
        letterSpacing: '0.02em',
        border: isPrimary ? 'none' : '1.5px solid rgba(124,58,237,0.4)',
        borderRadius: '12px',
        color: isPrimary ? '#fff' : 'var(--primary-light)',
        background: isPrimary
          ? 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #22d3ee 150%)'
          : 'rgba(124,58,237,0.08)',
        backgroundSize: '200% 200%',
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease, background-position 0.5s ease',
        willChange: 'transform',
        ...props.style,
      }}
      onMouseEnter={(e) => {
        anime({
          targets: e.currentTarget,
          backgroundPosition: ['0% 0%', '100% 100%'],
          duration: 500,
          easing: 'easeOutExpo',
        });
        e.currentTarget.style.boxShadow = isPrimary
          ? '0 8px 30px rgba(124,58,237,0.4), 0 0 50px rgba(124,58,237,0.15)'
          : '0 0 30px rgba(124,58,237,0.2)';
        if (!isPrimary) {
          e.currentTarget.style.borderColor = 'rgba(124,58,237,0.6)';
        }
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        if (!isPrimary) {
          e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)';
        }
      }}
      {...props}
    >
      {icon && <i className={`pi ${icon}`} style={{ fontSize: '1rem' }} />}
      {children}
    </button>
  );
};

export default MagneticButton;
