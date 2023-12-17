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
      <AccordionItem value={`item-new-chat`} key={'new-chat'}>
        <AccordionTrigger>Start a new chat with HealthBot</AccordionTrigger>
        <AccordionContent>
          Type something on input box at the boom to start a new chat
        </AccordionContent>
      </AccordionItem>
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
