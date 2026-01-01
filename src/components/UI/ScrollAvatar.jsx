import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import './ScrollAvatar.css';

const ScrollAvatar = () => {
    const avatarRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        // Character starts large in the Hero section (standing)
        // Animates to a smaller "assistant" in the corner as user scrolls

        animationRef.current = anime({
            targets: avatarRef.current,
            translateX: ['-10vw', 0], // Slight horizontal move
            translateY: ['-20vh', 0], // Move from higher up
            scale: [1.5, 0.6], // Start larger, shrink to helper size
            easing: 'linear',
            autoplay: false,
            duration: 1000
        });

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            // Animation completes earlier to settle the character in the corner
            const animationRange = windowHeight * 0.6;
            const progress = Math.min(scrollY / animationRange, 1);

            if (animationRef.current) {
                animationRef.current.seek(progress * 1000);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial position

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div
            ref={avatarRef}
            className="scroll-avatar-container scroll-character"
        >
            <img
                src="/developer.png"
                alt="Character"
                className="scroll-avatar-img"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                title="I'm here! Click to go up."
            />
        </div>
    );
};

export default ScrollAvatar;
