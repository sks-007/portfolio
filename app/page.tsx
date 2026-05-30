import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Resume from '@/components/Resume';
import Projects from '@/components/Projects';
import Publications from '@/components/Publications';
import Certifications from '@/components/Certifications';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <div className="site-layout">
      <Header />
      <main className="main-content">
        <Hero />
        <About />
        <Resume />
        <Projects />
        <Publications />
        <Certifications />
        <Blog />
        <Contact />
        <footer className="site-footer">
          <p className="footer-text">
            © {new Date().getFullYear()} <strong>Sachin Kumar Singh</strong>.
          </p>
        </footer>
      </main>
    </div>
  );
}
