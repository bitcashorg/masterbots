'use client'

import { ChatSearchInput } from '@/components/chat-search-input'
import ThreadList from '@/components/thread-list'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { getThreads } from '@/services/hasura'
import { Thread } from 'mb-genql'
import { useSession } from 'next-auth/react'
import React from 'react'

const PAGE_SIZE = 20

export default function UserThreadPanel({
  chatbot,
  threads: initialThreads,
}: {
  chatbot?: string
  threads: Thread[]
  search?: { [key: string]: string | string[] | undefined }
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
        ...activeCategory ? {
          categoryId: activeCategory
        } : {
          chatbotName: chatbot
        }
      })
      setThreads(threads)
      setCount(threads.length)
    }
  }

  React.useEffect(() => {
    handleCategoryChange()
  }, [activeCategory, chatbot])

  return (
    <>
      <div className="flex justify-between px-10 py-5">
        <ChatSearchInput setThreads={setThreads} />
      </div>

      <div className="flex px-10 py-5">
        <ThreadList
          threads={threads}
          loading={loading}
          count={count}
          pageSize={PAGE_SIZE}
          loadMore={loadMore}
        />
      </div>
    </>
  )
}

