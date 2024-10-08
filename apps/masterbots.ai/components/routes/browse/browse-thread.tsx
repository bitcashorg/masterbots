'use client'

import { cn } from '@/lib/utils'
import { BrowseChatMessages } from '@/components/routes/browse/browse-chat-messages'
import { Thread } from 'mb-genql'

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
      {thread.messages?.length ? (
        <BrowseChatMessages
          chatbot={thread?.chatbot}
          user={thread?.user || undefined}
          threadId={thread.threadId}
        />
      ) : (
        ''
      )}
    </div>
  )
}
