import { validationResult } from 'express-validator';
import User from '../models/User.js';
import Enrollment from '../models/Enrollment.js';

// @desc    Get user profile
// @route   GET /api/v1/users/profile
// @access  Private
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('enrolledCourses')
      .select('-password');

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/v1/users/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const allowedFields = [
      'firstName', 'lastName', 'bio', 'dateOfBirth', 
      'country', 'timezone', 'preferredLanguages'
    ];
    
    const updates = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Upload user avatar
// @route   POST /api/v1/users/avatar
// @access  Private
export const uploadAvatar = async (req, res) => {
  try {
    // This would integrate with Cloudinary or similar service
    // For now, just return a placeholder
    const avatarUrl = 'https://via.placeholder.com/150';
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar: avatarUrl },
      { new: true }
    ).select('-password');

    res.status(200).json({
      success: true,
      data: { avatar: avatarUrl },
      message: 'Avatar uploaded successfully'
    });
  } catch (error) {
    console.error('Upload avatar error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update user preferences
// @route   PUT /api/v1/users/preferences
// @access  Private
export const updatePreferences = async (req, res) => {
  try {
    const { learningStyle, difficultyLevel, preferredLanguages } = req.body;
    
    const updates = {};
    if (learningStyle) updates.learningStyle = learningStyle;
    if (difficultyLevel) updates.difficultyLevel = difficultyLevel;
    if (preferredLanguages) updates.preferredLanguages = preferredLanguages;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json({
      success: true,
      data: user,
      message: 'Preferences updated successfully'
    });
  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get user statistics
// @route   GET /api/v1/users/stats
// @access  Private
export const getUserStats = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ user: req.user._id })
      .populate('course', 'title category');

    const stats = {
      totalCourses: enrollments.length,
      completedCourses: enrollments.filter(e => e.status === 'completed').length,
      inProgressCourses: enrollments.filter(e => e.status === 'active').length,
      totalTimeSpent: enrollments.reduce((total, e) => total + e.progress.totalTimeSpent, 0),
      averageProgress: enrollments.length > 0 
        ? enrollments.reduce((total, e) => total + e.progress.overallProgress, 0) / enrollments.length 
        : 0,
      coursesByCategory: {}
    };

    // Group courses by category
    enrollments.forEach(enrollment => {
      const category = enrollment.course.category;
      if (!stats.coursesByCategory[category]) {
        stats.coursesByCategory[category] = 0;
      }
      stats.coursesByCategory[category]++;
    });

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete user account
// @route   DELETE /api/v1/users/account
// @access  Private
export const deleteAccount = async (req, res) => {
  try {
    // Soft delete - deactivate account
    await User.findByIdAndUpdate(req.user._id, { isActive: false });

    res.status(200).json({
      success: true,
      message: 'Account deactivated successfully'
    });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};