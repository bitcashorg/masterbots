'use client'

//* ChatLayoutSection component renders a chat layout with conditional popup and responsive styling.

import { ThreadPopup } from '@/components/routes/thread/thread-popup'
import { CategoryDashboard } from '@/components/shared/category-dashboard'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { cn, getRouteType } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import type * as React from 'react'

//* ChatLayoutSection provides the main chat area layout with optional thread popup and responsive styling.
export function ChatLayoutSection({ children }: { children: React.ReactNode }) {
	const { sectionRef, isOpenPopup } = useThread()
	const { activeChatbot, isDashboardOpen, setIsDashboardOpen, allCategories } =
		useSidebar()
	const pathname = usePathname()
	const isOrg = getRouteType(pathname) === 'org'
	const chatClassNames = activeChatbot
		? 'max-h-[97vh]'
		: 'max-h-[calc(97vh-26px)]'

	return (
		<>
			{isDashboardOpen && (
				<div className="flex fixed inset-0 z-50 justify-center items-center backdrop-blur-sm bg-black/50">
					<CategoryDashboard
						isOpen={isDashboardOpen}
						onClose={() => setIsDashboardOpen(false)}
						categories={allCategories}
					/>
				</div>
			)}
			<section
				ref={sectionRef as React.Ref<HTMLDivElement>}
				className={cn(
					isOrg ? 'max-h-full md:max-h-[calc(97vh-100px)]' : chatClassNames,
					'flex h-full group w-full overflow-auto animate-in duration-300 ease-in-out relative',
					'lg:w-[calc(100%-250px)] xl:w-[calc(100%-300px)] lg:ml-[250px] xl:ml-[300px]',
					'scrollbar',
				)}
			>
				<div className="flex flex-col gap-5 px-4 pt-5 mx-auto w-full max-w-screen-xl h-full md:px-10">
					{children}
				</div>
				{isOpenPopup && <ThreadPopup />}
			</section>
		</>
	)
}
