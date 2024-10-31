'use client'

//* ChatThreadListPanel initializes and renders the chat interface with the active thread's messages and chatbot details.

import { useThread } from '@/lib/hooks/use-thread'
import { Chat } from '@/components/routes/chat/chat'

export default function ChatThreadListPanel() {
  const { initialMessages, activeThread } = useThread()

  return (
    <Chat
      initialMessages={initialMessages}  // Initial messages to populate the chat
      chatbot={activeThread?.chatbot}  // Chatbot information for the active thread
      threadId={activeThread?.threadId}  // Active thread's ID
    />
  )
}