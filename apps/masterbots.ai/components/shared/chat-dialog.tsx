'use client'

import * as React from 'react'
import type { Thread } from '@repo/mb-genql'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import Link from 'next/link'
import { IconOpenAI, IconUser } from '../ui/icons'
import { ShortMessage } from '../short-message'
import { BrowseChatMessageList } from '../browse/browse-chat-message-list'
import { useAsync } from 'react-use'
import { getMessages } from '@/services/hasura'

export function ChatDialog({ thread = null, pageType }: ChatDialogProps) {
  const messages = useAsync(async () =>
    getMessages({ threadId: thread.threadId })
  )
  return (
    <Dialog>
      <DialogTrigger>
        <div
          className={cn(`flex flex-1 justify-start flex-col relative
        transition-all ease-in-out duration-200
        border-transparent border
        hover:rounded-t-[8px]
        font-medium w-full dark:hover:border-b-mirage hover:border-b-gray-300 [&>div>div>button]:!hidden`)}
        >
          {/* Thread Title */}
          <div
            className={cn(
              'relative flex items-center font-normal md:text-lg transition-all w-full gap-3 pr-4'
            )}
          >
            {pageType !== 'bot' && thread.chatbot.avatar ? (
              <Link
                className={cn(
                  'flex size-8 shrink-0 select-none items-center justify-center rounded-full border shadow'
                )}
                href={`/b/${thread.chatbot.name.toLowerCase()}`}
                title={thread.chatbot.name}
              >
                <Image
                  alt={thread.chatbot.name ?? 'BotAvatar'}
                  className="transition-opacity duration-300 rounded-full select-none bg-background dark:bg-primary-foreground hover:opacity-80"
                  height={32}
                  src={thread.chatbot.avatar}
                  width={32}
                />
              </Link>
            ) : (
              pageType !== 'bot' && (
                <Link
                  className={cn(
                    'flex size-8 shrink-0 select-none items-center justify-center rounded-full border shadow',
                    'bg-primary text-primary-foreground'
                  )}
                  href={`/b/${thread.chatbot.name.toLowerCase()}`}
                  title={thread.chatbot.name}
                >
                  <IconOpenAI />
                </Link>
              )
            )}
            <div className="w-[calc(100%-64px)] m:w-[calc(100%-28px)] flex items-center gap-3 text-left">
              <div
                className={cn('truncate-title px-1', {
                  'no-truncate': true
                })}
              >
                {messages[0]?.content}
              </div>
              {pageType !== 'user' && (
                <span className="opacity-50 text-[0.875rem]">by</span>
              )}
              {pageType !== 'user' && thread.user.profilePicture ? (
                <Link
                  className={cn(
                    'flex size-8 shrink-0 select-none items-center justify-center rounded-full border shadow'
                  )}
                  href={`/u/${encodeURIComponent(String(thread.user.slug))}`}
                  title={thread.user.username.replace('_', ' ')}
                >
                  <Image
                    alt={thread.user.username ?? 'Avatar'}
                    className="transition-opacity duration-300 rounded-full select-none hover:opacity-80"
                    height={32}
                    src={thread.user.profilePicture}
                    width={32}
                  />
                </Link>
              ) : (
                pageType !== 'user' && (
                  <Link
                    className={cn(
                      'flex size-8 shrink-0 select-none items-center justify-center rounded-full border shadow',
                      'bg-background'
                    )}
                    href={`/u/${encodeURIComponent(String(thread.user.slug))}`}
                    title={thread.user.username}
                  >
                    <IconUser />
                  </Link>
                )
              )}
              <div className="overflow-hidden text-sm text-left opacity-50">
                {messages[1]?.content && messages[1]?.role !== 'user' ? (
                  <div className="flex-1 space-y-2 overflow-hidden">
                    <ShortMessage content={messages[1]?.content} />
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <BrowseChatMessageList
          chatbot={thread.chatbot}
          messages={messages.value}
          user={thread.user || undefined}
        />
      </DialogContent>
    </Dialog>
  )
}

interface ChatDialogProps {
  className?: string
  handleOpen?: () => void
  thread?: Thread | null
  pageType: string
}
