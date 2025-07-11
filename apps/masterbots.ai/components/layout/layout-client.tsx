'use client'

import darkBG from '@/public/bg-landing-dark.svg'
import lightBG from '@/public/bg-landing-light.svg'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function LayoutClient({
	children,
}: {
	children: React.ReactNode
}) {
	const pathname = usePathname()
	const { resolvedTheme } = useTheme()
	const [mounted, setMounted] = React.useState(false)

	// Ensure the theme is mounted before rendering
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	React.useEffect(() => {
		setMounted(true)

		console.log('Mounted LayoutClient with resolvedTheme:', resolvedTheme)
	}, [])

	const isAuthPage = pathname.includes('auth/')
	const bgImage = resolvedTheme === 'dark' ? darkBG : lightBG

	return (
		<main className="relative flex flex-col flex-1 bg-muted/50">
			{isAuthPage && mounted && (
				<Image
					src={bgImage}
					alt="Background"
					fill
					className="pointer-events-none select-none object-cover z-0"
				/>
			)}

			{/* Foreground content */}
			<div className="relative z-10">{children}</div>
		</main>
	)
}
