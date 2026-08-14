import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';

const ScrollAvatar = () => {
  const avatarRef = useRef(null);
  
  // Physics state
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const isHovering = useRef(false);

  useEffect(() => {
    let animationFrameId;

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, .magnetic, .glow-card, span')) {
        isHovering.current = true;
      } else {
        isHovering.current = false;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    const update = () => {
      if (!avatarRef.current) return;

      // Make the avatar chase the mouse
      // When hovering over interactive elements, it gets closer, otherwise it trails slightly behind
      const targetX = mouse.current.x + (isHovering.current ? 40 : 100);
      const targetY = mouse.current.y + (isHovering.current ? -40 : -100);

      // Spring interpolate position (the "chase")
      pos.current.x += (targetX - pos.current.x) * 0.08;
      pos.current.y += (targetY - pos.current.y) * 0.08;

      // Calculate velocity for rotation/tilt
      const velocityX = targetX - pos.current.x;
      const velocityY = targetY - pos.current.y;
      
      const tiltX = velocityY * -0.2;
      const tiltY = velocityX * 0.2;

      // Squash and stretch based on velocity (makes it look like it's actively moving/climbing)
      const stretch = Math.max(1, 1 + Math.abs(velocityY) * 0.005);
      const squash = Math.max(0.5, 1 - Math.abs(velocityX) * 0.002);

      let scale = 1;
      let glow = 0;

      if (isHovering.current) {
        scale = 1.2;
        glow = 1;
      }

      // Apply transforms
      avatarRef.current.style.transform = `
        translate3d(${pos.current.x}px, ${pos.current.y}px, 0)
        rotateX(${tiltX}deg)
        rotateY(${tiltY}deg)
        scaleX(${squash})
        scaleY(${stretch})
        scale(${scale})
      `;

      // Dynamic filter
      avatarRef.current.style.filter = `
        drop-shadow(0 0 ${20 + glow * 40}px rgba(34, 211, 238, ${0.3 + glow * 0.5}))
        brightness(${1 + glow * 0.2})
      `;

      animationFrameId = requestAnimationFrame(update);
    };

    update();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
        perspective: '1000px',
      }}
    >
      <div
        ref={avatarRef}
        style={{
          position: 'absolute',
          width: '180px', // Slightly larger so it's prominent
          height: 'auto',
          transformOrigin: 'center center',
          pointerEvents: 'auto',
          cursor: 'pointer',
          willChange: 'transform, filter',
          marginLeft: '-90px', 
          marginTop: '-90px', 
        }}
        onClick={() => {
          anime({
            targets: avatarRef.current,
            scale: [0.8, 1.4, 1],
            rotateZ: [0, 15, -15, 0],
            duration: 800,
            easing: 'easeOutElastic(1, .5)'
          });
        }}
      >
        <img
          src="/developer.png"
          alt="Interactive Avatar"
          style={{
            width: '100%',
            height: 'auto',
            filter: 'drop-shadow(0px 15px 30px rgba(0,0,0,0.6))',
          }}
        />
      </div>
    </div>
  );
};

export default ScrollAvatar;
