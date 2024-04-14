'use client'

import { useEffect, useState } from 'react'
import { useSetState } from 'react-use'
import { redirect } from 'next/navigation'
import {
  CommandInput,
  CommandList,
  CommandDialog,
  CommandItem,
  CommandEmpty,
  CommandGroup,
  CommandSeparator
} from '@/components/ui/command'
import { useNewThread } from '@/hooks/use-new-thread'
import { useChatbot } from '@/hooks/use-chatbot'
import { PromptForm } from '../routes/c/prompt-form'
import { cn } from '@/lib/utils'
import { MbChat } from '../shared/chat'
import { useQuery } from '@tanstack/react-query'
import { Message } from 'ai'
import { Thread } from '@repo/mb-genql'
import { getThread } from '@/services/hasura'

export function MbCmdK() {
  const [open, setOpen] = useState(false)
  const [state, setState] = useSetState({
    id: crypto.randomUUID(),
    showChat: false,
    newMessage: '',
    thread: null as Thread | null
  })
  const { chatbot, initialMessages } = useChatbot('techbot')
  const { startNewThread, input, isLoading, setInput } = useNewThread({
    id: state.id,
    initialMessages,
    chatbot
  })

  const thread = useQuery({
    queryKey: [
      `thread-${state.id}`,
      {
        id: state.id,
        role: 'user',
        content: state.newMessage
      } as Message
    ],
    queryFn: async ({ queryKey }) => {
      // Type assertion directly in the destructuring
      const [, message] = queryKey as [string, Message]
      const startThreadResponse = await startNewThread(message, undefined, {
        redirect: false
      })
      console.log({ startThreadResponse })

      return getThread({ threadId: message.id })
    },
    networkMode: 'always',
    enabled: false // Remember to enable when needed
  })

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        e.preventDefault()
        e.key === 'k' && setOpen(open => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => {
      document.removeEventListener('keydown', down)
    }
  })

  if (state.thread)
    return <MbChat thread={thread} initialMessages={initialMessages} />

  return (
    <CommandDialog
      onOpenChange={setOpen}
      open={open}
      className={cn('md:max-w-[700px] max-w-[80%] rounded')}
    >
      <div className="px-4 py-2 space-y-4 border-t shadow-lg bg-background sm:border md:py-4 dark:border-mirage border-iron">
        {/* <CommandInput
          placeholder="Type a command or search..."
          onValueChange={setInput}
        /> */}

        <CommandList>
          {/* <CommandEmpty>No results found.</CommandEmpty> */}
          {/* <CommandSeparator /> */}
          <CommandGroup className="w-full">
            <PromptForm
              disabled={!chatbot}
              input={input}
              isLoading={isLoading}
              onSubmit={newMessage => {
                setState({ newMessage })
                thread.refetch()
              }}
              placeholder="Chat with techbot"
              setInput={setInput}
              showSubmitButton={false}
            />
            <CommandItem>Search</CommandItem>
            <CommandItem>Profile</CommandItem>
            <CommandItem>Billing</CommandItem>
            <CommandItem>Settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </div>
    </CommandDialog>
  )
}
// use by Dynamic()
export default MbCmdK
