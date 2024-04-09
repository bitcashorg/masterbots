'use client'

import {
  CommandInput,
  CommandList,
  CommandDialog,
  CommandItem,
  CommandEmpty,
  CommandGroup,
  CommandSeparator
} from '@/components/ui/command'
import { useEffect, useState } from 'react'
import { useNewThread } from '@/hooks/use-new-thread'
import { useChatbot } from '@/hooks/use-chatbot'
import { useSetState } from 'react-use'
import { PromptForm } from '../routes/c/prompt-form'
import { redirect } from 'next/navigation'

export function MbCmdK() {
  const [open, setOpen] = useState(false)
  const [state, setState] = useSetState({
    id: crypto.randomUUID()
  })
  const { chatbot, initialMessages } = useChatbot('techbot')
  const { startNewThread, input, isLoading, setInput } = useNewThread({
    id: state.id,
    initialMessages,
    chatbot
  })

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(open => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  })

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'b' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        redirect(`/c/techbot/`)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  })

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <div
        className={`px-4 py-2 space-y-4 border-t shadow-lg bg-background sm:border md:py-4 dark:border-mirage border-iron`}
      >
        {/* <CommandInput
          placeholder="Type a command or search..."
          onValueChange={setInput}
        /> */}
        <PromptForm
          disabled={!chatbot}
          input={input}
          isLoading={isLoading}
          onSubmit={async value => {
            await startNewThread({
              id: state.id,
              content: value,
              role: 'user'
            })
          }}
          placeholder={'Chat with techbot'}
          setInput={setInput}
        />

        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>Profile</CommandItem>
            <CommandItem>Billing</CommandItem>
            <CommandItem>Settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </div>
    </CommandDialog>
  )
}
