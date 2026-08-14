import React from 'react';
import { personalInfo } from '../../data/profile';

const Footer = () => {
  return (
    <footer style={{
      position: 'relative',
      padding: '3rem 2rem 2rem',
      background: 'rgba(6,9,24,0.8)',
      borderTop: '1px solid var(--border-subtle)',
    }}>
      {/* Gradient top border */}
      <div style={{
        position: 'absolute',
        top: '-1px',
        left: 0,
        right: 0,
        height: '1px',
        background: 'var(--gradient-primary)',
        opacity: 0.5,
      }} />

      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}>
          {/* Logo & Copyright */}
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.2rem',
              fontWeight: 700,
              marginBottom: '0.4rem',
            }}>
              <span style={{ color: 'var(--text-primary)' }}>{personalInfo.firstName}</span>
              <span style={{
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>.dev</span>
            </div>
            <p style={{
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              margin: 0,
            }}>
              © {new Date().getFullYear()} {personalInfo.fullName}. All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            {[
              { icon: 'pi-github', url: personalInfo.social.github },
              { icon: 'pi-linkedin', url: personalInfo.social.linkedin },
              { icon: 'pi-envelope', url: `mailto:${personalInfo.email}` },
            ].map((social, i) => (
              <a
                key={i}
                href={social.url}
                target={social.icon !== 'pi-envelope' ? '_blank' : undefined}
                rel="noopener noreferrer"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(148,163,184,0.04)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-muted)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--primary-light)';
                  e.currentTarget.style.borderColor = 'rgba(124,58,237,0.3)';
                  e.currentTarget.style.background = 'rgba(124,58,237,0.08)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-muted)';
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.background = 'rgba(148,163,184,0.04)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <i className={`pi ${social.icon}`} style={{ fontSize: '1rem' }} />
              </a>
            ))}
          </div>

          {/* Back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'none',
              border: '1px solid var(--border-subtle)',
              borderRadius: '10px',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--accent)';
              e.currentTarget.style.borderColor = 'rgba(34,211,238,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-muted)';
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
            }}
          >
            <i className="pi pi-arrow-up" style={{ fontSize: '0.7rem' }} />
            Back to top
          </button>
        </div>

        {/* Bottom line */}
        <div style={{
          marginTop: '2rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--border-subtle)',
          textAlign: 'center',
        }}>
          <p style={{
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            margin: 0,
          }}>
            Built with <span style={{ color: '#f472b6', animation: 'heartbeat 2s infinite' }}>❤</span> using React & anime.js
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
