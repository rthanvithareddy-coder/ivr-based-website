const express = require('express');
const router = express.Router();
const db = require('../db');
const { sendNotificationEmail } = require('../mailer');

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, company, service, subject, message, _hp } = req.body;

    // Honeypot spam trap
    if (_hp) {
      console.warn('[CONTACT] Spam bot blocked via honeypot field');
      return res.status(200).json({ success: true, message: 'Message received.' });
    }

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and message are required fields.',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.',
      });
    }

    // Insert into SQLite
    const stmt = db.prepare(`
      INSERT INTO inquiries (name, email, phone, company, service, subject, message)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      name.trim(),
      email.trim(),
      (phone || '').trim(),
      (company || '').trim(),
      (service || 'General Enquiry').trim(),
      (subject || 'Corporate Website Enquiry').trim(),
      message.trim()
    );

    // Send notification email asynchronously
    const notificationHtml = `
      <h2>New Corporate Website Enquiry</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Company:</strong> ${company || 'Not provided'}</p>
      <p><strong>Service:</strong> ${service || 'General Enquiry'}</p>
      <p><strong>Subject:</strong> ${subject || 'Website Enquiry'}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="background: #f4f4f4; padding: 12px; border-left: 4px solid #7047EB;">
        ${message.replace(/\n/g, '<br/>')}
      </blockquote>
    `;

    sendNotificationEmail({
      subject: `[IVR Enquiry] ${subject || 'New Contact'} from ${name}`,
      html: notificationHtml,
      text: `New Enquiry from ${name} (${email}, ${phone}):\n\nService: ${service}\n\n${message}`,
    }).catch(e => console.error('[CONTACT] Email error:', e));

    return res.status(201).json({
      success: true,
      message: 'Thank you for reaching out. An IVR Tech Solutions representative will connect with you within 1 business day.',
      id: Number(result.lastInsertRowid),
    });
  } catch (err) {
    console.error('[CONTACT] Error saving inquiry:', err);
    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred while processing your request. Please try again or reach us directly at admin@ivrtechsolution.in.',
    });
  }
});

module.exports = router;
