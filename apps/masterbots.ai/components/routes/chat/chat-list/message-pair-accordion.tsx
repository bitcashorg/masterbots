import { AttachmentCards } from '@/components/routes/chat/chat-list/attachment-cards'
import { ChatMessage } from '@/components/routes/chat/chat-message'
import { SharedAccordion } from '@/components/shared/shared-accordion'
import { ShortMessage } from '@/components/shared/short-message'
import type { FileAttachment } from '@/lib/hooks/use-chat-attachments'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import type { MessagePair } from '@/lib/threads'
import { cn, getRouteType } from '@/lib/utils'
import { useParams, usePathname } from 'next/navigation'
import { Fragment, useCallback, useEffect, useState } from 'react'

export function MessagePairAccordion({
	pair,
	isThread,
	index,
	arrayLength,
	isNewResponse,
	type,
	userAttachments,
	...props
}: {
	pair: MessagePair
	isThread: boolean
	index: number
	arrayLength: number
	isNewResponse: boolean
	type: 'previous' | 'current'
	chatTitleClass?: string
	chatContentClass?: string
	userAttachments: FileAttachment[]
	sendMessageFn?: (message: string) => void
}) {
	const { activeThread } = useThread()
	const { navigateTo } = useSidebar()
	const isPrevious = type === 'previous'
	const [isAccordionFocused, setIsAccordionFocused] = useState<boolean>(false)
	const params = useParams()
	const pathname = usePathname()
	const isPublic = getRouteType(pathname) === 'public'
	const isProfile = getRouteType(pathname) === 'profile'

	useEffect(() => {
		console.log('params', params)
		if (!params.threadQuestionSlug) return

		const $questionElement = document.getElementById(
			params.threadQuestionSlug as string,
		)

		if (!$questionElement) return

		$questionElement.scrollIntoView()
		$questionElement.focus()
	}, [params])

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const toggleThreadQuestionUrl = useCallback((isOpen: boolean) => {
		setIsAccordionFocused(isOpen)
		// console.log('window.location.pathname.split', window.location.pathname.split('/'))
		const [, category, domain, chatbot, threadSlug, threadQuestionSlug] =
			window.location.pathname.split('/')
		const navigationParts = {
			category,
			domain,
			chatbot,
			threadSlug,
			threadQuestionSlug: pair.userMessage.slug,
		}

		if (!threadQuestionSlug && isOpen) {
			// console.log('navigateTo threadQuestionUrl', navigationParts)
			navigateTo({
				urlType: isProfile ? 'profilesThreadQuestionUrl' : 'threadQuestionUrl',
				shallow: true,
				navigationParams: isProfile
					? {
							type: 'chatbot',
							...navigationParts,
						}
					: {
							type: isPublic ? 'public' : 'personal',
							...navigationParts,
						},
			})
		}
		if (threadQuestionSlug && !isOpen) {
			// console.log('navigateTo threadUrl', navigationParts)
			navigateTo({
				urlType: isProfile ? 'profilesThreadUrl' : 'threadUrl',
				shallow: true,
				navigationParams: isProfile
					? {
							type: 'chatbot',
							...navigationParts,
						}
					: {
							type: isPublic ? 'public' : 'personal',
							...navigationParts,
						},
			})
		}
	}, [])

	return (
		<SharedAccordion
			defaultState={
				// ? Case for when there is more than one message and we want to hide the first message
				// (!index && arrayLength <= 1)
				// ? Case for when we have the first message in the conversation or last and both are not previous
				((!index || index === arrayLength - 1) && !isPrevious) ||
				// ? Case for when we have the first message in the previous conversation
				(!index && isPrevious)
			}
			id={pair.userMessage.slug}
			className={cn(
				{ relative: isThread },
				// Adds subtle background tint and left border for previous messages
				isPrevious && 'bg-accent/25 rounded-[8px] border-l-accent/20',
			)}
			triggerClass={cn(
				'py-[0.4375rem]',
				{
					'sticky top-0 md:-top-10 z-[1] px-3 [&[data-state=open]]:rounded-t-[8px]':
						isThread,
					'px-[calc(32px-0.25rem)]': !isThread,
					hidden: !isThread && index === 0, // Style differences for previous vs current messages
					'dark:bg-[#1d283a9a] bg-iron !border-l-[transparent] [&[data-state=open]]:!bg-gray-400/50 dark:[&[data-state=open]]:!bg-mirage':
						!isPrevious,
					'bg-accent/10 dark:bg-accent/10 hover:bg-accent/30 hover:dark:bg-accent/30 border-l-accent/10 dark:border-l-accent/10 [&[data-state=open]]:!bg-accent/30 dark:[&[data-state=open]]:!bg-accent/30':
						isPrevious,
				},
				props.chatTitleClass,
			)}
			contentClass={cn(
				{
					// Border styling differences
					'!border-l-accent/20': isPrevious,
					'!border-l-transparent': !isPrevious,
				},
				props.chatContentClass,
			)}
			onToggle={toggleThreadQuestionUrl}
			variant="chat"
		>
			{/* Thread Title with indicator for previous messages */}
			{!isThread && index === 0 ? (
				''
			) : (
				<div className={cn('flex flex-col items-start gap-2')}>
					<ChatMessage actionRequired={false} message={pair.userMessage} />
					<AttachmentCards
						userAttachments={userAttachments}
						isAccordionFocused={isAccordionFocused}
					/>
				</div>
			)}
			{/* Thread Description */}
			{isThread ? (
				<div className="opacity-50 pb-3 overflow-hidden text-sm mt-[0.375rem]">
					{pair.chatGptMessage[0]?.content ? (
						<div className="flex-1 px-1 space-y-2 overflow-hidden text-left">
							<ShortMessage content={pair.chatGptMessage[0]?.content} />
						</div>
					) : (
						''
					)}
				</div>
			) : (
				<></>
			)}

			{/* Thread Content */}
			<div
				className={cn(
					'mx-4 md:mx-[46px] px-1 py-4  h-full',
					{
						'!border-[transparent]': !isThread && index === 0,
					},
					props.chatContentClass,
				)}
			>
				{isPrevious && index === 0 ? (
					<>
						<span className="absolute top-1 -left-5 px-1.5 py-0.5 text-[10px] font-medium rounded-md bg-accent text-accent-foreground">
							Previous Thread
						</span>
						<div className="pb-3 mt-4 overflow-hidden opacity-50">
							Continued from{' '}
							<b>&ldquo;{pair.userMessage.content.trim()}&rdquo;</b> thread
							{activeThread?.thread?.user?.username
								? `, by ${activeThread?.thread?.user?.username}.`
								: '.'}
						</div>
					</>
				) : (
					''
				)}
				{pair.chatGptMessage.length > 0
					? pair.chatGptMessage.map((message) => (
							<Fragment key={message.id}>
								{index === 0 && !isThread && (
									<AttachmentCards
										userAttachments={userAttachments}
										isAccordionFocused={isAccordionFocused}
									/>
								)}
								<ChatMessage
									id={message.slug}
									actionRequired={false}
									message={message}
									sendMessageFromResponse={props.sendMessageFn}
								/>
							</Fragment>
						))
					: ''}
			</div>
		</SharedAccordion>
	)
}
