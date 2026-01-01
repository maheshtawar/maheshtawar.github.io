
import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { personalInfo } from '../../data/profile';

const Navbar = () => {
    const items = [
        { label: 'Home', icon: 'pi pi-home', command: () => scrollToSection('hero') },
        { label: 'Skills', icon: 'pi pi-cog', command: () => scrollToSection('skills') },
        { label: 'Projects', icon: 'pi pi-briefcase', command: () => scrollToSection('projects') },
        { label: 'Experience', icon: 'pi pi-history', command: () => scrollToSection('experience') },
        { label: 'Certificates', icon: 'pi pi-verified', command: () => scrollToSection('certificates') },
        { label: 'Contact', icon: 'pi pi-envelope', command: () => scrollToSection('contact') }
    ];

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const start = <div className="logo font-bold text-xl">{personalInfo.firstName}<span style={{ color: 'var(--secondary-color)' }}>.dev</span></div>;

    const end = (
        <div className="flex align-items-center gap-2">
            <Button icon="pi pi-github" rounded text aria-label="GitHub" onClick={() => window.open(personalInfo.social.github, '_blank')} />
            <Button icon="pi pi-linkedin" rounded text aria-label="LinkedIn" onClick={() => window.open(personalInfo.social.linkedin, '_blank')} />
        </div>
    );

    return (
        <div className="card sticky-nav" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000, backdropFilter: 'blur(10px)', background: 'rgba(15, 23, 42, 0.8)' }}>
            <Menubar model={items} start={start} end={end} style={{ border: 'none', background: 'transparent' }} />
        </div>
    );
}

export default Navbar;
