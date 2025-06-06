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

interface WorkspaceProjectSelectProps {
	value: string | null
	onChange: (value: string) => void
	options: string[]
	className?: string
	disabled?: boolean
}

export function WorkspaceProjectSelect({
	value,
	onChange,
	options,
	className,
	disabled = false,
}: WorkspaceProjectSelectProps) {
	return (
		<div className={cn('flex items-center', className)}>
			<Select value={value || ''} onValueChange={onChange} disabled={disabled}>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Select Project" />
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
							No options available
						</div>
					)}
				</SelectContent>
			</Select>
		</div>
	)
}
