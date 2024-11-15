'use client'

import { TooltipProvider } from '@/components/ui/tooltip'
import { PaymentProvider } from '@/lib/hooks/use-payment'
import { SidebarProvider } from '@/lib/hooks/use-sidebar'
import { ThreadProvider } from '@/lib/hooks/use-thread'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ThemeProviderProps } from 'next-themes/dist/types'
import { ModelProvider } from '@/lib/hooks/use-model'
import { ThreadVisibilityProvider } from '@/lib/hooks/use-thread-visibility'
import { ProfileProvider } from '@/lib/hooks/use-profile'
import { ThreadSearchProvider } from '@/lib/hooks/use-thread-search'
import { PowerUpProvider } from '@/lib/hooks/use-power-up'

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <ModelProvider>
        <PaymentProvider>
          <SidebarProvider>
            <TooltipProvider>
              <SessionProvider>
                <ProfileProvider>
                <ThreadProvider> 
                  <ThreadVisibilityProvider> {children}</ThreadVisibilityProvider>
                </ThreadProvider>
                </ProfileProvider>
                <ThreadSearchProvider>
                  <PowerUpProvider>
                    <ThreadProvider>
                      <ThreadVisibilityProvider>
                        {children}
                      </ThreadVisibilityProvider>
                    </ThreadProvider>
                  </PowerUpProvider>
                </ThreadSearchProvider>
              </SessionProvider>
            </TooltipProvider>
          </SidebarProvider>
        </PaymentProvider>
      </ModelProvider>
    </NextThemesProvider>
  )
}
