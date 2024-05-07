import * as React from 'react'
import Link from 'next/link'

import { auth } from '@/auth'
import { Button } from '@/components/ui/button'
import { IconSeparator } from '@/components/ui/icons'
import { UserMenu } from '@/components/user-menu'
import { SidebarToggle } from './sidebar-toggle'
import { isTokenExpired } from 'mb-lib'

// https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating

export async function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center">
        <SidebarToggle />
        <HeaderLink href="/" text="Masterbots" />
        <IconSeparator className="size-6 text-muted-foreground/50" />
        <HeaderLink href="/chat" text="Chat" />
        <HeaderLink href="/" text="Browse" />
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
  const session = await auth()
  return (
    <>
      <div className="flex items-center">
        {session?.user && !isTokenExpired(session?.user?.hasuraJwt) ? (
          <UserMenu user={session.user} />
        ) : (
          <Button variant="link" asChild className="-ml-2">
            <Link href="/sign-in">Login</Link>
          </Button>
        )}
      </div>
    </>
  )
}
