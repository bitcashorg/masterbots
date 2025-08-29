'use client'

/**
 * ThreadSearchInput Component
 *
 * A unified search input component that can be used for both chat and browse views.
 * It provides search functionality with debouncing, placeholder text management,
 * and thread filtering capabilities.
 */

import { Button } from '@/components/ui/button'
import { IconClose } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { cn } from '@/lib/utils'
import { getCategory } from '@/services/hasura'
import type { ThreadState } from '@/types'
import { debounce } from 'lodash'
import { Search } from 'lucide-react'
import type { Thread } from 'mb-genql'
import React, { useEffect } from 'react'

interface ThreadSearchInputProps {
	// Chat view specific props
	setThreads?: React.Dispatch<React.SetStateAction<ThreadState>>
	onSearch?: (term: string) => void
	// Browse view specific props
	searchTerm?: string
	setSearchTerm?: (term: string) => void
	// Shared props
	isBrowseView?: boolean
	className?: string
	placeholder?: string
}

export function ThreadSearchInput({
	setThreads,
	onSearch,
	searchTerm: externalSearchTerm,
	setSearchTerm: externalSetSearchTerm,
	isBrowseView = false,
	className,
	placeholder: customPlaceholder,
}: ThreadSearchInputProps) {
	const { activeCategory, activeChatbot } = useSidebar()
	const [searchPlaceholder, setSearchPlaceholder] = React.useState<
		string | null
	>(null)
	const [internalSearchTerm, setInternalSearchTerm] = React.useState<string>('')
	const previousThread = React.useRef<Thread[]>([])
	const previousCategory = React.useRef<number | null>(null)

	// Use either external or internal search term based on mode
	const searchTerm = isBrowseView ? externalSearchTerm : internalSearchTerm
	const setSearchTerm = isBrowseView
		? externalSetSearchTerm
		: setInternalSearchTerm

	const handleSearch = (value: string) => {
		setSearchTerm?.(value)
		if (!isBrowseView) {
			onSearch?.(value)
		}
	}

	const clearSearch = () => {
		handleSearch('')
	}

	const searchInThread = (thread: Thread, term: string): boolean => {
		if (!term) return true
		const lowercaseSearch = term.toLowerCase()
		return thread.messages.some(
			(message) =>
				message?.content?.toLowerCase().includes(lowercaseSearch) || false,
		)
	}

	const fetchSearchPlaceholder = async () => {
		if (customPlaceholder) {
			setSearchPlaceholder(customPlaceholder)
		} else if (activeChatbot) {
			setSearchPlaceholder(
				activeChatbot?.name
					.replace(/([A-Z])/g, ' $1')
					.toLowerCase()
					.trimStart(),
			)
		} else if (activeCategory && activeCategory !== previousCategory.current) {
			previousCategory.current = activeCategory
			const getCategoryLabel = await getCategory({ categoryId: activeCategory })
			setSearchPlaceholder(`${getCategoryLabel.name.toLowerCase()} topic`)
		}
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		fetchSearchPlaceholder()
	}, [activeChatbot, activeCategory, customPlaceholder])

	// Handle thread filtering for chat view
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (!setThreads || isBrowseView) return

		const debouncedSearch = debounce(() => {
			setThreads((prevState) => {
				if (!previousThread.current.length) {
					previousThread.current = prevState.threads
				}
				const previousThreadState = previousThread.current
				if (!internalSearchTerm) {
					return {
						...prevState,
						threads: previousThreadState,
						count: previousThreadState.length,
						totalThreads: prevState.totalThreads,
					}
				}
				const filteredThreads = previousThreadState.filter((thread) =>
					searchInThread(thread, internalSearchTerm),
				)
				return {
					...prevState,
					threads: filteredThreads,
					count: filteredThreads.length,
					totalThreads: prevState.totalThreads,
				}
			})
		}, 230)

		debouncedSearch()
		return () => debouncedSearch.cancel()
	}, [internalSearchTerm, isBrowseView])

	return (
		<form
			className={cn(
				'relative w-full max-w-screen-xl mx-auto flex items-center justify-center',
				className,
			)}
		>
			<div className="relative w-full">
				<div className="absolute inset-0 transition-opacity duration-300 rounded-full opacity-0 group-focus-within:opacity-100">
					<div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent/10 to-accent/10 blur-lg animate-pulse" />
				</div>

				<div
					className={cn(
						'group relative w-full flex items-center',
						'rounded-full',
						'bg-background/60',
						'border border-accent/10',
						'focus-within:border-accent',
						'focus-within:ring-1 focus-within:ring-accent',
						'transition-all duration-200',
					)}
				>
					<Search className="absolute w-5 h-5 left-4 text-zinc-400 group-focus-within:text-accent" />
					<Input
						value={searchTerm}
						onChange={(e) => handleSearch(e.target.value)}
						placeholder={
							customPlaceholder ||
							`Search all messages in ${searchPlaceholder ? searchPlaceholder : 'any topic'}...`
						}
						className={cn(
							'w-full px-12 py-6',
							'bg-transparent',
							'placeholder:text-zinc-400',
							'text-base dark:text-zinc-100',
							'border-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0',
							'rounded-full',
						)}
					/>
					{searchTerm && (
						<Button
							type="reset"
							variant="ghost"
							onClick={clearSearch}
							className={cn(
								'absolute right-2',
								'size-8 p-0',
								'hover:bg-zinc-800/50',
								'rounded-full',
							)}
							aria-label="Clear search"
						>
							<IconClose className="w-4 h-4" />
						</Button>
					)}
				</div>
			</div>
		</form>
	)
}
