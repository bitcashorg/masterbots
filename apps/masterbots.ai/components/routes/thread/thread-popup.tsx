'use client'

/**
 * ThreadPopup Component
 *
 * A popup component that displays the active chat thread in a modal-like interface.
 * It integrates chat functionality and provides a user-friendly way to interact
 * with threads associated with a specific chatbot.
 *
 * Key Features:
 * - Displays the thread title and subheading
 * - Contains a close button to exit the popup
 * - Shows the chat history and allows sending messages
 * - Supports scrolling to the bottom of the chat when new messages arrive
 * - Includes a publicity switch for thread visibility settings
 *
 * Functionality:
 * - Manages the visibility of the popup based on user interaction
 * - Automatically scrolls to the bottom when new messages are loaded
 * - Displays a list of messages in the active thread
 *
 * Props:
 * - className: Optional string for additional styling
 */

import { Chat } from '@/components/routes/chat/chat'
import { ChatList } from '@/components/routes/chat/chat-list'
import { Button } from '@/components/ui/button'
import { IconClose } from '@/components/ui/icons'
import { Skeleton } from '@/components/ui/skeleton'
import { useAtBottom } from '@/lib/hooks/use-at-bottom'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { cn, scrollToBottomOfElement } from '@/lib/utils'
import { useScroll } from 'framer-motion'
import { Chatbot } from 'mb-genql'
import { useEffect, useRef } from 'react'
import { ThreadPublicitySwitch } from './thread-publicity-switch'

export function ThreadPopup({ className }: { className?: string }) {
  const { activeChatbot } = useSidebar()
  const {
    isOpenPopup,
    activeThread,
    initialMessages,
    allMessages,
    loadingState,
    activeTool,
    setIsOpenPopup,
    sendMessageFromResponse,
    isLoading,
    setActiveThread
  } = useThread()

  const onClose = () => {
    setIsOpenPopup(!isOpenPopup)
    if (activeThread?.threadId) {
      setActiveThread(null)
    }
  }
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

  useEffect(() => {
    if (isLoading && isOpenPopup) {
      const timeout = setTimeout(() => {
        scrollToBottom()
        clearTimeout(timeout)
      }, 150)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isOpenPopup])

  const threadTitle = allMessages.filter(m => m.role === 'user')[0]?.content
  const threadTitleChunks = threadTitle?.split(/\s/g) // ' '
  const threadTitleHeading = threadTitleChunks?.slice(0, 32).join(' ')
  const threadTitleSubHeading = threadTitleChunks?.slice(32).join(' ')

  return (
    <div
      className={cn(
        'size-full dark:bg-[#27272A80] lg:max-w-[calc(100%-250px)] xl:max-w-[calc(100%-300px)] flex justify-center items-center fixed top-[4rem] h-[calc(100vh-4rem)] bg-[#F4F4F580] backdrop-blur-sm ease-in-out duration-500 z-[9] transition-all',
        isOpenPopup ? 'animate-fade-in' : 'hidden animate-fade-out'
      )}
    >
      <div
        className={cn(
          className,
          `flex flex-col z-10 rounded-lg duration-500 ease-in-out fixed h-full max-h-[90%]
      max-w-[1032px] w-[95%] dark:border-mirage border-iron border
      transition-opacity ${isOpenPopup ? 'animate-fade-in' : 'animate-fade-out'}`
        )}
      >
        <div className="relative rounded-t-[8px] px-[32px] py-[20px] dark:bg-[#1E293B] bg-[#E4E4E7]">
          <div className="flex items-center gap-6 justify-between">
            <div className="block items-center max-h-28 scrollbar small-thumb overflow-y-auto whitespace-pre-line">
              {threadTitle ?
                threadTitleChunks.length > 32
                  ? threadTitleHeading + ''
                  : threadTitle
                : (
                  <Skeleton className="w-[280px] h-[20px]" />
                )}
              {threadTitleSubHeading && (
                <span className="ml-2 overflow-hidden text-sm opacity-50">
                  {threadTitleSubHeading}
                </span>
              )}
            </div>

            <div className="flex gap-4 items-center">
              <ThreadPublicitySwitch threadId={activeThread?.threadId} />
              <Button type="button" variant="ghost" size="icon" className="ml-2" onClick={onClose}>
                <IconClose />
              </Button>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col dark:bg-[#18181B] bg-[white] grow rounded-b-[8px] scrollbar pb-[180px] h-full"
          ref={popupContentRef as React.Ref<HTMLDivElement>}
        >
          <ChatList
            className="max-w-full !px-[32px] !mx-0"
            isThread={false}
            chatbot={activeThread?.chatbot || activeChatbot as Chatbot}
            sendMessageFn={sendMessageFromResponse}
            chatContentClass="dark:!border-x-mirage !border-x-gray-300 !py-[20px] !px-[16px] !mx-0 max-h-[none] "
            chatTitleClass="!px-[11px]"
            chatArrowClass="!right-0 !mr-0"
          />

          <Chat
            isPopup
            initialMessages={initialMessages}
            chatbot={activeThread?.chatbot || activeChatbot as Chatbot}
            threadId={activeThread?.threadId}
            chatPanelClassName="!pl-0 rounded-b-[8px] overflow-hidden !absolute"
            scrollToBottom={scrollToBottom}
            isAtBottom={isAtBottom}
          />
        </div>
      </div>
    </div>
  )
}
