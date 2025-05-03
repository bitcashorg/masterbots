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
	// Ensure options is always an array
	const safeOptions = Array.isArray(options) ? options : []
	
	// Debug logging to show available options
	console.debug('[WorkspaceDocumentSelect] Available options:', safeOptions)
	
	// Determine if there are any options available
	const hasOptions = safeOptions.length > 0
	
	// Disable the select when there are no options available
	const isDisabled = disabled || !hasOptions
	
	return (
		<div className={cn('flex items-center', className)}>
			<Select 
				value={value || ''} 
				onValueChange={onChange} 
				disabled={isDisabled}
			>
				<SelectTrigger className="w-[200px]">
					<SelectValue placeholder={hasOptions ? "Select Document" : "---"} />
				</SelectTrigger>
				<SelectContent>
					{hasOptions ? (
						safeOptions.map((option) => (
							<SelectItem key={option} value={option}>
								{option}
							</SelectItem>
						))
					) : (
						<div className="px-2 py-4 text-center text-sm text-muted-foreground">
							No documents available
						</div>
					)}
				</SelectContent>
			</Select>
		</div>
	)
}
