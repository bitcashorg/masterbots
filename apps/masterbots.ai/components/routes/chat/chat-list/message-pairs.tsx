import { ChatLoadingState } from '@/components/routes/chat/chat-list/chat-loading-state'
import { MessagePairAccordion } from '@/components/routes/chat/chat-list/message-pair-accordion'
import type { FileAttachment } from '@/lib/hooks/use-chat-attachments'
import { useThread } from '@/lib/hooks/use-thread'
import type { MessagePair } from '@/lib/threads'
import { Separator } from '@radix-ui/react-dropdown-menu'
import type { Chatbot } from 'mb-genql'

export function MessagePairs({
  pairs,
  previousPairs,
  isThread,
  chatTitleClass,
  chatArrowClass,
  chatContentClass,
  sendMessageFn,
  userAttachments,
}: {
  isThread: boolean
  pairs: MessagePair[]
  previousPairs: MessagePair[]
  userAttachments: FileAttachment[]
  chatbot?: Chatbot
  chatTitleClass?: string
  chatArrowClass?: string
  chatContentClass?: string
  sendMessageFn?: (message: string) => void
}) {
  const { isNewResponse } = useThread()
  console.log('pairs --> ', pairs)
  // TODO: Re-arrange the questions when the thread has a previous conversation from a different thread
  return (
    <>
      {previousPairs.map((pair: MessagePair, key: number, pairsArray) => {
        const filteredUserAttachments =
          userAttachments?.filter((attachment) =>
            (attachment as FileAttachment).messageIds?.includes(pair.userMessage.id),
          ) || []
        return (
          <MessagePairAccordion
            key={`${pair.userMessage.createdAt}-${pair.chatGptMessage[0]?.id ?? 'pending'}`}
            pair={pair}
            isThread={isThread}
            index={key}
            arrayLength={pairsArray.length}
            isNewResponse={isNewResponse}
            type="previous"
            sendMessageFn={sendMessageFn}
            chatTitleClass={chatTitleClass}
            userAttachments={filteredUserAttachments as FileAttachment[]}
            chatContentClass={chatContentClass}
          />
        )
      })}
      {previousPairs.length > 0 && pairs.length > 0 && (
        <Separator className="relative mt-6 -bottom-1.5 h-1.5 z-[2] rounded-sm bg-iron dark:bg-mirage" />
      )}
      {pairs.map((pair: MessagePair, key: number, pairsArray) => {
        const filteredUserAttachments =
          userAttachments?.filter((attachment) =>
            (attachment as FileAttachment).messageIds?.includes(pair.userMessage.id),
          ) || []
        return pair.chatGptMessage[0] && pair.userMessage ? (
          <>
            <MessagePairAccordion
              key={`${pair.userMessage.createdAt}-${pair.chatGptMessage[0]?.id ?? 'pending'}`}
              pair={pair}
              isThread={isThread}
              index={key}
              arrayLength={pairsArray.length}
              isNewResponse={isNewResponse}
              type="current"
              chatTitleClass={chatTitleClass}
              chatContentClass={chatContentClass}
              sendMessageFn={sendMessageFn}
              userAttachments={filteredUserAttachments as FileAttachment[]}
            />
            {pairsArray.length > 1 && key === pairsArray.length - 1 ? (
              <ChatLoadingState key="chat-loading-state" />
            ) : null}
          </>
        ) : null
      })}
    </>
  )
}
