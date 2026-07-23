import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tleznzwiuquszkictndh.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsZXpuendpdXF1c3praWN0bmRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM5MTcxNTYsImV4cCI6MjA5OTQ5MzE1Nn0._MxxDdKCdKWy8EUHmX6UoJvThtjBoG3MTptHLqxA1XA";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);