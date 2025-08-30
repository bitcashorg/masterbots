'use client'

import { DashboardOnboarding } from '@/components/onboarding/dashboard-onboarding'
import { IconClose, IconDashboard, IconFilter } from '@/components/ui/icons'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { cn } from '@/lib/utils'
import { Button } from '@masterbots/mb-ui'
import { Input } from '@masterbots/mb-ui'
import { usePathname } from 'next/navigation'
import type * as React from 'react'

interface FilterInputProps {
	className?: string
	userId?: string
}

export function FilterInput({ className, userId }: FilterInputProps) {
	const {
		filterValue,
		setFilterValue,
		isFilterMode,
		setIsFilterMode,
		isDashboardOpen,
		setIsDashboardOpen,
	} = useSidebar()

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

	const handleDashboardToggle = () => {
		setIsDashboardOpen((prev) => !prev)
	}

	return (
		<>
			<div className={cn('flex items-center space-x-2', className)}>
				<div className="relative flex-1">
					<Input
						type="text"
						placeholder="Search..."
						value={filterValue}
						onChange={handleInputChange}
						className="pr-12"
						aria-label="Filter bots"
						data-onboarding-search
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
					variant="outline"
					onClick={handleDashboardToggle}
					aria-label="Open category dashboard"
					className="btn-gradient"
					data-route={isBrowse ? 'public' : 'chat'}
					data-onboarding-dashboard
				>
					<IconDashboard className="size-4" />
				</Button>
				<Button
					size="icon"
					variant={isFilterMode ? 'default' : 'outline'}
					onClick={handleFilterModeToggle}
					aria-label="Toggle filter mode"
					className="btn-gradient"
					data-route={isBrowse ? 'public' : 'chat'}
					data-onboarding-filter
				>
					<IconFilter className={cn('size-4', isFilterMode && 'text-white')} />
				</Button>
			</div>
			<DashboardOnboarding userId={userId} />
		</>
	)
}
