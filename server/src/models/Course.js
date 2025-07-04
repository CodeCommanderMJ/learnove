import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Course description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  shortDescription: {
    type: String,
    maxlength: [500, 'Short description cannot exceed 500 characters']
  },
  
  // Course metadata
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'programming', 'mathematics', 'science', 'language', 'business',
      'design', 'music', 'health', 'history', 'literature', 'other'
    ]
  },
  subcategory: String,
  tags: [String],
  
  // Course structure
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  language: {
    type: String,
    default: 'en'
  },
  supportedLanguages: [{
    type: String,
    default: ['en']
  }],
  
  // Content
  thumbnail: String,
  previewVideo: String,
  estimatedDuration: {
    type: Number, // in minutes
    required: true
  },
  
  // Instructor information
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  coInstructors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  
  // Pricing
  pricing: {
    type: {
      type: String,
      enum: ['free', 'paid', 'subscription'],
      default: 'free'
    },
    amount: {
      type: Number,
      default: 0
    },
    currency: {
      type: String,
      default: 'USD'
    }
  },
  
  // Course status
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  
  // Analytics
  enrollmentCount: {
    type: Number,
    default: 0
  },
  completionRate: {
    type: Number,
    default: 0
  },
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalRatings: {
    type: Number,
    default: 0
  },
  
  // AI-generated content flags
  aiGenerated: {
    content: {
      type: Boolean,
      default: false
    },
    translations: [{
      language: String,
      generatedAt: Date
    }]
  },
  
  // Course requirements and outcomes
  prerequisites: [String],
  learningOutcomes: [String],
  targetAudience: [String],
  
  // Publishing information
  publishedAt: Date,
  lastUpdated: Date
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for lessons
courseSchema.virtual('lessons', {
  ref: 'Lesson',
  localField: '_id',
  foreignField: 'course',
  options: { sort: { order: 1 } }
});

// Virtual for reviews
courseSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'course'
});

// Virtual for enrollments
courseSchema.virtual('enrollments', {
  ref: 'Enrollment',
  localField: '_id',
  foreignField: 'course'
});

// Pre-save middleware
courseSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  this.lastUpdated = new Date();
  next();
});

// Method to calculate completion rate
courseSchema.methods.calculateCompletionRate = async function() {
  const Enrollment = mongoose.model('Enrollment');
  const totalEnrollments = await Enrollment.countDocuments({ course: this._id });
  const completedEnrollments = await Enrollment.countDocuments({ 
    course: this._id, 
    status: 'completed' 
  });
  
  this.completionRate = totalEnrollments > 0 ? (completedEnrollments / totalEnrollments) * 100 : 0;
  return this.save({ validateBeforeSave: false });
};

// Method to update average rating
courseSchema.methods.updateAverageRating = async function() {
  const Review = mongoose.model('Review');
  const stats = await Review.aggregate([
    { $match: { course: this._id } },
    {
      $group: {
        _id: '$course',
        averageRating: { $avg: '$rating' },
        totalRatings: { $sum: 1 }
      }
    }
  ]);
  
  if (stats.length > 0) {
    this.averageRating = Math.round(stats[0].averageRating * 10) / 10;
    this.totalRatings = stats[0].totalRatings;
  } else {
    this.averageRating = 0;
    this.totalRatings = 0;
  }
  
  return this.save({ validateBeforeSave: false });
};

// Indexes for performance
courseSchema.index({ instructor: 1 });
courseSchema.index({ category: 1, level: 1 });
courseSchema.index({ status: 1, isPublic: 1 });
courseSchema.index({ tags: 1 });
courseSchema.index({ averageRating: -1 });
courseSchema.index({ enrollmentCount: -1 });
courseSchema.index({ createdAt: -1 });

export default mongoose.model('Course', courseSchema);