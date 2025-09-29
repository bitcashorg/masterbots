'use client'

import FooterCT from '@/components/layout/footer/footer-ct'
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
	userId,
}: React.ComponentProps<'div'> & { page?: string; userId?: string }) {
	const { isSidebarOpen, isLoading } = useSidebar()
	const prevPathRef = React.useRef(usePathname())
	const pathname = usePathname()
	const { setActiveThread, setIsOpenPopup } = useThread()
	const rootAndChatRegex = /^\/(?:c)?$/
	const isBrowse = !/^\/(?:c|u)(?:\/|$)/.test(pathname)
	const isProfile = /^\/u\/.*\/t/.test(pathname)

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
					'min-h-[inherit] h-full flex flex-col z-[60]',
					isBrowse || isProfile
						? 'bg-[#eeffea] dark:bg-[#000000]' // For /c and /u routes only
						: 'bg-[#fae8ff] dark:bg-[#000000]', // For other routes
				)}
				id={`${userId}_sidebar`}
			>
				<SidebarHeader userId={userId} />
				<nav className="pt-4 pb-20 size-full scrollbar">
					<SidebarCategoryGeneral page={page} />
				</nav>
				<FooterCT className="flex border-t md:hidden border-mirage" fixed />
			</aside>
		</>
	)
}

export default Sidebar
