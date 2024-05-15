import { cn } from '@/lib/utils'
import { ThreadHeading } from './thread-heading'
import Link from 'next/link'
import { getThreadLink } from '@/lib/threads'
import { MB } from '@repo/supabase'

export function ThreadListChatItem({ thread }: ThreadListChatItemProps) {
  return (
    <Link
      shallow
      href={getThreadLink({ thread, chat: true })}
      className={cn('hover:bg-mirage px-5')}
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
