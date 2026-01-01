import React from 'react';
import { Timeline } from 'primereact/timeline';
import { Card } from 'primereact/card';
import { experiences, sectionConfig } from '../../data/profile';
import ScrollReveal from '../UI/ScrollReveal';

const Experience = () => {
    const customizeMarker = (item) => {
        return (
            <span className="flex w-2rem h-2rem align-items-center justify-content-center text-white border-circle z-1 shadow-1"
                style={{ backgroundColor: 'var(--primary-color)', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="pi pi-briefcase"></i>
            </span>
        );
    };

    const customizeContent = (item) => {
        return (
            <ScrollReveal animation="animate-fade-up">
                <Card title={item.title} subTitle={item.company} className="mb-3 hover-lift" style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}>
                    <div className="text-sm mb-2" style={{ color: 'var(--secondary-color)' }}>{item.period}</div>
                    <p>{item.description}</p>
                </Card>
            </ScrollReveal>
        );
    };

    return (
        <section id="experience" className="container" style={{ padding: '4rem 2rem' }}>
            <ScrollReveal>
                <h2 className="section-title">{sectionConfig.experience.title}</h2>
            </ScrollReveal>
            <Timeline value={experiences} align="alternate" className="customized-timeline"
                marker={customizeMarker} content={customizeContent} />
        </section>
    );
}

export default Experience;
