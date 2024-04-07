'use client'

import type { Chatbot } from '@repo/mb-genql'
import { useEffect, useState } from 'react'
import type { Message } from 'ai/react'
import { useThread } from '@/hooks/use-thread'
import { Chat } from './chat'

export function ChatChatbot({
  initialMessages,
  chatbot
}: {
  initialMessages?: Message[]
  chatbot?: Chatbot
}) {
  const { isOpenPopup } = useThread()
  const [newThreadId, setNewThreadId] = useState<string>(crypto.randomUUID())

  useEffect(() => {
    if (isOpenPopup) return
    setNewThreadId(crypto.randomUUID())
  }, [isOpenPopup])

  return (
    <Chat
      chatbot={chatbot}
      initialMessages={initialMessages}
      threadId={newThreadId}
    />
  )
}
