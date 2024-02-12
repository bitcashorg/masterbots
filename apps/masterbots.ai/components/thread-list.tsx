'use client'

import React from 'react'
import { Separator } from '@/components/ui/separator'
import { Thread } from 'mb-genql'
import Link from 'next/link'
import { getThreads } from '@/services/hasura'
import { useSession } from 'next-auth/react'
import { useSidebar } from '@/lib/hooks/use-sidebar'

const PAGE_SIZE = 20

export default function ThreadList({
  threads: initialThreads
}: {
  threads: Thread[]
}) {
  const { data: session } = useSession()
  const { activeCategory } = useSidebar()
  const [loading, setLoading] = React.useState<boolean>(false)
  const [threads, setThreads] = React.useState<Thread[]>(initialThreads)
  const [count, setCount] = React.useState<number>(initialThreads.length)

  const loadMore = async () => {
    console.log('🟡 Loading More Content')
    setLoading(true)

    const moreThreads = await getThreads({
      jwt: session!.user.hasuraJwt,
      userId: session!.user.id,
      offset: threads.length,
      limit: PAGE_SIZE,
      categoryId: activeCategory
    })

    setThreads(prevState => [...prevState, ...moreThreads])
    setCount(moreThreads.length)
    setLoading(false)
  }

  const handleCategoryChange = async () => {
    if (session?.user) {
      const threads = await getThreads({
        jwt: session!.user.hasuraJwt,
        userId: session!.user.id,
        limit: PAGE_SIZE,
        categoryId: activeCategory
      })
      console.log('Threads', threads)
      setThreads(threads)
      setCount(threads.length)
    }
  }

  React.useEffect(() => {
    console.log('activeCategory', activeCategory)
    handleCategoryChange()
  }, [activeCategory])

  return (
    <ul className="w-full">
      {threads.map((thread, key) => (
        <ThreadComponent
          key={key}
          thread={thread}
          loading={loading}
          loadMore={loadMore}
          hasMore={count === PAGE_SIZE}
          isLast={key === threads.length - 1}
        />
      ))}
    </ul>
  )
}

function ThreadComponent({
  thread,
  loadMore,
  loading,
  isLast,
  hasMore
}: {
  thread: Thread
  loadMore: () => void
  loading: boolean
  isLast: boolean
  hasMore: boolean
}) {
  const threadRef = React.useRef<HTMLLIElement>(null)

  React.useEffect(() => {
    if (!threadRef.current) return
    const observer = new IntersectionObserver(([entry]) => {
      if (hasMore && isLast && entry.isIntersecting && !loading) {
        const timeout = setTimeout(() => {
          console.log('loading more content')
          loadMore()
          clearTimeout(timeout)
        }, 150)

        observer.unobserve(entry.target)
      }
    })

    observer.observe(threadRef.current)

    return () => {
      observer.disconnect()
    }
  }, [threadRef.current, isLast, hasMore, loading, loadMore])

  return (
    <li ref={threadRef}>
      <Link
        href={`/${thread.chatbot.name.trim().toLowerCase()}/${thread.threadId}`}
        className="flex items-center h-12"
        shallow={true}
      >
        {thread.messages
          .filter(m => m.role === 'user')[0]
          ?.content.substring(0, 100) || 'wat'}
      </Link>

      <Separator />
    </li>
  )
}
