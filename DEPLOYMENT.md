# Deployment Guide: Epoch Converter to Vercel

## Prerequisites
- Git installed on your computer
- GitHub account
- Vercel account (free)
- Node.js 18+ installed

## Step 1: Prepare Your Local Repository

### 1.1 Initialize Git Repository (if not already done)
```bash
# Navigate to your project directory
cd epoch-converter

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Epoch Time Converter"
```

### 1.2 Create .gitignore file (if not exists)
```bash
# Create .gitignore
echo "node_modules/
dist/
.env
.env.local
.env.production
.DS_Store
*.log" > .gitignore
```

## Step 2: Create GitHub Repository

### 2.1 Create Repository on GitHub
1. Go to [GitHub.com](https://github.com)
2. Click the "+" icon in top right corner
3. Select "New repository"
4. Repository name: `epoch-converter`
5. Description: "Professional Unix Timestamp Converter Tool"
6. Set to Public
7. Don't initialize with README (we already have files)
8. Click "Create repository"

### 2.2 Connect Local Repository to GitHub
```bash
# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/epoch-converter.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Set Up Vercel Deployment

### 3.1 Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account
3. Authorize Vercel to access your repositories

### 3.2 Deploy from GitHub
1. In Vercel dashboard, click "New Project"
2. Import your `epoch-converter` repository
3. Configure project settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 3.3 Environment Variables (Optional)
If you want to add Stripe integration later:
1. In project settings, go to "Environment Variables"
2. Add these variables:
   ```
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
   VITE_API_BASE_URL=https://api.epochtimeconverter.org
   ```

### 3.4 Deploy
1. Click "Deploy"
2. Wait for build to complete (usually 1-2 minutes)
3. Your site will be live at: `https://epoch-converter-xxx.vercel.app`

## Step 4: Custom Domain (Optional)

### 4.1 Add Custom Domain
1. In Vercel project settings, go to "Domains"
2. Add your domain: `epochtimeconverter.org`
3. Configure DNS records as instructed by Vercel

## Step 5: Automatic Deployments

### 5.1 Enable Auto-Deploy
- Every push to `main` branch will automatically deploy
- Pull requests create preview deployments
- No additional configuration needed!

## Step 6: Verify Deployment

### 6.1 Test Your Live Site
1. Visit your Vercel URL
2. Test all converters:
   - Timestamp to Date
   - Date to Timestamp
   - Batch Converter
   - Timezone Converter
3. Check mobile responsiveness
4. Test dark/light mode toggle

## Commands Summary

```bash
# 1. Initialize and commit
git init
git add .
git commit -m "Initial commit: Epoch Time Converter"

# 2. Connect to GitHub
git remote add origin https://github.com/YOUR_USERNAME/epoch-converter.git
git branch -M main
git push -u origin main

# 3. For future updates
git add .
git commit -m "Update: description of changes"
git push origin main
```

## Troubleshooting

### Build Errors
- Check Node.js version (should be 18+)
- Ensure all dependencies are in package.json
- Check for TypeScript errors

### Environment Variables
- Make sure VITE_ prefix is used for client-side variables
- Redeploy after adding environment variables

### Domain Issues
- DNS propagation can take up to 24 hours
- Use Vercel's nameservers for easier setup

## Next Steps After Deployment

1. **SEO Optimization**: Submit sitemap to Google Search Console
2. **Analytics**: Add Google Analytics (optional)
3. **Monitoring**: Set up Vercel Analytics
4. **Performance**: Monitor Core Web Vitals
5. **API Integration**: Set up backend API if needed

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review GitHub Actions (if using)
3. Contact support: saurabhs619@gmail.com

---

**Your epoch converter will be live and accessible worldwide! 🚀**