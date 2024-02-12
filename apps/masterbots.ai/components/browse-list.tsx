'use client'

import React from 'react'

import { useBrowse } from '@/lib/hooks/use-browse'
import { getBrowseThreads } from '@/services/hasura'
import { debounce } from 'lodash'
import { Thread } from 'mb-genql'
import BrowseListItem from './browse-list-item'

export default function BrowseList() {
  const { keyword, tab } = useBrowse()

  const [threads, setThreads] = React.useState<Thread[]>([])
  const [filteredThreads, setFilteredThreads] = React.useState<Thread[]>([])

  const fetchThreads = async (keyword: string, tab: number | null) => {
    const threads = await getBrowseThreads({
      categoryId: tab,
      keyword,
      limit: 50,
    })
    setThreads(threads)
  }

  const verifyKeyword = () => {
    if (!keyword) {
      setFilteredThreads(threads)
    } else {
      debounce(() => {
        // TODO: Improve thread messages architecture to implement dynamic search to show only the thread title (first message on thread)
        // fetchThreads(keyword, tab)
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

  React.useEffect(() => {
    fetchThreads('', tab)
  }, [tab])

  React.useEffect(() => {
    verifyKeyword()
  }, [keyword, threads])

  return (
    <div className="w-full py-5">
      {filteredThreads.map((thread: Thread, key) => (
        <BrowseListItem thread={thread} key={key} />
      ))}
    </div>
  )
}
