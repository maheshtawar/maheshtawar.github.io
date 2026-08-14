import React, { useEffect, useRef } from 'react';

const SmoothScroll = ({ children }) => {
  const scrollContainerRef = useRef(null);
  
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let animationId;
    let currentY = 0;
    let targetY = 0;

    const setBodyHeight = () => {
      document.body.style.height = `${scrollContainer.getBoundingClientRect().height}px`;
    };

    // Use ResizeObserver to auto-update body height when content changes
    const resizeObserver = new ResizeObserver(() => setBodyHeight());
    resizeObserver.observe(scrollContainer);

    const onScroll = () => {
      targetY = window.scrollY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    const render = () => {
      // Linear interpolation for buttery momentum scroll
      currentY += (targetY - currentY) * 0.08; 
      
      // Check if we are close enough to snap to avoid infinite micro-calculations
      if (Math.abs(targetY - currentY) < 0.1) {
        currentY = targetY;
      }

      scrollContainer.style.transform = `translate3d(0, -${currentY}px, 0)`;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('scroll', onScroll);
      resizeObserver.disconnect();
      document.body.style.height = '';
    };
  }, []);

  return (
    <>
      <div 
        ref={scrollContainerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          willChange: 'transform',
          zIndex: 1, // Above WebGL, below Navbar
        }}
      >
        {children}
      </div>
    </>
  );
};

export default SmoothScroll;
