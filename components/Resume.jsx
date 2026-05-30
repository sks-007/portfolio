'use client';
import { useEffect, useRef, useState } from 'react';

const EDUCATION = [
  {
    date: '2024 – 2028',
    title: 'B.Tech, Computer Science & Engineering',
    subtitle: 'BML Munjal University, Gurugram',
    desc: 'Currently in 4th Semester. CGPA: 7.14. Focus on AI/ML and Full-Stack Development.'
  },
  {
    date: '2023',
    title: 'Senior Secondary (XII) — CBSE',
    subtitle: 'Glorious Academy',
    desc: 'Scored 76.00%. Science with Computer Science.'
  },
  {
    date: '2021',
    title: 'Secondary (X) — CBSE',
    subtitle: 'BNS School',
    desc: 'Scored 95.40% — Top academic performer.'
  }
];

const EXPERIENCE = [
  {
    date: 'Apr 2026 – Present',
    title: 'AI Intern',
    subtitle: 'SeekMySpace · Remote',
    desc: 'Contributing to building data-driven solutions and intelligent systems to enhance platform functionality and user experience. Working on AI pipelines, ML feature development, and product UX improvements.'
  },
  {
    date: 'April 2025 – June 2025',
    title: 'Sales Representative (Part-Time)',
    subtitle: 'Web3Quest · Remote',
    desc: 'Supported digital outreach and campaign execution for Web3-focused initiatives. Contributed to brand visibility and user engagement through promotional strategies and audience targeting.'
  }
];

