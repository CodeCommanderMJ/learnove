#!/usr/bin/env node

console.log('🚀 Starting Learnova Backend...\n');

// Load environment variables first
import dotenv from 'dotenv';
dotenv.config();

async function startServer() {
  try {
    console.log('📦 Checking dependencies...');
    
    // Set default environment variables if not set
    if (!process.env.NODE_ENV) {
      process.env.NODE_ENV = 'development';
    }
    if (!process.env.PORT) {
      process.env.PORT = '5000';
    }
    if (!process.env.JWT_SECRET) {
      process.env.JWT_SECRET = 'demo-jwt-secret-key-for-development';
    }
    if (!process.env.JWT_REFRESH_SECRET) {
      process.env.JWT_REFRESH_SECRET = 'demo-refresh-secret-key-for-development';
    }
    if (!process.env.FRONTEND_URL) {
      process.env.FRONTEND_URL = 'http://localhost:3000';
    }
    if (!process.env.EMAIL_FROM) {
      process.env.EMAIL_FROM = 'noreply@learnova.com';
    }

    console.log('✅ Environment configured');
    
    // Start the main server
    console.log('🔥 Starting Express server...');
    await import('./src/server.js');
    
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    console.log('\n💡 Troubleshooting:');
    console.log('   1. Make sure you ran: npm install');
    console.log('   2. Check if port 5000 is available');
    console.log('   3. Try: npm run start instead');
    process.exit(1);
  }
}

startServer();