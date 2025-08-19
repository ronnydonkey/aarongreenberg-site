import { NextRequest, NextResponse } from 'next/server'

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
    
    // For MVP, we'll log to console and could easily add:
    // - Supabase insert
    // - Airtable API
    // - Google Sheets append
    // - Email to you via Resend/SendGrid
    
    console.log('Waitlist signup:', {
      email,
      tool,
      source: source || 'direct',
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || 'unknown'
    })
    
    // TODO: Add your preferred storage method here
    // Example: await supabase.from('waitlist').insert({ email, tool, source })
    
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