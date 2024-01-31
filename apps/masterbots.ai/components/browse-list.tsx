'use client'

import React from 'react'
import Image from 'next/image'

import { Separator } from '@/components/ui/separator'
import { Thread } from 'mb-genql'
import { cn } from '@/lib/utils'
import { useBrowse } from '@/lib/hooks/use-browse'
import { IconUser, IconCaretRight } from './ui/icons'
import { getBrowseThreads } from '@/services/hasura'
import Link from 'next/link'
import { MemoizedReactMarkdown } from './markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { CodeBlock } from './ui/codeblock'

export default function BrowseList() {
  const { keyword, tab } = useBrowse()

  const [threads, setThreads] = React.useState<Thread[]>([])

  const fetchThreads = async (keyword: string, tab: number | null) => {
    const threads = await getBrowseThreads({
      categoryId: tab,
      keyword
    })
    setThreads(threads)
  }

  React.useEffect(() => {
    fetchThreads(keyword, tab)
  }, [keyword, tab])

  return (
    <div className="w-full py-5">
      {threads.map((thread: Thread, key) => (
        <Link href={`/browse/${thread.threadId}`} key={key}>
          <div
            className={cn('hover:bg-[rgb(30,41,59)] rounded-xl p-4 relative ')}
          >
            <div
              className="relative flex flex-1 items-center
          justify-between py-4 font-medium transition-all "
            >
              {thread.user?.profilePicture ? (
                <div
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
                </div>
              ) : (
                <div
                  className={cn(
                    'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border shadow',
                    'bg-background'
                  )}
                >
                  <IconUser />
                </div>
              )}
              <div className="flex-1 px-1 ml-4 space-y-2 text-left">
                {thread.messages[0]?.content}
                <span className="opacity-30 ml-4 font-normal">
                  by {thread.user?.username.replace('_', ' ')},&nbsp;
                  {thread.chatbot.name}
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
                  <MemoizedReactMarkdown
                    className="break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
                    remarkPlugins={[remarkGfm, remarkMath]}
                    components={{
                      p({ children }) {
                        return <p className="mb-2 last:mb-0">{children}</p>
                      },
                      code({ node, inline, className, children, ...props }) {
                        if (children.length) {
                          if (children[0] == '▍') {
                            return (
                              <span className="mt-1 cursor-default animate-pulse">
                                ▍
                              </span>
                            )
                          }

                          children[0] = (children[0] as string).replace(
                            '`▍`',
                            '▍'
                          )
                        }

                        const match = /language-(\w+)/.exec(className || '')

                        if (inline) {
                          return (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          )
                        }

                        return (
                          <CodeBlock
                            key={Math.random()}
                            language={(match && match[1]) || ''}
                            value={String(children).replace(/\n$/, '')}
                            {...props}
                          />
                        )
                      }
                    }}
                  >
                    {`${thread.messages[1].content.slice(0, 300)}${
                      thread.messages[1].content.length >= 400 ? '...' : ''
                    }`}
                  </MemoizedReactMarkdown>
                </div>
              ) : (
                ''
              )}
            </div>
            <Separator className="dark:bg-[#1E293B] absolute bottom-0 w-[calc(100%-1.25rem)]" />
          </div>
        </Link>
      ))}
    </div>
  )
}
