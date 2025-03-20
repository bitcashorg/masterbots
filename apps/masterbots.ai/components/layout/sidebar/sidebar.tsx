'use client'

import { SidebarCategoryGeneral } from '@/components/layout/sidebar/sidebar-category-general'
import { SidebarHeader } from '@/components/layout/sidebar/sidebar-header'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import React from 'react'

export function Sidebar({
	className,
	page,
}: React.ComponentProps<'div'> & { page?: string }) {
	const { isSidebarOpen, isLoading } = useSidebar()
	const prevPathRef = React.useRef(usePathname())
	const pathname = usePathname()
	const { setActiveThread, setIsOpenPopup } = useThread()
	const rootAndChatRegex = /^\/(?:c)?$/
	const isBrowse = !/^\/(?:c|u)(?:\/|$)/.test(pathname)

	const resetState = () => {
		setActiveThread(null)
		setIsOpenPopup(false)
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	React.useEffect(() => {
		if (rootAndChatRegex.test(pathname)) {
			resetState()
		}
		prevPathRef.current = pathname
	}, [pathname])

	if (isLoading) return null

	return (
		<>
			<aside
				data-state={isSidebarOpen ? 'open' : 'closed'}
				className={cn(
					className,
					'h-full flex flex-col z-40',
					!isBrowse
						? 'bg-[#fae8ff] dark:bg-[#000000]' // For /c routes only
						: 'bg-[#eeffea] dark:bg-[#000000]', // For other routes
				)}
			>
				<SidebarHeader />
				<div className="pt-4 pb-20 h-full scrollbar">
					<SidebarCategoryGeneral page={page} />
				</div>
			</aside>
		</>
	)
}

export default Sidebar
