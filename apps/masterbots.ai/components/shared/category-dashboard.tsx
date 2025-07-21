'use client'

import { Card, CardContent } from '@/components/ui/card'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { cn, getRouteType } from '@/lib/utils'
import type { Category } from 'mb-genql'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

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

	const handleSelectAll = () => {
		const allCategoryIds = categories.map((category) => category.categoryId)
		setLocalSelectedCategories(allCategoryIds)
	}

	const handleClearAll = () => {
		setLocalSelectedCategories([])
	}

	if (!isOpen) return null

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
			<div className="relative w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
				<Card className="w-full bg-white dark:bg-[#09090B] relative overflow-hidden rounded-2xl shadow-2xl border-0">
					{/* Background image layer */}
					<div
						className={`absolute inset-0 bg-center bg-cover opacity-20 ${bgImage}`}
					/>

					{/* Content layer */}
					<div className="relative z-20">
						<CardContent className="p-8">
							<div className="flex justify-between items-center mb-8">
								<h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
									Category Dashboard
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
									onClick={handleSelectAll}
									className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg shadow-sm transition-colors hover:bg-blue-600"
								>
									Select All
								</button>
								<button
									type="button"
									onClick={handleClearAll}
									className="px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded-lg shadow-sm transition-colors hover:bg-gray-600"
								>
									Clear All
								</button>
							</div>

							{/* Categories grid */}
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[40vh] overflow-y-auto pr-1">
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

							{/* Footer actions */}
							<div className="flex gap-3 justify-end pt-6 mt-8 border-t border-gray-200 dark:border-gray-700">
								<button
									type="button"
									onClick={onClose}
									className="px-5 py-2 text-sm font-medium rounded-lg border border-gray-300 transition-colors dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
								>
									Cancel
								</button>
								<button
									type="button"
									onClick={handleApplySelection}
									className={cn(
										'px-5 py-2 text-sm font-medium text-white rounded-lg shadow-sm transition-colors',
										'bg-accent-foreground',
									)}
								>
									Apply Selection
								</button>
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

	return (
		<button
			type="button"
			className={cn(
				'relative p-4 w-full text-left rounded-lg border-2 transition-all duration-200 cursor-pointer',
				'bg-white dark:bg-gray-800',
				isSelected
					? 'bg-blue-50 border-blue-500 dark:bg-blue-900/20'
					: 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600',
			)}
			onClick={onToggle}
		>
			<div className="flex justify-between items-center">
				<div className="flex-1">
					<h3 className="mb-1 font-semibold text-gray-900 dark:text-white">
						{category.name}
					</h3>
					<p className="text-sm text-gray-600 dark:text-gray-400">
						{chatbotCount} chatbot{chatbotCount !== 1 ? 's' : ''}
					</p>
				</div>
				<div
					className={cn(
						'flex justify-center items-center w-5 h-5 rounded border-2',
						isSelected
							? 'bg-blue-500 border-blue-500'
							: 'border-gray-300 dark:border-gray-600',
					)}
				>
					{isSelected && (
						<svg
							className="w-3 h-3 text-white"
							fill="currentColor"
							viewBox="0 0 20 20"
							aria-label="Selected"
						>
							<title>Selected</title>
							<path
								fillRule="evenodd"
								d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								clipRule="evenodd"
							/>
						</svg>
					)}
				</div>
			</div>
		</button>
	)
}
