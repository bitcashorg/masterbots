'use client'

import { useEffect } from 'react'

import { getMessagePairs } from '@/services/hasura'

import { useQuery } from '@tanstack/react-query'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

import { Thread } from '@repo/mb-genql'
import { ThreadHeading } from './thread-heading'
import { MessagePair, convertMessage } from '@/lib/threads'
import { BrowseChatMessage } from './thread-message'
import { cn } from '@/lib/utils'

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


  if (error) return <div>There was an error loading thread messages</div>

  // if no initial message and still loading show loading message
  // NOTE: its fast and transitions in. testing without this
  if (!pairs?.length) return null

  console.log(pairs.map((_p, key) => `pair-${key}`))
  return (
    <Accordion
      type="multiple"
      className="w-full flex flex-col gap-3"
      defaultValue={['pair-0', 'pair-1', 'pair-2']}
    >
      {pairs.map((p, key) => {
        return (
          <AccordionItem value={`pair-${key}`} key={key}>
            { key ? (
              <AccordionTrigger className={cn('bg-mirage')}>
                  <div className="pl-12">{p.userMessage.content}</div>
              </AccordionTrigger>
            ) : showHeading && key === 0 ? 
              <AccordionTrigger className={cn('bg-mirage')}>
                <ThreadHeading
                  thread={thread}
                  question={p.userMessage.content}
                  copy={true}
                  chat={chat}
                />
                </AccordionTrigger>
            : null}
            <AccordionContent aria-expanded={true}>
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
