'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'

import { UserLogin } from '@/components/auth/user-login'
import { SidebarToggle } from '@/components/layout/sidebar/sidebar-toggle'
import { IconSeparator } from '@/components/ui/icons'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { getCanonicalDomain } from '@/lib/url'
import { cn, getRouteColor, getRouteType } from '@/lib/utils'
import { Button } from '@masterbots/mb-ui'
import { appConfig } from 'mb-env'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useEffect, useState } from 'react'

function HeaderLink({
	href,
	noActiveColor,
	text,
	onClick,
	className,
}: {
	href: string
	text: React.ReactNode | string
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
	const [mounted, setMounted] = useState(false)

	const resetNavigation = (e: React.MouseEvent) => {
		setActiveCategory(null)
		setActiveChatbot(null)
	}

	useEffect(() => {
		setMounted(true)
	}, [])

	const { resolvedTheme } = useTheme()
	const logoSrc =
		resolvedTheme === 'dark'
			? '/logos/mb-logo-short-dark.webp'
			: '/logos/mb-logo-short-light.webp'
	const preserveContextNavigation = (e: React.MouseEvent) => {
		//! The URL will be built with the current context
	}
	const publicUrl = '/'
	const personalUrl = '/c'

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
		<header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
			<div className="flex items-center">
				<React.Suspense fallback={null}>
					<SidebarToggle />
				</React.Suspense>
				<HeaderLink
					href="/"
					noActiveColor
					onClick={resetNavigation}
					className="pr-0"
					text={
						mounted && (
							<Image
								src={logoSrc}
								alt="Masterbots Logo"
								width={38}
								height={38}
								quality={100}
								priority
							/>
						)
					}
				/>

				<IconSeparator className="size-6 text-muted-foreground/50" />
				{/* Navigation links - Hidden on mobile */}
				<div className="flex items-center gap-1 ml-2.5">
					<HeaderLink
						href={personalUrl}
						onClick={resetNavigation}
						text="Chat"
						className={cn({
							'hidden sm:flex': routeType !== 'chat',
						})}
					/>
					<HeaderLink
						href={publicUrl}
						onClick={resetNavigation}
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
				<React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
					<UserLogin />
				</React.Suspense>
			</div>
		</header>
	)
}
