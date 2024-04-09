'use client'

import type { Thread } from '@repo/mb-genql'
import { ThreadAccordion } from './thread-accordion'
import { ThreadHeading } from './thread-heading'
import { cn } from '@/lib/utils'
import { DialogProps } from '@radix-ui/react-dialog'
import {
  Accordion,
  AccordionContent,
  AccordionTrigger
} from '@/components/ui/accordion'

export function ThreadDoubleAccordion({
  thread,
  chat = false
}: ThreadDoubleAccordionProps) {
  const firstQuestion =
    thread.messages.find(m => m.role === 'user')?.content || 'not found'
  const firstResponse =
    thread.messages.find(m => m.role === 'assistant')?.content || 'not found'

  return (
    <Accordion type="multiple" className="w-full">
      <AccordionTrigger>
        <ThreadHeading
          thread={thread}
          question={firstQuestion}
          response={firstResponse}
          chat={chat}
        />
      </AccordionTrigger>

      <AccordionContent
        className={cn(
          'max-w-[1400px] w-[80%] h-[90%] hide-buttons overflow-auto'
        )}
      >
        <ThreadAccordion thread={thread} clientFetch={true} chat={chat} />
      </AccordionContent>
    </Accordion>
  )
}

interface ThreadDoubleAccordionProps extends DialogProps {
  thread: Thread
  chat?: boolean
}
