import FooterCT from '@/components/layout/footer/footer-ct'
import { ProChatProviders } from '@/components/layout/providers'
import { ResponsiveSidebar } from '@/components/layout/sidebar/sidebar-responsive'
import { ChatLayoutSection } from '@/components/routes/chat/chat-layout-section'
import { appConfig } from 'mb-env'
import { redirect } from 'next/navigation'

interface ChatLayoutProps {
	children: React.ReactNode
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
	if (!appConfig.features.devMode) {
		console.error('Navigation to Pro is disabled. No access to this page')
		redirect('/')
	}

	return (
		<ProChatProviders>
			<main className="relative flex flex-col h-[calc(100vh-4rem)] overflow-hidden">
				{/* <NextTopLoader color="#1ED761" initialPosition={0.2} /> */}
				<ResponsiveSidebar />
				<ChatLayoutSection>{children}</ChatLayoutSection>
				<div className="block lg:hidden">
					<FooterCT />
				</div>
			</main>
		</ProChatProviders>
	)
}
