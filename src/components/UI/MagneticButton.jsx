import { useRef, useEffect } from 'react';

const MagneticButton = ({
  children,
  onClick,
  className = '',
  style = {},
  strength = 0.25,
  as = 'button',
  ...props
}) => {
  const Component = as;
  const buttonRef = useRef(null);

  useEffect(() => {
    const el = buttonRef.current;
    if (!el) return;

    // Skip on touch screens or if reduced motion is requested
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animId = null;
    let isHovering = false;

    const lerp = (a, b, n) => (1 - n) * a + n * b;

    const render = () => {
      currentX = lerp(currentX, targetX, 0.18);
      currentY = lerp(currentY, targetY, 0.18);

      if (el) {
        el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }

      if (isHovering || Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
        animId = requestAnimationFrame(render);
      } else {
        el.style.transform = 'translate3d(0, 0, 0)';
      }
    };

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      targetX = deltaX * strength;
      targetY = deltaY * strength;

      if (!isHovering) {
        isHovering = true;
        animId = requestAnimationFrame(render);
      }
    };

    const handleMouseLeave = () => {
      isHovering = false;
      targetX = 0;
      targetY = 0;
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [strength]);

  return (
    <Component
      ref={buttonRef}
      className={`magnetic-btn ${className}`}
      onClick={onClick}
      style={{
        ...style,
        willChange: 'transform',
        transition: 'box-shadow 0.2s ease, background 0.2s ease, border-color 0.2s ease',
      }}
      {...props}
    >
      {children}
    </Component>
  );
};

export default MagneticButton;
