require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');

// Ensure database and folders are initialized
require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(helmet({
  contentSecurityPolicy: false, // Allows flexible asset loading across local and production hosts
  crossOriginEmbedderPolicy: false,
}));

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Anti-Spam Rate Limiter for public form submissions
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // 30 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests from this IP. Please try again after 15 minutes or email us directly at admin@ivrtechsolution.in.',
  },
});

// API Routes
const contactRouter = require('./routes/contact');
const rfpRouter = require('./routes/rfp');
const careersRouter = require('./routes/careers');
const insightsRouter = require('./routes/insights');
const adminRouter = require('./routes/admin');

app.use('/api/contact', formLimiter, contactRouter);
app.use('/api/rfp', formLimiter, rfpRouter);
app.use('/api/careers', careersRouter); // Has its own Multer upload inside
app.use('/api/insights', insightsRouter);
app.use('/api/admin', adminRouter);

// System Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    company: 'IVR Tech Solutions Private Limited',
    brand: 'IVR Tech Solutions',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Production Static Serving: if client/dist exists, serve client SPA
const clientDistPath = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(clientDistPath)) {
  console.log(`[SERVER] Serving static frontend build from ${clientDistPath}`);
  app.use(express.static(clientDistPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ success: false, error: 'Endpoint not found.' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[SERVER ERROR]', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error',
  });
});

const server = app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(` IVR TECH SOLUTIONS PRIVATE LIMITED`);
  console.log(` Corporate Backend Service running on http://localhost:${PORT}`);
  console.log(` Health check: http://localhost:${PORT}/api/health`);
  console.log(`======================================================\n`);
});

module.exports = app;
