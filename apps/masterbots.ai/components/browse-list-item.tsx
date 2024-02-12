import Image from 'next/image'

import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { Thread } from 'mb-genql'
import { cn } from '@/lib/utils'
import { IconCaretRight, IconOpenAI, IconUser } from './ui/icons'
import { ShortMessage } from './short-message'
import React from 'react'

export default function BrowseListItem({
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
  const threadRef = React.useRef<HTMLAnchorElement>(null)

  React.useEffect(() => {
    if (!threadRef.current) return
    const observer = new IntersectionObserver(([entry]) => {
      if (hasMore && isLast && entry.isIntersecting && !loading) {
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
  }, [threadRef.current, isLast, hasMore, loading, loadMore])
  return (
    <Link
      ref={threadRef}
      href={`/browse/${thread.chatbot.name.toLowerCase()}/${thread.threadId}`}
    >
      <div className={cn('hover:bg-[rgb(30,41,59)] rounded-xl p-4 relative ')}>
        <div
          className="relative flex flex-1 items-center
  justify-between py-4 font-medium transition-all "
        >
          {thread.chatbot?.avatar ? (
            <Link
              href={`/browse/${thread.chatbot.name.toLowerCase()}`}
              title={thread.chatbot?.name}
              className={cn(
                'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border shadow'
              )}
            >
              <Image
                className="transition-opacity duration-300 rounded-full select-none hover:opacity-80"
                src={thread.chatbot?.avatar}
                alt={thread.chatbot?.name ?? 'BotAvatar'}
                height={32}
                width={32}
              />
            </Link>
          ) : (
            <Link
              href={`/browse/${thread.chatbot?.chatbotId}`}
              title={thread.chatbot?.name}
              className={cn(
                'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border shadow',
                'bg-primary text-primary-foreground'
              )}
            >
              <IconOpenAI />
            </Link>
          )}
          <div className="flex-1 px-1 ml-4 space-y-2 text-left flex items-center">
            {thread.messages[0]?.content}
            <span className="ml-4 font-normal flex items-center">
              by&nbsp;
              {thread.user?.profilePicture ? (
                <Link
                  href={`/browse/${encodeURIComponent(thread?.user.username)}?type=user`}
                  title={thread.user?.username.replace('_', ' ')}
                  className={cn(
                    'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border shadow'
                  )}
                >
                  <Image
                    className="transition-opacity duration-300 rounded-full select-none hover:opacity-80"
                    src={thread.user?.profilePicture}
                    alt={thread.user?.username ?? 'Avatar'}
                    height={32}
                    width={32}
                  />
                </Link>
              ) : (
                <Link
                  href={`/browse/${thread.user?.userId}`}
                  title={thread.user?.username}
                  className={cn(
                    'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border shadow',
                    'bg-background'
                  )}
                >
                  <IconUser />
                </Link>
              )}
            </span>
          </div>
          <IconCaretRight
            className={`transition duration-300 ease-in-out
        absolute
      stroke-[#09090b] dark:stroke-[#FAFAFA] right-1`}
          />
        </div>
        <div className="opacity-50 overflow-hidden text-sm">
          {thread.messages[1]?.content &&
          thread.messages[1]?.role !== 'user' ? (
            <div className="flex-1 px-1 ml-4 space-y-2 overflow-hidden">
              <ShortMessage content={thread.messages[1]?.content} />
            </div>
          ) : (
            ''
          )}
        </div>
        <Separator className="dark:bg-[#1E293B] absolute bottom-0 w-[calc(100%-1.25rem)]" />
      </div>
    </Link>
  )
}
