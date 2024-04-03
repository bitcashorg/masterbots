'use client'

import { User } from 'mb-genql'
import Image from 'next/image'
import { Separator } from './ui/separator'
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
        <div className="w-2/3 flex flex-col gap-3">
          <div className="text-2xl font-black">
            {user?.username.replace('_', ' ')}
          </div>
          <Separator className="dark:bg-mirage bg-gray-300" />

          <div className="text-base">
            <div className="font-light">
              Threads: <span className="text-[#71717A]">{threadNum ?? 1}</span>
            </div>
          </div>
        </div>
        <div className="size-24 absolute border-[4px] border-[#388DE2] right-0 top-0 translate-x-[25%] rounded-full translate-y-[-25%] dark:bg-[#131316] bg-white">
          <Image
            className="size-full transition-opacity duration-300 rounded-full select-none ring-1 ring-zinc-100/10 hover:opacity-80"
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
