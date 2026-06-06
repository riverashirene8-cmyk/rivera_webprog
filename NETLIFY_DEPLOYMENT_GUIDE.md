# Netlify Deployment Guide - Rivera WebProg

## Prerequisites
- Netlify account (free at netlify.com)
- GitHub repository with both client and server code
- Hosted backend (see server deployment options below)

---

## Part 1: Deploy Client to Netlify

### Step 1: Add Environment Variables
1. Go to your Netlify project dashboard
2. Navigate to **Site settings > Build & deploy > Environment**
3. Add these environment variables:
   ```
   VITE_API_URL = https://your-server-domain.com/api
   ```
   (Replace with your actual server URL)

### Step 2: Configure Build Settings
Netlify should automatically detect these, but verify:
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 18+ (set in netlify.toml or .nvmrc)

### Step 3: Deploy
- Connect your GitHub repository
- Select the `rivera-client` folder (if monorepo)
- Click Deploy

Your site will be live instantly!

---

## Part 2: Deploy Server

### Option A: Deploy to Railway (⭐ Recommended)

1. Go to [railway.app](https://railway.app)
2. Create account and connect GitHub
3. Create new project → Import from GitHub
4. Select your `rivera-server` folder
5. Add environment variables in Railway:
   ```
   MONGO_URI = your-mongodb-uri
   JWT_SECRET = your-jwt-secret
   CLIENT_ORIGIN = https://your-netlify-site.netlify.app
   NODE_ENV = production
   ```
6. Deploy and copy your Railway URL

### Option B: Deploy to Render

1. Go to [render.com](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Select `rivera-server` root directory
5. Configure same environment variables
6. Deploy

### Option C: Keep on Vercel (if already working)
Just update `CLIENT_ORIGIN` with your Netlify URL.

---

## Part 3: Update Configuration

### For Client (after you have server URL):

Create `.env.production` or set in Netlify:
```
VITE_API_URL=https://your-server-url.com/api
```

### For Server (after you have Netlify client URL):

Update environment variables with:
```
CLIENT_ORIGIN=https://your-netlify-app.netlify.app
```

---

## Part 4: Test Your Deployment

1. Visit your Netlify client URL
2. Try signing in/up
3. Check browser DevTools for any API errors
4. Verify connection to your server

---

## Troubleshooting

### Issue: "VITE_API_URL is missing" on Netlify
**Fix**: Add `VITE_API_URL` in Netlify Site settings > Environment

### Issue: CORS errors when calling API
**Fix**: Server needs `CLIENT_ORIGIN` set to your Netlify URL

### Issue: 404 on page refresh
**Fix**: netlify.toml has redirect rule - already configured ✓

---

## Quick Netlify Environment Variable Setup

Go to Netlify > Site settings > Build & deploy > Environment and add:

```
VITE_API_URL = [your backend server URL with /api]
```

Example: `https://rivera-server-xyz.railway.app/api`
