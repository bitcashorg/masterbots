import { ResponsiveSidebar } from '@/components/layout/sidebar/sidebar-responsive'
import { ChatLayoutSection } from '@/components/routes/chat/chat-layout-section'
import NextTopLoader from 'nextjs-toploader'

interface ChatLayoutProps {
	children: React.ReactNode
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
	return (
		<main className="relative flex flex-col h-[calc(100vh-4rem)] overflow-hidden">
			<NextTopLoader color="#1ED761" initialPosition={0.2} />
			<ResponsiveSidebar />
			<ChatLayoutSection>{children}</ChatLayoutSection>
			{/* <FooterCT /> */}
		</main>
	)
}
