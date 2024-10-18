'use client'

import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useEffect, useState } from 'react'
import { getCategory, getThreads } from '@/services/hasura'
import { useSession } from 'next-auth/react'
import { useThread } from '@/lib/hooks/use-thread'

export default function ChatChatbotDetails() {
  const { data: session } = useSession()
  const { activeCategory, activeChatbot } = useSidebar()
  const { randomChatbot } = useThread()
  const [threadNum, setThreadNum] = useState<number>(0)
  const [categoryName, setCategoryName] = useState<string>('')

  // * Get the number of all threads
  const getThreadNum = async () => {
    const threads = await getThreads({
      jwt: session?.user?.hasuraJwt as string,
      categoryId: activeCategory,
      userId: session?.user.id as string
    })
    setThreadNum(threads?.length ?? 0)
  }

  // * Get active category name
  const getCategoryName = async () => {
    const category = await getCategory({ categoryId: activeCategory as number })
    setCategoryName(category.name)
  }

  useEffect(() => {
    // ! Only when no active category, should get thread number
    // * (FYI: We display this welcome message when there is no thread on the category -
    // * So when category selected and no activeChatbot selected, thread number should be 0 all the time.)
    if (!activeCategory) {
      getThreadNum()
    } else {
      // ?When category is selected, should get category name
      getCategoryName()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, activeChatbot])

  return (
    <div className="h-[calc(100vh-196px)] flex items-center justify-center">
      <div
        className="dark:bg-[#09090B] bg-white rounded-lg md:w-[600px] w-[85%]
      flex flex-col gap-[10px] relative font-mono"
      >
        <div className="w-[70%] flex flex-col gap-[10px] px-[24px] pt-[24px]">
          <div className="text-2xl font-black">
            {activeChatbot ? activeChatbot?.name : 'Welcome to Masterbots!'}
          </div>
          <Separator className="bg-gray-300 dark:bg-mirage" />
          <div className="grow flex flex-col justify-between min-h-[137px]">
            <div className="text-xl font-semibold">
              {activeChatbot
                ? categoryName
                : activeCategory
                  ? `You are on the ${categoryName} category. Please select one of the bots on the sidebar to start a conversation.`
                  : 'Please select one of the categories and a bot on the sidebar to start a conversation.'}
            </div>
            <div className="text-base gap-[8px] flex flex-col pb-[8px]">
              {activeChatbot && activeChatbot?.description ? (
                <div className="font-medium">{activeChatbot.description}</div>
              ) : (
                ''
              )}
              <div className="font-light">
                Threads made:{' '}
                <span className="text-[#71717A]">
                  {activeChatbot
                    ? activeChatbot?.threads?.length ?? 0
                    : threadNum}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="size-24 absolute border-[4px] border-[#388DE2] right-0 top-0 translate-x-[25%] rounded-full translate-y-[-25%] dark:bg-[#131316] bg-white">
          <Image
            className="transition-opacity duration-300 rounded-full select-none size-full ring-1 ring-zinc-100/10 hover:opacity-80"
            src={activeChatbot?.avatar || randomChatbot?.avatar || ''}
            alt={activeChatbot?.avatar || randomChatbot?.avatar || 'ChatAvatar'}
            height={108}
            width={108}
          />
        </div>
      </div>
    </div>
  )
}
