'use client'

import type { Thread } from '@repo/mb-genql'
import { cn } from '@/lib/utils'
import { ThreadHeading } from './thread-heading'
import Link from 'next/link'
import { getThreadLink } from '@/lib/threads'

export function ThreadListChatItem({ thread }: ThreadListChatItemProps) {
  const firstQuestion =
    thread.messages.find(m => m.role === 'user')?.content || 'not found'
  const firstResponse =
    thread.messages.find(m => m.role === 'assistant')?.content || 'not found'

  return (
    <Link
      shallow
      href={getThreadLink({ thread, chat: true })}
      className={cn('hover:bg-mirage px-5')}
    >
      <ThreadHeading
        chat
        question={firstQuestion}
        response={firstResponse}
        thread={thread}
      />
    </Link>
  )
}

interface ThreadListChatItemProps {
  thread: Thread
  chat?: boolean
  defaultOpen?: boolean
}
