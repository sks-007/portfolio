// Seed projects and certifications into Supabase
// Run: node seed-data.mjs

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const PROJECTS = [
  {
    name: 'Netflix Movie Recommendation System',
    category: 'ai-ml',
    category_label: 'AI / ML',
    description: 'Content-based filtering system that suggests movies using cosine similarity and vectorization on genre, cast, and keywords.',
    tags: ['Python', 'Scikit-learn', 'Pandas', 'NumPy'],
    image: '/netflix.jpg',
    github: 'https://github.com/sks-007/Netflix-Movie-Recommendation-system',
    demo: 'https://netflix-movie-recommendation-system-f1ac.onrender.com/',
  },
  {
    name: 'EzyExplore – Smart Travel Platform',
    category: 'web',
    category_label: 'Web Dev',
    description: 'Full-stack travel platform helping users discover safe, reliable destinations with dynamic content and responsive design.',
    tags: ['Node.js', 'MongoDB', 'Express', 'JavaScript'],
    image: '/EzyExplore.jpg',
    github: '',
    demo: '',
  },
  {
    name: 'PolicyPulse – Sentiment Analysis',
    category: 'ai-ml',
    category_label: 'AI / ML',
    description: 'NLP-powered sentiment analysis system that classifies public opinions on policies as positive, negative, or neutral.',
    tags: ['Python', 'NLP', 'Hugging Face', 'ML'],
    image: '/Policy.jpg',
    github: '',
    demo: '',
  },
  {
    name: 'House Price Prediction Model',
    category: 'ai-ml',
    category_label: 'AI / ML',
    description: 'Regression model that estimates property prices based on location, size, and other key features using supervised learning.',
    tags: ['Python', 'Scikit-learn', 'Pandas', 'EDA'],
    image: '/House Price.jpg',
    github: '',
    demo: '',
  },
];

const CERTIFICATIONS = [
  {
    icon: 'bi-cpu',
    name: 'Oracle Cloud Infrastructure 2025 Certified Generative AI Professional',
    issuer: 'Oracle',
    date: 'Aug 2025',
    description: 'Validates expertise in LLMs, OCI Generative AI Service, RAG, Semantic Search, Vector Databases, and LangChain.',
    link: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=DB1378EE53B86036EC5B9251C2F82FE78969183E23DD24D24ED6ECFE786F7101',
    color: '#e6f0ff',
    icon_color: '#0066cc',
  },
  {
    icon: 'bi-cloud-check',
    name: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
    issuer: 'Oracle',
    date: 'Jul 2025',
    description: 'Covers AI/ML fundamentals, neural networks, generative AI, OCI AI services, ethical AI, and model lifecycle.',
    link: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=CB1F9158F070CD3CB037E1D35DB6ADF8832DEB982C7F41B310C0E0946382B4F0',
    color: '#e6f0ff',
    icon_color: '#0066cc',
  },
  {
    icon: 'bi-graph-up-arrow',
    name: 'McKinsey.Org Forward Program',
    issuer: 'McKinsey & Company',
    date: 'Apr – Jun 2025',
    description: 'Future-ready professional skills: structured thinking, adaptability, digital tools, and real-world business scenarios.',
    link: 'https://www.credly.com/badges/e6ebceb9-9f7c-4c2d-9fef-55ada694156d/linked_in_profile',
    color: '#fef3e2',
    icon_color: '#d97706',
  },
  {
    icon: 'bi-filetype-py',
    name: 'Python Pro Bootcamp',
    issuer: 'Udemy',
    date: 'Feb – May 2025',
    description: 'Python fundamentals, data types, control flow, OOP, data structures, and mini-projects for real-world applications.',
    link: 'https://ude.my/UC-39c6ebae-c2f5-45bf-ae1f-056a084db810',
    color: '#f0fdf4',
    icon_color: '#16a34a',
  },
];

async function seed() {
  console.log('🌱 Seeding Supabase...\n');

  // ── Clear existing data ──────────────────────────────────────────────
  console.log('Clearing existing projects and certifications…');
  await supabase.from('projects').delete().neq('id', 0);
  await supabase.from('certifications').delete().neq('id', 0);

  // ── Projects ─────────────────────────────────────────────────────────
  console.log('Inserting projects…');
  const { data: projData, error: projErr } = await supabase
    .from('projects')
    .insert(PROJECTS)
    .select();

  if (projErr) {
    console.error('❌ Projects error:', projErr.message);
  } else {
    console.log(`✅ Inserted ${projData.length} projects`);
  }

  // ── Certifications ────────────────────────────────────────────────────
  console.log('Inserting certifications…');
  const { data: certData, error: certErr } = await supabase
    .from('certifications')
    .insert(CERTIFICATIONS)
    .select();

  if (certErr) {
    console.error('❌ Certifications error:', certErr.message);
  } else {
    console.log(`✅ Inserted ${certData.length} certifications`);
  }

  // ── Resume setting ────────────────────────────────────────────────────
  console.log('Setting resume URL…');
  const { error: resumeErr } = await supabase
    .from('settings')
    .upsert({ key: 'resumeUrl', value: '/Sachin_Kumar_Singh_Resume.pdf' }, { onConflict: 'key' });

  if (resumeErr) {
    console.error('❌ Settings error:', resumeErr.message);
  } else {
    console.log('✅ Resume URL set');
  }

  console.log('\n🎉 Seeding complete!');
}

seed().catch(console.error);
