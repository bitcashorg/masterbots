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
}

export function WorkspaceProjectSelect({
	value,
	onChange,
	options,
	className,
}: WorkspaceProjectSelectProps) {
	return (
		<div className={cn('flex items-center', className)}>
			<Select value={value || ''} onValueChange={onChange}>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Select Project" />
				</SelectTrigger>
				<SelectContent>
					{options.map((option) => (
						<SelectItem key={option} value={option}>
							{option}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	)
}
