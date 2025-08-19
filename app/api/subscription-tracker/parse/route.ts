import { NextRequest, NextResponse } from 'next/server'

// Force rebuild - 2025-08-18 20:30
const RAILWAY_API = 'https://pdf-to-csv-parser-production.up.railway.app/parse'

export async function POST(request: NextRequest) {
  console.log('Proxy endpoint called at:', new Date().toISOString())
  console.log('Forwarding to:', RAILWAY_API)
  
  try {
    // Get the form data from the request
    const incomingFormData = await request.formData()
    
    // Create new FormData to ensure all fields are properly forwarded
    const formData = new FormData()
    
    // Add all fields from incoming form data
    const entries = Array.from(incomingFormData.entries())
    for (const [key, value] of entries) {
      formData.append(key, value)
    }
    
    // Log what we're sending
    console.log('Forwarding to Railway API with fields:', Array.from(formData.keys()))
    
    // Forward the request to the Railway API
    const response = await fetch(RAILWAY_API, {
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