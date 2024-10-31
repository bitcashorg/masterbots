'use client'

/**
 * BrowseList Component
 *
 * This component displays a list of chat threads for browsing based on user-selected categories and keywords.
 * It allows users to filter threads dynamically and load more content as they scroll.
 *
 * Key Features:
 * - Dynamic Filtering: Filters threads based on the user's input keyword and selected categories.
 * - Infinite Scrolling: Loads more threads when the user reaches the end of the list.
 * - State Management: Manages loading states and thread counts using React hooks.
 * - Responsive Design: Utilizes Tailwind CSS for styling and layout.
 * - Integration with Custom Hooks: Uses `useBrowse` for browsing context and `useSidebar` for category selection.
 *
 * State Variables:
 * - threads: An array of Thread objects representing the current list of threads.
 * - filteredThreads: An array of Thread objects representing the filtered list based on the keyword.
 * - loading: A boolean indicating if threads are currently being loaded.
 * - count: A number representing the total number of threads fetched.
 */

import BrowseListItem from '@/components/routes/browse/browse-list-item'
import { useBrowse } from '@/lib/hooks/use-browse'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { getBrowseThreads } from '@/services/hasura'
import { debounce } from 'lodash'
import type { Thread } from 'mb-genql'
import React from 'react'

const PAGE_SIZE = 50

export default function BrowseList() {
  const { keyword, tab } = useBrowse()

  const [threads, setThreads] = React.useState<Thread[]>([])
  const [filteredThreads, setFilteredThreads] = React.useState<Thread[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)
  const [count, setCount] = React.useState<number>(0)
  const { selectedCategories, selectedChatbots } = useSidebar()

  const fetchThreads = async ({
    categoriesId,
    chatbotsId,
    keyword
  }: {
    categoriesId: number[]
    chatbotsId: number[]
    keyword: string
  }) => {
    const threads = await getBrowseThreads({
      categoriesId,
      chatbotsId,
      keyword,
      limit: PAGE_SIZE
    })
    setThreads(threads)
    setCount(threads.length)
  }

  const verifyKeyword = () => {
    if (!keyword) {
      setFilteredThreads(threads)
    } else {
      debounce(() => {
        // TODO: Improve thread messages architecture to implement dynamic search to show only the thread title (first message on thread)
        // fetchThreads(keyword, selectedCategories)
        setFilteredThreads(
          threads.filter((thread: Thread) =>
            thread.messages[0]?.content
              .toLowerCase()
              .includes(keyword.toLowerCase())
          )
        )
        // ? Average time of human reaction is 230ms
      }, 230)()
    }
  }

  const loadMore = async () => {
    console.log('🟡 Loading More Content')
    setLoading(true)

    const moreThreads = await getBrowseThreads({
      categoriesId: selectedCategories,
      offset: threads.length,
      limit: PAGE_SIZE
    })

    setThreads(prevState => [...prevState, ...moreThreads])
    setCount(moreThreads.length)
    setLoading(false)
  }

  React.useEffect(() => {
    fetchThreads({
      keyword,
      categoriesId: selectedCategories,
      chatbotsId: selectedChatbots
    })
  }, [selectedCategories.length, selectedChatbots.length])

  React.useEffect(() => {
    verifyKeyword()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, threads])
  return (
    <div className="flex flex-col w-full gap-3 py-5">
      {filteredThreads.map((thread: Thread, key) => (
        <BrowseListItem
          thread={thread}
          key={key}
          loading={loading}
          loadMore={loadMore}
          hasMore={count === PAGE_SIZE}
          isLast={key === filteredThreads.length - 1}
        />
      ))}
    </div>
  )
}
