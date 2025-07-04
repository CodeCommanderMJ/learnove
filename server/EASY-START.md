# 🚀 SUPER EASY START GUIDE

## Just 3 Steps!

### Step 1: Open Terminal
```bash
cd server
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start Server
```bash
npm run quick-start
```

That's it! 🎉

## What You'll See:
```
🚀 Starting Learnova Backend...
📦 Checking dependencies...
⚠️  MongoDB not available - using memory storage for demo
🔥 Starting Express server...
🚀 Learnova API server running on port 5000
```

## Test It Works:
Open your browser and go to: http://localhost:5000/health

You should see: `{"status":"success","message":"Learnova API is running"}`

## Need MongoDB Later?
1. Install MongoDB: https://www.mongodb.com/try/download/community
2. Or use MongoDB Atlas (cloud): https://www.mongodb.com/atlas
3. The server will automatically connect when MongoDB is available!

## Having Issues?
- Make sure you're in the `server` folder
- Run `npm install` first
- Check if port 5000 is free
- Contact support if needed!