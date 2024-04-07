'use client'

import type { Thread } from '@repo/mb-genql'
import { cn, extractBetweenMarkers } from '@/lib/utils'
import { BrowseChatMessages } from './browse-chat-messages'

export function BrowseThread({
  thread,
  className
}: {
  thread: Thread
  className?: string
}) {
  // we merge past assistant and user messages for ui only
  // we remove system prompts from ui
  // we extend append function to add our system prompts

  return (
    <div className={cn('pb-[100px]', className)}>
      {thread.messages.length ? (
        <BrowseChatMessages
          chatbot={thread.chatbot}
          threadId={thread.threadId}
          user={thread.user || undefined}
        />
      ) : (
        ''
      )}
    </div>
  )
}
