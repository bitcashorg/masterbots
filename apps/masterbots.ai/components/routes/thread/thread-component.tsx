'use client'

/**
 * ThreadComponent
 *
 * A comprehensive thread display component that provides:
 * - Expandable/collapsible thread view with accordion
 * - Thread title, description, and full message history
 * - Infinite scroll functionality for message loading
 * - Admin approval capabilities
 * - Thread options (share, delete, etc.)
 *
 * Key Features:
 * - Accordion-based thread expansion
 * - Automatic scroll management
 * - Infinite scroll with load more functionality
 * - Message preview in collapsed state
 * - Admin mode controls for thread approval
 * - Thread options menu
 *
 * Structure:
 * - Thread Header: Avatar + Title + Options
 * - Thread Description: Preview of first assistant message
 * - Thread Content: Full message history in ChatList
 * - Admin Controls: Approval button for unapproved threads
 *
 * Note: Handles both regular and admin view states with
 * different controls and capabilities
 */

import { ChatAccordion } from '@/components/routes/chat/chat-accordion'
import { ChatList } from '@/components/routes/chat/chat-list'
import { ChatbotAvatar } from '@/components/shared/chatbot-avatar'
import { ShortMessage } from '@/components/shared/short-message'
import { Skeleton } from '@/components/ui/skeleton'
import { useScroll } from '@/lib/hooks/use-scroll'
import { useThread } from '@/lib/hooks/use-thread'
import { useThreadVisibility } from '@/lib/hooks/use-thread-visibility'
import type { Thread } from 'mb-genql'
import { useRef } from 'react'
import { AdminModeApprove } from '../chat/admin-mode-approve'
import { ChatOptions } from '../chat/chat-options'
import {  redirect, useParams, usePathname } from 'next/navigation'
import { toSlug } from 'mb-lib'

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
  const { isNewResponse } = useThread()
  const { isAdminMode } = useThreadVisibility()
  const pathname  = usePathname()
  const params = useParams()

  const { isNearBottom, scrollToTop } = useScroll({
    containerRef: contentRef,
    threadRef,
    isNewContent: isNewResponse,
    hasMore,
    isLast,
    loading,
    loadMore
  })

  const threadId = thread.threadId
  
  const handleAccordionToggle = () => {
 
    if (pathname.includes('u') || pathname.includes('u') && pathname.includes('t')) {
      const category = thread?.chatbot?.categories[0]?.category?.name
      const chatbot = thread?.chatbot?.name
      const slug = params.slug;
    redirect(`/u/${slug}/t/${toSlug(category)}/${toSlug(chatbot)}/${thread.threadId}`)
    }else{
      scrollToTop()
    }
  }
  return (
    <li ref={threadRef}>
      <ChatAccordion
        onToggle={handleAccordionToggle}
        className="relative"
        contentClass="!pt-0 !border-b-[3px] max-h-[70vh] scrollbar !border-l-[3px]"
        triggerClass="gap-[0.375rem] py-3
        dark:border-b-mirage border-b-iron
        sticky top-0 z-[1] dark:hover:bg-mirage hover:bg-gray-300 sticky top-0 z-[1] dark:bg-[#18181b] bg-[#f4f4f5]
        [&[data-state=open]]:!bg-gray-300 dark:[&[data-state=open]]:!bg-mirage [&[data-state=open]]:rounded-t-[8px] [&[data-state=closed]>div>span>span]:line-clamp-2"
        arrowClass="size-5 top-[calc(33.33%-1.25rem)] bottom-0 transform translate-y-[100%]"
        thread={thread}
      >
        {/* Thread Title */}
        <div className="px-[11px] flex justify-between items-center w-full gap-3">
          <span className="inline-flex items-center gap-3 text-left">
            <ChatbotAvatar thread={thread} />

            <span className="whitespace-pre-line">
              {/* TODO: Fix UI to truncate text when closed (see -> apps/masterbots.ai/components/routes/browse/browse-list-item.tsx) */}
              {thread.messages
                .filter(m => m.role === 'user')[0]
                ?.content || (
                  <Skeleton className="w-[280px] h-[20px]" />
                )}
            </span>
          </span>
          {/* Thread Options */}
          <div>
            <ChatOptions threadId={threadId} thread={thread} isBrowse={false} />
          </div>
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
            containerRef={contentRef}
            isNearBottom={isNearBottom}
          />

        </div>

      </ChatAccordion>
      {/* Admin Mode Approve */}
      {isAdminMode && !thread.isApproved && (
        <AdminModeApprove threadId={threadId} />
      )}
    </li>
  )
}
