'use client'

import { cn } from '@/lib/utils'
import { Button } from '@masterbots/mb-ui'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@masterbots/mb-ui'

interface WorkspaceDepartmentSelectProps {
	value: string | null
	onChange: (value: string) => void
	options: string[]
	className?: string
	disabled?: boolean
}

export function WorkspaceDepartmentSelect({
	value,
	onChange,
	options,
	className,
	disabled = false,
}: WorkspaceDepartmentSelectProps) {
	return (
		<div className={cn('flex items-center', className)}>
			<Select value={value || ''} onValueChange={onChange} disabled={disabled}>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Select Department" />
				</SelectTrigger>
				<SelectContent>
					{Array.isArray(options) && options.length > 0 ? (
						options.map((option) => (
							<SelectItem key={option} value={option}>
								{option}
							</SelectItem>
						))
					) : (
						<div className="px-2 py-4 text-center text-sm text-muted-foreground">
							No departments available
						</div>
					)}
				</SelectContent>
			</Select>
		</div>
	)
}
