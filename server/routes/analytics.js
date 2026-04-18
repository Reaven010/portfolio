import { Router } from 'express';
import { getDB } from '../db.js';

const router = Router();

// POST /api/analytics/pageview — Track a page view
router.post('/pageview', (req, res) => {
  const { page, referrer } = req.body;

  if (!page) {
    return res.status(400).json({ success: false, error: 'Page is required' });
  }

  try {
    const db = getDB();
    db.prepare(`
      INSERT INTO page_views (page, referrer, ip_address, user_agent)
      VALUES (?, ?, ?, ?)
    `).run(
      page,
      referrer || null,
      req.ip,
      req.get('User-Agent') || 'unknown'
    );

    res.status(201).json({ success: true });
  } catch (err) {
    console.error('❌ Failed to log pageview:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// GET /api/analytics/stats — Get analytics summary
router.get('/stats', (req, res) => {
  try {
    const db = getDB();

    const totalViews = db.prepare('SELECT COUNT(*) as count FROM page_views').get();
    const uniqueVisitors = db.prepare('SELECT COUNT(DISTINCT ip_address) as count FROM page_views').get();
    const todayViews = db.prepare(`
      SELECT COUNT(*) as count FROM page_views 
      WHERE date(created_at) = date('now')
    `).get();
    const topPages = db.prepare(`
      SELECT page, COUNT(*) as views 
      FROM page_views 
      GROUP BY page 
      ORDER BY views DESC 
      LIMIT 10
    `).all();
    const recentViews = db.prepare(`
      SELECT page, ip_address, created_at 
      FROM page_views 
      ORDER BY created_at DESC 
      LIMIT 20
    `).all();

    res.json({
      success: true,
      data: {
        totalViews: totalViews.count,
        uniqueVisitors: uniqueVisitors.count,
        todayViews: todayViews.count,
        topPages,
        recentViews
      }
    });
  } catch (err) {
    console.error('❌ Failed to fetch analytics:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

export default router;
