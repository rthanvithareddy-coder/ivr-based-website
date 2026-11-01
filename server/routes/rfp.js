const express = require('express');
const router = express.Router();
const db = require('../db');
const { sendNotificationEmail } = require('../mailer');

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, company, project_type, budget, timeline, description, _hp } = req.body;

    if (_hp) {
      return res.status(200).json({ success: true, message: 'Proposal received.' });
    }

    if (!name || !email || !phone || !project_type || !description) {
      return res.status(400).json({
        success: false,
        error: 'Please fill in all required fields: Name, Email, Phone, Project Type, and Description.',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid business email address.',
      });
    }

    const stmt = db.prepare(`
      INSERT INTO project_rfps (name, email, phone, company, project_type, budget, timeline, description)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      name.trim(),
      email.trim(),
      phone.trim(),
      (company || '').trim(),
      project_type.trim(),
      (budget || 'Flexible / Discussion Needed').trim(),
      (timeline || 'Flexible').trim(),
      description.trim()
    );

    const notificationHtml = `
      <h2>New Project RFP / "Let's Talk" Proposal</h2>
      <p><strong>Client Name:</strong> ${name}</p>
      <p><strong>Company:</strong> ${company || 'Independent / Confidential'}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Project Type:</strong> ${project_type}</p>
      <p><strong>Budget Tier:</strong> ${budget || 'Flexible'}</p>
      <p><strong>Target Timeline:</strong> ${timeline || 'Flexible'}</p>
      <p><strong>Scope & Description:</strong></p>
      <blockquote style="background: #f8fafc; padding: 14px; border-left: 4px solid #3478E5;">
        ${description.replace(/\n/g, '<br/>')}
      </blockquote>
    `;

    sendNotificationEmail({
      subject: `[IVR Project RFP] ${project_type} Proposal from ${name} (${company || 'Client'})`,
      html: notificationHtml,
      text: `New RFP from ${name} (${company}):\nType: ${project_type}\nBudget: ${budget}\nPhone: ${phone}\n\n${description}`,
    }).catch(e => console.error('[RFP] Email error:', e));

    return res.status(201).json({
      success: true,
      message: 'Your project proposal has been received! Our technical solutions lead will review your requirements and reach out within 24 hours.',
      id: Number(result.lastInsertRowid),
    });
  } catch (err) {
    console.error('[RFP] Error saving project RFP:', err);
    return res.status(500).json({
      success: false,
      error: 'An error occurred while submitting your project proposal. Please contact us directly at admin@ivrtechsolution.in.',
    });
  }
});

module.exports = router;
