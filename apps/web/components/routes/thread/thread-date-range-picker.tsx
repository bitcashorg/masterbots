'use client'

/**
 * DateRangePicker Component
 *
 * A reusable date range selection component that provides:
 * - Popover-based calendar interface
 * - Two-month view for easier range selection
 * - Formatted date display
 * - Default date range handling
 *
 * Key Features:
 * - Double calendar month view
 * - Date range selection with visual feedback
 * - Formatted date display in button
 * - Accessible keyboard navigation
 * - Responsive popover positioning
 *
 * UI Elements:
 * - Trigger Button: Shows selected date range
 * - Calendar Popover: Double month view
 * - Date Format: "MMM dd, yyyy" (e.g., "Jan 20, 2023")
 *
 * Dependencies:
 * - Uses date-fns for date formatting
 * - Built on Radix UI Popover
 * - Integrates with Shadcn UI Calendar
 */

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { CalendarIcon } from '@radix-ui/react-icons'
import { addDays, format } from 'date-fns'
import * as React from 'react'
import type { DateRange } from 'react-day-picker'

export function DateRangePicker({
	className,
}: React.HTMLAttributes<HTMLDivElement>) {
	const [date, setDate] = React.useState<DateRange | undefined>({
		from: new Date(2023, 0, 20),
		to: addDays(new Date(2023, 0, 20), 20),
	})

	return (
		<div className={cn('grid gap-2', className)}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						id="date"
						variant={'outline'}
						className={cn(
							'w-[260px] justify-start text-left font-normal',
							!date && 'text-muted-foreground',
						)}
					>
						<CalendarIcon className="mr-2 size-4" />
						{date?.from ? (
							date.to ? (
								<>
									{format(date.from, 'LLL dd, y')} -{' '}
									{format(date.to, 'LLL dd, y')}
								</>
							) : (
								format(date.from, 'LLL dd, y')
							)
						) : (
							<span>Pick a date</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="end">
					<Calendar
						initialFocus
						mode="range"
						defaultMonth={date?.from}
						selected={date}
						onSelect={setDate}
						numberOfMonths={2}
					/>
				</PopoverContent>
			</Popover>
		</div>
	)
}
