
import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';

const BackgroundParticles = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        container.innerHTML = '';
        const particleCount = 20;

        // Create particles
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            // Random styling
            const size = anime.random(10, 50);
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.position = 'absolute';
            particle.style.top = `${anime.random(0, 100)}vh`;
            particle.style.left = `${anime.random(0, 100)}vw`;
            particle.style.background = i % 2 === 0 ? 'var(--primary-color)' : 'var(--secondary-color)';
            particle.style.borderRadius = i % 3 === 0 ? '50%' : '4px'; // Mix of circles and squares
            particle.style.opacity = anime.random(0.1, 0.3); // Low opacity

            container.appendChild(particle);
        }

        // Animate particles
        anime({
            targets: '.particle',
            translateX: () => anime.random(-200, 200),
            translateY: () => anime.random(-200, 200),
            scale: [
                { value: [0.5, 1.2], duration: 4000 },
                { value: 1, duration: 4000 }
            ],
            opacity: {
                value: [0.1, 0.3],
                duration: 2000,
                easing: 'linear'
            },
            duration: () => anime.random(10000, 20000), // Slow movement
            delay: () => anime.random(0, 2000),
            easing: 'easeInOutQuad',
            loop: true,
            direction: 'alternate'
        });

    }, []);

    return (
        <div ref={containerRef} style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            pointerEvents: 'none',
            overflow: 'hidden'
        }}></div>
    );
};

export default BackgroundParticles;
