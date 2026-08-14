import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs/lib/anime.es.js';

const LoadingScreen = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);
  const containerRef = useRef(null);
  const lettersRef = useRef(null);
  const taglineRef = useRef(null);
  const progressRef = useRef(null);
  const shapesRef = useRef(null);

  useEffect(() => {
    // Create morphing shapes
    const shapesEl = shapesRef.current;
    for (let i = 0; i < 6; i++) {
      const shape = document.createElement('div');
      shape.className = 'loader-shape';
      shape.style.cssText = `
        position: absolute;
        width: ${40 + i * 20}px;
        height: ${40 + i * 20}px;
        border: 2px solid ${i % 2 === 0 ? 'rgba(124,58,237,0.3)' : 'rgba(34,211,238,0.2)'};
        border-radius: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      `;
      shapesEl.appendChild(shape);
    }

    // Animate shapes
    anime({
      targets: '.loader-shape',
      scale: [0, 1.5],
      opacity: [0.8, 0],
      borderRadius: ['50%', '30%'],
      delay: anime.stagger(200),
      duration: 2000,
      easing: 'easeOutExpo',
      loop: true,
    });

    // Timeline
    const tl = anime.timeline({
      easing: 'easeOutExpo',
    });

    // Letters fly in
    tl.add({
      targets: '.loader-letter',
      translateY: [80, 0],
      opacity: [0, 1],
      rotateX: [90, 0],
      delay: anime.stagger(60),
      duration: 1200,
    })
    // Tagline fades in
    .add({
      targets: taglineRef.current,
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800,
    }, '-=600')
    // Progress bar fills
    .add({
      targets: progressRef.current,
      width: ['0%', '100%'],
      duration: 1500,
      easing: 'easeInOutQuad',
    }, '-=400')
    // Exit
    .add({
      targets: containerRef.current,
      opacity: [1, 0],
      scale: [1, 0.95],
      duration: 600,
      easing: 'easeInExpo',
      complete: () => {
        setIsExiting(true);
        setTimeout(() => onComplete?.(), 100);
      }
    }, '+=300');
  }, [onComplete]);

  if (isExiting) return null;

  const name = 'MAHESH TAWAR';

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-void)',
        backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(124,58,237,0.08) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(34,211,238,0.06) 0%, transparent 50%)',
      }}
    >
      {/* Morphing shapes container */}
      <div ref={shapesRef} style={{ position: 'absolute', width: '300px', height: '300px' }} />

      {/* Name */}
      <div ref={lettersRef} style={{
        display: 'flex',
        gap: '4px',
        marginBottom: '1rem',
        perspective: '600px',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
        {name.split('').map((char, i) => (
          <span
            key={i}
            className="loader-letter"
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              background: 'var(--gradient-primary)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              opacity: 0,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>

      {/* Tagline */}
      <div
        ref={taglineRef}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.9rem',
          color: 'var(--text-secondary)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          opacity: 0,
          marginBottom: '2rem',
        }}
      >
        Java Backend Developer
      </div>

      {/* Progress bar */}
      <div style={{
        width: '200px',
        height: '2px',
        background: 'rgba(148, 163, 184, 0.1)',
        borderRadius: '1px',
        overflow: 'hidden',
      }}>
        <div
          ref={progressRef}
          style={{
            height: '100%',
            width: '0%',
            background: 'var(--gradient-primary)',
            borderRadius: '1px',
          }}
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
