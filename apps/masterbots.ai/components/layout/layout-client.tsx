'use client'

import darkBG from '@/public/bg-landing-dark.svg'
import lightBG from '@/public/bg-landing-light.svg'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function LayoutClient({
	children,
}: {
	children: React.ReactNode
}) {
	const pathname = usePathname()
	const { theme } = useTheme()

	const isAuthPage = pathname.includes('auth/')
	const bgImage = theme === 'dark' ? darkBG : lightBG

	return (
		<main className="relative flex flex-col flex-1 bg-muted/50">
			{isAuthPage && (
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
