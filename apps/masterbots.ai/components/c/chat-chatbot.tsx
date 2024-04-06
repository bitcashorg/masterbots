'use client'

import { Chatbot } from '@repo/mb-genql'
import { useEffect, useState } from 'react'
import { Chat } from './chat'
import { Message } from 'ai/react'
import { useThread } from '@/hooks/use-thread'

export const ChatChatbot = ({
  initialMessages,
  chatbot
}: {
  initialMessages?: Message[]
  chatbot?: Chatbot
}) => {
  const { isOpenPopup } = useThread()
  const [newThreadId, setNewThreadId] = useState<string>(crypto.randomUUID())

  useEffect(() => {
    if (isOpenPopup) return
    setNewThreadId(crypto.randomUUID())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenPopup])

  return (
    <Chat
      initialMessages={initialMessages}
      chatbot={chatbot}
      threadId={newThreadId}
    />
  )
}
