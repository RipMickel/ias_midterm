import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL="https://rojdnegidybdndwqeqke.supabase.co"

const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvamRuZWdpZHliZG5kd3FlcWtlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxNzM5NzEsImV4cCI6MjA2MDc0OTk3MX0.Olta7iZYaUIF-N0ozOK-XGLEyRNC_zdugHuAxeQPAc0"




export const supabase = createClient("https://rojdnegidybdndwqeqke.supabase.co",   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvamRuZWdpZHliZG5kd3FlcWtlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxNzM5NzEsImV4cCI6MjA2MDc0OTk3MX0.Olta7iZYaUIF-N0ozOK-XGLEyRNC_zdugHuAxeQPAc0");


