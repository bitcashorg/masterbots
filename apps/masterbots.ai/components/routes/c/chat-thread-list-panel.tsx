'use client'

import { useThread } from '@/hooks/use-thread'
import { Chat } from './chat'

export default function ChatThreadListPanel() {
  const { initialMessages, activeThread } = useThread()
  return (
    <Chat
      chatbot={activeThread?.chatbot}
      initialMessages={initialMessages}
      threadId={activeThread?.threadId}
    />
  )
}