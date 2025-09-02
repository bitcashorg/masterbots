'use client'

import { useMBScroll } from '@/lib/hooks/use-mb-scroll'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { getChatbots, getChatbotsCount, getUserBySlug } from '@/services/hasura'
import type { AiToolCall, ChatLoadingState } from '@/types'
import type { Chatbot, Thread } from 'mb-genql'
import { useSession } from 'next-auth/react'
import * as React from 'react'
import { useAsync, useSetState } from 'react-use'

const CHAT_PERSIST_KEY = 'mb.chat.state.v1'

interface ThreadContext {
	webSearch: boolean
	sectionRef: React.RefObject<HTMLElement | null>
	isAtBottom: boolean
	isAdminMode: boolean
	isOpenPopup: boolean
	activeThread: Thread | null
	isNewResponse: boolean
	randomChatbot: Chatbot | null
	isAtBottomOfSection: boolean
	shouldRefreshThreads: boolean
	activeTool?: AiToolCall
	loadingState?: ChatLoadingState
	setWebSearch: (state?: boolean) => void
	setActiveTool: (tool?: AiToolCall) => void
	setIsOpenPopup: React.Dispatch<React.SetStateAction<boolean>>
	setActiveThread: React.Dispatch<React.SetStateAction<Thread | null>>
	setLoadingState: (state?: ChatLoadingState) => void
	setIsNewResponse: React.Dispatch<React.SetStateAction<boolean>>
	getRandomChatbot: () => void
	setShouldRefreshThreads: React.Dispatch<React.SetStateAction<boolean>>
}

const ThreadContext = React.createContext<ThreadContext | undefined>(undefined)

export function useThread() {
	const context = React.useContext(ThreadContext)
	if (!context) {
		throw new Error('useThreadContext must be used within a ThreadProvider')
	}
	return context
}

interface ThreadProviderProps {
	children: React.ReactNode
}

