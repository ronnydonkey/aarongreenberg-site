import { NextRequest, NextResponse } from 'next/server'

const PYTHON_API_URL = process.env.PDF_PARSER_API_URL || 'http://localhost:5001'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Create form data for Python API
    const pythonFormData = new FormData()
    pythonFormData.append('file', file)
    pythonFormData.append('type', 'bank_statement')

    // Call Python PDF parser API
    const response = await fetch(`${PYTHON_API_URL}/parse`, {
      method: 'POST',
      body: pythonFormData
    })

    if (!response.ok) {
      throw new Error('Failed to parse PDF')
    }

    const results = await response.json()

    // Transform results for frontend
    if (results.success && results.type === 'subscriptions') {
      const subscriptions = results.data.subscriptions.map((sub: any) => ({
        id: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: sub.name,
        provider: sub.name, // Can be enhanced with provider detection
        category: detectCategory(sub.name),
        amount: sub.amount,
        billingCycle: sub.frequency,
        nextBillingDate: calculateNextBilling(sub.date, sub.frequency),
        status: 'active',
        lastDetected: sub.date
      }))

      return NextResponse.json({
        success: true,
        subscriptions,
        summary: results.data.summary
      })
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to extract subscriptions'
    })

  } catch (error) {
    console.error('PDF parsing error:', error)
    return NextResponse.json(
      { error: 'Failed to process file' },
      { status: 500 }
    )
  }
}

function detectCategory(name: string): string {
  const categories: Record<string, string[]> = {
    streaming: ['netflix', 'spotify', 'hulu', 'disney', 'hbo', 'youtube', 'apple tv'],
    software: ['adobe', 'microsoft', 'dropbox', 'google', 'github', 'slack'],
    fitness: ['gym', 'fitness', 'peloton', 'strava'],
    finance: ['quickbooks', 'mint', 'ynab'],
    news: ['times', 'post', 'journal', 'news']
  }

  const lowerName = name.toLowerCase()
  
  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => lowerName.includes(keyword))) {
      return category
    }
  }
  
  return 'other'
}

function calculateNextBilling(lastDate: string, frequency: string): string {
  const date = new Date(lastDate)
  
  switch (frequency) {
    case 'monthly':
      date.setMonth(date.getMonth() + 1)
      break
    case 'annual':
      date.setFullYear(date.getFullYear() + 1)
      break
    case 'quarterly':
      date.setMonth(date.getMonth() + 3)
      break
    default:
      date.setMonth(date.getMonth() + 1)
  }
  
  return date.toISOString().split('T')[0]
}