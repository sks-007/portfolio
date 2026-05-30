'use client';

export default function About() {
  return (
    <section id="about" style={{ padding: '3rem 5%', background: '#ffffff', color: '#4a5568' }}>
      <div style={{ maxWidth: 1300, margin: '0 auto' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#2d3748', letterSpacing: '-0.03em', margin: 0 }}>
            About Me
          </h2>
        </div>

        <div className="about-grid">
          
          {/* Left: Image */}
          <div className="about-img-wrap">
            <div className="img-backdrop"></div>
            <img src="/profile.jpg" alt="Sachin Kumar Singh" className="about-img" />
          </div>

          {/* Right: Content */}
          <div className="about-content">
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2d3748', marginBottom: '1rem' }}>
              AI/ML Engineer & Full-Stack Developer
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#718096', marginBottom: '1.2rem' }}>
              I'm Sachin Kumar Singh, a Computer Science undergraduate focused on AI, machine learning, and full-stack product development. 
              I turn complex ideas into scalable, user-friendly software that balances performance with thoughtful design.
            </p>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#718096', marginBottom: '2rem' }}>
              I enjoy working across data, algorithms, and interfaces to build systems that solve real problems. 
              My current focus is on intelligent automation, robust backend logic, and polished front-end experiences that feel intuitive.
            </p>

            {/* Info Grid */}
            <div className="info-grid">
              {[
                { label: 'Degree', value: 'B.Tech, CSE (4th Sem)' },
                { label: 'University', value: 'BML Munjal University' },
                { label: 'CGPA', value: '7.14' },
                { label: 'Location', value: 'India' },
                { label: 'Email', value: 'kumarsinghsachin4444@gmail.com', isLink: true },
                { label: 'Status', value: 'Open to Work ✓', isHighlight: true },
              ].map((item, idx) => (
                <div key={idx} className="info-item">
                  <span className="info-label">{item.label}</span>
                  {item.isLink ? (
                    <a href={`mailto:${item.value}`} className="info-value link">{item.value}</a>
                  ) : (
                    <span className={`info-value ${item.isHighlight ? 'highlight' : ''}`}>{item.value}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="stats-container">
              <div className="stat-box">
                <span className="stat-num">4+</span>
                <span className="stat-text">Projects Built</span>
              </div>
              <div className="stat-box">
                <span className="stat-num">3+</span>
                <span className="stat-text">Certifications</span>
              </div>
              <div className="stat-box">
                <span className="stat-num">1</span>
                <span className="stat-text">Research Paper</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="btn-group">
              <a href="#contact" className="btn-solid-blue" onClick={(e) => { e.preventDefault(); document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' }); }}>
                <i className="bi bi-chat-dots"></i>
                <span>Hire Me</span>
              </a>
              <a href="/Sachin_Kumar_Singh_Resume.pdf" download className="btn-outline-blue">
                <span>Download Resume</span>
                <i className="bi bi-download"></i>
              </a>
            </div>

          </div>
        </div>
      </div>

      <style jsx>{`
        .about-grid {
          display: grid;
          /* Use a much wider ratio for the text column so it uses more space */
          grid-template-columns: 1fr 2fr;
          gap: 4rem;
          align-items: flex-start;
        }

        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
        }

        .about-img-wrap {
          position: relative;
          border-radius: 20px;
          z-index: 1;
        }

        .img-backdrop {
          position: absolute;
          top: 20px;
          left: -20px;
          width: 100%;
          height: 100%;
          background: #f4f7fa;
          border-radius: 24px;
          z-index: -1;
          border: 2px solid #e2e8f0;
        }

        .about-img {
          width: 100%;
          height: auto;
          aspect-ratio: 4/5;
          object-fit: cover;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
          border: 4px solid #ffffff;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr); /* 3 columns to use horizontal space */
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        @media (max-width: 768px) {
          .info-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 480px) {
          .info-grid {
            grid-template-columns: 1fr;
          }
        }

        .info-item {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .info-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: #a0aec0;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .info-value {
          font-size: 0.95rem;
          font-weight: 600;
          color: #2d3748;
        }

        .info-value.link {
          color: #0066cc;
          text-decoration: none;
          transition: color 0.2s;
        }

        .info-value.link:hover {
          color: #004b99;
          text-decoration: underline;
        }

        .info-value.highlight {
          color: #0066cc;
          background: #e6f0ff;
          padding: 0.2rem 0.6rem;
          border-radius: 6px;
          display: inline-block;
          width: fit-content;
        }

        .stats-container {
          display: flex;
          gap: 3rem;
          margin-bottom: 2.5rem;
          padding-bottom: 2.5rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .stat-box {
          display: flex;
          flex-direction: column;
        }

        .stat-num {
          font-size: 2rem;
          font-weight: 900;
          color: #0066cc;
          line-height: 1;
          margin-bottom: 0.2rem;
        }

        .stat-text {
          font-size: 0.85rem;
          font-weight: 600;
          color: #718096;
        }

        .btn-group {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
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
      `}</style>
    </section>
  );
}
