const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const db = require('../db');
const { sendNotificationEmail } = require('../mailer');

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads', 'resumes'));
  },
  filename: (req, file, cb) => {
    const cleanOriginal = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    const uniqueSuffix = `${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    cb(null, `${uniqueSuffix}_${cleanOriginal}`);
  },
});

// File validation filter
const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.pdf', '.doc', '.docx'];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF and Word documents (.pdf, .doc, .docx) are accepted.'));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter,
});

router.post('/apply', (req, res) => {
  upload.single('resume')(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ success: false, error: 'Resume file size exceeds the 5MB limit.' });
      }
      return res.status(400).json({ success: false, error: `Upload error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ success: false, error: err.message });
    }

    try {
      const { name, email, phone, position, cover_letter, _hp } = req.body;

      if (_hp) {
        return res.status(200).json({ success: true, message: 'Application submitted.' });
      }

      if (!name || !email || !phone || !position) {
        return res.status(400).json({
          success: false,
          error: 'Please provide all mandatory fields: Full Name, Email, Phone, and Position.',
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: 'Please upload your resume file (.pdf, .doc, or .docx).',
        });
      }

      const stmt = db.prepare(`
        INSERT INTO applications (name, email, phone, position, resume_filename, resume_original_name, cover_letter)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);

      const result = stmt.run(
        name.trim(),
        email.trim(),
        phone.trim(),
        position.trim(),
        req.file.filename,
        req.file.originalname,
        (cover_letter || '').trim()
      );

      const notificationHtml = `
        <h2>New Job Application Received</h2>
        <p><strong>Candidate:</strong> ${name}</p>
        <p><strong>Position Applied:</strong> ${position}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Resume File:</strong> ${req.file.originalname} (Stored on server as ${req.file.filename})</p>
        <p><strong>Cover Letter / Notes:</strong></p>
        <blockquote style="background: #f8fafc; padding: 12px; border-left: 4px solid #7047EB;">
          ${(cover_letter || 'No cover letter provided.').replace(/\n/g, '<br/>')}
        </blockquote>
      `;

      sendNotificationEmail({
        subject: `[IVR Careers] New Application for ${position} - ${name}`,
        html: notificationHtml,
        text: `New Application from ${name} for ${position}.\nEmail: ${email}\nPhone: ${phone}\nResume: ${req.file.originalname}`,
      }).catch(e => console.error('[CAREERS] Email error:', e));

      return res.status(201).json({
        success: true,
        message: 'Your application has been received successfully! Our talent acquisition team will review your profile.',
        id: Number(result.lastInsertRowid),
      });
    } catch (saveErr) {
      console.error('[CAREERS] Application submission error:', saveErr);
      return res.status(500).json({
        success: false,
        error: 'Unable to process your application at this time. Please try again or email admin@ivrtechsolution.in.',
      });
    }
  });
});

module.exports = router;
