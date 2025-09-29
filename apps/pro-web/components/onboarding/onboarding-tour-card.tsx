'use client'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { cn, getRouteType } from '@/lib/utils'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'

interface OnboardingTourCardProps {
	icon: string
	title: string
	content: string
	step: number
	totalSteps: number
	className?: string
}

export function OnboardingTourCard({
	icon,
	title,
	content,
	step,
	totalSteps,
	className,
}: OnboardingTourCardProps) {
	const pathname = usePathname()
	const { theme } = useTheme()
	const routeType = getRouteType(pathname)
	const isProRoute = routeType === 'pro'

	// Background image class matching your site's pattern
	const bgImage =
		theme === 'dark'
			? 'bg-[url(/background.webp)]'
			: 'bg-[url(/background-light.webp)]'

	// Route-based styling (chat = purple, public = green)
	const getRouteStyles = () => {
		if (isProRoute) {
			return {
				border: 'border-purple-500/30',
				gradient: 'from-purple-500/5 to-purple-500/20',
				ring: 'ring-purple-500/20',
				text: 'text-purple-600 dark:text-purple-400',
				accent: 'bg-purple-500',
			}
		}
		return {
			border: 'border-green-500/30',
			gradient: 'from-green-500/5 to-green-500/20',
			ring: 'ring-green-500/20',
			text: 'text-green-600 dark:text-green-400',
			accent: 'bg-green-500',
		}
	}

	const styles = getRouteStyles()

	return (
		<Card
			className={cn(
				'relative overflow-hidden border-2 shadow-lg backdrop-blur-sm',
				'bg-white/95 dark:bg-[#09090B]/95',
				'transition-all duration-300 ease-in-out',
				'hover:shadow-xl hover:scale-[1.02]',
				styles.border,
				styles.ring,
				'ring-2',
				className,
			)}
		>
			{/* Background image layer */}
			<div
				className={cn(
					'absolute inset-0 bg-center bg-cover opacity-10',
					bgImage,
				)}
			/>

			{/* Gradient overlay */}
			<div
				className={cn('absolute inset-0 bg-gradient-to-br', styles.gradient)}
			/>

			{/* Step indicator */}
			<div className="absolute top-4 right-4 z-20">
				<div
					className={cn(
						'flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold text-white shadow-md',
						styles.accent,
					)}
				>
					{step}
				</div>
			</div>

			{/* Content layer */}
			<div className="relative z-10">
				<CardHeader className="pb-3">
					<div className="flex items-center space-x-3">
						<div className="text-2xl">{icon}</div>
						<div className="flex-1">
							<CardTitle className={cn('text-lg font-semibold', styles.text)}>
								{title}
							</CardTitle>
							<CardDescription className="text-xs text-muted-foreground mt-1">
								Step {step} of {totalSteps}
							</CardDescription>
						</div>
					</div>
				</CardHeader>

				<CardContent className="pt-0 pb-6">
					<p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
						{content}
					</p>
				</CardContent>
			</div>

			{/* Decorative elements */}
			<div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-20" />

			{/* Shine effect on hover */}
			<div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500">
				<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] hover:translate-x-[200%] transition-transform duration-1000" />
			</div>
		</Card>
	)
}
