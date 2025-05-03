'use client'

import { Button } from '@/components/ui/button'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface WorkspaceOrganizationSelectProps {
	value: string | null
	onChange: (value: string) => void
	options: string[]
	className?: string
}

export function WorkspaceOrganizationSelect({
	value,
	onChange,
	options,
	className,
}: WorkspaceOrganizationSelectProps) {
	return (
		<div className={cn('flex items-center', className)}>
			<Select value={value || ''} onValueChange={onChange}>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Select Organization" />
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
							No organizations available
						</div>
					)}
				</SelectContent>
			</Select>
		</div>
	)
}
