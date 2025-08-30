'use client'

/**
 * BrowseSearchInput Component
 *
 * This component provides a search input field for users to filter chat threads based on keywords.
 * It allows users to type in a search term and clear the input when needed.
 *
 * Key Features:
 * - Controlled Input: Manages the input value using state to reflect the current search keyword.
 * - Dynamic Placeholder: Displays a placeholder text guiding users on what to search for.
 * - Clear Functionality: Provides a button to clear the search input, enhancing user experience.
 * - Responsive Design: Utilizes Tailwind CSS for styling and layout.
 * - Integration with Custom Hooks: Uses `useBrowse and useThreadSearch` to manage the searching.
 */

import { IconClose } from '@/components/ui/icons'
import { useBrowse } from '@/lib/hooks/use-browse'
import { useThreadSearch } from '@/lib/hooks/use-thread-search'
import { cn } from '@/lib/utils'
import { Button } from '@masterbots/mb-ui'
import { Input } from '@masterbots/mb-ui'
import { Search } from 'lucide-react'

export function GlobalSearchInput() {
	const { searchTerm, setSearchTerm } = useThreadSearch()
	const { changeKeyword } = useBrowse()

	const handleSearch = (value: string) => {
		setSearchTerm(value)
		changeKeyword(value)
	}

	return (
		<form className="relative w-full max-w-screen-xl mx-auto flex items-center justify-center">
			<div className="relative w-full">
				<div className="absolute inset-0 transition-opacity duration-300 rounded-full opacity-0 group-focus-within:opacity-100">
					<div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent/10 to-accent/10 blur-lg animate-pulse" />
				</div>

				<div
					className={cn(
						'group relative w-full flex items-center',
						'rounded-full',
						'bg-background/60',
						'border border-accent/10',
						'focus-within:border-accent',
						'focus-within:ring-1 focus-within:ring-accent',
						'transition-all duration-200',
					)}
				>
					<Search className="absolute w-5 h-5 left-4 text-zinc-400 group-focus-within:text-accent" />
					<Input
						id="search-input-form"
						value={searchTerm}
						onChange={(e) => handleSearch(e.target.value)}
						placeholder="Search in all messages and threads..."
						className={cn(
							'px-12 py-6 w-full',
							'bg-transparent',
							'placeholder:text-zinc-400',
							'text-base dark:text-zinc-100',
							'border-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0',
							'rounded-full',
						)}
					/>
					{searchTerm && (
						<Button
							type="reset"
							variant="ghost"
							onClick={() => handleSearch('')}
							className={cn(
								'absolute right-2',
								'p-0 size-8',
								'hover:bg-zinc-800/50',
								'rounded-full',
							)}
							aria-label="Clear search"
						>
							<IconClose className="w-4 h-4" />
						</Button>
					)}
				</div>
			</div>
		</form>
	)
}
