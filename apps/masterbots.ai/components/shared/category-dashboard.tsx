'use client'

import { Card, CardContent } from '@/components/ui/card'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { cn, getRouteType } from '@/lib/utils'
import type { Category } from 'mb-genql'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'

interface CategoryDashboardProps {
	isOpen: boolean
	onClose: () => void
	categories: Category[] // <-- add this line
}

export function CategoryDashboard({
	isOpen,
	onClose,
	categories,
}: CategoryDashboardProps) {
	const { selectedCategories, setSelectedCategories, setSelectedChatbots } =
		useSidebar()
	const routeType = getRouteType(usePathname())
	const [localSelectedCategories, setLocalSelectedCategories] =
		useState<number[]>(selectedCategories)

	// Background image class - same as onboarding card
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

		// Update selected chatbots based on selected categories
		const selectedChatbots = categories
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
		<div className="flex fixed inset-0 z-50 justify-center items-center backdrop-blur-sm bg-black/60">
			<div className="relative w-full max-w-7xl mx-4 max-h-[80vh] overflow-y-auto">
				<Card
					className="w-full bg-white dark:bg-[#09090B] relative overflow-hidden rounded-2xl shadow-2xl border-0"
					data-route={routeType}
				>
					{/* Background image layer */}
					<div
						className={`absolute inset-0 bg-center bg-cover opacity-20 ${bgImage}`}
					/>

					{/* Content layer */}
					<div className="relative z-20">
						<CardContent className="p-8">
							<div className="flex justify-between items-center mb-8">
								<h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
									Topics Dashboard
								</h2>
								<button
									type="button"
									onClick={onClose}
									className="p-2 rounded-full transition-colors text-muted-foreground hover:text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
									aria-label="Close dashboard"
								>
									<svg
										className="w-7 h-7"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										aria-label="Close"
									>
										<title>Close</title>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>

							{/* Action buttons */}
							<div className="flex gap-3 mb-6">
								<button
									type="button"
									onClick={handleClearAll}
									className="px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded-lg shadow-sm transition-colors hover:bg-gray-600"
								>
									Clear All
								</button>
								<button
									type="button"
									onClick={handleApplySelection}
									className={cn(
										'px-4 py-2 text-sm font-medium text-white rounded-lg shadow-sm transition-colors',
										'bg-accent-foreground',
									)}
								>
									Apply Selection
								</button>
							</div>

							{/* Categories grid */}
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-h-[40vh] overflow-y-auto pr-1">
								{categories.map((category) => (
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
		</div>
	)
}

interface CategoryCardProps {
	category: Category
	isSelected: boolean
	onToggle: () => void
	routeType: string
}

function CategoryCard({
	category,
	isSelected,
	onToggle,
	routeType,
}: CategoryCardProps) {
	const chatbotCount = category.chatbots.length
	const firstBot = category.chatbots[0]?.chatbot

	// Background image class - same as onboarding card
	const bgImage =
		'bg-[url(/background-light.webp)] dark:bg-[url(/background.webp)]'

	// Route-based border colors
	const getBorderClasses = () => {
		if (isSelected) {
			return routeType === 'chat' ? 'border-purple-500' : 'border-green-500'
		}
		return 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
	}

	return (
		<button
			type="button"
			className={cn(
				'overflow-hidden relative p-4 w-full text-left rounded-lg border-2 transition-all duration-200 cursor-pointer',
				'bg-white dark:bg-zinc-900',
				getBorderClasses(),
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
					{/* Left side - Category info and checkbox */}
					<div className="flex-1">
						<div className="mb-2">
							<h3 className="font-semibold text-gray-900 dark:text-white">
								{category.name}
							</h3>
						</div>
						<p className="text-sm text-gray-600 dark:text-gray-400">
							{chatbotCount} chatbot{chatbotCount !== 1 ? 's' : ''}
						</p>
					</div>

					{/* Right side - Bot avatar */}
					{firstBot && (
						<div className="flex-shrink-0 ml-4" title={firstBot.name}>
							<div
								className={cn(
									'overflow-hidden rounded-full border-2 shadow-sm transition-all duration-200 size-16',
									isSelected
										? 'ring-4 selected-bot-avatar'
										: 'border-gray-300 dark:border-gray-600',
								)}
							>
								{firstBot.avatar ? (
									<Image
										src={firstBot.avatar}
										alt={firstBot.name}
										width={64}
										height={64}
										className="object-cover w-full h-full"
									/>
								) : (
									<div className="flex justify-center items-center w-full h-full bg-gray-300 dark:bg-gray-600">
										<span className="text-base font-medium text-gray-600 dark:text-gray-400">
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
