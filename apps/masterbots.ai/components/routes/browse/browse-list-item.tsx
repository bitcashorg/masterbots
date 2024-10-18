import Image from 'next/image'

import { ChatAccordion } from '@/components/routes/chat/chat-accordion'
import { useBrowse } from '@/lib/hooks/use-browse'
import { cn, sleep } from '@/lib/utils'
import { getMessages } from '@/services/hasura'
import { Message, Thread } from 'mb-genql'
import { toSlug } from 'mb-lib'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { BrowseChatMessageList } from '@/components/routes/browse/browse-chat-message-list'
import { ShortMessage } from '@/components/shared/short-message'
import { IconOpenAI, IconUser } from '@/components/ui/icons'
import { Button } from '@/components/ui/button'
import { icons } from 'lucide-react'
import { ChatOptions } from '../chat/chat-options'

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
  // ? Move to custom hook and add it to the context useThread + useProvider @bran18
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

  const goToBotPage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(`/b/${thread.chatbot.name.trim().toLowerCase()}`)
  }

  const goToProfile = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (thread.user?.slug) {
      router.push(`/u/${thread.user.slug}/t`)
    }
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
            <Button
            onClick={goToBotPage}
            title={thread.chatbot?.name}
            variant="icon"
            size="icon"
            >
              <Image
                className="transition-opacity duration-300 rounded-full select-none bg-background dark:bg-primary-foreground hover:opacity-80"
                src={thread.chatbot?.avatar}
                alt={thread.chatbot?.name ?? 'BotAvatar'}
                height={32}
                width={32}
              />
            </Button>
          ) : (
            pageType !== 'bot' && (
              <Button
                onClick={goToBotPage}
                title={thread.chatbot?.name}
                variant="icon"
                size="icon"
              >
                <IconOpenAI />
              </Button>
            )
          )}
          <div className="w-[calc(100%-64px)] m:w-[calc(100%-28px)] flex  justify-between items-center  gap-3 text-left ">
           <div className='flex  w-[calc(100%-124px)] m:w-[calc(100%-58px)] '>
            <div
              className={cn('truncate-title px-1  ', {
                'no-truncate max-h-40 !overflow-y-auto sm:max-h-none sm:overflow-visible': isAccordionOpen
              })}
            >
              {thread.messages?.[0]?.content}
              {/* .length > 70 ?  thread.messages?.[0]?.content.substring(0,70) + '...' : thread.messages?.[0]?.content} */}
            </div>
            {pageType !== 'user' && (
              <span className="opacity-50 text-[0.875rem]">by</span>
            )}
            <div>
            {pageType !== 'user' && thread.user?.profilePicture ? (
              <Button
               onClick={goToProfile}
               title={thread.user?.username.replace('_', ' ')}
               variant="icon"
               size="icon"
              >
                <Image
                  className="transition-opacity duration-300 rounded-full select-none hover:opacity-80"
                  src={thread.user?.profilePicture}
                  alt={thread.user?.username ?? 'Avatar'}
                  height={32}
                  width={32}
                />
              </Button>
            ) : (
              pageType !== 'user' && (
                <Button
                 onClick={goToProfile}
                 title={thread.user?.username}
                 variant="icon"
                 size="icon"
                >
                  <IconUser />
                </Button>
              )
            )}
            </div>
            </div>
             {/* Thread Options */}
           <div className='px-4'>
                 <ChatOptions threadId={thread.threadId} thread={thread} isBrowse />
           </div>
          </div>

          
        </div>

        {/* Thread Description */}

        {/* <div className="overflow-hidden text-sm text-left opacity-50">
          {thread.messages?.[1]?.content &&
            thread.messages?.[1]?.role !== 'user' ? (
            <div className="flex-1 space-y-2 overflow-hidden">
              <ShortMessage content={thread.messages?.[1]?.content} />
            </div>
          ) : (
            ''
          )}
        </div> */}

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
