import { DialogProps } from '@radix-ui/react-dialog'
import type { MB } from '@repo/supabase'
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
  chat = false
}: ThreadListAccordionProps) {
  return (
    <Accordion className="w-full" type="multiple">
      <AccordionItem value="pair-1">
        <AccordionTrigger
          className={cn('hover:bg-mirage px-5 data-[state=open]:bg-mirage')}
        >
          <ThreadHeading
            chat={chat}
            // copy={isOpen}
            question={thread.firstMessage.content}
            response={thread.firstAnswer.content}
            thread={thread}
          />
        </AccordionTrigger>

        <AccordionContent className={cn('pl-14')}>
          {/* Secod level accordion with follow up questions
             showHeading must be false as we already have in screen on AccordionTrigger above */}
          <div className="overflow-y-scroll scrollbar srcoll-smooth max-h-[500px]">
            <ThreadAccordion
              chat={chat}
              clientFetch
              initialMessagePairs={createMessagePairs([
                thread.firstMessage,
                thread.firstAnswer
              ])}
              showHeading={false}
              thread={thread}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

interface ThreadListAccordionProps extends DialogProps {
  thread: MB.ThreadFull
  chat?: boolean
}
