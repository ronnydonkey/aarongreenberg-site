# Domain Setup Guide - aarongreenberg.net

## 🎯 Quick Setup Steps

### 1. Verify Vercel Deployment
Your site should be live at: `https://aarongreenberg-site.vercel.app`

### 2. Add Domain in Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your `aarongreenberg-site` project
3. Go to **Settings** → **Domains**
4. Click **Add Domain**
5. Enter `aarongreenberg.net`
6. Follow the instructions for your DNS provider

## 📋 DNS Configuration by Registrar

### GoDaddy
1. Log in to [GoDaddy Domain Manager](https://dcc.godaddy.com/domains)
2. Click on `aarongreenberg.net`
3. Click **DNS** → **Manage DNS**
4. Delete existing A records for @ (if any)
5. Add records:
   ```
   Type: A    | Name: @   | Value: 76.76.21.21      | TTL: 600
   Type: CNAME| Name: www | Value: cname.vercel-dns.com | TTL: 600
   ```

### Namecheap
1. Log in to [Namecheap Dashboard](https://ap.www.namecheap.com)
2. Click **Domain List** → **Manage** next to aarongreenberg.net
3. Click **Advanced DNS**
4. Add records:
   ```
   Type: A Record     | Host: @   | Value: 76.76.21.21
   Type: CNAME Record | Host: www | Value: cname.vercel-dns.com
   ```

### Google Domains
1. Log in to [Google Domains](https://domains.google)
2. Click on `aarongreenberg.net`
3. Click **DNS** on the left menu
4. Under **Custom records**, add:
   ```
   Type: A    | Name: @   | Data: 76.76.21.21
   Type: CNAME| Name: www | Data: cname.vercel-dns.com
   ```

### Cloudflare
1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select `aarongreenberg.net`
3. Click **DNS**
4. Add records (with Proxy status OFF for Vercel):
   ```
   Type: A    | Name: @   | Content: 76.76.21.21      | Proxy: OFF
   Type: CNAME| Name: www | Content: cname.vercel-dns.com | Proxy: OFF
   ```

## ✅ Verification Steps

1. **Check DNS Propagation** (5-30 minutes typically)
   ```bash
   # Check A record
   dig aarongreenberg.net

   # Check CNAME
   dig www.aarongreenberg.net
   ```

2. **Test your domain**
   - Visit https://aarongreenberg.net
   - Visit https://www.aarongreenberg.net
   - Both should load your site with SSL

3. **Verify in Vercel**
   - Go to your project's Domains settings
   - You should see green checkmarks next to your domain

## 🚨 Troubleshooting

### "Invalid Configuration" in Vercel
- Double-check DNS records are exactly as specified
- Wait 10-15 minutes for propagation
- Try removing and re-adding the domain in Vercel

### SSL Certificate Error
- Vercel automatically provisions SSL certificates
- This can take up to 24 hours after domain verification
- The site will show "Not Secure" until the certificate is ready

### Site Not Loading
- Verify DNS records using `dig` or `nslookup`
- Check if the Vercel deployment URL works
- Ensure no conflicting records exist (like old A records)

## 📞 Need Help?

- **Vercel Support**: https://vercel.com/support
- **DNS Checker**: https://dnschecker.org/#A/aarongreenberg.net
- **SSL Checker**: https://www.sslshopper.com/ssl-checker.html#hostname=aarongreenberg.net

---

**Next Steps After Domain Setup:**
1. ✅ Verify SSL certificate is active
2. ✅ Set up redirects (www → non-www or vice versa)
3. ✅ Add to Google Search Console
4. ✅ Update social media links
5. ✅ Test all pages and forms