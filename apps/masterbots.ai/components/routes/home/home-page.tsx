'use client'

import BrowseList from '@/components/routes/browse/browse-list'
import { OnboardingSection } from '@/components/shared/onboarding-section'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import type { HomePageProps } from '@/types/types'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function HomePage({
	initialThreads,
	initialCount,
}: HomePageProps) {
	const { data: session } = useSession()
	const { selectedCategories, setSelectedCategories } = useSidebar()
	const [showOnboarding, setShowOnboarding] = useState(true)
	const [hasInitialized, setHasInitialized] = useState(false)

	//? Clear stored selections for new non-logged users
	useEffect(() => {
		if (!session?.user && !hasInitialized) {
			setSelectedCategories([])
			setHasInitialized(true)
		}
	}, [session?.user, hasInitialized, setSelectedCategories])

	//? Show onboarding section for non-logged-in users
	if (!session?.user) {
		if (!showOnboarding && selectedCategories.length > 0) {
			return (
				<BrowseList
					initialThreads={initialThreads}
					initialCount={initialCount}
					disableOnboarding={true}
				/>
			)
		}

		if (!showOnboarding && selectedCategories.length === 0) {
			return (
				<div className="flex flex-col gap-3 py-5 w-full">
					<div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
						<div className="text-center">
							<h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
								Welcome to Masterbots.ai
							</h2>
							<p className="mb-6 text-gray-600 dark:text-gray-400">
								Please select some topics to get started
							</p>
							<button
								type="button"
								onClick={() => setShowOnboarding(true)}
								className="px-6 py-3 text-white bg-green-600 rounded-lg transition-colors hover:bg-green-700"
							>
								Select Topics
							</button>
						</div>
					</div>
				</div>
			)
		}

		//? Show onboarding section
		return (
			<div className="flex flex-col gap-3 py-5 w-full">
				<OnboardingSection
					isOpen={showOnboarding}
					onClose={() => setShowOnboarding(false)}
				/>
			</div>
		)
	}

	//? Show regular browse list for logged-in users
	return (
		<BrowseList initialThreads={initialThreads} initialCount={initialCount} />
	)
}
