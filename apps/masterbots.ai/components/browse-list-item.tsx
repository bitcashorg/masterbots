import Image from 'next/image'

import { cn, sleep, toSlug } from '@/lib/utils'
import { getMessages } from '@/services/hasura'
import { Message, Thread } from 'mb-genql'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { BrowseChatMessageList } from './browse-chat-message-list'
import { ChatAccordion } from '@/components/chat/chat-accordion'
import { ShortMessage } from './short-message'
import { IconOpenAI, IconUser } from './ui/icons'
import { useBrowse } from '@/lib/hooks/use-browse'
let initialUrl: string | null = null

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

  const { tab } = useBrowse()

  React.useEffect(() => {
    if (initialUrl) return
    initialUrl = location.href
  })

  React.useEffect(() => {
    initialUrl = location.href
  }, [tab])

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
      window.history.pushState(
        {},
        '',
        `/${toSlug(thread.chatbot.categories[0].category.name)}/${thread.threadId}`
      )
      setMessages(_prev => [])
      await fetchMessages()
    } else {
      window.history.pushState({}, '', initialUrl)
    }
    // When toggling accordion, it should scroll
    // Use optional chaining to ensure scrollIntoView is called only if current is not null
    await sleep(300) // animation time
    threadRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
        onToggle={handleAccordionToggle}
        // handleTrigger={goToThread}
        className="relative"
        contentClass="!pt-0 max-h-[70vh] scrollbar"
        triggerClass="dark:hover:bg-mirage hover:bg-gray-300 pl-[8px]
        py-3 flex flex-col gap-[6px] 
        sticky sm:top-0 top-[55px] z-[1]
        dark:border-b-mirage border-b-gray-300
        [&[data-state=open]]:!bg-gray-300 dark:[&[data-state=open]]:!bg-mirage [&[data-state=open]]:rounded-t-[8px]
        dark:bg-[#18181b] bg-[#f4f4f5]"
        arrowClass="mt-[10px]"
        thread={thread}
      >
        {/* Thread Title */}
        <div
          className={cn(
            'relative flex items-center font-normal md:text-lg transition-all w-full gap-3 pr-4'
          )}
        >
          {pageType !== 'bot' && thread.chatbot?.avatar ? (
            <Link
              href={`/b/${thread.chatbot.name.toLowerCase()}`}
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
            pageType !== 'bot' && (
              <Link
                href={`/b/${thread.chatbot?.name.toLowerCase()}`}
                title={thread.chatbot?.name}
                className={cn(
                  'flex size-8 shrink-0 select-none items-center justify-center rounded-full border shadow',
                  'bg-primary text-primary-foreground'
                )}
              >
                <IconOpenAI />
              </Link>
            )
          )}
          <div className="w-[calc(100%-64px)] m:w-[calc(100%-28px)] flex items-center gap-3 text-left">
            <div
              className={cn('truncate-title px-1', {
                'no-truncate max-h-40 !overflow-y-auto sm:max-h-none sm:overflow-visible': isAccordionOpen
              })}
            >
              {thread.messages?.[0]?.content}
            </div>
            {pageType !== 'user' && (
              <span className="opacity-50 text-[0.875rem]">by</span>
            )}
            {pageType !== 'user' && thread.user?.profilePicture ? (
              <Link
                href={`/u/${encodeURIComponent(String(thread.user.slug))}`}
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
              pageType !== 'user' && (
                <Link
                  href={`/u/${encodeURIComponent(String(thread.user?.slug))}`}
                  title={thread.user?.username}
                  className={cn(
                    'flex size-8 shrink-0 select-none items-center justify-center rounded-full border shadow',
                    'bg-background'
                  )}
                >
                  <IconUser />
                </Link>
              )
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
