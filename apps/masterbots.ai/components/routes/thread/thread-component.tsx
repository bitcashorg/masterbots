'use client'

import { AdminModeApprove } from '@/components/routes/chat/admin-mode-approve'
import { ChatList } from '@/components/routes/chat/chat-list'
import { ChatOptions } from '@/components/routes/chat/chat-options'
import { ChatbotAvatar } from '@/components/shared/chatbot-avatar'
import { SharedAccordion } from '@/components/shared/shared-accordion'
import { ShortMessage } from '@/components/shared/short-message'
import { Skeleton } from '@/components/ui/skeleton'
import { useMBScroll } from '@/lib/hooks/use-mb-scroll'
import { useThread } from '@/lib/hooks/use-thread'
import { useThreadVisibility } from '@/lib/hooks/use-thread-visibility'
import { cn } from '@/lib/utils'
import type { Thread } from 'mb-genql'
import { useRef } from 'react'

export default function ThreadComponent({
  thread,
  loadMore,
  loading,
  isLast,
  hasMore,
}: {
  thread: Thread
  loadMore: () => void
  loading: boolean
  isLast: boolean
  hasMore: boolean
}) {
  const threadRef = useRef<HTMLLIElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const { isNewResponse } = useThread()
  const { isAdminMode } = useThreadVisibility()

  const { isNearBottom, scrollToTop } = useMBScroll({
    containerRef: contentRef,
    threadRef,
    isNewContent: isNewResponse,
    hasMore,
    isLast,
    loading,
    loadMore,
  })

  const threadId = thread.threadId
  const handleAccordionToggle = (isOpen: boolean) => {
    if (isOpen) {
      scrollToTop()
    }
  }

  return (
    <li ref={threadRef}>
      <SharedAccordion
        onToggle={handleAccordionToggle}
        className="relative"
        contentClass={cn('!pt-0 !border-b-[3px] max-h-[70vh] scrollbar !border-l-[3px]')}
        triggerClass={cn(
          'gap-1.5 py-3',
          'dark:border-b-mirage border-b-iron',
          'sticky top-0 z-[1] dark:hover:bg-mirage hover:bg-gray-300',
          'dark:bg-[#18181b] bg-[#f4f4f5]',
          '[&[data-state=open]]:!bg-gray-300 dark:[&[data-state=open]]:!bg-mirage',
          '[&[data-state=open]]:rounded-t-[8px]',
          '[&[data-state=closed]>div>span>span]:line-clamp-2',
        )}
        arrowClass="size-5 top-[calc(33.33%-1.25rem)] bottom-0 transform translate-y-[100%]"
        thread={thread}
        variant="browse"
      >
        {/* Thread Title */}
        <div className="px-[11px] flex justify-between items-center w-full gap-3">
          <span className="inline-flex items-center gap-3 text-left">
            <ChatbotAvatar thread={thread} />
            <span className="whitespace-pre-line">
              {thread.messages.filter((m) => m.role === 'user')[0]?.content || (
                <Skeleton className="w-[280px] h-[20px]" />
              )}
            </span>
          </span>
          {/* Thread Options */}
          <div className="pl-2 pr-4 sm:pl-4 sm:pr-8">
            <ChatOptions threadId={thread.threadId} thread={thread} isBrowse />
          </div>
        </div>

        {/* Thread Description */}
        <div className="overflow-hidden text-sm text-left opacity-50">
          {thread.messages.filter((m) => m.role !== 'user')?.[0]?.content ? (
            <div className="flex-1 px-[8px] pb-3 space-y-2 overflow-hidden">
              <ShortMessage content={thread.messages.filter((m) => m.role !== 'user')[0].content} />
            </div>
          ) : (
            ''
          )}
        </div>

        {/* Thread Content */}
        <div ref={contentRef} className="overflow-y-auto max-h-[calc(70vh-100px)]">
          <ChatList
            className="max-w-full !px-0"
            isThread={false}
            chatbot={thread.chatbot}
            containerRef={contentRef}
            isNearBottom={isNearBottom}
          />
        </div>
      </SharedAccordion>

      {/* Admin Mode Approve */}
      {isAdminMode && !thread.isApproved && <AdminModeApprove threadId={threadId} />}
    </li>
  )
}
