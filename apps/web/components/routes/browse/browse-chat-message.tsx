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

import { cleanPrompt } from '@/lib/helpers/ai-helpers'
import { memoizedMarkdownComponents } from '@/lib/memoized-markdown-components'
import { cn } from '@/lib/utils'
import { MemoizedReactMarkdown } from '@masterbots/mb-ui'
import type { Message } from 'ai'
import type { Chatbot } from 'mb-genql'

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
					components={memoizedMarkdownComponents()}
				>
					{cleanMessage.content}
				</MemoizedReactMarkdown>
				{/* <ChatMessageActions className="md:!right-0" message={cleanMessage} /> */}
			</div>
		</div>
	)
}
