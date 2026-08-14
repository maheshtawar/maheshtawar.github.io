import React, { useEffect, useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, ContactShadows, Text } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ============================================
   KEYBOARD LAYOUT
   ============================================ */
const KEYBOARD_LAYOUT = [
  [{ w: 1, l: 'esc' }, { w: 1, l: 'F1' }, { w: 1, l: 'F2' }, { w: 1, l: 'F3' }, { w: 1, l: 'F4' }, { w: 1, l: 'F5' }, { w: 1, l: 'F6' }, { w: 1, l: 'F7' }, { w: 1, l: 'F8' }, { w: 1, l: 'F9' }, { w: 1, l: 'F10' }, { w: 1, l: 'F11' }, { w: 1, l: 'F12' }, { w: 2, l: 'pwr' }],
  [{ w: 1, l: '~' }, { w: 1, l: '1' }, { w: 1, l: '2' }, { w: 1, l: '3' }, { w: 1, l: '4' }, { w: 1, l: '5' }, { w: 1, l: '6' }, { w: 1, l: '7' }, { w: 1, l: '8' }, { w: 1, l: '9' }, { w: 1, l: '0' }, { w: 1, l: '-' }, { w: 1, l: '=' }, { w: 2, l: 'del' }],
  [{ w: 1.5, l: 'tab' }, { w: 1, l: 'Q' }, { w: 1, l: 'W' }, { w: 1, l: 'E' }, { w: 1, l: 'R' }, { w: 1, l: 'T' }, { w: 1, l: 'Y' }, { w: 1, l: 'U' }, { w: 1, l: 'I' }, { w: 1, l: 'O' }, { w: 1, l: 'P' }, { w: 1, l: '[' }, { w: 1, l: ']' }, { w: 1.5, l: '\\' }],
  [{ w: 1.8, l: 'caps' }, { w: 1, l: 'A' }, { w: 1, l: 'S' }, { w: 1, l: 'D' }, { w: 1, l: 'F' }, { w: 1, l: 'G' }, { w: 1, l: 'H' }, { w: 1, l: 'J' }, { w: 1, l: 'K' }, { w: 1, l: 'L' }, { w: 1, l: ';' }, { w: 1, l: "'" }, { w: 2.2, l: 'enter' }],
  [{ w: 2.3, l: 'shift' }, { w: 1, l: 'Z' }, { w: 1, l: 'X' }, { w: 1, l: 'C' }, { w: 1, l: 'V' }, { w: 1, l: 'B' }, { w: 1, l: 'N' }, { w: 1, l: 'M' }, { w: 1, l: ',' }, { w: 1, l: '.' }, { w: 1, l: '/' }, { w: 2.7, l: 'shift' }],
  [{ w: 1, l: 'fn' }, { w: 1, l: 'ctrl' }, { w: 1, l: 'opt' }, { w: 1.2, l: 'cmd' }, { w: 5.6, l: '' }, { w: 1.2, l: 'cmd' }, { w: 1, l: 'opt' }, { w: 1, l: '◀' }, { w: 1, l: '▼' }, { w: 1, l: '▶' }],
];

/* ============================================
   Keyboard Component — Ultra-Slim Chiclet Design
   ============================================ */
