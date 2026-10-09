import { useEffect, useRef } from 'react';

/**
 * Custom hook for IntersectionObserver-based reveal animations.
 * Returns a ref to attach to the element.
 */
export const useReveal = (options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check for reduced motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      el.classList.add('visible');
      return;
    }

    const threshold = options.threshold || 0.1;
    const rootMargin = options.rootMargin || '0px 0px -40px 0px';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, [options.threshold, options.rootMargin]);

  return ref;
};

/**
 * Custom hook for tracking scroll progress (0 to 1).
 */
export const useScrollProgress = () => {
  const ref = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      ref.current = docHeight > 0 ? scrollTop / docHeight : 0;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return ref;
};

/**
 * Custom hook for card mouse-follow glow effect.
 */
export const useCardGlow = () => {
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  };

  return { onMouseMove: handleMouseMove };
};
