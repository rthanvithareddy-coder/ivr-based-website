const express = require('express');
const router = express.Router();
const db = require('../db');

// List articles with search & category filter
router.get('/', (req, res) => {
  try {
    const { category, search } = req.query;

    let query = 'SELECT id, slug, title, category, summary, author, read_time, published_at FROM articles WHERE 1=1';
    const params = [];

    if (category && category.toLowerCase() !== 'all') {
      query += ' AND LOWER(category) = LOWER(?)';
      params.push(category);
    }

    if (search && search.trim() !== '') {
      query += ' AND (title LIKE ? OR summary LIKE ? OR content LIKE ?)';
      const term = `%${search.trim()}%`;
      params.push(term, term, term);
    }

    query += ' ORDER BY published_at DESC';

    const stmt = db.prepare(query);
    const articles = stmt.all(...params);

    return res.json({ success: true, count: articles.length, articles });
  } catch (err) {
    console.error('[INSIGHTS] Error fetching articles:', err);
    return res.status(500).json({ success: false, error: 'Failed to retrieve articles.' });
  }
});

// Get single article by slug
router.get('/:slug', (req, res) => {
  try {
    const { slug } = req.params;
    const stmt = db.prepare('SELECT * FROM articles WHERE slug = ?');
    const article = stmt.get(slug);

    if (!article) {
      return res.status(404).json({ success: false, error: 'Article not found.' });
    }

    return res.json({ success: true, article });
  } catch (err) {
    console.error('[INSIGHTS] Error fetching article by slug:', err);
    return res.status(500).json({ success: false, error: 'Failed to retrieve article.' });
  }
});

module.exports = router;
