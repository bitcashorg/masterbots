import { SidebarItems } from '@/components/layout/sidebar/sidebar-items'
import { ThemeToggle } from '@/components/shared/theme-toggle'
// @ts-ignore
import { cache } from 'react'

interface SidebarListProps {
	userId?: string
	children?: React.ReactNode
}

const loadChats = cache(async (userId?: string) => {
	return []
})

export async function SidebarList({ userId }: SidebarListProps) {
	const chats = await loadChats(userId)

	return (
		<div className="flex flex-col flex-1 overflow-hidden">
			<div className="flex-1 overflow-auto">
				{chats?.length ? (
					<div className="px-2 space-y-2">
						<SidebarItems chats={chats} />
					</div>
				) : (
					<div className="p-8 text-center">
						<p className="text-sm text-muted-foreground">No chat history</p>
					</div>
				)}
			</div>
			<div className="flex items-center justify-between p-4">
				<ThemeToggle />
			</div>
		</div>
	)
}
