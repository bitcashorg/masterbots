'use client'

import { debounce } from 'lodash'
import type { Thread } from '@repo/mb-genql'
import { useParams } from 'next/navigation'
import React from 'react'
import FooterCT from '@/components/layout/footer-ct'
import { Button } from '@/components/ui/button'
import { IconClose } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { useSidebar } from '@/hooks/use-sidebar'
import { getCategory } from '@/services/hasura'

export function ChatSearchInput({
  setThreads
}: {
  setThreads: React.Dispatch<React.SetStateAction<Thread[]>>
}) {
  const { chatbot } = useParams()
  const { activeCategory } = useSidebar()
  const [searchPlaceholder, setSearchPlaceholder] = React.useState<
    string | null
  >(null)
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
        className="max-w-[600px]"
        onChange={e => {
          changeKeyword(e.target.value)
        }}
        placeholder={`Search any chat with ${searchPlaceholder ? searchPlaceholder : 'any bot category'}`}
        value={keyword}
      />
      {keyword ? (
        <Button
          aria-label="Clear search"
          className="absolute right-0 px-3 -translate-y-1/2 cursor-pointer top-1/2"
          onClick={() => {
            changeKeyword('')
          }}
          type="reset"
          variant="ghost"
        >
          <IconClose className="!h-4 !w-4" />
        </Button>
      ) : null}
      <div className="hidden lg:block absolute max-w-[240px] text-center -top-4 -right-[256px] mx-auto">
        <FooterCT nonFooterTag />
      </div>
    </div>
  )
}
