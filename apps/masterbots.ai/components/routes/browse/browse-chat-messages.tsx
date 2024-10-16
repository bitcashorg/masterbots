// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatcleanMessage.tsx

import * as AI from 'ai'
import { Chatbot, Message, User } from 'mb-genql'
import React from 'react'
import BrowseChatbotDetails from '@/components/routes/browse/browse-chatbot-details'
import { BrowseChatMessageList } from '@/components/routes/browse/browse-chat-message-list'
import { getMessages } from '@/services/hasura'

export type MessagePair = {
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
      const messages = await getMessages({ threadId: threadId })
      setMessages(messages)
    }
  }
  React.useEffect(() => {
    fetchMessages()
  }, [threadId])

  return (
    <div className="w-full">
      <BrowseChatbotDetails chatbot={chatbot} />
      <div className="flex flex-col max-w-screen-lg px-4 mx-auto mt-8 gap-y-4">
        <BrowseChatMessageList
          user={user}
          chatbot={chatbot}
          messages={messages}
          isThread
        />
      </div>
    </div>
  )
}
