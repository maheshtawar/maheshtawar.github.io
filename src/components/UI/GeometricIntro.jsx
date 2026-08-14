import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';

const GeometricIntro = ({ onComplete }) => {
  const containerRef = useRef(null);
  
  // Grid config
  const cols = 20;
  const rows = 12;
  const totalElements = cols * rows;

  useEffect(() => {
    // Hide scrollbar during intro
    document.body.style.overflow = 'hidden';

    const tl = anime.timeline({
      easing: 'easeInOutExpo',
      complete: () => {
        document.body.style.overflow = '';
        if (onComplete) onComplete();
      }
    });

    // 1. Ripple out from center (Scale up and rotate)
    tl.add({
      targets: '.geo-el',
      scale: [
        {value: .1, easing: 'easeOutSine', duration: 400},
        {value: 1, easing: 'easeInOutQuad', duration: 800}
      ],
      rotateZ: [
        {value: '1turn', duration: 1200, easing: 'easeInOutSine'}
      ],
      backgroundColor: [
        {value: '#7c3aed', duration: 400},
        {value: '#22d3ee', duration: 400},
        {value: '#fff', duration: 400}
      ],
      borderRadius: [
        {value: '50%', duration: 400},
        {value: '0%', duration: 800}
      ],
      delay: anime.stagger(50, {grid: [cols, rows], from: 'center'})
    })
    
    // 2. Explode outwards (Translate)
    .add({
      targets: '.geo-el',
      translateX: anime.stagger(10, {grid: [cols, rows], from: 'center', axis: 'x'}),
      translateY: anime.stagger(10, {grid: [cols, rows], from: 'center', axis: 'y'}),
      rotate: anime.stagger([0, 90], {grid: [cols, rows], from: 'center'}),
      scale: 0.2,
      delay: anime.stagger(20, {grid: [cols, rows], from: 'center'}),
      duration: 1000
    }, '-=400')
    
    // 3. Implode and disappear
    .add({
      targets: '.geo-el',
      scale: 0,
      opacity: 0,
      duration: 800,
      delay: anime.stagger(20, {grid: [cols, rows], from: 'last'})
    }, '-=200')
    
    // 4. Fade out the background
    .add({
      targets: containerRef.current,
      opacity: 0,
      duration: 500,
      easing: 'linear'
    }, '-=400');

  }, [onComplete, cols, rows]);

  // Generate grid elements
  const gridElements = [];
  for (let i = 0; i < totalElements; i++) {
    gridElements.push(
      <div 
        key={i} 
        className="geo-el"
        style={{
          width: '24px',
          height: '24px',
          backgroundColor: '#0a0a0a',
          margin: '4px'
        }}
      />
    );
  }

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#050505', 
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        pointerEvents: 'none'
      }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gap: '8px',
        // Rotate the entire grid slightly for a more dynamic look
        transform: 'rotate(-15deg) scale(1.5)'
      }}>
        {gridElements}
      </div>
    </div>
  );
};

export default GeometricIntro;
