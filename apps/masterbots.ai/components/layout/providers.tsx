'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ThemeProviderProps } from 'next-themes/dist/types'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SidebarProvider } from '@/hooks/use-sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'

const queryClient = new QueryClient()

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <QueryClientProvider client={queryClient}>
        <SidebarProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </SidebarProvider>
      </QueryClientProvider>
    </NextThemesProvider>
  )
}
