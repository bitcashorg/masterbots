'use client'

/**
 * BrowseUserDetails Component
 *
 * This component displays detailed information about a specific user, including their username and the number of threads associated with them.
 * It fetches the number of threads for the user from the backend service and presents the user's profile picture.
 *
 * Props:
 * - user: An optional User object containing details about the user, including their username and profile picture.
 *
 * ss
 * Key Features:
 * - Dynamic Thread Count: Fetches and displays the number of threads associated with the user.
 * - Responsive Design: Utilizes Tailwind CSS for styling and layout.
 * - Conditional Rendering: Displays user details only if the user data is available.
 * - Image Handling: Displays the user's profile picture with a fallback for missing images.
 */

import { Separator } from '@/components/ui/separator'
import { getBrowseThreads } from '@/services/hasura'
import type { User } from 'mb-genql'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function BrowseChatbotDetails({ user }: { user?: User | null }) {
	const [threadNum, setThreadNum] = useState(0)
	const getThreadByUserName = async () => {
		const threads = await getBrowseThreads({
			slug: user?.slug,
		})
		setThreadNum(threads.length)
	}
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		getThreadByUserName()
	}, [])
	return (
		<div className="relative bg-cover py-10 bg-gradient-to-l from-mirage via-[#2B5D91] to-[#388DE2]">
			<div className="max-w-[600px] w-full mx-auto px-4">
				<Link className="flex items-center mb-6 space-x-1" href="/">
					{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
					<svg
						aria-label="Back arrow"
						width="11"
						height="12"
						viewBox="0 0 11 12"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M7.09973 2.15008L3.24979 6.00003L7.09973 9.84998"
							stroke="#FAFAFA"
							strokeWidth="0.962486"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
					<span className="text-['24px'] font-normal">Back to browse</span>
				</Link>

				<div className="dark:bg-[#09090B] bg-white rounded-lg p-6 relative font-mono">
					<div className="flex flex-col gap-3">
						<div className="text-2xl font-black">
							{user?.username?.replace('_', ' ')}
						</div>
						<Separator className="bg-gray-300 dark:bg-mirage" />
						<div className="text-base">
							<div className="font-light">
								Threads:{' '}
								<span className="text-[#71717A]">{threadNum ?? 1}</span>
							</div>
						</div>
					</div>

					<div className="size-24 mr-2 absolute border-4 border-[#388DE2] right-0 top-0 translate-x-1/4 rounded-full -translate-y-1/4 dark:bg-[#131316] bg-white">
						<Image
							className="transition-opacity duration-300 rounded-full select-none size-full ring-1 ring-zinc-100/10 hover:opacity-80"
							src={user?.profilePicture || ''}
							alt={user?.username || 'UserAvatar'}
							height={96}
							width={96}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
