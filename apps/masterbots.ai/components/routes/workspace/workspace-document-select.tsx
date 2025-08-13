'use client'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import React from 'react'

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
	// Force a new array for safeOptions to avoid reference issues
	const safeOptions = Array.isArray(options) ? [...options] : []

	// Enhanced debug logging to show available options and current selection
	console.log('[WorkspaceDocumentSelect] Rendering with:', {
		value,
		optionsCount: safeOptions.length,
		options: safeOptions,
		optionsReference: options, // Log the reference itself
		disabled,
		hasOptions: safeOptions.length > 0,
	})

	// Determine if there are any options available
	const hasOptions = safeOptions.length > 0

	// Disable the select when there are no options available
	const isDisabled = disabled || !hasOptions

	// Create a key based on options to force rerender when options change
	const componentKey = `${safeOptions.join(',') || 'empty'}-${value || 'no-value'}`

	return (
		<div className={cn('flex items-center', className)}>
			<Select
				key={componentKey}
				value={value || ''}
				onValueChange={(newValue) => {
					console.log('[WorkspaceDocumentSelect] Selected document:', newValue)
					onChange(newValue)
				}}
				disabled={isDisabled}
			>
				<SelectTrigger className="w-[200px]">
					<SelectValue placeholder={hasOptions ? 'Select Document' : '---'} />
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
