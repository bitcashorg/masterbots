'use client'

import {
	CommandGroup,
	CommandItem,
	CommandSeparator,
} from '@/components/ui/command'
import { type ModelData, formatModelName, getModelIcon } from '@/lib/models'
import { cn } from '@/lib/utils'
import { CheckIcon } from '@radix-ui/react-icons'

interface ModelGroupProps {
	heading: string
	models: ModelData[]
	selectedModel: string
	onSelect: (modelValue: string) => void
	showSeparator?: boolean
	disabled?: boolean
}

export function ModelGroup({
	heading,
	models,
	selectedModel,
	onSelect,
	showSeparator = false,
	disabled = false,
}: ModelGroupProps) {
	if (models.length === 0) return null

	return (
		<>
			{showSeparator && <CommandSeparator />}
			<CommandGroup heading={heading}>
				{models.map((model) => (
					<CommandItem
						key={model.model}
						value={model.model}
						onSelect={() => !disabled && onSelect(model.model)}
						className={cn(disabled && 'opacity-60')}
						disabled={disabled}
					>
						<span className="flex items-center justify-center mr-2">
							{getModelIcon(model.model)}
						</span>
						<span className="flex-1 truncate">
							{formatModelName(model.model_data?.name || model.model)}
						</span>
						{disabled ? (
							<span className="ml-auto text-xs text-muted-foreground">
								{model.type === 'paid' ? 'PRO' : 'Disabled'}
							</span>
						) : (
							<CheckIcon
								className={cn(
									'ml-auto size-4 text-emerald-500',
									selectedModel === model.model ? 'opacity-100' : 'opacity-0',
								)}
							/>
						)}
					</CommandItem>
				))}
			</CommandGroup>
		</>
	)
}
