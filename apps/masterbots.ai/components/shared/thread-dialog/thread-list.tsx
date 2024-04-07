'use client'

import React, { useEffect, useRef, useState } from 'react'
import { debounce } from 'lodash'
import type { Thread } from '@repo/mb-genql'
import { useBrowse } from '@/hooks/use-browse'
import { getBrowseThreads } from '@/services/hasura'
import { ThreadDialog } from './thread-dialog'

export default function BrowseList({ initialThreads }: BrowseListProps) {
  const { keyword, tab } = useBrowse()
  const [threads, setThreads] = useState<Thread[]>(initialThreads)
  const [filteredThreads, setFilteredThreads] =
    useState<Thread[]>(initialThreads)
  const [loading, setLoading] = useState<boolean>(false)
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const [hasMore, setHasMore] = useState(true)

  // load more threads for the category
  const loadMore = async () => {
    console.log('🟡 Loading More Content')
    setLoading(true)

    const moreThreads = await getBrowseThreads({
      categoryId: tab,
      offset: filteredThreads.length,
      limit: 50
    })

    if (moreThreads.length === 0) setHasMore(false)
    setThreads(prevState => [...prevState, ...moreThreads])
    setLoading(false)
  }

  const verifyKeyword = () => {
    if (!keyword) {
      setFilteredThreads(threads)
    } else {
      debounce(() => {
        setFilteredThreads(
          threads.filter((thread: Thread) =>
            thread.messages[0]?.content
              .toLowerCase()
              .includes(keyword.toLowerCase())
          )
        )
      }, 230)()
    }
  }

  useEffect(() => {
    verifyKeyword()
  }, [keyword, threads, verifyKeyword])

  // load mare item when it gets to the end
  useEffect(() => {
    if (!loadMoreRef.current) return
    const observer = new IntersectionObserver(([entry]) => {
      if (hasMore && entry.isIntersecting && !loading) {
        setTimeout(() => loadMore(), 150)
        observer.unobserve(entry.target)
      }
    })

    observer.observe(loadMoreRef.current)

    return () => observer.disconnect()
  }, [hasMore, loading, loadMore])

  return (
    <div className="w-full py-5 flex flex-col gap-3">
      {filteredThreads.map((thread: Thread, key) => (
        <ThreadDialog
          key={key}
          thread={thread}
          excerpt={excerpt}
          question={question}
        />
      ))}
      <div ref={loadMoreRef} />
    </div>
  )
}

type BrowseListProps = {
  initialThreads: Thread[]
}

const excerpt =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris rhoncus, imperdiet dui a, viverra eros. Nullam eget metus ante. Etiam maximus erat ut libero rutrum, non cursus sapien condimentum. Quisque ultricies suscipit augue eu aliquam. Donec fringilla tristique vestibulum.'
const question = 'why is the sky blue?'