export function ThreadProvider({ children }: ThreadProviderProps) {
	const { activeCategory, activeChatbot } = useSidebar()
	const { data: session } = useSession()
	const {
		value: userData,
		loading,
		error,
	} = useAsync(async () => {
		if (!session?.user.slug) return

		const { user } = await getUserBySlug({
			slug: session.user.slug,
			isSameUser: true,
		})
		setState({
			webSearch: user?.preferences[0].webSearch ?? false,
		})
		return user
	}, [session?.user.slug])

	const [
		{
			isAdminMode,
			activeThread,
			isNewResponse,
			isOpenPopup,
			randomChatbot,
			loadingState,
			activeTool,
			webSearch,
			shouldRefreshThreads,
		},
		setState,
	] = useSetState<{
		isAdminMode: boolean
		activeThread: Thread | null
		isNewResponse: boolean
		isOpenPopup: boolean
		webSearch: boolean
		randomChatbot: Chatbot | null
		shouldRefreshThreads: boolean
		loadingState?: ChatLoadingState
		activeTool?: AiToolCall
	}>({
		isAdminMode: false,
		activeThread: null as Thread | null,
		isNewResponse: false,
		isOpenPopup: false,
		webSearch: userData?.preferences[0].webSearch ?? false,
		shouldRefreshThreads: false,
		randomChatbot: null as Chatbot | null,
		loadingState: undefined,
		activeTool: undefined,
	})

	const sectionRef = React.useRef<HTMLElement | null>(null)
	const threadRef = React.useRef<HTMLElement | null>(null)

	const { isNearBottom: isAtBottomOfSection, isNearBottom } = useMBScroll({
		containerRef: sectionRef,
		threadRef,
		isNewContent: false,
		hasMore: false,
		isLast: true,
		loading: false,
		loadMore: () => {},
	})

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	React.useEffect(() => {
		if (
			!isOpenPopup &&
			activeThread &&
			activeCategory &&
			activeThread.chatbot &&
			activeThread.chatbot.categories &&
			activeCategory !== activeThread.chatbot.categories[0].categoryId
		) {
			setState({ activeThread: null })
		}
	}, [isOpenPopup, activeThread, activeCategory])

	const getRandomChatbot = async () => {
		if (activeThread || !session?.user?.hasuraJwt) return
		const chatbotsCount = await getChatbotsCount({
			categoryId: activeCategory,
			jwt: session?.user?.hasuraJwt,
		})
		const offset = Math.floor(Math.random() * chatbotsCount)
		const chatbots = await getChatbots({
			limit: 1,
			offset,
			categoryId: activeCategory,
		})

		if (chatbots.length) {
			setState({ randomChatbot: chatbots[0] })
		} else {
			setState({ randomChatbot: null })
		}
	}
	// biome-ignore lint/correctness/useExhaustiveDependencies: setState from react-use is stable; hydration runs once on mount
	React.useEffect(() => {
		try {
			const raw =
				typeof window !== 'undefined'
					? localStorage.getItem(CHAT_PERSIST_KEY)
					: null
			let localTimestamp: number | null = null
			if (raw) {
				const data = JSON.parse(raw) as {
					updatedAt: number
					isOpenPopup: boolean
					activeThreadId: string | null
				}
				localTimestamp = data.updatedAt || null
				if (typeof data.isOpenPopup === 'boolean') {
					setState({ isOpenPopup: data.isOpenPopup })
				}
				// activeThreadId hydration intentionally light; actual thread data resolved elsewhere
			}
			fetch('/api/chat/state')
				.then((r) => (r.ok ? r.json() : null))
				.then((remote) => {
					if (!remote || !remote.data) return
					if (!localTimestamp || remote.data.updatedAt > localTimestamp) {
						const d = remote.data as {
							updatedAt: number
							isOpenPopup: boolean
							activeThreadId: string | null
						}
						setState({ isOpenPopup: d.isOpenPopup })
					}
				})
				.catch(() => {})
		} catch {}
	}, [])

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	React.useEffect(() => {
		getRandomChatbot()
	}, [activeCategory, activeThread, session])

	const setActiveThread: React.Dispatch<React.SetStateAction<Thread | null>> = (
		value,
	) => {
		setState({
			activeThread: typeof value === 'function' ? value(activeThread) : value,
		})
	}

	const setShouldRefreshThreads: React.Dispatch<
		React.SetStateAction<boolean>
	> = (value) => {
		setState({
			shouldRefreshThreads:
				typeof value === 'function' ? value(shouldRefreshThreads) : value,
		})
	}

	const setIsNewResponse: React.Dispatch<React.SetStateAction<boolean>> = (
		value,
	) =>
		setState((prev) => ({
			isNewResponse:
				typeof value === 'function' ? value(prev.isNewResponse) : value,
		}))

	const setIsOpenPopup: React.Dispatch<React.SetStateAction<boolean>> = (
		isOpen,
	) =>
		setState((prev) => ({
			isOpenPopup:
				typeof isOpen === 'function' ? isOpen(prev.isOpenPopup) : isOpen,
		}))

	const setActiveTool = (tool?: AiToolCall) => {
		setState({ activeTool: tool })
	}

	const setLoadingState = (state?: ChatLoadingState) => {
		setState({ loadingState: state })
	}

	const setWebSearch = (state?: boolean) => {
		setState({ webSearch: !state || !webSearch })
	}
	React.useEffect(() => {
		try {
			const payload = {
				updatedAt: Date.now(),
				isOpenPopup,
				activeThreadId: activeThread?.threadId ?? null,
			}
			localStorage.setItem(CHAT_PERSIST_KEY, JSON.stringify(payload))
			fetch('/api/chat/state', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			}).catch(() => {})
		} catch {}
	}, [isOpenPopup, activeThread?.threadId])

	return (
		<ThreadContext.Provider
			value={{
				activeThread,
				isNewResponse,
				isOpenPopup,
				isAtBottom: isNearBottom,
				isAtBottomOfSection,
				sectionRef,
				randomChatbot,
				isAdminMode,
				loadingState,
				activeTool,
				webSearch,
				shouldRefreshThreads,
				setShouldRefreshThreads,
				getRandomChatbot,
				setActiveThread,
				setIsNewResponse,
				setIsOpenPopup,
				setActiveTool,
				setLoadingState,
				setWebSearch,
			}}
		>
			{children}
			{/* persist popup open state */}
		</ThreadContext.Provider>
	)
}
