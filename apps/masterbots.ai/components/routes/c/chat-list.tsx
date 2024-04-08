import { type Message } from 'ai'
import type { Chatbot } from '@repo/mb-genql'
import React from 'react'
import { useThread } from '@/hooks/use-thread'

export interface ChatList {
  messages: Message[]
  sendMessageFromResponse?: (message: string) => void
  chatbot?: Chatbot
  isThread?: boolean
  className?: string
  chatContentClass?: string
  chatTitleClass?: string
  chatArrowClass?: string
}

interface MessagePair {
  userMessage: Message
  chatGptMessage: Message[]
}

export function ChatList({
  className,
  messages,
  sendMessageFromResponse,
  chatbot,
  isThread = true,
  chatContentClass,
  chatTitleClass,
  chatArrowClass
}: ChatList) {
  const [pairs, setPairs] = React.useState<MessagePair[]>([])
  const { isNewResponse } = useThread()

  // React.useEffect(() => {
  //   if (messages.length) {
  //     const prePairs: MessagePair[] = createMessagePairs(
  //       messages as Message[]
  //     ) as MessagePair[]
  //     setPairs(prePairs)
  //   } else setPairs([])
  // }, [messages])

  if (!messages.length) return null
  return (
    <div
      className={`relative max-w-3xl px-4 mx-auto ${className || ''} ${isThread ? 'flex flex-col gap-3' : ''}`}
    >
      Accordion
    </div>
  )
}
