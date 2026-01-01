
import React from 'react';
import { Carousel } from 'primereact/carousel';
import { Button } from 'primereact/button';
import { certificates, sectionConfig } from '../../data/profile';
import ScrollReveal from '../UI/ScrollReveal';

const Certificates = () => {
    const responsiveOptions = [
        { breakpoint: '1199px', numVisible: 2, numScroll: 1 },
        { breakpoint: '991px', numVisible: 2, numScroll: 1 },
        { breakpoint: '767px', numVisible: 1, numScroll: 1 }
    ];

    const certificateTemplate = (cert) => {
        return (
            <div className="border-1 surface-border border-round m-2 text-center py-5 px-3 hover-lift" style={{ background: 'var(--bg-card)', borderRadius: '16px', height: '100%' }}>
                <div className="mb-3">
                    <img src={cert.image} alt={cert.name} className="shadow-2" style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        marginBottom: '1rem'
                    }} />
                </div>
                <div className="flex flex-column justify-content-between" style={{ minHeight: '150px' }}>
                    <div>
                        <h4 className="mb-1">{cert.name}</h4>
                        <div className="flex align-items-center justify-content-center gap-2 text-gray-400 mb-3">
                            <i className="pi pi-verified text-primary"></i>
                            <span>{cert.issuer}</span>
                        </div>
                    </div>
                    <div className="flex justify-content-center gap-2 mt-2">
                        <Button label="View Credential" icon="pi pi-external-link" rounded outlined size="small" onClick={() => window.open(cert.link, '_blank')} />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section id="certificates" className="container" style={{ padding: '4rem 2rem' }}>
            <ScrollReveal>
                <h2 className="section-title">{sectionConfig.certificates.title}</h2>
            </ScrollReveal>

            <ScrollReveal delay={200} animation="animate-scale-in">
                <Carousel value={certificates} numVisible={3} numScroll={1} responsiveOptions={responsiveOptions}
                    itemTemplate={certificateTemplate} circular autoplayInterval={5000} />
            </ScrollReveal>
        </section>
    );
}

export default Certificates;
