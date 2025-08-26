'use client'

import { urlBuilders } from '@/lib/url'
import { getCategories, getUserBySlug } from '@/services/hasura'
import type { Category, Chatbot } from 'mb-genql'
import { toSlug } from 'mb-lib'
import { useSession } from 'next-auth/react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import * as React from 'react'
import { useAsync } from 'react-use'
import { useCategorySelections } from './use-category-selections'

const LOCAL_STORAGE_KEY = 'sidebar'

export interface NavigationParams {
	page: string | undefined
	usernameSlug: string | undefined
	categoryName?: string
	chatbotName?: string
	isBrowse?: boolean
}

interface SidebarContext {
	tab: 'general' | 'work'
	isLoading: boolean
	filterValue: string
	isFilterMode: boolean
	isSidebarOpen: boolean
	isDashboardOpen: boolean
	selectedChats: string[]
	activeChatbot: Chatbot | null
	activeCategory: number | null
	selectedChatbots: number[]
	filteredCategories: Category[]
	selectedCategories: number[]
	allCategories: Category[]
	expandedCategories: number[]
	changeTab: (cate: 'general' | 'work') => void
	navigateTo: <T extends keyof typeof urlBuilders>(
		params: NavigateToParams<T>,
	) => void
	toggleSidebar: (toggle?: boolean) => void
	setFilterValue: React.Dispatch<React.SetStateAction<string>>
	setIsFilterMode: React.Dispatch<React.SetStateAction<boolean>>
	setIsDashboardOpen: React.Dispatch<React.SetStateAction<boolean>>
	setSelectedChats: React.Dispatch<React.SetStateAction<string[]>>
	setActiveChatbot: React.Dispatch<React.SetStateAction<Chatbot | null>>
	setActiveCategory: React.Dispatch<React.SetStateAction<number | null>>
	setSelectedChatbots: React.Dispatch<React.SetStateAction<number[]>>
	setSelectedCategories: (
		categories: number[] | ((prev: number[]) => number[]),
	) => void
	setExpandedCategories: React.Dispatch<React.SetStateAction<number[]>>
	toggleChatbotSelection: (chatbotId: number) => void
}

const SidebarContext = React.createContext<SidebarContext | undefined>(
	undefined,
)

export function useSidebar() {
	const context = React.useContext(SidebarContext)
	if (!context) {
		throw new Error('useSidebarContext must be used within a SidebarProvider')
	}
	return context
}

interface SidebarProviderProps {
	children: React.ReactNode
}

type NavigateToParams<
	T extends keyof typeof urlBuilders = keyof typeof urlBuilders,
> = {
	urlType: T
	// Use Parameters to extract the parameter type of the selected URL builder.
	navigationParams: Parameters<(typeof urlBuilders)[T]>[0]
	shallow?: boolean
}