export default function Resume() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <section id="resume" ref={sectionRef} style={{ padding: '3rem 5%', background: '#f4f7fa', color: '#4a5568', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative Background Elements */}
      <div className="bg-glow"></div>
      
      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        
        {/* Section Header */}
        <div className={`section-header ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          <h2 className="main-title">
            Resume
          </h2>
        </div>

        <div className="resume-grid">
          
          {/* Experience Column */}
          <div className={`resume-col ${isVisible ? 'slide-in-left' : 'opacity-0'}`}>
            <h3 className="col-title">
              <div className="title-icon icon-exp"><i className="bi bi-briefcase-fill"></i></div>
              Experience
            </h3>
            <div className="timeline-container">
              {EXPERIENCE.map((item, i) => (
                <div key={i} className="timeline-item" style={{ animationDelay: `${i * 0.15}s` }}>
                  <div className="timeline-line"></div>
                  <div className="timeline-dot"></div>
                  <div className="timeline-card">
                    <span className="timeline-date">{item.date}</span>
                    <h4 className="timeline-title">{item.title}</h4>
                    <h5 className="timeline-subtitle">{item.subtitle}</h5>
                    <p className="timeline-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div className={`resume-col ${isVisible ? 'slide-in-right' : 'opacity-0'}`}>
            <h3 className="col-title">
              <div className="title-icon icon-edu"><i className="bi bi-mortarboard-fill"></i></div>
              Education
            </h3>
            <div className="timeline-container">
              {EDUCATION.map((item, i) => (
                <div key={i} className="timeline-item" style={{ animationDelay: `${(i * 0.15) + 0.3}s` }}>
                  <div className="timeline-line"></div>
                  <div className="timeline-dot"></div>
                  <div className="timeline-card">
                    <span className="timeline-date">{item.date}</span>
                    <h4 className="timeline-title">{item.title}</h4>
                    <h5 className="timeline-subtitle">{item.subtitle}</h5>
                    <p className="timeline-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className={`btn-container ${isVisible ? 'fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
          <a href="/Sachin_Kumar_Singh_Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-download">
            <div className="btn-bg"></div>
            <span className="btn-content">
              <i className="bi bi-file-earmark-arrow-down"></i>
              Download Full Resume
            </span>
          </a>
        </div>
      </div>

      <style jsx>{`
        /* Animations */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0, 102, 204, 0.4); }
          50% { box-shadow: 0 0 0 10px rgba(0, 102, 204, 0); }
        }

        .opacity-0 { opacity: 0; }
        .fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .slide-in-left { animation: slideInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .slide-in-right { animation: slideInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        /* Background Effects */
        .bg-glow {
          position: absolute;
          top: 10%;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(0, 102, 204, 0.03) 0%, rgba(244, 247, 250, 0) 70%);
          pointer-events: none;
          z-index: 0;
        }

        /* Layout */
        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #ffffff;
          color: #0066cc;
          padding: 0.4rem 1rem;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
          box-shadow: 0 4px 15px rgba(0, 102, 204, 0.08);
          border: 1px solid rgba(0, 102, 204, 0.1);
        }

        .badge-dot {
          width: 6px;
          height: 6px;
          background: #0066cc;
          border-radius: 50%;
          animation: blink 2s infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .main-title {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 900;
          color: #1a202c;
          letter-spacing: -0.04em;
          margin: 0;
        }

        .resume-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
        }

        @media (max-width: 850px) {
          .resume-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
        }

        .col-title {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 1.5rem;
          font-weight: 800;
          color: #2d3748;
          margin-bottom: 2.5rem;
        }

        .title-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .icon-exp {
          background: linear-gradient(135deg, #0066cc, #004b99);
          color: #ffffff;
          box-shadow: 0 8px 20px rgba(0, 102, 204, 0.3);
        }
        .icon-edu {
          background: linear-gradient(135deg, #10b981, #059669);
          color: #ffffff;
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
        }

        .resume-col:hover .title-icon {
          transform: scale(1.1) rotate(5deg);
        }

        /* Timeline Items */
        .timeline-container {
          position: relative;
          padding-left: 2rem;
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        /* The continuous line */
        .timeline-container::before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 6px;
          width: 2px;
          background: linear-gradient(to bottom, rgba(0,102,204,0.2) 0%, rgba(0,102,204,0.05) 100%);
          border-radius: 2px;
        }

        .timeline-item {
          position: relative;
          opacity: 0;
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .timeline-dot {
          position: absolute;
          left: -32px;
          top: 8px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #ffffff;
          border: 3px solid #cbd5e1;
          box-shadow: 0 0 0 4px #f4f7fa;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          z-index: 2;
        }

        .timeline-card {
          background: #ffffff;
          border: 1px solid rgba(226, 232, 240, 0.8);
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.02);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }

        /* Card Hover Effects */
        .timeline-item:hover .timeline-card {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px -10px rgba(0, 102, 204, 0.15);
          border-color: rgba(0, 102, 204, 0.2);
        }

        .timeline-item:hover .timeline-dot {
          background: #0066cc;
          border-color: #0066cc;
          transform: scale(1.3);
          animation: pulseGlow 1.5s infinite;
        }

        /* Interactive Card Gradient */
        .timeline-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(0,102,204,0.03) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .timeline-item:hover .timeline-card::after {
          opacity: 1;
        }

        /* Typography */
        .timeline-date {
          display: inline-block;
          background: #f8fafc;
          color: #64748b;
          padding: 0.3rem 0.8rem;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 700;
          margin-bottom: 1rem;
          letter-spacing: 0.02em;
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
        }

        .timeline-item:hover .timeline-date {
          background: #e0f2fe;
          color: #0284c7;
          border-color: #bae6fd;
        }

        .timeline-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: #1e293b;
          margin: 0 0 0.3rem 0;
        }

        .timeline-subtitle {
          font-size: 0.95rem;
          font-weight: 600;
          color: #64748b;
          margin: 0 0 1rem 0;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .timeline-desc {
          font-size: 0.95rem;
          line-height: 1.7;
          color: #475569;
          margin: 0;
        }

        /* Download Button */
        .btn-container {
          margin-top: 2.5rem;
          display: flex;
          justify-content: center;
        }

        .btn-download {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 16px 36px;
          background: transparent;
          color: #0066cc;
          font-size: 1.05rem;
          font-weight: 700;
          text-decoration: none;
          border-radius: 999px;
          border: 2px solid #0066cc;
          overflow: hidden;
          transition: color 0.4s ease;
        }

        .btn-bg {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          height: 100%;
          background: #0066cc;
          border-radius: 50% 50% 0 0 / 25px;
          transition: top 0.5s cubic-bezier(0.19, 1, 0.22, 1), border-radius 0.5s cubic-bezier(0.19, 1, 0.22, 1);
          z-index: 0;
        }

        .btn-download:hover {
          color: #ffffff;
          border-color: #004b99;
          box-shadow: 0 10px 30px rgba(0, 102, 204, 0.3);
          transform: translateY(-3px);
        }

        .btn-download:hover .btn-bg {
          top: 0;
          border-radius: 0;
          background: #004b99;
        }

        .btn-content {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
      `}</style>
    </section>
  );
}
