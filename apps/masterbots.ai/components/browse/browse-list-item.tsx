import { Thread } from '@repo/mb-genql'
import React from 'react'
import { ChatDialog } from '../shared/chat-dialog'

export default function BrowseListItem({
  thread,
  loadMore,
  loading,
  isLast,
  hasMore,
  pageType = ''
}: {
  thread: Thread
  loadMore: () => void
  loading: boolean
  isLast: boolean
  hasMore: boolean
  pageType?: string
}) {
  const threadRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!threadRef.current && !isLast) return
    const observer = new IntersectionObserver(([entry]) => {
      if (hasMore && entry.isIntersecting && !loading) {
        const timeout = setTimeout(() => {
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
  }, [isLast, hasMore, loading, loadMore])

  return (
    <div ref={threadRef}>
      <ChatDialog thread={thread} pageType={pageType} />
    </div>
  )
}
