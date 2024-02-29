'use client'

import { useThread } from '@/lib/hooks/use-thread'
import { IconClose } from './ui/icons'
import { cn, scrollToBottomOfElement } from '@/lib/utils'
import { Chat } from './chat'
import { ChatList } from './chat-list'
import { useEffect, useRef } from 'react'
import { useScroll } from 'framer-motion'
import { useAtBottom } from '@/lib/hooks/use-at-bottom'

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
  const containerRef = useRef<HTMLDivElement>()

  const { scrollY } = useScroll({
    container: containerRef as React.RefObject<HTMLElement>
  })

  const { isAtBottom } = useAtBottom({
    ref: containerRef,
    scrollY
  })

  const threadTitle = allMessages.filter(m => m.role === 'user')[0]?.content
  const scrollToBottom = () => {
    if (containerRef.current) {
      const element = containerRef.current
      scrollToBottomOfElement(element)
    }
  }

  useEffect(() => {
    if (isLoading && scrollY) {
      const timeout = setTimeout(() => {
        scrollToBottom()
        clearTimeout(timeout)
      }, 150)
    }
  }, [scrollY, isLoading])

  return (
    <div
      className={`h-full w-full sticky top-0 left-0 bottom-0
      dark:bg-gray bg-none  ease-in-out duration-500 z-[51] transition-all
      ${isOpenPopup ? 'animate-fade-in' : 'hidden animate-fade-out'}`}
    >
      <div className="h-full w-full relative dark:bg-[#27272A80] bg-[#27272A80]" />
      <div
        className={cn(
          className,
          `flex flex-col z-[10] rounded-lg duration-500 ease-in-out
      absolute h-[90%] max-w-[1032px] w-[95%] top-[50%] left-[50%]  translate-x-[-50%] translate-y-[-50%] 
      transition-opacity ${isOpenPopup ? 'animate-fade-in' : 'animate-fade-out'}`
        )}
      >
        <div className="relative rounded-t-[8px] px-[32px] py-[20px] bg-[#1E293B]">
          <div className="px-[11px]">
            {threadTitle && threadTitle.length > 160
              ? threadTitle?.substring(0, 160) + '...'
              : threadTitle || 'wat'}
            {threadTitle && threadTitle.length > 320 ? (
              <div className="opacity-50 overflow-hidden text-sm text-left">
                {threadTitle.substring(
                  threadTitle.length - 160,
                  threadTitle.length
                )}
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
          ref={containerRef as React.Ref<HTMLDivElement>}
          className="flex flex-col dark:bg-[#18181B] bg-[white] pb-[200px] h-full scrollbar"
        >
          {activeThread && (
            <ChatList
              className="max-w-[100%] !px-[32px] !mx-0"
              isThread={false}
              chatbot={activeThread.chatbot}
              messages={allMessages}
              sendMessageFromResponse={sendMessageFromResponse}
              chatContentClass="!border-[transparent] !py-[20px] !px-[16px] !mx-0"
              chatTitleClass="!px-[11px]"
              chatArrowClass="!right-0 !mr-0"
            />
          )}

          {activeThread ? (
            <Chat
              scrollToBottom={scrollToBottom}
              isAtBottom={isAtBottom}
              initialMessages={initialMessages}
              chatbot={activeThread?.chatbot}
              threadId={activeThread?.threadId}
              chatPanelClassName="!pl-0"
            />
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}
