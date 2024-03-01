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
    sendMessageFromResponse
  } = useThread()
  const onClose = () => {
    setIsOpenPopup(!isOpenPopup)
  }

  const threadTitle = allMessages.filter(m => m.role === 'user')[0]?.content
  const threadTitleChunks = threadTitle?.split(/\s/g) // ' '
  const threadTitleHeading = threadTitleChunks?.slice(0, 32).join(' ')
  const threadTitleSubHeading = threadTitleChunks?.slice(32).join(' ')

  return (
    <div
      className={`h-auto w-full
      dark:bg-[#27272A80] bg-[#F4F4F580] backdrop-blur-[4px]  ease-in-out duration-500 z-[9] transition-all py-[96px]
      ${isOpenPopup ? 'animate-fade-in' : 'hidden animate-fade-out'}`}
    >
      <div
        className={cn(
          className,
          `flex flex-col z-[10] rounded-lg duration-500 ease-in-out
      max-w-[1032px] w-[95%] mx-auto
      transition-opacity ${isOpenPopup ? 'animate-fade-in' : 'animate-fade-out'}`
        )}
      >
        <div className="relative rounded-t-[8px] px-[32px] py-[20px] dark:bg-[#1E293B] bg-[#E4E4E7]">
          <div>
            {threadTitle && threadTitleChunks.length > 32
              ? threadTitleHeading + '…'
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
        <div className="flex flex-col dark:bg-[#18181B] bg-[white] h-auto rounded-b-[8px]">
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
              isPopup
              initialMessages={initialMessages}
              chatbot={activeThread?.chatbot}
              threadId={activeThread?.threadId}
              chatPanelClassName="!pl-0 rounded-b-[8px] overflow-hidden !relative"
            />
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}
