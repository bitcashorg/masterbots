import { ChatMessageActions } from '@/components/routes/chat/chat-message-actions'
import { MemoizedReactMarkdown } from '@/components/shared/markdown'
import { CodeBlock } from '@/components/ui/codeblock'
import {
	cleanClickableText,
	extractFollowUpContext,
	getTextFromChildren,
} from '@/lib/chat-clickable-text'
import { cleanPrompt } from '@/lib/helpers/ai-helpers'
import { cn } from '@/lib/utils'
import type { ChatMessageProps } from '@/types/types'
import type { Message } from 'ai'
import type { Message as MBMessage } from 'mb-genql'
import React from 'react'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

// extract reasoning content
export function extractReasoningContent(
	message: Message & Partial<MBMessage>,
): string | null | undefined {
	if (message.parts?.length) {
		const reasoningPart = message.parts.find(
			(part) => part.type === 'reasoning',
		)
		if (reasoningPart) return reasoningPart.reasoning
	}

	return message?.reasoning || message.thinking
}

const preprocessChildren = (children: React.ReactNode): React.ReactNode => {
	if (!Array.isArray(children)) return children

	const result: React.ReactNode[] = []
	let i = 0

	while (i < children.length) {
		const current = children[i]
		const next = i + 1 < children.length ? children[i + 1] : null

		// If we detect a pattern where a node is immediately followed by ":"
		if (next && typeof next === 'string' && next.trim() === ':') {
			if (typeof current === 'string') {
				result.push(`${current}:`)
			} else if (React.isValidElement(current)) {
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				const element = current as React.ReactElement<any>
				const currentChildren = element.props.children
				result.push(
					React.cloneElement(element, {
						children:
							typeof currentChildren === 'string'
								? `${currentChildren}:`
								: currentChildren,
					}),
				)
			} else {
				result.push(current)
				result.push(next)
			}
			i += 2
		} else {
			result.push(current)
			i += 1
		}
	}

	return result
}

export function ReasoningChatMessage({
	message,
	sendMessageFromResponse,
	actionRequired = true,
	...props
}: ChatMessageProps) {
	// Extract reasoning from message
	const reasoningContent = extractReasoningContent(message)
	// Clean the message content and update the message object.
	const content = cleanPrompt(message.content)
	const cleanMessage = { ...message, content }

	// Handler for clickable text elements.
	const handleClickableClick = (clickableText: string) => {
		const context = extractFollowUpContext(message.content, clickableText)
		const cleanedText = cleanClickableText(context)
		const followUpPrompt = `Explain more in-depth and in detail about "${clickableText}"? ${cleanedText}`
		sendMessageFromResponse?.(followUpPrompt)
	}

	return (
		<div className={cn('group relative flex items-start p-1')} {...props}>
			<div className="flex-1 pr-1 space-y-6 overflow-hidden">
				{/* First show the reasoning part (if available) */}
				{reasoningContent && (
					<div className="mb-4">
						<div className="mb-2">
							<span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
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
								AI Reasoning Process
							</span>
						</div>
						{/* Always show reasoning content - no collapsible UI */}
						<div className="p-4 border rounded-lg bg-slate-900/90 border-purple-500/20">
							<pre className="text-xs md:text-sm whitespace-pre-wrap font-mono p-4 rounded-md overflow-auto max-h-[400px] bg-gradient-to-b from-slate-800 to-slate-900 text-slate-300 border border-slate-700/50">
								{reasoningContent}
							</pre>
						</div>
					</div>
				)}

				<div className="mt-4">
					<div className="mb-2">
						<span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
							Final Answer
						</span>
					</div>
					<MemoizedReactMarkdown
						className="min-w-full prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
						remarkPlugins={[remarkGfm, remarkMath]}
						components={{
							// Process paragraph nodes.
							// @ts-ignore
							p({ children }) {
								return (
									<p className="text-left whitespace-pre-line">
										{preprocessChildren(children)}
									</p>
								)
							},
							// Process heading nodes with clickable functionality.
							// @ts-ignore
							h1({ children }) {
								const text = getTextFromChildren(children)
								return (
									// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
									<h1
										className="mb-2 text-2xl font-bold cursor-pointer clickable-heading"
										onClick={() => handleClickableClick(text)}
									>
										{preprocessChildren(children)}
									</h1>
								)
							},
							// @ts-ignore
							h2({ children }) {
								const text = getTextFromChildren(children)
								return (
									// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
									<h2
										className="mb-2 text-xl font-bold cursor-pointer clickable-heading"
										onClick={() => handleClickableClick(text)}
									>
										{preprocessChildren(children)}
									</h2>
								)
							},
							// @ts-ignore
							h3({ children }) {
								const text = getTextFromChildren(children)
								return (
									// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
									<h3
										className="mb-2 text-lg font-bold cursor-pointer clickable-heading"
										onClick={() => handleClickableClick(text)}
									>
										{preprocessChildren(children)}
									</h3>
								)
							},
							// Process strong/emphasis nodes.
							// @ts-ignore
							strong({ children }) {
								return <strong>{preprocessChildren(children)}</strong>
							},
							// List handling.
							// @ts-ignore
							ul({ children }) {
								return <ul className="ml-2 space-y-2 list-disc">{children}</ul>
							},
							// @ts-ignore
							ol({ children }) {
								return (
									<ol className="ml-2 space-y-2 list-decimal">{children}</ol>
								)
							},
							// @ts-ignore
							li({ children }) {
								const processedChildren = preprocessChildren(children)
								const text = getTextFromChildren(processedChildren)
								const hasNestedList = React.Children.toArray(
									processedChildren,
								).some(
									(child) =>
										React.isValidElement(child) &&
										(child.type === 'ul' || child.type === 'ol'),
								)

								return (
									// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
									<li
										className={cn(
											'ml-4',
											hasNestedList && 'mt-2',
											'clickable-list-heading',
										)}
										onClick={() => handleClickableClick(text)}
									>
										{processedChildren}
									</li>
								)
							},
							// Process link nodes.
							// @ts-ignore
							a({ href, children, ...props }) {
								return (
									<a
										className="text-blue-500 underline"
										target="_blank"
										rel="noopener noreferrer"
										href={href}
										{...props}
									>
										{children}
									</a>
								)
							},
							// Process code blocks.
							// @ts-ignore
							code({ inline, className, children, ...props }) {
								// @ts-ignore
								if (children.length) {
									// @ts-ignore
									if (children[0] === '▍') {
										return (
											<span className="mt-1 cursor-default animate-pulse">
												▍
											</span>
										)
									}
								}

								const match = /language-(\w+)/.exec(className || '')
								if (inline) {
									return (
										<code className={className} {...props}>
											{children}
										</code>
									)
								}
								return (
									<CodeBlock
										key={Math.random()}
										language={match?.[1] || ''}
										value={String(children).replace(/\n$/, '')}
										{...props}
									/>
								)
							},
						}}
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
