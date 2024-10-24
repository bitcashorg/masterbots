import Link from 'next/link'
import * as React from 'react'

import { UserLogin } from '@/components/auth/user-login'
import { SidebarToggle } from '@/components/layout/sidebar/sidebar-toggle'
import { ThemeToggle } from '@/components/shared/theme-toggle'
import { Button } from '@/components/ui/button'
import { IconSeparator } from '@/components/ui/icons'
import { appConfig } from 'mb-env'

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center">
        <React.Suspense fallback={null}>
          <SidebarToggle />
        </React.Suspense>
        <HeaderLink href="/" text="MB" />
        <IconSeparator className="size-6 text-muted-foreground/50" />
        <HeaderLink href="/c" text="Chat" />
        <HeaderLink href="/" text="Browse" />
        <HeaderLink href="/wordware" text="Ww" />

        {appConfig.devMode && (
          <HeaderLink href="/c/p" text="Pro" />
        )}
      </div>
      <div className="flex items-center justify-end space-x-2 gap-2">
        <ThemeToggle />
        <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
          <UserLogin />
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