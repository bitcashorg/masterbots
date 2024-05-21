'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { createMessagePairs } from '@/lib/threads'
import { cn, sleep } from '@/lib/utils'
import { DialogProps } from '@radix-ui/react-dialog'
import type { MB } from '@repo/supabase'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { useSetState } from 'react-use'
import { ThreadAccordionClient } from './thread-accordion.client'
import { ThreadHeading } from './thread-heading'

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
  const searchParams = useSearchParams();
  const threadRef = useRef<HTMLDivElement>(null)
  const handleThreadIdChange = async () => {
    if (searchParams.get('threadId') === thread.threadId) {
      await sleep(300) // animation time
      threadRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else if (state.isOpen && searchParams.get('threadId')) {
      setState({ isOpen: false })
    }
  }

  useEffect(() => {
    handleThreadIdChange()
  }, [searchParams])

  return (
    <Accordion
      className="w-full"
      onValueChange={v => {
        setState({ isOpen: v[0] === 'pair-1' })
      }}
      type="multiple"
    >
      {/* Frist level question and excerpt visible  on lists */}
      <AccordionItem className="border-b-mirage border-solid relative" value="pair-1">
        <AccordionTrigger
          isSticky
          className={cn('hover:bg-mirage px-2 border border-[transparent] dark:border-b-mirage border-b-gray-300 rounded-t-lg', state.isOpen && 'bg-mirage')}
        >
          <ThreadHeading
            chat={chat}
            // copy={isOpen}
            question={thread.firstMessage.content}
            response={thread.firstAnswer.content}
            thread={thread}
          />
        </AccordionTrigger>

        <AccordionContent>
          {/* Secod level accordion with follow up questions
             showHeading must be false as we already have in screen on AccordionTrigger above */}
          <div className="overflow-y-scroll scrollbar srcoll-smooth max-h-[500px]">
            <ThreadAccordionClient
              chat={chat}
              thread={thread}
              initialMessagePairs={createMessagePairs(thread.messages)}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

interface ThreadListAccordionProps extends DialogProps {
  thread: MB.Thread
  chat?: boolean
  isUser?: boolean
  isBot?: boolean
}
