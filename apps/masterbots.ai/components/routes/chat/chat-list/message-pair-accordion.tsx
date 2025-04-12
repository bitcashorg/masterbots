import { AttachmentCards } from '@/components/routes/chat/chat-list/attachment-cards'
import { MessageRenderer } from '@/components/routes/chat/chat-message-renderer'
import { SharedAccordion } from '@/components/shared/shared-accordion'
import { ShortMessage } from '@/components/shared/short-message'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import type { FileAttachment } from '@/lib/hooks/use-chat-attachments'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import type { MessagePair } from '@/lib/threads'
import { cn, getRouteType } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
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
	const [isAccordionFocused, setIsAccordionFocused] = useState<boolean>(
		!index && !isThread,
	)
	const params = useParams()
	const pathname = usePathname()
	const isPublic = getRouteType(pathname) === 'public'
	const isProfile = getRouteType(pathname) === 'profile'

	useEffect(() => {
		if (!params.threadQuestionSlug) return

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
			if (!isFirstQuestion) {
				setIsAccordionFocused(isOpen)
				return
			}
			setIsAccordionFocused(isOpen)
			// console.log('window.location.pathname.split', window.location.pathname.split('/'))
			// ? Chat Thread URL
			const [
				,
				base,
				category,
				domain,
				chatbot,
				threadSlug,
				threadQuestionSlug,
			] = window.location.pathname.split('/')
			const navigationParts = {
				category: isPublic ? base : category,
				domain: isPublic ? category : domain,
				chatbot: isPublic ? domain : chatbot,
				threadSlug: isPublic ? chatbot : threadSlug,
				threadQuestionSlug: pair.userMessage.slug,
			}

			if (!threadQuestionSlug && isOpen) {
				// console.log('navigateTo threadQuestionUrl', navigationParts)
				navigateTo({
					urlType: isProfile
						? 'profilesThreadQuestionUrl'
						: 'threadQuestionUrl',
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
		},
		[],
	)

	const shouldShowUserMessage = activeThread?.thread
		? !(!isThread && !index && isPrevious)
		: !(!isThread && !index)
	const defaultAccordionState =
		// ? Case for when there is more than one message and we want to hide the first message
		// (!index && arrayLength <= 1)
		// ? Case for when we have the first message in the conversation or last and both are not previous
		((!index || index === arrayLength - 1) && !isPrevious) ||
		// ? Case for when we have the first message in the previous conversation
		(!index && isPrevious)

	return (
		<SharedAccordion
			defaultState={defaultAccordionState}
			isOpen={isAccordionFocused || defaultAccordionState}
			id={pair.userMessage.slug}
			className={cn(
				{ relative: isThread },
				// Adds subtle background tint and left border for previous messages
				isPrevious && 'bg-accent/25 rounded-[8px] border-l-accent/20',
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
						(isAccordionFocused && !isThread && !index && !activeThread?.thread)
					),
				},
				props.chatContentClass,
			)}
			onToggle={(isOpen) => toggleThreadQuestionUrl(isOpen, !index)}
			variant="chat"
		>
			<div className={cn('flex flex-col items-start gap-2')}>
				<AnimatePresence initial={false}>
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
								<TooltipContent className="z-20" side="bottom" align="start">
									Continued thread from{' '}
									<b>{activeThread?.thread?.user?.username}</b>.
								</TooltipContent>
							</Tooltip>
						</motion.span>
					) : (
						''
					)}
				</AnimatePresence>
				{shouldShowUserMessage && (
					<>
						<MessageRenderer
							actionRequired={false}
							message={pair.userMessage}
						/>
						{!isThread && index !== 0 && (
							<AttachmentCards
								userAttachments={userAttachments}
								isAccordionFocused={isAccordionFocused}
							/>
						)}
					</>
				)}
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
					'mx-4 md:mx-[46px] px-1 py-4  h-full',
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
								{index === 0 && !isThread && (
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
