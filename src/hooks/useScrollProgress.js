import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Master scroll progress hook.
 * Returns a ref to a mutable object { progress: 0..1 } that updates every frame.
 * Components can read scrollRef.current.progress in useFrame / rAF loops.
 */
export function useScrollProgress() {
  const scrollRef = useRef({ progress: 0 });

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        scrollRef.current.progress = self.progress;
      },
    });

    return () => trigger.kill();
  }, []);

  return scrollRef;
}

/**
 * Pin an element and scrub an animation timeline across a scroll range.
 * 
 * @param {Object} opts
 * @param {string} opts.trigger - CSS selector for trigger element
 * @param {string} opts.start - ScrollTrigger start position  
 * @param {string} opts.end - ScrollTrigger end position
 * @param {boolean} opts.pin - Whether to pin the trigger element
 * @param {Function} opts.onUpdate - Callback with progress (0..1)
 */
export function useScrollSection(opts) {
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!triggerRef.current) return;

    const st = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: opts.start || 'top top',
      end: opts.end || 'bottom top',
      pin: opts.pin || false,
      scrub: opts.scrub ?? true,
      onUpdate: (self) => {
        if (opts.onUpdate) opts.onUpdate(self.progress);
      },
    });

    return () => st.kill();
  }, []);

  return triggerRef;
}

/**
 * Reveal elements when they enter the viewport.
 */
export function useScrollReveal(opts = {}) {
  const elementRef = useRef(null);

  useEffect(() => {
    if (!elementRef.current) return;

    gsap.fromTo(
      elementRef.current,
      { opacity: 0, y: opts.y ?? 60 },
      {
        opacity: 1,
        y: 0,
        duration: opts.duration ?? 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: elementRef.current,
          start: opts.start || 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return elementRef;
}

export default useScrollProgress;
