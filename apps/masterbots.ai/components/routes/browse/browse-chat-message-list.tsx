/**
 * BrowseChatMessageList Component
 *
 * This component displays a list of chat messages exchanged between the user and the chatbot.
 * It organizes messages into pairs, allowing for a structured presentation of user and chatbot interactions.
 * Uses SharedAccordion for consistent accordion behavior across the application.
 */
'use client'

import { BrowseChatMessage } from '@/components/routes/browse/browse-chat-message'
import {
	type MessagePair,
	convertMessage,
} from '@/components/routes/browse/browse-chat-messages'
import { ExternalLink } from '@/components/shared/external-link'
import { SharedAccordion } from '@/components/shared/shared-accordion'
import { buttonVariants } from '@/components/ui/button'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { getCanonicalDomain, urlBuilders } from '@/lib/url'
import { cn, createMessagePairs, getRouteType } from '@/lib/utils'
import type { Chatbot, Message, User } from 'mb-genql'
import { useParams, usePathname } from 'next/navigation'
import React, { useCallback, useEffect } from 'react'

export function BrowseChatMessageList({
	messages,
	chatbot,
	isThread = false,
	threadId,
}: {
	messages: Message[]
	user?: User
	chatbot?: Chatbot
	isThread?: boolean
	threadId?: string
}) {
	const [pairs, setPairs] = React.useState<MessagePair[]>([])
	const { name: categoryName } = chatbot?.categories[0]?.category || {
		name: '',
	}
	const chatbotName = chatbot?.name

	const setMessagePairs = (messages: Message[]) => {
		if (messages.length) {
			const prePairs: MessagePair[] = createMessagePairs(
				messages,
			) as MessagePair[]
			setPairs(prePairs)
		} else setPairs([])
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setMessagePairs(messages)
	}, [messages])

	const canonicalDomain = getCanonicalDomain(chatbotName || 'prompt')

	return (
		<>
			{pairs.map((pair: MessagePair, key: number) => (
				<BrowseMessagePairs
					key={`${pair.userMessage.createdAt}-${pair.chatGptMessage[0]?.messageId ?? 'pending'}`}
					pair={pair}
					pairs={pairs}
					isThread={isThread}
					index={key}
					isNewResponse={false}
					chatbot={chatbot}
					type="current"
				/>
			))}

			{/* Continue Thread Button */}
			<div className="pt-6 text-center border-t border-t-iron dark:border-t-mirage mt-44 lg:mt-20">
				<ExternalLink
					className={cn(
						buttonVariants({ size: 'xl', radius: 'full' }),
						'text-xl hover:no-underline',
					)}
					href={`${urlBuilders.chatbotThreadListUrl({
						type: 'personal',
						category: categoryName,
						domain: canonicalDomain,
						chatbot: chatbotName as string,
					})}?continuousThreadId=${threadId}`}
				>
					Continue Thread
				</ExternalLink>
			</div>
		</>
	)
}

export function BrowseMessagePairs({
	pair,
	pairs,
	isThread,
	index,
	chatbot,
	isNewResponse,
	type,
}: {
	pair: MessagePair
	isThread: boolean
	index: number
	isNewResponse: boolean
	type: 'previous' | 'current'
	pairs: MessagePair[]
	chatbot?: Chatbot
}) {
	const { navigateTo } = useSidebar()
	const { activeThread } = useThread()
	const hasPrevious = activeThread?.thread?.messages
	const pathname = usePathname()
	const params = useParams()
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
	const toggleThreadQuestionUrl = useCallback((isOpen: boolean) => {
		console.log(
			'window.location.pathname.split',
			window.location.pathname.split('/'),
		)

		const [, category, domain, chatbot, threadSlug, threadQuestionSlug] =
			window.location.pathname.split('/')
		const navigationParts = {
			category,
			domain,
			chatbot,
			threadSlug,
			threadQuestionSlug: pair.userMessage.slug,
		}

		console.log({
			threadQuestionSlug,
			isOpen,
		})
		if (!threadQuestionSlug && isOpen) {
			console.log('navigateTo threadQuestionUrl', navigationParts)
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
			console.log('navigateTo threadUrl', navigationParts)
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

	const shouldShowFirstUserMessage = !(
		!isThread &&
		index === 0 &&
		activeThread?.thread &&
		hasPrevious
	)

	return (
		<SharedAccordion
			defaultState={true}
			isOpen={
				index === 0 || params.threadQuestionSlug === pair.userMessage.slug
			}
			disabled={index === 0}
			isNestedThread={true}
			variant="browse"
			contentClass={cn(
				'border-l-transparent',
				index === pairs.length - 1 && 'border-b-transparent',
			)}
			triggerClass="dark:border-b-mirage border-b-gray-300 py-[0.625rem] px-2 md:px-4 xl:px-11 gap-4"
			arrowClass="mt-[0.625rem] right-[calc(47px-1rem)] translate-x-[50%]"
			id={pair.userMessage.slug}
		>
			{/* Thread Title */}
			<div
				className={cn(
					'relative flex items-center font-normal md:text-lg transition-all size-full gap-3 pr-4',
					{ hidden: !isThread && index === 0 && !hasPrevious },
				)}
			>
				<div className={cn('break-all px-1 text-left')}>
					{pair.userMessage.content}
				</div>
			</div>

			{/* Thread Description - Empty div for accordion structure */}
			<div />

			{/* Thread Content */}
			<div className="border-x-DEFAULT mx-2 md:mx-4 xl:mx-11 py-5 dark:border-mirage border-gray-300 text-left">
				{pair.chatGptMessage.length > 0 &&
					pair.chatGptMessage.map((message, index) => (
						<BrowseChatMessage
							chatbot={chatbot}
							key={message.messageId}
							message={convertMessage(message)}
						/>
					))}
			</div>
		</SharedAccordion>
	)
}
