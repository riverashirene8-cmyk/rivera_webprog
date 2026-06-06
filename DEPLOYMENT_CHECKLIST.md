# ✅ Deployment Checklist - Do This Now!

Follow these steps in order to deploy your entire application.

---

## 🔵 STEP 1: Deploy Server to Railway (2 minutes)

### Before You Start
- [ ] Go to https://railway.app
- [ ] Sign up with GitHub (if not already done)

### Deploy
- [ ] Click "New Project"
- [ ] Select "Deploy from GitHub repo"
- [ ] Find and click on `rivera_webprog` repository
- [ ] Railway auto-deploys - wait 2-3 minutes

### Configure Environment
- [ ] Click "Variables" tab in Railway dashboard
- [ ] Add these variables:
  ```
  MONGO_URI=[Copy from your .env file]
  JWT_SECRET=your_jwt_secret_here
  NODE_ENV=production
  PORT=5000
  CLIENT_ORIGIN=[You'll update this later]
  ```
- [ ] Save variables - Railway redeploys automatically
- [ ] Wait for deployment to complete

### Get Your Server URL
- [ ] Go to Railway dashboard
- [ ] Look for "Deployments" or "Your App"
- [ ] Copy the URL (format: https://rivera-server-XXX.railway.app)
- [ ] **Save this URL! You'll need it next.**

✅ **Server deployment complete!**

---

## 🔵 STEP 2: Deploy Client to Netlify (3 minutes)

### Before You Start
- [ ] Go to https://netlify.com
- [ ] Sign up with GitHub (if not already done)
- [ ] Have your Railway server URL from Step 1

### Create New Site
- [ ] Click "Add new site" → "Import an existing project"
- [ ] Choose "GitHub"
- [ ] Search for `rivera_webprog` repository
- [ ] Click it

### Configure Build Settings
- [ ] Base directory: `rivera-client`
- [ ] Build command: `npm run build`
- [ ] Publish directory: `dist`

### Add Environment Variable (IMPORTANT!)
**Do this BEFORE deployment:**
- [ ] In the deployment preview, click "Edit variables"
- [ ] Add this environment variable:
  ```
  VITE_API_URL=https://your-railway-server-url/api
  ```
  Replace `your-railway-server-url` with the URL from Step 1
  
  Example: `VITE_API_URL=https://rivera-server-abc123.railway.app/api`

- [ ] Click "Deploy"
- [ ] Wait 2-3 minutes for build to complete

### Get Your Client URL
- [ ] Netlify will show your site URL (format: https://my-app-123.netlify.app)
- [ ] **Save this URL!**

✅ **Client deployment complete!**

---

## 🔵 STEP 3: Finalize Connection (1 minute)

### Update Server CORS
- [ ] Go back to Railway dashboard
- [ ] Click on your server project
- [ ] Go to "Variables" tab
- [ ] Update `CLIENT_ORIGIN` with your Netlify URL:
  ```
  CLIENT_ORIGIN=https://your-netlify-app.netlify.app
  ```
  Example: `CLIENT_ORIGIN=https://my-app-123.netlify.app`

- [ ] Save - Railway redeploys automatically
- [ ] Wait 1 minute for redeploy

✅ **Connection complete!**

---

## 🎯 FINAL CHECK: Test Everything

### Test #1: Website Loads
- [ ] Visit your Netlify URL
- [ ] Homepage loads without errors
- [ ] All images show correctly

### Test #2: Sign In/Up Works
- [ ] Try to sign up with an email
- [ ] (Should send verification email or work directly)
- [ ] Try to sign in with that email

### Test #3: Articles Load
- [ ] Click on Articles page
- [ ] Article list shows
- [ ] Click on an article to read it

### Test #4: Dashboard (if admin)
- [ ] After signing in, try to access dashboard
- [ ] Dashboard should load with data

---

## 🚀 Deployment Troubleshooting

### Problem: "VITE_API_URL is missing"
**Solution**: 
1. Go to Netlify site settings
2. Build & deploy > Environment
3. Add `VITE_API_URL=https://your-railway-url/api`
4. Trigger redeploy

### Problem: API calls fail / CORS errors
**Solution**:
1. Check your Netlify `VITE_API_URL` is correct
2. Check Railway `CLIENT_ORIGIN` is set to your Netlify URL
3. Both should be set correctly

### Problem: Build fails on Netlify
**Solution**:
1. Check base directory is `rivera-client` (not root)
2. Check build command is `npm run build`
3. Check publish directory is `dist`

### Problem: Server won't start on Railway
**Solution**:
1. Check environment variables are set (MONGO_URI especially)
2. Check MongoDB Atlas allows Railway IP address
3. Check logs for errors

---

## 📋 Your Live URLs (Save These!)

Once everything is deployed:

```
🌐 Website: https://your-netlify-url.netlify.app
🔌 API Server: https://your-railway-url.railway.app
📡 API Endpoint: https://your-railway-url.railway.app/api
```

---

## ✨ All Done!

Your website is now live and anyone can access it! 🎉

**Next optional steps:**
- Add custom domain
- Monitor performance
- Set up automated backups
- Enable advanced security

Enjoy! 🚀
