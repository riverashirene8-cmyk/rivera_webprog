# Deployment Guide - Rivera WebProg

## Prerequisites
- GitHub account (to push your code)
- Vercel account (free at vercel.com)
- MongoDB URI (already configured in .env)

---

## Part 1: Deploy Server to Vercel

### Step 1: Push your server code to GitHub
```bash
cd rivera-server
git add .
git commit -m "Prepare server for Vercel deployment"
git push origin main
```

### Step 2: Create Vercel Project for Server
1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Select your GitHub repository
4. Select the **rivera-server** folder as the root directory
5. Click "Continue"

### Step 3: Configure Environment Variables
In the Vercel dashboard, add these environment variables:
```
MONGO_URI = [your MongoDB connection string - already in .env]
JWT_SECRET = [update with a strong secret]
CLIENT_ORIGIN = [will be your client's URL after deployment]
```

### Step 4: Deploy
- Click "Deploy"
- Wait for deployment to complete
- Copy your server URL (e.g., `https://rivera-server.vercel.app`)

---

## Part 2: Deploy Client to Vercel

### Step 1: Update Client Environment Variable
After getting your server URL, update the client `.env`:
```bash
# rivera-client/.env
VITE_API_URL=https://rivera-server.vercel.app/api
```

Or set it as an environment variable in Vercel dashboard.

### Step 2: Push client code to GitHub
```bash
cd rivera-client
git add .
git commit -m "Configure API URL for production"
git push origin main
```

### Step 3: Create Vercel Project for Client
1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Select your GitHub repository
4. Select the **rivera-client** folder as the root directory
5. Click "Continue"

### Step 4: Configure Environment Variables
Add to Vercel dashboard:
```
VITE_API_URL = https://rivera-server.vercel.app/api
```

### Step 5: Configure Build Settings
- Framework: **Vite**
- Build Command: `npm run build`
- Output Directory: `dist`

### Step 6: Deploy
- Click "Deploy"
- Wait for deployment to complete
- Your client will be live!

---

## Part 3: Update CORS on Server

After your client is deployed, update the server's `.env`:
```
CLIENT_ORIGIN=https://your-client-url.vercel.app
```

Or add this to Vercel's environment variables for the server project and redeploy.

---

## Testing Your Deployment

1. Visit your client URL
2. Try signing in/up - should communicate with your server
3. Check browser console for any API errors
4. Visit `https://rivera-server.vercel.app/` to verify API is running

---

## Troubleshooting

**CORS Error**: Make sure `CLIENT_ORIGIN` is set in server's .env
**API Not Found**: Verify `VITE_API_URL` is pointing to correct server URL
**Build Failed**: Check that Node version is 18+ in Vercel project settings

---

## Manual Deployment Steps (Quick Summary)

1. **Server**: GitHub → Vercel (select rivera-server folder) → Set env vars → Deploy
2. **Client**: Update `.env` with server URL → GitHub → Vercel (select rivera-client folder) → Deploy
3. **Done**: Test both apps are communicating
