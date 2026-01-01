import React from 'react';
import { Carousel } from 'primereact/carousel';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { projects, sectionConfig } from '../../data/profile';
import ScrollReveal from '../UI/ScrollReveal';

const Projects = () => {
    const responsiveOptions = [
        { breakpoint: '1199px', numVisible: 2, numScroll: 1 },
        { breakpoint: '991px', numVisible: 2, numScroll: 1 },
        { breakpoint: '767px', numVisible: 1, numScroll: 1 }
    ];

    const projectTemplate = (project) => {
        return (
            <div className="border-1 surface-border border-round m-2 text-center py-5 px-3 hover-lift" style={{ background: 'var(--bg-card)', borderRadius: '16px' }}>
                <div className="mb-3">
                    {/* Placeholder for project image */}
                    <div style={{
                        width: '100%',
                        height: '200px',
                        background: 'linear-gradient(45deg, var(--primary-color), var(--secondary-color))',
                        borderRadius: '8px',
                        marginBottom: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <i className="pi pi-image" style={{ fontSize: '3rem', color: 'rgba(255,255,255,0.5)' }}></i>
                    </div>
                </div>
                <div>
                    <h4 className="mb-1">{project.title}</h4>
                    <h6 className="mt-0 mb-3" style={{ color: 'var(--text-secondary)' }}>{project.subtitle}</h6>
                    <Tag value={project.category} severity="info" className="mb-3" />
                    <p>{project.description}</p>
                    <div className="flex justify-content-center gap-2 mt-4">
                        <Button icon="pi pi-github" rounded text aria-label="GitHub" onClick={() => window.open(project.github, '_blank')} />
                        {project.demo && (
                            <Button icon="pi pi-external-link" rounded label="Demo" onClick={() => window.open(project.demo, '_blank')} />
                        )}
                    </div>
                    <div className="flex flex-wrap justify-content-center gap-2 mt-3">
                        {project.tags.map(tag => (
                            <span key={tag} style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section id="projects" className="container" style={{ padding: '4rem 2rem' }}>
            <ScrollReveal>
                <h2 className="section-title">{sectionConfig.projects.title}</h2>
            </ScrollReveal>
            <ScrollReveal delay={200} animation="animate-scale-in">
                <Carousel value={projects} numVisible={3} numScroll={1} responsiveOptions={responsiveOptions}
                    itemTemplate={projectTemplate} circular autoplayInterval={5000} />
            </ScrollReveal>
        </section>
    );
}

export default Projects;
