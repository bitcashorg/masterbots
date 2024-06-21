'use client'

import { TooltipProvider } from '@/components/ui/tooltip'
import { PaymentProvider } from '@/lib/hooks/use-payment'
import { SidebarProvider } from '@/lib/hooks/use-sidebar'
import { ThreadProvider } from '@/lib/hooks/use-thread'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <PaymentProvider>
        <SidebarProvider>
          <TooltipProvider>
            <SessionProvider>
              <ThreadProvider>{children}</ThreadProvider>
            </SessionProvider>
          </TooltipProvider>
        </SidebarProvider>
      </PaymentProvider>
    </NextThemesProvider>
  )
}
