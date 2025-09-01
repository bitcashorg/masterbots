import { Providers } from '@/components/layout/providers'
import { ResponsiveSidebar } from '@/components/layout/sidebar/sidebar-responsive'
import { DashboardOnboarding } from '@/components/onboarding/dashboard-onboarding'
import { ChatLayoutSection } from '@/components/routes/chat/chat-layout-section'
import { BrowseProvider } from '@/lib/hooks/use-browse'
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
		<BrowseProvider>
			<Providers>
				<main className="relative flex flex-col h-[calc(100vh-4rem)] overflow-hidden">
					<DashboardOnboarding />
					{/* <NextTopLoader color="#1ED761" initialPosition={0.2} /> */}
					<ResponsiveSidebar />
					<ChatLayoutSection>{children}</ChatLayoutSection>
				</main>
			</Providers>
		</BrowseProvider>
	)
}
