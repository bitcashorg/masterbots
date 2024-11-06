'use client'

//* ChatSearchInput provides a search input to filter chat threads based on keywords and category.
import { Button } from '@/components/ui/button'
import { IconClose } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { getCategory } from '@/services/hasura'
import { debounce } from 'lodash'
import type { Thread } from 'mb-genql'
import { useParams } from 'next/navigation'
import React from 'react'

export function ChatSearchInput({
  setThreads
}: {
  setThreads: React.Dispatch<React.SetStateAction<Thread[]>>
}) {
  const { chatbot } = useParams()
  const { activeCategory } = useSidebar()
  const [searchPlaceholder, setSearchPlaceholder] = React.useState<
    string | null
  >(null) // Placeholder text based on category or chatbot.
  const [keyword, changeKeyword] = React.useState<string>('') // Current search keyword.
  const previousThread = React.useRef<Thread[]>([]) // Stores previous threads to restore when clearing search.
  const previousCategory = React.useRef<number | null>(null) // Tracks category changes.

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
    fetchSearchPlaceholder() // Updates search placeholder based on active category or chatbot.
  }, [chatbot, activeCategory])

  React.useEffect(() => {
    debounce(() => {
      setThreads(prevState => {
        // ? Keeps previous threads if no search results are found, preserving state.
        previousThread.current = !previousThread.current.length
          ? prevState
          : previousThread.current
        const previousThreadState = previousThread.current
        if (!keyword) {
          return previousThreadState
        }
        return previousThreadState.filter((thread: Thread) =>
          thread.messages[0]?.content
            .toLowerCase()
            .includes(keyword.toLowerCase())
        )
      })
    }, 230)()
  }, [keyword])

  return (
    <div className="relative w-full max-w-[600px] mx-auto flex items-center justify-center">
      <Input
        value={keyword}
        onChange={e => {
          changeKeyword(e.target.value)
        }}
        placeholder={`Search any chat with ${searchPlaceholder ? searchPlaceholder : 'any bot category'}`}
        className="max-w-[600px]  bg-white dark:bg-[#343434] text-sm font-medium rounded-lg shadow-sm w-full py-6"
      />
      {keyword && (
        <Button
          type="reset"
          variant="ghost"
          className="absolute right-0 px-3 transform -translate-y-1/2 cursor-pointer top-1/2"
          onClick={() => changeKeyword('')}
          aria-label="Clear search"
        >
          <IconClose className="!h-4 !w-4" />
        </Button>
      )}
    </div>
  )
}
