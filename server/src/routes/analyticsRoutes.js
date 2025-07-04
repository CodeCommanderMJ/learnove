import express from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Placeholder routes
router.get('/dashboard', protect, authorize('admin', 'educator'), (req, res) => {
  res.json({ success: true, message: 'Analytics dashboard endpoint' });
});

export default router;