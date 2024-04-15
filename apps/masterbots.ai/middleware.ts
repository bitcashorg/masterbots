export { auth as middleware } from './auth'

export const config = {
  matcher: [
    '/((?!|^\/$|api|b|u|terms|images|_next/static|_next/image|favicon.ico).*)'
  ]
}
