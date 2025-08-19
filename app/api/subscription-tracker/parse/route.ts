import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Get the file from the request
    const formData = await request.formData()
    
    // Forward the request to the Railway API
    const response = await fetch('https://subscription-tracker-parser-production.up.railway.app/parse', {
      method: 'POST',
      body: formData,
    })
    
    if (!response.ok) {
      const error = await response.text()
      return NextResponse.json(
        { error: `API Error: ${error}` },
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