'use client'

import type { Thread } from '@repo/mb-genql'
import { DialogProps } from '@radix-ui/react-dialog'
import { useSetState } from 'react-use'
import { cn } from '@/lib/utils'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { ThreadAccordion } from './thread-accordion'
import { ThreadHeading } from './thread-heading'
import { createMessagePairs } from '@/lib/threads'

export function ThreadListAccordion({
  thread,
  chat = false,
  isUser = false,
  isBot = false
}: ThreadListAccordionProps) {
  const [state, setState] = useSetState({
    isOpen: false,
    firstQuestion:
      thread.messages.find(m => m.role === 'user')?.content || 'not found',
    firstResponse:
      thread.messages.find(m => m.role === 'assistant')?.content || 'not found'
  })

  return (
    <Accordion
      className="w-full"
      onValueChange={v => {
        setState({ isOpen: v[0] === 'pair-1' })
      }}
      type="multiple"
    >
      {/* Frist level question and excerpt visible  on lists */}
      <AccordionItem
        className="border-b-mirage border-solid relative"
        value="pair-1"
      >
        <AccordionTrigger
          isSticky
          className={cn(
            'hover:bg-mirage px-2 border border-[transparent] dark:border-b-mirage border-b-gray-300 rounded-t-lg',
            state.isOpen && 'bg-mirage'
          )}
        >
          <ThreadHeading
            chat={chat}
            copy={state.isOpen}
            question={state.firstQuestion}
            response={state.isOpen ? '' : state.firstResponse}
            thread={thread}
            {...(isBot ? { isBot } : {})}
            {...(isUser ? { isUser } : {})}
          />
        </AccordionTrigger>

        {/* TODO: we need to slide down the content */}
        <AccordionContent>
          {/* Secod level accordion with follow up questions
             showHeading must be false as we already have in screen on AccordionTrigger above */}
          <div className="overflow-y-scroll scrollbar srcoll-smooth max-h-[500px]">
            <ThreadAccordion
              chat={chat}
              clientFetch
              showHeading={false}
              thread={thread}
              initialMessagePairs={createMessagePairs(thread.messages)}
              className="border-r-[transparent]"
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

interface ThreadListAccordionProps extends DialogProps {
  thread: Thread
  chat?: boolean
  isBot?: boolean
  isUser?: boolean
}
