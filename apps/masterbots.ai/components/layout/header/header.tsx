'use client'

import Link from 'next/link'
import * as React from 'react'
import { usePathname } from 'next/navigation'

import { UserLogin } from '@/components/auth/user-login'
import { SidebarToggle } from '@/components/layout/sidebar/sidebar-toggle'
import { Button } from '@/components/ui/button'
import { IconSeparator } from '@/components/ui/icons'
import { getRouteColor } from '@/lib/utils'
import { appConfig } from 'mb-env'

function HeaderLink({ href, text }: { href: string; text: string }) {
  const pathname = usePathname()
  
  // Check if this link represents the current active route
  const isActive = href === '/' 
    ? pathname === '/' 
    : pathname?.startsWith(href)

  return (
    <Button 
      variant="link" 
      asChild 
      className={`-ml-1 ${getRouteColor(isActive, pathname)}`}
    >
      <Link href={href}>{text}</Link>
    </Button>
  )
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center">
        <React.Suspense fallback={null}>
          <SidebarToggle />
        </React.Suspense>
        <HeaderLink href="/" text="MB" />

        {/* Navigation links - Hidden on mobile */}
        <div className="hidden lg:flex lg:items-center">
          <IconSeparator className="size-6 text-muted-foreground/50" />
          <HeaderLink href="/c" text="Chat" />
          <HeaderLink href="/" text="Public" />
          {appConfig.features.devMode && <HeaderLink href="/c/p" text="Pro" />}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
          <UserLogin />
        </React.Suspense>
      </div>
    </header>
  )
}