import Image from 'next/image'

import { cn } from '@/lib/utils'
import { Message, Thread } from 'mb-genql'
import Link from 'next/link'
import React from 'react'
import { ShortMessage } from './short-message'
import { IconOpenAI, IconUser } from './ui/icons'
import { ChatAccordion } from './chat-accordion'
import { BrowseChatMessageList } from './browse-chat-message-list'
import { useRouter } from 'next/navigation'
import { getMessages } from '@/services/hasura'

export default function BrowseListItem({
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
  const threadRef = React.useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [messages, setMessages] = React.useState<Message[]>([])

  React.useEffect(() => {
    if (!threadRef.current) return
    const observer = new IntersectionObserver(([entry]) => {
      if (hasMore && isLast && entry.isIntersecting && !loading) {
        const timeout = setTimeout(() => {
          loadMore()
          clearTimeout(timeout)
        }, 150)

        observer.unobserve(entry.target)
      }
    })

    observer.observe(threadRef.current)

    return () => {
      observer.disconnect()
    }
  }, [threadRef.current, isLast, hasMore, loading, loadMore])

  const fetchMessages = async () => {
    if (!messages.length) {
      const messages = await getMessages({ threadId: thread.threadId })
      setMessages(messages)
    }
  }

  const goToThread = () => {
    router.push(
      `/browse/${thread.chatbot.name.trim().toLowerCase()}/${thread.threadId}`
    )
    router.refresh()
  }

  return (
    <div ref={threadRef}>
      <ChatAccordion
        handleOpen={fetchMessages}
        handleTrigger={goToThread}
        className="border-none relative"
        contentClass="!pt-0"
        triggerClass="dark:hover:bg-mirage hover:bg-gray-300 !pr-0 hover:rounded-xl border-b-[1px] p-3 flex flex-col gap-[6px] sticky top-0 z-[1] dark:bg-[#18181b] bg-[#f4f4f5]"
        arrowClass="mt-3"
      >
        {/* Thread Title */}
        <div
          className={cn(
            'relative flex items-center font-normal text-sm transition-all w-full gap-4 pr-4'
          )}
        >
          {thread.chatbot?.avatar ? (
            <Link
              href={`/browse/${thread.chatbot.name.toLowerCase()}`}
              title={thread.chatbot?.name}
              className={cn(
                'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border shadow'
              )}
            >
              <Image
                className="transition-opacity duration-300 bg-background dark:bg-primary-foreground rounded-full select-none hover:opacity-80"
                src={thread.chatbot?.avatar}
                alt={thread.chatbot?.name ?? 'BotAvatar'}
                height={32}
                width={32}
              />
            </Link>
          ) : (
            <Link
              href={`/browse/${thread.chatbot?.chatbotId}`}
              title={thread.chatbot?.name}
              className={cn(
                'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border shadow',
                'bg-primary text-primary-foreground'
              )}
            >
              <IconOpenAI />
            </Link>
          )}
          <div className="flex items-center text-left gap-3">
            <div className="flex-1 px-1 ">{thread.messages?.[0]?.content}</div>
            <span className="opacity-50 text-[0.875rem]">by</span>
            {thread.user?.profilePicture ? (
              <Link
                href={`/browse/${encodeURIComponent(thread?.user.username)}?type=user`}
                title={thread.user?.username.replace('_', ' ')}
                className={cn(
                  'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border shadow'
                )}
              >
                <Image
                  className="transition-opacity duration-300 rounded-full select-none hover:opacity-80"
                  src={thread.user?.profilePicture}
                  alt={thread.user?.username ?? 'Avatar'}
                  height={32}
                  width={32}
                />
              </Link>
            ) : (
              <Link
                href={`/browse/${encodeURIComponent(thread.user?.username ?? 'Default')}?type=user`}
                title={thread.user?.username}
                className={cn(
                  'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border shadow',
                  'bg-background'
                )}
              >
                <IconUser />
              </Link>
            )}
          </div>
        </div>

        {/* Thread Description */}

        <div className="opacity-50 overflow-hidden text-sm text-left">
          {thread.messages?.[1]?.content &&
          thread.messages?.[1]?.role !== 'user' ? (
            <div className="flex-1 space-y-2 overflow-hidden">
              <ShortMessage content={thread.messages?.[1]?.content} />
            </div>
          ) : (
            ''
          )}
        </div>

        {/* Thread Content */}

        <BrowseChatMessageList
          chatbot={thread?.chatbot}
          user={thread?.user || undefined}
          messages={messages}
        />
      </ChatAccordion>
    </div>
  )
}
