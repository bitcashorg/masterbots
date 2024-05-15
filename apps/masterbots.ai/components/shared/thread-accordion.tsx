'use client'

import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { MessagePair } from '@/lib/threads'
import { cn } from '@/lib/utils'
import { ThreadHeading } from './thread-heading'
import { BrowseChatMessage } from './thread-message'
import { usePathname, useRouter } from 'next/navigation'
import { toSlug } from '@/lib/url-params'
import {  getMessagePairs } from '@/app/actions'
import { MB } from '@repo/supabase'

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
  const router = useRouter()

  const { data: pairs, error } = useQuery({
    queryKey: [`messages-${thread.threadId}`],
    queryFn: () => getMessagePairs(thread.threadId),
    initialData: [], //initialMessagePairs,
    networkMode: 'always',
    refetchOnMount: true,
    enabled: clientFetch
  })

  // update url when thread accordion opens and closes
  // use cases: when using ThreadDialog and ThreadListAccordion
  // we want this logic here on central place
  useEffect(() => {
    const url = new URL(window.location.href)
    url.searchParams.set('threadId', thread.threadId)

    // chat uses different url
    if (chat) {
      router.push(`/c/${toSlug(thread.chatbot.name)}/${thread.threadId}`)
    } else {
      window.history.pushState({}, '', url.href)
    }

    // hack to delete threadId after initial render
    // TODO: remove params on next middleware
    if (pathname.includes(thread.threadId)) {
      url.searchParams.delete('threadId')
      window.history.pushState({}, '', url.pathname + url.search)
    }
    // Cleanup function to remove the query parameter on unmount
    return () => {
      const url = new URL(window.location.href)
      url.searchParams.delete('threadId')
      window.history.pushState({}, '', url.pathname + url.search)
    }
  }, [thread.threadId, pathname])

  if (error) return <div>There was an error loading thread messages</div>

  return (
    <div className="flex w-full">
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
                    <div className="pl-12 md:text-lg">{p.question.content}</div>
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
                      question={p.question.content}
                      thread={thread}
                    />
                  </AccordionTrigger>
                ) : null
              }

              <AccordionContent
                aria-expanded
                className={cn('mx-8 border-x border-solid border-mirage')}
              >
                <div>content</div>
                {/* {p.chatGptMessage.map(message => (
                  <BrowseChatMessage
                    chatbot={thread.chatbot}
                    key={`message-${message.messageId}`}
                    message={convertMessage(message)}
                  />
                ))} */}
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}

interface ThreadAccordionProps {
  thread: MB.ThreadFull
  initialMessagePairs: MessagePair[]
  clientFetch?: boolean
  chat?: boolean
  showHeading?: boolean
}
