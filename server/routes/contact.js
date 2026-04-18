import { Router } from 'express';
import { getDB } from '../db.js';

const router = Router();

// POST /api/contact — Submit the contact form
router.post('/', (req, res) => {
  const { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'All fields are required: name, email, message'
    });
  }

  if (typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({
      success: false,
      error: 'Name must be at least 2 characters'
    });
  }

  // Simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'Please provide a valid email address'
    });
  }

  if (typeof message !== 'string' || message.trim().length < 10) {
    return res.status(400).json({
      success: false,
      error: 'Message must be at least 10 characters'
    });
  }

  try {
    const db = getDB();
    const stmt = db.prepare(`
      INSERT INTO contacts (name, email, message, ip_address, user_agent)
      VALUES (?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      name.trim(),
      email.trim().toLowerCase(),
      message.trim(),
      req.ip,
      req.get('User-Agent') || 'unknown'
    );

    console.log(`📩 New contact from ${name} <${email}> (ID: ${result.lastInsertRowid})`);

    res.status(201).json({
      success: true,
      message: 'Transmission received successfully. I\'ll get back to you soon!'
    });
  } catch (err) {
    console.error('❌ Failed to save contact:', err);
    res.status(500).json({
      success: false,
      error: 'Internal server error. Please try again later.'
    });
  }
});

// GET /api/contact — List all contact submissions (admin)
router.get('/', (req, res) => {
  try {
    const db = getDB();
    const contacts = db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all();
    res.json({ success: true, data: contacts, total: contacts.length });
  } catch (err) {
    console.error('❌ Failed to fetch contacts:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// PATCH /api/contact/:id/read — Mark a contact as read
router.patch('/:id/read', (req, res) => {
  try {
    const db = getDB();
    const result = db.prepare('UPDATE contacts SET status = ? WHERE id = ?').run('read', req.params.id);
    if (result.changes === 0) {
      return res.status(404).json({ success: false, error: 'Contact not found' });
    }
    res.json({ success: true, message: 'Marked as read' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// DELETE /api/contact/:id — Delete a contact submission
router.delete('/:id', (req, res) => {
  try {
    const db = getDB();
    const result = db.prepare('DELETE FROM contacts WHERE id = ?').run(req.params.id);
    if (result.changes === 0) {
      return res.status(404).json({ success: false, error: 'Contact not found' });
    }
    res.json({ success: true, message: 'Contact deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

export default router;
