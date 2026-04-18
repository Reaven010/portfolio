import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';

import { initDB } from './db.js';
import contactRoutes from './routes/contact.js';
import analyticsRoutes from './routes/analytics.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Security Middleware ───
app.use(helmet({
  contentSecurityPolicy: false,  // Allow inline scripts from Tailwind CDN
  crossOriginEmbedderPolicy: false
}));

app.use(cors({
  origin: [
    'http://localhost:5173',    // Vite dev server
    'http://localhost:3000',    // Self
    'http://127.0.0.1:5173',
    'http://127.0.0.1:3000'
  ],
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true
}));

// ─── Body Parsing ───
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// ─── Rate Limiting ───
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 5,                     // 5 submissions per window
  message: {
    success: false,
    error: 'Too many submissions. Please try again in 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

const generalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,   // 1 minute
  max: 100,                   // 100 requests per minute
  standardHeaders: true,
  legacyHeaders: false
});

app.use(generalLimiter);

// ─── Request Logging ───
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// ─── API Routes ───
app.use('/api/contact', contactLimiter, contactRoutes);
app.use('/api/analytics', analyticsRoutes);

// ─── Health Check ───
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'operational',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// ─── Serve Static Frontend (production) ───
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

// Serve code.html as the main page in production
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'code.html'));
});

// SPA fallback
app.get('*', (req, res) => {
  if (!req.url.startsWith('/api')) {
    res.sendFile(path.join(distPath, 'index.html'));
  }
});

// ─── Error Handler ───
app.use((err, req, res, next) => {
  console.error('⚠️  Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Something went wrong on the server.'
  });
});

// ─── Initialize & Start ───
initDB();

app.listen(PORT, () => {
  console.log('');
  console.log('╔══════════════════════════════════════════╗');
  console.log('║     ENGINEER.CX — Backend Server         ║');
  console.log('╠══════════════════════════════════════════╣');
  console.log(`║  🚀 Server running on port ${PORT}            ║`);
  console.log(`║  📡 API:  http://localhost:${PORT}/api        ║`);
  console.log('║  📊 Health: /api/health                   ║');
  console.log('║  📩 Contact: /api/contact                 ║');
  console.log('║  📈 Analytics: /api/analytics/stats       ║');
  console.log('╚══════════════════════════════════════════╝');
  console.log('');
});

export default app;
