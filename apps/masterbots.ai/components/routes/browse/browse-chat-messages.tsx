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

import BrowseChatbotDetails from '@/components/routes/browse/browse-chatbot-details'
import type * as AI from 'ai'
import type { Chatbot, Message, User } from 'mb-genql'
import React from 'react'
import { BrowseThreadBlog } from '@/components/routes/browse/browse-thread-blog'

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
  parentThreadId,
  user,
  chatbot
}: {
  threadId: string
  parentThreadId?: string
  user?: User
  chatbot?: Chatbot
}) {
  
  return (
    <div className="w-full">
      {chatbot ? (
        <BrowseChatbotDetails
          chatbot={chatbot}
          variant={chatbot.name ? 'selected' : 'default'}
        />
      ) : (
        ''
      )}
      <div className="flex flex-col max-w-screen-lg px-4 mx-auto mt-8 gap-y-4">
        <BrowseThreadBlog threadId={threadId} user={user} />
      </div>
    </div>
  )
}