const Keyboard = () => {
  const keys = [];
  const rows = KEYBOARD_LAYOUT.length;
  const baseKeySize = 0.28;
  const gap = 0.035;
  const step = baseKeySize + gap;
  const totalWidth = 15 * step - gap;
  const startX = -totalWidth / 2;
  const startZ = -(rows * step) / 2 + step / 2;

  KEYBOARD_LAYOUT.forEach((row, r) => {
    let currentX = startX;
    row.forEach((keyDef, c) => {
      const realWidth = keyDef.w * baseKeySize + (keyDef.w - 1) * gap;
      let h = baseKeySize;
      let zOffset = 0;
      if (r === 0) { h = baseKeySize * 0.55; zOffset = -baseKeySize * 0.2; }
      const centerX = currentX + realWidth / 2;

      keys.push(
        <group key={`${r}-${c}`} position={[centerX, 0.003, startZ + r * step + zOffset]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[realWidth, 0.006, h]} />
            <meshStandardMaterial color="#0f172a" roughness={0.6} metalness={0.2} />
          </mesh>
          {keyDef.l && (
            <Text
              position={[-realWidth / 2 + 0.03, 0.004, -h / 2 + 0.05]}
              rotation={[-Math.PI / 2, 0, 0]}
              fontSize={keyDef.w > 1 || r === 0 ? 0.045 : 0.07}
              color="#94a3b8"
              anchorX="left"
              anchorY="top"
            >
              {keyDef.l}
            </Text>
          )}
        </group>
      );
      currentX += realWidth + gap;
    });
  });

  return (
    <group position={[0, 0.001, -0.3]}>
      {/* Keyboard recessed well */}
      <mesh position={[0, -0.001, 0]} receiveShadow>
        <boxGeometry args={[4.9, 0.002, 2.05]} />
        <meshStandardMaterial color="#020617" roughness={0.8} metalness={0.4} />
      </mesh>
      {keys}
    </group>
  );
};

/* ============================================
   Google Search Sequence (Pure DOM Component)
   ============================================ */
