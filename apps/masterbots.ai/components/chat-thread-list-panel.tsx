'use client'

import { useThread } from '@/lib/hooks/use-thread'
import { Chat } from './chat'

export default function ChatThreadListPanel() {
  const { initialMessages, activeThread } = useThread()
  return (
    <>
      {activeThread && initialMessages ? (
        <Chat
          initialMessages={initialMessages}
          chatbot={activeThread.chatbot}
          threadId={activeThread.threadId}
        />
      ) : (
        <></>
      )}
    </>
  )
}
