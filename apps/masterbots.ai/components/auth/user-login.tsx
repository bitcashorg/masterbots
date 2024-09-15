'use client'

import { useSession } from 'next-auth/react'
import { UserMenu } from '@/components/layout/header/user-menu'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { isTokenExpired } from 'mb-lib'

export function UserLogin() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'authenticated' && session?.user) {
    if (!session.user.hasuraJwt) {
      console.error('Hasura JWT is missing from the session')
      return <LoginButton />
    }

    if (isTokenExpired(session.user.hasuraJwt)) {
      console.warn('Hasura JWT has expired')
      //  token refresh  can go here
      return <LoginButton />
    }

    return <UserMenu user={session.user} />
  }

  return <LoginButton />
}

function LoginButton() {
  return (
    <Button variant="link" asChild className="-ml-2">
      <Link href="/auth/signin">Login</Link>
    </Button>
  )
}