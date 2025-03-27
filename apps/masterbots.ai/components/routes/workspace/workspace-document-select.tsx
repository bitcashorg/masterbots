'use client'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface WorkspaceDocumentSelectProps {
	value: string | null
	onChange: (value: string) => void
	options: string[]
	disabled?: boolean
	className?: string
}

export function WorkspaceDocumentSelect({
	value,
	onChange,
	options,
	disabled = false,
	className,
}: WorkspaceDocumentSelectProps) {
	return (
		<div className={cn('flex items-center', className)}>
			<Select value={value || ''} onValueChange={onChange} disabled={disabled}>
				<SelectTrigger className="w-[200px]">
					<SelectValue placeholder="Select Document" />
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
