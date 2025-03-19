import { cn } from '@/lib/utils'
import * as React from 'react'

interface LoadingIndicatorProps {
	state?: string
}

export function LoadingIndicator({ state }: LoadingIndicatorProps) {
	//? Helper function to get the loading message based on state
	const getLoadingMessage = (state?: string) => {
		if (!state) return ''

		//* Map states to user-friendly messages
		const messages: Record<string, string> = {
			processing: 'Processing your request...',
			digesting: 'Analyzing your query...',
			polishing: 'Polishing the response...',
			generating: 'Generating a thoughtful answer...',
			continuing: 'Continuing the response...',
			reasoning: 'Applying deep reasoning...',
			finished: 'Completed',
		}

		return messages[state] || state
	}

	const getPulseStyle = (state?: string) => {
		//? Different colors for different states
		const stateColors: Record<string, string> = {
			continuing: 'border-amber-300 bg-amber-100 dark:bg-amber-800/20',
			processing: 'border-blue-300 bg-blue-100 dark:bg-blue-800/20',
			generating: 'border-green-300 bg-green-100 dark:bg-green-800/20',
			reasoning: 'border-purple-300 bg-purple-100 dark:bg-purple-800/20',
		}

		const baseStyle = 'size-3 border-2 rounded-full animate-ping'
		return `${baseStyle} ${stateColors[state || ''] || 'border-gray-200 bg-gray-100 dark:bg-gray-800/20'}`
	}

	return (
		<div className="flex items-center justify-between gap-4">
			<div
				className={cn(
					'text-xs font-medium py-1 px-2 rounded-full transition-all',
					state === 'processing' ||
						state === 'digesting' ||
						state === 'generating' ||
						state === 'polishing' ||
						state === 'reasoning'
						? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
						: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300',
				)}
			>
				{getLoadingMessage(state)}
			</div>
			<div className="flex items-center justify-center ml-2 size-4">
				<div className={getPulseStyle(state)} />
			</div>
		</div>
	)
}
