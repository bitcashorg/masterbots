'use client'

import { Button } from '@/components/ui/button'
import { IconClose, IconFilter } from '@/components/ui/icons'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { cn } from '@/lib/utils'
import { Input } from '@masterbots/mb-ui'
import { usePathname } from 'next/navigation'
import type * as React from 'react'

interface FilterInputProps {
	className?: string
}

export function FilterInput({ className }: FilterInputProps) {
	const { filterValue, setFilterValue, isFilterMode, setIsFilterMode } =
		useSidebar()

	const pathname = usePathname()
	const isBrowse = !/^\/(?:c|u)(?:\/|$)/.test(pathname)

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFilterValue(event.target.value)
	}

	const handleClearFilter = () => {
		setFilterValue('')
	}

	const handleFilterModeToggle = () => {
		setIsFilterMode((prev) => !prev)
	}

	return (
		<div className={cn('flex items-center space-x-2', className)}>
			<div className="relative flex-1">
				<Input
					type="text"
					placeholder="Search..."
					value={filterValue}
					onChange={handleInputChange}
					className="pr-12"
					aria-label="Filter bots"
				/>
				{filterValue && (
					<button
						type="button"
						onClick={handleClearFilter}
						className="absolute -translate-y-1/2 right-8 top-1/2 text-muted-foreground hover:text-gray-700 dark:hover:text-gray-300"
						aria-label="Clear filter"
					>
						<IconClose className="w-4 h-4" />
					</button>
				)}
			</div>
			<Button
				size="icon"
				variant={isFilterMode ? 'default' : 'outline'}
				onClick={handleFilterModeToggle}
				aria-label="Toggle filter mode"
				className="btn-gradient"
				data-route={isBrowse ? 'public' : 'chat'}
			>
				<IconFilter className={cn('size-4', isFilterMode && 'text-white')} />
			</Button>
		</div>
	)
}
