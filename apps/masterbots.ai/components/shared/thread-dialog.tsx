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
import { DialogProps } from '@radix-ui/react-dialog'
import { NewChatInput } from '../routes/c/new-chat'
import { convertMessage } from '@/lib/threads'

export function ThreadDialog({ thread, chat = false }: ThreadDialogProps) {
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
          chat={chat}
        />
      </DialogTrigger>

      <DialogContent
        className={cn(
          'max-w-[1400px] w-[80%] h-[90%] hide-buttons overflow-auto'
        )}
      >
        <ThreadAccordion thread={thread} clientFetch={true} chat={chat} />
        {chat ? (
          <DialogFooter>
            <NewChatInput
              chatbot={thread.chatbot}
              initialMessages={thread.messages.map(convertMessage)}
              id={thread.threadId}
              dialog={true}
            />
          </DialogFooter>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}

interface ThreadDialogProps extends DialogProps {
  thread: Thread
  chat?: boolean
}
