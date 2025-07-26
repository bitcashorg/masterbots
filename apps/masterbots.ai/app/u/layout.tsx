'use client'

import { CategoryDashboard } from '@/components/shared/category-dashboard'
import { BrowseProvider } from '@/lib/hooks/use-browse'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { getRouteType } from '@/lib/utils'
import { usePathname } from 'next/navigation'

interface BrowseLayoutProps {
	children: React.ReactNode
}

function ProfileLayoutContent({ children }: { children: React.ReactNode }) {
	const { isDashboardOpen, setIsDashboardOpen, allCategories } = useSidebar()
	const pathname = usePathname()
	const routeType = getRouteType(pathname)

	return (
		<>
			{isDashboardOpen && (
				<div className="flex fixed inset-0 z-50 justify-center items-center backdrop-blur-sm bg-black/50">
					<CategoryDashboard
						isOpen={isDashboardOpen}
						onClose={() => setIsDashboardOpen(false)}
						categories={allCategories}
					/>
				</div>
			)}
			<main className="flex flex-col h-[calc(100vh-theme(spacing.16))]">
				<section
					className="overflow-auto w-full group scrollbar"
					id="thread-scroll-section"
				>
					{children}
				</section>
			</main>
		</>
	)
}

export default async function ProfileLayout({ children }: BrowseLayoutProps) {
	return (
		<BrowseProvider>
			{/* <NextTopLoader color="#1ED761" initialPosition={0.2} /> */}
			<ProfileLayoutContent>{children}</ProfileLayoutContent>
		</BrowseProvider>
	)
}
