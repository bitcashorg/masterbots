import Link from 'next/link'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { IconSeparator } from '@/components/ui/icons'
import { UserMenu } from '@/components/user-menu'
import { isTokenExpired } from 'mb-lib'
import { getServerSession } from 'next-auth'
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
  const session = await getServerSession()
  return (
    <>
      <div className="flex items-center">
        {session?.user && !isTokenExpired(session?.user?.hasuraJwt) ? (
          <UserMenu user={session.user} />
        ) : (
          <Button variant="link" asChild className="-ml-2">
            <Link href="/auth/signing">Login</Link>
          </Button>
        )}
      </div>
    </>
  )
}
