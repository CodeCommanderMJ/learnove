import express from 'express';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Placeholder routes
router.post('/create-subscription', protect, (req, res) => {
  res.json({ success: true, message: 'Create subscription endpoint' });
});

export default router;