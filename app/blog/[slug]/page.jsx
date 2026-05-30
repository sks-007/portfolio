'use client';
import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function BlogPost({ params }) {
  const { slug } = use(params);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/blog/${slug}`)
      .then((r) => { if (r.status === 404) { setNotFound(true); setLoading(false); return null; } return r.json(); })
      .then((d) => { if (d) setPost(d.post); setLoading(false); })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '6rem 2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
      <div className="blog-spinner" style={{ margin: '0 auto 1rem' }}></div>
      Loading article...
    </main>
  );

  if (notFound || !post) return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '6rem 2rem', textAlign: 'center' }}>
      <i className="bi bi-emoji-frown" style={{ fontSize: '3rem', color: 'var(--accent)' }}></i>
      <h1 style={{ marginTop: '1rem', fontFamily: 'var(--font-heading)', color: 'var(--text)' }}>Article Not Found</h1>
      <Link href="/blog" className="btn btn-primary" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
        <i className="bi bi-arrow-left"></i> Back to Blog
      </Link>
    </main>
  );

  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '5rem 2rem 4rem' }}>
      <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', textDecoration: 'none', fontWeight: 600, marginBottom: '2.5rem', transition: 'var(--transition)' }}>
        <i className="bi bi-arrow-left"></i> All Articles
      </Link>

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span style={{ display: 'inline-block', background: 'var(--accent-soft)', color: 'var(--accent)', padding: '0.4rem 1rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem' }}>
          {post.category}
        </span>

        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, margin: '0 0 1.5rem 0', lineHeight: 1.15, color: 'var(--text)' }}>
          {post.title}
        </h1>

        <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-light)', fontSize: '0.95rem', justifyContent: 'center', flexWrap: 'wrap', fontWeight: 500 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <i className="bi bi-person-circle"></i> {post.author}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <i className="bi bi-calendar3"></i> {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <i className="bi bi-eye"></i> {post.views} views
          </span>
        </div>
      </div>

      {post.coverImage && (
        <div style={{ margin: '0 -2rem 3rem -2rem' }}>
          <img 
            src={post.coverImage} 
            alt={post.title} 
            style={{ width: '100%', height: 'auto', maxHeight: 450, objectFit: 'cover', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)' }} 
            onError={(e) => { 
              e.target.onerror = null; 
              e.target.src = '/EzyExplore.jpg'; 
            }}
          />
        </div>
      )}

      {/* RENDER MARKDOWN WITH .blog-content STYLES */}
      <div className="blog-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>

      <div style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <Link href="/blog" className="btn btn-ghost">
          <i className="bi bi-arrow-left"></i> <span>Back to Blog</span>
        </Link>
        <Link href="/" className="btn btn-primary">
          <i className="bi bi-person"></i> <span>View My Portfolio</span>
        </Link>
      </div>
    </main>
  );
}
