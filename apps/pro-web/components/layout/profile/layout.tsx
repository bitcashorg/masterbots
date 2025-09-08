'use client'

import { Hero } from '@/components/layout/profile/hero'
import { UserProfileSidebar } from '@/components/layout/profile/profile-page-sidebar'
import { CategoryDashboard } from '@/components/shared/category-dashboard'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { cn, getRouteType } from '@/lib/utils'
import type { User } from 'mb-genql'
import { usePathname } from 'next/navigation'
import NextTopLoader from 'nextjs-toploader'

export function ProfileLayoutContent({
	children,
	user,
}: {
	children: React.ReactNode
	user: User
}) {
	const { isDashboardOpen, setIsDashboardOpen, allCategories } = useSidebar()
	const pathname = usePathname()
	const routeType = getRouteType(pathname)

	return (
		<>
			<NextTopLoader color="#1ED761" initialPosition={0.2} />
			<section className={cn('flex flex-col')} id="thread-scroll-section">
				<Hero user={user as User} />
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
