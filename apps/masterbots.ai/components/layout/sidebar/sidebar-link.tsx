'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { IconCaretRight } from '@/components/ui/icons'
import { useBrowse } from '@/lib/hooks/use-browse'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { useThreadSearch } from '@/lib/hooks/use-thread-search'
import { getCanonicalDomain, urlBuilders } from '@/lib/url'
import { cn, getRouteType } from '@/lib/utils'
import type {
	ChatbotThreadListUrlParams,
	UserChatbotThreadListUrlParams,
} from '@/types/url'
import type { Category, Chatbot } from 'mb-genql'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, usePathname, useRouter } from 'next/navigation'
import React, { useCallback, useMemo } from 'react'

interface SidebarLinkProps {
	category: Category
	isFilterMode: boolean
	page?: string
}

export function SidebarLink({
	category,
	isFilterMode,
	page,
}: SidebarLinkProps) {
	const router = useRouter()
	const pathname = usePathname()
	const routeType = getRouteType(pathname)
	const isPublic = routeType === 'public'
	const { userSlug } = useParams()
	const { isOpenPopup, activeThread, setIsOpenPopup, setActiveThread } =
		useThread()
	const { setSearchTerm } = useThreadSearch()
	const { changeKeyword } = useBrowse()

	const {
		activeChatbot,
		activeCategory,
		selectedCategories,
		expandedCategories,
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

			setSearchTerm('')
			changeKeyword('')

			if (isOpenPopup) setIsOpenPopup(false)
			if (activeThread) setActiveThread(null)
			if (isFilterMode) return

			setExpandedCategories((prev) =>
				prev.includes(category.categoryId) ? [] : [category.categoryId],
			)
			setActiveChatbot(null)
			setActiveCategory((prevCategory) => {
				const newCategory =
					category.categoryId === prevCategory
						? null // clicking the same category turns it off
						: category.categoryId

				return newCategory
			})
		},
		[router, category, isFilterMode, isOpenPopup, activeThread, activeCategory],
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

	// TODO: Create a guard in a useEffect to fetch the current category by grabbing the category param and fgetch the category to update the activeCategory state

	const isActive = activeCategory === category.categoryId
	const isSelected = selectedCategories.includes(category.categoryId)
	const isPro = routeType === 'pro'

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

	// Create a constant for the URL using urlBuilders
	const categoryUrl = useMemo(() => {
		if (!category) return ''

		const isNewCategory = category.categoryId !== activeCategory

		if (page === 'profile') {
			// For profile pages
			return category.categoryId && isNewCategory
				? urlBuilders.userTopicThreadListUrl({
						type: 'user',
						usernameSlug: userSlug as string,
						category: category.name,
					})
				: urlBuilders.profilesUrl({
						type: 'user',
						usernameSlug: userSlug as string,
					})
		}

		const fallbackUrl = isPro ? '/pro' : isPublic ? '/' : '/c'

		// For personal routes
		return category.categoryId && isNewCategory
			? urlBuilders.topicThreadListUrl({
					type: isPro ? 'pro' : isPublic ? 'public' : 'personal',
					category: category.name,
				})
			: fallbackUrl
	}, [category, activeCategory, isPublic, page, userSlug, isPro])

	if (isFilterMode) {
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
			<Link
				href={categoryUrl}
				className={cn(
					'flex items-center p-4 w-full text-left sidebar-gradient',
					isActive && 'selected',
					page === 'profile' && 'pl-6',
				)}
				onClick={(e) => {
					e.stopPropagation()
					handleClickCategory(e)
				}}
				role="menuitem"
				aria-expanded={isActive}
				aria-controls={`category-${category.name}`}
				prefetch={false}
			>
				{categoryContent}
			</Link>
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
		const { userSlug, domain } = useParams()
		const { setIsOpenPopup, setActiveThread } = useThread()
		const { setSearchTerm } = useThreadSearch()
		const { changeKeyword } = useBrowse()

		const isPro = routeType === 'pro'
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

				setSearchTerm('')
				changeKeyword('')
				setIsOpenPopup(false)
				setActiveThread(null)
				setActiveChatbot(chatbot)

				// ? Only the profile user has a sidebar
				if (page === 'profile') {
					return navigateTo({
						urlType: 'userChatbotThreadListUrl',
						navigationParams: {
							type: 'user',
							usernameSlug: userSlug as string,
							category: category.name,
							domain: chatbotDomain,
							chatbot: chatbot.name,
						} as UserChatbotThreadListUrlParams,
					})
				}

				return navigateTo({
					urlType: 'chatbotThreadListUrl',
					navigationParams: {
						type: isPro ? 'pro' : isPublic ? 'public' : 'personal',
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
						usernameSlug: userSlug as string,
						category: category.name,
						domain: chatbotDomain,
						chatbot: chatbot?.name,
					})
				: urlBuilders.chatbotThreadListUrl({
						type: isPro ? 'pro' : isPublic ? 'public' : 'personal',
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
