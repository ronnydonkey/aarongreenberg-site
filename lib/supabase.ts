import { createClient } from '@supabase/supabase-js'

// These should be in your .env.local file:
// NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
// NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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