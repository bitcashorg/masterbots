'use client'

import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Thread } from '@repo/mb-genql'
import { getMessagePairs } from '@/services/hasura'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { MessagePair, convertMessage } from '@/lib/threads'
import { cn } from '@/lib/utils'
import { toSlug } from '@/lib/url'
import { ThreadHeading } from './thread-heading'
import { BrowseChatMessage } from './thread-message'

export function ThreadAccordion({
  thread,
  initialMessagePairs,
  clientFetch = false,
  chat = false,
  showHeading = true
}: ThreadAccordionProps) {
  // initalMessages is coming from server ssr on load. the rest of messages on demand on mount
  const { data: pairs, error } = useQuery({
    queryKey: [`messages-${thread.threadId}`],
    queryFn: () => getMessagePairs(thread.threadId),
    initialData: initialMessagePairs,
    refetchOnMount: true,
    enabled: clientFetch
  })

  // update url when dialog opens and closes
  useEffect(() => {
    const initialUrl = location.href
    const dir =
      `c/${ 
      toSlug(
        chat ? thread.chatbot.name : thread.chatbot.categories[0].category.name
      )}`

    const threadUrl = `/${dir}/${thread.threadId}`
    console.log(`Updating URL to ${threadUrl}, initialUrl was ${initialUrl}`)

    window.history.pushState({}, '', threadUrl)
    return () => {
      window.history.pushState({}, '', initialUrl)
    }
  })

  if (error) return <div>There was an error loading thread messages</div>

  // if no initial message and still loading show loading message
  // NOTE: its fast and transitions in. testing without this
  if (!pairs.length) return null

  return (
    <Accordion
      className="w-full"
      defaultValue={['pair-0', 'pair-1', 'pair-2']}
      type="multiple"
    >
      {pairs.map((p, key) => {
        return (
          <AccordionItem key={key} value={`pair-${key}`}>
            {showHeading ? (
              <AccordionTrigger className={cn('bg-mirage')}>
                {key ? (
                  <div className="pl-12">{p.userMessage.content}</div>
                ) : (
                  <ThreadHeading
                    chat={chat}
                    copy
                    question={p.userMessage.content}
                    thread={thread}
                  />
                )}
              </AccordionTrigger>
            ) : null}
            <AccordionContent aria-expanded>
              <div className="px-7">
                {p.chatGptMessage.map((message, index) => (
                  <BrowseChatMessage
                    chatbot={thread.chatbot}
                    key={index}
                    message={convertMessage(message)}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}

interface ThreadAccordionProps {
  thread: Thread
  initialMessagePairs?: MessagePair[]
  clientFetch?: boolean
  chat?: boolean
  showHeading?: boolean
}
