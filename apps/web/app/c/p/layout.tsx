import FooterCT from '@/components/layout/footer/footer-ct'
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
		<main className="relative flex flex-col h-[calc(100vh_-_theme(spacing.16))] overflow-hidden">
			{/* <NextTopLoader color="#1ED761" initialPosition={0.2} /> */}
			<ChatLayoutSection>{children}</ChatLayoutSection>
			<div className="block lg:hidden">
				<FooterCT />
			</div>
		</main>
	)
}
