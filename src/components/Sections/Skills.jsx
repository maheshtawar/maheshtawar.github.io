import React from 'react';
import { Card } from 'primereact/card';
import { skills, sectionConfig } from '../../data/profile';
import ScrollReveal from '../UI/ScrollReveal';

const Skills = () => {
    return (
        <section id="skills" className="container" style={{ padding: '4rem 2rem' }}>
            <ScrollReveal>
                <h2 className="section-title">{sectionConfig.skills.title}</h2>
            </ScrollReveal>

            <div className="grid justify-content-center">
                {skills.map((category, index) => (
                    <ScrollReveal key={index} delay={index * 200} className="col-12 md:col-6 lg:col-3" animation="animate-scale-in">
                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ borderLeft: '4px solid var(--primary-color)', paddingLeft: '1rem', marginBottom: '1.5rem' }}>
                                {category.title}
                            </h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
                                {category.items.map((skill, idx) => (
                                    <div key={idx} className="skill-card flex flex-column align-items-center gap-2 p-3 hover-lift"
                                        style={{
                                            background: 'var(--bg-card)',
                                            borderRadius: '12px',
                                            width: '120px',
                                            textAlign: 'center',
                                            cursor: 'default'
                                        }}
                                    >
                                        <div style={{ fontSize: '2rem', color: 'var(--primary-color)' }}>
                                            <i className="pi pi-code"></i>
                                        </div>
                                        <span style={{ fontWeight: 600 }}>{skill.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </section>
    );
}

export default Skills;
