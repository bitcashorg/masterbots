import { BrowseProvider } from '@/lib/hooks/use-browse'

interface BrowseLayoutProps {
	children: React.ReactNode
}

export default async function ProfileLayout({ children }: BrowseLayoutProps) {
	return (
		<BrowseProvider>
			{/* <NextTopLoader color="#1ED761" initialPosition={0.2} /> */}
			<main className="flex flex-col h-[calc(100vh-theme(spacing.16))]">
				<section
					className="w-full overflow-auto group scrollbar"
					id="thread-scroll-section"
				>
					{children}
				</section>
			</main>
		</BrowseProvider>
	)
}
