'use client'

import type { Thread } from '@repo/mb-genql'
import { DialogProps } from '@radix-ui/react-dialog'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { createMessagePairs } from '@/lib/threads'
import { ThreadAccordion } from './thread-accordion'
import { ThreadHeading } from './thread-heading'

export function ThreadDialog({
  thread,
  chat = false,
  defaultOpen = false
}: ThreadDialogProps) {
  const firstQuestion =
    thread.messages.find(m => m.role === 'user')?.content || 'not found'
  const firstResponse =
    thread.messages.find(m => m.role === 'assistant')?.content || 'not found'

  return (
    <Dialog defaultOpen={defaultOpen}>
      <DialogTrigger className="px-5 pt-5 bg-mirage">
        <ThreadHeading
          chat={chat}
          question={firstQuestion}
          response={firstResponse}
          thread={thread}
        />
      </DialogTrigger>

      <DialogContent
        className={cn(
          'max-w-[1400px] w-[80%] h-[90%] hide-buttons overflow-auto'
        )}
      >
        <ThreadAccordion
          chat={chat}
          clientFetch
          thread={thread}
          initialMessagePairs={createMessagePairs(thread.messages)}
        />
      </DialogContent>
    </Dialog>
  )
}

interface ThreadDialogProps extends DialogProps {
  thread: Thread
  chat?: boolean
  defaultOpen?: boolean
}
