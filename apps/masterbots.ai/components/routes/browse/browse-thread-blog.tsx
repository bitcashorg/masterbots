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
import type {  Message, User } from 'mb-genql'
import React from 'react';
import { format } from 'date-fns';
import { getMessages } from '@/services/hasura'
import Image from 'next/image'
import Link from 'next/link';
import { ThreadBlogMarkDown } from '@/components/shared/thread-blog-markdown';

export function BrowseThreadBlog({
  threadId,
  user,
}: {
  threadId: string
  user?: User
}) {
  const [messages, setMessages] = React.useState<Message[]>([])
  const userprofile = user?.profilePicture || 'https://via.placeholder.com/150'
  const username = user?.username || 'User'

  // Fetch messages for the specified thread ID
  const fetchMessages = async () => {
    if (threadId && !messages.length) {
      const messages = await getMessages({ threadId: threadId })
      console.log('🟢 Fetched Messages:', messages)
      setMessages(messages)
    }
  }

  // Effect to fetch messages when the thread ID changes
  React.useEffect(() => {
    fetchMessages()
  }, [threadId])
 
 

  const countWords = () => {

    const combinedContent = messages
    .map(msg => msg.content)
    .join(' ');

    const cleanContent = combinedContent
    .replace(/\s+/g, ' ')
    .trim();
    const wordCount = cleanContent.split(/\s+/).length;
     return Math.ceil(wordCount / 200);
    
  }

  return (
    <div className="max-w-4xl mx-auto p-6 ">
    <div className="space-y-8">
      {messages.map((message, index) => {
        const isUser = message.role === 'user';
        
        return (
          <article 
            key={message.messageId}
            className={`${
              index !== messages.length - 1 ? ' pb-5' : ''
            }`}
          >
            {/* User Questions as Headers */}
            {isUser && index === 0 && (
              <header>
                <h1 className="text-3xl font-bold ">
                  {message.content}
                </h1>
                
                <span className="text-sm text-gray-500">
                  {countWords()} minutes reading
                </span>
              </header>
            )}

            {isUser &&  index != 0 && (
              <header>
                <h3 className="text-xl font-bold ">
                  {message.content}
                </h3>
              </header>
            )}

            {/* Assistant Responses with Formatting */}
            {!isUser && (
              <div className="max-w-none">
                <ThreadBlogMarkDown content={message.content} />
              </div>
            )}
          </article>
        );
      })}
    </div>

    {/* Thread Footer */}
    <footer className="mt-12 pt-6 flex flex-col justify-end items-end space-y-2">
      <div className="flex items-center space-x-2">
          <span>created by</span>
            <Link href={`/u/t/${user?.slug}`} target='_blank' >
               <Image src={userprofile} alt={username} width={40} height={40} className="rounded-full" />
            </Link>
      </div>
      <div>
         <span>
           { format(new Date(), 'MMMM dd, yyyy') }
         </span>
      </div>
    </footer>
  </div>
  )
}
