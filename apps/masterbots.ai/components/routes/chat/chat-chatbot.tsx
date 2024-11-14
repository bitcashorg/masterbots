//* Component for rendering a chatbot interface

'use client'

import { Chat } from '@/components/routes/chat/chat'
import type { Chatbot } from 'mb-genql'

export const ChatChatbot = ({
  chatbot //* Chatbot data to interact with
}: {
  chatbot?: Chatbot
}) => {
  return (
    <Chat
      chatbot={chatbot}
    />
  )
}
