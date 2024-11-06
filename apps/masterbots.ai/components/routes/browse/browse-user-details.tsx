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
 * Key Features:
 * - Dynamic Thread Count: Fetches and displays the number of threads associated with the user.
 * - Responsive Design: Utilizes Tailwind CSS for styling and layout.
 * - Conditional Rendering: Displays user details only if the user data is available.
 * - Image Handling: Displays the user's profile picture with a fallback for missing images.
 */

import type { User } from 'mb-genql'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { useEffect, useState } from 'react'
import { getBrowseThreads } from '@/services/hasura'

export default function BrowseChatbotDetails({ user }: { user?: User | null }) {
  const [threadNum, setThreadNum] = useState(0)
  const getThreadByUserName = async () => {
    const threads = await getBrowseThreads({
      slug: user?.slug
    })
    setThreadNum(threads.length)
  }
  useEffect(() => {
    getThreadByUserName()
  }, [])
  return (
    <div className="relative bg-cover py-10 bg-gradient-to-l from-mirage via-[#2B5D91] to-[#388DE2]">
      <div
        className="dark:bg-[#09090B] bg-white rounded-lg p-6 md:w-[600px]
      flex flex-row gap-3 relative mx-auto font-mono"
      >
        <div className="flex flex-col w-2/3 gap-3">
          <div className="text-2xl font-black">
            {user?.username?.replace('_', ' ')}
          </div>
          <Separator className="bg-gray-300 dark:bg-mirage" />

          <div className="text-base">
            <div className="font-light">
              Threads: <span className="text-[#71717A]">{threadNum ?? 1}</span>
            </div>
          </div>
        </div>
        <div className="size-24 absolute border-4 border-[#388DE2] right-0 top-0 translate-x-1/4 rounded-full translate-y-1/4 dark:bg-[#131316] bg-white">
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
  )
}
