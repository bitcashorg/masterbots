import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { Toaster } from 'react-hot-toast'

import '@/app/globals.css'
import { Header } from '@/components/layout/header'
import { Providers } from '@/components/layout/providers'
import { GlobalStoreProvider } from '@/hooks/use-global-store'
import { cn } from '@/lib/utils'
import { createSupabaseServerClient } from '@/services/supabase'
import { GoogleAnalytics } from '@next/third-parties/google'
import { MB } from '@repo/supabase'
import dynamic from 'next/dynamic'
import { cookies } from 'next/headers'
import { Metadata } from 'next/types'
import { objectToCamel } from 'ts-case-convert'

async function getCookieData(): Promise<{ userProfile }> {
  const userProfile = cookies().get('userProfile')?.value || null
  return new Promise(resolve =>
    setTimeout(() => {
      resolve({ userProfile })
    }, 1000)
  )
}

const DynamicCmdK = dynamic(() => import('../components/layout/cmdk'), {
  ssr: false
})

export default async function RootLayout({ children }: RootLayoutProps) {
  const { userProfile } = await getCookieData()
  const { chatbots, categories } = await getGlobalData()
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
        <GlobalStoreProvider
          categories={categories}
          chatbots={chatbots}
          user={(userProfile && JSON.parse(userProfile)) || null}
        >
          <Providers
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
            enableSystem
          >
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex flex-col flex-1 bg-muted/50">
                {children}
              </main>
            </div>
            <DynamicCmdK />
          </Providers>
        </GlobalStoreProvider>

        <GoogleAnalytics gaId="G-78N0Z7NPQJ" />

      </body>
    </html>
  )
}

async function getGlobalData() {
  const supabase = await createSupabaseServerClient()

  const categories = await supabase.from('category').select()
  const chatbot = await supabase.from('chatbot').select(`*, prompt(*)`)

  return objectToCamel({
    categories: categories.data,
    // TODO: fix type... it shouldn't be unknown. Moving forward on other places.
    chatbots: chatbot.data as unknown as MB.ChatbotWithPrompts[]
  })
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
}

const siteUrl = `https://${process.env.VERCEL_URL}`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Masterbots',
    template: `%s - Masterbots`
  },
  description:
    'Elevating AI Beyond ChatGPT: Specialized Chatbots, Social Sharing and User-Friendly Innovation',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Masterbots',
    images: [
      {
        url: `${siteUrl}/images/masterbots.png`,
        width: 1232,
        height: 928,
        alt: 'Masterbots'
      }
    ]
  },
  twitter: {
    title: 'Masterbots',
    description:
      'Elevating AI Beyond ChatGPT: Specialized Chatbots, Social Sharing and User-Friendly Innovation',
    site: '@masterbotsai',
    card: 'summary_large_image',
    images: [
      {
        url: `${siteUrl}/images/masterbots.png`,
        width: 1232,
        height: 928,
        alt: 'Masterbots'
      }
    ]
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-300x300.png',
    apple: '/apple-touch-icon.png'
  }
}
interface RootLayoutProps {
  children: React.ReactNode
}
