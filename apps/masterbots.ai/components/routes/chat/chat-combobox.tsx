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
	CommandSeparator,
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
import { Loader2 } from 'lucide-react'

// Function to get model icon based on model name
const getModelIcon = (modelName: string) => {
	if (modelName.includes('gpt') || modelName.includes('o4'))
		return <IconOpenAI />
	if (modelName.includes('claude')) return <IconClaude />
	if (modelName.includes('llama')) return <IconLlama />
	if (modelName.includes('deepseek')) return <IconDeepSeek />
	if (modelName.includes('gemini')) return <IconGemini />
	if (modelName.includes('wordware')) return <IconWordware />
	return 'MB' // Default logo text
}

export function ChatCombobox() {
	const { selectedModel, changeModel, models, isLoading } = useModel()
	const [open, setOpen] = React.useState(false)
	const { isPowerUp } = usePowerUp()
	const { isDeepThinking, toggleDeepThinking } = useDeepThinking()

	//? Feature flag for multi-model
	const isMultiModelEnabled = appConfig.features.multiModel

	const processingSelectionRef = React.useRef(false)

	const getButtonVariant = () => {
		if (isDeepThinking) return 'deepThinking'
		if (isPowerUp) return 'powerUp'
		return 'outline'
	}

	const getModelLogo = () => {
		if (isLoading) {
			return <Loader2 className="size-4 animate-spin" />
		}

		const model = models.find((m) => m.model === selectedModel)
		return model ? getModelIcon(model.model) : <IconOpenAI />
	}

	const handleModelSelect = (modelValue: string) => {
		if (!appConfig.features.devMode || processingSelectionRef.current) return

		processingSelectionRef.current = true
		setOpen(false)

		setTimeout(() => {
			try {
				if (modelValue.includes('deepseek-r1-distill-llama-70b')) {
					console.log('Combobox: Selecting DeepSeek')
					if (!isDeepThinking) {
						console.log('Combobox: Activating Deep Thinking')
						toggleDeepThinking()
					}
				} else if (modelValue.includes('deepseek') && isDeepThinking) {
					console.log('Combobox: Deactivating Deep Thinking')
					toggleDeepThinking()
				} else if (!modelValue.includes('deepseek') && !isDeepThinking) {
					console.log('Combobox: Changing model to', modelValue)
					changeModel(modelValue)
				}
			} finally {
				setTimeout(() => {
					processingSelectionRef.current = false
				}, 150)
			}
		}, 100)
	}

	//? Group models by type and availability
	const freeEnabledModels = models.filter(
		(m) => m.type.toLowerCase() === 'free' && m.enabled,
	)
	const paidEnabledModels = models.filter((m) => m.type === 'paid' && m.enabled)
	const disabledModels = models.filter((m) => !m.enabled)

	console.log('Model counts:', {
		total: models.length,
		freeEnabled: freeEnabledModels.length,
		paidEnabled: paidEnabledModels.length,
		disabled: disabledModels.length,
	})

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
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput
						placeholder="Search models..."
						className="h-9"
						value=""
					/>
					<CommandEmpty>No model found.</CommandEmpty>

					{isLoading ? (
						<div className="py-6 text-center">
							<Loader2 className="mx-auto mb-2 size-5 animate-spin text-muted-foreground" />
							<p className="text-sm text-muted-foreground">Loading models...</p>
						</div>
					) : (
						<CommandList>
							{isMultiModelEnabled ? (
								<>
									{freeEnabledModels.length > 0 && (
										<CommandGroup heading="Free Models">
											{freeEnabledModels.map((model) => (
												<CommandItem
													key={model.model}
													value={model.model}
													onSelect={() => handleModelSelect(model.model)}
												>
													<span className="flex items-center justify-center mr-2">
														{getModelIcon(model.model)}
													</span>
													<span className="flex-1 truncate">
														{model.model_data?.name || model.model}
													</span>
													<CheckIcon
														className={cn(
															'ml-auto size-4 text-emerald-500',
															selectedModel === model.model
																? 'opacity-100'
																: 'opacity-0',
														)}
													/>
												</CommandItem>
											))}
										</CommandGroup>
									)}

									{paidEnabledModels.length > 0 && (
										<>
											{freeEnabledModels.length > 0 && <CommandSeparator />}
											<CommandGroup heading="Premium Models">
												{paidEnabledModels.map((model) => (
													<CommandItem
														key={model.model}
														value={model.model}
														onSelect={() => handleModelSelect(model.model)}
													>
														<span className="flex items-center justify-center mr-2">
															{getModelIcon(model.model)}
														</span>
														<span className="flex-1 truncate">
															{model.model_data?.name || model.model}
														</span>
														<CheckIcon
															className={cn(
																'ml-auto size-4 text-emerald-500',
																selectedModel === model.model
																	? 'opacity-100'
																	: 'opacity-0',
															)}
														/>
													</CommandItem>
												))}
											</CommandGroup>
										</>
									)}

									{disabledModels.length > 0 && (
										<>
											{(freeEnabledModels.length > 0 ||
												paidEnabledModels.length > 0) && <CommandSeparator />}
											<CommandGroup heading="Unavailable Models">
												{disabledModels.map((model) => (
													<CommandItem
														key={model.model}
														value={model.model}
														className="opacity-60"
														disabled
													>
														<span className="flex items-center justify-center mr-2">
															{getModelIcon(model.model)}
														</span>
														<span className="flex-1 truncate">
															{model.model_data?.name || model.model}
														</span>
														<span className="ml-auto text-xs text-muted-foreground">
															{model.type === 'paid' ? 'PRO' : 'Disabled'}
														</span>
													</CommandItem>
												))}
											</CommandGroup>
										</>
									)}
								</>
							) : (
								<CommandGroup>
									<CommandItem
										value="default"
										onSelect={() => {
											const defaultModel =
												models.find((m) => m.enabled)?.model || AIModels.Default
											changeModel(defaultModel)
											setOpen(false)
										}}
									>
										Masterbot&apos;s Model
										<CheckIcon className="ml-auto opacity-100 size-4 text-emerald-500" />
									</CommandItem>
								</CommandGroup>
							)}
						</CommandList>
					)}
				</Command>
			</PopoverContent>
		</Popover>
	)
}
