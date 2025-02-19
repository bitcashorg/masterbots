'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'

import { UserLogin } from '@/components/auth/user-login'
import { SidebarToggle } from '@/components/layout/sidebar/sidebar-toggle'
import { Button } from '@/components/ui/button'
import { IconSeparator } from '@/components/ui/icons'
import { cn, getRouteColor } from '@/lib/utils'
import { appConfig } from 'mb-env'
import { useEffect, useState } from 'react'

// TODO: colour won't update with the pathname change... refactor to hear pathname with a route event and set the values.
// ! href && pathname even that they match, the colour doesn't apply. Maybe a "activeClassName" is missing?
function HeaderLink({ href, text }: { href: string; text: string }) {
  const pathname = usePathname()
  // Check if this link represents the current active route
  const [routeColour, setRouteColour] = useState(getRouteColor(href === pathname, pathname))
  const isActive = (pathname.startsWith(href) && href !== '/') || (pathname === href)

  // biome-ignore lint/correctness/useExhaustiveDependencies: not required to hear all dependencies, only pathname
  useEffect(() => {
    setRouteColour(getRouteColor(isActive, pathname))
  }, [pathname])

  return (
    <Button
      variant="link"
      asChild
      className={cn('-ml-1', { [`${routeColour}`]: isActive })}
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
        <div className="hidden md:flex lg:items-center">
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