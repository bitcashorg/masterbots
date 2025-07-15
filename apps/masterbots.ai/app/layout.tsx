import '@/app/globals.css'
import { Header } from '@/components/layout/header/header'
import { Providers } from '@/components/layout/providers'
import { ServiceWorkerRegistration } from '@/components/layout/service-worker-registration'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'
import { GoogleAnalytics } from '@next/third-parties/google'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { appConfig } from 'mb-env'
import type { Metadata } from 'next'
import Script from 'next/script'
import NextTopLoader from 'nextjs-toploader'

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en" suppressHydrationWarning>
			{appConfig.ads.twitterAds.enabled && (
				<head>
					<Script id="twitter-pixel">
						{`!function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
	},s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
	a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
	twq('config','${appConfig.ads.twitterAds.campaignId}');`}
					</Script>
				</head>
			)}
			<body
				className={cn(
					'font-sans antialiased',
					GeistSans.variable,
					GeistMono.variable,
				)}
			>
				<ServiceWorkerRegistration />
				{appConfig.features.topLoader && (
					<NextTopLoader color="#1ED761" initialPosition={0.2} />
				)}
				<Providers
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<Toaster
						toastOptions={{
							className: 'bg-background text-background-foreground',
						}}
					/>
					<div className="flex flex-col min-h-screen">
						<Header />
						<main className="relative flex flex-col h-[calc(100vh-4rem)] overflow-hidden bg-muted/50 pb-10">
							{children}
						</main>
					</div>
					{/* <TailwindIndicator /> */}
					<GoogleAnalytics gaId="G-N135BF99HS" />
				</Providers>
			</body>
		</html>
	)
}

export const metadata: Metadata = {
	metadataBase: new URL(`https://${process.env.BASE_URL || ''}`),
	title: {
		default: 'Masterbots',
		template: '%s - Masterbots',
	},
	description: 'Where your Ai expertise goes public',
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: 'https://masterbots.ai',
		siteName: 'Masterbots',
		images: [`${process.env.BASE_URL || ''}/api/og`],
	},
	twitter: {
		title: 'Masterbots',
		description: 'Where your Ai expertise goes public',
		site: '@masterbotsai',
		card: 'summary_large_image',
		images: [`${process.env.BASE_URL || ''}/api/og`],
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
