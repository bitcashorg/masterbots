import { ResponsiveSidebar } from '@/components/layout/sidebar/sidebar-responsive'
import { ChatLayoutSection } from '@/components/routes/chat/chat-layout-section'
import { BrowseProvider } from '@/lib/hooks/use-browse'

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
			<main className="relative flex flex-col h-[calc(100vh-4rem)] overflow-hidden">
				{/* <NextTopLoader color="#1ED761" initialPosition={0.2} /> */}
				<ResponsiveSidebar />
				<ChatLayoutSection>{children}</ChatLayoutSection>
				{/* <FooterCT /> */}
			</main>
		</BrowseProvider>
	)
}
