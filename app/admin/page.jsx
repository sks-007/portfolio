'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// ── Constants ─────────────────────────────────────────────────────────────
const NAV = [
  { id: 'dashboard', label: 'Dashboard',      icon: 'bi-speedometer2' },
  { id: 'messages',  label: 'Messages',        icon: 'bi-inbox' },
  { id: 'blog',      label: 'Blog Posts',      icon: 'bi-file-earmark-text' },
  { id: 'projects',  label: 'Projects',        icon: 'bi-grid-3x3-gap' },
  { id: 'certs',     label: 'Certifications',  icon: 'bi-patch-check' },
  { id: 'resume',    label: 'Resume',          icon: 'bi-file-person' },
];

const POST_CATS  = ['General', 'AI & ML', 'Development', 'Career', 'Cybersecurity'];
const PROJ_CATS  = [{ value: 'ai-ml', label: 'AI / ML' }, { value: 'web', label: 'Web Dev' }, { value: 'other', label: 'Other' }];
const CERT_ICONS = ['bi-patch-check', 'bi-cpu', 'bi-cloud-check', 'bi-graph-up-arrow', 'bi-filetype-py', 'bi-shield-check', 'bi-award', 'bi-stars', 'bi-mortarboard', 'bi-trophy', 'bi-robot', 'bi-code-slash'];

const CAT_BADGE = {
  'AI & ML':      { bg: '#e6f0ff', color: '#0066cc' },
  'Development':  { bg: '#f0fdf4', color: '#16a34a' },
  'Career':       { bg: '#fef3e2', color: '#d97706' },
  'Cybersecurity':{ bg: '#fef2f2', color: '#dc2626' },
  'General':      { bg: '#f1f5f9', color: '#475569' },
};

const fmtDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

// ── Design tokens (matches main site) ────────────────────────────────────
const T = {
  bg:       '#f4f7fa',
  surface:  '#ffffff',
  border:   '#e2e8f0',
  text:     '#1e293b',
  muted:    '#64748b',
  accent:   '#0066cc',
  accentBg: '#e6f0ff',
  sidebar:  '#ffffff',
};

const card = {
  background: T.surface,
  border: `1px solid ${T.border}`,
  borderRadius: 16,
  padding: '1.5rem',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
};

const lbl = {
  display: 'block',
  fontSize: '0.73rem',
  fontWeight: 700,
  color: T.muted,
  textTransform: 'uppercase',
  letterSpacing: '0.07em',
  marginBottom: '0.4rem',
};

const baseInp = {
  width: '100%',
  padding: '0.75rem 1rem',
  border: `1.5px solid ${T.border}`,
  borderRadius: 10,
  background: '#f8fafc',
  color: T.text,
  fontFamily: 'Inter, sans-serif',
  fontSize: '0.92rem',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s, box-shadow 0.2s, background 0.2s',
};

const focusStyle = (e) => {
  e.target.style.borderColor = T.accent;
  e.target.style.boxShadow = '0 0 0 3px rgba(0,102,204,0.1)';
  e.target.style.background = '#fff';
};
const blurStyle = (e) => {
  e.target.style.borderColor = T.border;
  e.target.style.boxShadow = 'none';
  e.target.style.background = '#f8fafc';
};

function Inp(props) {
  return <input {...props} style={{ ...baseInp, ...props.style }} onFocus={focusStyle} onBlur={blurStyle} />;
}
function Txa(props) {
  return <textarea {...props} style={{ ...baseInp, resize: 'vertical', ...props.style }} onFocus={focusStyle} onBlur={blurStyle} />;
}
function Sel({ children, ...props }) {
  return (
    <select {...props} style={{ ...baseInp, cursor: 'pointer', ...props.style }} onFocus={focusStyle} onBlur={blurStyle}>
      {children}
    </select>
  );
}

function PrimaryBtn({ children, disabled, style, ...props }) {
  return (
    <button disabled={disabled} {...props}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.75rem 1.6rem', background: disabled ? '#cbd5e1' : T.accent, color: '#fff', border: 'none', borderRadius: 999, fontWeight: 700, fontSize: '0.9rem', cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: 'inherit', boxShadow: disabled ? 'none' : '0 4px 12px rgba(0,102,204,0.25)', transition: 'all 0.2s', ...style }}>
      {children}
    </button>
  );
}

function StatusBanner({ status }) {
  if (!status) return null;
  return (
    <div style={{ marginTop: '0.75rem', padding: '0.8rem 1rem', borderRadius: 10, fontSize: '0.88rem', fontWeight: 600, background: status.ok ? '#f0fdf4' : '#fef2f2', color: status.ok ? '#16a34a' : '#dc2626', border: `1px solid ${status.ok ? '#bbf7d0' : '#fecaca'}` }}>
      {status.text}
    </div>
  );
}

function SubTabs({ view, setView, tabs }) {
  return (
    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => setView(t.id)}
          style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', padding: '0.55rem 1.2rem', borderRadius: 999, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.87rem', fontFamily: 'inherit', transition: 'all 0.2s', background: view === t.id ? T.accent : T.surface, color: view === t.id ? '#fff' : T.muted, border: view === t.id ? 'none' : `1px solid ${T.border}`, boxShadow: view === t.id ? '0 4px 12px rgba(0,102,204,0.2)' : 'none' }}>
          <i className={`bi ${t.icon}`}></i> {t.label}
        </button>
      ))}
    </div>
  );
}

