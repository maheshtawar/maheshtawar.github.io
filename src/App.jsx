import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { personalInfo } from './data/profile';
import { ThemeProvider } from './context/ThemeContext';
import { PortfolioProvider } from './context/PortfolioContext';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Hero from './components/Sections/Hero';
import About from './components/Sections/About';
import Skills from './components/Sections/Skills';
import Experience from './components/Sections/Experience';
import HowIBuild from './components/Sections/HowIBuild';
import Projects from './components/Sections/Projects';
import Certifications from './components/Sections/Certifications';
import Terminal from './components/Sections/Terminal';
import Contact from './components/Sections/Contact';
import ScrollProgress from './components/UI/ScrollProgress';
import CustomCursor from './components/UI/CustomCursor';
import BackgroundParticles from './components/UI/BackgroundParticles';
import CommandPalette from './components/UI/CommandPalette';
import Toast from './components/UI/Toast';
import QuickLoader from './components/UI/QuickLoader';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

function PortfolioApp() {
  useEffect(() => {
    // Dynamic document title
    document.title = `${personalInfo.fullName} — Java Backend Developer & Secure Systems Architect`;

    // Dynamic meta description
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = personalInfo.bio;

    // Respect user's reduced-motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Smooth scroll with Lenis
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    const tickHandler = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickHandler);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickHandler);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="portfolio-wrapper" style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Short Developer Boot Loader */}
      <QuickLoader />

      {/* Global Interactive Command Center (⌘K / /) */}
      <CommandPalette />

      {/* Floating Notification Toast */}
      <Toast />

      {/* Reading Progress Indicator */}
      <ScrollProgress />

      {/* Desktop Magnetic & Contextual Custom Cursor */}
      <CustomCursor />

      {/* Background Interactive Particle Canvas */}
      <BackgroundParticles />

      {/* Ambient Radial Grid Overlay */}
      <div className="bg-grid" aria-hidden="true" />

      {/* Frosted Glass Sticky Navbar */}
      <Navbar />

      {/* Narrative Section Storyline */}
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 'var(--nav-height)' }}>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <HowIBuild />
        <Projects />
        <Certifications />
        <Terminal />
        <Contact />
      </main>

      {/* Modern Footer */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <PortfolioProvider>
        <PortfolioApp />
      </PortfolioProvider>
    </ThemeProvider>
  );
}

export default App;
