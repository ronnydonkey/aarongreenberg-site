# Deployment Guide for aarongreenberg.net

## 🚀 Quick Deploy to Vercel

### Option 1: Deploy via GitHub (Recommended)

1. **Create GitHub Repository**
   ```bash
   # If you haven't already
   gh repo create aarongreenberg-site --public
   git remote add origin https://github.com/ronnydonkey/aarongreenberg-site.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import from GitHub repository
   - Select `aarongreenberg-site`
   - Click "Deploy"

3. **Add Custom Domain**
   - After deployment, go to Settings → Domains
   - Add `aarongreenberg.net`
   - Update DNS records at your registrar:
     ```
     Type: A
     Name: @
     Value: 76.76.21.21
     
     Type: CNAME
     Name: www
     Value: cname.vercel-dns.com
     ```

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   cd ~/Documents/amg_toolkit/aarongreenberg-site
   vercel
   ```

3. **Production Deploy**
   ```bash
   vercel --prod
   ```

## 📝 Environment Variables

No environment variables needed for the basic site. For future features:

```env
# Newsletter (when you add it)
MAILCHIMP_API_KEY=
MAILCHIMP_LIST_ID=

# Analytics
NEXT_PUBLIC_GA_ID=

# Contact Form
EMAIL_SERVICE_API_KEY=
```

## 🔧 Post-Deployment Setup

### 1. Verify Domain
- Check https://aarongreenberg.net works
- Ensure SSL certificate is active
- Test www redirect

### 2. SEO Setup
- Submit sitemap to Google Search Console
- Add site to Google Analytics
- Set up social media cards preview

### 3. Performance
- Run Lighthouse audit
- Enable Vercel Analytics
- Set up monitoring

## 🎯 Next Steps

1. **Content Pipeline**
   - Set up MDX for blog posts
   - Create RSS feed
   - Add newsletter integration

2. **Features to Add**
   - Blog post pages
   - Project case studies
   - Dynamic OG images
   - Contact form backend

3. **Monitoring**
   - Vercel Analytics
   - Google Analytics
   - Uptime monitoring

## 🔗 Useful Links

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Domain Management](https://vercel.com/dashboard/domains)
- [Analytics](https://vercel.com/analytics)

---

Ready to deploy! 🚀