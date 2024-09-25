'use client'

import { Button } from '@/components/ui/button'
import { IconClose } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { getCategory } from '@/services/hasura'
import { debounce } from 'lodash'
import { Thread } from 'mb-genql'
import { useParams } from 'next/navigation'
import React from 'react'

export function ChatSearchInput({ setThreads }: {
  setThreads: React.Dispatch<React.SetStateAction<Thread[]>>
}) {
  const { chatbot } = useParams()
  const { activeCategory } = useSidebar()
  const [searchPlaceholder, setSearchPlaceholder] = React.useState<string | null>(null)
  const [keyword, changeKeyword] = React.useState<string>('')
  const previousThread = React.useRef<Thread[]>([])
  const previousCategory = React.useRef<number | null>(null)

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
    debounce(() => {
      setThreads(prevState => {
        // ? If there is no results on a search, we should keep the previous state
        // ? and if not, the threads previous state before the search will be lost.
        previousThread.current = !previousThread.current.length ? prevState : previousThread.current
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
