'use client';
import { useState, useEffect } from 'react';

const PRIMARY_LINKS = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About Me' },
  { href: '#resume', label: 'Resume' },
  { href: '#projects', label: 'Projects' },
  { href: '#blog', label: 'Blog' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className={`pill-header ${scrolled ? 'scrolled' : ''}`}>
      <nav className="pill-nav">
        
        {/* Navigation Links with Dot Separators */}
        <div className="nav-links">
          {PRIMARY_LINKS.map((link, index) => (
            <div key={link.href} className="nav-item">
              <a
                href={link.href}
                className="btn-liquid-link"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
              >
                <span>{link.label}</span>
              </a>
              {/* Dot Separator */}
              {index < PRIMARY_LINKS.length - 1 && (
                <span className="dot-separator">·</span>
              )}
            </div>
          ))}
        </div>

        {/* Liquid 'Let's Talk' CTA Button */}
        <a 
          href="#contact" 
          className="btn-liquid-orange"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('#contact');
          }}
        >
          <span>Let's Talk</span>
        </a>

      </nav>

      <style jsx>{`
        .pill-header {
          position: fixed;
          top: 25px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          z-index: 1000;
          transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
          pointer-events: none; 
        }

        .pill-header.scrolled {
          top: 10px;
        }

        .pill-nav {
          pointer-events: auto; 
          display: flex;
          align-items: center;
          background: #ffffff;
          padding: 6px 6px 6px 20px; /* Reduced padding for smaller size */
          border-radius: 999px;
          box-shadow: 0 10px 35px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.03);
          gap: 20px; /* Tighter gap */
          transition: all 0.3s ease;
          border: 1px solid rgba(0, 0, 0, 0.04);
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 15px; /* Tighter gap */
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 15px; /* Tighter gap */
        }

        /* Liquid Links */
        .btn-liquid-link {
          text-decoration: none;
          color: #333;
          font-weight: 500;
          font-size: 0.85rem; /* Smaller font size */
          padding: 6px 14px;
          border-radius: 999px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-liquid-link::before {
          content: '';
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          height: 100%;
          background: #ffede5; /* Very soft orange for hover */
          transition: top 0.35s cubic-bezier(0.19, 1, 0.22, 1), border-radius 0.35s cubic-bezier(0.19, 1, 0.22, 1);
          z-index: 0;
          border-radius: 50% 50% 0 0 / 20px;
        }

        .btn-liquid-link:hover::before {
          top: 0;
          border-radius: 0;
        }
        
        .btn-liquid-link:hover {
          color: #e64a19;
        }

        .btn-liquid-link span {
          position: relative;
          z-index: 1;
        }

        /* Dot Separators */
        .dot-separator {
          color: #ff5722;
          font-weight: bold;
          font-size: 1.1rem;
          line-height: 0;
          opacity: 0.7;
          transform: translateY(-2px);
        }

        /* Liquid 'Let's Talk' Button */
        .btn-liquid-orange {
          background: #ff5722; 
          color: white;
          padding: 10px 22px; /* Smaller padding */
          border-radius: 999px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.85rem; /* Smaller font size */
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(255, 87, 34, 0.25);
        }

        .btn-liquid-orange::before {
          content: '';
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          height: 100%;
          background: #e64a19;
          transition: top 0.4s cubic-bezier(0.19, 1, 0.22, 1), border-radius 0.4s cubic-bezier(0.19, 1, 0.22, 1);
          z-index: 0;
          border-radius: 50% 50% 0 0 / 25px;
        }

        .btn-liquid-orange:hover::before {
          top: 0;
          border-radius: 0;
        }

        .btn-liquid-orange:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(255, 87, 34, 0.35);
        }

        .btn-liquid-orange span {
          position: relative;
          z-index: 1;
        }
      `}</style>
    </header>
  );
}
