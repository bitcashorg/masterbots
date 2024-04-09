import { type NextRequest } from 'next/server'
import { updateSession } from '@/services/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/((?!||/|api|b|u|terms-n-policies|images|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$)*)'
  ]
}
