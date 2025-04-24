'use client'

import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { useThreadVisibility } from '@/lib/hooks/use-thread-visibility'
import { urlBuilders } from '@/lib/url'
import { getRouteType } from '@/lib/utils'
import type { Thread } from 'mb-genql'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

export function ProfileAvatar({ thread }: { thread: Thread }) {
	const pathname = usePathname()
	// TODO: use a better way to get the route type. Only one!
	const { isPublic, isAdminMode } = useThreadVisibility()
	const routeType = getRouteType(pathname)

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const userProfileUrl = useMemo(
		() =>
			urlBuilders.profilesUrl({
				type: 'user',
				usernameSlug: thread.user?.slug as string,
			}),
		[],
	)

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const threadThumbnail = useMemo(
		() =>
			thread?.user?.profilePicture ||
			`https://robohash.org/${thread?.user?.username}?bgset=bg2`,
		[],
	)

	return (
		<Tooltip>
			<TooltipTrigger>
				{(routeType.match(/(public|bot)/) || isAdminMode) && (
					<Link
						className="flex transition-all w-16 h-full opacity-100 hover:opacity-80"
						href={userProfileUrl}
						onClick={(e) => {
							e.stopPropagation()
						}}
						prefetch
					>
						<Image
							className="object-cover size-full rounded-r-lg"
							src={threadThumbnail}
							alt={thread.slug}
							width={72}
							height={72}
						/>
					</Link>
				)}
			</TooltipTrigger>
			<TooltipContent
				className="bg-background px-2.5 py-1.5 rounded-lg"
				id={`chatbot-avatar-tooltip-${thread.chatbot.name || 'Default BotAvatar'}`}
				side="top"
				align="end"
			>
				Go to {thread.user?.username}
			</TooltipContent>
		</Tooltip>
	)
}
