import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, preferredContact, message, dealId, dealDetails } = await request.json()
    
    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required' },
        { status: 400 }
      )
    }
    
    // Here you would integrate with Podium CRM
    // For now, we'll simulate the integration
    
    // Format the inquiry for Podium
    const podiumPayload = {
      contact: {
        name,
        email,
        phone,
        preferredContactMethod: preferredContact
      },
      message: message || `Interested in ${dealDetails?.year} ${dealDetails?.make} ${dealDetails?.model}`,
      source: 'website',
      dealId,
      dealDetails,
      timestamp: new Date().toISOString()
    }
    
    // In production, you would send this to Podium API
    // Example:
    // const podiumResponse = await fetch('https://api.podium.com/v4/messages', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.PODIUM_API_KEY}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(podiumPayload)
    // })
    
    console.log('Car broker inquiry received:', podiumPayload)
    
    // Send notification email to Gary
    if (process.env.NOTIFICATION_EMAIL) {
      // You could use Resend or another email service here
      console.log('Sending notification to:', process.env.NOTIFICATION_EMAIL)
    }
    
    return NextResponse.json({
      success: true,
      message: 'Inquiry sent successfully',
      inquiryId: Date.now().toString()
    })
    
  } catch (error) {
    console.error('Car broker inquiry error:', error)
    return NextResponse.json(
      { error: 'Failed to process inquiry' },
      { status: 500 }
    )
  }
}