'use client'

import ChatChatbotDetails from '@/components/routes/chat/chat-chatbot-details'
import { ChatSearchInput } from '@/components/routes/chat/chat-search-input'
import ThreadList from '@/components/routes/thread/thread-list'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { useThreadVisibility } from '@/lib/hooks/use-thread-visibility'
import { getThreads } from '@/services/hasura'
import type { Thread } from 'mb-genql'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import React, { useEffect, useRef } from 'react'

const PAGE_SIZE = 20

export default function UserThreadPanel({
  chatbot,
  threads: initialThreads,
}: {
  chatbot?: string
  threads?: Thread[]
  search?: { [key: string]: string | string[] | undefined }
}) {
  const params = useParams<{ chatbot: string; threadId: string }>()
  const { data: session } = useSession()
  const { activeCategory, activeChatbot } = useSidebar()
  const { isOpenPopup, activeThread, setActiveThread, setIsOpenPopup } = useThread()
  const [loading, setLoading] = React.useState<boolean>(false)
  const { threads: hookThreads } = useThreadVisibility()

  const finalThreads = React.useMemo(
    () => initialThreads ?? hookThreads,
    [initialThreads, hookThreads],
  )

  const [threads, setThreads] = React.useState<Thread[]>(finalThreads ?? [])
  const [count, setCount] = React.useState<number>(finalThreads?.length ?? 0)

  React.useEffect(() => {
    setThreads(finalThreads)
    setCount(finalThreads?.length ?? 0)
  }, [finalThreads])

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
      chatbotName: activeChatbot?.name,
    })
    if (moreThreads) setThreads((prevState) => [...prevState, ...moreThreads])
    setCount((_prev) => moreThreads.length ?? 0)
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
      chatbotName: activeChatbot?.name,
    })

    // Check if the fetchId matches the current fetchId stored in the ref
    if (fetchIdRef.current === currentFetchId) {
      // If it matches, update the threads state
      setThreads((_prev) => threads ?? [])
      setCount((_prev) => threads.length ?? 0)
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
    if (threads && threads.filter((t) => t.threadId === activeThread?.threadId).length) return
    setIsOpenPopup(false)
    setActiveThread(null)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threads])
  return (
    <>
      {threads && threads.length > 0 ? (
        <>
          <div className="flex justify-between px-4 md:px-10 py-5 lg:max-w-[calc(100%-100px)] 2xl:max-w-full">
            <ChatSearchInput setThreads={setThreads} />
          </div>

          <div className="flex px-4 py-5 md:px-10">
            <ThreadList
              threads={threads}
              loading={loading}
              count={count}
              pageSize={PAGE_SIZE}
              loadMore={loadMore}
            />
          </div>
        </>
      ) : (
        ''
      )}
      {(!threads || threads.length === 0) && <ChatChatbotDetails />}
    </>
  )
}
