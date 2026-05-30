// Simple seed script - uses same dns.setServers approach as the app
import dns from 'dns';
import mongoose from 'mongoose';

dns.setServers(['8.8.8.8', '8.8.4.4']);

// Direct IP connection - bypasses ISP DNS block
const HOSTS = '159.41.184.66:27017,159.41.162.128:27017,159.41.228.73:27017';
const REPLICA_SET = 'atlas-gcssxkg-shard-0';
const USER = 'worksachinks_db_user';
const PASS = '6vqZvgANYLAXrzUw';
const DB = 'portfolioDB';
const MONGODB_URI = `mongodb://${USER}:${PASS}@${HOSTS}/${DB}?ssl=true&replicaSet=${REPLICA_SET}&authSource=admin&retryWrites=true&w=majority`;

const PostSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true },
  excerpt: String,
  content: String,
  category: { type: String, default: 'General' },
  coverImage: { type: String, default: '' },
  author: { type: String, default: 'Sachin Kumar Singh' },
  published: { type: Boolean, default: true },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);

const posts = [
  {
    slug: 'why-passwords-alone-are-no-longer-secure',
    title: 'Why Passwords Alone Are No Longer Secure',
    excerpt: 'Even the strongest passwords are no longer enough. Explore why modern cyber threats demand MFA, biometrics, and smarter verification systems.',
    category: 'Cybersecurity',
    coverImage: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=800&q=80',
    content: `For years, passwords were considered the first and strongest line of defense in the digital world. From social media accounts to banking apps, everything relied on a simple combination of letters, numbers, and symbols. People believed that as long as they created a "strong password," their accounts would remain safe.\n\nBut today, that is no longer true.\n\nEven though passwords are still important, they are no longer enough to protect us from modern cyber threats. Cybercriminals have become smarter, attacks have become more advanced, and users continue to make small mistakes that hackers easily take advantage of.\n\n## The Problem with Passwords\n\nThe biggest issue with passwords is human behavior. Most people use simple passwords because they are easy to remember. Passwords like "123456," "password," or birth dates are still incredibly common. Even when people create strong passwords, many reuse the same password across multiple websites.\n\nPhishing is a cyberattack where hackers trick users into revealing their passwords. Sometimes it comes as an email pretending to be from a bank, Netflix, or even a workplace. Users click the link, enter their password on a fake website, and unknowingly hand over their credentials to attackers.\n\n## Data Breaches Have Changed Everything\n\nOver the last decade, thousands of companies have suffered data breaches. Millions of usernames and passwords were leaked online. Hackers now use software that can test stolen passwords on hundreds of websites within seconds — a technique known as "credential stuffing."\n\n## What is Multi-Factor Authentication (MFA)?\n\nMFA adds an extra layer of security. Instead of relying only on a password, MFA asks for another form of verification — a one-time code sent to your phone, a fingerprint scan, face recognition, an authentication app, or a hardware security key. Even if someone steals your password, they still cannot access your account without the second step.\n\n## The Rise of Biometrics\n\nBiometric authentication is becoming increasingly popular because it is both secure and convenient. Fingerprints, facial recognition, and voice recognition are harder to steal than passwords. However, unlike passwords, biometric data cannot be changed if compromised.\n\n## Why Cybersecurity is Everyone's Responsibility\n\nEvery internet user is a target. Simple habits make a huge difference: use unique passwords for different accounts, enable MFA whenever possible, avoid clicking suspicious links, use password managers, and keep software updated.\n\n## The Future Beyond Passwords\n\nTechnology companies are working toward a future without passwords. Passkeys and passwordless authentication rely on secure devices and cryptographic verification. Companies like Apple, Google, and Microsoft are actively supporting these technologies.\n\n## Conclusion\n\nPasswords were once the backbone of online security, but the internet has evolved. The future of cybersecurity is about combining multiple layers of authentication, improving user awareness, and making digital security smarter and more reliable.`
  },
  {
    slug: 'ai-ml-pipelines-production',
    title: 'Understanding AI/ML Pipelines in Production',
    excerpt: 'A deep dive into how machine learning models are deployed and maintained in real-world applications, covering monitoring, retraining, and drift detection.',
    category: 'AI & ML',
    coverImage: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80',
    content: `Deploying a machine learning model is only the beginning. The real challenge lies in keeping it accurate, reliable, and scalable over time.\n\n## What is an ML Pipeline?\n\nAn ML pipeline is an end-to-end workflow that automates the process of feeding data into a model and generating predictions. In production, this involves data ingestion, preprocessing, feature engineering, model inference, and monitoring.\n\n## The Challenge of Model Drift\n\nModel drift occurs when a model's performance degrades over time because real-world data changes from the training data. Data drift means input distributions change; concept drift means the relationship between inputs and outputs changes.\n\n## Monitoring and Retraining\n\nRobust production systems implement continuous monitoring. Key metrics include prediction confidence scores, input feature distributions, model latency, and business KPIs. When drift is detected, automated retraining pipelines update the model with fresh data.\n\n## Building Resilient Pipelines\n\nThe best production ML systems are built with failure in mind — fallback strategies, shadow deployments (running a new model in parallel), and canary releases that gradually shift traffic to updated models.\n\n## Conclusion\n\nBuilding ML systems for production requires thinking about data quality, system reliability, and continuous improvement — turning a one-time experiment into a living, learning system.`
  },
  {
    slug: 'fullstack-architecture-patterns',
    title: 'Scalable Full-Stack Application Architecture',
    excerpt: 'Key architectural decisions and patterns for ensuring your web applications can scale gracefully — from monolith to microservices.',
    category: 'Development',
    coverImage: 'https://images.unsplash.com/photo-1627398240454-e619d4b68322?auto=format&fit=crop&w=800&q=80',
    content: `Choosing the right architecture for a web application is one of the most consequential decisions a developer can make.\n\n## The Monolith vs. Microservices Debate\n\nFor most applications, especially early-stage ones, a well-structured monolith is the right choice. It is simpler to develop, test, and deploy. Microservices solve scaling problems but introduce complexity: service discovery, distributed tracing, and inter-service communication.\n\n## The Right Approach: Modular Monolith First\n\nA practical pattern is starting with a modular monolith — a single deployable unit organized into clearly separated modules. When a specific module needs to scale independently, it can be extracted into a microservice without rewriting everything.\n\n## Database Architecture Decisions\n\nRelational databases (PostgreSQL, MySQL) excel at structured data with complex relationships. Document databases (MongoDB) work well for flexible schemas. Choose based on your data model, not trends.\n\n## Caching and Performance\n\nAt scale, caching is essential. Implement it in layers: CDN caching for static assets, API response caching with Redis, and database query caching. Each layer reduces load on the next.\n\n## Conclusion\n\nGreat architecture is about thoughtful trade-offs. Start simple, measure everything, and evolve based on actual bottlenecks rather than hypothetical ones.`
  },
];

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 20000,
      socketTimeoutMS: 45000,
      family: 4,
    });
    console.log('✅ Connected!');

    for (const post of posts) {
      await Post.findOneAndUpdate({ slug: post.slug }, post, { upsert: true, new: true });
      console.log(`✅ Seeded: "${post.title}"`);
    }

    console.log('\n🎉 All blog posts seeded successfully!');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed:', err.message);
    process.exit(1);
  }
}

seed();
