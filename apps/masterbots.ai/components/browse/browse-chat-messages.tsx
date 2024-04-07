// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatcleanMessage.tsx

import type * as AI from 'ai'
import type { Chatbot, Message, User } from '@repo/mb-genql'
import React from 'react'
import { getMessages } from '@/services/hasura'
import BrowseChatbotDetails from '../b/bot-details'
import { BrowseChatMessageList } from './browse-chat-message-list'

export interface MessagePair {
  userMessage: Message
  chatGptMessage: Message[]
}

export function convertMessage(message: Message) {
  return {
    id: message.messageId,
    content: message.content,
    createAt: message.createdAt,
    role: message.role
  } as AI.Message
}

export function BrowseChatMessages({
  threadId,
  user,
  chatbot
}: {
  threadId: string
  user?: User
  chatbot?: Chatbot
}) {
  const [messages, setMessages] = React.useState<Message[]>([])
  const fetchMessages = async () => {
    if (threadId && !messages.length) {
      const messages = await getMessages({ threadId })
      setMessages(messages)
    }
  }
  React.useEffect(() => {
    fetchMessages()
  }, [threadId])

  return (
    <div className="w-full">
      <BrowseChatbotDetails chatbot={chatbot} />
      <div className="max-w-[1024px] px-4 mx-auto mt-8 flex gap-y-4 flex-col">
        <BrowseChatMessageList
          chatbot={chatbot}
          isThread
          messages={messages}
          user={user}
        />
      </div>
    </div>
  )
}