const GoogleSequence = ({ googleRefs }) => {
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
      position: 'relative', fontFamily: 'Arial, sans-serif',
    }}>
      {/* Browser Toolbar */}
      <div style={{
        height: '50px', backgroundColor: '#111827',
        display: 'flex', alignItems: 'center',
        padding: '0 20px', gap: '12px',
        borderBottom: '2px solid #1f2937', zIndex: 50,
      }}>
        <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
        <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#eab308' }} />
        <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
        <div style={{
          marginLeft: '20px', flex: 1, backgroundColor: '#030712',
          borderRadius: '8px', height: '32px',
          display: 'flex', alignItems: 'center', padding: '0 16px',
          fontSize: '14px', border: '1px solid #1f2937',
        }}>
          <span style={{ color: '#6b7280', marginRight: '8px' }}>https://</span>
          <span ref={(el) => { if (googleRefs) googleRefs.url = el; }} style={{ color: '#fff' }}>google.com</span>
        </div>
      </div>

      <div style={{ flex: 1, position: 'relative' }}>
        {/* Google Home */}
        <div ref={(el) => { if (googleRefs) googleRefs.home = el; }} style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          backgroundColor: '#fff', opacity: 1, zIndex: 5,
        }}>
          <div style={{ marginTop: '70px', fontSize: '56px', fontWeight: 'bold', letterSpacing: '-2px' }}>
            <span style={{ color: '#4285F4' }}>G</span>
            <span style={{ color: '#EA4335' }}>o</span>
            <span style={{ color: '#FBBC05' }}>o</span>
            <span style={{ color: '#4285F4' }}>g</span>
            <span style={{ color: '#34A853' }}>l</span>
            <span style={{ color: '#EA4335' }}>e</span>
          </div>
          <div style={{
            marginTop: '24px', width: '440px', height: '44px',
            borderRadius: '22px', border: '1px solid #dfe1e5',
            display: 'flex', alignItems: 'center', padding: '0 18px',
            boxShadow: '0 1px 6px rgba(32,33,36,.28)',
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: '20px', fill: '#9aa0a6' }}>
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
            <span style={{ marginLeft: '14px', fontSize: '16px', color: '#202124', display: 'flex', alignItems: 'center' }}>
              <span ref={(el) => { if (googleRefs) googleRefs.type = el; }}></span>
              <span ref={(el) => { if (googleRefs) googleRefs.blink = el; }} style={{
                display: 'inline-block', width: '2px', height: '20px',
                backgroundColor: '#202124', marginLeft: '3px',
                animation: 'blink 1s step-end infinite',
              }} />
            </span>
          </div>
        </div>

        {/* Search Results */}
        <div ref={(el) => { if (googleRefs) googleRefs.results = el; }} style={{
          position: 'absolute', inset: 0, backgroundColor: '#fff', zIndex: 10, opacity: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '12px 18px', borderBottom: '1px solid #ebebeb' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', letterSpacing: '-1px', marginRight: '20px' }}>
              <span style={{ color: '#4285F4' }}>G</span><span style={{ color: '#EA4335' }}>o</span>
              <span style={{ color: '#FBBC05' }}>o</span><span style={{ color: '#4285F4' }}>g</span>
              <span style={{ color: '#34A853' }}>l</span><span style={{ color: '#EA4335' }}>e</span>
            </div>
            <div style={{
              width: '420px', height: '36px', borderRadius: '18px',
              border: '1px solid #dfe1e5', display: 'flex', alignItems: 'center',
              padding: '0 14px', boxShadow: '0 1px 6px rgba(32,33,36,.28)',
            }}>
              <span style={{ fontSize: '14px', color: '#202124' }}>Mahesh Tawar</span>
            </div>
          </div>
          <div style={{ padding: '16px 50px' }}>
            <div 
              style={{ 
                marginBottom: '16px', 
                cursor: 'pointer',
                padding: '10px 14px',
                borderRadius: '8px',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f8fafc'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              onClick={() => {
                const el = document.getElementById('hero');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <div style={{
                  width: '24px', height: '24px', backgroundColor: '#e2e8f0',
                  borderRadius: '50%', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '12px', fontWeight: 'bold', color: '#3b82f6'
                }}>M</div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '500', color: '#202124' }}>Mahesh Tawar</div>
                  <div style={{ fontSize: '11px', color: '#4d5156' }}>https://maheshtawar.github.io</div>
                </div>
              </div>
              <div style={{ fontSize: '17px', color: '#1a0dab', textDecoration: 'underline', fontWeight: '500', marginBottom: '4px' }}>
                Mahesh Tawar — Java Backend Developer & Full Stack Engineer
              </div>
              <div style={{ fontSize: '13px', color: '#4d5156', lineHeight: '1.4', maxWidth: '540px' }}>
                Senior Project Associate & Full Stack Engineer with expertise in Java 17, Spring Boot, React, and building high-scale production systems.
              </div>
            </div>
            
            <div style={{ padding: '4px 14px' }}>
              <div style={{ fontSize: '15px', color: '#1a0dab' }}>Mahesh Tawar - LinkedIn</div>
              <div style={{ fontSize: '12px', color: '#4d5156', marginTop: '2px', maxWidth: '540px' }}>
                View Mahesh Tawar's professional profile, production achievements, and certifications...
              </div>
            </div>
          </div>
        </div>

        {/* Website iframe */}
        <iframe
          ref={(el) => { if (googleRefs) googleRefs.iframe = el; }}
          src="?skipIntro=true"
          title="Portfolio Preview"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            border: 'none', zIndex: 20,
            backgroundColor: '#050505', opacity: 0,
            transition: 'opacity 0.4s ease',
          }}
          scrolling="no"
        />

        {/* Mouse Cursor */}
        <div ref={(el) => { if (googleRefs) googleRefs.cursor = el; }} style={{
          position: 'absolute', left: 0, top: 0,
          width: '28px', height: '28px', zIndex: 999,
          pointerEvents: 'none', opacity: 0,
          transform: 'translate(460px, 460px)',
          transition: 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)',
        }}>
          <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>
            <path d="M6 6L14.5 28L18.5 19L27 15L6 6Z" fill="#1e293b" stroke="#ffffff" strokeWidth="2" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
};

/* ============================================
   3D Scene — Scroll-Driven
   ============================================ */
