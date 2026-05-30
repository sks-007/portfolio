'use client';
import { useState, useEffect, useRef } from 'react';

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'ai-ml', label: 'AI / ML' },
  { value: 'web', label: 'Web Dev' },
];

export default function Projects() {
  const [active, setActive] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const [projects, setProjects] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    fetch('/api/projects')
      .then(r => r.json())
      .then(d => setProjects(d.projects || []))
      .catch(() => setProjects([]));
  }, []);

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

  const filtered = active === 'all' ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" ref={sectionRef} style={{ padding: '5rem 5%', background: '#ffffff', color: '#4a5568' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        
        {/* Section Header */}
        <div className={`section-header ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          <div className="badge">
            <span className="badge-dot"></span>
            What I've Built
          </div>
          <h2 className="main-title">
            Featured Projects
          </h2>
        </div>

        {/* Filters */}
        <div className={`filters-container ${isVisible ? 'fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          {FILTERS.map((f) => (
            <button
              key={f.value}
              className={`filter-btn ${active === f.value ? 'active' : ''}`}
              onClick={() => setActive(f.value)}
            >
              <span>{f.label}</span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filtered.map((project, i) => (
            <div key={project.id} className={`project-card ${isVisible ? 'fade-in-up' : 'opacity-0'}`} style={{ animationDelay: `${(i * 0.15) + 0.3}s` }}>
              
              {/* Image Header */}
              <div className="project-img-wrap">
                <img
                  src={project.image}
                  alt={project.name}
                  className="project-img"
                  onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                />
                <div className="project-img-fallback">
                  <i className="bi bi-image"></i>
                </div>
                <div className="project-overlay">
                  <a href={project.demo !== '#' ? project.demo : project.github} target="_blank" rel="noopener noreferrer" className="overlay-btn">
                    <i className="bi bi-arrow-up-right"></i>
                  </a>
                </div>
              </div>

              {/* Card Body */}
              <div className="project-body">
                <div className="project-category">{project.categoryLabel}</div>
                <h3 className="project-name">{project.name}</h3>
                <p className="project-desc">{project.desc}</p>
                
                <div className="project-tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                </div>

                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-outline-blue">
                    <i className="bi bi-github"></i>
                    <span>Code</span>
                  </a>
                  {project.demo !== '#' && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-solid-blue">
                      <span>Live Demo</span>
                      <i className="bi bi-arrow-up-right"></i>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        /* Animations */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .opacity-0 { opacity: 0; }
        .fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        /* Header */
        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #f4f7fa;
          color: #0066cc;
          padding: 0.4rem 1rem;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
        }

        .badge-dot {
          width: 6px;
          height: 6px;
          background: #0066cc;
          border-radius: 50%;
        }

        .main-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 900;
          color: #2d3748;
          letter-spacing: -0.03em;
          margin: 0;
        }

        /* Filters */
        .filters-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.8rem;
          margin-bottom: 4rem;
        }

        .filter-btn {
          padding: 0.5rem 1.5rem;
          border: 2px solid #e2e8f0;
          border-radius: 999px;
          background: transparent;
          color: #64748b;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .filter-btn::before {
          content: '';
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          height: 100%;
          background: #0066cc;
          transition: top 0.4s ease, border-radius 0.4s ease;
          z-index: 0;
          border-radius: 50% 50% 0 0 / 25px;
        }

        .filter-btn:hover::before,
        .filter-btn.active::before {
          top: 0;
          border-radius: 0;
        }

        .filter-btn span {
          position: relative;
          z-index: 1;
        }

        .filter-btn:hover,
        .filter-btn.active {
          color: #ffffff;
          border-color: #0066cc;
          box-shadow: 0 4px 15px rgba(0, 102, 204, 0.2);
        }

        /* Grid */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2.5rem;
        }

        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Project Card */
        .project-card {
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
        }

        .project-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
          border-color: #cbd5e1;
        }

        /* Image */
        .project-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9;
          overflow: hidden;
          background: #f8fafc;
        }

        .project-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .project-card:hover .project-img {
          transform: scale(1.05);
        }

        .project-img-fallback {
          display: none;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          font-size: 3rem;
          color: #cbd5e1;
          background: #f1f5f9;
        }

        .project-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .project-card:hover .project-overlay {
          opacity: 1;
        }

        .overlay-btn {
          width: 60px;
          height: 60px;
          background: #ffffff;
          color: #0066cc;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          transform: scale(0.8) translateY(20px);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          text-decoration: none;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .project-card:hover .overlay-btn {
          transform: scale(1) translateY(0);
        }

        .overlay-btn:hover {
          background: #0066cc;
          color: #ffffff;
        }

        /* Card Body */
        .project-body {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .project-category {
          font-size: 0.8rem;
          font-weight: 800;
          color: #0066cc;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
        }

        .project-name {
          font-size: 1.3rem;
          font-weight: 800;
          color: #1e293b;
          margin: 0 0 1rem 0;
          line-height: 1.3;
        }

        .project-desc {
          font-size: 0.95rem;
          line-height: 1.7;
          color: #64748b;
          margin: 0 0 1.5rem 0;
          flex-grow: 1;
        }

        /* Tags */
        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .project-tag {
          padding: 0.3rem 0.8rem;
          background: #f1f5f9;
          color: #475569;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .project-card:hover .project-tag {
          background: #e6f0ff;
          color: #0066cc;
        }

        /* Buttons */
        .project-links {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-top: auto;
        }

        .btn-solid-blue {
          background: #0066cc;
          color: #ffffff;
          padding: 10px 20px;
          border-radius: 999px;
          font-size: 0.9rem;
          font-weight: 700;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
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
          transition: top 0.4s ease, border-radius 0.4s ease;
          z-index: 0;
          border-radius: 50% 50% 0 0 / 25px;
        }

        .btn-solid-blue:hover::before { top: 0; border-radius: 0; }
        .btn-solid-blue span, .btn-solid-blue i { position: relative; z-index: 1; }

        .btn-outline-blue {
          background: transparent;
          color: #0066cc;
          border: 2px solid #0066cc;
          padding: 8px 20px;
          border-radius: 999px;
          font-size: 0.9rem;
          font-weight: 700;
          text-decoration: none;
          display: inline-flex;
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
          transition: top 0.4s ease, border-radius 0.4s ease;
          z-index: 0;
          border-radius: 50% 50% 0 0 / 25px;
        }

        .btn-outline-blue:hover::before { top: 0; border-radius: 0; }
        .btn-outline-blue:hover { color: #ffffff; }
        .btn-outline-blue span, .btn-outline-blue i { position: relative; z-index: 1; transition: color 0.3s ease; }
      `}</style>
    </section>
  );
}
