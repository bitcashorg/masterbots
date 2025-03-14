'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { IconCaretRight } from '@/components/ui/icons'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { getCanonicalDomain, urlBuilders } from '@/lib/url'
import { cn, getRouteType } from '@/lib/utils'
import type {
	ChatbotThreadListUrlParams,
	TopicThreadListUrlParams,
	UserChatbotThreadListUrlParams,
	UserTopicThreadListUrlParams,
} from '@/types/url'
import type { Category, Chatbot } from 'mb-genql'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, usePathname, useRouter } from 'next/navigation'
import React, { useCallback } from 'react'

interface SidebarLinkProps {
	category: Category
	isFilterMode: boolean
	page?: string
}

export default function SidebarLink({
	category,
	isFilterMode,
	page,
}: SidebarLinkProps) {
	const router = useRouter()
	const pathname = usePathname()
	const isPublic = !/^\/(?:c|u)(?:\/|$)/.test(pathname)
	const routeType = getRouteType(pathname)
	const { username } = useParams()
	const { isOpenPopup, activeThread, setIsOpenPopup, setActiveThread } =
		useThread()

	const {
		activeChatbot,
		activeCategory,
		selectedCategories,
		expandedCategories,
		navigateTo,
		setActiveChatbot,
		setActiveCategory,
		setSelectedChatbots,
		setSelectedCategories,
		setExpandedCategories,
	} = useSidebar()
	const isExpanded = expandedCategories.includes(category.categoryId)

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const handleClickCategory = useCallback(
		(e: React.MouseEvent) => {
			e.stopPropagation()

			if (isOpenPopup) setIsOpenPopup(false)
			if (activeThread) setActiveThread(null)
			if (isFilterMode) return

			setExpandedCategories((prev) =>
				prev.includes(category.categoryId) ? [] : [category.categoryId],
			)
			// TODO: Pasar estos side-effect a una nueva función que se llame handleCategoryClick para sí evitar errores de hidratación y actualización de estado
			// ! Asegurarse que no estamos repitiendo este patrón con otro setState...
			setActiveCategory((prev) => {
				setActiveChatbot(null)

				const newCategory =
					prev === category.categoryId ? null : category.categoryId

				if (!newCategory) {
					router.push('/')
				}

				// ? Only the profile user has a sidebar
				if (page === 'profile' && newCategory) {
					navigateTo({
						urlType: 'userTopicThreadListUrl',
						navigationParams: {
							type: 'user',
							usernameSlug: username as string,
							category: category.name,
						} as UserTopicThreadListUrlParams,
					})
				} else if (newCategory) {
					navigateTo({
						urlType: 'topicThreadListUrl',
						navigationParams: {
							type: isPublic ? 'public' : 'personal',
							category: category.name,
						} as TopicThreadListUrlParams,
					})
				}

				return newCategory
			})
		},
		[router, isPublic, category, isFilterMode],
	)

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const handleCheckboxChange = useCallback(
		(checked: boolean) => {
			setSelectedCategories((prev) =>
				checked
					? [...prev, category.categoryId]
					: prev.filter((id) => id !== category.categoryId),
			)
			setSelectedChatbots((prev) =>
				checked
					? [
							...prev,
							...category.chatbots.map((chatbot) => chatbot.chatbot.chatbotId),
						]
					: prev.filter(
							(id) =>
								!category.chatbots.some(
									(chatbot) => chatbot.chatbot.chatbotId === id,
								),
						),
			)
		},
		[category.categoryId, category.chatbots],
	)

	const isActive = activeCategory === category.categoryId
	const isSelected = selectedCategories.includes(category.categoryId)

	const categoryContent = (
		<>
			{isFilterMode && (
				<Checkbox
					checked={isSelected}
					onCheckedChange={handleCheckboxChange}
					onClick={(e) => e.stopPropagation()}
					className="mr-2"
				/>
			)}
			<span className="grow">{category.name}</span>
			<IconCaretRight
				className={cn(
					'transition-transform duration-300 stroke-[#09090b] dark:stroke-[#FAFAFA]',
					isExpanded || isFilterMode ? 'rotate-90' : 'rotate-0',
				)}
			/>
		</>
	)

	const childrenContent = (isExpanded || isFilterMode) && (
		<div className="ml-4">
			{category.chatbots.map((chatbotCategory) => (
				<ChatbotComponent
					key={chatbotCategory.chatbot.chatbotId}
					chatbot={chatbotCategory.chatbot}
					category={category}
					isActive={
						chatbotCategory.chatbot.chatbotId === activeChatbot?.chatbotId
					}
					setActiveChatbot={setActiveChatbot}
					isFilterMode={isFilterMode}
					page={page}
				/>
			))}
		</div>
	)

	if (isPublic || isFilterMode) {
		return (
			<div className={cn('flex flex-col mb-2')} data-route={routeType}>
				{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
				<div
					className={cn(
						'flex items-center p-4 cursor-pointer sidebar-gradient',
						isActive && 'selected',
					)}
					onClick={handleClickCategory}
				>
					{categoryContent}
				</div>
				{childrenContent}
			</div>
		)
	}

	return (
		<div className={cn('flex flex-col mb-2')} data-route={routeType}>
			{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
			<button
				role="menuitem"
				aria-expanded={isActive}
				aria-controls={`category-${category.name}`}
				className={cn(
					'flex items-center p-4 w-full text-left sidebar-gradient',
					isActive && 'selected',
					page === 'profile' && 'pl-6',
				)}
				onClick={(e) => {
					e.stopPropagation()
					handleClickCategory(e)
				}}
			>
				{categoryContent}
			</button>
			{childrenContent}
		</div>
	)
}

interface ChatbotComponentProps {
	chatbot: Chatbot
	category: Category
	isActive: boolean
	setActiveChatbot: React.Dispatch<React.SetStateAction<Chatbot | null>>
	isFilterMode: boolean
	page?: string
}

const ChatbotComponent: React.FC<ChatbotComponentProps> = React.memo(
	function ChatbotComponent({
		chatbot,
		category,
		isActive,
		setActiveChatbot,
		isFilterMode,
		page,
	}) {
		const { selectedChatbots, toggleChatbotSelection, navigateTo } =
			useSidebar()
		const pathname = usePathname()
		const isPublic = !/^\/(?:c|u)(?:\/|$)/.test(pathname)
		const routeType = getRouteType(pathname)
		const { username, domain } = useParams()
		const { setIsOpenPopup, setActiveThread } = useThread()

		const canonicalDomain = getCanonicalDomain(chatbot.name)
		// * Default to prompt when no metadata found... Special case for BlankBot
		const chatbotDomain = canonicalDomain || (domain as string) || 'prompt'
		// console.log('canonicalDomain', {
		//   canonicalDomain,
		//   chatbotDomain
		// })
		// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
		const handleChatbotClick = useCallback(
			(e: React.MouseEvent) => {
				e.preventDefault()

				setIsOpenPopup(false)
				setActiveThread(null)
				setActiveChatbot(chatbot)

				// ? Only the profile user has a sidebar
				if (page === 'profile') {
					return navigateTo({
						urlType: 'userChatbotThreadListUrl',
						navigationParams: {
							type: 'user',
							usernameSlug: username as string,
							category: category.name,
							domain: chatbotDomain,
							chatbot: chatbot.name,
						} as UserChatbotThreadListUrlParams,
					})
				}

				return navigateTo({
					urlType: 'chatbotThreadListUrl',
					navigationParams: {
						type: isPublic ? 'public' : 'personal',
						category: category.name,
						domain: chatbotDomain,
						chatbot: chatbot.name,
					} as ChatbotThreadListUrlParams,
				})
			},
			[chatbot, isFilterMode, chatbotDomain],
		)

		const isSelected = selectedChatbots.includes(chatbot.chatbotId)

		// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
		const handleCheckboxChange = useCallback(() => {
			toggleChatbotSelection(chatbot.chatbotId)
		}, [chatbot.chatbotId])

		if (!isFilterMode && !isSelected) return null

		const chatbotPathname =
			page === 'profile'
				? urlBuilders.userChatbotThreadListUrl({
						type: 'user',
						usernameSlug: username as string,
						category: category.name,
						domain: chatbotDomain,
						chatbot: chatbot?.name,
					})
				: urlBuilders.chatbotThreadListUrl({
						type: isPublic ? 'public' : 'personal',
						category: category.name,
						domain: chatbotDomain,
						chatbot: chatbot?.name,
					})

		return isFilterMode ? (
			<div
				className={cn(
					'flex items-center py-2 px-4 w-full sidebar-gradient',
					isActive && 'selected',
				)}
				data-route={routeType}
			>
				<Checkbox
					checked={isSelected}
					onCheckedChange={handleCheckboxChange}
					onClick={(e) => e.stopPropagation()}
					className="mr-2"
				/>
				<Image
					src={chatbot.avatar || '/images/robohash2.png'}
					alt={chatbot.name}
					width={36}
					height={36}
					className="mr-2 rounded-full"
				/>
				<span>{chatbot.name}</span>
			</div>
		) : (
			<Link
				className={cn(
					'flex items-center py-2 px-4 w-full sidebar-gradient',
					isActive && 'selected',
				)}
				onClick={handleChatbotClick}
				href={chatbotPathname}
				data-route={routeType}
				rel="canonical"
				prefetch
			>
				<Image
					src={chatbot.avatar || '/path/to/default/avatar.png'}
					alt={chatbot.name}
					width={36}
					height={36}
					className="mr-2 rounded-full"
				/>
				<span>{chatbot.name}</span>
			</Link>
		)
	},
)
