import { ChatMessageActions } from '@/components/routes/chat/chat-message-actions'
import {
	cleanClickableText,
	extractFollowUpContext,
} from '@/lib/chat-clickable-text'
import { cleanPrompt, extractReasoningContent } from '@/lib/helpers/ai-helpers'
import { memoizedMarkdownComponents } from '@/lib/memoized-markdown-components'
import { cn } from '@/lib/utils'
import type { ChatMessageProps } from '@/types'
import { MemoizedReactMarkdown } from '@masterbots/mb-ui'
import { ChevronsDownUp } from 'lucide-react'
import { useState } from 'react'

export function ReasoningChatMessage({
	message,
	sendMessageFromResponse,
	actionRequired = true,
	...props
}: ChatMessageProps) {
	const [isReasoningCollapsed, setIsReasoningCollapsed] = useState(!true)
	const [clicked, setClicked] = useState(false)
	//? Extract reasoning from message
	const reasoningContent = extractReasoningContent(message)
	//? Clean the message content and update the message object.
	const content = cleanPrompt(message.content)
	const cleanMessage = { ...message, content }

	//? Handler for clickable text elements.
	const handleClickableClick = (clickableText: string) => {
		if (clicked) return
		setClicked(true)
		const context = extractFollowUpContext(message.content, clickableText)
		const cleanedText = cleanClickableText(context)
		const bulletContent = `Explain more in-depth and in detail about "${clickableText}"? ${cleanedText}`
		sendMessageFromResponse?.(
			{
				bulletContent,
				messageId: message.messageId,
			},
			() => {
				setClicked(false)
			},
		)
	}

	const toggleReasoning = () => {
		setIsReasoningCollapsed(!isReasoningCollapsed)
	}

	return (
		<div
			className={cn('group relative flex items-start p-1 w-full')}
			{...props}
		>
			<div className="flex-1 pr-1 space-y-6 overflow-hidden">
				{/* First show the reasoning part (if available) */}
				{reasoningContent && (
					<>
						<div className="flex items-center justify-between py-2">
							<span className="inline-flex items-center px-3 py-1 text-xs font-medium text-purple-800 bg-purple-100 rounded dark:bg-purple-800 dark:text-purple-100">
								{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
								<svg
									className="mr-1 size-3"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
										fill="currentColor"
									/>
								</svg>
								Reasoning
							</span>
							{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
							<button
								onClick={toggleReasoning}
								className="flex items-center px-3 py-1 space-x-1 text-xs font-medium transition-colors border rounded bg-slate-200 hover:bg-slate-300 text-slate-700 border-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200 dark:border-slate-600 focus:outline-none"
							>
								<ChevronsDownUp className="size-3" />
							</button>
						</div>
						{isReasoningCollapsed ? (
							<div className="px-4 py-2 mb-4 ml-3 text-sm italic border-l-4 text-slate-500 dark:text-slate-400 border-purple-500/40 dark:border-purple-800/40 bg-slate-100/50 dark:bg-slate-800/20">
								{reasoningContent
									?.split('\n')
									.filter((line) => line.trim())
									.slice(0, 2)
									.map((line, i) => (
										<div key={line} className="truncate">
											{line.trim().substring(0, 120)}
											{line.length > 120 && '...'}
										</div>
									))}
								{(reasoningContent?.split('\n').filter((line) => line.trim())
									.length || 0) > 2 && (
									<div className="mt-1 text-xs text-slate-400 dark:text-slate-500">
										+ more reasoning details...
									</div>
								)}
							</div>
						) : (
							<div className="px-6 py-4 mb-4 border-l-4 rounded-r-lg bg-slate-100/80 dark:bg-slate-800/30 border-purple-500/60 dark:border-purple-800/60">
								<pre className="font-mono text-xs whitespace-pre-wrap text-slate-700 dark:text-slate-300 md:text-sm">
									{reasoningContent}
								</pre>
							</div>
						)}
						<div className="w-full h-px my-3 bg-slate-200 dark:bg-slate-700/30" />
					</>
				)}

				<div>
					<div className="mb-2">
						<span className="inline-flex items-center px-3 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded dark:bg-blue-700 dark:text-blue-100">
							Answer
						</span>
					</div>
					<MemoizedReactMarkdown
						className="min-w-full prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
						components={memoizedMarkdownComponents({
							handleClickableClick,
							shouldPreProcessChildren: true,
						})}
					>
						{cleanMessage.content}
					</MemoizedReactMarkdown>
					{actionRequired && (
						<ChatMessageActions className="md:!right-0" message={message} />
					)}
				</div>
			</div>
		</div>
	)
}
