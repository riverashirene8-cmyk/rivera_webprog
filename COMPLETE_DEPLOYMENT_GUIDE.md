# 🚀 Complete Deployment Guide - Netlify + Railway

This guide will walk you through deploying your entire application:
- **Client**: Netlify (React frontend)
- **Server**: Railway (Node.js backend)

---

## ⚡ Quick Start (5 minutes)

### For the IMPATIENT:
1. Deploy server to Railway first (takes 2 min)
2. Get server URL
3. Deploy client to Netlify with server URL (takes 2 min)
4. Done!

---

## 📚 Part 1: Deploy Server to Railway

### Step 1: Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub (easiest)
3. Authorize access to your GitHub account

### Step 2: Create New Project
1. Click **"New Project"** button
2. Select **"Deploy from GitHub repo"**
3. Search for and select `rivera_webprog` repository
4. Click **"Deploy now"**

### Step 3: Configure Build & Start
Railway should auto-detect everything, but verify:
- **Root directory**: `rivera-server` (if monorepo)
- **Install command**: `npm install` (auto)
- **Start command**: `node index.js` (auto, or use our Procfile)

### Step 4: Add Environment Variables
In Railway dashboard:
1. Go to **Variables** tab
2. Click **"Raw Editor"**
3. Add these variables:

```
MONGO_URI=mongodb+srv://riverashirene8_db_user:ysjm3D3A21o7EMLR@mywebsite.vfemgec.mongodb.net/rivera?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_here
NODE_ENV=production
CLIENT_ORIGIN=https://your-netlify-app.netlify.app
PORT=5000
```

⚠️ **You'll update CLIENT_ORIGIN after deploying the client**

### Step 5: Deploy
- Railway auto-deploys when you save variables
- Wait 1-2 minutes for build to complete
- Copy your Railway URL when done (e.g., `https://rivera-server-xyz.railway.app`)

✅ **Server is now live!**

---

## 📚 Part 2: Deploy Client to Netlify

### Step 1: Create Netlify Account
1. Go to https://netlify.com
2. Sign up with GitHub
3. Authorize Netlify to access your repos

### Step 2: Add New Site
1. Click **"Add new site"** or **"New site from Git"**
2. Select **"GitHub"**
3. Search for `rivera_webprog` repository
4. Select it

### Step 3: Configure Build Settings
Netlify should auto-detect, but verify these settings:

| Setting | Value |
|---------|-------|
| Base directory | `rivera-client` |
| Build command | `npm run build` |
| Publish directory | `dist` |

### Step 4: Add Environment Variables
**BEFORE deploying**, add environment variables:
1. Click **"Environment"** in the site settings
2. Click **"Edit variables"**
3. Add this variable:

```
VITE_API_URL=https://your-railway-url/api
```

Replace `your-railway-url` with the URL you got from Railway (e.g., `https://rivera-server-xyz.railway.app`)

### Step 5: Deploy
1. Click **"Deploy site"**
2. Wait 2-3 minutes for build
3. Your Netlify URL will appear (e.g., `https://my-app-123.netlify.app`)

✅ **Client is now live!**

---

## 📚 Part 3: Connect Client & Server

### Step 1: Update Server CORS
1. Go back to Railway dashboard for your server
2. Go to **Variables**
3. Update `CLIENT_ORIGIN`:
   ```
   CLIENT_ORIGIN=https://your-netlify-app.netlify.app
   ```
4. Click **"Save"** - Railway will redeploy automatically

### Step 2: (Optional) Update Client if Needed
If you need to change the API URL after deployment:
1. Go to Netlify site settings
2. **Build & deploy > Environment**
3. Update `VITE_API_URL` if needed
4. Trigger a redeploy: **Deploys > Trigger deploy**

---

## ✅ Testing Your Deployment

### Test #1: Website is Live
- Visit your Netlify URL
- Page should load (no broken images)

### Test #2: API Connection Works
1. Open browser DevTools (F12)
2. Go to **Console** tab
3. Visit sign-in page
4. Try to log in
5. Check Console - should see API calls (no red errors)

### Test #3: Full User Flow
1. Try signing up with email
2. Try signing in
3. Try viewing articles
4. Try viewing dashboard (if logged in as admin)

### If Something Breaks:

**"VITE_API_URL is missing" error**
- Check Netlify environment variables
- Ensure `VITE_API_URL` is set

**CORS errors in console**
- Check Railway `CLIENT_ORIGIN` is set to your Netlify URL
- Railway dashboard > Variables

**API returns HTML instead of JSON**
- Check `VITE_API_URL` is correct (should end with `/api`)
- Example: `https://rivera-server-xyz.railway.app/api`

**Database not connecting**
- Check Railway `MONGO_URI` is correct
- Test in MongoDB Atlas: Go to Network Access > check IP whitelist

---

## 🎯 Your Deployment URLs

Once deployed, save these:

```
Client (Frontend):  https://your-netlify-app.netlify.app
Server (API):       https://your-railway-url.railway.app
API Endpoint:       https://your-railway-url.railway.app/api
```

---

## 🔧 Troubleshooting

### Build Fails on Netlify

**Error**: `VITE_API_URL is missing`
```bash
# Fix: Add to Netlify environment variables
VITE_API_URL=https://your-railway-url.railway.app/api
```

**Error**: `Module not found`
```bash
# Fix: Check base directory is `rivera-client`
```

### Server Won't Start on Railway

**Error**: `Cannot find module`
```bash
# Fix: Check Procfile or ensure npm install runs
```

**Error**: Database connection timeout
```bash
# Fix: In MongoDB Atlas, add Railway IP to whitelist
# Railway Dashboard > IP Address > Add to whitelist
```

### API Calls Fail

Check browser DevTools:
1. Network tab - look for failed API calls
2. Check if response is HTML (wrong URL)
3. Check CORS headers in response

---

## 📞 Platform Support

**Railway**: https://railway.app/docs
**Netlify**: https://docs.netlify.com
**MongoDB Atlas**: https://docs.mongodb.com/atlas

---

## ✨ Next Steps After Deployment

1. **Set custom domain** (optional)
   - Netlify: Settings > Domain > Add custom domain
   - Railway: Settings > Custom Domain

2. **Enable HTTPS** (automatic on both platforms)

3. **Set up auto-deploys** (already enabled when connected to GitHub)

4. **Monitor your app**
   - Netlify: Analytics tab
   - Railway: Logs tab

---

## 🎉 Congratulations!

Your app is now deployed and live on the internet! 🚀

Anyone can visit your site and use it!
