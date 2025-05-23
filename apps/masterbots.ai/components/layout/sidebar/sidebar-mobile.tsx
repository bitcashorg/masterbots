'use client'

import { Sidebar } from '@/components/layout/sidebar/sidebar'
import { Button } from '@/components/ui/button'
import { IconSidebar } from '@/components/ui/icons'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

interface SidebarMobileProps {
	children: React.ReactNode
}

export function SidebarMobile({ children }: SidebarMobileProps) {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="ghost" className="flex p-0 -ml-2 size-9 lg:hidden">
					<IconSidebar className="size-6" />
					<span className="sr-only">Toggle Sidebar</span>
				</Button>
			</SheetTrigger>
			<SheetContent className="inset-y-0 flex h-auto w-[300px] flex-col p-0">
				<Sidebar className="flex">{children}</Sidebar>
			</SheetContent>
		</Sheet>
	)
}
