import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Toaster } from 'react-hot-toast'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Aaron Greenberg - I Build Tools That Create Time',
  description: 'Time to think. Time to grow. Time to live. Building AI-powered tools that eliminate friction, clarify chaos, and help teams run faster without burning out.',
  keywords: 'Aaron Greenberg, AI tools, productivity, automation, ScatterbrainAI, time management, business tools',
  authors: [{ name: 'Aaron Greenberg' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aarongreenberg.net',
    siteName: 'Aaron Greenberg',
    title: 'Aaron Greenberg - I Build Tools That Create Time',
    description: 'Time to think. Time to grow. Time to live. Building AI-powered tools that eliminate friction and help teams run faster.',
    images: [
      {
        url: 'https://aarongreenberg.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Aaron Greenberg'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aaron Greenberg - I Build Tools That Create Time',
    description: 'Time to think. Time to grow. Time to live.',
    creator: '@aarongreenberg',
    images: ['https://aarongreenberg.net/og-image.png']
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-base text-primary antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1 pt-20">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster 
          position="bottom-right"
          toastOptions={{
            className: 'bg-surface text-primary border border-default',
            style: {
              background: 'rgb(var(--color-bg-surface))',
              color: 'rgb(var(--color-text-primary))',
              border: '1px solid rgb(var(--color-border))'
            },
            success: {
              iconTheme: {
                primary: '#16a34a',
                secondary: 'rgb(var(--color-bg-surface))',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: 'rgb(var(--color-bg-surface))',
              },
            },
          }}
        />
        <Analytics />
      </body>
    </html>
  )
}