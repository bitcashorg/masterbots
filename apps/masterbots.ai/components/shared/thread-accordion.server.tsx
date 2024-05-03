import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import { MB } from '@repo/supabase'
import { ThreadHeading } from './thread-heading'
import { BrowseChatMessage } from './thread-message'

export function ThreadAccordionServer({
  thread,
  messagePairs
}: ThreadAccordionProps) {
  return (
    <div className="flex w-full">
      <Accordion
        className={cn('w-full border border-solid border-mirage scroll border-r-[transparent]')}
        defaultValue={['pair-0', 'pair-1', 'pair-2']}
        type="multiple"
      >
        {messagePairs.map((p, key) => {
          const isFirst = key === 0
          return (
            <AccordionItem
              key={`accordion-item-${thread.threadId}-pair-${key}`}
              value={`pair-${key}`}
            >
              {
                // is not the frist question we return follow question style
                !isFirst ? (
                  <AccordionTrigger
                    className={cn('px-4 border-y border-solid border-mirage')}
                  >
                    <div className="px-12 md:text-lg">{p.question.content}</div>
                  </AccordionTrigger>
                ) : null
              }

              {isFirst ? (
                <AccordionTrigger
                  className={cn(
                    'px-5',
                    isFirst
                      ? 'bg-mirage'
                      : 'border-y border-solid border-mirage'
                  )}
                >
                  <ThreadHeading
                    chat={false}
                    copy
                    question={p.question.content}
                    thread={thread}
                  />
                </AccordionTrigger>
              ) : null}

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
        })}
      </Accordion>
    </div>
  )
}

interface ThreadAccordionProps {
  thread: MB.ThreadFull
  messagePairs: MB.MessagePair[]
}
