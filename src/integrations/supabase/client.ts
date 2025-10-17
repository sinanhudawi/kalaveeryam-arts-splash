import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://prpcbsntypzgixvpnjbh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBycGNic250eXB6Z2l4dnBuamJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MjY5OTcsImV4cCI6MjA3NjIwMjk5N30.HgLTSiG0-OkuUX2xausTpnZSQkQzZgP90rW_gpiNLM4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
