'use client'

import type { Thread } from '@repo/mb-genql'
import React, { useEffect, useRef, useState } from 'react'
import { ChatSearchInput } from '@/components/routes/c/chat-search-input'

import { useSidebar } from '@/hooks/use-sidebar'
import { useThread } from '@/hooks/use-thread'
import { getThreads } from '@/services/hasura'
import { useGlobalStore } from '@/hooks/use-global-store'
import ChatChatbotDetails from '../chat-chatbot-details'
import ThreadList from '../chat-thread-list'

const PAGE_SIZE = 20

export default function UserThreadPanel({
  threads: initialThreads
}: {
  chatbot?: string
  threads: Thread[]
  search?: Record<string, string | string[] | undefined>
}) {
  const { activeCategory, activeChatbot } = useSidebar()
  const { isOpenPopup, activeThread, setActiveThread, setIsOpenPopup } =
    useThread()
  const [loading, setLoading] = useState<boolean>(false)
  const [threads, setThreads] = useState<Thread[]>(initialThreads ?? [])
  const [count, setCount] = useState<number>(initialThreads.length ?? 0)
  const { hasuraJwt, user } = useGlobalStore()
  const fetchIdRef = useRef(0) // Store the fetchId in a ref
  const loadMore = async () => {
    console.log('🟡 Loading More Content')
    setLoading(true)

    const moreThreads = await getThreads({
      jwt: hasuraJwt,
      userId: user.userId,
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
    if (!user) return
    const currentFetchId = Date.now() // Generate a unique identifier for the current fetch
    fetchIdRef.current = currentFetchId
    const threads = await getThreads({
      jwt: hasuraJwt,
      userId: user.userId,
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

  useEffect(() => {
    handleThreadsChange()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, activeChatbot])

  useEffect(() => {
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
        <div className="flex lg:w-[calc(100%-250px)] xl:w-[calc(100%-300px)] flex-col pb-[150px]">
          <div className="flex justify-between px-4 md:px-10 py-5 lg:max-w-[calc(100%-100px)] 2xl:max-w-full">
            <ChatSearchInput setThreads={setThreads} />
          </div>

          <div className="flex px-4 py-5 md:px-10">
            <ThreadList
              count={count}
              loadMore={loadMore}
              loading={loading}
              pageSize={PAGE_SIZE}
              threads={threads}
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