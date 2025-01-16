import FooterCT from '@/components/layout/footer/footer-ct'
import { ResponsiveSidebar } from '@/components/layout/sidebar/sidebar-responsive'
import { ChatLayoutSection } from '@/components/routes/chat/chat-layout-section'
import { BrowseProvider } from '@/lib/hooks/use-browse'
import NextTopLoader from 'nextjs-toploader'

interface BrowseLayoutProps {
	children: React.ReactNode
}

export default async function BrowseLayout({ children }: BrowseLayoutProps) {
	return (
		<BrowseProvider>
			<section className="flex flex-col w-full h-[calc(100vh-theme(spacing.16))]">
				<NextTopLoader color="#1ED761" initialPosition={0.2} />
				<ResponsiveSidebar />
				<ChatLayoutSection>{children}</ChatLayoutSection>
				<FooterCT />
			</section>
		</BrowseProvider>
	)
}
