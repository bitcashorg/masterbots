'use client'

import type { Thread } from '@repo/mb-genql'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger
} from '@/components/ui/dialog'
import { ThreadAccordion } from './thread-accordion'
import { ThreadHeading } from './thread-heading'
import { cn } from '@/lib/utils'
import ChatThreadListPanel from '../routes/c/chat-thread-list-panel'

export function ThreadDialog({ thread, chat }: ThreadDialogProps) {
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
          'max-w-[1400px] w-[80%] h-[90%] hide-buttons overflow-auto'
        )}
      >
        <ThreadAccordion thread={thread} clientFetch={true} />
        {/* {chat ? ( */}
        <DialogFooter>
          <ChatThreadListPanel />
        </DialogFooter>
        {/* ) : null} */}
      </DialogContent>
    </Dialog>
  )
}

interface ThreadDialogProps {
  thread: Thread
  chat?: boolean
}
