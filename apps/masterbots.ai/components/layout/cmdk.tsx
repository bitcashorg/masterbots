'use client'

import { useState } from 'react'
import {
  CommandInput,
  CommandList,
  CommandDialog,
  CommandItem,
  CommandEmpty,
  CommandGroup,
  CommandSeparator
} from '@/components/ui/command'
import { cn } from '@/lib/utils'

export function MbCmdK() {
  const [open, setOpen] = useState(false)

  return (
    <CommandDialog
      className={cn('md:max-w-[700px] max-w-[80%] rounded')}
      onOpenChange={setOpen}
      open={open}
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
            {/* <PromptForm
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
            /> */}
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
