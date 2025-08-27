'use client'

import * as React from 'react'

const ONBOARDING_SEEN_KEY = 'dashboard-onboarding-seen'

export function useOnboarding() {
	const markSeen = React.useCallback(() => {
		try {
			if (typeof window !== 'undefined') {
				localStorage.setItem(ONBOARDING_SEEN_KEY, 'true')
			}
		} catch {}
	}, [])

	return { markSeen }
}
