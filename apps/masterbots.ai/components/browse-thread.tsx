'use client'

import { cn, extractBetweenMarkers } from '@/lib/utils'

import { BrowseChatMessages } from './browse-chat-messages'
import { ChatScrollAnchor } from './chat-scroll-anchor'
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
    <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
      <div className="max-w-2xl px-4 mx-auto">
        {thread.messages?.length ? (
          <BrowseChatMessages
            user={thread?.user || undefined}
            messages={thread.messages}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  )
}
