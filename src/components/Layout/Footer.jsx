
import React from 'react';
import { personalInfo, sectionConfig } from '../../data/profile';

const Footer = () => {
    return (
        <footer style={{ background: 'var(--bg-card)', padding: '2rem', marginTop: 'auto', textAlign: 'center' }}>
            <p>© {new Date().getFullYear()} {personalInfo.fullName}. All rights reserved.</p>
            <div className="flex justify-content-center gap-3 mt-2">
                {sectionConfig.footer.disclaimer}
            </div>
        </footer>
    );
}

export default Footer;
