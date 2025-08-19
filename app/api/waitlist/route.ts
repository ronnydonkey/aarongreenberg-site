import { NextRequest, NextResponse } from 'next/server'
import { addToWaitlist } from '@/lib/supabase'

// Optional: For email notifications
async function sendNotificationEmail(email: string, tool: string) {
  if (!process.env.RESEND_API_KEY || !process.env.NOTIFICATION_EMAIL) {
    return // Skip if not configured
  }
  
  try {
    // Using Resend (install with: npm install resend)
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)
    
    await resend.emails.send({
      from: 'Waitlist <noreply@aarongreenberg.net>',
      to: process.env.NOTIFICATION_EMAIL,
      subject: `New waitlist signup: ${tool}`,
      html: `
        <h2>New Waitlist Signup</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Tool:</strong> ${tool}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      `
    })
  } catch (error) {
    console.error('Failed to send notification:', error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, tool, source } = await request.json()
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }
    
    // Validate tool
    const validTools = ['subscription-tracker', 'cre-investment', 'auto-broker', 'communications-hub', 'arbitrage-scanner']
    if (!tool || !validTools.includes(tool)) {
      return NextResponse.json(
        { error: 'Invalid tool selection' },
        { status: 400 }
      )
    }
    
    // Get additional context
    const ip_address = request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || 
                      'unknown'
    const user_agent = request.headers.get('user-agent') || 'unknown'
    
    try {
      // Save to Supabase
      await addToWaitlist({
        email,
        tool,
        source: source || 'direct',
        ip_address,
        user_agent
      })
      
      // Send notification email (non-blocking)
      sendNotificationEmail(email, tool)
      
    } catch (dbError: any) {
      // If Supabase fails, still log it
      console.error('Database error:', dbError)
      
      // Check if it's a duplicate entry
      if (dbError?.code === '23505') {
        return NextResponse.json({
          success: true,
          message: 'You\'re already on the waitlist!'
        })
      }
      
      // For other DB errors, continue anyway (don't lose the lead)
      console.log('Fallback - Waitlist signup:', {
        email,
        tool,
        source: source || 'direct',
        timestamp: new Date().toISOString(),
        ip: ip_address
      })
    }
    
    return NextResponse.json({
      success: true,
      message: 'Successfully joined the waitlist!'
    })
    
  } catch (error) {
    console.error('Waitlist error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}