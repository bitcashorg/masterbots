import { validateMbEnv, supabase } from '@repo/mb-env'

const env = validateMbEnv(process.env.NEXT_PUBLIC_APP_ENV || 'test')

export const appConfig = {
  env,
  supabase: supabase[env]
} as const