const Scene = ({ scrollProgress }) => {
  const groupRef = useRef();
  const lidRef = useRef();
  const wrapperDomRef = useRef();
  const [screenMounted, setScreenMounted] = useState(false);
  const screenMountedRef = useRef(false);
  const googleRefs = useRef({
    home: null,
    results: null,
    iframe: null,
    cursor: null,
    url: null,
    type: null,
    blink: null,
  }).current;

  useFrame((state) => {
    const p = scrollProgress.current; // 0..1 across the laptop section

    // ---- Camera ----
    // Phase 1 (p 0→0.3): Camera approaches laptop from far away, orbiting slightly
    // Phase 2 (p 0.3→0.5): Camera swings to front, centers onto screen
    // Phase 3 (p 0.5→0.85): Hold on screen while Google sequence plays
    // Phase 4 (p 0.85→1): Camera flies through screen

    const lerp = (a, b, t) => a + (b - a) * Math.max(0, Math.min(1, t));

    let camX, camY, camZ, lookY;

    if (p < 0.3) {
      // Approach
      const t = p / 0.3;
      camX = lerp(3.2, 0, t);
      camY = lerp(4.5, 2.3, t);
      camZ = lerp(10.5, 5.2, t);
      lookY = lerp(0.4, 1.7, t);
    } else if (p < 0.5) {
      // Swing to front and zoom directly into screen center
      const t = (p - 0.3) / 0.2;
      camX = lerp(0, 0, t);
      camY = lerp(2.3, 1.9, t);
      camZ = lerp(5.2, 2.3, t);
      lookY = lerp(1.7, 1.9, t);
    } else if (p < 0.85) {
      // Hold on screen — Google plays inside laptop bezel
      camX = 0;
      camY = 1.9;
      camZ = 2.3;
      lookY = 1.9;
    } else {
      // Fly through into the mountain portfolio
      const t = (p - 0.85) / 0.15;
      camX = 0;
      camY = 1.9;
      camZ = lerp(2.3, -2.0, t);
      lookY = 1.9;
    }

    state.camera.position.set(camX, camY, camZ);
    state.camera.lookAt(0, lookY, -1.9);

    // ---- Laptop group rotation ----
    if (groupRef.current) {
      const rotY = p < 0.3 ? lerp(-Math.PI / 5, 0, p / 0.3) : 0;
      const rotX = p < 0.3 ? lerp(0.08, 0.12, p / 0.3) : 0.12;
      groupRef.current.rotation.y = rotY;
      groupRef.current.rotation.x = rotX;
    }

    // ---- Lid opening ----
    if (lidRef.current) {
      const lidT = p < 0.25 ? p / 0.25 : 1;
      const lidAngle = lerp(Math.PI / 2, -0.12, lidT);
      lidRef.current.rotation.x = lidAngle;
    }

    // ---- Screen mounting & opacity ----
    if (p < 0.22) {
      if (screenMountedRef.current) {
        screenMountedRef.current = false;
        setScreenMounted(false);
      }
    } else {
      if (!screenMountedRef.current) {
        screenMountedRef.current = true;
        setScreenMounted(true);
      }
      if (wrapperDomRef.current) {
        const screenOpacity = Math.min(1, (p - 0.22) / 0.12);
        const screenBlur = p > 0.88 ? (p - 0.88) / 0.12 * 12 : 0;
        wrapperDomRef.current.style.opacity = screenOpacity;
        wrapperDomRef.current.style.filter = `blur(${screenBlur}px)`;
      }
    }

    // ---- Google sequence progress ----
    // Maps p(0.45 → 0.85) to google progress (0 → 1)
    const gp = p < 0.45 ? 0 : Math.min(1, (p - 0.45) / 0.4);

    // Phase 1: Type "Mahesh Tawar" (gp: 0 → 0.35)
    const typeProgress = Math.min(1, gp / 0.35);
    const chars = Math.floor(typeProgress * 12);
    if (googleRefs.type) {
      googleRefs.type.textContent = 'Mahesh Tawar'.substring(0, chars);
    }
    if (googleRefs.blink) {
      googleRefs.blink.style.opacity = gp < 0.35 ? '1' : '0';
    }

    // Phase 2: Show results (gp: 0.35 → 0.5)
    if (googleRefs.home) {
      googleRefs.home.style.opacity = gp < 0.35 ? '1' : '0';
      googleRefs.home.style.pointerEvents = gp < 0.35 ? 'auto' : 'none';
    }
    if (googleRefs.results) {
      googleRefs.results.style.opacity = gp >= 0.35 && gp < 0.72 ? '1' : '0';
    }

    // Phase 3: Move cursor to result link and simulate click (gp: 0.48 → 0.72)
    if (googleRefs.cursor) {
      const cursorOpacity = gp > 0.15 && gp < 0.8 ? 1 : 0;
      let cursorX = 420;
      let cursorY = 260;
      if (gp >= 0.48 && gp < 0.72) {
        const ct = (gp - 0.48) / 0.18;
        cursorX = lerp(420, 160, Math.min(1, ct * 1.5));
        cursorY = lerp(260, 140, Math.min(1, ct * 1.5));
      }
      googleRefs.cursor.style.opacity = cursorOpacity;
      googleRefs.cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    }

    // Phase 4: Show website inside laptop screen (gp: 0.72 → 1)
    if (googleRefs.iframe) {
      googleRefs.iframe.style.opacity = gp >= 0.72 ? '1' : '0';
    }
    if (googleRefs.url) {
      googleRefs.url.textContent = gp >= 0.72 ? 'maheshtawar.github.io' : 'google.com';
    }
  });

  return (
    <>
      {/* Pure Neutral Studio Lighting — Zero Color Tint Artifacts */}
      <hemisphereLight intensity={0.7} color="#ffffff" groundColor="#334155" />
      <ambientLight intensity={0.8} />
      <directionalLight position={[8, 12, 6]} intensity={1.8} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-8, 8, -6]} intensity={1.0} color="#f1f5f9" />
      <pointLight position={[0, 4, 3]} intensity={1.2} color="#ffffff" distance={10} />
      <pointLight position={[0, 2, -4]} intensity={0.6} color="#ffffff" distance={8} />

      <group ref={groupRef}>
        {/* Base: 5.6 x 0.038 x 3.8 — Ultra-Slim Precision Chassis */}
        <mesh position={[0, -0.019, 0]} receiveShadow>
          <boxGeometry args={[5.6, 0.038, 3.8]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.92} roughness={0.14} />
        </mesh>

        <Keyboard />

        {/* Trackpad — Flush Precision Glass */}
        <mesh position={[0, 0.001, 1.05]} receiveShadow>
          <boxGeometry args={[2.0, 0.001, 1.1]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.75} roughness={0.35} />
        </mesh>

        {/* Front edge notch */}
        <mesh position={[0, 0.001, 1.88]}>
          <boxGeometry args={[0.7, 0.005, 0.05]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.5} />
        </mesh>

        {/* Hinge at z = -1.9 */}
        <mesh position={[0, 0, -1.9]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
          <cylinderGeometry args={[0.028, 0.028, 5.0, 32]} />
          <meshStandardMaterial color="#0f172a" metalness={0.4} roughness={0.7} />
        </mesh>

        {/* Lid at z = -1.9 */}
        <group ref={lidRef} position={[0, 0.012, -1.9]}>
          {/* Lid body: Razor-thin 5.6 x 3.8 x 0.024 */}
          <mesh position={[0, 1.9, 0]} castShadow>
            <boxGeometry args={[5.6, 3.8, 0.024]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.92} roughness={0.14} />
          </mesh>

          {/* Outer Lid Apple-Style Geometric Chrome "M" Inlay (Back of Screen) */}
          <group position={[0, 1.9, -0.014]} rotation={[0, Math.PI, 0]}>
            <group scale={0.75}>
              {/* Left pillar */}
              <mesh position={[-0.34, 0, 0.002]}>
                <boxGeometry args={[0.1, 0.55, 0.004]} />
                <meshStandardMaterial color="#ffffff" metalness={0.98} roughness={0.05} />
              </mesh>
              {/* Right pillar */}
              <mesh position={[0.34, 0, 0.002]}>
                <boxGeometry args={[0.1, 0.55, 0.004]} />
                <meshStandardMaterial color="#ffffff" metalness={0.98} roughness={0.05} />
              </mesh>
              {/* Left diagonal */}
              <mesh position={[-0.16, 0.07, 0.002]} rotation={[0, 0, -0.48]}>
                <boxGeometry args={[0.09, 0.44, 0.004]} />
                <meshStandardMaterial color="#ffffff" metalness={0.98} roughness={0.05} />
              </mesh>
              {/* Right diagonal */}
              <mesh position={[0.16, 0.07, 0.002]} rotation={[0, 0, 0.48]}>
                <boxGeometry args={[0.09, 0.44, 0.004]} />
                <meshStandardMaterial color="#ffffff" metalness={0.98} roughness={0.05} />
              </mesh>
            </group>
          </group>

          {/* Screen bezel */}
          <mesh position={[0, 1.94, 0.013]}>
            <boxGeometry args={[5.3, 3.5, 0.004]} />
            <meshStandardMaterial color="#0a0a0a" roughness={0.1} />
          </mesh>

          {/* Screen Chin Branding */}
          <Text
            position={[0, 0.1, 0.014]}
            fontSize={0.075}
            color="#64748b"
            letterSpacing={0.18}
            anchorX="center"
            anchorY="middle"
          >
            MAHESH TAWAR
          </Text>

          {/* Screen content — Sized cleanly and mounted ONLY when lid is open */}
          {screenMounted && (
            <Html transform position={[0, 1.95, 0.015]} rotation={[0, 0, 0]} distanceFactor={2.35}>
              <div
                ref={wrapperDomRef}
                style={{
                  width: '840px',
                  height: '530px',
                  backgroundColor: '#030712',
                  opacity: 0,
                  pointerEvents: 'none',
                  overflow: 'hidden',
                  borderRadius: '6px',
                }}
              >
                <GoogleSequence googleRefs={googleRefs} />
              </div>
            </Html>
          )}
        </group>
      </group>

      <ContactShadows position={[0, -0.08, 0]} opacity={0.45} scale={18} blur={2.2} far={3.5} />
    </>
  );
};

