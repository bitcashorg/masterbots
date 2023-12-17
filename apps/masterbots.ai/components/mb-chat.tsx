'use client'

import { nanoid } from '@/lib/utils'
import { ChatPanel } from './chat-panel'
import { Message, useChat } from 'ai/react/dist'
import { usePathname, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function MbChat({
  id,
  initialMessages,
  className,
  bot
}: MBChatProps) {
  const router = useRouter()
  const path = usePathname()
  const { messages, append, reload, stop, isLoading, input, setInput } =
    useChat({
      initialMessages,
      id,
      body: {
        id
      },
      onResponse(response) {
        if (response.status === 401) {
          toast.error(response.statusText)
        }
      },
      onFinish() {
        if (!path.includes('chat')) {
          //router.push(`/chat/${id}`, { shallow: true, scroll: false })
          //router.refresh()
        }
      }
    })
  return (
    <ChatPanel
      id={id}
      isLoading={isLoading}
      stop={stop}
      append={append}
      reload={reload}
      messages={messages}
      input={input}
      setInput={setInput}
    />
  )
}

export interface MBChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
  bot: string
}
