import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  
  useEffect(() => {
    // Hide native cursor
    document.body.style.cursor = 'none';

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;
    
    let isHovering = false;
    let isClicking = false;
    let animationId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onMouseDown = () => (isClicking = true);
    const onMouseUp = () => (isClicking = false);

    // Magnetic / Hover detection
    const onMouseOver = (e) => {
      if (e.target.closest('a, button, .magnetic, .glow-card')) {
        isHovering = true;
      } else {
        isHovering = false;
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onMouseOver);

    const render = () => {
      if (!cursorRef.current) return;

      // Spring physics
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;

      // Determine size based on state
      let size = 20;
      if (isHovering) size = 80;
      if (isClicking) size -= 10;

      cursorRef.current.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      cursorRef.current.style.width = `${size}px`;
      cursorRef.current.style.height = `${size}px`;
      
      // If hovering, add text "VIEW" or mix-blend-mode difference
      if (isHovering) {
        cursorRef.current.style.mixBlendMode = 'difference';
        cursorRef.current.style.background = '#fff';
        cursorRef.current.style.border = 'none';
      } else {
        cursorRef.current.style.mixBlendMode = 'normal';
        cursorRef.current.style.background = 'transparent';
        cursorRef.current.style.border = '2px solid rgba(255, 51, 102, 0.5)';
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 10000,
        transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease, border 0.3s ease',
        willChange: 'transform, width, height',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#000',
        fontFamily: 'var(--font-mono)',
        fontSize: '12px',
        fontWeight: 'bold',
      }}
    >
      {/* Optional: Add dynamic text inside the cursor based on context */}
    </div>
  );
};

export default CustomCursor;
