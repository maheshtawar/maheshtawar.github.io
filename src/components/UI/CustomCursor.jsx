import { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [cursorText, setCursorText] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on non-touch desktop devices with fine pointer
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animId = null;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onMouseOver = (e) => {
      const target = e.target;
      if (!target || !(target instanceof HTMLElement)) return;

      const projectEl = target.closest('[data-cursor="project"], .project-card, .project-card-interactive');
      const exploreEl = target.closest('[data-cursor="explore"], .avatar-container');
      const terminalEl = target.closest('[data-cursor="terminal"], .terminal-container');
      const buttonEl = target.closest('button, a, .magnetic-btn, .tag, input, textarea, select');

      if (projectEl) {
        setCursorText('VIEW →');
        setIsHovering(true);
      } else if (exploreEl) {
        setCursorText('EXPLORE');
        setIsHovering(true);
      } else if (terminalEl) {
        setCursorText('CLI');
        setIsHovering(true);
      } else if (buttonEl) {
        setCursorText('');
        setIsHovering(true);
      } else {
        setCursorText('');
        setIsHovering(false);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    const lerp = (a, b, n) => (1 - n) * a + n * b;

    const renderRing = () => {
      ringX = lerp(ringX, mouseX, 0.18);
      ringY = lerp(ringY, mouseY, 0.18);

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      animId = requestAnimationFrame(renderRing);
    };

    animId = requestAnimationFrame(renderRing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  return (
    <>
      {/* Precision center dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: 'var(--accent)',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: isVisible ? (cursorText ? 0 : 1) : 0,
          transition: 'opacity 0.2s ease, width 0.2s ease, height 0.2s ease',
          willChange: 'transform',
        }}
      />

      {/* Trailing follower ring with context text */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: cursorText ? '84px' : isHovering ? '44px' : '26px',
          height: cursorText ? '84px' : isHovering ? '44px' : '26px',
          borderRadius: '50%',
          border: cursorText
            ? '1px solid rgba(99, 102, 241, 0.8)'
            : isHovering
            ? '1.5px solid rgba(99, 102, 241, 0.6)'
            : '1px solid rgba(255, 255, 255, 0.25)',
          backgroundColor: cursorText
            ? 'rgba(15, 23, 42, 0.85)'
            : isHovering
            ? 'rgba(99, 102, 241, 0.08)'
            : 'transparent',
          backdropFilter: cursorText ? 'blur(8px)' : 'none',
          WebkitBackdropFilter: cursorText ? 'blur(8px)' : 'none',
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: isVisible ? 1 : 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--accent-light)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          fontWeight: 700,
          letterSpacing: '0.05em',
          transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease, border-color 0.2s ease, opacity 0.2s ease',
          boxShadow: cursorText ? '0 0 20px rgba(99, 102, 241, 0.35)' : 'none',
          willChange: 'transform',
        }}
      >
        {cursorText}
      </div>
    </>
  );
};

export default CustomCursor;
