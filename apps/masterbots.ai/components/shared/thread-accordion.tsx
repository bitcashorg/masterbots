'use client'

import { useEffect, useState } from 'react'
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
import { usePathname } from 'next/navigation'
import { clone } from 'lodash'

export function ThreadAccordion({
  thread,
  initialMessagePairs,
  clientFetch = false,
  chat = false,
  // disable automatic client fetch by default
  // ThreadList sets this to true to load the rest of messages inside ThreadDialog or ThreadListAccordion
  // ThreadList only receives the first question and answer
  showHeading = true
}: ThreadAccordionProps) {
  const pathname = usePathname()

  const { data: pairs, error } = useQuery({
    queryKey: [`messages-${thread.threadId}`],
    queryFn: () => getMessagePairs(thread.threadId),
    initialData: initialMessagePairs,
    networkMode: 'always',
    refetchOnMount: true,
    enabled: clientFetch
  })

  console.log({
    initialMessagePairs,
    pairs
  })

  // update url when thread accordion opens and closes
  // use cases: when using ThreadDialog and DoubleThreadAccordion
  // we want this logic here on central place
  useEffect(() => {
    // clone pathname instead of ref to keep initialValue
    const initialPathname = clone(pathname)
    // base path changes based on chat prop
    // if chat true redirects to /c/{thredId} for chatting experience
    // else defaults to public url /{category}/{threadId}
    console.log(toSlug(thread.chatbot.categories[0]?.category?.name))
    const dir = chat
      ? `/c/${toSlug(thread.chatbot.name)}`
      : `/${toSlug(thread.chatbot.categories[0]?.category?.name)}`
    const threadUrl = `${dir}/${thread.threadId}`
    console.log({ threadUrl, initialPathname })
    // not necessary to update if already the same a
    // eg. in thread landing pages /{category}/{threadId}
    if (threadUrl === initialPathname) return
    console.log(
      `Updating URL to ${threadUrl}, initialUrl was ${initialPathname}`
    )

    // window.history.pushState({}, '', threadUrl)
    return () => {
      // window.history.pushState({}, '', initialPathname)
    }
  })

  if (error) return <div>There was an error loading thread messages</div>

  return (
    <Accordion
      className={cn('w-full border border-solid border-mirage scroll')}
      defaultValue={['pair-0', 'pair-1', 'pair-2']}
      type="multiple"
      key={`accordion-${JSON.stringify(pairs)}`}
    >
      {pairs.map((p, key) => {
        const isFirst = key === 0
        console.log(key, p)
        return (
          <AccordionItem
            key={`accordion-item-${thread.threadId}-pair-${key}`}
            value={`pair-${key}`}
          >
            {
              // is not the frist question we return follow question style
              !isFirst ? (
                <AccordionTrigger
                  className={cn('px-5 border-y border-solid border-mirage')}
                >
                  <div className="pl-12 md:text-lg">
                    {p.userMessage.content}
                  </div>
                </AccordionTrigger>
              ) : null
            }

            {
              // when using ThreadAccordion inside ThreadDialog or ThreadListAccordion we want
              // to control heading and hide and ThreadAccordion and ThreadDialog show the ThreadHeading already
              // when using ThreadAccordion in thread landing page /{category}/{threadId} showHeading must be true
              // ThreadHeading is the the big one with the user avatar, ThreadDialog or ThreadListAccordion is hidden
              showHeading && isFirst ? (
                <AccordionTrigger
                  className={cn(
                    'px-5',
                    isFirst
                      ? 'bg-mirage'
                      : 'border-y border-solid border-mirage'
                  )}
                >
                  <ThreadHeading
                    chat={chat}
                    copy
                    question={p.userMessage.content}
                    thread={thread}
                  />
                </AccordionTrigger>
              ) : null
            }

            <AccordionContent
              aria-expanded
              className={cn('mx-8 border-x border-solid border-mirage')}
            >
              {p.chatGptMessage.map(message => (
                <BrowseChatMessage
                  chatbot={thread.chatbot}
                  key={`message-${message.messageId}`}
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
  initialMessagePairs: MessagePair[]
  clientFetch?: boolean
  chat?: boolean
  showHeading?: boolean
}
