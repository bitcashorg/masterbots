'use client'

import Image from 'next/image'
import { Thread } from 'mb-genql'
import React from 'react'
import { ShortMessage } from './short-message'
import { ChatAccordion } from './chat-accordion'
import { ChatList } from './chat-list'
import { useThread } from '@/lib/hooks/use-thread'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { cn, sleep } from '@/lib/utils'

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
    <ul className="flex flex-col w-full gap-3">
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
  const { allMessages, sendMessageFromResponse, isOpenPopup, activeThread, setIsOpenPopup } =
    useThread()
  const { activeChatbot } = useSidebar()
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
  }, [threadRef, isLast, hasMore, loading, loadMore])
  const scrollToTop = async () => {
    await sleep(300) // animation time
    if (!threadRef.current) return
    threadRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleAccordionToggle = (isOpen: boolean) => {
    // It should scroll when opening or closing the accordion
    scrollToTop()
    setIsOpenPopup(isOpen ? true : false)
  }

  React.useEffect(() => {
    if (
      !isOpenPopup &&
      activeThread &&
      activeThread.threadId === thread.threadId
    )
      scrollToTop()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenPopup])

  return (
    <li ref={threadRef}>
      <ChatAccordion
        onToggle={handleAccordionToggle}
        className="relative"
        contentClass="!pt-0 !border-b-[3px] max-h-[70vh] scrollbar !border-l-[3px]"
        // handleTrigger={goToThread}
        triggerClass="gap-[0.375rem] py-3
        dark:border-b-mirage border-b-iron
        sticky top-0 z-[1] dark:hover:bg-mirage hover:bg-gray-300 sticky top-0 z-[1] dark:bg-[#18181b] bg-[#f4f4f5]
        [&[data-state=open]]:!bg-gray-300 dark:[&[data-state=open]]:!bg-mirage [&[data-state=open]]:rounded-t-[8px]"
        arrowClass="-right-1 top-[1.125rem]"
        thread={thread}
      >
        {/* Thread Title */}

        <div className="px-[11px] flex items-center w-full gap-3">
          {activeChatbot === null && thread.chatbot?.avatar ? (
            <div
              className={cn(
                'md:flex size-8 shrink-0 select-none items-center justify-center rounded-full border shadow hidden'
              )}
            >
              <Image
                className="transition-opacity duration-300 rounded-full select-none bg-background dark:bg-primary-foreground hover:opacity-80"
                src={thread.chatbot?.avatar}
                alt={thread.chatbot?.name ?? 'BotAvatar'}
                height={32}
                width={32}
              />{' '}
            </div>
          ) : (
            ''
          )}

          {thread.messages
            .filter(m => m.role === 'user')[0]
            ?.content.substring(0, 100) || 'wat'}
        </div>

        {/* Thread Description */}
        <div className="overflow-hidden text-sm text-left opacity-50">
          {thread.messages.filter(m => m.role !== 'user')?.[0]?.content ? (
            <div className="flex-1 px-[8px] pb-3 space-y-2 overflow-hidden">
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
