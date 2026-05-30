'use client';
import { useState, useEffect, useRef } from 'react';

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [certs, setCerts] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    fetch('/api/certifications')
      .then(r => r.json())
      .then(d => setCerts(d.certifications || []))
      .catch(() => setCerts([]));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="certifications" ref={sectionRef} style={{ padding: '5rem 5%', background: '#ffffff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#f4f7fa', color: '#0066cc', border: '1px solid #b3d4ff', padding: '0.4rem 1rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
            <span style={{ width: 6, height: 6, background: '#0066cc', borderRadius: '50%', display: 'inline-block' }}></span>
            Credentials
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#2d3748', letterSpacing: '-0.03em', margin: 0 }}>Certifications</h2>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {certs.map((cert, i) => (
            <div
              key={cert.name}
              onClick={() => setSelectedCert(cert)}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: 20,
                padding: '2rem',
                cursor: 'pointer',
                transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
                position: 'relative',
                overflow: 'hidden',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transitionDelay: `${i * 0.1 + 0.2}s`,
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
            >
              {/* Top gradient bar */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #0066cc, #40a9ff)' }}></div>

              {/* Icon */}
              <div style={{ width: 56, height: 56, borderRadius: 14, background: cert.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', color: cert.iconColor, marginBottom: '1.2rem' }}>
                <i className={`bi ${cert.icon}`}></i>
              </div>

              {/* Name */}
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#1e293b', lineHeight: 1.4, margin: '0 0 0.6rem 0' }}>{cert.name}</h3>

              {/* Issuer & date */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.3rem' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: cert.iconColor }}>{cert.issuer}</span>
                <span style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <i className="bi bi-calendar3"></i> {cert.date}
                </span>
              </div>

              {/* Click hint */}
              <div style={{ marginTop: '1.2rem', fontSize: '0.8rem', color: '#0066cc', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <i className="bi bi-eye"></i> Click to view details
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedCert && (
        <div
          onClick={() => setSelectedCert(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', animation: 'fadeIn 0.3s ease' }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ background: '#ffffff', borderRadius: 24, padding: '2.5rem', maxWidth: 500, width: '100%', position: 'relative', boxShadow: '0 30px 80px rgba(0,0,0,0.2)', animation: 'slideUp 0.35s cubic-bezier(0.16,1,0.3,1)' }}
          >
            {/* Top bar */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, borderRadius: '24px 24px 0 0', background: 'linear-gradient(90deg, #0066cc, #40a9ff)' }}></div>

            <button onClick={() => setSelectedCert(null)} style={{ position: 'absolute', top: '1.2rem', right: '1.5rem', background: '#f1f5f9', border: 'none', borderRadius: '50%', width: 36, height: 36, cursor: 'pointer', fontSize: '1.1rem', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#e2e8f0'; e.currentTarget.style.color = '#1e293b'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.color = '#64748b'; }}>
              ×
            </button>

            <div style={{ width: 64, height: 64, borderRadius: 16, background: selectedCert.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: selectedCert.iconColor, marginBottom: '1.5rem' }}>
              <i className={`bi ${selectedCert.icon}`}></i>
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1e293b', lineHeight: 1.3, margin: '0 0 0.6rem 0' }}>{selectedCert.name}</h3>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: selectedCert.iconColor, marginBottom: '0.4rem' }}>{selectedCert.issuer}</div>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.5rem' }}>
              <i className="bi bi-calendar3"></i> {selectedCert.date}
            </div>
            <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: 1.7, margin: '0 0 2rem 0' }}>{selectedCert.desc}</p>

            <a href={selectedCert.link} target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.8rem 2rem', background: '#0066cc', color: '#fff', borderRadius: '999px', fontSize: '0.95rem', fontWeight: 700, textDecoration: 'none', transition: 'all 0.3s ease', boxShadow: '0 4px 14px rgba(0,102,204,0.3)' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#004b99'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#0066cc'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              <span>View Credential</span> <i className="bi bi-arrow-up-right"></i>
            </a>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>
    </section>
  );
}
