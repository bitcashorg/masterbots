'use client'
import React from 'react'
import ThreadComponent from '@/components/routes/thread/thread-component'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThreadVisibility } from '@/lib/hooks/use-thread-visibility'
import { Thread } from 'mb-genql'

export default function ThreadList({
  threads: propsThreads,
  loading,
  loadMore,
  count,
  pageSize,
  threads
}: {
  threads: Thread[]
  loading: boolean
  count: number
  pageSize: number
  loadMore: () => void
}) {
  const { selectedCategories, selectedChatbots } = useSidebar()
  
 const filteredThreads = threads.filter(thread =>
    !(
      selectedCategories.length && !selectedCategories.includes(thread.chatbot.categories[0].categoryId)
      || selectedChatbots.length && !selectedChatbots.includes(thread.chatbotId)
    )
  )

  return (
    <ul className="flex flex-col w-full gap-3">
      {filteredThreads?.map((thread, key) => (
        <ThreadComponent
          key={key}
          thread={thread}
          loading={loading}
          loadMore={loadMore}
          hasMore={count === pageSize}
          isLast={key === threads.length - 1}
        />
      ))}
    </ul>
  )
}