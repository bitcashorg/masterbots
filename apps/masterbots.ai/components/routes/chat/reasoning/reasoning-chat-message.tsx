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
import React, { useState } from 'react'
import rehypeMathJax from 'rehype-mathjax'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'

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
	const [isReasoningCollapsed, setIsReasoningCollapsed] = useState(!true)

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

	const toggleReasoning = () => {
		setIsReasoningCollapsed(!isReasoningCollapsed)
	}

	return (
		<div className={cn('group relative flex items-start p-1')} {...props}>
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
								AI Thinking Process
							</span>
							{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
							<button
								onClick={toggleReasoning}
								className="flex items-center px-3 py-1 space-x-1 text-xs font-medium transition-colors border rounded bg-slate-200 hover:bg-slate-300 text-slate-700 border-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200 dark:border-slate-600 focus:outline-none"
							>
								{isReasoningCollapsed ? (
									<>
										{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
										<svg
											className="w-3 h-3 mr-1"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											aria-label="Expand Reasoning"
										>
											<path
												d="M19 9L12 16L5 9"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
										<span>Show Full Reasoning</span>
									</>
								) : (
									<>
										{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
										<svg
											className="mr-1 size-3"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											aria-label="Collapse Reasoning"
										>
											<path
												d="M5 15L12 8L19 15"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
										<span>Collapse Reasoning</span>
									</>
								)}
							</button>
						</div>
						{isReasoningCollapsed ? (
							<div className="px-4 py-2 mb-4 ml-3 text-sm italic border-l-4 text-slate-500 dark:text-slate-400 border-purple-500/40 dark:border-purple-800/40 bg-slate-100/50 dark:bg-slate-800/20">
								{reasoningContent
									?.split('\n')
									.filter((line) => line.trim())
									.slice(0, 2)
									.map((line, i) => (
										<div key={i} className="truncate">
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
							Final Answer
						</span>
					</div>
					<MemoizedReactMarkdown
						className="min-w-full prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
						remarkPlugins={[remarkGfm, rehypeMathJax, remarkRehype]}
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
								const childrenText = String(children)
								if (childrenText?.startsWith('▍')) {
									return (
										<span className="mt-1 cursor-default animate-pulse">▍</span>
									)
								}

								const match = /language-(\w+)/.exec(className || '')
								if (inline) {
									return (
										<code className={className} {...props}>
											{children}
										</code>
									)
								}
								const codeBlockKey = `code-${match?.[1] || ''}-${String(children).substring(0, 20).replace(/\n$/, '').replace(/\s/g, '-')}`
								return (
									<CodeBlock
										key={codeBlockKey}
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
