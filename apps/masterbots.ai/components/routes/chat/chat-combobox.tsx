'use client'

//* ChatCombobox component allows users to select an AI model, with interactive dropdown and visual indicators.

import { AIModels } from '@/app/api/chat/models/models'
import { Button, buttonVariants } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
import {
	IconClaude,
	IconDeepSeek,
	IconLlama,
	IconOpenAI,
	IconWordware,
} from '@/components/ui/icons'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { useModel } from '@/lib/hooks/use-model'
import { usePowerUp } from '@/lib/hooks/use-power-up'
import { cn } from '@/lib/utils'
import { CheckIcon } from '@radix-ui/react-icons'
import { appConfig } from 'mb-env'
import * as React from 'react'

//* Model options available in the combobox, each with label, value, and logo icon.
const models = [
	{ label: 'GPT-4o', value: AIModels.Default, logo: 'MB' },
	{ label: 'GPT-4', value: AIModels.GPT4, logo: <IconOpenAI /> },
	{ label: 'Claude3', value: AIModels.Claude3, logo: <IconClaude /> },
	{ label: 'llama3_8', value: AIModels.llama3_8b, logo: <IconLlama /> },
	{ label: 'llama3_7', value: AIModels.llama3_7b, logo: <IconLlama /> },
	{ label: 'WordWare', value: AIModels.WordWare, logo: <IconWordware /> },
	{ label: 'DeepSeek R1', value: AIModels.DeepSeekR1, logo: <IconDeepSeek /> },
]

//* ChatCombobox provides a popover for AI model selection and triggers model change based on user choice.
export function ChatCombobox() {
	const { selectedModel, changeModel } = useModel()
	const [open, setOpen] = React.useState(false)
	const [value, setValue] = React.useState(selectedModel as string)
	const { isPowerUp } = usePowerUp()
	const isDevEnv = process.env.NEXT_PUBLIC_APP_ENV !== 'prod'

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					// biome-ignore lint/a11y/useSemanticElements: <explanation>
					role="combobox"
					aria-expanded={open}
					className={cn(
						buttonVariants({
							size: 'sm',
							variant: isPowerUp ? 'powerUp' : 'outline',
						}),
						'absolute left-[8px] top-[8px] size-8 rounded-full p-0 sm:left-[14px]',
					)}
				>
					{/* Renders the selected model's logo or default icon */}
					{value ? (
						models.find((model) => model.value === value)?.logo
					) : selectedModel === AIModels.Default ? (
						<IconOpenAI />
					) : (
						<IconClaude />
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[100px] p-0">
				<Command>
					<CommandInput placeholder="Model..." className="h-9" />
					<CommandEmpty>No model found.</CommandEmpty>
					<CommandGroup>
						<CommandList>
							{/* Render models only in dev or local environments, otherwise show default */}
							{isDevEnv ? (
								models.map((model) => (
									<CommandItem
										key={model.value}
										value={model.value}
										onSelect={(currentValue) => {
											if (appConfig.features.devMode) {
												setValue(currentValue === value ? '' : currentValue)
												changeModel(currentValue as AIModels)
											}
											setOpen(false) // Closes the popover after selection.
										}}
									>
										{model.label}
										<CheckIcon
											className={cn(
												'ml-auto size-4 text-emerald-500',
												value === model.value ? 'opacity-100' : 'opacity-0',
											)}
										/>
									</CommandItem>
								))
							) : (
								<CommandItem
									key={AIModels.Default}
									value={AIModels.Default}
									onSelect={() => {
										setValue(AIModels.Default)
										changeModel(AIModels.Default)
										setOpen(false)
									}}
								>
									Masterbot&apos;s Model
									<CheckIcon
										className={cn(
											'ml-auto size-4 text-emerald-500',
											value === AIModels.Default ? 'opacity-100' : 'opacity-0',
										)}
									/>
								</CommandItem>
							)}
						</CommandList>
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
