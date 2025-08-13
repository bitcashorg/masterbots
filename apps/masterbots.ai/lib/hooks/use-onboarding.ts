'use client'

import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { useSession } from 'next-auth/react'
import * as React from 'react'
import { useCategorySelections } from './use-category-selections'

/**
 * useOnboarding
 * Controls whether to show the dashboard onboarding tour to the user.
 * Rules:
 * - Show only if user has never seen it (localStorage flag not set)
 * - AND there are no selected categories yet (truly new experience)
 * - Wait for category selections storage to load to avoid flicker
 */
export function useOnboarding() {
	const { data: session } = useSession()
	const { selectedCategories, isLoaded: isCategoryStorageLoaded } =
		useCategorySelections()

	const [showOnboarding, setShowOnboarding] = React.useState(false)
	const [sidebarState, setSidebarState] = React.useState<string | null>(null)

	// Watch for sidebar state changes
	React.useLayoutEffect(() => {
		let observer: MutationObserver
		const timeout = setTimeout(() => {
			const $sidebar = document.querySelector('aside[id$=_sidebar]') as
				| HTMLElement
				| undefined
			if (!$sidebar) return

			// Set initial state
			setSidebarState($sidebar.dataset.state || null)

			// Create observer to watch for data-state attribute changes
			observer = new MutationObserver((mutations) => {
				for (const mutation of mutations) {
					if (
						mutation.type === 'attributes' &&
						mutation.attributeName === 'data-state'
					) {
						const newState = ($sidebar as HTMLElement).dataset.state || null
						setSidebarState(newState)
					}
				}
			})

			// Start observing
			observer.observe($sidebar, {
				attributes: true,
				attributeFilter: ['data-state'],
			})

			clearTimeout(timeout)
		}, 1750)

		return () => observer?.disconnect()
	}, [])

	React.useEffect(() => {
		if (!isCategoryStorageLoaded || typeof window === 'undefined') return

		const hasSeen =
			window.localStorage.getItem('hasSeenDashboardOnboarding') === 'true'
		const isSidebarOpen = sidebarState === 'open'

		// Only show if never seen and no topics chosen yet
		setShowOnboarding(
			!hasSeen && selectedCategories.length === 0 && isSidebarOpen,
			// !hasSeen && selectedCategories.length === 0,
		)
	}, [isCategoryStorageLoaded, selectedCategories.length, sidebarState])

	const markSeen = React.useCallback(() => {
		if (typeof window !== 'undefined') {
			window.localStorage.setItem('hasSeenDashboardOnboarding', 'true')
		}
		setShowOnboarding(false)
	}, [])

	return { showOnboarding, markSeen }
}

export default useOnboarding
