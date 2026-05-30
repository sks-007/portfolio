// Supabase seed script — run once after creating tables in Supabase dashboard
// Usage: node seed-supabase.mjs
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://avgrnnahjtrnshriqoor.supabase.co';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2Z3JubmFoanRybnNocmlxb29yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5NzY2MjAsImV4cCI6MjA5NTU1MjYyMH0.JPi3KI03ridQFsQfiBGgRI4_kIavozcv3Esme8JcD7A';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const posts = [
  {
    slug: 'why-passwords-alone-are-no-longer-secure',
    title: 'Why Passwords Alone Are No Longer Secure',
    excerpt: 'Even the strongest passwords are no longer enough. Explore why modern cyber threats demand MFA, biometrics, and smarter verification systems.',
    category: 'Cybersecurity',
    cover_image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=800&q=80',
    author: 'Sachin Kumar Singh',
    published: true,
    views: 0,
    content: `For years, passwords were considered the first and strongest line of defense in the digital world. From social media accounts to banking apps, everything relied on a simple combination of letters, numbers, and symbols. People believed that as long as they created a "strong password," their accounts would remain safe.

But today, that is no longer true.

Even though passwords are still important, they are no longer enough to protect us from modern cyber threats. Cybercriminals have become smarter, attacks have become more advanced, and users continue to make small mistakes that hackers easily take advantage of. This is why companies around the world are moving toward stronger security methods such as Multi-Factor Authentication (MFA), biometrics, and smarter verification systems.

## The Problem with Passwords

The biggest issue with passwords is human behavior. Most people use simple passwords because they are easy to remember. Passwords like "123456," "password," or birth dates are still incredibly common. Even when people create strong passwords, many reuse the same password across multiple websites.

Phishing is a cyberattack where hackers trick users into revealing their passwords. Sometimes it comes as an email pretending to be from a bank, Netflix, or even a workplace. The message often creates panic by saying things like "Your account will be suspended" or "Suspicious login detected." Users click the link, enter their password on a fake website, and unknowingly hand over their credentials to attackers.

## Data Breaches Have Changed Everything

Over the last decade, thousands of companies have suffered data breaches. Millions of usernames and passwords were leaked online and sold on the dark web. Hackers now use software that can test stolen passwords on hundreds of websites within seconds — a technique known as "credential stuffing."

## What is Multi-Factor Authentication (MFA)?

MFA adds an extra layer of security. Instead of relying only on a password, MFA asks for another form of verification — a one-time code sent to your phone, a fingerprint scan, face recognition, an authentication app, or a hardware security key. Even if someone steals your password, they cannot access your account without the second step.

## The Rise of Biometrics

Biometric authentication is becoming increasingly popular because it is both secure and convenient. Fingerprints, facial recognition, and voice recognition are harder to steal than passwords. However, unlike passwords, biometric data cannot be changed if compromised — you can reset a password but you cannot reset your fingerprint.

## Why Cybersecurity is Everyone's Responsibility

Every internet user is a target. Simple habits make a huge difference: use unique passwords for each account, enable MFA whenever possible, avoid clicking suspicious links, use a password manager, and keep your software updated.

## The Future Beyond Passwords

Technology companies are working toward a future without passwords. Passkeys and passwordless authentication rely on secure devices and cryptographic verification instead of traditional passwords. Companies like Apple, Google, and Microsoft are actively supporting these technologies.

## Conclusion

Passwords were once the backbone of online security, but the internet has evolved. Cybercriminals now use advanced phishing techniques, automated attacks, and leaked databases to bypass traditional password protection. The future of cybersecurity is about combining multiple layers of authentication, improving user awareness, and making digital security smarter and more reliable.`,
  },
  {
    slug: 'ai-ml-pipelines-production',
    title: 'Understanding AI/ML Pipelines in Production',
    excerpt: 'A deep dive into how machine learning models are deployed and maintained in real-world applications, covering monitoring, retraining, and drift detection.',
    category: 'AI & ML',
    cover_image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80',
    author: 'Sachin Kumar Singh',
    published: true,
    views: 0,
    content: `Deploying a machine learning model is only the beginning. The real challenge lies in keeping it accurate, reliable, and scalable over time. A production ML pipeline is a carefully orchestrated system that moves data from ingestion all the way through to predictions served to real users.

## What is an ML Pipeline?

An ML pipeline is an end-to-end workflow that automates the process of feeding data into a model and generating predictions. In production, this typically involves several key stages: data ingestion, preprocessing, feature engineering, model inference, and monitoring.

## The Challenge of Model Drift

One of the biggest challenges in production ML is model drift — the phenomenon where a model's performance degrades over time because the real-world data it encounters changes from the data it was trained on. There are two main types: data drift (input distributions change) and concept drift (the relationship between inputs and outputs changes).

## Monitoring and Retraining

Robust production systems implement continuous monitoring pipelines. Key metrics to track include prediction confidence scores, input feature distributions, model latency, and business-level KPIs tied to model outputs. When drift is detected, automated retraining pipelines kick in to update the model with fresh data.

## Building Resilient Pipelines

The best production ML systems are built with failure in mind — fallback strategies, shadow deployments (running a new model in parallel before fully switching), and canary releases that gradually shift traffic to updated models.

## Conclusion

Building ML systems for production is a discipline that goes far beyond model accuracy. It requires thinking about data quality, system reliability, and continuous improvement — turning a one-time experiment into a living, learning system.`,
  },
  {
    slug: 'fullstack-architecture-patterns',
    title: 'Scalable Full-Stack Application Architecture',
    excerpt: 'Key architectural decisions and patterns for ensuring your web applications can scale gracefully — from monolith to microservices.',
    category: 'Development',
    cover_image: 'https://images.unsplash.com/photo-1627398240454-e619d4b68322?auto=format&fit=crop&w=800&q=80',
    author: 'Sachin Kumar Singh',
    published: true,
    views: 0,
    content: `Choosing the right architecture for a web application is one of the most consequential decisions a developer can make. Get it right, and the system scales smoothly with demand. Get it wrong, and you'll spend years fighting your own codebase.

## The Monolith vs. Microservices Debate

For most applications, especially early-stage ones, a well-structured monolith is the right choice. A monolith is simpler to develop, test, and deploy. The problems come when you need to scale individual components independently or when teams grow large enough that coordination becomes a bottleneck.

Microservices solve these problems by breaking the application into small, independently deployable services. But they introduce complexity: service discovery, distributed tracing, inter-service communication, and eventual consistency all become your problems.

## The Right Approach: Modular Monolith First

A practical pattern that many successful companies use is starting with a modular monolith — a single deployable unit organized into clearly separated modules with well-defined interfaces. When a specific module needs to scale independently, it can be extracted into a microservice.

## Database Architecture Decisions

Choosing the right database depends on your data model. Relational databases (PostgreSQL, MySQL) excel at structured data with complex relationships. Document databases (MongoDB) work well for flexible schemas. Time-series databases handle metrics and logs efficiently.

## Caching and Performance

At scale, caching is essential. Implement caching in layers: CDN caching for static assets, API response caching with Redis, and database query caching. Each layer reduces load on the next, dramatically improving response times.

## Conclusion

Great architecture is about making thoughtful trade-offs. Start simple, measure everything, and evolve your architecture based on actual bottlenecks rather than hypothetical ones. The best architecture is the one that solves your current problems without creating unnecessary future ones.`,
  },
];

async function seed() {
  console.log('🌱 Seeding Supabase...');

  for (const post of posts) {
    const { error } = await supabase
      .from('posts')
      .upsert(post, { onConflict: 'slug' });

    if (error) {
      console.error(`❌ Failed to seed "${post.title}":`, error.message);
    } else {
      console.log(`✅ Seeded: "${post.title}"`);
    }
  }

  console.log('\n🎉 Done!');
  process.exit(0);
}

seed();
