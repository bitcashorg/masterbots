'use client'

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
	IconGemini,
	IconLlama,
	IconOpenAI,
	IconWordware,
} from '@/components/ui/icons'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { useDeepThinking } from '@/lib/hooks/use-deep-thinking'
import { useModel } from '@/lib/hooks/use-model'
import { usePowerUp } from '@/lib/hooks/use-power-up'
import { cn } from '@/lib/utils'
import { CheckIcon } from '@radix-ui/react-icons'
import { appConfig } from 'mb-env'
import * as React from 'react'

const models = [
	{ label: 'Default', value: AIModels.Default, logo: 'MB' },
	{ label: 'GPT-4.1', value: AIModels.GPT4_1, logo: <IconOpenAI /> },
	{ label: 'GPT-4o mini', value: AIModels.GPT4o, logo: <IconOpenAI /> },

	{ label: 'Claude3', value: AIModels.Claude3, logo: <IconClaude /> },
	{ label: 'llama3-8', value: AIModels.llama3_8b, logo: <IconLlama /> },
	{ label: 'llama3-7', value: AIModels.llama3_7b, logo: <IconLlama /> },
	{ label: 'WordWare', value: AIModels.WordWare, logo: <IconWordware /> },
	{
		label: 'DeepSeek',
		value: AIModels.DeepSeekGroq,
		logo: <IconDeepSeek />,
	},
	{
		label: 'Gemini',
		value: AIModels.Gemini,
		logo: <IconGemini />,
	},
	{
		label: 'Gemini Pro',
		value: AIModels.Gemini_pro,
		logo: <IconGemini />,
	},
	{
		label: 'Gemini Lite',
		value: AIModels.Gemini_lite,
		logo: <IconGemini />,
	},
]

export function ChatCombobox() {
	const { selectedModel, changeModel } = useModel()
	const [open, setOpen] = React.useState(false)
	const { isPowerUp } = usePowerUp()
	const { isDeepThinking, toggleDeepThinking } = useDeepThinking()
	// TODO: Add subscription check to enable/disable this feature along with the feature flag
	const isMultiModelEnabled = appConfig.features.multiModel

	const processingSelectionRef = React.useRef(false)

	const getButtonVariant = () => {
		if (isDeepThinking) return 'deepThinking'
		if (isPowerUp) return 'powerUp'
		return 'outline'
	}

	const getModelLogo = () => {
		const model = models.find((m) => m.value === selectedModel)
		return model?.logo || <IconOpenAI />
	}

	const handleModelSelect = (modelValue: string) => {
		if (!appConfig.features.devMode || processingSelectionRef.current) return

		processingSelectionRef.current = true
		setOpen(false)

		setTimeout(() => {
			try {
				if (modelValue === AIModels.DeepSeekGroq) {
					console.log('Combobox: Selecting DeepSeek')
					if (!isDeepThinking) {
						console.log('Combobox: Activating Deep Thinking')
						toggleDeepThinking()
					}
				} else if (modelValue !== AIModels.DeepSeekGroq && isDeepThinking) {
					console.log('Combobox: Deactivating Deep Thinking')
					toggleDeepThinking()
				} else if (modelValue !== AIModels.DeepSeekGroq && !isDeepThinking) {
					console.log('Combobox: Changing model to', modelValue)
					changeModel(modelValue as AIModels)
				}
			} finally {
				setTimeout(() => {
					processingSelectionRef.current = false
				}, 150)
			}
		}, 100)
	}

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
							variant: getButtonVariant(),
						}),
						'absolute left-[8px] top-[8px] size-8 rounded-full p-0 sm:left-[14px]',
					)}
				>
					{getModelLogo()}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[180px] p-0">
				<Command>
					<CommandInput placeholder="Model..." className="h-9" />
					<CommandEmpty>No model found.</CommandEmpty>
					<CommandGroup>
						<CommandList>
							{isMultiModelEnabled ? (
								models.map((model) => (
									<CommandItem
										key={model.value}
										value={model.value}
										onSelect={handleModelSelect}
									>
										<span className="flex items-center justify-center mr-2">
											{model.logo}
										</span>
										{model.label}
										<CheckIcon
											className={cn(
												'ml-auto size-4 text-emerald-500',
												selectedModel === model.value
													? 'opacity-100'
													: 'opacity-0',
											)}
										/>
									</CommandItem>
								))
							) : (
								<CommandItem
									key={AIModels.Default}
									value={AIModels.Default}
									onSelect={() => {
										changeModel(AIModels.Default)
										setOpen(false)
									}}
								>
									Masterbot&apos;s Model
									<CheckIcon
										className={cn(
											'ml-auto size-4 text-emerald-500',
											selectedModel === AIModels.Default
												? 'opacity-100'
												: 'opacity-0',
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
