'use client'

// * This component provides a search input for filtering chat threads based on user input.
// * The search results are filtered based on the content in each thread.

import { Button } from '@/components/ui/button'
import { IconClose } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { cn } from '@/lib/utils'
import { getCategory } from '@/services/hasura'
import type { ThreadState } from '@/types/types'
import { debounce } from 'lodash'
import { Search } from 'lucide-react'
import type { Thread } from 'mb-genql'
import React, { useEffect } from 'react'

interface ChatSearchInputProps {
  setThreads: React.Dispatch<React.SetStateAction<ThreadState>>
  onSearch?: (term: string) => void
}

export function ChatSearchInput({ setThreads, onSearch }: ChatSearchInputProps) {
  const { activeCategory, activeChatbot } = useSidebar()
  const [searchPlaceholder, setSearchPlaceholder] = React.useState<string | null>(null)
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
    return thread.messages.some((message) =>
      message?.content?.toLowerCase().includes(lowercaseSearch) || false,
    )
  }

  const fetchSearchPlaceholder = async () => {
    if (activeChatbot) {
      setSearchPlaceholder(activeChatbot?.name.replace(/([A-Z])/g, ' $1').toLowerCase().trimStart())
    } else if (activeCategory && activeCategory !== previousCategory.current) {
      previousCategory.current = activeCategory
      const getCategoryLabel = await getCategory({ categoryId: activeCategory })
      setSearchPlaceholder(`${getCategoryLabel.name.toLowerCase()} category`)
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: This effect should only run when the active chatbot or category changes
  useEffect(() => {
    fetchSearchPlaceholder()
  }, [activeChatbot, activeCategory])

  // biome-ignore lint/correctness/useExhaustiveDependencies: This effect should only run when the keyword changes
  useEffect(() => {
    const debouncedSearch = debounce(() => {
      setThreads((prevState) => {
        if (!previousThread.current.length) {
          previousThread.current = prevState.threads
        }
        const previousThreadState = previousThread.current
        if (!keyword) {
          return {
            ...prevState,
            threads: previousThreadState,
            count: previousThreadState.length,
            totalThreads: prevState.totalThreads
          }
        }
        const filteredThreads = previousThreadState.filter((thread) =>
          searchInThread(thread, keyword)
        )
        return {
          ...prevState,
          threads: filteredThreads,
          count: filteredThreads.length,
          totalThreads: prevState.totalThreads
        }
      })
    }, 230)

    debouncedSearch()
    return () => debouncedSearch.cancel()
  }, [keyword])

  return (
    <div className="relative w-full max-w-[900px] mx-auto flex items-center justify-center">
      <div className="relative w-full">
        <div className="absolute inset-0 transition-opacity duration-300 rounded-full opacity-0 group-focus-within:opacity-100">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent/10 to-accent/10 blur-lg animate-pulse" />
        </div>

        <div
          className={cn(
            'group relative w-full flex items-center',
            'rounded-full',
            'bg-background/60',
            'border border-accent/10',
            'focus-within:border-accent',
            'focus-within:ring-1 focus-within:ring-accent',
            'transition-all duration-200',
          )}
        >
          <Search className="absolute size-5 left-4 text-zinc-400 group-focus-within:text-accent" />
          <Input
            value={keyword}
            onChange={(e) => handleKeywordChange(e.target.value)}
            placeholder={`Search all messages in ${searchPlaceholder ? searchPlaceholder : 'any category'
              }...`}
            className={cn(
              'w-full px-12 py-6',
              'bg-transparent',
              'placeholder:text-zinc-400',
              'text-base dark:text-zinc-100',
              'border-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0',
              'rounded-full',
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
                'rounded-full',
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
