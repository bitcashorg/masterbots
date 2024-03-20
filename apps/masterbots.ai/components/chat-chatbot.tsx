'use client'

import { Chatbot } from 'mb-genql'
import { useEffect, useState } from 'react'
import { Chat } from './chat'
import { Message } from 'ai/react'
import { useThread } from '@/lib/hooks/use-thread'
import { nanoid } from 'nanoid'

export const ChatChatbot = ({
  initialMessages,
  chatbot
}: {
  initialMessages?: Message[]
  chatbot?: Chatbot
}) => {
  const { isOpenPopup } = useThread()
  const [newThreadId, setNewThreadId] = useState<string>(nanoid())

  useEffect(() => {
    if (isOpenPopup) return
    setNewThreadId(nanoid())
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
