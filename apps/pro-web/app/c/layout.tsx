import { DashboardOnboarding } from '@/components/onboarding/dashboard-onboarding'

import { BrowseProvider } from '@/lib/hooks/use-browse'
import { MainContentSkeleton, SidebarSkeleton } from '@masterbots/mb-ui'
import { Skeleton } from '@masterbots/mb-ui'
import dynamic from 'next/dynamic'

const ResponsiveSidebar = dynamic(
	() =>
		import('@/components/layout/sidebar/sidebar-responsive').then(
			(mod) => mod.ResponsiveSidebar,
		),
	{
		loading: () => <SidebarSkeleton />,
	},
)
const ChatLayoutSection = dynamic(
	() =>
		import('@/components/routes/chat/chat-layout-section').then(
			(mod) => mod.ChatLayoutSection,
		),
	{
		loading: () => (
			<div className="flex h-screen">
				<div className="flex-1 mt-16">
					<Skeleton className="size-full absolute inset-0 z-0 opacity-80" />
				</div>
			</div>
		),
	},
)

interface ChatLayoutProps {
	children: React.ReactNode
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
	return (
		// * Wrapping with Browse provider due to the use of the browse hook
		// * in the sidebar link component
		// * This is a workaround for the issue with the use of the browse hook
		// ! We should find a better solution for this in the future for chats or rename hook for better understanding
		<BrowseProvider>
			<DashboardOnboarding />
			{/* <NextTopLoader color="#1ED761" initialPosition={0.2} /> */}
			<ResponsiveSidebar />
			<ChatLayoutSection>{children}</ChatLayoutSection>
			{/* <FooterCT /> */}
		</BrowseProvider>
	)
}
