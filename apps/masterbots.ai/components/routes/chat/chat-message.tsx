import { ChatMessageActions } from '@/components/routes/chat/chat-message-actions'
import { GeneratedImage } from '@/components/shared/generated-image'
import { MemoizedReactMarkdown } from '@/components/shared/markdown'
import {
	cleanClickableText,
	extractFollowUpContext,
} from '@/lib/chat-clickable-text'
import { cleanPrompt } from '@/lib/helpers/ai-helpers'
import {
	extractImageContent,
	hasImageGeneration,
} from '@/lib/helpers/ai-helpers'
import { memoizedMarkdownComponents } from '@/lib/memoized-markdown-components'
import { cn, getRouteType } from '@/lib/utils'
import type {
	ChatMessageProps,
	MessageWithExamples,
	WebSearchResult,
} from '@/types/types'
import { usePathname } from 'next/navigation'
import { useMemo, useState } from 'react'
import rehypeMathJax from 'rehype-mathjax'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'

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
	const pathname = usePathname()
	const routeType = getRouteType(pathname)
	const isBrowseView = routeType === 'public'
	const isProfileView = routeType === 'profile'
	// Clean the message content and update the message object.
	const content = cleanPrompt(message.content)
	const cleanMessage = { ...message, content }
	const [references, setReferences] = useState<WebSearchResult[]>([])
	const [clicked, setClicked] = useState(false)

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

	//? References section component.
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

	//? Images section component
	const ImagesSection = useMemo(() => {
		if (!hasImageGeneration(message as MessageWithExamples)) return null

		const images = extractImageContent(message as MessageWithExamples)
		if (!images || images.length === 0) {
			console.log('No images extracted from message parts:', message.parts)
			return null
		}

		return (
			<div className="mt-4 space-y-4">
				{images.map((image, i) => {
					if (!image.base64) {
						console.warn(`Image ${i} has no base64 data`)
						return null
					}
					//? Create a stable key based on the image content
					const imageKey = `${message.messageId}-${image.base64.slice(0, 32)}`
					return (
						<GeneratedImage
							key={imageKey}
							base64={image.base64}
							mimeType={image.mimeType || 'image/png'}
							alt={`AI generated image ${i + 1}`}
						/>
					)
				})}
			</div>
		)
	}, [message])

	return (
		<div className={cn('group relative flex items-start p-1')} {...props}>
			<div className="flex-1 pr-1 space-y-2 overflow-hidden">
				<MemoizedReactMarkdown
					className="min-w-full prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
					remarkPlugins={[remarkGfm, rehypeMathJax, remarkRehype]}
					components={memoizedMarkdownComponents(
						!(isBrowseView || isProfileView)
							? {
									handleClickableClick,
									shouldPreProcessChildren: true,
								}
							: undefined,
					)}
				>
					{cleanMessage.content}
				</MemoizedReactMarkdown>

				{ImagesSection}

				{actionRequired && (
					<ChatMessageActions className="md:!right-0" message={message} />
				)}

				<ReferencesSection />
			</div>
		</div>
	)
}
