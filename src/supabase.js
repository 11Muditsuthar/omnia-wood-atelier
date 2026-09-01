import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://htkelrtqdxcjxwjemsia.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0a2VscnRxZHhjanh3amVtc2lhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczMTc4OTMsImV4cCI6MjEwMjg5Mzg5M30.Uqey4rZyj89wx-mFAwmmwO5N24Snymz2sZUw86mcoio'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)