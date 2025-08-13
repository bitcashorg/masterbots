import {
	MainContentSkeleton,
	SidebarSkeleton,
} from '@/components/shared/skeletons/chat-page-skeleton'
import { Skeleton } from '@/components/ui/skeleton'
import { BrowseProvider } from '@/lib/hooks/use-browse'
import dynamic from 'next/dynamic'

const ResponsiveSidebar = dynamic(() =>
	import('@/components/layout/sidebar/sidebar-responsive').then(
		(mod) => mod.ResponsiveSidebar,
	),
)
const ChatLayoutSection = dynamic(() =>
	import('@/components/routes/chat/chat-layout-section').then(
		(mod) => mod.ChatLayoutSection,
	),
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
			{/* <NextTopLoader color="#1ED761" initialPosition={0.2} /> */}
			<ResponsiveSidebar />
			<ChatLayoutSection>{children}</ChatLayoutSection>
			{/* <FooterCT /> */}
		</BrowseProvider>
	)
}
