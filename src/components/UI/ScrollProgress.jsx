import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        setProgress(self.progress);
        setVisible(self.progress > 0.05 && self.progress < 0.98);
      },
    });
  }, []);

  return (
    <div
      className="scroll-progress"
      style={{
        opacity: visible ? 0.7 : 0,
        transition: 'opacity 0.5s var(--ease-out)',
        pointerEvents: 'none',
      }}
    >
      <span className="scroll-progress-label">Base</span>

      <div className="scroll-progress-bar">
        <div
          className="scroll-progress-fill"
          style={{ height: `${progress * 100}%` }}
        />
      </div>

      <span className="scroll-progress-label">Summit</span>
    </div>
  );
};

export default ScrollProgress;
