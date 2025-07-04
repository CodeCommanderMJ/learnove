import express from 'express';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Placeholder routes
router.get('/messages/:courseId', protect, (req, res) => {
  res.json({ success: true, message: 'Chat messages endpoint' });
});

export default router;