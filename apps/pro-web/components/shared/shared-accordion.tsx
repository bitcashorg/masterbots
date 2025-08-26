import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { getCanonicalDomain } from '@/lib/url'
import { cn } from '@/lib/utils'
import { getThread } from '@/services/hasura'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { appConfig } from 'mb-env'
import type { Thread } from 'mb-genql'
import { useSession } from 'next-auth/react'
import { useParams, usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

interface SharedAccordionProps
	extends Omit<React.ComponentProps<'div'>, 'onToggle'> {
	defaultState?: boolean
	triggerClass?: string
	contentClass?: string
	isOpen?: boolean
	arrowClass?: string
	onToggle?: (isOpen: boolean) => void
	handleTrigger?: () => void
	handleOpen?: () => void
	thread?: (Omit<Thread, '__typename'> & { id?: string }) | null
	variant?: 'browse' | 'chat'
	disabled?: boolean
	isNestedThread?: boolean
}

const toggleBodyScroll = (disable: boolean) => {
	if (typeof window === 'undefined') return
	document.body.style.overflow = disable ? 'hidden' : 'auto'
	document.body.style.position = disable ? 'fixed' : 'static'
	document.body.style.width = disable ? '100%' : 'auto'
}

export function SharedAccordion({
	className,
	children,
	defaultState = false,
	triggerClass,
	contentClass,
	onToggle,
	isOpen,
	arrowClass,
	handleTrigger,
	handleOpen,
	thread = null,
	disabled = false,
	variant = 'chat',
	isNestedThread = false,
	...props
}: SharedAccordionProps) {
	const { data: session } = useSession()
	const {
		activeThread,
		setActiveThread,
		setIsNewResponse,
		isNewResponse,
		setIsOpenPopup,
		isOpenPopup,
	} = useThread()
	const { navigateTo } = useSidebar()
	const [currentRequest, setCurrentRequest] = useState<AbortController | null>(
		null,
	)
	// const { isAdminMode } = useThreadVisibility()

	const pathname = usePathname()
	const params = useParams()
	const accordionRef = useRef<HTMLDivElement>(null)
	const isPro = !/^\/(?:c|u)(?:\/|$)/.test(pathname)
	// Handle profile page routing
	const profilePage = /^\/u\/[^/]+\/t(?:\/|$)/.test(pathname)
	// Handle bot page routing i.e.: /b/:chatbotName
	const botProfile = /^\/b\/[^/]+(?:\/|$)/.test(pathname)

	// State initialization
	const [open, setOpen] = useState(
		defaultState || activeThread?.threadId === thread?.threadId,
	)
	const [loading, setLoading] = useState(false)

	// Check if another thread is open (for browse variant)
	const isAnotherThreadOpen =
		variant === 'browse' &&
		!isNestedThread &&
		activeThread !== null &&
		thread?.threadId !== activeThread?.threadId
	const shouldBeDisabled = disabled || isAnotherThreadOpen
	const isMainThread = !isOpenPopup

	const { ref, inView: isHeroInView } = useInView({
		threshold: 0.1,
	})

	useEffect(() => {
		const heroElement = document.getElementById('hero-section')
		if (heroElement) {
			ref(heroElement)
		}
	}, [ref])
	// Mobile scroll handling
	useEffect(() => {
		if (variant === 'browse') {
			const isMobile = window.innerWidth < 640 // sm breakpoint
			toggleBodyScroll(isMobile && open && !isNestedThread)
			return () => toggleBodyScroll(false)
		}
	}, [open, isNestedThread, variant])

	const toggleIsOpen = (isOpen: boolean) => {
		setOpen(isOpen)
	}

	// Handle active thread changes
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (
			(thread?.threadId &&
				activeThread !== null &&
				thread?.threadId !== activeThread?.threadId) ||
			(activeThread === null && thread?.threadId)
		) {
			toggleIsOpen(false)
		}
	}, [activeThread, thread])

	// Handle controlled state
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (isOpen !== undefined) {
			toggleIsOpen(isOpen)
		}
	}, [isOpen])

	// Handle popup state changes
	useEffect(() => {
		if (
			!isOpenPopup &&
			activeThread &&
			activeThread.threadId === thread?.threadId &&
			!open
		) {
			toggle()
		}
	}, [isOpenPopup, activeThread, thread, open])

	const updateActiveThread = async () => {
		if (!thread) return
		// Cancel any in-flight request
		currentRequest?.abort()
		const abortController = new AbortController()

		setCurrentRequest(abortController)

		const fullThread = await getThread({
			threadId: thread.threadId,
			isPersonal: isPro,
			jwt: isPro ? session?.user?.hasuraJwt : '',
			signal: abortController.signal,
		})

		setActiveThread(
			fullThread
				? ({
						...fullThread,
						thread: {
							...fullThread.thread,
						},
					} as Thread)
				: null,
		)
		setLoading(false)
		setCurrentRequest(null)

		const canonicalDomain = getCanonicalDomain(fullThread?.chatbot?.name || '')

		if (profilePage) {
			const slug = params.userSlug as string
			navigateTo({
				urlType: 'profilesThreadUrl',
				shallow: true,
				navigationParams: {
					type: 'user',
					usernameSlug: slug,
					category: fullThread?.chatbot?.categories[0]?.category?.name || 'AI',
					domain: canonicalDomain,
					chatbot: fullThread?.chatbot?.name || 'Masterbots',
					threadSlug: fullThread?.slug || (params.threadSlug as string),
				},
			})
		} else if (botProfile) {
			navigateTo({
				urlType: 'profilesThreadUrl',
				shallow: true,
				navigationParams: {
					type: 'chatbot',
					chatbot: fullThread?.chatbot?.name || 'Masterbots',
					threadSlug: fullThread?.slug || (params.threadSlug as string),
				},
			})
		} else {
			navigateTo({
				urlType: 'threadUrl',
				shallow: true,
				navigationParams: {
					type: isPro ? 'personal' : 'public',
					category: fullThread?.chatbot?.categories[0]?.category?.name || 'AI',
					domain: canonicalDomain,
					chatbot: fullThread?.chatbot?.name || 'Masterbots',
					threadSlug: fullThread?.slug || (params.threadSlug as string),
				},
			})
		}

		return thread
	}

	const handleClick = async (e: React.MouseEvent) => {
		e.stopPropagation()
		const category = thread?.chatbot?.categories[0]?.category?.name
		const chatbot = thread?.chatbot?.name

		if (isMainThread && thread && !profilePage && !botProfile) {
			setLoading(true)
			// Open modal for both variants
			await updateActiveThread()
			// console.log("Reach here")
			setIsOpenPopup(true)
		} else if (isMainThread && profilePage) {
			if (appConfig.features.profileNBotPageHasPopup) {
				const offset = 400 // How much to scroll down
				const scrollContainer = document.getElementById('thread-scroll-section')
				if (isHeroInView && scrollContainer) {
					scrollContainer.scrollBy({
						top: offset,
						behavior: 'smooth',
					})
				}
				setLoading(true)
				await updateActiveThread()
				setIsOpenPopup(true)
				return
			}

			setIsOpenPopup(false)
			setActiveThread(null)
			const slug = params.userSlug as string
			const canonicalDomain = getCanonicalDomain(chatbot || '')

			if (!category || !chatbot || !slug) {
				console.error('Missing required navigation parameters')
				return
			}
			navigateTo({
				urlType: 'profilesThreadUrl',
				navigationParams: {
					type: 'user',
					usernameSlug: slug,
					category: category,
					domain: canonicalDomain,
					chatbot: chatbot,
					threadSlug: thread?.slug || (params.threadSlug as string),
				},
			})
		} else if (isMainThread && botProfile) {
			// Bot profile page navigation
			if (appConfig.features.profileNBotPageHasPopup) {
				const offset = 400 // How much to scroll down
				const scrollContainer = document.getElementById('thread-scroll-section')
				if (isHeroInView && scrollContainer) {
					scrollContainer.scrollBy({
						top: offset,
						behavior: 'smooth',
					})
				}
				setLoading(true)
				await updateActiveThread()
				setIsOpenPopup(true)

				return
			}
			setIsOpenPopup(false)
			setActiveThread(null)

			if (!category || !chatbot) {
				console.error('Missing required navigation parameters')
				return
			}

			navigateTo({
				urlType: 'profilesThreadUrl',
				navigationParams: {
					type: 'chatbot',
					chatbot: chatbot,
					threadSlug: thread?.slug || (params.threadSlug as string),
				},
			})
		} else {
			// Regular toggle
			toggle()
		}
	}

	const toggle = () => {
		if (shouldBeDisabled) return
		setOpen((prevOpen) => {
			const newState = !prevOpen

			if (!newState && handleOpen) {
				handleOpen()
			}

			if (thread?.threadId) {
				setActiveThread(newState ? (thread as Thread) : null)
			}

			if (isNewResponse) {
				setIsNewResponse(false)
			}

			if (onToggle) {
				onToggle(newState)
			}

			// Scroll into view for browse variant
			if (
				variant === 'browse' &&
				newState &&
				!isNestedThread &&
				accordionRef.current
			) {
				setTimeout(() => {
					accordionRef.current?.scrollIntoView({
						behavior: 'smooth',
						block: 'start',
					})
				}, 100)
			}

			return newState
		})
	}
	return (
		<div
			ref={accordionRef}
			className={cn(
				'relative w-full transition-all duration-300',
				className,
				// Browse variant specific styles
				variant === 'browse' &&
					!isNestedThread &&
					(open
						? 'z-[1] my-8 scale-100'
						: 'scale-[0.98] my-1 hover:scale-[0.99]'),
				variant === 'browse' &&
					!isNestedThread &&
					shouldBeDisabled &&
					'opacity-50 pointer-events-none grayscale cursor-not-allowed',
				variant === 'browse' && isNestedThread && 'my-2',
				variant === 'browse' &&
					!isNestedThread &&
					open &&
					'sm:relative fixed inset-0 sm:inset-auto',
			)}
			id={`thread-${thread?.id || thread?.threadId}`}
			{...props}
		>
			{/* Accordion trigger button */}
			{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
			<button
				data-state={open ? 'open' : 'closed'}
				onClick={handleClick}
				disabled={shouldBeDisabled}
				className={cn(
					'flex flex-1 mt-2 justify-start flex-col relative',
					'transition-all ease-in-out duration-200',
					'border-transparent border font-medium w-full rounded-lg',
					//? Base background color for all states
					'bg-gray-200/90 dark:bg-gray-800/90',
					//? Hover effect for both open and closed states
					'hover:bg-gray-100 dark:hover:bg-gray-700',
					!isNestedThread && 'hover:rounded-t-lg',
					!isNestedThread &&
						open &&
						'dark:border-b-mirage border-b-gray-300 shadow-lg transform-gpu backdrop-blur-sm',
					!isNestedThread &&
						!open &&
						'dark:hover:border-b-mirage hover:border-b-gray-300',
					isNestedThread &&
						open &&
						'bg-gray-200/90 dark:bg-gray-800/90 !hover:rounded-t-none',
					shouldBeDisabled && !open && 'cursor-not-allowed hover:scale-100',
					triggerClass,
				)}
				id={props.id}
			>
				<div className="flex w-full">
					<div className="flex w-full">
						{/* //! children[0] is the title, children[1] is the description that we are not longer using  */}
						{Array.isArray(children) && (
							<div className="select-text w-full">{children[0]}</div>
						)}
						{!open && Array.isArray(children) && children[1]}
					</div>
					{activeThread && (
						<ChevronDown
							{...(handleTrigger
								? {
										onClick: (e) => {
											e.stopPropagation()
											handleTrigger()
										},
									}
								: {})}
							className={cn(
								'ml-auto min-w-4 max-w-4 h-9 transition-transform duration-200',
								open ? '' : '-rotate-90',
								arrowClass,
								disabled && 'hidden',
							)}
						/>
					)}
				</div>
				{loading && (
					<div className="absolute inset-0 bg-accent/5 rounded-lg backdrop-blur-[1px] animate-pulse" />
				)}

				{variant === 'browse' &&
					!isNestedThread &&
					shouldBeDisabled &&
					!open && (
						<div className="absolute inset-0 bg-black/5 dark:bg-white/5 rounded-lg backdrop-blur-[1px]" />
					)}
			</button>

			{/* Accordion content */}
			<AnimatePresence initial={false} mode="wait">
				{open && (
					<motion.div
						className={cn(
							'text-sm border relative',
							!isNestedThread &&
								'dark:bg-[#18181B]/75 bg-white/75 dark:border-b-mirage border-b-gray-300 !border-t-transparent last-of-type:rounded-b-lg shadow-lg backdrop-blur-sm',
							isNestedThread &&
								'dark:bg-[#18181B]/50 bg-white/50 dark:border-b-mirage border-b-gray-300/10 !border-t-transparent last-of-type:rounded-b-lg',
							contentClass,
						)}
						initial={{ height: 0, opacity: 0, marginTop: 0 }}
						animate={{ height: 'auto', opacity: 1, marginTop: -24 }}
						exit={{ height: 0, opacity: 0, marginTop: 0 }}
						transition={{ duration: 0.3, ease: 'easeInOut' }}
					>
						{Array.isArray(children) && children[2]}
					</motion.div>
				)}
			</AnimatePresence>

			{variant === 'browse' && !isNestedThread && !open && (
				<div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent opacity-30" />
			)}
		</div>
	)
}
