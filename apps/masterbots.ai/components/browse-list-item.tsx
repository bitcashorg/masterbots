import Image from 'next/image'

import { cn } from '@/lib/utils'
import { getMessages } from '@/services/hasura'
import { Message, Thread } from 'mb-genql'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { BrowseChatMessageList } from './browse-chat-message-list'
import { ChatAccordion } from './chat-accordion'
import { ShortMessage } from './short-message'
import { IconOpenAI, IconUser } from './ui/icons'
import { useAccordion } from '@/lib/hooks/use-accordion'

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
  const { toggleAccordion, openedAccordionId } = useAccordion()
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
  }, [isLast, hasMore, loading, loadMore])

  const fetchMessages = async () => {
    console.log('Fetching messages for', thread.threadId)
    if (!messages.length) {
      const messages = await getMessages({ threadId: thread.threadId })
      console.log('Messages fetched', messages)
      setMessages(messages)
    }
  }

  const handleAccordionToggle = () => {
    console.log('handleAccordionToggle called')
    toggleAccordion(thread.threadId)
    fetchMessages()
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
        onToggle={handleAccordionToggle}
        isOpen={openedAccordionId === thread.threadId}
        // handleTrigger={goToThread}
        className="relative"
        contentClass="!pt-0 max-h-[70vh] scrollbar"
        triggerClass="dark:hover:bg-mirage hover:bg-gray-300 pl-[8px]
        py-3 flex flex-col gap-[6px] 
        sticky top-0 z-[1]
        dark:border-b-mirage border-b-gray-300
        [&[data-state=open]]:!bg-gray-300 dark:[&[data-state=open]]:!bg-mirage [&[data-state=open]]:rounded-t-[8px]
        dark:bg-[#18181b] bg-[#f4f4f5]"
        arrowClass="mt-[10px]"
      >
        {/* Thread Title */}
        <div
          className={cn(
            'relative flex items-center font-normal md:text-lg transition-all w-full gap-3 pr-4'
          )}
        >
          {thread.chatbot?.avatar ? (
            <Link
              href={`/browse/${thread.chatbot.name.toLowerCase()}`}
              title={thread.chatbot?.name}
              className={cn(
                'flex size-8 shrink-0 select-none items-center justify-center rounded-full border shadow'
              )}
            >
              <Image
                className="transition-opacity duration-300 rounded-full select-none bg-background dark:bg-primary-foreground hover:opacity-80"
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
                'flex size-8 shrink-0 select-none items-center justify-center rounded-full border shadow',
                'bg-primary text-primary-foreground'
              )}
            >
              <IconOpenAI />
            </Link>
          )}
          <div className="w-[calc(100%-64px)] m:w-[calc(100%-28px)] flex items-center gap-3 text-left">
            <div
              className={cn('truncate-title px-1', {
                'no-truncate': openedAccordionId === thread.threadId
              })}
            >
              {thread.messages?.[0]?.content}
            </div>
            <span className="opacity-50 text-[0.875rem]">by</span>
            {thread.user?.profilePicture ? (
              <Link
                href={`/browse/${encodeURIComponent(thread?.user.username)}?type=user`}
                title={thread.user?.username.replace('_', ' ')}
                className={cn(
                  'flex size-8 shrink-0 select-none items-center justify-center rounded-full border shadow'
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
                  'flex size-8 shrink-0 select-none items-center justify-center rounded-full border shadow',
                  'bg-background'
                )}
              >
                <IconUser />
              </Link>
            )}
          </div>
        </div>

        {/* Thread Description */}

        <div className="overflow-hidden text-sm text-left opacity-50">
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
