'use client'

import { ChatSearchInput } from '@/components/chat-search-input'
import ThreadList from '@/components/thread-list'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { getChatbot, getThreads } from '@/services/hasura'
import { Chatbot, Thread } from 'mb-genql'
import { useSession } from 'next-auth/react'
import React, { useCallback, useEffect, useRef } from 'react'
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
  const { activeCategory, activeChatbot } = useSidebar()
  const { isOpenPopup, activeThread, setActiveThread, setIsOpenPopup } =
    useThread()
  const [loading, setLoading] = React.useState<boolean>(false)
  const [threads, setThreads] = React.useState<Thread[]>(initialThreads ?? [])
  const [count, setCount] = React.useState<number>(initialThreads?.length ?? 0)
  const fetchIdRef = useRef(0) // Store the fetchId in a ref
  const loadMore = async () => {
    console.log('🟡 Loading More Content')
    setLoading(true)

    const moreThreads = await getThreads({
      jwt: session!.user?.hasuraJwt,
      userId: session!.user.id,
      offset: threads.length,
      limit: PAGE_SIZE,
      categoryId: activeCategory,
      chatbotName: activeChatbot?.name
    })
    if (moreThreads) setThreads(prevState => [...prevState, ...moreThreads])
    setCount(_prev => moreThreads.length ?? 0)
    setLoading(false)
  }

  const handleThreadsChange = async () => {
    if (!session?.user) return
    const currentFetchId = Date.now() // Generate a unique identifier for the current fetch
    fetchIdRef.current = currentFetchId
    const threads = await getThreads({
      jwt: session!.user?.hasuraJwt,
      userId: session!.user.id,
      limit: PAGE_SIZE,
      categoryId: activeCategory,
      chatbotName: activeChatbot?.name
    })

    // Check if the fetchId matches the current fetchId stored in the ref
    if (fetchIdRef.current === currentFetchId) {
      // If it matches, update the threads state
      setThreads(_prev => threads ?? [])
      setCount(_prev => threads.length ?? 0)
    }
  }

  React.useEffect(() => {
    handleThreadsChange()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, activeChatbot])

  React.useEffect(() => {
    if (!isOpenPopup) {
      handleThreadsChange()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenPopup])

  useEffect(() => {
    if (
      threads &&
      threads.filter(t => t.threadId === activeThread?.threadId).length
    )
      return
    setIsOpenPopup(false)
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
      {(!threads || threads.length === 0) && <ChatChatbotDetails />}
    </>
  )
}
