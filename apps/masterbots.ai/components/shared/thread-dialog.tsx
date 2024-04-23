'use client'

import { DialogProps } from '@radix-ui/react-dialog'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { createMessagePairs } from '@/lib/threads'
import { ThreadAccordion } from './thread-accordion'
import { ThreadHeading } from './thread-heading'
import { FilteredThread } from '@/app/actions'

export function ThreadDialog({
  thread,
  chat = false,
  defaultOpen = false
}: ThreadDialogProps) {
  return (
    <Dialog defaultOpen={defaultOpen}>
      <DialogTrigger className="px-5 pt-5 bg-mirage">
        <ThreadHeading
          chat={chat}
          question={thread.firstUserMessage.content}
          response={thread.firstAssistantMessage.content}
          thread={thread}
        />
      </DialogTrigger>

      <DialogContent
        className={cn(
          'max-w-[1400px] w-[80%] h-[90%] hide-buttons overflow-auto'
        )}
      >
        <div>content</div>
        {/* <ThreadAccordion
          chat={chat}
          clientFetch
          thread={thread}
          initialMessagePairs={createMessagePairs(thread.messages)}
        /> */}
      </DialogContent>
    </Dialog>
  )
}

interface ThreadDialogProps extends DialogProps {
  thread: FilteredThread
  chat?: boolean
  defaultOpen?: boolean
}
