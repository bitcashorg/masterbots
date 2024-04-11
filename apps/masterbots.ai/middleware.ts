export { auth as middleware } from './auth'

export const config = {
  matcher: [
    '/((?!api|browse|b|u|terms|images|_next/static|_next/image|favicon.ico).*)'
  ]
}
