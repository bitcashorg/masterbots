import { CategoryDashboard } from '@/components/shared/category-dashboard'
import { BrowseProvider } from '@/lib/hooks/use-browse'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { cn, getRouteType } from '@/lib/utils'
import { usePathname } from 'next/navigation'

interface BrowseLayoutProps {
	children: React.ReactNode
}

;('use client')
function ProfileLayoutContent({ children }: { children: React.ReactNode }) {
	const { isDashboardOpen, setIsDashboardOpen, allCategories } = useSidebar()
	const pathname = usePathname()
	const routeType = getRouteType(pathname)

	return (
		<>
			{isDashboardOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
					<CategoryDashboard
						isOpen={isDashboardOpen}
						onClose={() => setIsDashboardOpen(false)}
						categories={allCategories}
					/>
				</div>
			)}
			<main className="flex flex-col h-[calc(100vh-theme(spacing.16))]">
				<section
					className="w-full overflow-auto group scrollbar"
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
