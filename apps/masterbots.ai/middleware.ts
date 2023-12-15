export { auth as middleware } from './auth'

export const config = {
  matcher: ['/((?!api|browse|_next/static|_next/image|favicon.ico).*)']
}
