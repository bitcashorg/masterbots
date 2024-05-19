import Link from 'next/link'
import { MB } from '@repo/supabase'
import { cn } from '@/lib/utils'
import { getThreadLink } from '@/lib/threads'
import { ThreadHeading } from './thread-heading'

export function ThreadListChatItem({ thread }: ThreadListChatItemProps) {
  return (
    <Link
      className={cn('hover:bg-mirage px-5')}
      href={getThreadLink({ thread, chat: true })}
      shallow
    >
      <ThreadHeading
        chat
        question={thread.firstUserMessage.content}
        response={thread.firstAssistantMessage.content}
        thread={thread}
      />
    </Link>
  )
}

interface ThreadListChatItemProps {
  thread: MB.ThreadFull
  chat?: boolean
  defaultOpen?: boolean
}
