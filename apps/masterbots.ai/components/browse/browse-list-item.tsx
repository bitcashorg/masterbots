import Image from 'next/image'
import { Message, Thread } from '@repo/mb-genql'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { cn, sleep } from '@/lib/utils'
import { getMessages } from '@/services/hasura'
import { ChatAccordion } from '../c/chat-accordion'
import { ShortMessage } from '../short-message'
import { IconOpenAI, IconUser } from '../ui/icons'
import { BrowseChatMessageList } from './browse-chat-message-list'

export default function BrowseListItem({
  thread,
  loadMore,
  loading,
  isLast,
  hasMore,
  pageType = ''
}: {
  thread: Thread
  loadMore: () => void
  loading: boolean
  isLast: boolean
  hasMore: boolean
  pageType?: string
}) {
  const threadRef = React.useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [messages, setMessages] = React.useState<Message[]>([])
  // ! Move to custom hook and add it to the context useThread + useProvider @bran18
  const [isAccordionOpen, setIsAccordionOpen] = React.useState(false)

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
    const messages = await getMessages({ threadId: thread.threadId })
    setMessages(_prev => messages)
  }

  const handleAccordionToggle = async (isOpen: boolean) => {
    if (isOpen) {
      setMessages(_prev => [])
      await fetchMessages()
    }
    // When toggling accordion, it should scroll
    // Use optional chaining to ensure scrollIntoView is called only if current is not null
    await sleep(300) // animation time
    threadRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setIsAccordionOpen(isOpen)
    // Should fetch messages only when opening thread.
  }

  const goToThread = () => {
    router.push(
      `/b/${thread.chatbot.name.trim().toLowerCase()}/${thread.threadId}`
    )
    router.refresh()
  }

  return (
    <div ref={threadRef}>
      <ChatAccordion
        arrowClass="mt-[10px]"
        contentClass="!pt-0 max-h-[70vh] scrollbar"
        thread={thread}
        triggerClass="dark:hover:bg-mirage hover:bg-gray-300 pl-[8px]
        py-3 flex flex-col gap-[6px] 
        sticky top-0 z-[1]
        dark:border-b-mirage border-b-gray-300
        [&[data-state=open]]:!bg-gray-300 dark:[&[data-state=open]]:!bg-mirage [&[data-state=open]]:rounded-t-[8px]
        dark:bg-[#18181b] bg-[#f4f4f5]"
        onToggle={handleAccordionToggle}
        // handleTrigger={goToThread}
        className="relative"
      >
        {/* Thread Title */}
        <div
          className={cn(
            'relative flex items-center font-normal md:text-lg transition-all w-full gap-3 pr-4'
          )}
        >
          {pageType !== 'bot' && thread.chatbot.avatar ? (
            <Link
              className={cn(
                'flex size-8 shrink-0 select-none items-center justify-center rounded-full border shadow'
              )}
              href={`/b/${thread.chatbot.name.toLowerCase()}`}
              title={thread.chatbot.name}
            >
              <Image
                alt={thread.chatbot.name ?? 'BotAvatar'}
                className="transition-opacity duration-300 rounded-full select-none bg-background dark:bg-primary-foreground hover:opacity-80"
                height={32}
                src={thread.chatbot.avatar}
                width={32}
              />
            </Link>
          ) : (
            pageType !== 'bot' && (
              <Link
                className={cn(
                  'flex size-8 shrink-0 select-none items-center justify-center rounded-full border shadow',
                  'bg-primary text-primary-foreground'
                )}
                href={`/b/${thread.chatbot.name.toLowerCase()}`}
                title={thread.chatbot.name}
              >
                <IconOpenAI />
              </Link>
            )
          )}
          <div className="w-[calc(100%-64px)] m:w-[calc(100%-28px)] flex items-center gap-3 text-left">
            <div
              className={cn('truncate-title px-1', {
                'no-truncate': isAccordionOpen
              })}
            >
              {thread.messages[0]?.content}
            </div>
            {pageType !== 'user' && (
              <span className="opacity-50 text-[0.875rem]">by</span>
            )}
            {pageType !== 'user' && thread.user.profilePicture ? (
              <Link
                className={cn(
                  'flex size-8 shrink-0 select-none items-center justify-center rounded-full border shadow'
                )}
                href={`/u/${encodeURIComponent(String(thread.user.slug))}`}
                title={thread.user.username.replace('_', ' ')}
              >
                <Image
                  alt={thread.user.username ?? 'Avatar'}
                  className="transition-opacity duration-300 rounded-full select-none hover:opacity-80"
                  height={32}
                  src={thread.user.profilePicture}
                  width={32}
                />
              </Link>
            ) : (
              pageType !== 'user' && (
                <Link
                  className={cn(
                    'flex size-8 shrink-0 select-none items-center justify-center rounded-full border shadow',
                    'bg-background'
                  )}
                  href={`/u/${encodeURIComponent(String(thread.user.slug))}`}
                  title={thread.user.username}
                >
                  <IconUser />
                </Link>
              )
            )}
          </div>
        </div>

        {/* Thread Description */}

        <div className="overflow-hidden text-sm text-left opacity-50">
          {thread.messages[1]?.content &&
          thread.messages[1]?.role !== 'user' ? (
            <div className="flex-1 space-y-2 overflow-hidden">
              <ShortMessage content={thread.messages[1]?.content} />
            </div>
          ) : (
            ''
          )}
        </div>

        {/* Thread Content */}

        <BrowseChatMessageList
          chatbot={thread.chatbot}
          messages={messages}
          user={thread.user || undefined}
        />
      </ChatAccordion>
    </div>
  )
}
