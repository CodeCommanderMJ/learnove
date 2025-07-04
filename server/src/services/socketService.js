import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const setupSocketIO = (io) => {
  // Authentication middleware for Socket.IO
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      
      if (!token) {
        return next(new Error('Authentication error'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user) {
        return next(new Error('User not found'));
      }

      socket.userId = user._id.toString();
      socket.user = user;
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`User ${socket.user.email} connected`);

    // Join user to their personal room
    socket.join(`user:${socket.userId}`);

    // Handle joining course rooms
    socket.on('join-course', (courseId) => {
      socket.join(`course:${courseId}`);
      console.log(`User ${socket.user.email} joined course ${courseId}`);
    });

    // Handle leaving course rooms
    socket.on('leave-course', (courseId) => {
      socket.leave(`course:${courseId}`);
      console.log(`User ${socket.user.email} left course ${courseId}`);
    });

    // Handle real-time chat messages
    socket.on('send-message', (data) => {
      const { courseId, message, type = 'text' } = data;
      
      // Broadcast message to all users in the course
      socket.to(`course:${courseId}`).emit('new-message', {
        id: Date.now(),
        userId: socket.userId,
        userName: socket.user.fullName,
        userAvatar: socket.user.avatar,
        message,
        type,
        timestamp: new Date(),
        courseId
      });
    });

    // Handle typing indicators
    socket.on('typing-start', (data) => {
      socket.to(`course:${data.courseId}`).emit('user-typing', {
        userId: socket.userId,
        userName: socket.user.fullName,
        courseId: data.courseId
      });
    });

    socket.on('typing-stop', (data) => {
      socket.to(`course:${data.courseId}`).emit('user-stopped-typing', {
        userId: socket.userId,
        courseId: data.courseId
      });
    });

    // Handle lesson progress updates
    socket.on('lesson-progress', (data) => {
      const { courseId, lessonId, progress } = data;
      
      // Broadcast progress to instructors and admins in the course
      socket.to(`course:${courseId}`).emit('student-progress-update', {
        userId: socket.userId,
        userName: socket.user.fullName,
        lessonId,
        progress,
        timestamp: new Date()
      });
    });

    // Handle AI assistance requests
    socket.on('ai-assistance-request', (data) => {
      // This would trigger AI processing
      // For now, just acknowledge the request
      socket.emit('ai-assistance-response', {
        requestId: data.requestId,
        status: 'processing',
        message: 'AI is analyzing your question...'
      });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`User ${socket.user.email} disconnected`);
    });
  });

  return io;
};

// Helper functions to emit events from other parts of the application
export const emitToUser = (io, userId, event, data) => {
  io.to(`user:${userId}`).emit(event, data);
};

export const emitToCourse = (io, courseId, event, data) => {
  io.to(`course:${courseId}`).emit(event, data);
};

export const emitToAll = (io, event, data) => {
  io.emit(event, data);
};