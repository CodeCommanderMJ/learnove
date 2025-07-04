import express from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Placeholder routes
router.get('/', protect, (req, res) => {
  res.json({ success: true, message: 'Lessons endpoint' });
});

export default router;