import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Thread } from 'mb-genql'

export default function ThreadList({ threads }: { threads: Thread[] }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {threads.map((thread, key) => (
        <AccordionItem value={`item-${key}`} key={key}>
          <AccordionTrigger>
            {thread.messages[0]?.content.substring(0, 100) || 'wat'}
          </AccordionTrigger>
          <AccordionContent>
            {thread.messages[1]?.content || 'wat'}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
