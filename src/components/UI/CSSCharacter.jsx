import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';

const CSSCharacter = () => {
  const charRef = useRef(null);
  
  useEffect(() => {
    // Character Choreography Timeline
    const tl = anime.timeline({
      easing: 'easeOutExpo',
    });
    
    // Initial State: high above the text
    anime.set(charRef.current, { translateY: -600, translateX: -200, opacity: 0 });
    anime.set('.char-leg-l', { rotate: 0 });
    anime.set('.char-leg-r', { rotate: 0 });
    anime.set('.char-arm-l', { rotate: 0 });
    anime.set('.char-arm-r', { rotate: 0 });

    // 1. Drop in
    tl.add({
      targets: charRef.current,
      translateY: -90, // Resting slightly above the letters
      translateX: -200,
      opacity: 1,
      duration: 1000,
      easing: 'easeOutBounce',
      delay: 1500, // Wait for page to load
    })
    // 2. Squash and stretch on landing
    .add({
      targets: charRef.current,
      scaleY: [0.5, 1.2, 1],
      scaleX: [1.5, 0.8, 1],
      duration: 600,
      easing: 'easeOutElastic(1, .5)',
    }, '-=400')
    // 3. Walk cycle (translate X across the text)
    .add({
      targets: charRef.current,
      translateX: 200, // Move to middle of MAHESH
      duration: 3000,
      easing: 'linear',
      update: function(anim) {
        // Simple procedural walk cycle during the translation
        const progress = anim.progress;
        const walkCycle = Math.sin(progress * Math.PI * 10); // 5 steps
        
        anime.set('.char-leg-l', { rotate: walkCycle * 45 });
        anime.set('.char-leg-r', { rotate: -walkCycle * 45 });
        anime.set('.char-arm-l', { rotate: -walkCycle * 45 });
        anime.set('.char-arm-r', { rotate: walkCycle * 45 });
        anime.set(charRef.current, { translateY: -90 - Math.abs(walkCycle) * 10 }); // Bounce
      }
    })
    // 4. Reset posture and sit down
    .add({
      targets: ['.char-leg-l', '.char-leg-r', '.char-arm-l', '.char-arm-r'],
      rotate: 0,
      duration: 200,
      easing: 'easeOutQuad',
    })
    .add({
      targets: charRef.current,
      translateY: -70, // Sit lower on the text
      duration: 400,
      easing: 'easeOutQuad',
      complete: () => {
        // Sit pose
        anime.set('.char-leg-l', { rotate: -90, transformOrigin: 'top center' });
        anime.set('.char-leg-r', { rotate: -80, transformOrigin: 'top center' });
        anime.set('.char-arm-l', { rotate: -20 });
        anime.set('.char-arm-r', { rotate: 20 });
        
        // Start Idle animation loop
        anime({
          targets: '.char-head',
          rotate: [-5, 5],
          duration: 2000,
          direction: 'alternate',
          loop: true,
          easing: 'easeInOutSine'
        });
        
        anime({
          targets: ['.char-leg-l', '.char-leg-r'],
          rotate: (el, i) => i === 0 ? [-90, -75] : [-80, -95],
          duration: 1500,
          direction: 'alternate',
          loop: true,
          easing: 'easeInOutSine'
        });
      }
    });

  }, []);

  const styles = {
    part: {
      position: 'absolute',
      background: 'var(--accent)',
      borderRadius: '20px',
    }
  };

  return (
    <div 
      ref={charRef}
      style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        width: '20px',
        height: '60px',
        zIndex: 100,
        pointerEvents: 'none', // Don't block physics letters
      }}
    >
      {/* Head */}
      <div className="char-head" style={{
        ...styles.part,
        width: '24px',
        height: '24px',
        top: '-24px',
        left: '-2px',
        borderRadius: '50%',
        transformOrigin: 'bottom center',
      }} />
      
      {/* Body */}
      <div className="char-body" style={{
        ...styles.part,
        width: '20px',
        height: '40px',
        top: 0,
        left: 0,
      }} />

      {/* Arms */}
      <div className="char-arm-l" style={{
        ...styles.part,
        width: '8px',
        height: '35px',
        top: '5px',
        left: '-10px',
        transformOrigin: 'top center',
      }} />
      <div className="char-arm-r" style={{
        ...styles.part,
        width: '8px',
        height: '35px',
        top: '5px',
        left: '22px',
        transformOrigin: 'top center',
      }} />

      {/* Legs */}
      <div className="char-leg-l" style={{
        ...styles.part,
        width: '10px',
        height: '40px',
        top: '35px',
        left: '0px',
        transformOrigin: 'top center',
      }} />
      <div className="char-leg-r" style={{
        ...styles.part,
        width: '10px',
        height: '40px',
        top: '35px',
        left: '10px',
        transformOrigin: 'top center',
      }} />
    </div>
  );
};

export default CSSCharacter;
