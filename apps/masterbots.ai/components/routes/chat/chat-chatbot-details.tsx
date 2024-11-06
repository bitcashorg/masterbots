//* Component for displaying details of the selected chatbot

'use client'

import { Separator } from '@/components/ui/separator'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { getCategory, getThreads } from '@/services/hasura'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function ChatChatbotDetails() {
  const { data: session } = useSession() //* Retrieves session data using next-auth
  const { activeCategory, activeChatbot } = useSidebar() //* Retrieves active category and chatbot from sidebar state
  const { randomChatbot } = useThread() //* Retrieves a random chatbot from thread state
  const [threadNum, setThreadNum] = useState<number>(0) //* Stores the number of threads
  const [categoryName, setCategoryName] = useState<string>('') //* Stores the name of the active category

  //* Fetches the number of threads for the active category and user
  const getThreadNum = async () => {
    if (!session?.user) return

    const threads = await getThreads({
      jwt: session?.user?.hasuraJwt as string,
      categoryId: activeCategory,
      userId: session?.user.id as string
    })
    setThreadNum(threads?.length ?? 0) //* Updates thread number state
  }

  //* Fetches the name of the active category
  const getCategoryName = async () => {
    const category = await getCategory({ categoryId: activeCategory as number }) //* Retrieves category details
    setCategoryName(category.name) //* Updates category name state
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    //* Effect to fetch thread number or category name based on active category
    if (!activeCategory) {
      getThreadNum() //* Fetch thread number if no category is active
    } else {
      getCategoryName()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, activeChatbot, session?.user])

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
              {/* biome-ignore lint/complexity/useOptionalChain: <explanation> */}
              {activeChatbot && activeChatbot?.description ? (
                <div className="font-medium">{activeChatbot.description}</div>
              ) : (
                ''
              )}
              <div className="font-light">
                Threads made:{' '}
                <span className="text-[#71717A]">
                  {activeChatbot
                    ? (activeChatbot?.threads?.length ?? 0)
                    : threadNum}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="size-24 absolute border-4 border-[#388DE2] right-0 top-0 translate-x-1/4 rounded-full translate-y-1/4 dark:bg-[#131316] bg-white">
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
