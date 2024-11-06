'use client'

//* ChatCombobox component allows users to select an AI model, with interactive dropdown and visual indicators.

import * as React from 'react'
import { CheckIcon } from '@radix-ui/react-icons'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  IconOpenAI,
  IconClaude,
  IconLlama,
  IconWordware
} from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { useModel } from '@/lib/hooks/use-model'
import { AIModels } from '@/app/api/chat/models/models'

//* Model options available in the combobox, each with label, value, and logo icon.
const models = [
  { label: 'GPT-4o', value: AIModels.Default, logo: <IconOpenAI /> },
  { label: 'GPT-4', value: AIModels.GPT4, logo: <IconOpenAI /> },
  { label: 'Claude3', value: AIModels.Claude3, logo: <IconClaude /> },
  { label: 'llama3_8', value: AIModels.llama3_8b, logo: <IconLlama /> },
  { label: 'llama3_7', value: AIModels.llama3_7b, logo: <IconLlama /> },
  { label: 'WordWare', value: AIModels.WordWare, logo: <IconWordware /> }
]

//* ChatCombobox provides a popover for AI model selection and triggers model change based on user choice.
export function ChatCombobox() {
  const { selectedModel, changeModel } = useModel()
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(selectedModel as string)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          // biome-ignore lint/a11y/useSemanticElements: <explanation>
          role="combobox"
          aria-expanded={open}
          className={cn(
            buttonVariants({ size: 'sm', variant: 'outline' }),
            'absolute left-0 top-4 size-8 rounded-full p-0 sm:left-4'
          )}
        >
          {/* Renders the selected model's logo or default icon */}
          {value ? (
            models.find(model => model.value === value)?.logo
          ) : selectedModel === AIModels.Default ? (
            <IconOpenAI />
          ) : (
            <IconClaude />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[100px] p-0">
        <Command>
          <CommandInput placeholder="Model..." className="h-9" />
          <CommandEmpty>No model found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {/* Iterates over models to create selectable items */}
              {models.map(model => (
                <CommandItem
                  key={model.value}
                  value={model.value}
                  onSelect={currentValue => {
                      process.env.NEXT_PUBLIC_APP_ENV !== 'prod'
                        ? (setValue(currentValue === value ? '' : currentValue), changeModel(currentValue as AIModels))
                        : ''  
                    setOpen(false)  // Closes the popover after selection.
                  }}
                >
                  {model.label}
                  {/* Visual checkmark icon for the selected model */}
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4 text-emerald-500',
                      value === model.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}