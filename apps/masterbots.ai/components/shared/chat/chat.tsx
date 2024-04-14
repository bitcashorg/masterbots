import { createMessagePairs } from '@/lib/threads'
import { NewChatInput } from './chat-input'
import { Thread } from '@repo/mb-genql'
import { ThreadAccordion } from '../thread-accordion'
import { Message } from 'ai'

// encapsulates chat functionality, expands full width
export function MbChat({ thread, initialMessages }) {
  return (
    // expadn horizontally and justify-between so that input aligns at the bottom
    <div className="w-full flex flex-col justify-between h-full">
      <ThreadAccordion
        chat
        clientFetch
        thread={thread}
        initialMessagePairs={createMessagePairs(thread.messages)}
      />
      <NewChatInput
        chatbot={thread.chatbot}
        id={thread.threadId}
        initialMessages={initialMessages}
      />
    </div>
  )
}

export interface ChatProps {
  thread: Thread
  initialMessages: Message
}
