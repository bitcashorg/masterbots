'use client'

import { Chat } from '@/components/routes/chat/chat'
import { ChatList } from '@/components/routes/chat/chat-list'
import { BrowseChatMessageList } from '@/components/routes/browse/browse-chat-message-list'
import { Button } from '@/components/ui/button'
import { IconClose } from '@/components/ui/icons'
import { Skeleton } from '@/components/ui/skeleton'
import { useAtBottom } from '@/lib/hooks/use-at-bottom'
import { useMBChat } from '@/lib/hooks/use-mb-chat'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { cn, scrollToBottomOfElement } from '@/lib/utils'
import type { Message as AiMessage } from 'ai'
import { useScroll } from 'framer-motion'
import type { Chatbot, Message } from 'mb-genql'
import { useEffect, useRef, useState } from 'react'
import { getMessages } from '@/services/hasura'

export function ThreadPopup({ className }: { className?: string }) {
  const { activeChatbot } = useSidebar()
  const { isOpenPopup, activeThread } = useThread()
  const [{ allMessages, isLoading }, { sendMessageFromResponse }] = useMBChat()
  const [browseMessages, setBrowseMessages] = useState<Message[]>([])
  const popupContentRef = useRef<HTMLDivElement>()

  const { scrollY } = useScroll({
    container: popupContentRef as React.RefObject<HTMLElement>
  })

  const { isAtBottom } = useAtBottom({
    ref: popupContentRef,
    scrollY
  })

  const scrollToBottom = () => {
    if (popupContentRef.current) {
      const element = popupContentRef.current
      scrollToBottomOfElement(element)
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (isLoading && isOpenPopup) {
      const timeout = setTimeout(() => {
        scrollToBottom()
        clearTimeout(timeout)
      }, 150)
    }
  }, [isLoading, isOpenPopup])

  // Fetch browse messages when activeThread changes
  useEffect(() => {
    const fetchBrowseMessages = async () => {
      if (activeThread?.threadId) {
        const messages = await getMessages({ threadId: activeThread.threadId })
        setBrowseMessages(messages)
      }
    }

    if (activeThread?.threadId) {
      fetchBrowseMessages()
    }
  }, [activeThread?.threadId])

  const isBrowseView = activeThread?.threadId && !allMessages.length

  return (
    <div
      className={cn(
        'size-full bg-background/80 dark:bg-background/80',
        'lg:max-w-[calc(100%-250px)] xl:max-w-[calc(100%-300px)]',
        'flex justify-center items-center fixed top-16',
        'h-[calc(100vh-4rem)] backdrop-blur-sm ease-in-out duration-500 z-[9]',
        'transition-all',
        isOpenPopup ? 'animate-fade-in' : 'animate-fade-out',
        className
      )}
    >
      <div
        className={cn(
          'flex flex-col z-10 rounded-lg duration-500 ease-in-out fixed',
          'h-full max-h-[90%] max-w-[1032px] w-[95%]',
          'dark:border-mirage border-iron border bg-background dark:bg-background',
          'transition-opacity'
        )}
      >
        <ThreadPopUpCardHeader
          messages={isBrowseView ? browseMessages : allMessages}
          isBrowseView={isBrowseView}
        />

        <div
          className={cn(
            'flex flex-col dark:bg-[#18181b] bg-white grow rounded-b-[8px] scrollbar h-full',
            'pb-[120px] md:pb-[180px]',
            'max-h-[calc(100vh-240px)] md:max-h-[calc(100vh-220px)]',
            className
          )}
          ref={popupContentRef as React.Ref<HTMLDivElement>}
        >
          {isBrowseView ? (
            // Browse view
            <div className="px-8 py-4">
              <BrowseChatMessageList
                chatbot={activeThread?.chatbot}
                user={activeThread?.user || undefined}
                messages={browseMessages}
              />
            </div>
          ) : (
            // Chat view
            <>
              <ChatList
                isThread={false}
                messages={allMessages}
                sendMessageFn={sendMessageFromResponse}
                chatbot={activeThread?.chatbot || (activeChatbot as Chatbot)}
                chatContentClass="!border-x-gray-300 !px-[16px] !mx-0 max-h-[none] dark:!border-x-mirage"
                className="max-w-full !px-[32px] !mx-0"
                chatArrowClass="!right-0 !mr-0"
                chatTitleClass="!px-[11px]"
              />

              <Chat
                isPopup
                chatPanelClassName="!pl-0 rounded-b-[8px] overflow-hidden !absolute"
                scrollToBottom={scrollToBottom}
                isAtBottom={isAtBottom}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function ThreadPopUpCardHeader({
  messages,
  isBrowseView
}: {
  messages: (AiMessage | Message)[]
  isBrowseView: boolean
}) {
  const { isOpenPopup, activeThread, setIsOpenPopup, setActiveThread } =
    useThread()

  const onClose = () => {
    setIsOpenPopup(!isOpenPopup)
    if (activeThread?.threadId) {
      setActiveThread(null)
    }
  }

  // Handle different message structures for browse and chat views
  const threadTitle = isBrowseView
    ? (messages[0] as Message)?.content
    : (messages.filter(m => (m as AiMessage).role === 'user')[0] as AiMessage)
        ?.content

  const threadTitleChunks = threadTitle?.split(/\s/g)
  const threadTitleHeading = threadTitleChunks?.slice(0, 32).join(' ')
  const threadTitleSubHeading = threadTitleChunks?.slice(32).join(' ')

  return (
    <div className="relative rounded-t-[8px] px-[32px] py-[20px] dark:bg-[#1E293B] bg-[#E4E4E7]">
      <div className="flex items-center justify-between gap-6">
        <div className="items-center block overflow-y-auto whitespace-pre-line max-h-28 scrollbar small-thumb">
          {threadTitle ? (
            threadTitleChunks.length > 32 ? (
              threadTitleHeading + ''
            ) : (
              threadTitle
            )
          ) : (
            <Skeleton className="w-[280px] h-[20px]" />
          )}
          {threadTitleSubHeading && (
            <span className="ml-2 overflow-hidden text-sm opacity-50">
              {threadTitleSubHeading}
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="ml-2"
            onClick={onClose}
          >
            <IconClose />
          </Button>
        </div>
      </div>
    </div>
  )
}
