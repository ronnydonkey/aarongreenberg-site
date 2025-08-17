#!/bin/bash

echo "🔍 Domain Status Check for aarongreenberg.net"
echo "=============================================="
echo ""

# Check A record
echo "📡 Current DNS A Record:"
CURRENT_IP=$(dig +short aarongreenberg.net)
echo "   aarongreenberg.net → $CURRENT_IP"

# Expected Vercel IP
VERCEL_IP="76.76.21.21"
echo ""
echo "✅ Expected Vercel IP: $VERCEL_IP"

# Check if DNS is correct
if [ "$CURRENT_IP" = "$VERCEL_IP" ]; then
    echo "   ✅ DNS is correctly configured!"
else
    echo "   ⏳ DNS not yet updated or pointing to wrong IP"
    echo "   Current: $CURRENT_IP"
    echo "   Should be: $VERCEL_IP"
fi

echo ""
echo "🌐 Checking WWW subdomain:"
WWW_RECORD=$(dig +short www.aarongreenberg.net)
echo "   www.aarongreenberg.net → $WWW_RECORD"

echo ""
echo "⏱️  DNS Propagation Status:"
echo "   DNS changes can take 5-30 minutes to propagate"
echo "   Check global propagation: https://dnschecker.org/#A/aarongreenberg.net"

echo ""
echo "📋 Quick Fix Steps:"
echo "1. Login to your domain registrar"
echo "2. Make sure the A record for @ points to: 76.76.21.21"
echo "3. Remove any other A records for @"
echo "4. Wait 10-15 minutes and run this script again"