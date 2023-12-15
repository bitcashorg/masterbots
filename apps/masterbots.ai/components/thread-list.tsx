import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { getThreads } from '@/services/db'

export default async function ThreadList() {
  const threads = await getThreads()
  return (
    <Accordion type="single" collapsible className="w-full">
      {threads.map((thread, key) => (
        <AccordionItem value={`item-${key}`} key={key}>
          <AccordionTrigger>
            {thread.messages[0]?.content || 'wat'}
          </AccordionTrigger>
          <AccordionContent>
            {thread.messages[1]?.content || 'wat'}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
