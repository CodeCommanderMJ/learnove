import express from 'express';
import { body } from 'express-validator';
import {
  getProfile,
  updateProfile,
  uploadAvatar,
  deleteAccount,
  getUserStats,
  updatePreferences
} from '../controllers/userController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Profile routes
router.get('/profile', getProfile);
router.put('/profile', [
  body('firstName').optional().trim().isLength({ min: 2, max: 50 }),
  body('lastName').optional().trim().isLength({ min: 2, max: 50 }),
  body('bio').optional().isLength({ max: 500 })
], updateProfile);

// Avatar upload
router.post('/avatar', uploadAvatar);

// User preferences
router.put('/preferences', updatePreferences);

// User statistics
router.get('/stats', getUserStats);

// Delete account
router.delete('/account', deleteAccount);

export default router;