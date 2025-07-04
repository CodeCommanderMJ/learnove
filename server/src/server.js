import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import mongoSanitize from 'express-mongo-sanitize';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

import connectDB from './config/database.js';
import { connectRedis } from './config/redis.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import { rateLimiter } from './middleware/rateLimiter.js';
import { setupSocketIO } from './services/socketService.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import lessonRoutes from './routes/lessonRoutes.js';
import progressRoutes from './routes/progressRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

// Load environment variables
dotenv.config();

// Connect to databases (with error handling)
try {
  connectDB();
} catch (error) {
  console.log('⚠️  Database connection skipped for demo');
}

try {
  connectRedis();
} catch (error) {
  console.log('⚠️  Redis connection skipped for demo');
}

const app = express();
const server = createServer(app);

// Setup Socket.IO with error handling
let io;
try {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });
  setupSocketIO(io);
} catch (error) {
  console.log('⚠️  Socket.IO setup skipped');
}

// Security middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: false
}));
app.use(mongoSanitize());
app.use(compression());

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting (with error handling)
try {
  app.use('/api/', rateLimiter);
} catch (error) {
  console.log('⚠️  Rate limiting disabled for demo');
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Learnova API is running',
    timestamp: new Date().toISOString(),
    version: process.env.API_VERSION || 'v1',
    environment: process.env.NODE_ENV || 'development'
  });
});

// API routes
const apiVersion = process.env.API_VERSION || 'v1';
app.use(`/api/${apiVersion}/auth`, authRoutes);
app.use(`/api/${apiVersion}/users`, userRoutes);
app.use(`/api/${apiVersion}/courses`, courseRoutes);
app.use(`/api/${apiVersion}/lessons`, lessonRoutes);
app.use(`/api/${apiVersion}/progress`, progressRoutes);
app.use(`/api/${apiVersion}/ai`, aiRoutes);
app.use(`/api/${apiVersion}/payments`, paymentRoutes);
app.use(`/api/${apiVersion}/analytics`, analyticsRoutes);
app.use(`/api/${apiVersion}/chat`, chatRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Learnova API server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 API Version: ${apiVersion}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/health`);
  console.log(`📚 API docs: http://localhost:${PORT}/api/${apiVersion}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated');
  });
});

export default app;