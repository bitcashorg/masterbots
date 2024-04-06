'use client'

import { useThread } from '@/hooks/use-thread'
import { Chat } from './chat'

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
