'use client'

import type { Thread } from '@repo/mb-genql'
import { cn } from '@/lib/utils'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { ShortMessage } from './thread-excerpt'
import { BrowseChatMessageList } from '../../browse/browse-chat-message-list'
import { useAsync } from 'react-use'
import { getMessages } from '@/services/hasura'
import { useEffect } from 'react'
import { MbAvatar } from '../mb-avatar'

export function ThreadDialog({ thread, excerpt, question }: ThreadDialogProps) {
  const messages = useAsync(async () =>
    getMessages({ threadId: thread.threadId })
  )

  // update url when dialog opens and closes
  useEffect(() => {
    const initialUrl = location.href
    const threadUrl = `/${thread.chatbot.categories[0].category.name.toLowerCase().replaceAll('', '_').replaceAll('&', '_')}/${thread.threadId}`
    history.pushState({}, threadUrl)
    return () => {
      history.pushState({}, initialUrl)
    }
  })

  return (
    <Dialog>
      <ThreadDialogTrigger
        thread={thread}
        excerpt={excerpt}
        question={question}
      />
      <DialogContent>
        <BrowseChatMessageList
          chatbot={thread.chatbot}
          messages={messages.value || []}
          user={thread.user}
        />
      </DialogContent>
    </Dialog>
  )
}

function ThreadDialogTrigger({ thread, excerpt, question }: ThreadDialogProps) {
  return (
    <DialogTrigger>
      <div
        className={cn(`flex flex-1 justify-start flex-col relative
        transition-all ease-in-out duration-200
        border-transparent border
        hover:rounded-t-[8px]
        font-medium w-full dark:hover:border-b-mirage hover:border-b-gray-300 [&>div>div>button]:!hidden`)}
      >
        <div
          className={cn(
            'relative flex items-center font-normal md:text-lg transition-all w-full gap-3 pr-4'
          )}
        >
          <MbAvatar
            alt={thread.chatbot.name}
            src={thread.chatbot.avatar}
            href={`/b/${thread.chatbot.name.toLowerCase()}`}
          />

          <div className="w-[calc(100%-64px)] m:w-[calc(100%-28px)] flex items-center gap-3 text-left">
            {question}

            <span className="opacity-50 text-[0.875rem]">by</span>

            <MbAvatar
              alt={thread.user.username.replace('_', ' ')}
              src={thread.user.profilePicture}
              href={`/u/${encodeURIComponent(String(thread.user.slug))}`}
            />

            <div className="overflow-hidden text-sm text-left opacity-50">
              <div className="flex-1 space-y-2 overflow-hidden">
                <ShortMessage content={excerpt} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DialogTrigger>
  )
}

interface ThreadDialogProps {
  className?: string
  handleOpen?: () => void
  thread: Thread
  excerpt: string
  question: string
}
