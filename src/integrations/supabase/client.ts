// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://mtemjnmnvwmkvariimyv.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10ZW1qbm1udndta3ZhcmlpbXl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2NjM1MTgsImV4cCI6MjA2MTIzOTUxOH0.5iXftKKGvwGLo_7AXQ9BQ2qQsVVDRU5JTq8D6RiPyLI";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);