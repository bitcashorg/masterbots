import '@/app/globals.css'
import { Header } from '@/components/layout/header/header'
import { Providers } from '@/components/layout/providers'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'
import { GoogleAnalytics } from '@next/third-parties/google'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import NextTopLoader from 'nextjs-toploader'

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('font-sans antialiased', GeistSans.variable, GeistMono.variable)}>
        <NextTopLoader color="#1ED761" initialPosition={0.2} />
        <Providers attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Toaster
            toastOptions={{
              className: 'bg-background text-background-foreground',
            }}
          />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="relative flex flex-col flex-1 bg-muted/50">{children}</main>
          </div>
          {/* <TailwindIndicator /> */}
          <GoogleAnalytics gaId="G-N135BF99HS" />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(`https://${process.env.VERCEL_URL}`),
  title: {
    default: 'Masterbots',
    template: `%s - Masterbots`,
  },
  description:
    'Elevating AI Beyond ChatGPT: Specialized Chatbots, Social Sharing and User-Friendly Innovation',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://masterbots.ai',
    siteName: 'Masterbots',
    images: [
      {
        url: `${process.env.BASE_URL || ''}/api/og`,
        width: 1232,
        height: 928,
        alt: 'Masterbots',
      },
    ],
  },
  twitter: {
    title: 'Masterbots',
    description:
      'Elevating AI Beyond ChatGPT: Specialized Chatbots, Social Sharing and User-Friendly Innovation',
    site: '@masterbotsai',
    card: 'summary_large_image',
    images: [
      {
        url: `${process.env.BASE_URL || ''}/api/og`,
        width: 1232,
        height: 928,
        alt: 'Masterbots',
      },
    ],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-300x300.png',
    apple: '/apple-touch-icon.png',
  },
  other: {
    'google-site-verification': 'By9aM0DbPDDO9qa7Y3zNwDFyYuSPslVzje76EVOCcY0',
  },
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}
