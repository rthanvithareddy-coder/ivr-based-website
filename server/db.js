const { DatabaseSync } = require('node:sqlite');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Ensure uploads/resumes directory exists
const resumesDir = path.join(__dirname, 'uploads', 'resumes');
if (!fs.existsSync(resumesDir)) {
  fs.mkdirSync(resumesDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'ivr_corporate.db');
const db = new DatabaseSync(dbPath);

// Initialize Tables
db.exec(`
  CREATE TABLE IF NOT EXISTS inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    service TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'NEW',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS project_rfps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    company TEXT,
    project_type TEXT NOT NULL,
    budget TEXT,
    timeline TEXT,
    description TEXT NOT NULL,
    status TEXT DEFAULT 'NEW',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    position TEXT NOT NULL,
    resume_filename TEXT NOT NULL,
    resume_original_name TEXT NOT NULL,
    cover_letter TEXT,
    status TEXT DEFAULT 'RECEIVED',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT DEFAULT 'IVR Tech Solutions Editorial Team',
    read_time TEXT DEFAULT '5 min read',
    published_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed Admin User
try {
  const adminStmt = db.prepare('SELECT id FROM admins WHERE username = ?');
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const existingAdmin = adminUsername ? adminStmt.get(adminUsername) : null;
  if (!existingAdmin && adminUsername && adminPassword) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(adminPassword, salt);
    const insertAdmin = db.prepare('INSERT INTO admins (username, password_hash) VALUES (?, ?)');
    insertAdmin.run(adminUsername, hash);
    console.log(`[DB] Admin user initialized (${adminUsername}).`);
  } else if (!existingAdmin && (!adminUsername || !adminPassword)) {
    console.warn('[DB] Admin user not initialized. Set ADMIN_USERNAME and ADMIN_PASSWORD in the environment.');
  }
} catch (err) {
  console.error('[DB] Error initializing admin:', err.message);
}

// Seed Initial Corporate Insights / Articles if empty
try {
  const countStmt = db.prepare('SELECT COUNT(*) as count FROM articles');
  const result = countStmt.get();
  if (result.count === 0) {
    const initialArticles = [
      {
        slug: 'architecting-high-performance-web-platforms-for-enterprises',
        title: 'Architecting High-Performance Web Platforms for Enterprises',
        category: 'Web Development',
        summary: 'How modern businesses scale their web presence with resilient architectures, optimized CDNs, and component-driven microfrontends.',
        content: `In today’s competitive digital landscape, corporate web applications are no longer just brochures—they are mission-critical transaction engines and brand focal points.

At IVR Tech Solutions, we emphasize architectural rigor from day one. Modern enterprise applications require:
1. Low Latency & High Core Web Vitals: Sub-second load times enhance customer trust and drive conversion.
2. Modular Component Systems: Ensuring brand consistency and code reusability across platforms.
3. Resilient API Integration: Decoupled architectures that gracefully degrade during third-party outages.

By combining modern frontend engineering with battle-tested cloud backends, enterprise systems achieve the reliability and security required to scale globally.`,
        author: 'IVR Tech Solutions Architecture Group',
        read_time: '5 min read'
      },
      {
        slug: 'the-roi-of-smart-cloud-telephony-and-ivr-systems',
        title: 'The ROI of Modern Cloud Telephony & Intelligent IVR Systems',
        category: 'Cloud Computing',
        summary: 'Transforming customer support economics through automated routing, high-uptime telephony pipelines, and scalable call flows.',
        content: `Customer contact centers face an unrelenting challenge: managing high inbound call volumes while delivering personal, timely resolutions.

Interactive Voice Response (IVR) and cloud telephony have evolved significantly. With modern cloud PBX and intelligent routing, organizations can:
- Reduce Tier-1 call queue congestion by up to 60%.
- Enable 24/7 automated self-service for balance checks, status updates, and order confirmations.
- Seamlessly bridge voice interactions with digital CRM databases in real-time.

IVR Tech Solutions designs end-to-end telephony workflows engineered for high concurrent volume and uncompromised uptime.`,
        author: 'Telephony & Cloud Practice, IVR Tech Solutions',
        read_time: '4 min read'
      },
      {
        slug: 'practical-ai-implementation-for-operational-efficiency',
        title: 'Practical AI Implementation: Moving from Hype to Operational Efficiency',
        category: 'Artificial Intelligence',
        summary: 'A pragmatic framework for business leaders seeking measurable productivity gains through targeted machine learning applications.',
        content: `Artificial intelligence offers massive potential, but successful corporate adoption requires a pragmatic, results-oriented methodology. Rather than pursuing speculative AI projects, forward-thinking enterprises focus on quantifiable bottlenecks:

1. Intelligent Document Processing: Automating invoice parsing, contract verification, and structured data extraction.
2. Predictive Inventory & Demand Planning: Reducing warehouse holding costs through historical sales forecasting.
3. Conversational Assistants for Structured Knowledge: Empowering employees with instant, verified operational procedures.

At IVR Tech Solutions, we guide businesses through phased AI adoption—prioritizing data governance, accuracy, and clear ROI.`,
        author: 'Data & Intelligence Practice, IVR Tech Solutions',
        read_time: '6 min read'
      },
      {
        slug: 'mobile-first-engineering-for-distributed-workforces',
        title: 'Mobile-First Engineering for Modern Distributed Workforces',
        category: 'Software Development',
        summary: 'Key considerations when developing secure, cross-platform enterprise mobile applications for operations in the field.',
        content: `Field operations, sales logistics, and distributed teams require enterprise mobile apps that are resilient to offline conditions, secure against device loss, and intuitive to use.

Key technical pillars include:
- Cross-platform parity using modern toolkits such as Flutter and React Native.
- Local-first data synchronization with conflict resolution algorithms.
- Hardware-backed biometric authentication and encrypted SQLite storage.

IVR Tech Solutions builds enterprise mobile software that operates smoothly even in demanding, low-connectivity field environments.`,
        author: 'Mobile Engineering Team, IVR Tech Solutions',
        read_time: '4 min read'
      },
      {
        slug: 'digital-transformation-roadmap-for-smes-and-mid-market',
        title: 'Digital Transformation Roadmap for Growing Businesses',
        category: 'Digital Transformation',
        summary: 'A step-by-step approach to phasing out legacy paper-based workflows in favor of integrated digital ecosystems.',
        content: `Many growing organizations suffer from fragmented software tools: accounting in one system, customer leads in spreadsheets, and inventory tracked manually on paper.

A successful digital transformation roadmap follows three critical milestones:
1. Audit & Unification: Map every operational handoff and eliminate duplicate manual entry.
2. Custom Core ERP/CRM Development: Build or integrate a unified database that serves as the single source of truth.
3. Automated Reporting & Dashboards: Provide leadership with real-time visibility into cash flow, project status, and inventory.

IVR Tech Solutions partners with organizations across India to digitize operations with minimal operational downtime.`,
        author: 'Advisory & Consulting Practice, IVR Tech Solutions',
        read_time: '5 min read'
      }
    ];

    const insertArticle = db.prepare(`
      INSERT INTO articles (slug, title, category, summary, content, author, read_time)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    for (const art of initialArticles) {
      insertArticle.run(art.slug, art.title, art.category, art.summary, art.content, art.author, art.read_time);
    }
    console.log('[DB] Initial corporate insights seeded successfully');
  }
} catch (err) {
  console.error('[DB] Error seeding articles:', err.message);
}

module.exports = db;
