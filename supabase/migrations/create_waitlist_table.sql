-- Create waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  tool TEXT NOT NULL,
  source TEXT DEFAULT 'direct',
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX idx_waitlist_email ON waitlist(email);

-- Create index on tool for analytics
CREATE INDEX idx_waitlist_tool ON waitlist(tool);

-- Create unique constraint to prevent duplicate signups
CREATE UNIQUE INDEX idx_waitlist_email_tool ON waitlist(email, tool);

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anonymous users
CREATE POLICY "Allow anonymous inserts" ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create a view for analytics
CREATE VIEW waitlist_stats AS
SELECT 
  tool,
  COUNT(*) as signups,
  COUNT(DISTINCT email) as unique_emails,
  DATE(created_at) as signup_date
FROM waitlist
GROUP BY tool, DATE(created_at)
ORDER BY signup_date DESC, tool;