import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Get the form data from the request
    const incomingFormData = await request.formData()
    
    // Create new FormData to ensure all fields are properly forwarded
    const formData = new FormData()
    
    // Add all fields from incoming form data
    for (const [key, value] of incomingFormData.entries()) {
      formData.append(key, value)
    }
    
    
    // Log what we're sending
    console.log('Forwarding to Railway API with fields:', Array.from(formData.keys()))
    
    // Forward the request to the Railway API
    const response = await fetch('https://subscription-tracker-parser-production.up.railway.app/parse', {
      method: 'POST',
      body: formData,
    })
    
    if (!response.ok) {
      let errorMessage = 'Unknown error'
      try {
        const errorData = await response.json()
        errorMessage = errorData.error || errorData.message || 'API Error'
      } catch {
        errorMessage = await response.text()
      }
      
      console.error('Railway API error:', errorMessage)
      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      )
    }
    
    const data = await response.json()
    return NextResponse.json(data)
    
  } catch (error) {
    console.error('Proxy error:', error)
    return NextResponse.json(
      { error: 'Failed to process file' },
      { status: 500 }
    )
  }
}