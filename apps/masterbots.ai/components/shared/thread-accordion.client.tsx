'use client'

import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'
import { MB } from '@repo/supabase'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import { getMessagePairs } from '@/app/actions'
import { ThreadHeading } from './thread-heading'
import { BrowseChatMessage } from './thread-message'
import { getThreadLink } from '@/lib/threads'

export function ThreadAccordionClient({
  thread,
  initialMessagePairs,
  chat = false
}: ThreadAccordionProps) {
  const pathname = usePathname()
  const router = useRouter()

  const { data: pairs, error } = useQuery({
    queryKey: [`messages-${thread.threadId}`],
    queryFn: () => getMessagePairs(thread.threadId),
    initialData: initialMessagePairs,
    networkMode: 'always',
    refetchOnMount: true
  })

  // update url when thread accordion opens and closes
  useEffect(() => {
    const url = new URL(window.location.href)
    url.searchParams.set('threadId', thread.threadId)

    if (chat) {
      router.push(getThreadLink({ chat: true, thread }))
    } else {
      window.history.pushState({}, '', url.href)
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
        key={`accordion-${JSON.stringify(pairs)}`}
        type="multiple"
      >
        {
          // this could could be thread-accordion-items.client.tsx
          pairs.map((p, key) => {
            const isFirst = key === 0
            return (
              <AccordionItem
                key={`accordion-item-${thread.threadId}-pair-${key}`}
                value={`pair-${key}`}
              >
                {
                  // first response
                  !isFirst ? (
                    <AccordionTrigger
                      className={cn('px-4 border-y border-solid border-mirage')}
                    >
                      <div className="px-12 md:text-lg">
                        {p.question.content}
                      </div>
                    </AccordionTrigger>
                  ) : null
                }

                <AccordionContent
                  aria-expanded
                  className={cn('mx-8 border-x border-solid border-mirage')}
                >
                  {p.answer ? (
                    <BrowseChatMessage
                      key={`message-${p.answer.id}`}
                      message={p.answer}
                    />
                  ) : (
                    'assistant answer not found'
                  )}
                </AccordionContent>
              </AccordionItem>
            )
          })
        }
      </Accordion>
    </div>
  )
}

interface ThreadAccordionProps {
  thread: MB.ThreadFull
  initialMessagePairs: MB.MessagePair[]
  chat?: boolean
}
