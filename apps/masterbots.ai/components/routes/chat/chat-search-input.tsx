'use client'

// * This component provides a search input for filtering chat threads based on user input.
// * The search results are filtered based on the content in each thread.

import { Button } from '@/components/ui/button'
import { IconClose } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { cn } from '@/lib/utils'
import { getCategory } from '@/services/hasura'
import { debounce } from 'lodash'
import { Search } from 'lucide-react'
import type { Thread } from 'mb-genql'
import { useParams } from 'next/navigation'
import React from 'react'

interface ChatSearchInputProps {
  setThreads: React.Dispatch<React.SetStateAction<Thread[]>>
  onSearch?: (term: string) => void
}

export function ChatSearchInput({
  setThreads,
  onSearch
}: ChatSearchInputProps) {
  const { chatbot } = useParams()
  const { activeCategory } = useSidebar()
  const [searchPlaceholder, setSearchPlaceholder] = React.useState<
    string | null
  >(null)
  const [keyword, changeKeyword] = React.useState<string>('')
  const previousThread = React.useRef<Thread[]>([])
  const previousCategory = React.useRef<number | null>(null)

  const handleKeywordChange = (value: string) => {
    changeKeyword(value)
    onSearch?.(value) // Call the onSearch callback if provided
  }

  const clearSearch = () => {
    handleKeywordChange('') // Use the same handler for clearing to ensure onSearch is called
  }

  const searchInThread = (thread: Thread, searchTerm: string): boolean => {
    // If no search term, return true to show all threads
    if (!searchTerm) return true

    const lowercaseSearch = searchTerm.toLowerCase()

    // Check all messages in the thread for the search term
    return thread.messages.some(message =>
      message?.content?.toLowerCase().includes(lowercaseSearch)
    )
  }

  const fetchSearchPlaceholder = async () => {
    if (chatbot) {
      setSearchPlaceholder(chatbot as string)
    } else if (activeCategory && activeCategory !== previousCategory.current) {
      previousCategory.current = activeCategory
      const getCategoryLabel = await getCategory({ categoryId: activeCategory })
      setSearchPlaceholder(`${getCategoryLabel.name.toLowerCase()} category`)
    }
  }

  React.useEffect(() => {
    fetchSearchPlaceholder()
  }, [chatbot, activeCategory])

  React.useEffect(() => {
    const debouncedSearch = debounce(() => {
      setThreads(prevState => {
        previousThread.current = !previousThread.current.length
          ? prevState
          : previousThread.current
        const previousThreadState = previousThread.current
        if (!keyword) {
          return previousThreadState
        }
        return previousThreadState.filter(thread =>
          searchInThread(thread, keyword)
        )
      })
    }, 230)

    debouncedSearch()
    return () => debouncedSearch.cancel()
  }, [keyword, setThreads])

  return (
    <div className="relative w-full max-w-[900px] mx-auto flex items-center justify-center pt-5">
      <div className="relative w-full">
        <div className="absolute inset-0 transition-opacity duration-300 rounded-full opacity-0 group-focus-within:opacity-100">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r dark:from-[#83E56A]/5 dark:to-[#83E56A]/5 from-[#BE17E8]/5 to-[#BE17E8]/5 blur-lg animate-pulse" />
        </div>

        <div
          className={cn(
            'group relative w-full flex items-center',
            'rounded-full',
            'dark:bg-[#18181B]/90',
            'border dark:border-[#83E56A]/10 border-[#BE17E8]/10',
            'focus-within:border-[#BE17E8] dark:focus-within:border-[#83E56A]',
            'focus-within:ring-1 focus-within:ring-[#BE17E8] dark:focus-within:ring-[#83E56A]',
            'transition-all duration-200'
          )}
        >
          <Search className="absolute w-5 h-5 left-4 text-zinc-400 group-focus-within:text-[#BE17E8] dark:group-focus-within:text-[#83E56A]" />
          <Input
            value={keyword}
            onChange={e => handleKeywordChange(e.target.value)}
            placeholder={`Search all messages in ${searchPlaceholder ? searchPlaceholder : 'any category'
              }...`}
            className={cn(
              'w-full px-12 py-6',
              'bg-transparent',
              'placeholder:text-zinc-400',
              'text-base dark:text-zinc-100',
              'border-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0',
              'rounded-full'
            )}
          />
          {keyword && (
            <Button
              type="reset"
              variant="ghost"
              onClick={clearSearch}
              className={cn(
                'absolute right-2',
                'size-8 p-0',
                'hover:bg-zinc-800/50',
                'rounded-full'
              )}
              aria-label="Clear search"
            >
              <IconClose className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
