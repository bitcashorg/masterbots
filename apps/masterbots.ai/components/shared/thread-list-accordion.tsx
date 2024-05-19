import { DialogProps } from '@radix-ui/react-dialog'
import type { MB } from '@repo/supabase'
import { cn } from '@/lib/utils'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { createMessagePairs } from '@/lib/threads'
import { ThreadAccordion } from './thread-accordion'
import { ThreadHeading } from './thread-heading'

export function ThreadListAccordion({
  thread,
  chat = false
}: ThreadListAccordionProps) {
  const isOpen = false
  return (
    <Accordion
      className="w-full"
      // onValueChange={v => setState({ isOpen: v[0] === 'pair-1' })}
      type="multiple"
    >
      {/* Frist level question and excerpt visible  on lists */}
      <AccordionItem value="pair-1">
        <AccordionTrigger
          className={cn('hover:bg-mirage px-5', isOpen && 'bg-mirage')}
        >
          <ThreadHeading
            chat={chat}
            copy={isOpen}
            question={thread.firstUserMessage.content}
            response={isOpen ? '' : thread.firstAssistantMessage.content}
            thread={thread}
          />
        </AccordionTrigger>

        {/* TODO: we need to slide down the content */}
        <AccordionContent className={cn('pl-14')}>
          {/* Secod level accordion with follow up questions
             showHeading must be false as we already have in screen on AccordionTrigger above */}
          <div className="overflow-y-scroll scrollbar srcoll-smooth max-h-[500px]">
            <ThreadAccordion
              chat={chat}
              clientFetch
              initialMessagePairs={[]}
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
