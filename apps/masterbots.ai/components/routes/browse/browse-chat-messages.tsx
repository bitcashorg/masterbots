// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatcleanMessage.tsx
/**
 * BrowseChatMessages Component
 *
 * This component fetches and displays chat messages for a specific thread.
 * It retrieves messages based on the provided thread ID and renders the chatbot details
 * and the list of messages.
 *
 * Props:
 * - threadId: The ID of the thread to fetch messages for.
 * - user: Optional user object associated with the messages.
 * - chatbot: Optional chatbot object associated with the messages.
 */

import BrowseChatbotDetails from '@/components/routes/browse/browse-chatbot-details'
import { BrowseThreadBlog } from '@/components/routes/browse/browse-thread-blog'
import { ExternalLink } from '@/components/shared/external-link'
import { buttonVariants } from '@/components/ui/button'
import { urlBuilders } from '@/lib/url'
import { cn } from '@/lib/utils'
import { getMessages } from '@/services/hasura'
import type * as AI from 'ai'
import type { Chatbot, Message, User } from 'mb-genql'
import Link from 'next/link'
import React from 'react'
import { getCanonicalDomain } from '../../../lib/url'

export type MessagePair = {
  userMessage: Message
  chatGptMessage: Message[]
}

export function convertMessage(message: Message) {
  return {
    id: message.messageId,
    content: message.content,
    createAt: message.createdAt,
    role: message.role,
  } as AI.Message
}

export function BrowseChatMessages({
  threadId,
  parentThreadId,
  user,
  chatbot,
}: {
  threadId: string
  parentThreadId?: string
  user?: User
  chatbot?: Chatbot
}) {
  const [messages, setMessages] = React.useState<Message[]>([])
  const [parentThread, setParentThread] = React.useState<Message[]>([])
  const parentThreadTitle = parentThread[0]?.content
  const parentThreadSlug = parentThread[0]?.thread?.slug
  const { name: categoryName } = chatbot?.categories[0].category || { name: '' }
  const { name: chatBotName } = chatbot || { name: '' }
  const canonicalDomain = getCanonicalDomain(chatBotName)
  const parentThreadUrl =
    parentThreadSlug && chatbot
      ? urlBuilders.profilesThreadUrl({
          type: 'chatbot',
          chatbot: chatBotName,
          domain: canonicalDomain,
          threadSlug: parentThreadSlug,
        })
      : '/'

  // Fetch messages for the specified thread ID
  const fetchMessages = async () => {
    if (threadId && !messages.length) {
      const messages = await getMessages({ threadId: threadId })
      setMessages(messages)
    }
  }

  // Fetch parent thread info
  const fetchParentThreadInfo = async () => {
    if (parentThreadId) {
      const parentThread = await getMessages({ threadId: parentThreadId })
      setParentThread(parentThread)
    }
  }

  // Effect to fetch messages when the thread ID changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  React.useEffect(() => {
    fetchMessages()
  }, [threadId])

  // Effect to fetch the parent thread info if the parentThreadId exists
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  React.useEffect(() => {
    if (parentThreadId) {
      fetchParentThreadInfo()
    }
  }, [parentThreadId])

  return (
    <div className="w-full">
      {chatbot ? (
        <BrowseChatbotDetails chatbot={chatbot} variant={chatbot.name ? 'selected' : 'default'} />
      ) : (
        ''
      )}
      <div className="flex flex-col max-w-screen-lg px-4 mx-auto mt-8 gap-y-4">
        {parentThreadTitle && (
          <p>
            This thread is an extension of the original content from the parent thread titled{' '}
            <Link
              className="text-muted-foreground hover:text-primary transition-colors underline"
              href={parentThreadUrl}
            >
              &quot;{parentThreadTitle}&quot;
            </Link>
            . To get the full context and explore more, visit the{' '}
            <Link
              className="text-muted-foreground hover:text-primary transition-colors underline"
              href={parentThreadUrl}
              rel="canonical"
            >
              original post
            </Link>
            .
          </p>
        )}
        <BrowseThreadBlog threadId={threadId} user={user} />
        <div className="border-t border-t-iron dark:border-t-mirage pt-6 text-center mt-44 lg:mt-20">
          <ExternalLink
            className={cn(
              buttonVariants({ size: 'xl', radius: 'full' }),
              'text-xl hover:no-underline',
            )}
            href={`${urlBuilders.chatbotThreadListUrl({
              type: 'personal',
              category: categoryName,
              domain: canonicalDomain,
              chatbot: chatBotName,
            })}?continuousThreadId=${threadId}`}
          >
            Continue Thread
          </ExternalLink>
        </div>
      </div>
    </div>
  )
}
