import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { Toaster } from 'react-hot-toast'

import '@/app/globals.css'
import { Header } from '@/components/layout/header'
import { Providers } from '@/components/layout/providers'
import { cn } from '@/lib/utils'
import { GlobalStoreProvider } from '@/hooks/use-global-store'
import { cookies } from 'next/headers'
import { getUserSession } from '@/services/supabase'

export default async function RootLayout({ children }: RootLayoutProps) {
  const {
    data: { user }
  } = await getUserSession()
  const hasuraJwt = cookies().get('hasuraJwt')?.value || ''

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'font-sans antialiased',
          GeistSans.variable,
          GeistMono.variable
        )}
      >
        <Toaster />
        <GlobalStoreProvider hasuraJwt={hasuraJwt} user={user || null}>
          <Providers
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex flex-col flex-1 bg-muted/50">
                {children}
              </main>
            </div>
          </Providers>
        </GlobalStoreProvider>
      </body>
    </html>
  )
}

export const metadata = {
  metadataBase: new URL(`https://${process.env.VERCEL_URL}`),
  title: {
    default: 'Masterbots',
    template: `%s - Masterbots`
  },
  description: 'Specialized AI chatbots',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  }
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
}

interface RootLayoutProps {
  children: React.ReactNode
}
