'use client'

import { useChat, type Message, CreateMessage } from 'ai/react'

import { cn, extractBetweenMarkers } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { EmptyScreen } from '@/components/empty-screen'
import { ChatScrollAnchor } from '@/components/chat-scroll-anchor'

import { toast } from 'react-hot-toast'
import { usePathname, useRouter } from 'next/navigation'
import { uniq } from 'lodash'
import { ChatRequestOptions } from 'ai'
import { nanoid } from 'nanoid'
import { Chatbot } from 'mb-genql'

export function Chat({ id, initialMessages, className, chatbot }: ChatProps) {
  const router = useRouter()
  const path = usePathname()

  const { messages, append, reload, stop, isLoading, input, setInput } =
    useChat({
      // we remove previous assistant responses to get better responses thru
      // our prompting strategy
      initialMessages: initialMessages?.filter(m => m.role === 'system'),
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
          // NOTE: interesting approach to routing
          // router.push(`/chat/${id}`, { shallow: true, scroll: false })
          // router.refresh()
        }
      }
    })

  // we merge past assistant and user messages for ui only
  // we remove system prompts from ui
  const allMessages = uniq(
    initialMessages?.concat(messages) //.filter(m => m.role !== 'assistant')
  )
  // console.log('initial messages', initialMessages)
  // console.log('messages', messages)
  // console.log('all messages', allMessages)

  // we extend append function to add our system prompts
  const appendWithMbContextPrompts = async (
    userMessage: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions
  ) => {
    return append({
      id: nanoid(),
      role: 'user',
      content: `
First, think about the following questions and requests: [${allMessages
        .filter(m => m.role === 'user')
        .map(
          m =>
            `"${
              m.content.includes('Your response tone will be')
                ? extractBetweenMarkers(
                    m.content,
                    'Then answer this question:',
                    '---'
                  )
                : m.content
            }",`
        )}]. Then answer this question: ${userMessage.content} --- 
`
    })
  }

  return (
    <>
      <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
        {/* {messages.length ? ( */}
        <>
          <ChatList messages={allMessages} />
          <ChatScrollAnchor trackVisibility={isLoading} />
        </>
        {/* ) : (
          <EmptyScreen
            setInput={setInput}
            bot={chatbot.name.trim().toLowerCase()}
          />
        )} */}
      </div>
      <ChatPanel
        id={id}
        isLoading={isLoading}
        stop={stop}
        append={appendWithMbContextPrompts}
        reload={reload}
        messages={allMessages}
        input={input}
        setInput={setInput}
      />
    </>
  )
}

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
  chatbot: Chatbot
}
