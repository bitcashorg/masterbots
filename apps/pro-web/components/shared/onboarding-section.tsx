'use client'

import { Card, CardContent } from '@/components/ui/card'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { cn, getRouteType } from '@/lib/utils'
import type { CategoryCardProps, OnboardingSectionProps } from '@/types/index'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export function OnboardingSection({ isOpen, onClose }: OnboardingSectionProps) {
	const {
		allCategories,
		setSelectedCategories,
		setSelectedChatbots,
		selectedCategories,
	} = useSidebar()
	const routeType = getRouteType(usePathname())
	const [localSelectedCategories, setLocalSelectedCategories] =
		useState<number[]>(selectedCategories)

	useEffect(() => {
		setLocalSelectedCategories(selectedCategories)
	}, [selectedCategories])

	if (!isOpen) return null

	const bgImage =
		'bg-[url(/background-light.webp)] dark:bg-[url(/background.webp)]'

	const handleCategoryToggle = (categoryId: number) => {
		setLocalSelectedCategories((prev) =>
			prev.includes(categoryId)
				? prev.filter((id) => id !== categoryId)
				: [...prev, categoryId],
		)
	}

	const handleApplySelection = () => {
		setSelectedCategories(localSelectedCategories)

		const selectedChatbots = allCategories
			.filter((category) =>
				localSelectedCategories.includes(category.categoryId),
			)
			.flatMap((category) =>
				category.chatbots.map((chatbot) => chatbot.chatbot.chatbotId),
			)

		setSelectedChatbots(selectedChatbots)
		onClose()
	}

	const handleClearAll = () => {
		setLocalSelectedCategories([])
	}

	if (!isOpen) return null

	return (
		<div className="flex relative justify-center items-center min-h-[calc(100vh-200px)]">
			<Card
				className="w-full mx-4 sm:mx-6 md:mx-auto max-w-7xl bg-white dark:bg-[#09090B] relative z-10 overflow-hidden rounded-xl sm:rounded-2xl"
				data-route={routeType}
			>
				{/* Background image layer */}
				<div
					className={`absolute inset-0 bg-center bg-cover opacity-20 ${bgImage}`}
				/>

				{/* Content layer */}
				<div className="relative z-20">
					<CardContent className="p-4 sm:p-6 md:p-8">
						<div className="flex justify-between items-center mb-6 sm:mb-8">
							<div className="flex-1">
								<h1 className="mb-3 text-2xl font-bold text-green-500 sm:mb-4 sm:text-3xl">
									Welcome to Masterbots.ai
								</h1>
								<div className="text-base text-zinc-700 dark:text-zinc-300">
									<p>Choose 1-3 topics that matter to you to start</p>
									<p>
										We&apos;ll show you the most relevant chatbots and resources
									</p>
									<p>You can update your selections anytime</p>
								</div>
							</div>
						</div>

						{/* Selection counter */}
						<div className="flex flex-col gap-3 mb-4 sm:flex-row sm:justify-between sm:items-center sm:gap-0 sm:mb-6">
							<div className="text-sm text-zinc-600 dark:text-zinc-400">
								{localSelectedCategories.length} topic
								{localSelectedCategories.length !== 1 ? 's' : ''} selected
							</div>
							<div className="flex gap-2 sm:gap-3">
								<button
									type="button"
									onClick={handleClearAll}
									className="flex-1 px-3 py-2 text-sm font-medium text-white bg-gray-500 rounded-lg shadow-sm transition-colors sm:flex-none sm:px-4 hover:bg-gray-600"
								>
									Clear All
								</button>
								<button
									type="button"
									onClick={handleApplySelection}
									disabled={localSelectedCategories.length === 0}
									className={cn(
										'flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm font-medium text-white rounded-lg shadow-sm transition-colors',
										localSelectedCategories.length === 0
											? 'bg-gray-400 cursor-not-allowed'
											: routeType === 'chat'
												? 'bg-purple-600 hover:bg-purple-700'
												: 'bg-green-600 hover:bg-green-700',
									)}
								>
									Get Started
								</button>
							</div>
						</div>

						{/* Categories grid */}
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-h-[50vh] sm:max-h-[55vh] md:max-h-[60vh] overflow-y-auto pr-1 hide-scrollbar">
							{allCategories.map((category) => (
								<CategoryCard
									key={category.categoryId}
									category={category}
									isSelected={localSelectedCategories.includes(
										category.categoryId,
									)}
									onToggle={() => handleCategoryToggle(category.categoryId)}
									routeType={routeType}
								/>
							))}
						</div>
					</CardContent>
				</div>
			</Card>
		</div>
	)
}

function CategoryCard({
	category,
	isSelected,
	onToggle,
	routeType,
}: CategoryCardProps) {
	const firstBot = category.chatbots[0]?.chatbot

	const bgImage =
		'bg-[url(/background-light.webp)] dark:bg-[url(/background.webp)]'

	const getBorderClasses = () => {
		if (isSelected) {
			return routeType === 'chat' ? 'border-purple-500' : 'border-green-500'
		}
		return 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
	}

	const getBackgroundClasses = () => {
		if (isSelected) {
			return routeType === 'chat' ? 'bg-purple-500/10' : 'bg-green-500/10'
		}
		return 'bg-white dark:bg-zinc-900'
	}

	return (
		<button
			type="button"
			className={cn(
				'overflow-hidden relative p-3 w-full text-left rounded-lg border-2 transition-all duration-200 cursor-pointer',
				getBackgroundClasses(),
				getBorderClasses(),
				!isSelected &&
					'grayscale opacity-70 hover:grayscale-0 hover:opacity-100',
			)}
			onClick={onToggle}
		>
			{/* Background image layer */}
			<div
				className={`absolute inset-0 bg-center bg-cover opacity-40 ${bgImage}`}
			/>

			{/* Content layer */}
			<div className="relative z-10">
				<div className="flex justify-between items-center">
					{/* Left side - Category info */}
					<div className="flex-1 min-w-0">
						<div className="mb-1 sm:mb-2">
							<h3 className="text-base font-semibold text-gray-900 sm:text-lg dark:text-white">
								{category.name}
							</h3>
						</div>
					</div>

					{/* Right side - Bot avatar */}
					{firstBot && (
						<div className="flex-shrink-0 ml-2 sm:ml-4" title={firstBot.name}>
							<div
								className={cn(
									'overflow-hidden rounded-full border-2 shadow-sm transition-all duration-200 size-16 sm:size-20',
									isSelected
										? 'ring-2 selected-bot-avatar'
										: 'border-gray-300 dark:border-gray-600',
								)}
							>
								{firstBot.avatar ? (
									<svg className="w-full h-full" viewBox="0 0 80 80">
										<title>{firstBot.name} avatar</title>
										<defs>
											<pattern
												id={`avatar-${firstBot.chatbotId}`}
												patternUnits="userSpaceOnUse"
												width="80"
												height="80"
											>
												<image href={firstBot.avatar} width="80" height="80" />
											</pattern>
										</defs>
										<circle
											cx="40"
											cy="40"
											r="40"
											fill={`url(#avatar-${firstBot.chatbotId})`}
										/>
									</svg>
								) : (
									<div className="flex justify-center items-center w-full h-full bg-gray-300 dark:bg-gray-600">
										<span className="text-sm font-medium text-gray-600 sm:text-lg dark:text-gray-400">
											{firstBot.name.charAt(0).toUpperCase()}
										</span>
									</div>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</button>
	)
}
