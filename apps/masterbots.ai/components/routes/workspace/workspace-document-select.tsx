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
					<SelectValue placeholder={Array.isArray(options) && options.length > 0 ? "Select Document" : "---"} />
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
							No documents available
						</div>
					)}
				</SelectContent>
			</Select>
		</div>
	)
}
