# Netlify Deployment - Quick Checklist

## ✅ What I've Done for You

1. ✅ Created `netlify.toml` - Netlify configuration with proper redirects
2. ✅ Created `NETLIFY_DEPLOYMENT_GUIDE.md` - Complete deployment guide
3. ✅ Updated `rivera-server/index.js` - Removed Vercel-specific hardcoding
4. ✅ Created `.env.example` files - For reference
5. ✅ Added `.nvmrc` - Node version specification

## 📋 Next Steps (YOU DO THIS)

### A. Set Up Server (Choose One)

**RECOMMENDED: Deploy to Railway**
1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Select your `rivera-webprog` repository
4. Configure root directory as `rivera-server`
5. Add Environment Variables:
   ```
   MONGO_URI = [your MongoDB connection string]
   JWT_SECRET = [generate a strong secret]
   NODE_ENV = production
   ```
6. Deploy - Copy your Railway URL (e.g., `https://rivera-server-xyz.railway.app`)

**ALTERNATIVE: Use Vercel, Render, or Heroku**

### B. Deploy Client to Netlify

1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect GitHub
4. Select your repository
5. Configure:
   - **Base directory**: `rivera-client`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Add Environment Variable (before deploying):
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-railway-url.com/api` (or wherever your server is)
7. Click Deploy

### C. Update CORS on Server

1. Go to your Railway/Render dashboard
2. Add environment variable:
   ```
   CLIENT_ORIGIN = https://your-netlify-app.netlify.app
   ```
3. Redeploy server

### D. Test Your Deployment

1. Visit your Netlify site
2. Try to sign in/up
3. Check browser console for errors
4. Verify API calls are working

## 🐛 Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| "VITE_API_URL is missing" | Add env var in Netlify Site settings |
| CORS errors when calling API | Server needs `CLIENT_ORIGIN` set to your Netlify URL |
| 404 on page refresh | Already fixed with `netlify.toml` |
| API calls return HTML | Check your `VITE_API_URL` is correct |

## 📞 Need Help?

Run this to test locally first:
```bash
# Terminal 1: Start server
cd rivera-server
npm install
npm run dev

# Terminal 2: Start client
cd rivera-client
VITE_API_URL=http://localhost:5000/api npm run dev
```

Visit `http://localhost:5173` and test the app
