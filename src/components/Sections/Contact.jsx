import { useState } from 'react';
import { useReveal } from '../../hooks/useAnimations';
import { personalInfo, contactConfig } from '../../data/profile';
import { usePortfolio } from '../../context/PortfolioContext';
import { saveMessageToStore, syncToGoogleSheet } from '../../utils/excelExport';
import MagneticButton from '../UI/MagneticButton';

const Contact = () => {
  const headerRef = useReveal();
  const formRef = useReveal({ rootMargin: '0px 0px -40px 0px' });
  const { copyEmail } = usePortfolio();

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error | activation_pending
  const [statusMessage, setStatusMessage] = useState('');

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Invalid email format';
    if (!formData.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  const handleOpenMailClient = () => {
    const subject = encodeURIComponent(formData.subject ? `[Portfolio] ${formData.subject}` : `[Portfolio] Message from ${formData.name || 'Visitor'}`);
    const body = encodeURIComponent(
      `Name: ${formData.name || 'Not provided'}\nEmail: ${formData.email || 'Not provided'}\n\nMessage:\n${formData.message || ''}`
    );
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus('sending');
    setStatusMessage('');

    // 1. Silently record into persistent Excel database
    saveMessageToStore(formData);

    // 2. If Google Sheet Webhook URL is configured, silently sync to Google Sheet
    if (contactConfig?.googleSheetScriptUrl) {
      syncToGoogleSheet(formData, contactConfig.googleSheetScriptUrl);
    }

    // 3. Clean, professional customer-facing confirmation
    setTimeout(() => {
      setStatus('success');
      setStatusMessage('Thank you! Your message has been received. I will get back to you shortly.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 6000);
    }, 450);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container" style={{ maxWidth: '940px' }}>
        {/* Header */}
        <div className="section-header reveal" ref={headerRef}>
          <span className="text-label">Get In Touch</span>
          <h2 className="heading-section">Let's Build Something High-Scale</h2>
          <p className="text-body">
            Interested in backend engineering, microservices migration, database optimization, or full stack systems? I'd love to connect.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 'var(--space-2xl)' }}>
          {/* Contact Direct Info */}
          <div className="reveal" ref={useReveal()}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
              {/* Contact Links */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                {/* Email with copy button */}
                <div
                  className="card"
                  style={{
                    padding: 'var(--space-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                    <span style={{ fontSize: '1.3rem' }}>✉</span>
                    <div>
                      <span className="text-label" style={{ fontSize: '0.62rem', display: 'block' }}>Email</span>
                      <a href={`mailto:${personalInfo.email}`} style={{ fontSize: '0.88rem', color: 'var(--text-primary)', textDecoration: 'none' }}>
                        {personalInfo.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={copyEmail}
                    className="tag"
                    style={{ cursor: 'pointer', fontSize: '0.7rem', border: '1px solid var(--border)' }}
                    title="Copy email to clipboard"
                  >
                    Copy
                  </button>
                </div>

                <a
                  href={personalInfo.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card"
                  style={{
                    padding: 'var(--space-md)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-md)',
                    textDecoration: 'none',
                  }}
                >
                  <span style={{ fontSize: '1.3rem' }}>💼</span>
                  <div>
                    <span className="text-label" style={{ fontSize: '0.62rem', display: 'block' }}>LinkedIn</span>
                    <span style={{ fontSize: '0.88rem', color: 'var(--text-primary)' }}>linkedin.com/in/maheshtawar</span>
                  </div>
                </a>

                <a
                  href={personalInfo.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card"
                  style={{
                    padding: 'var(--space-md)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-md)',
                    textDecoration: 'none',
                  }}
                >
                  <span style={{ fontSize: '1.3rem' }}>🐙</span>
                  <div>
                    <span className="text-label" style={{ fontSize: '0.62rem', display: 'block' }}>GitHub</span>
                    <span style={{ fontSize: '0.88rem', color: 'var(--text-primary)' }}>github.com/maheshtawar</span>
                  </div>
                </a>

                <div
                  className="card"
                  style={{
                    padding: 'var(--space-md)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-md)',
                  }}
                >
                  <span style={{ fontSize: '1.3rem' }}>📍</span>
                  <div>
                    <span className="text-label" style={{ fontSize: '0.62rem', display: 'block' }}>Location</span>
                    <span style={{ fontSize: '0.88rem', color: 'var(--text-primary)' }}>Pune, Maharashtra, India</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
                <MagneticButton
                  as="a"
                  href={personalInfo.resume}
                  download="Mahesh_Tawar.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Download Official Resume (PDF) ↗
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* Contact Interactive Form */}
          <div className="reveal" ref={formRef}>
            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">Full Name *</label>
                <input
                  id="contact-name"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Alex Rivera"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && <span className="form-error" id="name-error">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-email">Email Address *</label>
                <input
                  id="contact-email"
                  type="email"
                  className="form-input"
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && <span className="form-error" id="email-error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-subject">Topic / Role</label>
                <input
                  id="contact-subject"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Backend Opportunity / Contract"
                  value={formData.subject}
                  onChange={(e) => handleChange('subject', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">Message *</label>
                <textarea
                  id="contact-message"
                  className="form-textarea"
                  placeholder="Tell me about your project, team, or opportunity..."
                  rows="4"
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && <span className="form-error" id="message-error">{errors.message}</span>}
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap', alignItems: 'center' }}>
                {/* Transmit message temporarily commented out per user request */}
                {/*
                <MagneticButton
                  type="submit"
                  className="btn btn-primary"
                  disabled={status === 'sending'}
                  style={{ opacity: status === 'sending' ? 0.7 : 1 }}
                >
                  {status === 'sending' ? 'Transmitting Message...' : status === 'success' ? '✓ Message Delivered!' : 'Transmit Message'}
                </MagneticButton>
                */}

                <button
                  type="button"
                  onClick={handleOpenMailClient}
                  className="btn btn-primary"
                  title="Open directly in your installed email application"
                  style={{ fontSize: '0.88rem' }}
                >
                  Send Message via Email ✉
                </button>
              </div>

              {status === 'success' && (
                <div
                  style={{
                    padding: '14px 18px',
                    borderRadius: '8px',
                    background: 'rgba(34, 197, 94, 0.1)',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    color: 'var(--success)',
                    fontSize: '0.88rem',
                    lineHeight: '1.5',
                  }}
                >
                  ✓ {statusMessage || 'Thank you! Your message has been received. I will get back to you shortly.'}
                </div>
              )}


              {status === 'error' && (
                <div
                  style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#f87171',
                    fontSize: '0.85rem',
                    lineHeight: '1.5',
                  }}
                >
                  <p style={{ margin: '0 0 8px 0' }}>{statusMessage}</p>
                  <button
                    type="button"
                    onClick={handleOpenMailClient}
                    className="btn btn-primary"
                    style={{ fontSize: '0.8rem', padding: '6px 14px' }}
                  >
                    Open Mail App with Message ✉
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
