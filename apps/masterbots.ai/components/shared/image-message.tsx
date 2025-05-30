'use client'

import { ChatMessageActions } from '@/components/routes/chat/chat-message-actions'
import { MemoizedReactMarkdown } from '@/components/shared/markdown'
import { memoizedMarkdownComponents } from '@/lib/memoized-markdown-components'
import { cn } from '@/lib/utils'
import type { ImageMessageProps } from '@/types/types'
import rehypeMathJax from 'rehype-mathjax'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import { ImageDisplay } from './image-display'

/**
 * Renders a chat message that contains an image
 */
export function ImageMessageComponent({
	message,
	actionRequired = true,
	className,
	...props
}: ImageMessageProps) {
	const { image } = message

	return (
		<div
			className={cn('group relative flex items-start p-1', className)}
			{...props}
		>
			<div className="flex-1 pr-1 space-y-4 overflow-hidden">
				{/* Prompt text */}
				<MemoizedReactMarkdown
					className="min-w-full prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
					remarkPlugins={[remarkGfm, rehypeMathJax, remarkRehype]}
					components={memoizedMarkdownComponents()}
				>
					{`Image generated from prompt: "${message.content}"`}
				</MemoizedReactMarkdown>

				{/* Generated image */}
				<div className="max-w-xs mx-auto sm:max-w-sm md:max-w-md">
					<ImageDisplay
						imageData={image.base64}
						modelId={image.modelId}
						alt={`AI generated image for: ${message.content}`}
					/>
				</div>

				{/* Message actions */}
				{actionRequired && (
					<ChatMessageActions className="md:!right-0" message={message} />
				)}
			</div>
		</div>
	)
}
