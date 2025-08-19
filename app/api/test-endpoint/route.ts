import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    message: 'Test endpoint working',
    timestamp: new Date().toISOString(),
    railwayUrl: 'https://pdf-to-csv-parser-production.up.railway.app/parse'
  })
}