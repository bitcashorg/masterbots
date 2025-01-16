'use client'

import { SidebarCategoryGeneral } from '@/components/layout/sidebar/sidebar-category-general'
import { SidebarHeader } from '@/components/layout/sidebar/sidebar-header'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import React from 'react'

export function Sidebar({ className }: React.ComponentProps<'div'>) {
	const { isSidebarOpen, isLoading } = useSidebar()
	const prevPathRef = React.useRef(usePathname())
	const pathname = usePathname()
	const { setActiveThread, setIsOpenPopup } = useThread()
	const rootAndChatRegex = /^\/(?:c)?$/

	React.useEffect(() => {
		if (rootAndChatRegex.test(pathname)) {
			setActiveThread(null)
			setIsOpenPopup(false)
		}
		prevPathRef.current = pathname
	}, [pathname])

	if (isLoading) return null

	return (
		<>
			<aside
				data-state={isSidebarOpen ? 'open' : 'closed'}
				className={cn(className, 'h-full flex flex-col dark:bg-zinc-950 z-40')}
			>
				<div className="overflow-y-auto scrollbar h-[calc(100%-113px)]">
					<SidebarHeader />
					<div className="grow p-4 overflow-y-auto scrollbar">
						<SidebarCategoryGeneral />
					</div>
				</div>
			</aside>
		</>
	)
}
