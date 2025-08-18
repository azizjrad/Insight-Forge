# Deployment Guide - InsightForge Dashboard

## 🌍 Environment Configuration

The application uses environment variables to handle different deployment scenarios. This eliminates hardcoded URLs and makes deployment flexible.

## 📁 Environment Files

### Development

**File**: `.env.local` (git-ignored)

```env
VITE_API_BASE_URL=http://localhost:5000
```

### Staging

**File**: `.env.staging`

```env
VITE_API_BASE_URL=https://staging-api.yourcompany.com
```

### Production

**File**: `.env.production`

```env
VITE_API_BASE_URL=https://api.yourcompany.com
```

## 🚀 Deployment Scenarios

### 1. Local Development

```bash
# 1. Copy environment template
cp .env.example .env.local

# 2. Start backend
cd backend && python app.py

# 3. Start frontend
npm run dev
```

**Result**: Frontend connects to `http://localhost:5000`

### 2. Docker Deployment

```dockerfile
# In your Dockerfile
ENV VITE_API_BASE_URL=https://your-api-domain.com

# Or use docker-compose.yml
environment:
  - VITE_API_BASE_URL=https://your-api-domain.com
```

### 3. Vercel/Netlify Deployment

```bash
# Set environment variables in your deployment platform:
VITE_API_BASE_URL=https://your-production-api.herokuapp.com
```

### 4. Cloud Deployment (AWS/GCP/Azure)

```bash
# Export environment variables
export VITE_API_BASE_URL=https://your-cloud-api.amazonaws.com

# Build for production
npm run build
```

## 🔧 Configuration Options

### Backend API Configuration

The app automatically detects the environment and configures API endpoints:

```typescript
// Development
VITE_API_BASE_URL=http://localhost:5000

// Production
VITE_API_BASE_URL=https://api.production.com

// Custom port
VITE_API_BASE_URL=http://localhost:3001
```

### CORS Configuration

Update `backend/app.py` to allow your frontend domains:

```python
CORS(app, origins=[
    "http://localhost:3000",    # React default
    "http://localhost:5173",    # Vite default
    "http://localhost:8080",    # Alternative port
    "https://yourdomain.com",   # Production
    "https://staging.yourdomain.com"  # Staging
])
```

## 📋 Deployment Checklist

### Frontend

- [ ] Set `VITE_API_BASE_URL` environment variable
- [ ] Build with `npm run build`
- [ ] Deploy `dist` folder to your hosting service
- [ ] Verify API calls work in browser console

### Backend

- [ ] Set up Python environment
- [ ] Install dependencies: `pip install -r requirements.txt`
- [ ] Initialize database: `python init_database.py`
- [ ] Configure CORS for your frontend domain
- [ ] Start Flask app: `python app.py`
- [ ] Test API endpoints

### Database

- [ ] SQLite file is created at `backend/insightforge.db`
- [ ] Admin user exists: `demo@example.com`
- [ ] All tables are populated with seed data

## 🛠️ Environment Variable Priority

1. **`.env.local`** - Local development (highest priority)
2. **`.env.production`** - Production build
3. **`.env`** - Default fallback
4. **Hardcoded fallback** - `http://localhost:5000` (development only)

## 🔍 Troubleshooting

### "Network Error" or CORS Issues

1. Check `VITE_API_BASE_URL` in environment
2. Verify backend CORS configuration
3. Ensure backend is running and accessible

### Environment Variables Not Loading

1. Restart development server after changing `.env` files
2. Ensure variables start with `VITE_`
3. Check console for API URL: `console.log(import.meta.env.VITE_API_BASE_URL)`

### API Calls Failing

1. Open browser DevTools → Network tab
2. Check if requests go to correct URL
3. Verify backend responds to `/api/kpis` endpoint

## ✅ Benefits of This Approach

✅ **No hardcoded URLs** - Easy to change environments
✅ **Flexible deployment** - Works with any hosting service  
✅ **Environment isolation** - Dev/staging/prod separation
✅ **Team friendly** - Each developer can use different local ports
✅ **CI/CD ready** - Environment variables can be injected during build

## 🔗 Quick Test

After deployment, test the configuration:

```bash
# Check if environment is loaded correctly
curl https://your-frontend-domain.com

# Test API connectivity
curl https://your-api-domain.com/api/kpis

# Test authentication
curl -X POST https://your-api-domain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@example.com","password":"password"}'
```
