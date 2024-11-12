// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatcleanMessage.tsx
/**
 * BrowseChatMessages Component
 *
 * This component fetches and displays chat messages for a specific thread.
 * It retrieves messages based on the provided thread ID and renders the chatbot details
 * and the list of messages.
 *
 * Props:
 * - threadId: The ID of the thread to fetch messages for.
 * - user: Optional user object associated with the messages.
 * - chatbot: Optional chatbot object associated with the messages.
 */

import type * as AI from 'ai'
import type { Chatbot, Message, User } from 'mb-genql'
import React from 'react'
import BrowseChatbotDetails from '@/components/routes/browse/browse-chatbot-details'
import { BrowseChatMessageList } from '@/components/routes/browse/browse-chat-message-list'
import { getMessages } from '@/services/hasura'
import { ExternalLink } from '@/components/shared/external-link'
import { toSlug } from 'mb-lib'

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
  const { name: categoryName } = chatbot?.categories[0].category || { name: '' }
  const { name: chatBotName } = chatbot || { name: '' }

  // Fetch messages for the specified thread ID
  const fetchMessages = async () => {
    if (threadId && !messages.length) {
      const messages = await getMessages({ threadId: threadId })
      setMessages(messages)
    }
  }

  // Effect to fetch messages when the thread ID changes
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

        <div className="border-t border-t-iron dark:border-t-mirage pt-6 text-center mt-44 lg:mt-96">
          <ExternalLink href={`/c/${toSlug(categoryName)}/${toSlug(chatBotName)}?continuousThreadId=${threadId}`}>Continue Thread</ExternalLink>
        </div>
      </div>
    </div>
  )
}
