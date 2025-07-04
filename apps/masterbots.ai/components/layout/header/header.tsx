'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'

import { UserLogin } from '@/components/auth/user-login'
import { SidebarToggle } from '@/components/layout/sidebar/sidebar-toggle'
import { Button } from '@/components/ui/button'
import { IconSeparator } from '@/components/ui/icons'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { getCanonicalDomain } from '@/lib/url'
import { cn, getRouteColor, getRouteType } from '@/lib/utils'
import { appConfig } from 'mb-env'
import { toSlug } from 'mb-lib'

function HeaderLink({
	href,
	noActiveColor,
	text,
	onClick,
	className,
}: {
	href: string
	text: string
	className?: string
	noActiveColor?: boolean
	onClick: (event: React.MouseEvent) => void
}) {
	const pathname = usePathname()
	const routeType = getRouteType(pathname)
	// Check if this link represents the current active route
	const isActive =
		// Exact match for root paths
		pathname === href ||
		// For public route: href is "/" and pathname starts with any route except "/c"
		(href === '/' &&
			routeType === 'public' &&
			pathname.length > 1 &&
			!pathname.startsWith('/c')) ||
		// For personal/chat route: href is "/c" and pathname starts with "/c/"
		(href === '/c' &&
			routeType === 'chat' &&
			(pathname === '/c' || pathname.startsWith('/c/')))
	const routeColour = getRouteColor(isActive, pathname)

	return (
		<Button
			className={cn(
				'-ml-1 transition-all',
				{
					[`${routeColour}`]: isActive && !noActiveColor,
				},
				className,
			)}
			onClick={onClick}
			variant="link"
			size="sm"
			asChild
		>
			<Link href={href}>{text}</Link>
		</Button>
	)
}

export function Header() {
	const { activeCategory, activeChatbot, setActiveCategory, setActiveChatbot } =
		useSidebar()
	const canonicalDomain = getCanonicalDomain(activeChatbot?.name || '')

	const resetNavigation = (e: React.MouseEvent) => {
		setActiveCategory(null)
		setActiveChatbot(null)
	}

	const preserveContextNavigation = (e: React.MouseEvent) => {
		//! The URL will be built with the current context
	}

	//? Build URLs that preserve the current category and chatbot
	const buildUrlWithCurrentContext = (baseUrl: string) => {
		if (activeCategory && activeChatbot?.categories[0]?.category?.name) {
			const categoryName = activeChatbot.categories[0].category.name
			const chatbotName = activeChatbot.name
			const domain = canonicalDomain || 'prompt'

			//? Build the full URL
			const path = `/${toSlug(categoryName)}/${domain}/${toSlug(chatbotName)}`
			return baseUrl === '/' ? path : `${baseUrl}${path}`
		}
		if (activeCategory) {
			//? Build category URL only
			const categoryName = activeChatbot?.categories[0]?.category?.name || 'ai'
			const path = `/${toSlug(categoryName)}`
			return baseUrl === '/' ? path : `${baseUrl}${path}`
		}
		return baseUrl
	}

	const publicUrl = buildUrlWithCurrentContext('/')
	const personalUrl = buildUrlWithCurrentContext('/c')

	// TODO: Reconsider the logic below for the URLs
	// if (activeCategory && activeChatbot?.categories[0]?.category?.name) {
	//   publicUrl = urlBuilders.topicThreadListUrl({
	//     type: 'public',
	//     category: activeChatbot?.categories[0].category.name,
	//   })
	//   personalUrl = urlBuilders.topicThreadListUrl({
	//     type: 'personal',
	//     category: activeChatbot?.categories[0].category.name,
	//   })
	// }

	// if (activeChatbot?.name) {
	//   publicUrl = urlBuilders.chatbotThreadListUrl({
	//     type: 'public',
	//     chatbot: activeChatbot?.name || '',
	//     domain: canonicalDomain || 'prompt',
	//     category: activeChatbot?.categories[0]?.category?.name || '',
	//   })
	//   personalUrl = urlBuilders.chatbotThreadListUrl({
	//     type: 'personal',
	//     chatbot: activeChatbot?.name || '',
	//     domain: canonicalDomain || 'prompt',
	//     category: activeChatbot?.categories[0]?.category?.name || '',
	//   })
	// }

	const pathname = usePathname()
	const routeType = getRouteType(pathname)

	return (
		<header className="flex sticky top-0 z-50 justify-between items-center px-4 w-full h-16 bg-gradient-to-b border-b backdrop-blur-xl shrink-0 from-background/10 via-background/50 to-background/80">
			<div className="flex items-center">
				<React.Suspense fallback={null}>
					<SidebarToggle />
				</React.Suspense>
				<HeaderLink
					href="/"
					noActiveColor
					onClick={resetNavigation}
					text="MB"
				/>

				<IconSeparator className="size-6 text-muted-foreground/50" />
				{/* Navigation links - Hidden on mobile */}
				<div className="flex items-center gap-1 ml-2.5">
					<HeaderLink
						href={personalUrl}
						onClick={preserveContextNavigation}
						text="Chat"
						className={cn({
							'hidden sm:flex': routeType !== 'chat',
						})}
					/>
					<HeaderLink
						href={publicUrl}
						onClick={preserveContextNavigation}
						text="Public"
						className={cn({
							'hidden sm:flex': routeType !== 'public',
						})}
					/>
					{appConfig.features.devMode && (
						<HeaderLink
							href="/c/p"
							onClick={resetNavigation}
							text="Pro"
							className={cn({
								'hidden sm:flex': routeType !== 'pro',
							})}
						/>
					)}
				</div>
			</div>
			<div className="flex items-center space-x-4">
				<React.Suspense fallback={<div className="overflow-auto flex-1" />}>
					<UserLogin />
				</React.Suspense>
			</div>
		</header>
	)
}
