'use client'

// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatcleanMessage.tsx
/**
 * BrowseThreadBlog Component
 *
 * This component fetches and displays chat messages for a specific thread as blog.
 * It retrieves messages based on the provided thread ID and renders the chatbot details
 * and the list of messages as blog.
 *
 * Props:
 * - threadId: The ID of the thread to fetch messages for.
 * - user: Optional user object associated with the messages.
 */
import { ThreadBlogMarkDown } from '@/components/shared/thread-blog-markdown'
import { getMessages } from '@/services/hasura'
import { format } from 'date-fns'
import type { Message, User } from 'mb-genql'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
export function BrowseThreadBlog({
  threadId,
  user
}: {
  threadId: string
  user?: User
}) {
  const [messages, setMessages] = React.useState<Message[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  const userprofile = user?.profilePicture || ''
  const username = user?.username || 'User'

  // Fetch messages for the specified thread ID
  const fetchMessages = async () => {
    setIsLoading(true)
    try {
      if (threadId && !messages.length) {
        const messages = await getMessages({ threadId: threadId })
        setMessages(messages)
      }
    } catch (err) {
      throw new Error('Failed to fetch messages')
    } finally {
      setIsLoading(false)
    }
  }

  // Effect to fetch messages when the thread ID changes
  React.useEffect(() => {
    fetchMessages()
  }, [threadId])

  const countWords = () => {
    const combinedContent = messages.map(msg => msg.content).join(' ')

    const cleanContent = combinedContent.replace(/\s+/g, ' ').trim()
    const wordCount = cleanContent.split(/\s+/).length
    return Math.ceil(wordCount / 200)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {isLoading && <div>Loading...</div>}
      {!isLoading && messages && (
        <>
          <div className="space-t-8">
            {messages.map((message, index) => {
              const isUser = message.role === 'user'

              return (
                <article
                  key={message.messageId}
                  className={`${index !== messages.length - 1 ? ' pb-5' : ''}`}
                >
                  {/* User Questions as Headers */}
                  {isUser && index === 0 && (
                    <header>
                      <h1 className="text-3xl font-bold ">{message.content}</h1>

                      <span className="text-sm text-gray-500">
                        {countWords()} minutes reading
                      </span>
                    </header>
                  )}

                  {isUser && index != 0 && (
                    <header>
                      <h3 className="text-xl font-bold ">{message.content}</h3>
                    </header>
                  )}

                  {/* Assistant Responses with Formatting */}
                  {!isUser && (
                    <div className="max-w-none">
                      <ThreadBlogMarkDown content={message.content} />
                    </div>
                  )}
                </article>
              )
            })}
          </div>

          {/* Thread Footer */}
          <footer className="mt-12 pt-6 flex flex-col justify-end items-end space-y-2">
            <div className="flex items-center space-x-2">
              <Link href={`/u/${user?.slug}/t`} target="_blank">
                <Image
                  src={userprofile}
                  alt={username}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </Link>
            </div>
            <div>
              <span>{format(new Date(), 'MMMM dd, yyyy')}</span>
            </div>
          </footer>
        </>
      )}
    </div>
  )
}
