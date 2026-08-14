import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';

const CinematicIntro = ({ onComplete }) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);

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

    // 1. Initial pause to show the developer working
    tl.add({
      targets: imageRef.current,
      opacity: [0, 1],
      scale: [0.9, 1],
      duration: 1500,
      easing: 'easeOutQuad'
    })
    
    // 2. The massive cinematic zoom into the monitor screen
    .add({
      targets: imageRef.current,
      scale: 80, // Massive zoom
      opacity: [1, 0], // Fade out as we pass through the screen
      filter: ['blur(0px)', 'blur(10px)'], // Add motion blur
      duration: 2500,
      easing: 'easeInQuint', // Accelerate into the screen
      delay: 1000 // Give the user 1s to look at the scene before zooming
    }, '+=0')
    
    // 3. Fade out the dark background overlay to reveal the main page
    .add({
      targets: overlayRef.current,
      opacity: 0,
      duration: 800,
      easing: 'linear'
    }, '-=1000'); // Start fading background right before the zoom finishes

  }, [onComplete]);

  return (
    <div 
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#050505', // Deep black background for the intro scene
        zIndex: 999999, // Above absolutely everything
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        pointerEvents: 'none'
      }}
    >
      <img
        ref={imageRef}
        src="/developer.png"
        alt="Developer Working"
        style={{
          width: '600px', // large initial size
          height: 'auto',
          // The monitor screen is roughly around the top-right of the desk in the image
          // Adjust these percentages if the camera zoom doesn't perfectly align with the screen!
          transformOrigin: '73% 38%', 
          opacity: 0,
          willChange: 'transform, opacity, filter',
          filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.8))'
        }}
      />
      
      {/* Loading Text / Typing Indicator (Optional detail) */}
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        fontFamily: 'var(--font-mono)',
        color: 'var(--text-muted)',
        letterSpacing: '0.2em',
        fontSize: '0.8rem',
      }}>
        INITIALIZING WORKSPACE...
      </div>
    </div>
  );
};

export default CinematicIntro;
