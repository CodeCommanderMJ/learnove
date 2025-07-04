import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Lesson title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  
  // Lesson structure
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  duration: {
    type: Number, // in minutes
    required: true
  },
  
  // Content types
  contentType: {
    type: String,
    enum: ['video', 'text', 'interactive', 'quiz', 'assignment'],
    required: true
  },
  
  // Content data
  content: {
    // Video content
    videoUrl: String,
    videoTranscript: String,
    
    // Text content
    textContent: String,
    
    // Interactive content
    interactiveElements: [{
      type: {
        type: String,
        enum: ['mindmap', 'diagram', 'simulation', 'code_editor']
      },
      data: mongoose.Schema.Types.Mixed
    }],
    
    // Quiz content
    questions: [{
      question: String,
      type: {
        type: String,
        enum: ['multiple_choice', 'true_false', 'short_answer', 'essay']
      },
      options: [String], // for multiple choice
      correctAnswer: mongoose.Schema.Types.Mixed,
      explanation: String,
      points: {
        type: Number,
        default: 1
      }
    }],
    
    // Assignment content
    assignment: {
      instructions: String,
      submissionType: {
        type: String,
        enum: ['text', 'file', 'url', 'code']
      },
      maxPoints: Number,
      dueDate: Date
    }
  },
  
  // AI-generated content
  aiGenerated: {
    content: {
      type: Boolean,
      default: false
    },
    mindMap: {
      type: Boolean,
      default: false
    },
    translations: [{
      language: String,
      content: mongoose.Schema.Types.Mixed,
      generatedAt: Date
    }],
    explanations: [{
      level: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced']
      },
      content: String,
      generatedAt: Date
    }]
  },
  
  // Lesson settings
  isPreview: {
    type: Boolean,
    default: false
  },
  isRequired: {
    type: Boolean,
    default: true
  },
  prerequisites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson'
  }],
  
  // Resources
  resources: [{
    title: String,
    type: {
      type: String,
      enum: ['pdf', 'link', 'video', 'audio', 'image']
    },
    url: String,
    description: String
  }],
  
  // Analytics
  viewCount: {
    type: Number,
    default: 0
  },
  completionRate: {
    type: Number,
    default: 0
  },
  averageTimeSpent: {
    type: Number, // in minutes
    default: 0
  },
  
  // Status
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for progress tracking
lessonSchema.virtual('userProgress', {
  ref: 'LessonProgress',
  localField: '_id',
  foreignField: 'lesson'
});

// Method to generate AI explanation for different levels
lessonSchema.methods.generateAIExplanation = async function(level = 'intermediate') {
  // This would integrate with AI service
  // For now, return a placeholder
  const explanation = {
    level,
    content: `AI-generated explanation for ${this.title} at ${level} level`,
    generatedAt: new Date()
  };
  
  this.aiGenerated.explanations.push(explanation);
  return this.save();
};

// Method to translate content
lessonSchema.methods.translateContent = async function(targetLanguage) {
  // This would integrate with translation service
  const translation = {
    language: targetLanguage,
    content: {
      title: this.title, // translated
      description: this.description, // translated
      textContent: this.content.textContent // translated
    },
    generatedAt: new Date()
  };
  
  this.aiGenerated.translations.push(translation);
  return this.save();
};

// Indexes for performance
lessonSchema.index({ course: 1, order: 1 });
lessonSchema.index({ contentType: 1 });
lessonSchema.index({ status: 1 });
lessonSchema.index({ isPreview: 1 });

export default mongoose.model('Lesson', lessonSchema);