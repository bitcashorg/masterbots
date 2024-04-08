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

export function ThreadAccordion({
  thread,
  initialMessagePairs,
  clientFetch = false
}: ThreadAccordionProps) {
  // initalMessages is coming from server ssr on load. the rest of messages on demand on mount
  const {
    data: pairs,
    isLoading,
    error
  } = useQuery({
    queryKey: [`messages-${thread.threadId}`],
    queryFn: () => getMessagePairs(thread.threadId),
    initialData: initialMessagePairs,
    refetchOnMount: true,
    enabled: clientFetch
  })

  // update url when dialog opens and closes
  useEffect(() => {
    const initialUrl = location.href
    const threadUrl = `/${thread.chatbot.categories[0].category.name.toLowerCase().replaceAll(' ', '_').replaceAll('&', '_')}/${thread.threadId}`
    console.log(`Updating URL to ${threadUrl}, initialUrl was ${initialUrl}`)

    window.history.pushState({}, '', threadUrl)
    return () => {
      window.history.pushState({}, '', initialUrl)
    }
  })

  if (error) return <div>There was an error loading thread messages</div>

  // if no initial message and still loading show loading message
  if (!pairs?.length && isLoading) return <div>Loading thread messages ...</div>

  console.log(pairs.map((_p, key) => `pair-${key}`))
  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={['pair-0', 'pair-1', 'pair-2']}
    >
      {pairs.map((p, key) => {
        return (
          <AccordionItem value={`pair-${key}`} key={key}>
            <AccordionTrigger>
              {key ? (
                p.userMessage.content
              ) : (
                <ThreadHeading
                  thread={thread}
                  question={p.userMessage.content}
                />
              )}
            </AccordionTrigger>
            <AccordionContent aria-expanded={true}>
              {p.chatGptMessage.map((message, index) => (
                <BrowseChatMessage
                  chatbot={thread.chatbot}
                  key={index}
                  message={convertMessage(message)}
                />
              ))}
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
}
