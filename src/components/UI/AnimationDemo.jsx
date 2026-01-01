
import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';

const AnimationDemo = () => {
    const gridRef = useRef(null);
    const svgRef = useRef(null);

    useEffect(() => {
        // --- 1. Function Based Values & Staggering (Grid) ---
        // Create 10x5 grid
        const gridEl = gridRef.current;
        const columns = 10;
        const rows = 5;
        const total = columns * rows;

        gridEl.innerHTML = '';
        for (let i = 0; i < total; i++) {
            const div = document.createElement('div');
            div.classList.add('grid-item');
            div.style.cssText = `
                width: 20px; 
                height: 20px; 
                margin: 5px; 
                background-color: var(--primary-color);
                border-radius: 50%;
                opacity: 0.3;
            `;
            gridEl.appendChild(div);
        }

        anime({
            targets: '.grid-item',
            scale: [
                { value: 0.1, easing: 'easeOutSine', duration: 500 },
                { value: 1, easing: 'easeInOutQuad', duration: 1200 }
            ],
            delay: anime.stagger(200, { grid: [columns, rows], from: 'center' }),
            loop: true,
            direction: 'alternate'
        });

        // --- 2. Morphing & Line Drawing (createDrawable effect) ---
        // Abstract shapes
        const shape1 = "M25,25 L75,25 L75,75 L25,75 Z"; // Square
        const shape2 = "M50,15 L85,85 L15,85 Z"; // Triangle

        // Simulating createDrawable by animating strokeDashoffset
        // Simulating morphTo by animating 'd' attribute

        const path = svgRef.current.querySelector('path');

        const tl = anime.timeline({
            easing: 'easeOutExpo',
            duration: 2000,
            loop: true
        });

        tl.add({
            targets: path,
            strokeDashoffset: [anime.setDashoffset, 0], // Draw line
            opacity: [0, 1],
            duration: 1500,
            easing: 'easeInOutSine'
        })
            .add({
                targets: path,
                d: [
                    { value: shape1 },
                    { value: shape2 } // Morph
                ],
                fill: ['rgba(0,0,0,0)', '#06b6d4'], // Fill in after drawing
                duration: 1000
            });

    }, []);

    return (
        <div className="animation-demo flex flex-column align-items-center gap-4">
            {/* SVG Morph Container */}
            <div className="svg-container" style={{ width: '100px', height: '100px' }}>
                <svg viewBox="0 0 100 100" ref={svgRef} style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                    <path
                        d="M25,25 L75,25 L75,75 L25,75 Z"
                        fill="none"
                        stroke="#646db8"
                        strokeWidth="2"
                    />
                </svg>
            </div>

            {/* Grid Container */}
            <div ref={gridRef} className="grid-container flex flex-wrap justify-content-center" style={{ width: '100%', maxWidth: '320px' }}></div>
        </div>
    );
};

export default AnimationDemo;
