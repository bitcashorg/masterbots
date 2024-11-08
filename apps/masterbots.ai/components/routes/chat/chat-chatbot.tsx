//* Component for rendering a chatbot interface

'use client'

import type { Chatbot } from 'mb-genql'
import { useEffect, useState } from 'react'
import { Chat } from '@/components/routes/chat/chat'
import type { Message } from 'ai/react'
import { useThread } from '@/lib/hooks/use-thread'

export const ChatChatbot = ({
  initialMessages, //* Initial messages to populate the chat
  chatbot //* Chatbot data to interact with
}: {
  initialMessages?: Message[]
  chatbot?: Chatbot
}) => {
  //* Retrieves popup state from useThread hook
  const { isOpenPopup } = useThread()

  //* Manages the ID for a new chat thread
  const [newThreadId, setNewThreadId] = useState<string>(crypto.randomUUID())

  //* Updates the thread ID when popup is closed
  useEffect(() => {
    if (isOpenPopup) return
    setNewThreadId(crypto.randomUUID()) //* Generates a new thread ID
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
