import { useEffect } from 'react';
import { PrimeReactProvider } from 'primereact/api';
import { personalInfo } from './data/profile';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Hero from './components/Sections/Hero';
import Skills from './components/Sections/Skills';
import Projects from './components/Sections/Projects';
import Experience from './components/Sections/Experience';
import Certificates from './components/Sections/Certificates';
import Contact from './components/Sections/Contact';
import ScrollAvatar from './components/UI/ScrollAvatar';
import BackgroundParticles from './components/UI/BackgroundParticles';

function App() {
  useEffect(() => {
    // Dynamic Title
    document.title = `${personalInfo.fullName} - Portfolio`;

    // Dynamic Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', personalInfo.bio);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = personalInfo.bio;
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <PrimeReactProvider>
      <div className="app-container">
        <BackgroundParticles />
        <Navbar />
        <ScrollAvatar />
        <main>
          <Hero />
          <Skills />
          <Projects />
          <Experience />
          <Certificates />
          <Contact />
        </main>
        <Footer />
      </div>
    </PrimeReactProvider>
  )
}

export default App
