import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  
  // Enrollment details
  enrolledAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'dropped', 'paused'],
    default: 'active'
  },
  
  // Progress tracking
  progress: {
    completedLessons: [{
      lesson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson'
      },
      completedAt: Date,
      timeSpent: Number, // in minutes
      score: Number // for quizzes/assignments
    }],
    currentLesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson'
    },
    overallProgress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    totalTimeSpent: {
      type: Number,
      default: 0 // in minutes
    }
  },
  
  // Completion details
  completedAt: Date,
  certificateIssued: {
    type: Boolean,
    default: false
  },
  certificateUrl: String,
  finalGrade: Number,
  
  // Learning preferences for this course
  preferences: {
    language: {
      type: String,
      default: 'en'
    },
    playbackSpeed: {
      type: Number,
      default: 1.0
    },
    subtitlesEnabled: {
      type: Boolean,
      default: false
    },
    notificationsEnabled: {
      type: Boolean,
      default: true
    }
  },
  
  // Payment information (if paid course)
  payment: {
    amount: Number,
    currency: String,
    stripePaymentIntentId: String,
    paidAt: Date
  },
  
  // Analytics
  lastAccessedAt: Date,
  accessCount: {
    type: Number,
    default: 0
  },
  
  // Notes and bookmarks
  notes: [{
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson'
    },
    content: String,
    timestamp: Number, // for video notes
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  bookmarks: [{
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson'
    },
    timestamp: Number,
    title: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Compound index to ensure unique enrollment per user per course
enrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

// Other indexes
enrollmentSchema.index({ status: 1 });
enrollmentSchema.index({ enrolledAt: -1 });
enrollmentSchema.index({ 'progress.overallProgress': -1 });

// Method to update progress
enrollmentSchema.methods.updateProgress = async function() {
  const Lesson = mongoose.model('Lesson');
  const totalLessons = await Lesson.countDocuments({ 
    course: this.course, 
    status: 'published' 
  });
  
  const completedCount = this.progress.completedLessons.length;
  this.progress.overallProgress = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;
  
  // Check if course is completed
  if (this.progress.overallProgress >= 100 && this.status !== 'completed') {
    this.status = 'completed';
    this.completedAt = new Date();
  }
  
  return this.save();
};

// Method to mark lesson as completed
enrollmentSchema.methods.completeLesson = async function(lessonId, timeSpent = 0, score = null) {
  // Check if lesson is already completed
  const existingCompletion = this.progress.completedLessons.find(
    cl => cl.lesson.toString() === lessonId.toString()
  );
  
  if (!existingCompletion) {
    this.progress.completedLessons.push({
      lesson: lessonId,
      completedAt: new Date(),
      timeSpent,
      score
    });
    
    this.progress.totalTimeSpent += timeSpent;
    this.lastAccessedAt = new Date();
    
    await this.updateProgress();
  }
  
  return this;
};

// Method to add note
enrollmentSchema.methods.addNote = function(lessonId, content, timestamp = null) {
  this.notes.push({
    lesson: lessonId,
    content,
    timestamp
  });
  return this.save();
};

// Method to add bookmark
enrollmentSchema.methods.addBookmark = function(lessonId, timestamp, title) {
  this.bookmarks.push({
    lesson: lessonId,
    timestamp,
    title
  });
  return this.save();
};

export default mongoose.model('Enrollment', enrollmentSchema);