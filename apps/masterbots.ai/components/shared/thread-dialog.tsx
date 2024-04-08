'use client'

import type { Thread } from '@repo/mb-genql'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { ThreadAccordion } from './thread-accordion'
import { ThreadHeading } from './thread-heading'
import { cn } from '@/lib/utils'

export function ThreadDialog({ thread }: ThreadDialogProps) {
  const firstQuestion =
    thread.messages.find(m => m.role === 'user')?.content || 'not found'
  const firstResponse =
    thread.messages.find(m => m.role === 'assistant')?.content || 'not found'

  return (
    <Dialog>
      <DialogTrigger>
        <ThreadHeading
          thread={thread}
          question={firstQuestion}
          response={firstResponse}
        />
      </DialogTrigger>

      <DialogContent
        className={cn(
          'max-w-[1000px] w-[80%] h-[90%] hide-buttons overflow-auto'
        )}
      >
        <ThreadAccordion thread={thread} clientFetch={true} />
      </DialogContent>
    </Dialog>
  )
}

interface ThreadDialogProps {
  thread: Thread
}
