'use client'

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
	const { data: _session } = useSession()
	const { selectedCategories, isLoaded: isCategoryStorageLoaded } =
		useCategorySelections()

	const [showOnboarding, setShowOnboarding] = React.useState(false)

	React.useEffect(() => {
		if (!isCategoryStorageLoaded || typeof window === 'undefined') return

		const hasSeen =
			window.localStorage.getItem('hasSeenDashboardOnboarding') === 'true'

		// Only show if never seen and no topics chosen yet
		setShowOnboarding(!hasSeen && selectedCategories.length === 0)
	}, [isCategoryStorageLoaded, selectedCategories.length])

	const markSeen = React.useCallback(() => {
		if (typeof window !== 'undefined') {
			window.localStorage.setItem('hasSeenDashboardOnboarding', 'true')
		}
		setShowOnboarding(false)
	}, [])

	return { showOnboarding, markSeen }
}

export default useOnboarding
