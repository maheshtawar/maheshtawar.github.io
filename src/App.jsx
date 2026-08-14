import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { personalInfo } from './data/profile';
import LaptopIntro from './components/UI/LaptopIntro';
import MountainWorld from './components/World/MountainWorld';
import MountainNav from './components/UI/MountainNav';
import ScrollProgress from './components/UI/ScrollProgress';
import Hero from './components/Sections/Hero';
import Skills from './components/Sections/Skills';
import Experience from './components/Sections/Experience';
import Projects from './components/Sections/Projects';
import Contact from './components/Sections/Contact';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Dynamic document title
    document.title = `${personalInfo.fullName} — Java Backend Developer & Full Stack Engineer`;

    // Meta description
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = personalInfo.bio;

    // Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
    });

    // Sync Lenis with GSAP ticker
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="journey-container">
      {/* Fixed mountain background */}
      <MountainWorld />

      {/* Fixed UI overlays */}
      <MountainNav />
      <ScrollProgress />

      {/* Scrollable content */}
      <div className="journey-content">
        {/* Phase 1: Laptop Intro (scroll-driven, 400vh) */}
        <LaptopIntro />

        {/* Phase 2: Mountain world sections */}
        <div style={{ position: 'relative', zIndex: 15 }}>
          <Hero />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </div>

        {/* Footer */}
        <footer style={{
          position: 'relative',
          zIndex: 15,
          textAlign: 'center',
          padding: '2rem',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}>
          <p className="text-mono" style={{
            fontSize: '0.7rem',
            color: 'var(--mountain-blue)',
            letterSpacing: '0.1em',
          }}>
            © {new Date().getFullYear()} {personalInfo.fullName} · Built with passion
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
