'use client'

import { ChatAccordion } from '@/components/routes/chat/chat-accordion'
import { ChatList } from '@/components/routes/chat/chat-list'
import { sleep } from '@/lib/utils'
import { Thread } from 'mb-genql'
import { ShortMessage } from '@/components/shared/short-message'
import { ChatbotAvatar } from '@/components/shared/chatbot-avatar'
import React, { useEffect, useRef } from 'react'
import { useThread } from '@/lib/hooks/use-thread'
import { useScroll } from '@/lib/hooks/use-scroll'

export default function ThreadComponent({
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
  const threadRef = useRef<HTMLLIElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const { allMessages, isNewResponse } = useThread()

  const { isNearBottom } = useScroll({
    containerRef: contentRef,
    isNewContent: isNewResponse
  })

  useEffect(() => {
    if (!threadRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (hasMore && isLast && entry.isIntersecting && !loading) {
          loadMore()
        }
      },
      {
        root: null,
        rootMargin: '100px',
        threshold: 0.1
      }
    )

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

  return (
    <li ref={threadRef}>
      <ChatAccordion
        onToggle={scrollToTop}
        className="relative"
        contentClass="!pt-0 !border-b-[3px] max-h-[70vh] scrollbar !border-l-[3px]"
        triggerClass="gap-[0.375rem] py-3
        dark:border-b-mirage border-b-iron
        sticky top-0 z-[1] dark:hover:bg-mirage hover:bg-gray-300 sticky top-0 z-[1] dark:bg-[#18181b] bg-[#f4f4f5]
        [&[data-state=open]]:!bg-gray-300 dark:[&[data-state=open]]:!bg-mirage [&[data-state=open]]:rounded-t-[8px]"
        arrowClass="-right-1 top-[1.125rem]"
        thread={thread}
      >
        {/* Thread Title */}
        <div className="px-[11px] flex items-center w-full gap-3">
          <ChatbotAvatar thread={thread} />
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
        <div
          ref={contentRef}
          className="overflow-y-auto max-h-[calc(70vh-100px)]"
        >
          <ChatList
            className="max-w-full !px-0"
            isThread={false}
            chatbot={thread.chatbot}
            messages={allMessages}
            containerRef={contentRef}
            isNearBottom={isNearBottom}
          />
        </div>
      </ChatAccordion>
    </li>
  )
}
