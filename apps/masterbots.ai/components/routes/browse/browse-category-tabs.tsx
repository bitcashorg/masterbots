'use client'

/**
 * BrowseCategoryTabs Component
 *
 * This component renders a set of category buttons for browsing different categories.
 * It allows users to switch between categories and highlights the active category.
 *
 * Props:
 * - categories: An array of category objects to display as buttons.
 * - initialCategory: The category to be selected initially; defaults to 'all'.
 *
 * Key Features:
 * - Active Tab Management: Uses a custom hook to manage the active category tab.
 * - Smooth Scrolling: Automatically scrolls to the active category button when changed.
 * - Dynamic Category Buttons: Renders a button for each category, including an 'all' option.
 */

import { BrowseCategoryButton } from '@/components/routes/browse/browse-category-button'
import { useBrowse } from '@/lib/hooks/use-browse'
import type { Category } from 'mb-genql'
import { toSlug } from 'mb-lib'
import { useEffect } from 'react'

export function BrowseCategoryTabs({
	categories,
	initialCategory = 'all',
}: {
	categories: Category[]
	initialCategory?: string
}) {
	const { tab: activeTab, changeTab: setActiveTab } = useBrowse()

	useEffect(() => {
		if (document) {
			const element = document.getElementById(
				`browse-category-tab__${activeTab?.toString()}`,
			)

			if (element) {
				element.scrollIntoView({
					behavior: 'smooth',
					block: 'center',
					inline: 'center',
				})
			}
		}
	})

	useEffect(() => {
		if (initialCategory === 'all') {
			setActiveTab(null)
		} else {
			setActiveTab(
				categories.filter((c) => toSlug(c.name) === initialCategory)[0]
					?.categoryId,
			)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initialCategory, setActiveTab, categories.filter])

	return (
		<div className="w-full py-[10px] my-3 !overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar small-thumb">
			<BrowseCategoryButton
				id="browse-category-tab__null"
				onClick={() => setActiveTab(null)}
				category="all"
				activeTab={activeTab}
			/>
			{categories.map((category, key) => (
				<BrowseCategoryButton
					id={`browse-category-tab__${category.categoryId}`}
					key={key}
					onClick={() => setActiveTab(category.categoryId)}
					category={category}
					activeTab={activeTab}
				/>
			))}
		</div>
	)
}
