'use client'

import { useEffect, useRef } from 'react'
import { useScroll } from 'framer-motion'
import { useThread } from '@/hooks/use-thread'
import { cn } from '@/lib/utils'
import { useAtBottom } from '@/hooks/use-at-bottom'
import { IconClose } from '../../ui/icons'
import { Chat } from './chat'
import { ChatList } from './chat-list'
import { scrollToBottomOfElement } from '@/lib/animation'

export function ThreadPopup({ className }: { className?: string }) {
  const {
    isOpenPopup,
    activeThread,
    initialMessages,
    allMessages,
    setIsOpenPopup,
    sendMessageFromResponse,
    isLoading
  } = useThread()
  const onClose = () => {
    setIsOpenPopup(!isOpenPopup)
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
  }, [isLoading, isOpenPopup])

  const threadTitle = allMessages.filter(m => m.role === 'user')[0]?.content
  const threadTitleChunks = threadTitle.split(/\s/g) // ' '
  const threadTitleHeading = threadTitleChunks.slice(0, 32).join(' ')
  const threadTitleSubHeading = threadTitleChunks.slice(32).join(' ')

  return (
    <div
      className={`size-full dark:bg-[#27272A80] lg:max-w-[calc(100%-250px)] xl:max-w-[calc(100%-300px)] flex justify-center items-center absolute top-0
      bg-[#F4F4F580] backdrop-blur-sm ease-in-out duration-500 z-[9] transition-all ${isOpenPopup ? 'animate-fade-in' : 'hidden animate-fade-out'}`}
    >
      <div
        className={cn(
          className,
          `flex flex-col z-10 rounded-lg duration-500 ease-in-out absolute h-[90%]
      max-w-[1032px] w-[95%] dark:border-mirage border-iron border
      transition-opacity ${isOpenPopup ? 'animate-fade-in' : 'animate-fade-out'}`
        )}
      >
        <div className="relative rounded-t-[8px] px-[32px] py-[20px] dark:bg-[#1E293B] bg-[#E4E4E7]">
          <div>
            {threadTitle && threadTitleChunks.length > 32
              ? `${threadTitleHeading}…`
              : threadTitle || 'wat'}
            {threadTitleSubHeading ? (
              <div className="opacity-50 overflow-hidden text-sm text-left">
                {threadTitleSubHeading}
              </div>
            ) : (
              ''
            )}
          </div>
          <button
            className="absolute right-[32px] top-[50%] translate-y-[-50%] "
            onClick={onClose}
          >
            <IconClose />
          </button>
        </div>
        <div
          className="flex flex-col dark:bg-[#18181B] bg-[white] grow rounded-b-[8px] scrollbar pb-[180px]"
          ref={popupContentRef as React.Ref<HTMLDivElement>}
        >
          {activeThread ? (
            <ChatList
              chatArrowClass="!right-0 !mr-0"
              chatContentClass="dark:!border-x-mirage !border-x-gray-300 !py-[20px] !px-[16px] !mx-0 max-h-[none] "
              chatTitleClass="!px-[11px]"
              chatbot={activeThread.chatbot}
              className="max-w-full !px-[32px] !mx-0"
              isThread={false}
              messages={allMessages}
              sendMessageFromResponse={sendMessageFromResponse}
            />
          ) : null}

          {activeThread ? (
            <Chat
              chatPanelClassName="!pl-0 rounded-b-[8px] overflow-hidden !absolute"
              chatbot={activeThread.chatbot}
              initialMessages={initialMessages}
              isAtBottom={isAtBottom}
              isPopup
              scrollToBottom={scrollToBottom}
              threadId={activeThread.threadId}
            />
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}
