'use client'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { cn } from '@/lib/utils'
import {
	BrainIcon,
	GlobeIcon,
	LayoutIcon,
	MessageSquareIcon,
	SendIcon,
	SparklesIcon,
	WandIcon,
} from 'lucide-react'
import * as React from 'react'

export interface WorkspaceFormProps {
	onAIAssist?: (prompt: string, options?: any) => Promise<void>
	onSubmit?: (value: string, options?: any) => Promise<void>
	activeSection?: string | null
	className?: string
	disabled?: boolean
	input?: string
	setInput?: (value: string) => void
	placeholder?: string
	isLoading?: boolean
}

export function WorkspaceForm({
	onAIAssist,
	onSubmit,
	activeSection,
	className,
	disabled = false,
	input: externalInput,
	setInput: setExternalInput,
	placeholder = 'How can I help with this document?',
	isLoading = false,
}: WorkspaceFormProps) {
	// Use either external or internal state for input
	const [internalInput, setInternalInput] = React.useState('')
	const input = externalInput !== undefined ? externalInput : internalInput
	const setInput = setExternalInput || setInternalInput

	const { formRef, onKeyDown } = useEnterSubmit()
	const inputRef = React.useRef<HTMLTextAreaElement>(null)
	const [isPowerUpActive, setIsPowerUpActive] = React.useState(false)
	const [isReasoningActive, setIsReasoningActive] = React.useState(false)
	const [isWebSearchActive, setIsWebSearchActive] = React.useState(false)

	React.useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus()
		}
	}, [])

	const handleAIAssist = React.useCallback(async () => {
		if (disabled || !input.trim() || !onAIAssist) return

		// Call AI assist with the current section and prompt
		await onAIAssist(input, {
			sectionId: activeSection,
			powerUp: isPowerUpActive,
			reasoning: isReasoningActive,
			webSearch: isWebSearchActive,
		})

		setInput('')
	}, [
		disabled,
		input,
		onAIAssist,
		activeSection,
		isPowerUpActive,
		isReasoningActive,
		isWebSearchActive,
	])

	const handleSubmit = React.useCallback(
		async (e: React.FormEvent) => {
			e.preventDefault()
			if (disabled || !input.trim()) return

			if (onSubmit) {
				// Submit as regular chat message
				await onSubmit(input, {
					powerUp: isPowerUpActive,
					reasoning: isReasoningActive,
					webSearch: isWebSearchActive,
				})
			} else if (onAIAssist) {
				// Use AI assist as fallback
				await handleAIAssist()
			}

			setInput('')
		},
		[
			disabled,
			input,
			onSubmit,
			onAIAssist,
			handleAIAssist,
			isPowerUpActive,
			isReasoningActive,
			isWebSearchActive,
		],
	)

	return (
		<form
			ref={formRef}
			onSubmit={handleSubmit}
			className={cn('relative flex flex-col w-full px-4 py-2', className)}
		>
			{/* Feature toggles */}
			<div className="flex items-center mb-2 space-x-6 overflow-y-hidden scrollbar scrollbar-thin">
				<FeatureToggle
					id="powerUp"
					name="Deep Expertise"
					icon={WandIcon}
					isActive={isPowerUpActive}
					onChange={setIsPowerUpActive}
					activeColor="yellow"
				/>

				<FeatureToggle
					id="reasoning"
					name="Deep Thinking"
					icon={BrainIcon}
					isActive={isReasoningActive}
					onChange={setIsReasoningActive}
					activeColor="green"
				/>

				<FeatureToggle
					id="webSearch"
					name="Web Search"
					icon={GlobeIcon}
					isActive={isWebSearchActive}
					onChange={setIsWebSearchActive}
					activeColor="cyan"
				/>

				{activeSection && onAIAssist && (
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								type="button"
								size="sm"
								variant={activeSection ? 'default' : 'outline'}
								disabled={!activeSection}
								className="ml-auto h-8 px-3"
								onClick={() => {
									if (!input) {
										setInput(`Rewrite this section to be more engaging.`)
									} else {
										handleAIAssist()
									}
								}}
							>
								<SparklesIcon className="h-3.5 w-3.5 mr-1" />
								Edit Section
							</Button>
						</TooltipTrigger>
						<TooltipContent side="top">
							{activeSection
								? 'Apply AI to current section'
								: 'Select a section first'}
						</TooltipContent>
					</Tooltip>
				)}
			</div>

			<div className="relative flex w-full gap-2 sm:gap-4">
				<Textarea
					ref={inputRef}
					tabIndex={0}
					onKeyDown={onKeyDown}
					rows={1}
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder={
						activeSection ? 'How should I edit this section?' : placeholder
					}
					spellCheck={false}
					className="min-h-[60px] w-full resize-none bg-background px-3 py-3 sm:text-sm border rounded-md"
					disabled={disabled || isLoading}
				/>
				<div className="flex items-center gap-2">
					{onAIAssist && (
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									type="button"
									size="icon"
									variant="outline"
									disabled={disabled || isLoading || !input.trim()}
									onClick={() => handleAIAssist()}
									aria-label="Apply AI to document"
									className="shrink-0"
								>
									<SparklesIcon className="h-5 w-5" />
								</Button>
							</TooltipTrigger>
							<TooltipContent side="top">Apply AI to document</TooltipContent>
						</Tooltip>
					)}
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								type="submit"
								size="icon"
								disabled={disabled || isLoading || !input.trim()}
								className="shrink-0"
							>
								<SendIcon className="h-5 w-5" />
							</Button>
						</TooltipTrigger>
						<TooltipContent side="top">Send message</TooltipContent>
					</Tooltip>
				</div>
			</div>
		</form>
	)
}

// Feature toggle component for reuse
interface FeatureToggleProps {
	id: string
	name: string
	icon: React.ComponentType<{ className?: string }>
	isActive: boolean
	onChange: (value: boolean) => void
	activeColor?: string
}

function FeatureToggle({
	id,
	name,
	icon: Icon,
	isActive,
	onChange,
	activeColor = 'blue',
}: FeatureToggleProps) {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button
					type="button"
					size="sm"
					variant={isActive ? 'default' : 'outline'}
					onClick={() => onChange(!isActive)}
					className={cn(
						'h-8 px-3',
						isActive &&
							(activeColor === 'yellow'
								? 'bg-yellow-600 hover:bg-yellow-700'
								: activeColor === 'green'
									? 'bg-green-600 hover:bg-green-700'
									: activeColor === 'cyan'
										? 'bg-cyan-600 hover:bg-cyan-700'
										: 'bg-blue-600 hover:bg-blue-700'),
					)}
				>
					<Icon
						className={cn(
							'h-3.5 w-3.5 mr-1',
							isActive ? 'text-white' : 'text-foreground',
						)}
					/>
					<span className="text-xs">{name}</span>
				</Button>
			</TooltipTrigger>
			<TooltipContent side="top">
				{isActive ? `Disable ${name}` : `Enable ${name}`}
			</TooltipContent>
		</Tooltip>
	)
}