const LaptopIntro = () => {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const hintRef = useRef(null);
  const scrollProgress = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      pin: false,
      onUpdate: (self) => {
        scrollProgress.current = self.progress;

        // Fade scroll hint early
        if (hintRef.current) {
          const hintOpacity = Math.max(0, 0.6 - self.progress * 6);
          hintRef.current.style.opacity = hintOpacity;
        }

        // Fade sticky container during fly-through (0.85 -> 1.0)
        if (stickyRef.current) {
          if (self.progress > 0.82) {
            const fade = 1 - (self.progress - 0.82) / 0.18;
            stickyRef.current.style.opacity = Math.max(0, fade);
          } else {
            stickyRef.current.style.opacity = 1;
          }
        }
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        height: '400vh', /* Scroll distance for the laptop sequence */
        position: 'relative',
      }}
    >
      <div
        ref={stickyRef}
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          height: '100vh',
          backgroundColor: '#050505',
          transition: 'opacity 0.1s linear',
        }}
      >
        <Canvas shadows={{ type: THREE.PCFShadowMap }} camera={{ position: [3, 5, 12], fov: 45 }}>
          <Suspense fallback={null}>
            <Scene scrollProgress={scrollProgress} />
          </Suspense>
        </Canvas>

        {/* Scroll hint at the bottom */}
        <div
          ref={hintRef}
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            opacity: 0.6,
            animation: 'float 3s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        >
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#A8B4BD',
          }}>
            Scroll to begin
          </span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 4L10 16M10 16L5 11M10 16L15 11" stroke="#A8B4BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default LaptopIntro;
