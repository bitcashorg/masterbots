import * as React from 'react'
import Link from 'next/link'
import { isTokenExpired } from '@repo/mb-lib'
import { cookies } from 'next/headers'
import { Button } from '@/components/ui/button'
import { IconSeparator } from '@/components/ui/icons'
import { UserMenu } from '@/components/layout/user-menu'
import { getUserProfile } from '@/services/supabase'
import { SidebarToggle } from '../routes/c/sidebar/sidebar-toggle'

// https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating

export async function Header() {
  const user = await getUserProfile()
  const jwt = cookies().get('hasuraJwt')?.value || ''

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center">
        <SidebarToggle />
        <HeaderLink href="/" text="Masterbots" />
        <IconSeparator className="size-6 text-muted-foreground/50" />
        <HeaderLink href="/c" text="Chat" />
        <HeaderLink href="p" text="Pro" />
      </div>
      <div className="flex items-center justify-end space-x-2">
        {user && !isTokenExpired(jwt) ? (
          <UserMenu />
        ) : (
          <Button asChild className="-ml-2" variant="link">
            <Link href="/auth/sign-in">Login</Link>
          </Button>
        )}
      </div>
    </header>
  )
}

function HeaderLink({ href, text }: { href: string; text: string }) {
  return (
    <Button asChild className="-ml-2" variant="link">
      <Link href={href}>{text}</Link>
    </Button>
  )
}
