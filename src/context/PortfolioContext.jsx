import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { personalInfo } from '../data/profile';

const PortfolioContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

export const PortfolioProvider = ({ children }) => {
  const [selectedTech, setSelectedTech] = useState(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [activeSection, setActiveSection] = useState('hero');

  const showToast = useCallback((msg, duration = 2800) => {
    setToastMessage(msg);
    const timer = setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, duration);
    return () => clearTimeout(timer);
  }, []);

  const copyEmail = useCallback(() => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(personalInfo.email).then(() => {
        showToast('✓ Email copied to clipboard: ' + personalInfo.email);
      }).catch(() => {
        showToast('Email: ' + personalInfo.email);
      });
    } else {
      showToast('Email: ' + personalInfo.email);
    }
  }, [showToast]);

  const selectTech = useCallback((tech) => {
    setSelectedTech((prev) => {
      const next = prev === tech ? null : tech;
      if (next) {
        showToast(`⚡ Highlighted all systems & projects using ${next}`);
      }
      return next;
    });
  }, [showToast]);

  const clearTechFilter = useCallback(() => {
    setSelectedTech(null);
  }, []);

  // Global keyboard shortcuts (Cmd+K, Ctrl+K, '/')
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept if user is typing in an input or textarea
      const targetTag = e.target.tagName?.toLowerCase();
      const isInput = targetTag === 'input' || targetTag === 'textarea' || e.target.isContentEditable;

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
        return;
      }

      if (e.key === '/' && !isInput) {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
        return;
      }

      if (e.key === 'Escape' && isCommandPaletteOpen) {
        setIsCommandPaletteOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen]);

  const value = {
    selectedTech,
    selectTech,
    clearTechFilter,
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    toastMessage,
    showToast,
    copyEmail,
    activeSection,
    setActiveSection,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};

export default PortfolioContext;
