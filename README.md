# Aaron Greenberg's Personal Website

Personal portfolio and toolkit website built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- Modern, responsive design
- Personal portfolio showcase
- Interactive tools and utilities
- Blog/thoughts section
- Contact form with email integration
- Communications hub for unified messaging
- Car broker tool for client

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Email**: Resend
- **Database**: Supabase
- **Analytics**: Custom hooks
- **Deployment**: Vercel

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Environment Variables

Create a `.env.local` file with:

```
RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Project Structure

```
/app              # Next.js app directory
  /api           # API routes
  /components    # Reusable components
  /tools         # Interactive tools
  /hooks         # Custom React hooks
/public          # Static assets
/styles          # Global styles
/lib             # Utility functions
```

## Tools

- **Subscription Tracker**: Analyze bank statements for recurring charges
- **Communications Hub**: Unified inbox for all messaging platforms
- **Car Broker**: Custom tool for client's car dealership business

## Deployment

The site automatically deploys to Vercel on push to the main branch.