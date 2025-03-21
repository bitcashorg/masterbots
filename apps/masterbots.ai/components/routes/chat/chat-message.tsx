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
import type { ChatMessageProps, WebSearchResult } from '@/types/types'
import React, { useState } from 'react'
import rehypeMathJax from 'rehype-mathjax'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'

/**
 * Preprocesses the children to combine adjacent nodes with a colon.
 *
 * @param children The children nodes.
 * @returns The preprocessed children.
 */

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

/**
 * Displays a chat message with clickable text elements.
 *
 * @param message The chat message object.
 * @param sendMessageFromResponse The function to send a message from the response.
 * @param chatbot The chatbot object.
 * @param actionRequired Whether the message requires an action.
 * @param webSearchResults The web search results.
 * @returns The chat message component.
 */
export function ChatMessage({
	message,
	sendMessageFromResponse,
	chatbot,
	actionRequired = true,
	webSearchResults = [],
	...props
}: ChatMessageProps) {
	// Clean the message content and update the message object.
	const content = cleanPrompt(message.content)
	const cleanMessage = { ...message, content }
	const [references, setReferences] = useState<WebSearchResult[]>([])

	// Handler for clickable text elements.
	const handleClickableClick = (clickableText: string) => {
		const context = extractFollowUpContext(message.content, clickableText)
		const cleanedText = cleanClickableText(context)
		const followUpPrompt = `Explain more in-depth and in detail about "${clickableText}"? ${cleanedText}`
		sendMessageFromResponse?.(followUpPrompt)
	}

	// References section component.
	const ReferencesSection = () => {
		if (references.length === 0) return null

		return (
			<div className="pt-4 mt-4 border-t border-gray-200">
				<h3 className="mb-2 text-lg font-semibold">References</h3>
				<div className="space-y-4">
					{references.map((ref) => (
						<div
							key={ref.profile.name.toLowerCase().replace(/\s/g, '-')}
							className="flex gap-4"
						>
							{ref.thumbnail?.src && (
								// eslint-disable-next-line @next/next/no-img-element
								<img
									src={ref.thumbnail.src}
									alt={ref.title}
									className="object-cover rounded size-20"
								/>
							)}
							<div>
								<h4 className="font-medium">{ref.title}</h4>
								<a
									href={ref.url}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-500 hover:underline"
								>
									{ref.profile.name}
								</a>
							</div>
						</div>
					))}
				</div>
			</div>
		)
	}

	return (
		<div className={cn('group relative flex items-start p-1')} {...props}>
			<div className="flex-1 pr-1 space-y-2 overflow-hidden">
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
							return <ol className="ml-2 space-y-2 list-decimal">{children}</ol>
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

				<ReferencesSection />
			</div>
		</div>
	)
}
