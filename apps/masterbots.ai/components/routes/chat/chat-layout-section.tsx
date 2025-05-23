'use client'

//* ChatLayoutSection component renders a chat layout with conditional popup and responsive styling.

import { ThreadPopup } from '@/components/routes/thread/thread-popup'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { cn, getRouteType } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import type * as React from 'react'

//* ChatLayoutSection provides the main chat area layout with optional thread popup and responsive styling.
export function ChatLayoutSection({ children }: { children: React.ReactNode }) {
	const { sectionRef, isOpenPopup } = useThread()
	const { activeChatbot } = useSidebar()
	const pathname = usePathname()
	const isPublic = getRouteType(pathname) === 'public'
	const chatClassNames = activeChatbot
		? 'max-h-[calc(97vh-210px)] md:max-h-[calc(97vh-182px)]'
		: 'max-h-[calc(97vh-26px)]'

	return (
		<section
			ref={sectionRef as React.Ref<HTMLDivElement>}
			className={cn(
				isPublic
					? 'max-h-[calc(97vh-156px)] md:max-h-[calc(97vh-100px)]'
					: chatClassNames,
				'flex h-full group w-full overflow-auto animate-in duration-300 ease-in-out relative',
				'lg:w-[calc(100%-250px)] xl:w-[calc(100%-300px)] lg:ml-[250px] xl:ml-[300px]',
				'scrollbar',
			)}
		>
			<div className="flex flex-col w-full max-w-screen-xl gap-10 px-4 pt-5 mx-auto h-full md:px-10">
				{children}
			</div>

			{isOpenPopup && <ThreadPopup />}
		</section>
	)
}
