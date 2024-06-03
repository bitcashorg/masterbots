'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import { SidebarProvider } from '@/lib/hooks/use-sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'
import { SessionProvider } from 'next-auth/react'
import { ThreadProvider } from '@/lib/hooks/use-thread'
import { ModelProvider } from '@/lib/hooks/use-model'

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <SidebarProvider>
        <TooltipProvider>
          <SessionProvider>
            <ModelProvider>
              <ThreadProvider>{children}</ThreadProvider>
            </ModelProvider>
          </SessionProvider>
        </TooltipProvider>
      </SidebarProvider>
    </NextThemesProvider>
  )
}
