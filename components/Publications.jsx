'use client';
import { useEffect, useRef, useState } from 'react';

export default function Publications() {
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

  return (
    <section id="publications" ref={sectionRef} style={{ padding: '5rem 5%', background: '#f4f7fa' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#ffffff', color: '#0066cc', border: '1px solid #b3d4ff', padding: '0.4rem 1rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
            <span style={{ width: 6, height: 6, background: '#0066cc', borderRadius: '50%', display: 'inline-block' }}></span>
            Research
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#2d3748', letterSpacing: '-0.03em', margin: 0 }}>Publications</h2>
        </div>

        {/* Publication Card */}
        <div style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s' }}>
          <div style={{ background: '#ffffff', borderRadius: 20, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.05)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 48px rgba(0,0,0,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.05)'; }}>

            {/* Accent top bar */}
            <div style={{ height: 4, background: 'linear-gradient(90deg, #0066cc, #40a9ff)' }}></div>

            <div style={{ padding: '2.5rem', display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
              {/* Icon */}
              <div style={{ flexShrink: 0, width: 64, height: 64, borderRadius: 16, background: '#e6f0ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', color: '#0066cc' }}>
                <i className="bi bi-book-half"></i>
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e293b', lineHeight: 1.3, margin: '0 0 1rem 0' }}>
                  Human–AI Collaboration in the Future of Work
                </h3>

                {/* Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                  {['Research Paper', 'Published Feb 2026', 'DOI: 10.5281/zenodo.18618116'].map(pill => (
                    <span key={pill} style={{ padding: '0.25rem 0.75rem', background: '#e6f0ff', color: '#0066cc', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 700, border: '1px solid #b3d4ff' }}>{pill}</span>
                  ))}
                </div>

                <div style={{ fontSize: '0.9rem', color: '#0066cc', fontWeight: 600, marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <i className="bi bi-building"></i>
                  International Conference on Entrepreneurship, Innovation and Society (EIS 4.0) · BML Munjal University, Gurugram
                </div>

                <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: 1.7, margin: '0 0 1.5rem 0' }}>
                  This paper examines how human–AI collaboration is reshaping the future of work, highlighting gains in productivity,
                  decision support, and innovation. It also addresses skill gaps, job displacement, and ethics, arguing for responsible
                  adoption, reskilling, and governance to keep workforce transformation sustainable.
                </p>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <a href="https://zenodo.org/records/18618116" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.4rem', background: '#0066cc', color: '#fff', borderRadius: '999px', fontSize: '0.9rem', fontWeight: 700, textDecoration: 'none', transition: 'all 0.3s ease', boxShadow: '0 4px 14px rgba(0,102,204,0.25)' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#004b99'}
                    onMouseLeave={e => e.currentTarget.style.background = '#0066cc'}>
                    <i className="bi bi-box-arrow-up-right"></i> Read Paper
                  </a>
                  <a href="https://doi.org/10.5281/zenodo.18618116" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.4rem', background: 'transparent', color: '#0066cc', border: '2px solid #0066cc', borderRadius: '999px', fontSize: '0.9rem', fontWeight: 700, textDecoration: 'none', transition: 'all 0.3s ease' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#0066cc'; e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0066cc'; }}>
                    <i className="bi bi-link-45deg"></i> View DOI
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
