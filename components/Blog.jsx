'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const PLACEHOLDER_POSTS = [
  {
    _id: '1',
    slug: 'ai-ml-pipelines-production',
    title: 'Understanding AI/ML Pipelines in Production',
    excerpt: 'A deep dive into how machine learning models are deployed and maintained in real-world applications, covering monitoring, retraining, and drift detection.',
    category: 'AI & ML',
    coverImage: '/netflix.jpg',
    createdAt: '2026-05-24T00:00:00Z',
  },
  {
    _id: '2',
    slug: 'fullstack-architecture-patterns',
    title: 'Scalable Full-Stack Application Architecture',
    excerpt: 'Key architectural decisions and patterns for ensuring your web applications can scale gracefully — from monolith to microservices.',
    category: 'Development',
    coverImage: '/dev-blog.png',
    createdAt: '2026-05-18T00:00:00Z',
  },
  {
    _id: '3',
    slug: 'my-journey-computer-science',
    title: 'My Journey in Computer Science',
    excerpt: 'Reflections, challenges, and lessons learned during my first two years of the B.Tech CSE program — and what drove me to specialize in AI/ML.',
    category: 'Career',
    coverImage: '/Policy.jpg',
    createdAt: '2026-05-10T00:00:00Z',
  },
];

const CATEGORY_COLORS = {
  'AI & ML': { bg: '#e6f0ff', color: '#0066cc' },
  'Development': { bg: '#f0fdf4', color: '#16a34a' },
  'Career': { bg: '#fef3e2', color: '#d97706' },
  'Cybersecurity': { bg: '#fef2f2', color: '#dc2626' },
};

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('/api/blog?limit=3');
        const data = await res.json();
        if (data.posts && data.posts.length > 0) {
          setPosts(data.posts);
        } else {
          setPosts(PLACEHOLDER_POSTS);
        }
      } catch {
        setPosts(PLACEHOLDER_POSTS);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <section id="blog" ref={sectionRef} style={{ padding: '5rem 5%', background: '#f4f7fa' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#ffffff', color: '#0066cc', border: '1px solid #b3d4ff', padding: '0.4rem 1rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
            <span style={{ width: 6, height: 6, background: '#0066cc', borderRadius: '50%', display: 'inline-block' }}></span>
            My Writing
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#2d3748', letterSpacing: '-0.03em', margin: 0 }}>Latest Articles</h2>
        </div>

        {/* Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>
            <div style={{ width: 36, height: 36, border: '3px solid #e2e8f0', borderTopColor: '#0066cc', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem' }}></div>
            Loading articles...
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {posts.map((post, i) => {
              const catStyle = CATEGORY_COLORS[post.category] || { bg: '#f1f5f9', color: '#475569' };
              return (
                <Link key={post._id} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                  <div
                    style={{
                      background: '#ffffff',
                      borderRadius: 20,
                      border: '1px solid #e2e8f0',
                      overflow: 'hidden',
                      transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                      transitionDelay: `${i * 0.12 + 0.2}s`,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
                  >
                    {/* Image */}
                    <div style={{ position: 'relative', height: 200, overflow: 'hidden', background: '#f8fafc' }}>
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                        onError={e => { e.target.onerror = null; e.target.src = '/EzyExplore.jpg'; }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                      />
                      {/* Category badge */}
                      <span style={{ position: 'absolute', top: '1rem', left: '1rem', background: catStyle.bg, color: catStyle.color, padding: '0.3rem 0.8rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {post.category}
                      </span>
                    </div>

                    {/* Body */}
                    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <div style={{ display: 'flex', gap: '1rem', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '0.8rem', flexWrap: 'wrap' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><i className="bi bi-calendar3"></i> {formatDate(post.createdAt)}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><i className="bi bi-eye"></i> {post.views || 0} views</span>
                      </div>

                      <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1e293b', lineHeight: 1.4, margin: '0 0 0.7rem 0' }}>{post.title}</h3>

                      <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6, flex: 1, margin: '0 0 1.2rem 0', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.excerpt}</p>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#0066cc', fontSize: '0.85rem', fontWeight: 700, marginTop: 'auto' }}>
                        Read Article <i className="bi bi-arrow-right"></i>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* View All Button */}
        <div style={{ textAlign: 'center', marginTop: '3rem', opacity: isVisible ? 1 : 0, transition: 'opacity 0.7s ease 0.6s' }}>
          <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 2rem', background: 'transparent', color: '#0066cc', border: '2px solid #0066cc', borderRadius: '999px', fontSize: '0.95rem', fontWeight: 700, textDecoration: 'none', transition: 'all 0.3s ease', position: 'relative', overflow: 'hidden' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#0066cc'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0066cc'; }}>
            <i className="bi bi-collection"></i>
            <span>View All Articles</span>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}
