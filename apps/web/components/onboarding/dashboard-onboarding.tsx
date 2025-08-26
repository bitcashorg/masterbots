'use client'

import { usePathname } from 'next/navigation'
import { useNextStep } from 'nextstepjs'
import { useCallback, useEffect, useState } from 'react'

interface DashboardOnboardingProps {
	userId?: string
	onComplete?: () => void
}

export function DashboardOnboarding({
	userId,
	onComplete,
}: DashboardOnboardingProps) {
	const [hasShownOnboarding, setHasShownOnboarding] = useState(false)
	const pathname = usePathname()
	const isChatRoute = /^\/c(?:\/|$)/.test(pathname)
	const { startNextStep, currentTour, isNextStepVisible } = useNextStep()

	// Handle completion when tour ends
	const handleComplete = useCallback(() => {
		if (userId) {
			localStorage.setItem(`dashboard-onboarding-${userId}`, 'true')
		}
		onComplete?.()
	}, [userId, onComplete])

	// Monitor tour completion
	useEffect(() => {
		if (
			currentTour === 'dashboardOnboarding' &&
			!isNextStepVisible &&
			hasShownOnboarding
		) {
			handleComplete()
		}
	}, [currentTour, isNextStepVisible, hasShownOnboarding, handleComplete])

	useEffect(() => {
		// Check if user is on /c route and hasn't seen onboarding
		if (isChatRoute && userId && !hasShownOnboarding) {
			const hasSeenOnboarding = localStorage.getItem(
				`dashboard-onboarding-${userId}`,
			)
			if (!hasSeenOnboarding) {
				// Small delay to ensure the DOM elements are rendered
				const timer = setTimeout(() => {
					startNextStep('dashboardOnboarding')
					setHasShownOnboarding(true)
				}, 1000)

				return () => clearTimeout(timer)
			}
		}
	}, [isChatRoute, userId, hasShownOnboarding, startNextStep])

	// This component doesn't render anything visible,
	// it just triggers the tour when conditions are met
	return null
}
