'use client'

/**
 * BrowseThread Component
 *
 * This component displays a specific chat thread, including messages exchanged between the user and the chatbot.
 * It merges past assistant and user messages for UI presentation while excluding system prompts.
 *
 * Props:
 * - thread: A Thread object containing details about the chat thread, including messages and associated chatbot/user information.
 * - className: An optional string for additional CSS classes to customize the component's styling.
 *
 * Key Features:
 * - Conditional Rendering: Displays chat messages only if there are messages available in the thread.
 * - Integration with Chat Messages Component: Utilizes the `BrowseChatMessages` component to render the messages.
 * - Responsive Design: Applies Tailwind CSS for styling and layout.
 */

import { cn } from '@/lib/utils'
import { BrowseChatMessages } from '@/components/routes/browse/browse-chat-messages'
import type { Thread } from 'mb-genql'

export function BrowseThread({
  thread,
  className
}: {
  thread: Thread
  className?: string
}) {
  return (
    <div className={cn('pb-[100px]', className)}>
      {thread.messages?.length ? (
        <BrowseChatMessages
          chatbot={thread?.chatbot}
          user={thread?.user || undefined}
          threadId={thread.threadId}
          parentThreadId={thread?.parentThreadId}
        />
      ) : (
        ''
      )}
    </div>
  )
}
