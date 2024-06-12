
import { auth } from '@/auth'
import { isTokenExpired } from 'mb-lib'
import { redirect } from 'next/navigation'
import Subscription from '@/components/subscription'

export default async function IndexPage() {
  const session = await auth()

  // NOTE: maybe we should use same expiration time
  const jwt = session?.user?.hasuraJwt

  if (!jwt || isTokenExpired(jwt)) {
    redirect(`/sign-in`)
  }
  const user = {
    email: session.user.email || ''
  }
  return (
      <Subscription user={user} />
  )
}
