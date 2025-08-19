import { createClient } from '@supabase/supabase-js'

// These should be in your .env.local file:
// NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
// NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Create a single supabase client for interacting with your database
// Only create client if we have the required environment variables
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Types for our waitlist table
export interface WaitlistEntry {
  id?: number
  email: string
  tool: string
  source?: string
  created_at?: string
  ip_address?: string
  user_agent?: string
}

// Helper function to add to waitlist
export async function addToWaitlist(entry: WaitlistEntry) {
  if (!supabase) {
    console.log('Supabase not configured, logging waitlist entry:', entry)
    // Return a mock response when Supabase is not configured
    return { ...entry, id: Date.now(), created_at: new Date().toISOString() }
  }

  const { data, error } = await supabase
    .from('waitlist')
    .insert([entry])
    .select()
    .single()

  if (error) {
    console.error('Supabase error:', error)
    throw error
  }

  return data
}