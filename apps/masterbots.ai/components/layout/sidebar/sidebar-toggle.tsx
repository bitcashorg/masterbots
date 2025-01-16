'use client'

import { Button } from '@/components/ui/button'
import { IconSidebar } from '@/components/ui/icons'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import * as React from 'react'

export function SidebarToggle() {
	const { toggleSidebar } = useSidebar()

	return (
		<Button
			variant="ghost"
			className="flex p-0 -ml-2 size-9 lg:hidden"
			onClick={(e) => {
				e.stopPropagation()
				toggleSidebar()
			}}
		>
			<IconSidebar className="size-6" />
			<span className="sr-only">Toggle Sidebar</span>
		</Button>
	)
}
