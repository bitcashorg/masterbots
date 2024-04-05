import { useSupabaseClient } from './supa-browser-client'

export function useSession() {
  const supabase = useSupabaseClient()
  return supabase.auth.getSession()
}
