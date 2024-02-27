'use client'

import { Thread } from 'mb-genql'
import React from 'react'
import { ShortMessage } from './short-message'
import { ChatAccordion } from './chat-accordion'
import { ChatList } from './chat-list'
import { useRouter } from 'next/navigation'
import { useThread } from '@/lib/hooks/use-thread'

export default function ThreadList({
  threads,
  loading,
  loadMore,
  count,
  pageSize
}: {
  threads: Thread[]
  loading: boolean
  count: number
  pageSize: number
  loadMore: () => void
}) {
  return (
    <ul className="w-full flex flex-col gap-3">
      {threads.map((thread, key) => (
        <ThreadComponent
          key={key}
          thread={thread}
          loading={loading}
          loadMore={loadMore}
          hasMore={count === pageSize}
          isLast={key === threads.length - 1}
        />
      ))}
    </ul>
  )
}

function ThreadComponent({
  thread,
  loadMore,
  loading,
  isLast,
  hasMore
}: {
  thread: Thread
  loadMore: () => void
  loading: boolean
  isLast: boolean
  hasMore: boolean
}) {
  const threadRef = React.useRef<HTMLLIElement>(null)
  // const router = useRouter()
  const {
    allMessages,
    sendMessageFromResponse,
    setActiveThread,
    activeThread
  } = useThread()
  React.useEffect(() => {
    if (!threadRef.current) return
    const observer = new IntersectionObserver(([entry]) => {
      if (hasMore && isLast && entry.isIntersecting && !loading) {
        const timeout = setTimeout(() => {
          console.log('loading more content')
          loadMore()
          clearTimeout(timeout)
        }, 150)

        observer.unobserve(entry.target)
      }
    })

    observer.observe(threadRef.current)

    return () => {
      observer.disconnect()
    }
  }, [threadRef.current, isLast, hasMore, loading, loadMore])

  // const goToThread = () => {
  //   router.push(
  //     `/${thread.chatbot.name.trim().toLowerCase()}/${thread.threadId}`
  //   )
  //   setActiveThread(null)
  //   router.refresh()
  // }

  React.useEffect(() => {
    return () => {
      if (activeThread?.threadId === thread.threadId) {
        setActiveThread(null)
      }
    }
  }, [])

  return (
    <li ref={threadRef}>
      <ChatAccordion
        className="relative"
        contentClass="!pt-0 !border-b-[transparent]"
        // handleTrigger={goToThread}
        triggerClass="gap-[0.375rem] px-[0.6875rem] py-3
        dark:border-b-mirage border-b-gray-300
        sticky top-0 z-[1] dark:hover:bg-mirage hover:bg-gray-300 sticky top-0 z-[1] dark:bg-[#18181b] bg-[#f4f4f5]
        [&[data-state=open]]:!bg-gray-300 dark:[&[data-state=open]]:!bg-mirage [&[data-state=open]]:rounded-t-[8px]"
        arrowClass="-right-1 top-[1.125rem]"
        thread={thread}
      >
        {/* Thread Title */}

        <div className="">
          {thread.messages
            .filter(m => m.role === 'user')[0]
            ?.content.substring(0, 100) || 'wat'}
        </div>

        {/* Thread Description */}
        <div className="opacity-50 overflow-hidden text-sm text-left">
          {thread.messages.filter(m => m.role !== 'user')?.[0]?.content ? (
            <div className="flex-1 px-1 pb-3 space-y-2 overflow-hidden">
              <ShortMessage
                content={
                  thread.messages.filter(m => m.role !== 'user')[0].content
                }
              />
            </div>
          ) : (
            ''
          )}
        </div>

        {/* Thread Content */}
        <ChatList
          className="max-w-[100%] !px-0"
          isThread={false}
          chatbot={thread.chatbot}
          messages={allMessages}
          sendMessageFromResponse={sendMessageFromResponse}
        />
      </ChatAccordion>
    </li>
  )
}
