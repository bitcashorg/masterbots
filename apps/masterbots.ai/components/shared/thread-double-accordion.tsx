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
import { useEffect, useRef } from 'react'
import { useThread } from '@/hooks/use-thread'
let initialUrl = null

export function ThreadDoubleAccordion({
  thread,
  chat = false
}: ThreadDoubleAccordionProps) {
  const {activeThread, setActiveThread} = useThread()
  const [state, setState] = useSetState({
    isOpen: false,
    firstQuestion:
      thread.messages.find(m => m.role === 'user')?.content || 'not found',
    firstResponse:
      thread.messages.find(m => m.role === 'assistant')?.content || 'not found',
      value: []
  })

  useEffect(() => {
    if (initialUrl) return
    initialUrl = location.href
  })

  useEffect(() => {
    if (activeThread === thread || !state.isOpen)  return
    setState({isOpen: false, value: []})
  }, [activeThread])

  useEffect(() => {
    if (activeThread !== thread || state.isOpen) return
    setState({isOpen: true, value: [`pair-${thread.threadId}`]})
  }, [])

  const toggleAccordion = (v: string[]) => {
    const isOpen = Boolean(v[0] === `pair-${thread.threadId}`)
    setState({ isOpen, value: v })
    if (isOpen) {
      if (!activeThread) initialUrl = location.href
      setActiveThread(thread)
      const dir = chat
        ? 'c/' +
          thread.chatbot.name
            .toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll('&', 'n')
        : thread.chatbot.categories[0].category.name
            .toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll('&', 'n')
      const threadUrl = `/${dir}/${thread.threadId}`
      console.log(`Updating URL to ${threadUrl}, initialUrl was ${initialUrl}`)
  
      window.history.pushState({}, '', threadUrl)
    } else {
      setActiveThread(null) 
      window.history.pushState({}, '', initialUrl)
    }
  }

  return (
    <Accordion
      type="multiple"
      className="w-full"
      value={state.value}
      onValueChange={v => toggleAccordion(v)}
    >
      <AccordionItem value={`pair-${thread.threadId}`}>
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
