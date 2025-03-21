// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatcleanMessage.tsx
/**
 * ChatMessageProps Interface
 *
 * This interface defines the props for the BrowseChatMessage component.
 *
 * Props:
 * - message: The message object containing the content to be displayed.
 * - chatbot: Optional chatbot object associated with the message.
 *
 * BrowseChatMessage Component
 *
 * This component renders a chat message, including markdown content and code blocks.
 * It utilizes MemoizedReactMarkdown for rendering markdown and CodeBlock for code snippets.
 *
 * Key Features:
 * - Content Cleaning: Cleans the message content using the cleanPrompt function.
 * - Markdown Rendering: Renders the message content as markdown with support for GFM and math.
 * - Code Highlighting: Supports inline and block code rendering with syntax highlighting.
 *
 * @param {ChatMessageProps} props - The props for the component.
 * @returns {JSX.Element} The rendered chat message component.
 */

import { MemoizedReactMarkdown } from '@/components/shared/markdown'
import { CodeBlock } from '@/components/ui/codeblock'
import { cleanPrompt } from '@/lib/helpers/ai-helpers'
import { cn } from '@/lib/utils'
import type { Message } from 'ai'
import type { Chatbot } from 'mb-genql'
import rehypeMathJax from 'rehype-mathjax'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'

export interface ChatMessageProps {
	message: Message
	chatbot?: Chatbot
}

export function BrowseChatMessage({
	message,
	chatbot,
	...props
}: ChatMessageProps) {
	const cleanMessage = { ...message, content: cleanPrompt(message.content) }

	return (
		<div className={cn('group relative my-4 flex items-start')} {...props}>
			<div className="flex-1 space-y-2 overflow-hidden md:ml-4">
				<MemoizedReactMarkdown
					className="min-w-full prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 !max-w-5xl"
					remarkPlugins={[remarkGfm, rehypeMathJax, remarkRehype]}
					components={{
						// @ts-ignore
						p({ children }) {
							return (
								<p className="mb-2 whitespace-pre-line last:mb-0">{children}</p>
							)
						},
						// @ts-ignore
						ol({ children }) {
							return (
								<ol className="text-left list-decimal list-inside">
									{children}
								</ol>
							)
						},
						// @ts-ignore
						ul({ children }) {
							return (
								<ul className="text-left list-disc list-inside">{children}</ul>
							)
						},
						// @ts-ignore
						code({
							node,
							inline = false,
							className,
							children,
							...props
						}: React.HTMLAttributes<HTMLElement> & {
							node: unknown
							inline?: boolean
						}) {
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
				{/* <ChatMessageActions className="md:!right-0" message={cleanMessage} /> */}
			</div>
		</div>
	)
}
