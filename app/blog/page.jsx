'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const CATEGORY_COLORS = {
  'AI & ML':      { bg: '#e6f0ff', color: '#0066cc' },
  'Development':  { bg: '#f0fdf4', color: '#16a34a' },
  'Career':       { bg: '#fef3e2', color: '#d97706' },
  'Cybersecurity':{ bg: '#fef2f2', color: '#dc2626' },
  'General':      { bg: '#f1f5f9', color: '#475569' },
};

const FALLBACK_IMAGE = '/EzyExplore.jpg';

export default function BlogPage() {
  const [posts, setPosts]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter]   = useState('All');
  const [categories, setCategories] = useState(['All']);

  useEffect(() => {
    fetch('/api/blog?limit=20')
      .then((r) => r.json())
      .then((d) => {
        const list = d.posts || [];
        setPosts(list);
        const cats = ['All', ...new Set(list.map((p) => p.category).filter(Boolean))];
        setCategories(cats);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = filter === 'All' ? posts : posts.filter((p) => p.category === filter);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <main style={{ minHeight: '100vh', background: '#f4f7fa', fontFamily: 'var(--font-sans)' }}>

      {/* ── Top Nav Bar ── */}
      <div style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '1rem 5%', position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(10px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#0066cc', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            <i className="bi bi-arrow-left"></i> Back to Portfolio
          </Link>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 500 }}>
            {posts.length} article{posts.length !== 1 ? 's' : ''} published
          </span>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '4rem 5%' }}>

        {/* ── Page Header ── */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#ffffff', color: '#0066cc', border: '1px solid #b3d4ff', padding: '0.4rem 1rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
            <span style={{ width: 6, height: 6, background: '#0066cc', borderRadius: '50%', display: 'inline-block' }}></span>
            My Writing
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 900, color: '#2d3748', letterSpacing: '-0.03em', margin: '0 0 0.8rem 0' }}>
            All Articles
          </h1>
          <p style={{ fontSize: '1rem', color: '#64748b', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
            Thoughts on AI, full-stack development, and my journey in tech.
          </p>
        </div>

        {/* ── Category Filters ── */}
        {!loading && categories.length > 1 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.7rem', marginBottom: '3rem' }}>
            {categories.map((cat) => {
              const isActive = filter === cat;
              const style = CATEGORY_COLORS[cat] || CATEGORY_COLORS['General'];
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  style={{
                    padding: '0.45rem 1.2rem',
                    borderRadius: '999px',
                    border: isActive ? `2px solid ${style.color}` : '2px solid #e2e8f0',
                    background: isActive ? style.bg : '#ffffff',
                    color: isActive ? style.color : '#64748b',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = style.color; e.currentTarget.style.color = style.color; e.currentTarget.style.background = style.bg; }}}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#64748b'; e.currentTarget.style.background = '#ffffff'; }}}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        {/* ── States ── */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '5rem 2rem', color: '#94a3b8' }}>
            <div style={{ width: 40, height: 40, border: '3px solid #e2e8f0', borderTopColor: '#0066cc', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem' }}></div>
            Loading articles…
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '5rem 2rem', background: '#ffffff', borderRadius: 20, border: '1px solid #e2e8f0', color: '#94a3b8' }}>
            <i className="bi bi-pencil-square" style={{ fontSize: '3rem', color: '#0066cc', display: 'block', marginBottom: '1rem' }}></i>
            <p style={{ fontWeight: 700, color: '#1e293b', fontSize: '1.1rem', margin: '0 0 0.5rem' }}>No articles yet.</p>
            <p style={{ fontSize: '0.9rem' }}>Check back soon for new content!</p>
          </div>
        )}

        {/* ── Grid ── */}
        {!loading && filtered.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {filtered.map((post) => {
              const catStyle = CATEGORY_COLORS[post.category] || CATEGORY_COLORS['General'];
              return (
                <Link key={post._id} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                  <article
                    style={{ background: '#ffffff', borderRadius: 20, border: '1px solid #e2e8f0', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%', transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)', cursor: 'pointer' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 20px 48px rgba(0,0,0,0.09)'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
                  >
                    {/* Image */}
                    <div style={{ position: 'relative', height: 210, overflow: 'hidden', background: '#f8fafc', flexShrink: 0 }}>
                      <img
                        src={post.coverImage || FALLBACK_IMAGE}
                        alt={post.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                        onError={e => { e.target.onerror = null; e.target.src = FALLBACK_IMAGE; }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                      />
                      {/* Category badge */}
                      <span style={{ position: 'absolute', top: '1rem', left: '1rem', background: catStyle.bg, color: catStyle.color, padding: '0.3rem 0.8rem', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {post.category}
                      </span>
                    </div>

                    {/* Body */}
                    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      {/* Meta */}
                      <div style={{ display: 'flex', gap: '1rem', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '0.8rem', flexWrap: 'wrap' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <i className="bi bi-calendar3"></i> {formatDate(post.createdAt)}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <i className="bi bi-eye"></i> {post.views || 0} views
                        </span>
                      </div>

                      <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1e293b', lineHeight: 1.4, margin: '0 0 0.7rem 0' }}>{post.title}</h2>

                      <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6, flex: 1, margin: '0 0 1.3rem 0', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {post.excerpt}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#0066cc', fontSize: '0.85rem', fontWeight: 700, marginTop: 'auto' }}>
                        Read Article <i className="bi bi-arrow-right"></i>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </main>
  );
}