function Spinner() {
  return (
    <div style={{ textAlign: 'center', padding: '3rem', color: T.muted }}>
      <div style={{ width: 32, height: 32, border: `3px solid ${T.border}`, borderTopColor: T.accent, borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 0.75rem' }}></div>
      Loading…
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
export default function AdminPage() {
  const [tab, setTab]       = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);

  // Blog
  const [posts, setPosts]           = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [blogView, setBlogView]     = useState('list');
  const [newPost, setNewPost]       = useState({ title: '', slug: '', excerpt: '', category: 'General', coverImage: '', author: 'Sachin Kumar Singh', content: '' });
  const [postStatus, setPostStatus] = useState(null);
  const [postBusy, setPostBusy]     = useState(false);

  // Messages
  const [messages, setMessages]     = useState([]);
  const [msgLoading, setMsgLoading] = useState(true);
  const [selMsg, setSelMsg]         = useState(null);

  // Projects
  const [projects, setProjects]     = useState([]);
  const [projLoading, setProjLoading] = useState(true);
  const [projView, setProjView]     = useState('list');
  const [newProj, setNewProj]       = useState({ name: '', category: 'ai-ml', categoryLabel: 'AI / ML', desc: '', tags: '', image: '', github: '', demo: '' });
  const [projStatus, setProjStatus] = useState(null);
  const [projBusy, setProjBusy]     = useState(false);

  // Certifications
  const [certs, setCerts]           = useState([]);
  const [certLoading, setCertLoading] = useState(true);
  const [certView, setCertView]     = useState('list');
  const [newCert, setNewCert]       = useState({ name: '', issuer: '', date: '', desc: '', link: '', icon: 'bi-patch-check' });
  const [certStatus, setCertStatus] = useState(null);
  const [certBusy, setCertBusy]     = useState(false);

  // Resume
  const [resumeUrl, setResumeUrl]   = useState('/Sachin_Kumar_Singh_Resume.pdf');
  const [newUrl, setNewUrl]         = useState('');
  const [resumeStatus, setResumeStatus] = useState(null);

  // ── Fetchers ─────────────────────────────────────────────────────────
  const fetchPosts    = () => { setPostsLoading(true);  fetch('/api/blog?limit=50').then(r=>r.json()).then(d=>{ setPosts(d.posts||[]); setPostsLoading(false); }).catch(()=>setPostsLoading(false)); };
  const fetchMsgs     = () => { setMsgLoading(true);    fetch('/api/contact').then(r=>r.json()).then(d=>{ setMessages(d.messages||[]); setMsgLoading(false); }).catch(()=>setMsgLoading(false)); };
  const fetchProjects = () => { setProjLoading(true);   fetch('/api/projects').then(r=>r.json()).then(d=>{ setProjects(d.projects||[]); setProjLoading(false); }).catch(()=>setProjLoading(false)); };
  const fetchCerts    = () => { setCertLoading(true);   fetch('/api/certifications').then(r=>r.json()).then(d=>{ setCerts(d.certifications||[]); setCertLoading(false); }).catch(()=>setCertLoading(false)); };
  const fetchResume   = () => { fetch('/api/resume').then(r=>r.json()).then(d=>setResumeUrl(d.resumeUrl||'/Sachin_Kumar_Singh_Resume.pdf')).catch(()=>{}); };

  useEffect(() => { fetchPosts(); fetchMsgs(); fetchProjects(); fetchCerts(); fetchResume(); }, []);

  // ── Submit: Blog ──────────────────────────────────────────────────────
  const submitPost = async (e) => {
    e.preventDefault(); setPostBusy(true); setPostStatus(null);
    try {
      const res = await fetch('/api/blog', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newPost) });
      const d = await res.json();
      if (res.ok) { setPostStatus({ ok: true, text: `✅ "${newPost.title}" published!` }); setNewPost({ title:'',slug:'',excerpt:'',category:'General',coverImage:'',author:'Sachin Kumar Singh',content:'' }); fetchPosts(); setTimeout(()=>setBlogView('list'),1500); }
      else setPostStatus({ ok: false, text: `❌ ${d.error}` });
    } catch { setPostStatus({ ok: false, text: '❌ Network error.' }); }
    finally { setPostBusy(false); }
  };

  // ── Submit: Project ───────────────────────────────────────────────────
  const submitProj = async (e) => {
    e.preventDefault(); setProjBusy(true); setProjStatus(null);
    try {
      const res = await fetch('/api/projects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newProj) });
      const d = await res.json();
      if (res.ok) { setProjStatus({ ok: true, text: `✅ "${newProj.name}" added!` }); setNewProj({ name:'',category:'ai-ml',categoryLabel:'AI / ML',desc:'',tags:'',image:'',github:'',demo:'' }); fetchProjects(); setTimeout(()=>setProjView('list'),1500); }
      else setProjStatus({ ok: false, text: `❌ ${d.error}` });
    } catch { setProjStatus({ ok: false, text: '❌ Network error.' }); }
    finally { setProjBusy(false); }
  };

  const deleteProj = async (id) => {
    if (!confirm('Delete this project?')) return;
    await fetch('/api/projects', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    fetchProjects();
  };

  // ── Submit: Cert ──────────────────────────────────────────────────────
  const submitCert = async (e) => {
    e.preventDefault(); setCertBusy(true); setCertStatus(null);
    try {
      const res = await fetch('/api/certifications', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newCert) });
      const d = await res.json();
      if (res.ok) { setCertStatus({ ok: true, text: `✅ "${newCert.name}" added!` }); setNewCert({ name:'',issuer:'',date:'',desc:'',link:'',icon:'bi-patch-check' }); fetchCerts(); setTimeout(()=>setCertView('list'),1500); }
      else setCertStatus({ ok: false, text: `❌ ${d.error}` });
    } catch { setCertStatus({ ok: false, text: '❌ Network error.' }); }
    finally { setCertBusy(false); }
  };

  const deleteCert = async (id) => {
    if (!confirm('Delete this certification?')) return;
    await fetch('/api/certifications', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    fetchCerts();
  };

  // ── Submit: Resume ────────────────────────────────────────────────────
  const saveResume = async (e) => {
    e.preventDefault(); setResumeStatus(null);
    try {
      const res = await fetch('/api/resume', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ resumeUrl: newUrl }) });
      if (res.ok) { setResumeStatus({ ok: true, text: '✅ Resume URL updated!' }); setResumeUrl(newUrl); setNewUrl(''); }
      else setResumeStatus({ ok: false, text: '❌ Failed to update.' });
    } catch { setResumeStatus({ ok: false, text: '❌ Network error.' }); }
  };

  // ── Stats ─────────────────────────────────────────────────────────────
  const totalViews = posts.reduce((a,p)=>a+(p.views||0),0);
  const STATS = [
    { label: 'Blog Posts',     value: posts.length,    icon: 'bi-file-earmark-text', color: '#0066cc', bg: '#e6f0ff' },
    { label: 'Total Views',    value: totalViews,       icon: 'bi-eye',               color: '#16a34a', bg: '#f0fdf4' },
    { label: 'Messages',       value: messages.length,  icon: 'bi-inbox',             color: '#d97706', bg: '#fef3e2' },
    { label: 'Projects',       value: projects.length,  icon: 'bi-grid-3x3-gap',      color: '#9333ea', bg: '#fdf4ff' },
    { label: 'Certifications', value: certs.length,     icon: 'bi-patch-check',       color: '#0e7490', bg: '#ecfeff' },
  ];

  // ─────────────────────────────────────────────────────────────────────
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: T.bg, fontFamily: 'Inter, sans-serif', color: T.text }}>

      {/* ══ SIDEBAR ════════════════════════════════════════════════════════ */}
      <aside style={{ width: collapsed ? 64 : 236, background: T.sidebar, borderRight: `1px solid ${T.border}`, display: 'flex', flexDirection: 'column', flexShrink: 0, transition: 'width 0.3s cubic-bezier(0.16,1,0.3,1)', overflow: 'hidden', boxShadow: '2px 0 8px rgba(0,0,0,0.04)' }}>

        {/* Logo */}
        <div style={{ padding: '1.2rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: `1px solid ${T.border}` }}>
          <div style={{ width: 38, height: 38, background: 'linear-gradient(135deg,#0066cc,#40a9ff)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0, boxShadow: '0 4px 10px rgba(0,102,204,0.3)' }}>
            <i className="bi bi-shield-lock" style={{ color: '#fff' }}></i>
          </div>
          {!collapsed && (
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: T.text, whiteSpace: 'nowrap' }}>Admin Panel</div>
              <div style={{ fontSize: '0.7rem', color: T.muted, whiteSpace: 'nowrap' }}>Portfolio CMS</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '0.6rem 0.5rem', display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
          {NAV.map(n => (
            <button key={n.id} onClick={() => setTab(n.id)} title={collapsed ? n.label : ''}
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.68rem 0.85rem', borderRadius: 10, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.88rem', fontFamily: 'inherit', textAlign: 'left', width: '100%', whiteSpace: 'nowrap', transition: 'all 0.2s', background: tab === n.id ? T.accentBg : 'transparent', color: tab === n.id ? T.accent : T.muted }}
              onMouseEnter={e => { if (tab !== n.id) e.currentTarget.style.background = '#f1f5f9'; }}
              onMouseLeave={e => { if (tab !== n.id) e.currentTarget.style.background = 'transparent'; }}>
              <i className={`bi ${n.icon}`} style={{ fontSize: '1.05rem', flexShrink: 0 }}></i>
              {!collapsed && (
                <>
                  <span style={{ flex: 1 }}>{n.label}</span>
                  {tab === n.id && <div style={{ width: 3, height: 18, background: T.accent, borderRadius: 2 }}></div>}
                </>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div style={{ padding: '0.6rem 0.5rem', borderTop: `1px solid ${T.border}`, display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0.85rem', borderRadius: 10, textDecoration: 'none', color: T.muted, fontSize: '0.85rem', fontWeight: 600, whiteSpace: 'nowrap', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = T.accent} onMouseLeave={e => e.currentTarget.style.color = T.muted}>
            <i className="bi bi-arrow-left" style={{ flexShrink: 0 }}></i>
            {!collapsed && 'Back to Site'}
          </Link>
          <button onClick={() => setCollapsed(c => !c)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0.85rem', borderRadius: 10, border: 'none', cursor: 'pointer', background: 'transparent', color: T.muted, fontSize: '0.85rem', fontWeight: 600, fontFamily: 'inherit', whiteSpace: 'nowrap', textAlign: 'left', width: '100%', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = T.accent} onMouseLeave={e => e.currentTarget.style.color = T.muted}>
            <i className={`bi bi-layout-sidebar${collapsed ? '-reverse' : ''}`} style={{ flexShrink: 0 }}></i>
            {!collapsed && 'Collapse'}
          </button>
        </div>
      </aside>

      {/* ══ MAIN ═══════════════════════════════════════════════════════════ */}
      <main style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>

        {/* Top Bar */}
        <div style={{ padding: '1rem 2rem', borderBottom: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: T.surface, position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div>
            <h1 style={{ fontSize: '1.1rem', fontWeight: 800, color: T.text, margin: 0 }}>{NAV.find(n => n.id === tab)?.label}</h1>
            <p style={{ fontSize: '0.72rem', color: T.muted, margin: 0 }}>Sachin Kumar Singh · Portfolio Admin</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Link href="/" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 1rem', background: '#f1f5f9', color: T.muted, borderRadius: 999, fontSize: '0.82rem', fontWeight: 700, textDecoration: 'none', border: `1px solid ${T.border}` }}>
              <i className="bi bi-box-arrow-up-right"></i> View Site
            </Link>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#0066cc,#40a9ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '0.9rem', boxShadow: '0 4px 10px rgba(0,102,204,0.3)' }}>S</div>
          </div>
        </div>

        <div style={{ padding: '2rem', flex: 1 }}>

          {/* ══ DASHBOARD ════════════════════════════════════════════════ */}
          {tab === 'dashboard' && (
            <div>
              {/* Stat Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(175px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {STATS.map(s => (
                  <div key={s.label} style={{ ...card, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: s.bg, color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>
                      <i className={`bi ${s.icon}`}></i>
                    </div>
                    <div>
                      <div style={{ fontSize: '1.8rem', fontWeight: 900, color: T.text, lineHeight: 1 }}>{s.value}</div>
                      <div style={{ fontSize: '0.73rem', color: T.muted, fontWeight: 600, marginTop: 3 }}>{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <p style={{ fontSize: '0.73rem', fontWeight: 700, color: T.muted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>Quick Actions</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(185px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {[
                  { label: 'Write New Post',    icon: 'bi-plus-circle',  color: '#0066cc', fn: () => { setTab('blog');     setBlogView('new'); } },
                  { label: 'Add Project',       icon: 'bi-plus-square',  color: '#9333ea', fn: () => { setTab('projects'); setProjView('new'); } },
                  { label: 'Add Certification', icon: 'bi-award',        color: '#0e7490', fn: () => { setTab('certs');    setCertView('new'); } },
                  { label: 'Update Resume',     icon: 'bi-cloud-upload', color: '#d97706', fn: () =>   setTab('resume') },
                ].map(a => (
                  <button key={a.label} onClick={a.fn}
                    style={{ ...card, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.8rem', color: a.color, fontWeight: 700, fontSize: '0.9rem', fontFamily: 'inherit', textAlign: 'left', border: `1px solid ${a.color}25`, transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = a.color + '0d'; e.currentTarget.style.borderColor = a.color + '60'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = T.surface; e.currentTarget.style.borderColor = a.color + '25'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                    <i className={`bi ${a.icon}`} style={{ fontSize: '1.25rem' }}></i>
                    {a.label}
                  </button>
                ))}
              </div>

              {/* Recent Posts */}
              <p style={{ fontSize: '0.73rem', fontWeight: 700, color: T.muted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>Recent Blog Posts</p>
              <div style={{ ...card, padding: 0, overflow: 'hidden' }}>
                {posts.slice(0, 5).map((p, i) => {
                  const cs = CAT_BADGE[p.category] || CAT_BADGE['General'];
                  return (
                    <div key={p._id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.9rem 1.5rem', borderBottom: i < Math.min(posts.length, 5) - 1 ? `1px solid ${T.border}` : 'none' }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</div>
                        <div style={{ fontSize: '0.73rem', color: T.muted, marginTop: 2 }}>{fmtDate(p.createdAt)}</div>
                      </div>
                      <span style={{ padding: '0.2rem 0.65rem', borderRadius: 999, fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', background: cs.bg, color: cs.color, flexShrink: 0 }}>{p.category}</span>
                      <span style={{ fontSize: '0.8rem', color: T.muted, display: 'flex', alignItems: 'center', gap: 3, flexShrink: 0 }}><i className="bi bi-eye"></i> {p.views || 0}</span>
                    </div>
                  );
                })}
                {posts.length === 0 && <div style={{ padding: '2rem', textAlign: 'center', color: T.muted }}>No posts yet.</div>}
              </div>
            </div>
          )}

          {/* ══ MESSAGES ═════════════════════════════════════════════════ */}
          {tab === 'messages' && (
            <div style={{ display: 'grid', gridTemplateColumns: selMsg ? '1fr 1fr' : '1fr', gap: '1.5rem' }}>
              <div style={{ ...card, padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '1rem 1.5rem', borderBottom: `1px solid ${T.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 800 }}>Inbox ({messages.length})</span>
                  <button onClick={fetchMsgs} style={{ background: '#f1f5f9', border: `1px solid ${T.border}`, borderRadius: 8, padding: '0.35rem 0.75rem', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, color: T.muted, display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'inherit' }}>
                    <i className="bi bi-arrow-clockwise"></i> Refresh
                  </button>
                </div>
                {msgLoading ? <Spinner /> : messages.length === 0 ? (
                  <div style={{ padding: '3rem', textAlign: 'center', color: T.muted }}>
                    <i className="bi bi-inbox" style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.75rem', color: '#cbd5e1' }}></i>
                    No messages yet.
                  </div>
                ) : messages.map((m, i) => (
                  <div key={m.id} onClick={() => setSelMsg(m)}
                    style={{ padding: '1rem 1.5rem', borderBottom: i < messages.length - 1 ? `1px solid #f8fafc` : 'none', cursor: 'pointer', transition: 'background 0.2s', background: selMsg?.id === m.id ? T.accentBg : 'transparent' }}
                    onMouseEnter={e => { if (selMsg?.id !== m.id) e.currentTarget.style.background = '#f8fafc'; }}
                    onMouseLeave={e => { if (selMsg?.id !== m.id) e.currentTarget.style.background = 'transparent'; }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                      <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{m.name}</span>
                      <span style={{ fontSize: '0.72rem', color: T.muted }}>{fmtDate(m.created_at)}</span>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: T.accent, fontWeight: 600, marginBottom: 2 }}>{m.subject}</div>
                    <div style={{ fontSize: '0.78rem', color: T.muted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.message}</div>
                  </div>
                ))}
              </div>

              {selMsg && (
                <div style={{ ...card }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                    <h3 style={{ margin: 0, fontWeight: 800, fontSize: '1rem' }}>{selMsg.subject}</h3>
                    <button onClick={() => setSelMsg(null)} style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: 30, height: 30, cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.muted }}>×</button>
                  </div>
                  {[['From', selMsg.name], ['Email', selMsg.email], ['Date', fmtDate(selMsg.created_at)]].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', gap: '1rem', padding: '0.6rem 0', borderBottom: `1px solid #f1f5f9` }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: T.muted, textTransform: 'uppercase', letterSpacing: '0.07em', minWidth: 40, paddingTop: 2 }}>{k}</span>
                      <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{v}</span>
                    </div>
                  ))}
                  <div style={{ background: '#f8fafc', borderRadius: 10, padding: '1rem', fontSize: '0.92rem', color: T.muted, lineHeight: 1.7, margin: '1.25rem 0' }}>{selMsg.message}</div>
                  <a href={`mailto:${selMsg.email}?subject=Re: ${selMsg.subject}`}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.7rem 1.4rem', background: T.accent, color: '#fff', borderRadius: 999, textDecoration: 'none', fontWeight: 700, fontSize: '0.88rem', boxShadow: '0 4px 12px rgba(0,102,204,0.25)' }}>
                    <i className="bi bi-reply"></i> Reply via Email
                  </a>
                </div>
              )}
            </div>
          )}

          {/* ══ BLOG ═════════════════════════════════════════════════════ */}
          {tab === 'blog' && (
            <div>
              <SubTabs view={blogView} setView={setBlogView}
                tabs={[{ id: 'list', label: 'All Posts', icon: 'bi-list-ul' }, { id: 'new', label: 'Write New Post', icon: 'bi-plus-circle' }]} />

              {blogView === 'list' && (
                <div style={{ ...card, padding: 0, overflow: 'hidden' }}>
                  <div style={{ padding: '1rem 1.5rem', borderBottom: `1px solid ${T.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 800 }}>All Articles ({posts.length})</span>
                    <button onClick={fetchPosts} style={{ background: '#f1f5f9', border: `1px solid ${T.border}`, borderRadius: 8, padding: '0.35rem 0.75rem', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, color: T.muted, display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'inherit' }}>
                      <i className="bi bi-arrow-clockwise"></i> Refresh
                    </button>
                  </div>
                  {postsLoading ? <Spinner /> : posts.length === 0 ? (
                    <div style={{ padding: '2.5rem', textAlign: 'center', color: T.muted }}>
                      No posts yet. <button onClick={() => setBlogView('new')} style={{ color: T.accent, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, fontFamily: 'inherit' }}>Write your first →</button>
                    </div>
                  ) : posts.map((p, i) => {
                    const cs = CAT_BADGE[p.category] || CAT_BADGE['General'];
                    return (
                      <div key={p._id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.9rem 1.5rem', borderBottom: i < posts.length - 1 ? `1px solid #f8fafc` : 'none' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: 700, fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</div>
                          <div style={{ fontSize: '0.73rem', color: T.muted, marginTop: 2, fontFamily: 'monospace' }}>/{p.slug}</div>
                        </div>
                        <span style={{ padding: '0.2rem 0.65rem', borderRadius: 999, fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', background: cs.bg, color: cs.color, flexShrink: 0 }}>{p.category}</span>
                        <span style={{ fontSize: '0.78rem', color: T.muted, display: 'flex', alignItems: 'center', gap: 3, flexShrink: 0 }}><i className="bi bi-eye"></i> {p.views || 0}</span>
                        <Link href={`/blog/${p.slug}`} target="_blank" style={{ padding: '0.3rem 0.7rem', background: T.accentBg, color: T.accent, borderRadius: 8, fontSize: '0.78rem', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 3, flexShrink: 0 }}>
                          <i className="bi bi-box-arrow-up-right"></i> View
                        </Link>
                      </div>
                    );
                  })}
                </div>
              )}

              {blogView === 'new' && (
                <div style={{ ...card, maxWidth: 860 }}>
                  <h3 style={{ margin: '0 0 1.5rem', fontWeight: 800 }}>Write a New Article</h3>
                  <form onSubmit={submitPost}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div><label style={lbl}>Title *</label><Inp name="title" value={newPost.title} onChange={e => setNewPost(p => ({ ...p, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') }))} required placeholder="Article title…" /></div>
                      <div><label style={lbl}>Slug (auto-generated)</label><Inp name="slug" value={newPost.slug} onChange={e => setNewPost(p => ({ ...p, slug: e.target.value }))} required style={{ fontFamily: 'monospace', fontSize: '0.82rem' }} /></div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div><label style={lbl}>Category</label><Sel value={newPost.category} onChange={e => setNewPost(p => ({ ...p, category: e.target.value }))}>{POST_CATS.map(c => <option key={c}>{c}</option>)}</Sel></div>
                      <div><label style={lbl}>Cover Image URL</label><Inp value={newPost.coverImage} onChange={e => setNewPost(p => ({ ...p, coverImage: e.target.value }))} placeholder="https://… or /image.jpg" /></div>
                    </div>
                    <div style={{ marginBottom: '1rem' }}><label style={lbl}>Excerpt *</label><Txa value={newPost.excerpt} onChange={e => setNewPost(p => ({ ...p, excerpt: e.target.value }))} required rows={3} placeholder="Short summary shown on article cards…" /></div>
                    <div style={{ marginBottom: '1.5rem' }}><label style={lbl}>Content (Markdown) *</label><Txa value={newPost.content} onChange={e => setNewPost(p => ({ ...p, content: e.target.value }))} required rows={14} style={{ fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: 1.6 }} placeholder={'## Introduction\n\nWrite in **Markdown**…'} /></div>
                    <PrimaryBtn type="submit" disabled={postBusy}>{postBusy ? <><i className="bi bi-hourglass-split"></i> Publishing…</> : <><i className="bi bi-send-fill"></i> Publish Article</>}</PrimaryBtn>
                    <StatusBanner status={postStatus} />
                  </form>
                </div>
              )}
            </div>
          )}

          {/* ══ PROJECTS ═════════════════════════════════════════════════ */}
          {tab === 'projects' && (
            <div>
              <SubTabs view={projView} setView={setProjView}
                tabs={[{ id: 'list', label: `All Projects (${projects.length})`, icon: 'bi-list-ul' }, { id: 'new', label: 'Add Project', icon: 'bi-plus-circle' }]} />

              {projView === 'list' && (
                projLoading ? <Spinner /> : projects.length === 0 ? (
                  <div style={{ ...card, textAlign: 'center', padding: '3rem', color: T.muted }}>
                    <i className="bi bi-grid-3x3-gap" style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.75rem', color: '#cbd5e1' }}></i>
                    No projects yet. <button onClick={() => setProjView('new')} style={{ color: T.accent, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, fontFamily: 'inherit' }}>Add one →</button>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {projects.map(p => (
                      <div key={p.id} style={{ ...card, position: 'relative', transition: 'all 0.25s ease' }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.09)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)'; }}>
                        {/* Top accent bar */}
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#0066cc,#40a9ff)', borderRadius: '16px 16px 0 0' }}></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', paddingTop: '0.25rem' }}>
                          <span style={{ padding: '0.25rem 0.7rem', borderRadius: 999, fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', background: T.accentBg, color: T.accent }}>
                            {p.categoryLabel || p.category}
                          </span>
                          <button onClick={() => deleteProj(p.id)} title="Delete project"
                            style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, width: 32, height: 32, cursor: 'pointer', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', flexShrink: 0, transition: 'all 0.2s' }}
                            onMouseEnter={e => { e.currentTarget.style.background = '#dc2626'; e.currentTarget.style.color = '#fff'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = '#fef2f2'; e.currentTarget.style.color = '#dc2626'; }}>
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                        <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: T.text, lineHeight: 1.4, margin: '0 0 0.5rem' }}>{p.name}</h3>
                        <p style={{ fontSize: '0.85rem', color: T.muted, lineHeight: 1.6, margin: '0 0 0.75rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.desc}</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '1rem' }}>
                          {(Array.isArray(p.tags) ? p.tags : (p.tags||'').split(',').map(t=>t.trim()).filter(Boolean)).map(t => (
                            <span key={t} style={{ padding: '0.15rem 0.5rem', background: '#f1f5f9', color: '#475569', borderRadius: 6, fontSize: '0.72rem', fontWeight: 600 }}>{t}</span>
                          ))}
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', padding: '0.4rem 0.8rem', background: '#1e293b', color: '#fff', borderRadius: 8, fontSize: '0.78rem', fontWeight: 700, textDecoration: 'none' }}><i className="bi bi-github"></i> GitHub</a>}
                          {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', padding: '0.4rem 0.8rem', background: T.accentBg, color: T.accent, borderRadius: 8, fontSize: '0.78rem', fontWeight: 700, textDecoration: 'none' }}><i className="bi bi-box-arrow-up-right"></i> Demo</a>}
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}

              {projView === 'new' && (
                <div style={{ ...card, maxWidth: 720 }}>
                  <h3 style={{ margin: '0 0 1.5rem', fontWeight: 800 }}>Add a New Project</h3>
                  <form onSubmit={submitProj}>
                    <div style={{ marginBottom: '1rem' }}><label style={lbl}>Project Name *</label><Inp value={newProj.name} onChange={e => setNewProj(p => ({ ...p, name: e.target.value }))} required placeholder="e.g. Netflix Recommendation System" /></div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div><label style={lbl}>Category *</label>
                        <Sel value={newProj.category} onChange={e => { const c = PROJ_CATS.find(x => x.value === e.target.value); setNewProj(p => ({ ...p, category: e.target.value, categoryLabel: c?.label || e.target.value })); }}>
                          {PROJ_CATS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                        </Sel>
                      </div>
                      <div><label style={lbl}>Tech Stack * (comma-separated)</label><Inp value={newProj.tags} onChange={e => setNewProj(p => ({ ...p, tags: e.target.value }))} placeholder="Python, React, MongoDB…" /></div>
                    </div>
                    <div style={{ marginBottom: '1rem' }}><label style={lbl}>Description</label><Txa value={newProj.desc} onChange={e => setNewProj(p => ({ ...p, desc: e.target.value }))} rows={3} placeholder="Brief description of what the project does…" /></div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div><label style={lbl}>Image Path</label><Inp value={newProj.image} onChange={e => setNewProj(p => ({ ...p, image: e.target.value }))} placeholder="/myproject.jpg" /></div>
                      <div><label style={lbl}>GitHub URL</label><Inp value={newProj.github} onChange={e => setNewProj(p => ({ ...p, github: e.target.value }))} placeholder="https://github.com/…" /></div>
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}><label style={lbl}>Live Demo URL</label><Inp value={newProj.demo} onChange={e => setNewProj(p => ({ ...p, demo: e.target.value }))} placeholder="https://…" /></div>
                    <PrimaryBtn type="submit" disabled={projBusy}>{projBusy ? <><i className="bi bi-hourglass-split"></i> Adding…</> : <><i className="bi bi-plus-circle-fill"></i> Add Project</>}</PrimaryBtn>
                    <StatusBanner status={projStatus} />
                  </form>
                </div>
              )}
            </div>
          )}

          {/* ══ CERTIFICATIONS ═══════════════════════════════════════════ */}
          {tab === 'certs' && (
            <div>
              <SubTabs view={certView} setView={setCertView}
                tabs={[{ id: 'list', label: `All Certifications (${certs.length})`, icon: 'bi-list-ul' }, { id: 'new', label: 'Add Certification', icon: 'bi-plus-circle' }]} />

              {certView === 'list' && (
                certLoading ? <Spinner /> : certs.length === 0 ? (
                  <div style={{ ...card, textAlign: 'center', padding: '3rem', color: T.muted }}>
                    <i className="bi bi-patch-check" style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.75rem', color: '#cbd5e1' }}></i>
                    No certifications yet. <button onClick={() => setCertView('new')} style={{ color: T.accent, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, fontFamily: 'inherit' }}>Add one →</button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {certs.map(c => (
                      <div key={c.id} style={{ ...card, display: 'flex', alignItems: 'center', gap: '1.5rem', transition: 'all 0.25s ease' }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.07)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)'; }}>
                        <div style={{ width: 52, height: 52, borderRadius: 14, background: c.color || T.accentBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: c.iconColor || T.accent, flexShrink: 0 }}>
                          <i className={`bi ${c.icon}`}></i>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.25rem' }}>{c.name}</div>
                          <div style={{ display: 'flex', gap: '1.2rem', fontSize: '0.8rem', color: T.muted }}>
                            <span><i className="bi bi-building"></i> {c.issuer}</span>
                            <span><i className="bi bi-calendar3"></i> {c.date}</span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                          {c.link && (
                            <a href={c.link} target="_blank" rel="noopener noreferrer"
                              style={{ padding: '0.4rem 0.8rem', background: T.accentBg, color: T.accent, borderRadius: 8, fontSize: '0.78rem', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 3 }}>
                              <i className="bi bi-arrow-up-right"></i> View
                            </a>
                          )}
                          <button onClick={() => deleteCert(c.id)} title="Delete certification"
                            style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, width: 34, height: 34, cursor: 'pointer', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', transition: 'all 0.2s' }}
                            onMouseEnter={e => { e.currentTarget.style.background = '#dc2626'; e.currentTarget.style.color = '#fff'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = '#fef2f2'; e.currentTarget.style.color = '#dc2626'; }}>
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}

              {certView === 'new' && (
                <div style={{ ...card, maxWidth: 680 }}>
                  <h3 style={{ margin: '0 0 1.5rem', fontWeight: 800 }}>Add a Certification</h3>
                  <form onSubmit={submitCert}>
                    <div style={{ marginBottom: '1rem' }}><label style={lbl}>Certification Name *</label><Inp value={newCert.name} onChange={e => setNewCert(c => ({ ...c, name: e.target.value }))} required placeholder="e.g. AWS Certified Developer" /></div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div><label style={lbl}>Issuing Organization *</label><Inp value={newCert.issuer} onChange={e => setNewCert(c => ({ ...c, issuer: e.target.value }))} required placeholder="AWS, Google, Coursera…" /></div>
                      <div><label style={lbl}>Date Issued</label><Inp value={newCert.date} onChange={e => setNewCert(c => ({ ...c, date: e.target.value }))} placeholder="e.g. Jan 2025" /></div>
                    </div>

                    {/* Icon picker */}
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={lbl}>Icon</label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {CERT_ICONS.map(ic => (
                          <button type="button" key={ic} title={ic} onClick={() => setNewCert(c => ({ ...c, icon: ic }))}
                            style={{ width: 42, height: 42, borderRadius: 10, border: `2px solid ${newCert.icon === ic ? T.accent : T.border}`, background: newCert.icon === ic ? T.accentBg : '#f8fafc', color: newCert.icon === ic ? T.accent : T.muted, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', transition: 'all 0.15s' }}>
                            <i className={`bi ${ic}`}></i>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div style={{ marginBottom: '1rem' }}><label style={lbl}>Description</label><Txa value={newCert.desc} onChange={e => setNewCert(c => ({ ...c, desc: e.target.value }))} rows={3} placeholder="What this certification covers…" /></div>
                    <div style={{ marginBottom: '1.5rem' }}><label style={lbl}>Credential / Badge URL</label><Inp value={newCert.link} onChange={e => setNewCert(c => ({ ...c, link: e.target.value }))} placeholder="https://…" /></div>
                    <PrimaryBtn type="submit" disabled={certBusy}>{certBusy ? <><i className="bi bi-hourglass-split"></i> Adding…</> : <><i className="bi bi-plus-circle-fill"></i> Add Certification</>}</PrimaryBtn>
                    <StatusBanner status={certStatus} />
                  </form>
                </div>
              )}
            </div>
          )}

          {/* ══ RESUME ═══════════════════════════════════════════════════ */}
          {tab === 'resume' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'start' }}>
              {/* Current file */}
              <div style={{ ...card }}>
                <h3 style={{ margin: '0 0 1.5rem', fontWeight: 800 }}>Current Resume</h3>
                <div style={{ background: '#f8fafc', borderRadius: 12, padding: '2.5rem 2rem', textAlign: 'center', marginBottom: '1.5rem', border: `2px dashed ${T.border}` }}>
                  <i className="bi bi-file-earmark-pdf" style={{ fontSize: '3.5rem', color: '#dc2626', display: 'block', marginBottom: '0.75rem' }}></i>
                  <div style={{ fontWeight: 700, color: T.text, marginBottom: '0.25rem', wordBreak: 'break-all', fontSize: '0.88rem' }}>{resumeUrl}</div>
                  <div style={{ fontSize: '0.78rem', color: T.muted }}>Current active resume</div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <a href={resumeUrl} target="_blank" rel="noopener noreferrer"
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem', background: '#f1f5f9', color: T.muted, borderRadius: 10, textDecoration: 'none', fontWeight: 700, fontSize: '0.88rem', border: `1px solid ${T.border}` }}>
                    <i className="bi bi-eye"></i> Preview
                  </a>
                  <a href={resumeUrl} download
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem', background: T.accent, color: '#fff', borderRadius: 10, textDecoration: 'none', fontWeight: 700, fontSize: '0.88rem', boxShadow: '0 4px 12px rgba(0,102,204,0.25)' }}>
                    <i className="bi bi-download"></i> Download
                  </a>
                </div>
              </div>

              {/* Update */}
              <div style={{ ...card }}>
                <h3 style={{ margin: '0 0 0.5rem', fontWeight: 800 }}>Update Resume URL</h3>
                <p style={{ color: T.muted, fontSize: '0.88rem', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                  Enter a new path or URL to change which file is shown on your portfolio. To use a local file, drop the PDF into your <code style={{ background: '#f1f5f9', padding: '0.1rem 0.4rem', borderRadius: 5, fontSize: '0.82rem' }}>public/</code> folder first, then enter <code style={{ background: '#f1f5f9', padding: '0.1rem 0.4rem', borderRadius: 5, fontSize: '0.82rem' }}>/filename.pdf</code>.
                </p>
                <form onSubmit={saveResume}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={lbl}>New Resume URL or Path *</label>
                    <Inp value={newUrl} onChange={e => setNewUrl(e.target.value)} required placeholder="/NewResume.pdf  or  https://drive.google.com/…" />
                  </div>
                  <PrimaryBtn type="submit"><i className="bi bi-cloud-upload"></i> Save Resume URL</PrimaryBtn>
                  <StatusBanner status={resumeStatus} />
                </form>

                <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#fef3e2', borderRadius: 10, fontSize: '0.82rem', color: '#92400e', display: 'flex', gap: '0.5rem', lineHeight: 1.6 }}>
                  <i className="bi bi-lightbulb" style={{ flexShrink: 0, marginTop: 2 }}></i>
                  <span>For a Google Drive link use: <code style={{ background: '#fff', padding: '0.1rem 0.3rem', borderRadius: 4 }}>https://drive.google.com/uc?export=download&id=FILE_ID</code></span>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      <style jsx global>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f4f7fa; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
    </div>
  );
}
