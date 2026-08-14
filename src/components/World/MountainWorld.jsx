import React, { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ============================================
   SVG Mountain Path Generators
   ============================================ */
function generateMountainPath(peaks, width, baseY, seed = 0) {
  const points = [];
  const segmentWidth = width / (peaks * 2);
  
  for (let i = 0; i <= peaks * 2; i++) {
    const x = (i / (peaks * 2)) * width;
    const isPeak = i % 2 === 1;
    const noise = Math.sin(seed + i * 1.7) * 0.15 + Math.cos(seed + i * 2.3) * 0.1;
    const y = isPeak 
      ? baseY * (0.3 + noise) 
      : baseY * (0.7 + Math.abs(noise) * 0.3);
    points.push({ x, y });
  }
  
  // Build smooth path
  let d = `M0,${baseY}`;
  points.forEach((p, i) => {
    if (i === 0) {
      d += ` L${p.x},${p.y}`;
    } else {
      const prev = points[i - 1];
      const cpx = (prev.x + p.x) / 2;
      d += ` Q${cpx},${prev.y} ${p.x},${p.y}`;
    }
  });
  d += ` L${width},${baseY} Z`;
  return d;
}

/* ============================================
   Mountain Layer Component
   ============================================ */
const MountainLayer = ({ color, opacity, peaks, baseY, speed, blur, zIndex, seed }) => {
  const pathData = useMemo(() => generateMountainPath(peaks, 2400, baseY, seed), [peaks, baseY, seed]);
  
  return (
    <div 
      className="mountain-layer"
      data-speed={speed}
      style={{ 
        zIndex,
        filter: blur ? `blur(${blur}px)` : 'none',
        opacity,
      }}
    >
      <svg 
        viewBox="0 0 2400 600" 
        preserveAspectRatio="none"
        style={{ width: '100%', height: '60vh', display: 'block' }}
      >
        <path d={pathData} fill={color} />
      </svg>
    </div>
  );
};

/* ============================================
   Cloud Component
   ============================================ */
const Cloud = ({ style, size = 'medium' }) => {
  const sizes = {
    small: { width: '150px', height: '40px' },
    medium: { width: '300px', height: '80px' },
    large: { width: '500px', height: '120px' },
  };
  
  return (
    <div style={{
      position: 'absolute',
      ...sizes[size],
      borderRadius: '100px',
      background: 'radial-gradient(ellipse, rgba(168, 180, 189, 0.15) 0%, transparent 70%)',
      filter: 'blur(8px)',
      ...style,
    }} />
  );
};

/* ============================================
   Fog Layer Component
   ============================================ */
const FogLayer = ({ direction = 'left', speed = 60, opacity = 0.3, top = '50%', height = '30%' }) => {
  return (
    <div className="fog-layer" style={{
      top,
      height,
      opacity,
      background: `linear-gradient(${direction === 'left' ? '90deg' : '270deg'}, 
        transparent 0%, 
        rgba(168, 180, 189, 0.08) 20%, 
        rgba(168, 180, 189, 0.12) 50%, 
        rgba(168, 180, 189, 0.08) 80%, 
        transparent 100%)`,
      animation: `drift-${direction === 'left' ? 'left' : 'right'} ${speed}s linear infinite`,
    }} />
  );
};

/* ============================================
   Particle System (Canvas 2D)
   ============================================ */
const ParticleCanvas = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    const count = Math.min(80, Math.floor(window.innerWidth / 20));
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -Math.random() * 0.5 - 0.1,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 180, 189, ${p.opacity})`;
        ctx.fill();
      });
      
      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        position: 'absolute', 
        inset: 0, 
        zIndex: 20, 
        pointerEvents: 'none',
        opacity: 0.6,
      }} 
    />
  );
};

/* ============================================
   Sky Gradient
   ============================================ */
const SkyGradient = () => {
  return (
    <div 
      className="sky-gradient"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        background: `linear-gradient(
          180deg,
          #080B10 0%,
          #0B1420 20%,
          #122035 40%,
          #1a3050 60%,
          #344454 80%,
          #2a3a4a 100%
        )`,
        transition: 'background 1s ease',
      }}
    />
  );
};

/* ============================================
   Stars
   ============================================ */
const Stars = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 50}%`,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 3,
      duration: Math.random() * 2 + 2,
    }));
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
      {stars.map(star => (
        <div key={star.id} style={{
          position: 'absolute',
          left: star.left,
          top: star.top,
          width: `${star.size}px`,
          height: `${star.size}px`,
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          animation: `glow-pulse ${star.duration}s ${star.delay}s infinite`,
        }} />
      ))}
    </div>
  );
};

/* ============================================
   MAIN: MountainWorld
   ============================================ */
const MountainWorld = ({ visible = true }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scroll-driven parallax for mountain layers
    const layers = containerRef.current.querySelectorAll('.mountain-layer');
    layers.forEach((layer) => {
      const speed = parseFloat(layer.dataset.speed) || 0;
      gsap.to(layer, {
        y: () => speed * ScrollTrigger.maxScroll(window) * -0.1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
        },
      });
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <div 
      ref={containerRef}
      className="mountain-world"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <SkyGradient />
      <Stars />

      {/* Far mountains — slowest parallax */}
      <MountainLayer 
        color="#0f1a28"
        opacity={0.9}
        peaks={6}
        baseY={600}
        speed={0.3}
        blur={3}
        zIndex={2}
        seed={0}
      />

      {/* Mid-far mountains */}
      <MountainLayer 
        color="#132030"
        opacity={0.95}
        peaks={8}
        baseY={600}
        speed={0.5}
        blur={2}
        zIndex={3}
        seed={3.7}
      />

      {/* Mid mountains */}
      <MountainLayer 
        color="#1a2d40"
        opacity={1}
        peaks={7}
        baseY={600}
        speed={0.8}
        blur={1}
        zIndex={4}
        seed={7.2}
      />

      {/* Near mountains */}
      <MountainLayer 
        color="#0e1820"
        opacity={1}
        peaks={5}
        baseY={600}
        speed={1.2}
        blur={0}
        zIndex={5}
        seed={11.5}
      />

      {/* Foreground ridge */}
      <MountainLayer 
        color="#080B10"
        opacity={1}
        peaks={4}
        baseY={600}
        speed={1.8}
        blur={0}
        zIndex={6}
        seed={15.1}
      />

      {/* Fog layers */}
      <FogLayer direction="left" speed={80} opacity={0.25} top="55%" height="25%" />
      <FogLayer direction="right" speed={100} opacity={0.15} top="40%" height="20%" />
      <FogLayer direction="left" speed={120} opacity={0.2} top="70%" height="30%" />

      {/* Clouds */}
      <Cloud size="large" style={{ top: '25%', left: '10%', animation: 'drift-right 90s linear infinite' }} />
      <Cloud size="medium" style={{ top: '35%', left: '60%', animation: 'drift-left 70s linear infinite' }} />
      <Cloud size="small" style={{ top: '20%', left: '40%', animation: 'drift-right 110s linear infinite' }} />
      <Cloud size="large" style={{ top: '45%', left: '75%', animation: 'drift-left 100s linear infinite' }} />

      {/* Particles */}
      <ParticleCanvas />

      {/* Bottom atmospheric gradient */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '30%',
        background: 'linear-gradient(to top, rgba(8, 11, 16, 0.8), transparent)',
        zIndex: 15,
        pointerEvents: 'none',
      }} />
    </div>
  );
};

export default MountainWorld;