export function SidebarProvider({ children }: SidebarProviderProps) {
	const {
		selectedCategories,
		setCategories,
		isLoaded: isCategoryStorageLoaded,
	} = useCategorySelections()
	const [selectedChatbots, setSelectedChatbots] = React.useState<number[]>([])
	const { data: session } = useSession()

	// Removed auto-clear and auto-select logic to preserve user selections across reloads
	const { userSlug } = useParams()
	const pathname = usePathname()
	const router = useRouter()
	const prevPath = React.useRef<string | null>(null)

	const {
		value: categories,
		loading,
		error,
	} = useAsync(async () => {
		let userId = null
		if (userSlug) {
			const { user, error } = await getUserBySlug({
				slug: userSlug as string,
				isSameUser: false,
			})
			if (error) throw error
			userId = user ? user?.userId : null
		}
		const categories = await getCategories(userId)
		const categoriesObj = {
			categoriesChatbots: categories || [],
			categoriesId: categories.map((category) => category.categoryId),
			chatbotsId: categories?.flatMap((category) =>
				category.chatbots.map((chatbot) => chatbot.chatbotId),
			),
		}
		const pathParts = pathname.split('/')
		const prevPathParts = (prevPath.current || '').split('/')

		//? Handle category and chatbot selections based on stored preferences
		//? Only update selections when navigating to browse page or when we have stored selections
		if (
			prevPath.current !== pathname &&
			pathParts[1] !== prevPathParts[1] &&
			pathParts[1] === 'c'
		) {
			if (selectedCategories.length > 0) {
				const selectedChatbotsFromCategories = categoriesObj.categoriesChatbots
					.filter(
						(category) =>
							category?.categoryId &&
							selectedCategories.includes(category.categoryId),
					)
					.flatMap(
						(category) =>
							category.chatbots
								?.map((chatbot) => chatbot?.chatbotId)
								.filter(Boolean) || [],
					)
				setSelectedChatbots(selectedChatbotsFromCategories)
			}
		}

		prevPath.current = pathname

		return categoriesObj
	}, [
		pathname,
		prevPath.current,
		userSlug,
		selectedCategories,
		session?.user,
		isCategoryStorageLoaded,
	])

	const [isSidebarOpen, setSidebarOpen] = React.useState(false)
	const [isLoading, setLoading] = React.useState(true)
	const [activeChatbot, setActiveChatbot] = React.useState<Chatbot | null>(null)
	const [tab, setTab] = React.useState<'general' | 'work'>('general')
	const [activeCategory, setActiveCategory] = React.useState<number | null>(
		null,
	)
	const [isFilterMode, setIsFilterMode] = React.useState(false)
	const [isDashboardOpen, setIsDashboardOpen] = React.useState(false)
	const [filterValue, setFilterValue] = React.useState('')
	const [selectedChats, setSelectedChats] = React.useState<string[]>([])
	const [expandedCategories, setExpandedCategories] = React.useState<number[]>(
		[],
	)

	React.useEffect(() => {
		if (!categories) return
		if (selectedCategories.length === 0) {
			setSelectedChatbots([])
			return
		}
		const categoriesChatbots = categories.categoriesChatbots || []
		const chatbotsFromSelectedCategories = categoriesChatbots
			.filter((category) => selectedCategories.includes(category.categoryId))
			.flatMap((category) => category.chatbots.map((c) => c.chatbotId))
			.filter(Boolean) as number[]

		setSelectedChatbots((prev) => {
			const merged = new Set<number>([
				...prev,
				...chatbotsFromSelectedCategories,
			])
			return Array.from(merged)
		})
	}, [selectedCategories, categories])

	React.useEffect(() => {
		const value = localStorage.getItem(LOCAL_STORAGE_KEY)
		setSidebarOpen(value ? JSON.parse(value) : window.innerWidth >= 1024)
		setLoading(false)
	}, [])

	const toggleSidebar = (toggle = true) => {
		setSidebarOpen((value) => {
			const newState = toggle ? !value : false
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState))
			return newState
		})
	}

	React.useEffect(() => {
		if (!pathname || !categories) return
		const [
			,
			publicTopicSlugOrBasePath, // c or :category
			personalProfilesTopicSlugOrDomainSlug, // :category or :domain
			domainSlugOrPublicChatbotSlug, // :domain or :chatbot
			personalChatbotSlugProfileTopicOrThreadSlug, // :topic, :chatbot or :threadSlug
			_personalProfilesThreadSlugProfileDomainOrPublicTheadQuestionSlug, // :threadSlug or :threadQuestionSlug
			profileChatbot, // :chatbot
			_profileThreadSlug, // :threadSlug
			_profileThreadQuestionSlug, // :threadQuestionSlug
		] = pathname.split('/')

		const category = categories?.categoriesChatbots.find(
			(cat) =>
				cat?.name &&
				(toSlug(cat.name) === personalChatbotSlugProfileTopicOrThreadSlug ||
					toSlug(cat.name) === personalProfilesTopicSlugOrDomainSlug ||
					toSlug(cat.name) === publicTopicSlugOrBasePath),
		)
		if (category?.categoryId) {
			setActiveCategory(category.categoryId)
			setExpandedCategories([category.categoryId])

			if (
				domainSlugOrPublicChatbotSlug ||
				personalChatbotSlugProfileTopicOrThreadSlug ||
				profileChatbot
			) {
				const chatbot = category.chatbots?.find(
					(c) =>
						c?.chatbot?.name &&
						(c.chatbot.name.toLowerCase() === profileChatbot ||
							c.chatbot.name.toLowerCase() ===
								personalChatbotSlugProfileTopicOrThreadSlug ||
							c.chatbot.name.toLowerCase() === domainSlugOrPublicChatbotSlug),
				)
				if (chatbot?.chatbot) {
					setActiveChatbot(chatbot.chatbot)
				} else {
					setActiveChatbot(null)
				}
			} else {
				setActiveChatbot(null)
			}
		}
	}, [pathname, categories])

	/**
	 * Toggles the selection of a chatbot by its ID. If the chatbot is already selected, it will be removed from the selection.
	 * Otherwise, it will be added to the selection. Additionally, updates the selected categories based on the chatbots
	 * associated with each category.
	 *
	 * @param {number} chatbotId - The ID of the chatbot to toggle selection for.
	 */

	const toggleChatbotSelection = React.useCallback(
		(chatbotId: number) => {
			setSelectedChatbots((prev) =>
				prev.includes(chatbotId)
					? prev.filter((id) => id !== chatbotId)
					: [...prev, chatbotId],
			)
			const categoriesChatbots = categories ? categories.categoriesChatbots : []
			// setSelectedCategories((prev) =>
			// 	categoriesChatbots
			// 		.filter((category) =>
			// 			category.chatbots.some(
			// 				(chatbot) => chatbot.chatbotId === chatbotId,
			// 			),
			// 		)
			// 		.map((category) => category.categoryId)
			// 		.filter((id) => !prev.includes(id)).length
			// 		? [
			// 				...prev,
			// 				...categoriesChatbots
			// 					.filter((category) =>
			// 						category.chatbots.some(
			// 							(chatbot) => chatbot.chatbotId === chatbotId,
			// 						),
			// 					)
			// 					.map((category) => category.categoryId),
			// 			]
			// 		: prev.filter(
			// 				(id) =>
			// 					!categoriesChatbots
			// 						.filter((category) =>
			// 							category.chatbots.some(
			// 								(chatbot) => chatbot.chatbotId === chatbotId,
			// 							),
			// 						)
			// 						.map((category) => category.categoryId)
			// 						.includes(id),
			// 			),
			// )

			setCategories((prevSelectedCategories: number[]) => {
				const relatedCategories = categoriesChatbots.filter((category) =>
					category.chatbots.some((chatbot) => chatbot.chatbotId === chatbotId),
				)

				const newCategoryIds = relatedCategories
					.map((category) => category.categoryId)
					.filter((id) => !prevSelectedCategories.includes(id))

				return [...prevSelectedCategories, ...newCategoryIds]
			})
		},
		[categories, setCategories],
	)

	const changeTab = (cate: 'general' | 'work') => {
		setTab(cate)
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const filteredCategories = React.useMemo(() => {
		const categoriesChatbots = categories?.categoriesChatbots || []

		return isFilterMode
			? categoriesChatbots
			: categoriesChatbots
					.filter(
						(category) =>
							category.name.toLowerCase().includes(filterValue.toLowerCase()) ||
							category.chatbots.some((chatbot) =>
								chatbot.chatbot.name
									.toLowerCase()
									.includes(filterValue.toLowerCase()),
							),
					)
					.filter((category) =>
						selectedCategories.includes(category.categoryId),
					)
					.filter((category) =>
						selectedChatbots.length === 0
							? true
							: category.chatbots.some((chatbot) =>
									selectedChatbots.includes(chatbot.chatbotId),
								),
					)
	}, [
		selectedChatbots,
		selectedCategories,
		filterValue,
		isFilterMode,
		categories,
	])

	const navigateTo = <T extends keyof typeof urlBuilders>({
		urlType,
		navigationParams,
		shallow,
	}: NavigateToParams<T>) => {
		const url = (
			urlBuilders as Record<string, (params: typeof navigationParams) => string>
		)[urlType](navigationParams)

		if (shallow && window) {
			return window.history.replaceState(window.history.state, '', url)
		}

		router.prefetch(url)
		return router.push(url, { scroll: false })
	}

	if (isLoading) {
		return null
	}

	const allCategories = categories?.categoriesChatbots || []

	return (
		<SidebarContext.Provider
			value={{
				tab,
				isLoading,
				filterValue,
				isFilterMode,
				isSidebarOpen,
				isDashboardOpen,
				selectedChats,
				activeChatbot,
				activeCategory,
				selectedChatbots,
				filteredCategories,
				selectedCategories,
				allCategories,
				expandedCategories,
				changeTab,
				navigateTo,
				toggleSidebar,
				setFilterValue,
				setIsFilterMode,
				setIsDashboardOpen,
				setActiveChatbot,
				setSelectedChats,
				setActiveCategory,
				setSelectedChatbots,
				setExpandedCategories,
				setSelectedCategories: setCategories,
				toggleChatbotSelection,
			}}
		>
			{children}
		</SidebarContext.Provider>
	)
}
