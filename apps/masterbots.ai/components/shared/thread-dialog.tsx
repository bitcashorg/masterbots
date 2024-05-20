'use client'

import { DialogProps } from '@radix-ui/react-dialog'
import { MB } from '@repo/supabase'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { ThreadHeading } from './thread-heading'
import { ThreadAccordionClient } from './thread-accordion.client'
import { createMessagePairs } from '@/lib/threads'

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
          question={thread.firstMessage.content}
          response={thread.firstAnswer.content}
          thread={thread}
        />
      </DialogTrigger>

      <DialogContent
        className={cn(
          'max-w-[1400px] w-[80%] h-[90%] hide-buttons overflow-auto'
        )}
      >
        <div>content</div>
        <ThreadAccordionClient
          chat={chat}
          thread={thread}
          initialMessagePairs={createMessagePairs([
            thread.firstMessage,
            thread.firstAnswer
          ])}
        />
      </DialogContent>
    </Dialog>
  )
}

interface ThreadDialogProps extends DialogProps {
  thread: MB.ThreadFull
  chat?: boolean
  defaultOpen?: boolean
}
