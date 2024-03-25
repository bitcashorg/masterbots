export { auth as middleware } from './auth'

export const config = {
  matcher: ['/((?!api|browse|term-n-policies|images|_next/static|_next/image|favicon.ico).*)']
}
