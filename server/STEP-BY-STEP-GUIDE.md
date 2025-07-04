# 🚀 STEP-BY-STEP SETUP GUIDE

## Prerequisites
- Node.js (v18 or higher) - Download from https://nodejs.org/
- A terminal/command prompt

## Step 1: Navigate to Server Directory
```bash
cd server
```

## Step 2: Install Dependencies
```bash
npm install
```
*This will install all required packages. Wait for it to complete.*

## Step 3: Start the Server
```bash
npm run quick-start
```

## What You Should See:
```
🚀 Starting Learnova Backend...
📦 Checking dependencies...
✅ Environment configured
🔥 Starting Express server...
⚠️  No REDIS_URL provided, skipping Redis connection
🚀 Learnova API server running on port 3001
📊 Environment: development
🔗 API Version: v1
🌐 Health check: http://localhost:3001/health
📚 API docs: http://localhost:3001/api/v1
```

## Step 4: Test the Server
Open your browser and go to: **http://localhost:3001/health**

You should see:
```json
{
  "status": "success",
  "message": "Learnova API is running",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "version": "v1",
  "environment": "development"
}
```

## Step 5: Test API Endpoints
Try these URLs in your browser:

1. **Root endpoint**: http://localhost:3001/
2. **Health check**: http://localhost:3001/health
3. **API base**: http://localhost:3001/api/v1/

## Common Issues & Solutions

### Issue: Port Already in Use
**Error**: `EADDRINUSE: address already in use :::3001`

**Solution**: 
1. Stop any running servers with `Ctrl+C`
2. Or change the port in `.env` file:
   ```
   PORT=3002
   ```

### Issue: Dependencies Not Installed
**Error**: `Cannot find module...`

**Solution**: 
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Permission Denied
**Error**: `EACCES: permission denied`

**Solution**: 
```bash
sudo npm install
```

## Optional: Database Setup

### For MongoDB (Optional)
1. Install MongoDB: https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. Add to `.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/learnova
   ```

### For Redis (Optional)
1. Install Redis: https://redis.io/download
2. Start Redis service
3. Add to `.env`:
   ```
   REDIS_URL=redis://localhost:6379
   ```

## Next Steps
1. ✅ Backend is running on port 3001
2. ✅ Frontend should run on port 5173 (Vite default)
3. ✅ Test API endpoints work
4. 🎉 You're ready to develop!

## Need Help?
- Check the console for error messages
- Make sure you're in the `server` directory
- Ensure Node.js is installed: `node --version`
- Try restarting: `Ctrl+C` then `npm run quick-start`