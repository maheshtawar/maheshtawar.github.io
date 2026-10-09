import { usePortfolio } from '../../context/PortfolioContext';

const Toast = () => {
  const { toastMessage } = usePortfolio();

  if (!toastMessage) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 10002,
        background: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(99, 102, 241, 0.4)',
        boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.5), 0 0 20px rgba(99, 102, 241, 0.3)',
        color: '#f8fafc',
        padding: '12px 20px',
        borderRadius: '12px',
        fontSize: '0.875rem',
        fontFamily: 'var(--font-mono)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        animation: 'slideUpFade 0.3s cubic-bezier(0.16, 1, 0.3, 1) both',
        pointerEvents: 'none',
      }}
    >
      <span style={{ color: 'var(--accent-light)', fontSize: '1rem' }}>✦</span>
      <span>{toastMessage}</span>
    </div>
  );
};

export default Toast;
