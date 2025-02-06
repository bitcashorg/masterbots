'use client'

import { TooltipProvider } from '@/components/ui/tooltip'
import { AccessibilityProvider } from '@/lib/hooks/use-accessibility'
import { ModelProvider } from '@/lib/hooks/use-model'
import { PaymentProvider } from '@/lib/hooks/use-payment'
import { PowerUpProvider } from '@/lib/hooks/use-power-up'
import { ProfileProvider } from '@/lib/hooks/use-profile'
import { SidebarProvider } from '@/lib/hooks/use-sidebar'
import { ThreadProvider } from '@/lib/hooks/use-thread'
import { ThreadSearchProvider } from '@/lib/hooks/use-thread-search'
import { ThreadVisibilityProvider } from '@/lib/hooks/use-thread-visibility'
import { SessionProvider } from 'next-auth/react'
import { Attribute, ThemeProvider as NextThemesProvider } from 'next-themes'

type ProvidersProps = {
  children: React.ReactNode,
  attribute?: Attribute,
  defaultTheme?: string,
  enableSystem?: boolean,
  disableTransitionOnChange?: boolean
}
export function Providers({ children, ...props }: ProvidersProps) {

  return (
    <NextThemesProvider
      {...props}
    >
      <SessionProvider>
        <ModelProvider>
          <PaymentProvider>
            <SidebarProvider>
              <TooltipProvider>
                <ProfileProvider>
                  <PowerUpProvider>
                    <AccessibilityProvider>
                      <ThreadSearchProvider>
                        <ThreadProvider>
                          <ThreadVisibilityProvider> {children}</ThreadVisibilityProvider>
                        </ThreadProvider>
                      </ThreadSearchProvider>
                    </AccessibilityProvider>
                  </PowerUpProvider>
                </ProfileProvider>
              </TooltipProvider>
            </SidebarProvider>
          </PaymentProvider>
        </ModelProvider>
      </SessionProvider>
    </NextThemesProvider>
  )
}
