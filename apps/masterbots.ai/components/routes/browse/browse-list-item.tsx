import { BrowseChatMessageList } from '@/components/routes/browse/browse-chat-message-list'
import { ChatOptions } from '@/components/routes/chat/chat-options'
import { ChatbotAvatar } from '@/components/shared/chatbot-avatar'
import { SharedAccordion } from '@/components/shared/shared-accordion'
import { ShortMessage } from '@/components/shared/short-message'
import { Button } from '@/components/ui/button'
import { useBrowse } from '@/lib/hooks/use-browse'
import { useThreadSearch } from '@/lib/hooks/use-thread-search'
import { searchThreadContent } from '@/lib/search'
import { urlBuilders } from '@/lib/url'
import { cn, sleep } from '@/lib/utils'
import { getMessages } from '@/services/hasura'
import type { Message, Thread } from 'mb-genql'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'

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
  const { searchTerm } = useThreadSearch()
  const [isAccordionOpen, setIsAccordionOpen] = React.useState(false)
  const [isVisible, setIsVisible] = React.useState(true)
  const params = useParams()


  const { tab } = useBrowse()

  React.useEffect(() => {
    if (!searchTerm) {
      setIsVisible(true)
      return
    }
    const matches = searchThreadContent(thread, searchTerm)
    setIsVisible(matches)
  }, [searchTerm, thread])

  React.useEffect(() => {
    if (initialUrl) return
    initialUrl = location.href
  })

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  React.useEffect(() => {
    initialUrl = location.href
  }, [tab])

  // biome-ignore lint/correctness/useExhaustiveDependencies: function are not required to have as exhaustive dependencies
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
  }, [isLast, hasMore, loading])

  const fetchMessages = async () => {
    const messages = await getMessages({ threadId: thread.threadId })
    setMessages(_prev => messages)
  }

  const updateUrlN = () => {
    const url = new URL(window.location.href)

    if (pageType === 'profile') {
      url.pathname = urlBuilders.profilesThreadUrl({
        type: 'chatbot',
        domain: thread?.chatbot?.categories[0]?.category?.name,
        chatbot: thread?.chatbot?.name,
        threadSlug: thread.slug
      })      
    } else {
      url.pathname = urlBuilders.threadUrl({
        type: 'public',
        category: thread?.chatbot?.categories[0]?.category?.name,
        domain: thread?.chatbot?.metadata[0]?.domainName,
        chatbot: thread?.chatbot?.name,
        threadSlug: thread.slug
      })
    }

    // Update just the URL without triggering navigation
    window.history.replaceState(
      window.history.state,
      '',
      url.toString()
    )
  }

  const handleAccordionToggle = async (isOpen: boolean) => {
    if (isOpen) {
      setMessages(_prev => [])
      await fetchMessages()
      updateUrlN()
      // When toggling accordion, it should scroll
      // Use optional chaining to ensure scrollIntoView is called only if current is not null
      await sleep(300) // animation time
      threadRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setIsAccordionOpen(isOpen)
    } else {
      window.history.replaceState(
        {},
        '',
        initialUrl
      )
    }
    await sleep(300)
    threadRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setIsAccordionOpen(isOpen)
  }

  const goToBotPage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(`/b/${thread.chatbot.name.trim().toLowerCase()}`)
  }

  const goToProfile = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (thread?.user?.slug) {
      router.push(urlBuilders.profilesUrl({ type: 'user', usernameSlug: thread.user.slug }))
    }
  }

  return (
    <div ref={threadRef}>
      <SharedAccordion
        onToggle={handleAccordionToggle}
        className="relative"
        contentClass="!pt-0 max-h-[70vh] scrollbar"
        triggerClass="dark:hover:bg-mirage hover:bg-gray-300 pl-[8px]
        py-3 flex flex-col gap-[6px] 
        sticky sm:top-0 top-[55px] z-[1]
        dark:border-b-mirage border-b-gray-300
        [&[data-state=open]]:!bg-gray-300 dark:[&[data-state=open]]:!bg-mirage [&[data-state=open]]:rounded-t-[8px]
        dark:bg-[#18181b] bg-[#f4f4f5]"
        arrowClass="size-5 top-[0.25rem] bottom-0 transform translate-y-[100%]"
        thread={thread}
        variant="browse"
      >
        {/* Thread Title */}
        <div className={cn('relative flex items-center font-normal md:text-lg transition-all w-full gap-3 pr-4')}>
          <div className="flex items-center justify-between w-full text-left">
            <div className="flex items-center gap-2 sm:gap-4 w-[calc(100%-100px)] sm:w-[calc(100%-124px)]">
              {pageType !== 'bot' && (
                <Button
                  onClick={goToBotPage}
                  title={thread.chatbot?.name}
                  variant="ghost"
                  radius="full"
                  className="p-0 hover:bg-transparent"
                >
                  <ChatbotAvatar thread={thread} />
                </Button>
              )}

              <div className={cn('truncate-title', {
                'no-truncate max-h-40 !overflow-y-auto sm:max-h-none sm:overflow-visible': isAccordionOpen
              })}>
                {thread.messages?.[0]?.content}
              </div>

              {/* User section with tighter spacing on mobile */}
              {pageType !== 'user' && pageType !== 'profile' && (
                <div className="flex items-center gap-1 sm:gap-3">
                  <span className="hidden text-sm opacity-50 sm:inline"> by </span>
                  <Button
                    onClick={goToProfile}
                    title={thread.user?.username.replace('_', ' ')}
                    variant="icon"
                    size="icon"
                    className="rounded-full w-8 h-8 sm:h-10 sm:w-10"
                  >
                    <Image
                      className="transition-opacity duration-300 rounded-full select-none hover:opacity-80"
                      src={thread.user?.profilePicture || '/images/robohash1.png'}
                      alt={thread.user?.username ?? 'Avatar'}
                      height={42}
                      width={42}
                    />
                  </Button>
                </div>
              )}
            </div>
            <div className="pl-2 pr-4 sm:pl-4 sm:pr-8">
              <ChatOptions
                threadId={thread.threadId}
                thread={thread}
                isBrowse={pageType !== 'profile'}
              />
            </div>
          </div>
        </div>

        <div className="overflow-hidden text-sm text-left opacity-50">
          {thread.messages?.[1]?.content && thread.messages?.[1]?.role !== 'user' ? (
            <div className="flex-1 space-y-2 overflow-hidden">
              <ShortMessage content={thread.messages?.[1]?.content} />
            </div>
          ) : ''}
        </div>

        {/* Thread Content */}
        <BrowseChatMessageList
          chatbot={thread?.chatbot}
          user={thread?.user || undefined}
          messages={messages}
        />
      </SharedAccordion>
    </div>
  )
}