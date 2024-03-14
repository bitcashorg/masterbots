'use client'

import { ChatSearchInput } from '@/components/chat-search-input'
import ThreadList from '@/components/thread-list'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { getChatbot, getThreads } from '@/services/hasura'
import { Chatbot, Thread } from 'mb-genql'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import ChatChatbotDetails from '../chat-chatbot-details'
import { useParams } from 'next/navigation'
import { botNames } from '@/lib/bots-names'

const PAGE_SIZE = 20

export default function UserThreadPanel({
  chatbot,
  threads: initialThreads
}: {
  chatbot?: string
  threads: Thread[]
  search?: { [key: string]: string | string[] | undefined }
}) {
  const params = useParams<{ chatbot: string; threadId: string }>()
  const { data: session } = useSession()
  const { activeCategory } = useSidebar()
  const { randomChatbot, isOpenPopup, activeThread, setActiveThread } =
    useThread()
  const [loading, setLoading] = React.useState<boolean>(false)
  const [threads, setThreads] = React.useState<Thread[]>(initialThreads)
  const [count, setCount] = React.useState<number>(initialThreads.length)
  const [activeChatbot, setActvieChatbot] = React.useState<Chatbot | undefined>(
    undefined
  )

  const loadMore = async () => {
    console.log('🟡 Loading More Content')
    setLoading(true)

    const moreThreads = await getThreads({
      jwt: session!.user.hasuraJwt,
      userId: session!.user.id,
      offset: threads.length,
      limit: PAGE_SIZE,
      categoryId: activeCategory
    })

    setThreads(prevState => [...prevState, ...moreThreads])
    setCount(moreThreads.length)
    setLoading(false)
  }

  const handleThreadsChange = async () => {
    if (session?.user) {
      const threads = await getThreads({
        jwt: session!.user.hasuraJwt,
        userId: session!.user.id,
        limit: PAGE_SIZE,
        ...(activeCategory
          ? {
              categoryId: activeCategory
            }
          : {
              chatbotName: chatbot
            })
      })
      setThreads(threads)
      setCount(threads.length)
    }
  }

  React.useEffect(() => {
    handleThreadsChange()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, chatbot, isOpenPopup])

  React.useEffect(() => {
    if (!isOpenPopup) {
      handleThreadsChange()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenPopup])

  const getActiveChatbot = async () => {
    const chatbot = await getChatbot({
      chatbotName: botNames.get(params.chatbot),
      jwt: session!.user.hasuraJwt,
      threads: true
    })
    setActvieChatbot(chatbot)
  }

  React.useEffect(() => {
    if (params?.chatbot && session?.user?.hasuraJwt) {
      getActiveChatbot()
    } else {
      setActvieChatbot(undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.chatbot, session])

  useEffect(() => {
    if (
      threads &&
      threads.filter(t => t.threadId === activeThread?.threadId).length
    )
      return
    setActiveThread(null)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threads])

  return (
    <>
      {threads && threads.length > 0 ? (
        <div className="flex flex-col pb-[150px]">
          <div className="flex justify-between px-10 py-5">
            <ChatSearchInput setThreads={setThreads} />
          </div>

          <div className="flex px-10 py-5">
            <ThreadList
              threads={threads}
              loading={loading}
              count={count}
              pageSize={PAGE_SIZE}
              loadMore={loadMore}
            />
          </div>
        </div>
      ) : (
        ''
      )}
      {(!threads || threads.length === 0) &&
        randomChatbot &&
        !params?.chatbot && (
          <ChatChatbotDetails
            chatbot={randomChatbot}
            isSelectedChatbot={false}
          />
        )}
      {(!threads || threads.length === 0) &&
        activeChatbot &&
        params?.chatbot && (
          <ChatChatbotDetails chatbot={activeChatbot} isSelectedChatbot />
        )}
    </>
  )
}
