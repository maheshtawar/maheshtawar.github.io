import React, { useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import anime from 'animejs/lib/anime.es.js';
import { personalInfo, sectionConfig } from '../../data/profile';
import AnimationDemo from '../UI/AnimationDemo';
import './Hero.css';

const Hero = () => {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const descRef = useRef(null);
    const buttonsRef = useRef(null);

    useEffect(() => {
        // Timeline for sequential animations
        const tl = anime.timeline({
            easing: 'easeOutExpo',
            duration: 1000
        });

        tl.add({
            targets: '.hero-title .letter',
            translateY: [100, 0],
            opacity: [0, 1],
            delay: anime.stagger(30)
        })
            .add({
                targets: '.hero-subtitle',
                translateX: [-50, 0],
                opacity: [0, 1],
            }, '-=800')
            .add({
                targets: '.hero-description',
                translateY: [20, 0],
                opacity: [0, 1],
            }, '-=600')
            .add({
                targets: '.hero-buttons',
                scale: [0.9, 1],
                opacity: [0, 1],
            }, '-=600');

        // Floating animation for background shapes or image if added
    }, []);

    // Split text for animation
    const renderTitle = () => {
        return personalInfo.fullName.split('').map((char, index) => (
            <span key={index} className="letter" style={{ display: 'inline-block' }}>
                {char === ' ' ? '\u00A0' : char}
            </span>
        ));
    };

    return (
        <section id="hero" className="hero-section">
            <div className="container hero-container">
                <div className="hero-content">
                    <h2 className="hero-subtitle" style={{ color: 'var(--secondary-color)', marginBottom: '1rem' }}>
                        {sectionConfig.hero.subtitle}
                    </h2>
                    <h1 ref={titleRef} className="hero-title" style={{ fontSize: '4rem', fontWeight: 'bold', lineHeight: 1.1, marginBottom: '1rem' }}>
                        {renderTitle()}
                    </h1>

                    <div ref={descRef} className="hero-description" style={{ maxWidth: '600px', margin: '0 0 2rem 0', fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
                        <p>{personalInfo.bio}</p>
                    </div>

                    <div ref={buttonsRef} className="hero-buttons flex gap-3 flex-wrap">
                        {Object.entries(sectionConfig.hero.buttons).map(([key, label]) => {
                            const getButtonProps = (k) => {
                                switch (k) {
                                    case 'projects':
                                        return { icon: "pi pi-briefcase", onClick: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) };
                                    case 'contact':
                                        return { icon: "pi pi-envelope", outlined: true, onClick: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) };
                                    default:
                                        return { icon: "pi pi-check-circle", outlined: true, severity: "help", onClick: () => alert(`Dynamic button '${label}' clicked!`) };
                                }
                            };
                            return <Button key={key} label={label} {...getButtonProps(key)} />;
                        })}
                    </div>
                </div>

                {/* Visual side (Image or abstract shapes) */}
                <div className="hero-visual flex align-items-center justify-content-center">
                    <AnimationDemo />
                </div>
            </div>
        </section>
    );
}

export default Hero;
