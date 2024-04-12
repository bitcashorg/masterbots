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

export function ThreadDoubleAccordion({
  thread,
  chat = false
}: ThreadDoubleAccordionProps) {
  const [state, setState] = useSetState({
    isOpen: false,
    firstQuestion:
      thread.messages.find(m => m.role === 'user').content || 'not found',
    firstResponse:
      thread.messages.find(m => m.role === 'assistant').content || 'not found'
  })

  return (
    <Accordion
      className="w-full"
      onValueChange={v => { setState({ isOpen: v[0] === 'pair-1' }); }}
      type="multiple"
    >
      <AccordionItem value="pair-1">
        <AccordionTrigger
          className={cn('hover:bg-mirage px-5', state.isOpen && 'bg-mirage')}
        >
          <ThreadHeading
            chat={chat}
            copy={state.isOpen}
            question={state.firstQuestion}
            response={state.isOpen ? '' : state.firstResponse}
            thread={thread}
          />
        </AccordionTrigger>

        <AccordionContent className={cn('pl-14')}>
          <ThreadAccordion
            chat={chat}
            clientFetch
            showHeading={false}
            thread={thread}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

interface ThreadDoubleAccordionProps extends DialogProps {
  thread: Thread
  chat?: boolean
}
