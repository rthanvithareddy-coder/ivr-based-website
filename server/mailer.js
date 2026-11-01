const nodemailer = require('nodemailer');

const hasSmtpConfig = !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

let transporter = null;
if (hasSmtpConfig) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

/**
 * Sends notification email or logs to console if SMTP not configured.
 */
async function sendNotificationEmail({ subject, html, text }) {
  const recipient = process.env.NOTIFICATION_EMAIL || 'admin@ivrtechsolution.in';

  if (transporter) {
    try {
      const info = await transporter.sendMail({
        from: `"IVR Tech Solutions Web Notification" <${process.env.SMTP_USER}>`,
        to: recipient,
        subject,
        text,
        html,
      });
      console.log(`[MAILER] Notification dispatched to ${recipient}: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (err) {
      console.error('[MAILER] SMTP Error:', err.message);
      return { success: false, error: err.message };
    }
  } else {
    console.log(`\n======================================================`);
    console.log(`[MAILER FALLBACK] Outgoing Email Notification:`);
    console.log(`To: ${recipient}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message Preview:\n${text}`);
    console.log(`======================================================\n`);
    return { success: true, fallback: true };
  }
}

module.exports = { sendNotificationEmail };
