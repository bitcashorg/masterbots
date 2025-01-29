import { SharedAccordion } from '@/components/shared/shared-accordion'
import { BrowseChatMessageList } from '@/components/routes/browse/browse-chat-message-list'
import { ChatbotAvatar } from '@/components/shared/chatbot-avatar'
import { ShortMessage } from '@/components/shared/short-message'
import { Button } from '@/components/ui/button'
import { useBrowse } from '@/lib/hooks/use-browse'
import { useThreadSearch } from '@/lib/hooks/use-thread-search'
import { searchThreadContent } from '@/lib/search'
import { cn, sleep } from '@/lib/utils'
import { getMessages } from '@/services/hasura'
import type { Message, Thread } from 'mb-genql'
import { toSlug } from 'mb-lib'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { ChatOptions } from '../chat/chat-options'
import { urlBuilders } from '@/lib/url'

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
    return () => observer.disconnect()
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
      router.push(urlBuilders.userProfileUrl({ userSlug: thread.user.slug }))
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

              {pageType !== 'user' && (
                <div className="flex items-center gap-1 ml-2 sm:gap-3 sm:ml-4">
                  <span className="hidden text-sm opacity-50 sm:inline"> by </span>
                  <Button
                    onClick={goToProfile}
                    title={thread.user?.username.replace('_', ' ')}
                    variant="icon"
                    size="icon"
                    className="w-8 h-8 sm:h-10 sm:w-10"
                  >
                    <Image
                      className="transition-opacity duration-300 rounded-full select-none hover:opacity-80"
                      src={thread.user?.profilePicture || '/images/robohash1.png'}
                      alt={thread.user?.username ?? 'Avatar'}
                      height={40}
                      width={40}
                    />
                  </Button>
                </div>
              )}
            </div>
            <div className="pl-2 pr-4 sm:pl-4 sm:pr-8">
              <ChatOptions
                threadId={thread.threadId}
                thread={thread}
                isBrowse
              />
            </div>
          </div>
        </div>

        {/* Thread Description */}
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