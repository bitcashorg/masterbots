'use client'

import type { Thread } from '@repo/mb-genql'
import { ThreadAccordion } from './thread-accordion'
import { ThreadHeading } from './thread-heading'
import { cn } from '@/lib/utils'
import { DialogProps } from '@radix-ui/react-dialog'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { useSetState } from 'react-use'

export function ThreadDoubleAccordion({
  thread,
  chat = false
}: ThreadDoubleAccordionProps) {
  const [state, setState] = useSetState({
    isOpen: false,
    firstQuestion:
      thread.messages.find(m => m.role === 'user')?.content || 'not found',
    firstResponse:
      thread.messages.find(m => m.role === 'assistant')?.content || 'not found'
  })

  return (
    <Accordion
      type="multiple"
      className="w-full"
      onValueChange={v => setState({ isOpen: v[0] === 'pair-1' })}
    >
      <AccordionItem value="pair-1">
        <AccordionTrigger
          className={cn('hover:bg-mirage px-5', state.isOpen && 'bg-mirage')}
        >
          <ThreadHeading
            thread={thread}
            question={state.firstQuestion}
            response={state.isOpen ? '' : state.firstResponse}
            chat={chat}
            copy={state.isOpen}
          />
        </AccordionTrigger>

        <AccordionContent className={cn('pl-14')}>
          <ThreadAccordion
            thread={thread}
            clientFetch={true}
            chat={chat}
            showHeading={false}
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
