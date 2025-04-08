import FooterCT from '@/components/layout/footer/footer-ct'
import { BotPopup } from '@/components/routes/bot/bot-popup'
import { BrowseProvider } from '@/lib/hooks/use-browse'

interface BrowseLayoutProps {
	children: React.ReactNode
}

export default async function BrowseLayout({ children }: BrowseLayoutProps) {
	return (
		<BrowseProvider>
			{/* <NextTopLoader color="#1ED761" initialPosition={0.2} /> */}
			<div className="flex flex-col h-[calc(100vh-theme(spacing.16))] overflow-auto scrollbar">
				<section className="w-full group">{children}</section>
				<FooterCT className="lg:ml-0 lg:w-full" />
				<BotPopup />
			</div>
		</BrowseProvider>
	)
}
