'use client'

import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { cn } from '@/lib/utils'
import { Button } from '@masterbots/mb-ui'
import { Textarea } from '@masterbots/mb-ui'
import { SendIcon, SparklesIcon } from 'lucide-react'
import * as React from 'react'

export interface WorkspaceFormProps {
	onAIAssist: () => void
	className?: string
	disabled?: boolean
}

export function WorkspaceForm({
	onAIAssist,
	className,
	disabled = false,
}: WorkspaceFormProps) {
	const [input, setInput] = React.useState('')
	const { formRef, onKeyDown } = useEnterSubmit()
	const inputRef = React.useRef<HTMLTextAreaElement>(null)

	React.useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus()
		}
	}, [])

	const handleAIAssist = React.useCallback(() => {
		if (disabled) return
		onAIAssist()
	}, [disabled, onAIAssist])

	const handleManualSubmit = React.useCallback(() => {
		if (disabled || !input.trim()) return
		// Handle manual text submission
		console.log('Manual edit submitted:', input)
		setInput('')
	}, [disabled, input])

	return (
		<form
			ref={formRef}
			onSubmit={(e) => {
				e.preventDefault()
				handleManualSubmit()
			}}
			className={cn('relative flex flex-col w-full px-4 py-2', className)}
		>
			<div className="relative flex w-full gap-2 sm:gap-4">
				<Textarea
					ref={inputRef}
					tabIndex={0}
					onKeyDown={onKeyDown}
					rows={1}
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="Ask questions or edit workspace content directly..."
					spellCheck={false}
					className="min-h-[60px] w-full resize-none bg-background px-3 py-3 sm:text-sm"
					disabled={disabled}
				/>
				<div className="flex items-center gap-2">
					<Button
						type="button"
						size="icon"
						variant="outline"
						disabled={disabled}
						onClick={handleAIAssist}
						aria-label="Generate with AI"
						className="shrink-0"
					>
						<SparklesIcon className="h-5 w-5" />
					</Button>
					<Button
						type="submit"
						size="icon"
						disabled={disabled || !input.trim()}
						className="shrink-0"
					>
						<SendIcon className="h-5 w-5" />
					</Button>
				</div>
			</div>
		</form>
	)
}
