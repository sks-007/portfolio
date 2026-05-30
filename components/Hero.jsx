'use client';
import { useState, useEffect } from 'react';
import Hero3D from './Hero3D';

const TYPED_WORDS = ['AI/ML Engineer', 'Full-Stack Developer', 'Problem Solver', 'Open Source Contributor'];

function scrollTo(href) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Hero() {
  const [typed, setTyped] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = TYPED_WORDS[wordIdx];
    let timeout;
    if (!deleting && charIdx <= word.length) {
      timeout = setTimeout(() => { setTyped(word.slice(0, charIdx)); setCharIdx((c) => c + 1); }, 80);
    } else if (!deleting && charIdx > word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => { setTyped(word.slice(0, charIdx - 1)); setCharIdx((c) => c - 1); }, 40);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % TYPED_WORDS.length);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx]);

  return (
    <section id="hero" style={{ padding: '0', minHeight: '90vh', display: 'flex', alignItems: 'center', background: '#f4f7fa', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, width: '100%', margin: '0 auto', padding: '4rem 5%', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', alignItems: 'center' }}>
        
        {/* Left Side: Text and Content */}
        <div style={{ position: 'relative', zIndex: 10 }}>
          
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', color: '#0066cc', border: '1px solid #b3d4ff', padding: '0.4rem 1rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600, marginBottom: '1.5rem' }}>
            <span style={{ width: '6px', height: '6px', background: '#0066cc', borderRadius: '50%' }}></span>
            Open to Opportunities
          </div>

          {/* Name */}
          <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.03em', color: '#2d3748', marginBottom: '1rem' }}>
            Sachin<br/>
            <span style={{ color: '#4a5568' }}>Kumar Singh.</span>
          </h1>

          {/* Typed Text */}
          <div style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', fontFamily: 'var(--font-sans)', fontWeight: 600, color: '#718096', marginBottom: '1rem' }}>
            I am a <span style={{ color: '#0066cc' }}>{typed}</span>
            <span style={{ color: '#0066cc', opacity: 0.8, animation: 'blink 1s infinite' }}>|</span>
          </div>

          {/* Description */}
          <p style={{ fontSize: '0.95rem', color: '#718096', lineHeight: 1.7, maxWidth: 500, marginBottom: '2rem', fontWeight: 500 }}>
            B.Tech CSE student at BML Munjal University specializing in AI/ML and modern web development. 
            I build data-driven products that are reliable, fast, and human-friendly.
          </p>

          {/* Chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '2.5rem' }}>
            {['Python', 'Node.js', 'MongoDB', 'AI/ML', 'Next.js'].map((c) => (
              <span key={c} style={{ background: '#ffffff', color: '#1a202c', padding: '0.4rem 1rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 500, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                {c}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#projects" className="btn-solid-blue" onClick={(e) => { e.preventDefault(); scrollTo('#projects'); }}>
              <i className="bi bi-grid-3x3-gap"></i>
              <span>View My Work</span>
            </a>
            <a href="#contact" className="btn-outline-blue" onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}>
              <span>Let's Connect</span>
              <i className="bi bi-arrow-right"></i>
            </a>
          </div>

          {/* Social Icons */}
          <div style={{ display: 'flex', gap: '0.8rem', marginTop: '2rem' }}>
            <a href="https://github.com/sks-007" target="_blank" rel="noopener noreferrer" className="social-icon-btn-hero" aria-label="GitHub">
              <i className="bi bi-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/sachin-kumar-singh-511b86336" target="_blank" rel="noopener noreferrer" className="social-icon-btn-hero" aria-label="LinkedIn">
              <i className="bi bi-linkedin"></i>
            </a>
            <a href="mailto:kumarsinghsachin4444@gmail.com" className="social-icon-btn-hero" aria-label="Email">
              <i className="bi bi-envelope"></i>
            </a>
            <a href="https://www.credly.com/users/sachin-singh.3236db23" target="_blank" rel="noopener noreferrer" className="social-icon-btn-hero" aria-label="Credly">
              <i className="bi bi-award"></i>
            </a>
          </div>

        </div>

        {/* Right Side: Interactive Player Component */}
        <div style={{ height: '100%', width: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Hero3D />
        </div>

      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .btn-solid-blue {
          background: #0066cc;
          color: #ffffff;
          padding: 12px 26px;
          border-radius: 999px;
          font-size: 0.95rem;
          font-weight: 600;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 102, 204, 0.3);
          position: relative;
          overflow: hidden;
        }

        .btn-solid-blue::before {
          content: '';
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          height: 100%;
          background: #004b99;
          transition: top 0.4s cubic-bezier(0.19, 1, 0.22, 1), border-radius 0.4s cubic-bezier(0.19, 1, 0.22, 1);
          z-index: 0;
          border-radius: 50% 50% 0 0 / 25px;
        }

        .btn-solid-blue:hover::before {
          top: 0;
          border-radius: 0;
        }

        .btn-solid-blue:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 102, 204, 0.4);
        }

        .btn-solid-blue span,
        .btn-solid-blue i {
          position: relative;
          z-index: 1;
        }

        .btn-outline-blue {
          background: transparent;
          color: #0066cc;
          border: 2px solid #0066cc;
          padding: 10px 26px;
          border-radius: 999px;
          font-size: 0.95rem;
          font-weight: 600;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .btn-outline-blue::before {
          content: '';
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          height: 100%;
          background: #0066cc;
          transition: top 0.4s cubic-bezier(0.19, 1, 0.22, 1), border-radius 0.4s cubic-bezier(0.19, 1, 0.22, 1);
          z-index: 0;
          border-radius: 50% 50% 0 0 / 25px;
        }

        .btn-outline-blue:hover::before {
          top: 0;
          border-radius: 0;
        }

        .btn-outline-blue:hover {
          transform: translateY(-2px);
          color: #ffffff;
        }

        .btn-outline-blue span,
        .btn-outline-blue i {
          position: relative;
          z-index: 1;
          transition: color 0.3s ease;
        }

        .social-icon-btn-hero {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #ffffff;
          color: #4a5568;
          font-size: 1.1rem;
          text-decoration: none;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
        }
        
        .social-icon-btn-hero:hover {
          background: #0066cc;
          color: #ffffff;
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0, 102, 204, 0.3);
        }
      `}</style>
    </section>
  );
}
