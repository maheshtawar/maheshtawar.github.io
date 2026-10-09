import { useState, useEffect } from 'react';

const STEPS = [
  '01 // INITIALIZING RUNTIME & ENV',
  '02 // CONNECTING BACKEND SERVICES',
  '03 // HYDRATING CASE STUDIES',
  '04 // SYSTEM READY',
];

const QuickLoader = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // If user already visited in this session, skip immediately
    const hasLoaded = sessionStorage.getItem('portfolio_booted');
    if (hasLoaded) {
      onComplete?.();
      return;
    }

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            sessionStorage.setItem('portfolio_booted', 'true');
            setTimeout(() => onComplete?.(), 300);
          }, 180);
          return prev;
        }
      });
    }, 180);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    sessionStorage.setItem('portfolio_booted', 'true');
    setIsDone(true);
    setTimeout(() => onComplete?.(), 100);
  };

  if (sessionStorage.getItem('portfolio_booted')) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100000,
        background: '#070a12',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isDone ? 0 : 1,
        pointerEvents: isDone ? 'none' : 'auto',
        transition: 'opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        userSelect: 'none',
      }}
    >
      <div style={{ maxWidth: '380px', width: '90%', textAlign: 'left' }}>
        {/* Logo / Tag */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <span className="text-mono" style={{ fontSize: '0.85rem', color: 'var(--accent-light)', fontWeight: 700 }}>
            MAHESH.DEV
          </span>
          <button
            onClick={handleSkip}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer',
            }}
          >
            [ESC to skip]
          </button>
        </div>

        {/* Progress bar line */}
        <div
          style={{
            height: '2px',
            width: '100%',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '2px',
            overflow: 'hidden',
            marginBottom: '16px',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${((currentStep + 1) / STEPS.length) * 100}%`,
              background: 'linear-gradient(90deg, var(--accent), #a855f7)',
              transition: 'width 0.18s ease-out',
            }}
          />
        </div>

        {/* Current status line */}
        <div
          className="text-mono"
          style={{
            fontSize: '0.75rem',
            color: '#94a3b8',
            letterSpacing: '0.06em',
          }}
        >
          {STEPS[currentStep]}
        </div>
      </div>
    </div>
  );
};

export default QuickLoader;
