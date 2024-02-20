'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import { SidebarProvider } from '@/lib/hooks/use-sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'
import { SessionProvider } from 'next-auth/react'
import { ThreadProvider } from '@/lib/hooks/use-thread'

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <SidebarProvider>
        <TooltipProvider>
          <SessionProvider>
            <ThreadProvider>{children}</ThreadProvider>
          </SessionProvider>
        </TooltipProvider>
      </SidebarProvider>
    </NextThemesProvider>
  )
}
