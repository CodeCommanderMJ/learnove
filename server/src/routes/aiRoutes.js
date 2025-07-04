import express from 'express';
import { protect, checkSubscription } from '../middleware/authMiddleware.js';

const router = express.Router();

// Placeholder routes
router.post('/generate-content', protect, checkSubscription(['pro', 'educator', 'enterprise']), (req, res) => {
  res.json({ success: true, message: 'AI content generation endpoint' });
});

export default router;