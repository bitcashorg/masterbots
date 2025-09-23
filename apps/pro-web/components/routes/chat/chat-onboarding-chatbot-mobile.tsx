import { Card, CardHeader } from '@/components/ui/card'
import { getRouteType } from '@/lib/utils'
import { PanelLeft } from 'lucide-react'
import { usePathname } from 'next/navigation'

export function OnboardingMobileView() {
	const pathname = usePathname()
	const routeType = getRouteType(pathname)
	// Background image class
	const bgImage = 'bg-[url(/background.webp)] dark:bg-[url(/background.webp)]'

	// Get appropriate CTA text based on route type
	const getCTAText = () => {
		if (routeType === 'org' || routeType === 'bot') {
			return 'Browse and select a bot to explore conversations'
		}
		return 'Go To Sidebar And Select One Bot'
	}

	return (
		<div
			className="md:hidden mt-10 mid:h-[calc(50vh-196px)] flex items-center justify-center -translate-y-8"
			data-route={routeType}
		>
			<Card className="w-full relative overflow-hidden border-2 shadow-lg backdrop-blur-sm bg-white/95 dark:bg-[#09090B]/95 transition-all duration-300 ease-in-out hover:shadow-xl">
				{/* Background image layer */}
				<div
					className={`absolute inset-0 rounded-md bg-center bg-cover opacity-20 ${bgImage}`}
				/>
				<CardHeader>
					<div className="flex flex-col gap-4">
						<div className="px-4 pt-2.5">
							<h1 className="text-xl font-bold text-zinc-950 dark:text-gray-300">
								Welcome to Masterbots!
							</h1>
						</div>
						<div className="h-[3px] bg-zinc-200 dark:bg-slate-800" />

						<div className="flex flex-col justify-center gap-4 px-4">
							<p className="w-full min-h-24">
								Here you can create new threads and share them to your network!
								Navigate with the sidebar and pick any bot of your interest.
							</p>
						</div>
						<div className="flex font-semibold w-full items-center p-4 gap-4">
							<PanelLeft className="size-6 selected-bot-text" />
							<p className="text-sm selected-bot-text">{getCTAText()}</p>
						</div>
					</div>
				</CardHeader>
			</Card>
		</div>
	)
}
