'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { IconCaretRight } from '@/components/ui/icons'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { urlBuilders } from '@/lib/url'
import { cn } from '@/lib/utils'
import type { Category, Chatbot } from 'mb-genql'
import { toSlug } from 'mb-lib'
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
	const isBrowse = !/^\/(?:c|u)(?:\/|$)/.test(pathname)
	const { slug } = useParams()

	const {
		activeCategory,
		setActiveCategory,
		activeChatbot,
		setActiveChatbot,
		selectedCategories,
		selectedChatbots,
		setSelectedCategories,
		setSelectedChatbots,
		expandedCategories,
		setExpandedCategories,
		navigateTo,
	} = useSidebar()
	const isExpanded = expandedCategories.includes(category.categoryId)

	const handleClickCategory = useCallback(
		(e: React.MouseEvent) => {
			e.stopPropagation()
			if (!isFilterMode) {
				setExpandedCategories((prev) =>
					prev.includes(category.categoryId) ? [] : [category.categoryId],
				)
				setActiveCategory((prev) => {
					const newCategory =
						prev === category.categoryId ? null : category.categoryId
					if (newCategory) {
						setActiveChatbot(null)
						navigateTo({
							page,
							slug: typeof slug === 'string' ? slug : undefined,
							categoryName: toSlug(category.name.toLowerCase()),
							isBrowse,
						})
					} else {
						setActiveChatbot(null)
						navigateTo({
							page,
							slug: typeof slug === 'string' ? slug : undefined,
							isBrowse,
						})
					}
					return newCategory
				})
			}
		},
		[
			category.categoryId,
			category.name,
			setActiveCategory,
			setExpandedCategories,
			setActiveChatbot,
			router,
			isFilterMode,
			isBrowse,
		],
	)

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

	if (isBrowse || isFilterMode) {
		return (
			<div className={cn('flex flex-col mb-2')}>
				<div
					className={cn(
						'flex items-center p-2 cursor-pointer',
						isActive && 'bg-gray-200 dark:bg-mirage',
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
		<div className={cn('flex flex-col mb-2')}>
			<button
				role="menuitem"
				aria-expanded={isActive}
				aria-controls={`category-${category.name}`}
				className={cn(
					'flex items-center p-2 w-full text-left',
					isActive && 'bg-gray-200 dark:bg-mirage',
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
		const isBrowse = !/^\/(?:c|u)(?:\/|$)/.test(pathname)
		const { slug } = useParams()

		const handleChatbotClick = useCallback(
			(e: React.MouseEvent) => {
				e.preventDefault()
				setActiveChatbot(chatbot)
				if (chatbot) {
					navigateTo({
						page,
						slug: slug as string,
						categoryName: toSlug(category.name.toLowerCase()),
						chatbotName: chatbot.name.toLowerCase(),
						isBrowse,
					})
				}
			},
			[chatbot, setActiveChatbot, isFilterMode],
		)

		const isSelected = selectedChatbots.includes(chatbot.chatbotId)

		const handleCheckboxChange = useCallback(() => {
			toggleChatbotSelection(chatbot.chatbotId)
		}, [chatbot.chatbotId])

		if (!isFilterMode && !isSelected) return null

		return isFilterMode || isBrowse ? (
			<div
				className={cn(
					'flex items-center p-2 w-full',
					isActive && 'bg-blue-100 dark:bg-blue-900',
					'hover:bg-gray-100 dark:hover:bg-gray-800',
				)}
			>
				{isFilterMode && (
					<Checkbox
						checked={isSelected}
						onCheckedChange={handleCheckboxChange}
						onClick={(e) => e.stopPropagation()}
						className="mr-2"
					/>
				)}
				<Image
					src={chatbot.avatar || '/path/to/default/avatar.png'}
					alt={chatbot.name}
					width={24}
					height={24}
					className="mr-2 rounded-full"
				/>
				<span>{chatbot.name}</span>
			</div>
		) : (
			<Link
				href={
					page === 'profile'
						? urlBuilders.userChatbotUrl({
								slug: slug as string,
								category: category.name,
								chatbot: chatbot.name,
							})
						: `/c/${toSlug(category.name)}/${chatbot.name.toLowerCase()}`
				}
				className={cn(
					'flex items-center p-2 w-full',
					isActive && 'bg-blue-100 dark:bg-blue-900',
					'hover:bg-gray-100 dark:hover:bg-gray-800',
				)}
				onClick={handleChatbotClick}
			>
				<Image
					src={chatbot.avatar || '/path/to/default/avatar.png'}
					alt={chatbot.name}
					width={24}
					height={24}
					className="mr-2 rounded-full"
				/>
				<span>{chatbot.name}</span>
			</Link>
		)
	},
)
