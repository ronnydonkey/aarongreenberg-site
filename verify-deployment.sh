#!/bin/bash

echo "🚀 Vercel Deployment Verification Script"
echo "======================================="
echo ""

# Check if site is deployed
echo "📌 Checking deployment status..."
echo ""

# Test the Vercel deployment URL (update this after deployment)
VERCEL_URL="https://aarongreenberg-site.vercel.app"
echo "Testing Vercel URL: $VERCEL_URL"

if curl -s -o /dev/null -w "%{http_code}" "$VERCEL_URL" | grep -q "200\|301\|302"; then
    echo "✅ Site is successfully deployed to Vercel!"
else
    echo "⏳ Site deployment pending or URL needs to be updated"
fi

echo ""
echo "📋 Next Steps:"
echo "1. Go to https://vercel.com/dashboard"
echo "2. Find your aarongreenberg-site project"
echo "3. Go to Settings → Domains"
echo "4. Add aarongreenberg.net"
echo ""
echo "🌐 DNS Configuration for your domain registrar:"
echo "================================================"
echo ""
echo "Option 1 - A Records (Recommended):"
echo "  Type: A"
echo "  Name: @"
echo "  Value: 76.76.21.21"
echo ""
echo "  Type: AAAA" 
echo "  Name: @"
echo "  Value: 2606:4700:3033::6815:4d44"
echo ""
echo "Option 2 - CNAME (Alternative):"
echo "  Type: CNAME"
echo "  Name: www"
echo "  Value: cname.vercel-dns.com"
echo ""
echo "  Type: A"
echo "  Name: @"
echo "  Value: 76.76.21.21"
echo ""
echo "📝 Notes:"
echo "- DNS propagation can take up to 48 hours"
echo "- Vercel will automatically provision SSL certificates"
echo "- Check domain status at: https://vercel.com/dashboard/domains"