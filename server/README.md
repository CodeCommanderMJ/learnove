# Learnova Backend API

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud)
- Redis (optional but recommended)
- Gmail account or SMTP service for emails

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Environment Setup
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your configuration
nano .env
```

### 3. Required Environment Variables
```env
# Database
MONGODB_URI=mongodb://localhost:27017/learnova

# JWT Secrets
JWT_SECRET=your-super-secret-jwt-key-here
JWT_REFRESH_SECRET=your-refresh-token-secret

# Email (Gmail example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=noreply@learnova.com
```

### 4. Start the Server

#### Development Mode
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

## 📋 Setup Checklist

### ✅ Database Setup
1. **MongoDB**: Install locally or use MongoDB Atlas
   ```bash
   # Local MongoDB
   mongod --dbpath /path/to/your/db
   
   # Or use MongoDB Atlas connection string
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/learnova
   ```

2. **Redis** (Optional - for caching and sessions)
   ```bash
   # Install Redis locally
   redis-server
   
   # Or use Redis cloud service
   REDIS_URL=redis://username:password@host:port
   ```

### ✅ Email Configuration
1. **Gmail Setup**:
   - Enable 2-factor authentication
   - Generate an App Password
   - Use the App Password in `SMTP_PASS`

2. **Other SMTP Services**:
   - SendGrid, Mailgun, etc.
   - Update SMTP settings accordingly

### ✅ Security Setup
1. **Generate Strong JWT Secrets**:
   ```bash
   # Generate random secrets
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

2. **CORS Configuration**:
   ```env
   FRONTEND_URL=http://localhost:3000
   ```

## 🔧 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/logout` - User logout
- `POST /api/v1/auth/refresh-token` - Refresh access token
- `POST /api/v1/auth/forgot-password` - Request password reset
- `POST /api/v1/auth/reset-password` - Reset password
- `GET /api/v1/auth/verify-email/:token` - Verify email
- `GET /api/v1/auth/me` - Get current user

### Users
- `GET /api/v1/users/profile` - Get user profile
- `PUT /api/v1/users/profile` - Update profile
- `POST /api/v1/users/avatar` - Upload avatar
- `GET /api/v1/users/stats` - Get user statistics

### Health Check
- `GET /health` - Server health status

## 🧪 Testing the API

### 1. Health Check
```bash
curl http://localhost:5000/health
```

### 2. Register a User
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe", 
    "email": "john@example.com",
    "password": "password123",
    "role": "student"
  }'
```

### 3. Login
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

## 🔍 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   ```
   Error: connect ECONNREFUSED 127.0.0.1:27017
   ```
   - Ensure MongoDB is running
   - Check connection string in `.env`

2. **Email Sending Fails**
   ```
   Error: Invalid login
   ```
   - Check Gmail App Password
   - Verify SMTP settings

3. **JWT Token Errors**
   ```
   Error: jwt malformed
   ```
   - Ensure JWT_SECRET is set
   - Check token format in requests

### Debug Mode
```bash
# Enable debug logging
DEBUG=* npm run dev
```

## 📁 Project Structure
```
server/
├── src/
│   ├── config/          # Database & Redis config
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth, error handling
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── services/        # Email, Socket.IO
│   └── server.js        # Main server file
├── .env.example         # Environment template
└── package.json         # Dependencies
```

## 🚀 Next Steps

1. **Set up your environment** following the checklist above
2. **Test the API** with the provided curl commands
3. **Connect your frontend** to the running backend
4. **Implement additional features** as needed

The backend is now ready to power your Learnova application! 🎉