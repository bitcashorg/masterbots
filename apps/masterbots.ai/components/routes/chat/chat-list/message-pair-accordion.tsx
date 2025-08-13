import { AttachmentCards } from '@/components/routes/chat/chat-list/attachment-cards'
import { MessageRenderer } from '@/components/routes/chat/chat-message-renderer'
import { OptimisticMessageStatus } from '@/components/routes/chat/optimistic-message-status'
import { SharedAccordion } from '@/components/shared/shared-accordion'
import { ShortMessage } from '@/components/shared/short-message'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import type { FileAttachment } from '@/lib/hooks/use-chat-attachments'
import { useOptimisticChat } from '@/lib/hooks/use-optimistic-chat'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { useThreadVisibility } from '@/lib/hooks/use-thread-visibility'
import type { MessagePair } from '@/lib/threads'
import { parsePath } from '@/lib/url'
import { cn, getRouteType } from '@/lib/utils'
import type { SendMessageFromResponseMessageData } from '@/types/types'
import { AnimatePresence, motion } from 'framer-motion'
import { useParams, usePathname } from 'next/navigation'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { ChatOptions } from '../chat-options'

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
	sendMessageFn?: (
		messageData: SendMessageFromResponseMessageData,
		callback?: () => void,
	) => void
}) {
	const { activeThread } = useThread()
	const { navigateTo } = useSidebar()
	const isPrevious = type === 'previous'
	const defaultAccordionState = false
	// ? Case to show only the last message in the conversation and it is not previous
	// index === arrayLength - 1 && !isPrevious  @jimoh: we can now move to open the current message by the slug in the URL (Line:80)

	// ? Case for when we have the first message in the conversation or last and both are not previous
	// ((!index || index === arrayLength - 1) && !isPrevious) ||
	// ? Case for when we have the first message in the previous conversation
	// (!index && isPrevious)

	// default show if the url threadQuestionSlug is equal to the pair userMessage slug

	const [isAccordionFocused, setIsAccordionFocused] = useState<boolean>(
		defaultAccordionState,
	)
	const params = useParams()
	const pathname = usePathname()
	const isPublic = getRouteType(pathname) === 'public'
	const isProfile = getRouteType(pathname) === 'profile'
	const isBot = getRouteType(pathname) === 'bot'
	const { isSameUser } = useThreadVisibility()
	const sameUser = activeThread ? isSameUser(activeThread) : false

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		let setFocuse = false
		if (!params.threadQuestionSlug) {
			// If no threadQuestionSlug in URL, focus on the last message of the pair
			setFocuse = index === arrayLength - 1 && !isPrevious
		} else {
			// If threadQuestionSlug exists, focus on the message with that slug
			setFocuse =
				pair.userMessage.slug === (params.threadQuestionSlug as string)
		}

		if (setFocuse) {
			setIsAccordionFocused(true)
		}

		const $questionElement = document.getElementById(
			params.threadQuestionSlug as string,
		)

		if (!$questionElement) return

		const timeout = setTimeout(() => {
			const scrollBehavior =
				$questionElement.offsetHeight > window.innerHeight - 144
					? 'start'
					: 'center'
			$questionElement.scrollIntoView({
				behavior: 'smooth',
				block: scrollBehavior,
				inline: 'center',
			})
			$questionElement.focus()

			clearTimeout(timeout)
		}, 500)
	}, [params])

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const toggleThreadQuestionUrl = useCallback(
		(isOpen: boolean, isFirstQuestion: boolean) => {
			if (isFirstQuestion) return
			setIsAccordionFocused(isOpen)

			const { category, domain, chatbot, threadSlug, threadQuestionSlug } =
				parsePath(window.location.pathname)

			const paramUserSlug = params.userSlug as string | undefined

			const navigationParts = {
				category,
				domain,
				chatbot,
				threadSlug,
				threadQuestionSlug: threadQuestionSlug
					? threadQuestionSlug
					: pair.userMessage.slug,
				usernameSlug: paramUserSlug || '',
			}

			if (!threadQuestionSlug && isOpen) {
				navigateTo({
					urlType: isProfile
						? 'profilesThreadQuestionUrl'
						: 'threadQuestionUrl',
					shallow: true,
					navigationParams: isProfile
						? {
								type: 'user',
								...navigationParts,
							}
						: {
								type: isPublic ? 'public' : isBot ? 'bot' : 'personal',
								...navigationParts,
							},
				})
			}
			if (threadQuestionSlug && !isOpen) {
				navigateTo({
					urlType: isProfile ? 'profilesThreadUrl' : 'threadUrl',
					shallow: true,
					navigationParams: isProfile
						? {
								type: 'user',
								...navigationParts,
							}
						: {
								type: isPublic ? 'public' : isBot ? 'bot' : 'personal',
								...navigationParts,
							},
				})
			}
		},
		[pair.userMessage.slug],
	)

	const shouldShowUserMessage = activeThread?.thread?.messages
		? !(!isThread && !index && isPrevious)
		: !(!isThread && !index)

	return (
		<SharedAccordion
			defaultState={defaultAccordionState}
			isOpen={isAccordionFocused}
			id={pair.userMessage.slug}
			className={cn(
				{ relative: isThread },
				// Adds subtle background tint and left border for previous messages
				isPrevious && 'bg-accent/25 rounded-[8px] border-l-accent/20 ',
			)}
			triggerClass={cn(
				'py-[0.4375rem] z-10 ease-in-out',
				{
					'sticky top-0 md:-top-10 z-[1] px-3 [&[data-state=open]]:rounded-t-[8px]':
						isThread,
					'px-[calc(32px-0.25rem)]': !isThread,
					'dark:bg-[#1d283a9a] bg-iron !border-l-[transparent] [&[data-state=open]]:!bg-gray-400/50 dark:[&[data-state=open]]:!bg-mirage':
						!isPrevious && !isThread && index,
					'bg-[#EAB3F7] dark:bg-[#3B5A35] hover:bg-[#E090F3] hover:dark:bg-[#4C7A41] border-l-[#EAB3F7] dark:border-l-[#3B5A35] [&[data-state=open]]:!bg-[#E090F3] dark:[&[data-state=open]]:!bg-[#4C7A41]':
						isPrevious,
					'bg-transparent dark:bg-transparent w-auto h-auto px-4 py-0 border-none ml-auto':
						!shouldShowUserMessage,
					'w-full justify-between':
						!shouldShowUserMessage && isPrevious && !isAccordionFocused,
				},
				props.chatTitleClass,
			)}
			contentClass={cn(
				{
					// Border styling differences
					'!border-l-accent/20': isPrevious,
					'!border-l-transparent': !isPrevious && !isThread && index,
					// Adding padding for the rest of messages
					'pt-6': !(
						(isAccordionFocused && !isThread && !index && isPrevious) ||
						(isAccordionFocused &&
							!isThread &&
							!index &&
							!activeThread?.thread?.messages)
					),
				},
				props.chatContentClass,
			)}
			onToggle={(isOpen) => toggleThreadQuestionUrl(isOpen, !index)}
			variant="chat"
		>
			<div className={cn('flex flex-col items-start gap-2')}>
				<AnimatePresence mode="wait" initial={false}>
					{!isAccordionFocused &&
					isPrevious &&
					!shouldShowUserMessage &&
					defaultAccordionState ? (
						<motion.span
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10, zIndex: -1 }}
							transition={{ duration: 0.2, ease: 'easeInOut' }}
							key={`first-question-tooltip-${pair.userMessage.slug}`}
						>
							<Tooltip>
								<TooltipTrigger className="absolute z-20 flex items-center leading-none transition-all opacity-100 hover:opacity-70 focus-within:opacity-100 mt-2.5 px-1.5 py-0.5 w-auto text-xs font-medium rounded-md bg-accent text-accent-foreground">
									Continued
								</TooltipTrigger>
								<TooltipContent className="z-20" side="top" align="start">
									Continued thread from{' '}
									<b>{activeThread?.thread?.user?.username}</b>.
								</TooltipContent>
							</Tooltip>
						</motion.span>
					) : (
						''
					)}
				</AnimatePresence>
				<div className="w-full ml-auto flex gap-1.5 items-start justify-between group">
					{shouldShowUserMessage && (
						<div className="flex-1 flex flex-col gap-1">
							<MessageRenderer
								actionRequired={false}
								message={pair.userMessage}
							/>
							<OptimisticMessageStatus
								messageId={pair.userMessage.messageId}
								className="ml-2"
							/>
						</div>
					)}

					{activeThread && shouldShowUserMessage && (
						<ChatOptions
							threadId={pair.userMessage.threadId}
							thread={activeThread}
							isBrowse={false}
							pair={pair}
						/>
					)}
				</div>
			</div>
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
					'mx-4 md:mx-[46px] px-1 py-4  h-full ',
					{
						'!border-[transparent]': !isThread && index === 0,
					},
					props.chatContentClass,
				)}
			>
				{/* Thread Title with indicator for previous (continuous) messages */}
				{isPrevious && index === 0 ? (
					<Tooltip>
						<TooltipTrigger className="transition-all opacity-100 hover:opacity-70 focus-within:opacity-100 mt-2.5 px-1.5 py-0.5 w-auto text-xs font-medium rounded-md bg-accent text-accent-foreground">
							Continued
						</TooltipTrigger>
						<TooltipContent side="bottom" align="start">
							Continued thread from{' '}
							<b>{activeThread?.thread?.user?.username}</b>.
						</TooltipContent>
					</Tooltip>
				) : (
					''
				)}
				{pair.chatGptMessage.length > 0
					? pair.chatGptMessage.map((message) => (
							<Fragment key={message.id}>
								{!isThread && (
									<AttachmentCards
										userAttachments={userAttachments}
										isAccordionFocused={isAccordionFocused}
									/>
								)}
								<MessageRenderer
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
