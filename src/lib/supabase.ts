import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseServerClient: SupabaseClient | null = null;
let supabaseBrowserClient: SupabaseClient | null = null;

export function getSupabaseUrl(): string | undefined {
  return process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || (typeof window !== 'undefined' && (window as any)._env_?.VITE_SUPABASE_URL);
}

export function getSupabaseKey(): string | undefined {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || (typeof window !== 'undefined' && (window as any)._env_?.VITE_SUPABASE_ANON_KEY);
}

export function isSupabaseConfigured(): boolean {
  const url = getSupabaseUrl();
  const key = getSupabaseKey();
  return Boolean(url && key && url !== 'https://your-supabase-project.supabase.co' && !url.includes('YOUR_'));
}

export function getSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const url = getSupabaseUrl()!;
  const key = getSupabaseKey()!;

  if (typeof window === 'undefined') {
    if (!supabaseServerClient) {
      supabaseServerClient = createClient(url, key, {
        auth: { persistSession: false }
      });
    }
    return supabaseServerClient;
  } else {
    if (!supabaseBrowserClient) {
      supabaseBrowserClient = createClient(url, key);
    }
    return supabaseBrowserClient;
  }
}
