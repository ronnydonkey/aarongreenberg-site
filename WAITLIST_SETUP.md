# Waitlist Setup Guide

## Quick Start (Without Database)
The waitlist will work immediately - signups are logged to console/Vercel logs.

## Full Setup with Supabase (Recommended)

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create new project (free tier is fine)
3. Save your project URL and anon key

### 2. Run the Migration
In Supabase dashboard:
1. Go to SQL Editor
2. Paste contents of `supabase/migrations/create_waitlist_table.sql`
3. Run query

### 3. Add Environment Variables
Create `.env.local` file:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Optional: Email notifications
RESEND_API_KEY=your-resend-api-key
NOTIFICATION_EMAIL=aaron@aarongreenberg.net
```

### 4. Deploy to Vercel
Add the same environment variables in Vercel dashboard.

## Email Notifications (Optional)

### Using Resend
1. Sign up at [resend.com](https://resend.com)
2. Verify your domain
3. Get API key
4. Add to environment variables

### Alternative: Use Supabase Edge Functions
You can set up a trigger in Supabase to send emails on new signups.

## Viewing Signups

### Without Supabase
Check Vercel Function logs at: vercel.com/your-project/functions

### With Supabase
1. Go to Table Editor in Supabase
2. View `waitlist` table
3. Or use SQL: `SELECT * FROM waitlist ORDER BY created_at DESC;`

## Analytics Query
```sql
-- Signups by tool
SELECT tool, COUNT(*) as signups 
FROM waitlist 
GROUP BY tool 
ORDER BY signups DESC;

-- Daily signups
SELECT DATE(created_at) as day, COUNT(*) as signups
FROM waitlist
GROUP BY DATE(created_at)
ORDER BY day DESC;
```