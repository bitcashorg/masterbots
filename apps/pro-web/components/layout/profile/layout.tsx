'use client'

import { Hero } from '@/components/layout/profile/hero'
import { UserProfileSidebar } from '@/components/layout/profile/profile-page-sidebar'
import { CategoryDashboard } from '@/components/shared/category-dashboard'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { cn } from '@/lib/utils'
import { getUserBySlug } from '@/services/hasura'
import type { User } from 'mb-genql'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import NextTopLoader from 'nextjs-toploader'
import React from 'react'

export function ProfileLayoutContent({
	children,
	user,
}: {
	children: React.ReactNode
	user: User
}) {
	const { isDashboardOpen, setIsDashboardOpen, allCategories } = useSidebar()

	// get the user slug from the URL
	const params = useParams()
	const userSlug = params?.userSlug as string
	const { data: session } = useSession()
	const [userData, setUserData] = React.useState<User | null>(user)

	async function getUser() {
		if (!userSlug.trim()) return null

		try {
			const sessionSlug = session?.user.slug
				? session?.user.slug.toLowerCase()
				: session?.user.name?.toLowerCase()

			const userInfo = await getUserBySlug({
				slug: userSlug,
				isSameUser: sessionSlug === userSlug,
			})
			console.log({
				userInfo,
			})
			if (!userInfo) {
				throw new Error('User not found')
			}
			setUserData(userInfo?.user as User)
		} catch (error) {
			console.error('Failed to fetch user info:', error)
			throw error
		}
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	React.useEffect(() => {
		if (user) return
		getUser()
	}, [userSlug, session])

	return (
		<>
			<NextTopLoader color="#1ED761" initialPosition={0.2} />
			<section className={cn('flex flex-col')} id="thread-scroll-section">
				<Hero user={userData as User} />
				<UserProfileSidebar>
					{isDashboardOpen && (
						<div className="flex fixed right-0 top-0 bottom-0 z-50 justify-center items-center backdrop-blur-sm bg-black/50 lg:w-[calc(100%-250px)] xl:w-[calc(100%-300px)]">
							<CategoryDashboard
								isOpen={isDashboardOpen}
								onClose={() => setIsDashboardOpen(false)}
								categories={allCategories}
							/>
						</div>
					)}
					<div className="h-full px-4 md:px-10">{children}</div>
				</UserProfileSidebar>
			</section>
		</>
	)
}
