import Link from 'next/link'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { IconSeparator } from '@/components/ui/icons'
import { UserMenu } from '@/components/user-menu'
import { isTokenExpired } from 'mb-lib'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import SidebarToggleWrap from './sidebar-toggle-wrap'

export async function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center">
        <React.Suspense fallback={null}>
          <SidebarToggleWrap />
        </React.Suspense>
        <HeaderLink href="/" text="Masterbots" />
        <IconSeparator className="size-6 text-muted-foreground/50" />
        <HeaderLink href="/c" text="Chat" />
        <HeaderLink href="/" text="Browse" />
        <HeaderLink href="/c/p" text="Pro" />
      </div>
      <div className="flex items-center justify-end space-x-2">
        <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
          <UserOrLogin />
        </React.Suspense>
      </div>
    </header>
  )
}

function HeaderLink({ href, text }: { href: string; text: string }) {
  return (
    <Button variant="link" asChild className="-ml-2">
      <Link href={href}>{text}</Link>
    </Button>
  )
}

async function UserOrLogin() {
  try {
    const session = await getServerSession(authOptions)

    if (session?.user) {
      if (!session.user.hasuraJwt) {
        console.error('Hasura JWT is missing from the session')
        return <LoginButton />
      }

      if (isTokenExpired(session.user.hasuraJwt)) {
        console.warn('Hasura JWT has expired')

        // * Refresh token if needed
        //* session.user.hasuraJwt = await refreshTokenFunction();

        return <LoginButton />
      }

      return <UserMenu user={session.user} />
    } else {
      return <LoginButton />
    }
  } catch (error) {
    console.error('Error fetching session:', error)
    return <LoginButton />
  }
}

function LoginButton() {
  return (
    <Button variant="link" asChild className="-ml-2">
      <Link href="/auth/signin">Login</Link>
    </Button>
  )
}
