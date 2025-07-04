#!/usr/bin/env node

console.log('🚀 Starting Learnova Backend...\n');

// Check if MongoDB is needed
const mongoose = require('mongoose');

async function startServer() {
  try {
    console.log('📦 Checking dependencies...');
    
    // Try to connect to MongoDB (optional for now)
    try {
      await mongoose.connect('mongodb://localhost:27017/learnova', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 3000 // 3 second timeout
      });
      console.log('✅ MongoDB connected successfully');
    } catch (error) {
      console.log('⚠️  MongoDB not available - using memory storage for demo');
      console.log('   (Install MongoDB later for full functionality)');
    }

    // Start the main server
    console.log('🔥 Starting Express server...');
    require('./src/server.js');
    
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    console.log('\n💡 Try running: npm install');
    process.exit(1);
  }
}

startServer();