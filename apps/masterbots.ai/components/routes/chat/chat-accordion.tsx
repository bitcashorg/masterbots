//* Component for displaying a collapsible chat thread accordion

import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { ChevronDown } from 'lucide-react'
import type { Thread } from 'mb-genql'
import { useParams, usePathname, useRouter } from 'next/navigation'
import React from 'react'

export const ChatAccordion = ({
	className, //* CSS classes for the outer div
	children, //* Child elements representing different parts of the accordion
	onToggle, //* Callback triggered when accordion is toggled
	isOpen, //* Controlled state to determine if accordion is open
	defaultState = false, //* Initial open state of the accordion
	triggerClass, //* CSS classes for the trigger button
	contentClass, //* CSS classes for the accordion content
	arrowClass, //* CSS classes for the arrow icon
	handleOpen, //* Handler for when the accordion is opened
	handleTrigger, //* Handler for when the trigger is activated
	thread = null, //* Thread data associated with the accordion
	disabled = false, //* Disables the accordion
	...props //* Additional props spread to the outer div
}: {
	className?: string
	children: React.ReactNode[]

	defaultState?: boolean

	triggerClass?: string
	contentClass?: string
	onToggle?: (isOpen: boolean) => void
	isOpen?: boolean
	arrowClass?: string
	handleTrigger?: () => void
	handleOpen?: () => void
	thread?: Thread | null
	disabled?: boolean
}) => {
	//* Retrieves thread state and setters from useThread hook
	const {
		setActiveThread,
		setIsNewResponse,
		setIsOpenPopup,
		isNewResponse,
		isOpenPopup,
	} = useThread()
	const { navigateTo } = useSidebar()

	const pathname = usePathname()
	const params = useParams()
	const router = useRouter()

	//* Sets the initial open state based on defaultState prop
	const initialState = defaultState
	const profilePage = /^\/u\/[^/]+\/t(?:\/|$)/.test(pathname)
	const isPublic = !/^\/(?:c|u)(?:\/|$)/.test(pathname)

	const [open, setOpen] = React.useState(initialState)
	const isMainThread = !isOpenPopup

	//* Handles click events on the accordion header
	const handleClick = (e: React.MouseEvent) => {
		e.stopPropagation()
		e.preventDefault()

		if (isMainThread && thread && !profilePage) {
			//* Main thread click - open modal
			setActiveThread(thread)
			setIsOpenPopup(true)
		} else {
			//* Sub-conversation click - toggle accordion
			if (profilePage) {
				setActiveThread(null)
				setIsOpenPopup(false)
			}
			toggle()
		}
	}

	//* Toggles the open state of the accordion with associated business logic
	const toggle = () => {
		setOpen((prevOpen: boolean) => {
			const newState = !prevOpen
			if (!newState && handleOpen) {
				handleOpen()
			}
			if (thread?.threadId && !isMainThread) {
				setActiveThread(newState ? thread : null)
			}
			if (isNewResponse) {
				setIsNewResponse(false)
			}
			if (onToggle) {
				onToggle(newState)
			}

			if (newState) {
				navigateTo({
					urlType: 'threadUrl',
					shallow: true,
					navigationParams: {
						type: isPublic ? 'public' : 'personal',
						chatbot: thread?.chatbot?.name || '',
						category: thread?.chatbot?.categories?.[0]?.category?.name || '',
						domain: thread?.chatbot?.metadata[0]?.domainName || '',
						threadSlug: thread?.slug || (params?.threadSlug as string) || '',
						// threadQuestionSlug: thread?.threadQuestionSlug || '',
					},
				})
			}

			return newState
		})
	}

	return (
		<div className={className} id={`thread-${thread?.threadId}`} {...props}>
			{!disabled && (
				// biome-ignore lint/a11y/useButtonType: <explanation>
				<button
					data-state={open ? 'open' : 'closed'}
					onClick={handleClick}
					className={`flex flex-1 justify-start flex-col relative
            transition-all ease-in-out duration-200
            border-transparent border
            hover:rounded-t-[8px]
            font-medium w-full ${
							open
								? 'dark:border-b-mirage border-b-gray-300'
								: 'dark:hover:border-b-mirage hover:border-b-gray-300 [&>div>div>button]:!hidden'
						} ${triggerClass || ''}`}
				>
					{children[0]}
					{!open && children[1]}
					<ChevronDown
						{...(handleTrigger
							? {
									onClick: (e) => {
										e.stopPropagation()
										handleTrigger()
									},
								}
							: {})}
						className={`${open ? '' : '-rotate-90'} absolute -right-2 !top-1 size-4 shrink-0 mr-4 transition-transform duration-200 ${arrowClass || ''} ${disabled ? 'hidden' : ''}`}
					/>
				</button>
			)}
			{open && (
				<div
					className={`text-sm transition-all border
            ${
							open
								? 'animate-accordion-down dark:border-mirage border-gray-300 !border-t-transparent !border-r-transparent'
								: 'overflow-hidden animate-accordion-up h-0 border-transparent'
						} ${contentClass || ''}`}
				>
					{children[2]}
				</div>
			)}
		</div>
	)
}
