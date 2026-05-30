'use client';
import { useState, useEffect, useRef } from 'react';

const CONTACT_ITEMS = [
  { icon: 'bi-envelope-fill', label: 'Email', value: 'kumarsinghsachin4444@gmail.com', href: 'mailto:kumarsinghsachin4444@gmail.com', color: '#0066cc', bg: '#e6f0ff' },
  { icon: 'bi-telephone-fill', label: 'Phone', value: '+91 9555853593', href: 'tel:+919555853593', color: '#16a34a', bg: '#f0fdf4' },
  { icon: 'bi-linkedin', label: 'LinkedIn', value: 'sachin-kumar-singh-511b86336', href: 'https://www.linkedin.com/in/sachin-kumar-singh-511b86336', color: '#0a66c2', bg: '#e8f0fe' },
  { icon: 'bi-github', label: 'GitHub', value: 'github.com/sks-007', href: 'https://github.com/sks-007', color: '#1e293b', bg: '#f1f5f9' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ type: 'success', text: "✅ Message sent! I'll get back to you soon." });
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'error', text: data.error || 'Something went wrong. Please try again.' });
      }
    } catch {
      setStatus({ type: 'error', text: 'Network error. Please check your connection.' });
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.85rem 1.1rem',
    border: '1.5px solid #e2e8f0',
    borderRadius: 12,
    background: '#f8fafc',
    color: '#1e293b',
    fontFamily: 'inherit',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
  };

  return (
    <section id="contact" ref={sectionRef} style={{ padding: '5rem 5%', background: '#ffffff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#f4f7fa', color: '#0066cc', border: '1px solid #b3d4ff', padding: '0.4rem 1rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
            <span style={{ width: 6, height: 6, background: '#0066cc', borderRadius: '50%', display: 'inline-block' }}></span>
            Get In Touch
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#2d3748', letterSpacing: '-0.03em', margin: '0 0 0.8rem 0' }}>Let's Talk</h2>
          <p style={{ fontSize: '1rem', color: '#64748b', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
            Always open to meaningful conversations, collaborations, and new opportunities.
          </p>
        </div>

        {/* Two-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '3rem', alignItems: 'start', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s' }}>

          {/* Left: Contact Info */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {CONTACT_ITEMS.map((item) => (
                <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', padding: '1.2rem 1.5rem', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 16, textDecoration: 'none', transition: 'all 0.3s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(8px)'; e.currentTarget.style.borderColor = '#b3d4ff'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,102,204,0.08)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <div style={{ width: 46, height: 46, borderRadius: 12, background: item.bg, color: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                    <i className={`bi ${item.icon}`}></i>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.15rem' }}>{item.label}</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1e293b' }}>{item.value}</div>
                  </div>
                  <i className="bi bi-arrow-right" style={{ marginLeft: 'auto', color: '#94a3b8', fontSize: '1rem' }}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div style={{ background: '#f8fafc', borderRadius: 24, padding: '2.5rem', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e293b', margin: '0 0 1.5rem 0' }}>Send Me a Message</h3>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>Name</label>
                  <input id="contactName" name="name" type="text" placeholder="Your name" value={form.name} onChange={handleChange} required style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = '#0066cc'; e.target.style.background = '#fff'; e.target.style.boxShadow = '0 0 0 3px rgba(0,102,204,0.1)'; }}
                    onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.background = '#f8fafc'; e.target.style.boxShadow = 'none'; }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>Email</label>
                  <input id="contactEmail" name="email" type="email" placeholder="you@email.com" value={form.email} onChange={handleChange} required style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = '#0066cc'; e.target.style.background = '#fff'; e.target.style.boxShadow = '0 0 0 3px rgba(0,102,204,0.1)'; }}
                    onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.background = '#f8fafc'; e.target.style.boxShadow = 'none'; }} />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>Subject</label>
                <input id="contactSubject" name="subject" type="text" placeholder="Project inquiry / Collaboration" value={form.subject} onChange={handleChange} required style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = '#0066cc'; e.target.style.background = '#fff'; e.target.style.boxShadow = '0 0 0 3px rgba(0,102,204,0.1)'; }}
                  onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.background = '#f8fafc'; e.target.style.boxShadow = 'none'; }} />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>Message</label>
                <textarea id="contactMessage" name="message" rows={5} placeholder="Tell me about your idea..." value={form.message} onChange={handleChange} required
                  style={{ ...inputStyle, resize: 'none' }}
                  onFocus={e => { e.target.style.borderColor = '#0066cc'; e.target.style.background = '#fff'; e.target.style.boxShadow = '0 0 0 3px rgba(0,102,204,0.1)'; }}
                  onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.background = '#f8fafc'; e.target.style.boxShadow = 'none'; }} />
              </div>

              <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.9rem 2rem', background: '#0066cc', color: '#fff', border: 'none', borderRadius: '999px', fontSize: '1rem', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'all 0.3s ease', opacity: loading ? 0.7 : 1, boxShadow: '0 4px 14px rgba(0,102,204,0.3)' }}
                onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = '#004b99'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,102,204,0.4)'; }}}
                onMouseLeave={e => { e.currentTarget.style.background = '#0066cc'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,102,204,0.3)'; }}>
                {loading ? (
                  <><i className="bi bi-hourglass-split"></i> Sending...</>
                ) : (
                  <><i className="bi bi-send-fill"></i> Send Message</>
                )}
              </button>

              {status && (
                <div style={{ marginTop: '1rem', padding: '0.85rem 1rem', borderRadius: 10, fontSize: '0.9rem', fontWeight: 600, textAlign: 'center', background: status.type === 'success' ? '#f0fdf4' : '#fef2f2', color: status.type === 'success' ? '#16a34a' : '#dc2626', border: `1px solid ${status.type === 'success' ? '#bbf7d0' : '#fecaca'}` }}>
                  {status.text}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1.4fr"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
