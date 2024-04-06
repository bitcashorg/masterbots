import { createSupabaseServerClient } from './supa-server-client'

export async function getUserSession() {
  const supabase = await createSupabaseServerClient()
  return supabase.auth.getSession()
}
