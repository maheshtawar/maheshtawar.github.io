import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { personalInfo, sectionConfig } from '../../data/profile';
import ScrollReveal from '../UI/ScrollReveal';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle submit logic here
        alert('Message sent! (Simulation)');
    };

    return (
        <section id="contact" className="container" style={{ padding: '4rem 2rem 6rem' }}>
            <ScrollReveal>
                <h2 className="section-title">Get In Touch</h2>
            </ScrollReveal>

            <div className="grid flex justify-content-center gap-6" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {/* Contact Info */}
                <ScrollReveal className="flex-1" style={{ flex: '1 1 300px', maxWidth: '500px' }}>
                    <div style={{ flex: '1 1 300px', maxWidth: '500px' }}>
                        <h3 className="mb-4">Contact Information</h3>
                        <div className="flex flex-column gap-3">
                            {personalInfo.contacts.slice(0, 3).map((contact, i) => (
                                <div key={i} className="flex align-items-center gap-3 mb-3">
                                    <div style={{
                                        width: '40px', height: '40px', background: 'rgba(255,255,255,0.1)',
                                        borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: 'var(--secondary-color)'
                                    }}>
                                        <i className={`pi ${contact.type === 'Email' ? 'pi-envelope' : contact.type === 'Phone' ? 'pi-phone' : 'pi-map-marker'} `}></i>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-400">{contact.type}</div>
                                        <div className="font-bold">{contact.value}</div>
                                        {contact.link && <a href={contact.link} style={{ fontSize: '0.8rem', color: 'var(--primary-color)' }}>Send Message</a>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>

                {/* Contact Form */}
                <ScrollReveal delay={200} className="flex-1" style={{ flex: '1 1 300px', maxWidth: '500px' }}>
                    <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '16px' }} className="hover-lift">
                        <form onSubmit={handleSubmit} className="flex flex-column gap-4">
                            {Object.entries(sectionConfig.contact.form).filter(([key]) => key !== 'button').map(([key, label]) => {
                                const isTextArea = key === 'message' || key === 'description';
                                return (
                                    <div key={key} className="flex flex-column gap-2">
                                        <label htmlFor={key}>{label}</label>
                                        {isTextArea ? (
                                            <InputTextarea id={key} name={key} value={formData[key] || ''} onChange={handleChange} rows={5} required autoResize />
                                        ) : (
                                            <InputText id={key} name={key} value={formData[key] || ''} onChange={handleChange} required />
                                        )}
                                    </div>
                                );
                            })}
                            <Button label={sectionConfig.contact.form.button} icon="pi pi-send" type="submit" />
                        </form>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}


export default Contact;
