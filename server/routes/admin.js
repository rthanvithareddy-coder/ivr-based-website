const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const db = require('../db');

const JWT_SECRET = process.env.JWT_SECRET || require('crypto').randomBytes(32).toString('hex');

// Authentication Middleware
function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Unauthorized. Authentication token required.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Invalid or expired session token.' });
  }
}

// Admin Login
router.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, error: 'Username and password are required.' });
    }

    const stmt = db.prepare('SELECT * FROM admins WHERE username = ?');
    const admin = stmt.get(username);

    if (!admin) {
      return res.status(401).json({ success: false, error: 'Invalid administrative credentials.' });
    }

    const isMatch = bcrypt.compareSync(password, admin.password_hash);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid administrative credentials.' });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.json({
      success: true,
      token,
      admin: { id: admin.id, username: admin.username },
    });
  } catch (err) {
    console.error('[ADMIN] Login error:', err);
    return res.status(500).json({ success: false, error: 'Server authentication failure.' });
  }
});

// Verify Current Session
router.get('/me', requireAdmin, (req, res) => {
  return res.json({ success: true, admin: req.admin });
});

// Overview Stats
router.get('/stats', requireAdmin, (req, res) => {
  try {
    const inquiriesCount = db.prepare('SELECT COUNT(*) as count FROM inquiries').get().count;
    const rfpsCount = db.prepare('SELECT COUNT(*) as count FROM project_rfps').get().count;
    const applicationsCount = db.prepare('SELECT COUNT(*) as count FROM applications').get().count;
    const articlesCount = db.prepare('SELECT COUNT(*) as count FROM articles').get().count;

    const recentInquiries = db.prepare('SELECT * FROM inquiries ORDER BY created_at DESC LIMIT 5').all();
    const recentRFPs = db.prepare('SELECT * FROM project_rfps ORDER BY created_at DESC LIMIT 5').all();

    return res.json({
      success: true,
      stats: {
        inquiries: inquiriesCount,
        rfps: rfpsCount,
        applications: applicationsCount,
        articles: articlesCount,
      },
      recent: {
        inquiries: recentInquiries,
        rfps: recentRFPs,
      },
    });
  } catch (err) {
    console.error('[ADMIN] Stats error:', err);
    return res.status(500).json({ success: false, error: 'Failed to fetch dashboard metrics.' });
  }
});

// Inquiries Management
router.get('/inquiries', requireAdmin, (req, res) => {
  try {
    const list = db.prepare('SELECT * FROM inquiries ORDER BY created_at DESC').all();
    return res.json({ success: true, inquiries: list });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Failed to retrieve inquiries.' });
  }
});

router.patch('/inquiries/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    db.prepare('UPDATE inquiries SET status = ? WHERE id = ?').run(status, id);
    return res.json({ success: true, message: 'Inquiry status updated.' });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Failed to update inquiry.' });
  }
});

// RFPs Management
router.get('/rfps', requireAdmin, (req, res) => {
  try {
    const list = db.prepare('SELECT * FROM project_rfps ORDER BY created_at DESC').all();
    return res.json({ success: true, rfps: list });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Failed to retrieve project RFPs.' });
  }
});

router.patch('/rfps/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    db.prepare('UPDATE project_rfps SET status = ? WHERE id = ?').run(status, id);
    return res.json({ success: true, message: 'Proposal status updated.' });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Failed to update proposal.' });
  }
});

// Careers Applications Management
router.get('/applications', requireAdmin, (req, res) => {
  try {
    const list = db.prepare('SELECT * FROM applications ORDER BY created_at DESC').all();
    return res.json({ success: true, applications: list });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Failed to retrieve applications.' });
  }
});

router.patch('/applications/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    db.prepare('UPDATE applications SET status = ? WHERE id = ?').run(status, id);
    return res.json({ success: true, message: 'Application status updated.' });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Failed to update application.' });
  }
});

// Secure Resume Download Endpoint
router.get('/resumes/:filename', requireAdmin, (req, res) => {
  try {
    const { filename } = req.params;
    // Sanitize filename to prevent path traversal
    const safeFilename = path.basename(filename);
    const filePath = path.join(__dirname, '..', 'uploads', 'resumes', safeFilename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, error: 'Resume file not found on server.' });
    }

    return res.download(filePath, safeFilename);
  } catch (err) {
    console.error('[ADMIN] Resume download error:', err);
    return res.status(500).json({ success: false, error: 'Error downloading resume file.' });
  }
});

// Insights / Articles Management
router.get('/articles', requireAdmin, (req, res) => {
  try {
    const list = db.prepare('SELECT * FROM articles ORDER BY published_at DESC').all();
    return res.json({ success: true, articles: list });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Failed to fetch articles.' });
  }
});

router.post('/articles', requireAdmin, (req, res) => {
  try {
    const { title, slug, category, summary, content, author, read_time } = req.body;
    if (!title || !slug || !category || !content) {
      return res.status(400).json({ success: false, error: 'Title, slug, category, and content are required.' });
    }

    const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');
    const stmt = db.prepare(`
      INSERT INTO articles (slug, title, category, summary, content, author, read_time)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      cleanSlug,
      title.trim(),
      category.trim(),
      (summary || '').trim(),
      content.trim(),
      (author || 'IVR Tech Solutions Editorial Team').trim(),
      (read_time || '5 min read').trim()
    );

    return res.status(201).json({ success: true, message: 'Article published successfully.' });
  } catch (err) {
    console.error('[ADMIN] Create article error:', err);
    return res.status(500).json({ success: false, error: 'Failed to create article. Ensure slug is unique.' });
  }
});

router.delete('/articles/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    db.prepare('DELETE FROM articles WHERE id = ?').run(id);
    return res.json({ success: true, message: 'Article deleted successfully.' });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Failed to delete article.' });
  }
});

module.exports = router;
