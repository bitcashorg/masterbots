'use client'

import { useThread } from '@/lib/hooks/use-thread'
import { Chat } from '@/components/routes/chat/chat'

export default function ChatThreadListPanel() {
  const { initialMessages, activeThread } = useThread()
  return (
    <Chat
      initialMessages={initialMessages}
      chatbot={activeThread?.chatbot}
      threadId={activeThread?.threadId}
    />
  )
}
