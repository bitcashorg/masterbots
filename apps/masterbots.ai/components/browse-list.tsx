'use client'

import React from 'react'

import { Thread } from 'mb-genql'
import { useBrowse } from '@/lib/hooks/use-browse'
import { getBrowseThreads } from '@/services/hasura'
import BrowseListItem from './browse-list-item'

export default function BrowseList() {
  const { keyword, tab } = useBrowse()

  const [threads, setThreads] = React.useState<Thread[]>([])
  const [filteredThreads, setFilteredThreads] = React.useState<Thread[]>([])

  const fetchThreads = async (keyword: string, tab: number | null) => {
    const threads = await getBrowseThreads({
      categoryId: tab,
      keyword
    })
    setThreads(threads)
  }

  React.useEffect(() => {
    fetchThreads('', tab)
  }, [tab])

  React.useEffect(() => {
    if (keyword) {
      setFilteredThreads(
        threads.filter((thread: Thread) =>
          thread.messages[0]?.content
            .toLowerCase()
            .includes(keyword.toLowerCase())
        )
      )
    } else setFilteredThreads(threads)
  }, [keyword, threads])

  return (
    <div className="w-full py-5">
      {filteredThreads.map((thread: Thread, key) => (
        <BrowseListItem thread={thread} key={key} />
      ))}
    </div>
  )
}
