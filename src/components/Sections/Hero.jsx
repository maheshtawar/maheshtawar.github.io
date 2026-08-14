import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const taglineRef = useRef(null);
  const lineRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'center center',
          scrub: 0.6,
        },
      });

      tl.fromTo(badgeRef.current,
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6 }
      )
      .fromTo(titleRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1 },
        '-=0.3'
      )
      .fromTo(lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6 },
        '-=0.5'
      )
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.3'
      )
      .fromTo(taglineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.3'
      )
      .fromTo(statsRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.3'
      )
      .fromTo(ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.4'
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="journey-section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        padding: 'clamp(3rem, 6vw, 6rem) 2rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.4rem',
          maxWidth: '960px',
          width: '100%',
        }}
      >
        {/* Elevation Badge */}
        <div
          ref={badgeRef}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 18px',
            borderRadius: '24px',
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            border: '1px solid rgba(59, 130, 246, 0.35)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.15)',
            opacity: 0,
          }}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#3b82f6', boxShadow: '0 0 10px #3b82f6' }} />
          <span className="text-label" style={{ color: '#93c5fd', fontSize: '0.78rem', letterSpacing: '0.18em' }}>
            BASE CAMP · ELEVATION 1,200M
          </span>
        </div>

        {/* Main Display Title */}
        <h1
          ref={titleRef}
          className="heading-display"
          style={{
            fontSize: 'clamp(3.5rem, 10vw, 8.5rem)',
            lineHeight: 0.92,
            color: 'transparent',
            WebkitTextStroke: '2px rgba(255, 255, 255, 0.35)',
            background: 'linear-gradient(180deg, #ffffff 0%, rgba(191, 219, 254, 0.9) 45%, rgba(59, 130, 246, 0.65) 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            opacity: 0,
            filter: 'drop-shadow(0 15px 35px rgba(0,0,0,0.6))',
            margin: '0.2rem 0',
          }}
        >
          MAHESH
          <br />
          TAWAR
        </h1>

        {/* Accent Divider Line */}
        <div
          ref={lineRef}
          style={{
            width: '160px',
            height: '3px',
            background: 'linear-gradient(90deg, transparent, #3b82f6, #60a5fa, transparent)',
            borderRadius: '2px',
            transformOrigin: 'center',
            transform: 'scaleX(0)',
            boxShadow: '0 0 14px rgba(59, 130, 246, 0.7)',
          }}
        />

        {/* Subtitle Roles */}
        <div
          ref={subtitleRef}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            fontSize: 'clamp(0.85rem, 1.5vw, 1.15rem)',
            fontFamily: 'var(--font-mono)',
            fontWeight: 500,
            letterSpacing: '0.08em',
            color: '#cbd5e1',
            opacity: 0,
          }}
        >
          <span>Senior Project Associate</span>
          <span style={{ color: '#3b82f6' }}>•</span>
          <span>Java Backend Specialist</span>
          <span style={{ color: '#3b82f6' }}>•</span>
          <span>Full Stack Developer</span>
        </div>

        {/* Tagline */}
        <p
          ref={taglineRef}
          style={{
            maxWidth: '560px',
            fontSize: 'clamp(0.95rem, 1.3vw, 1.15rem)',
            color: '#94a3b8',
            lineHeight: 1.65,
            opacity: 0,
          }}
        >
          Engineering high-scale distributed backend services, reactive user interfaces, and mission-critical cloud solutions.
        </p>

        {/* Stats Grid */}
        <div
          ref={statsRef}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 'clamp(1.8rem, 4vw, 3.5rem)',
            marginTop: '1.5rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            width: '100%',
            opacity: 0,
          }}
        >
          {[
            { value: '2+', label: 'Years Exp' },
            { value: '15+', label: 'Production Apps' },
            { value: '6+', label: 'Certifications' },
            { value: '50K+', label: 'Active Users' },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  color: '#60a5fa',
                  lineHeight: 1,
                  textShadow: '0 0 16px rgba(96, 165, 250, 0.45)',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#64748b',
                  marginTop: '0.35rem',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Buttons */}
        <div
          ref={ctaRef}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1rem',
            marginTop: '1.2rem',
            opacity: 0,
          }}
        >
          <a
            href="#skills"
            className="glow-button"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('skills');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              padding: '12px 28px',
              fontSize: '0.88rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textDecoration: 'none',
              borderRadius: '30px',
              color: '#ffffff',
              backgroundColor: 'rgba(59, 130, 246, 0.2)',
              border: '1px solid rgba(59, 130, 246, 0.5)',
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#3b82f6';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Explore Skills & Tools ↓
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              padding: '12px 28px',
              fontSize: '0.88rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textDecoration: 'none',
              borderRadius: '30px',
              color: '#cbd5e1',
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.6)';
              e.currentTarget.style.color = '#cbd5e1';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Reach Summit (Contact) ⚡
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
