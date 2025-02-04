import { cleanPrompt } from '@/lib/helpers/ai-helpers'
import { cn } from '@/lib/utils'
import type { Message } from 'ai'
import type { Chatbot } from 'mb-genql'
import { useState } from 'react'
import { ChatMessageActions } from '@/components/routes/chat/chat-message-actions'
import { ThreadContent } from './thread-content'
import { ThreadReasoning } from './thread-reasoning'
import { ThreadReferences } from './thread-references'
import type { WebSearchResult } from '@/types/types'

export interface ThreadMessageProps {
  message: Message
  chatbot?: Chatbot
  sendMessageFromResponse?: (content: string) => void
  actionRequired?: boolean
  webSearchResults?: WebSearchResult[]
  isBrowseView?: boolean
  className?: string
}

export function ThreadMessage({
  message,
  chatbot,
  sendMessageFromResponse,
  actionRequired = true,
  webSearchResults = [],
  isBrowseView = false,
  className,
  ...props
}: ThreadMessageProps) {
  const [references, setReferences] = useState<WebSearchResult[]>([])
  const cleanMessage = { ...message, content: cleanPrompt(message.content) }

  return (
    <div
      className={cn(
        'group relative flex items-start',
        isBrowseView ? 'my-4' : 'p-1',
        className
      )}
      {...props}
    >
      <div
        className={cn(
          'flex-1 space-y-2 overflow-hidden',
          isBrowseView ? 'md:ml-4' : 'pr-1'
        )}
      >
        <ThreadContent
          message={cleanMessage}
          isBrowseView={isBrowseView}
          sendMessageFromResponse={sendMessageFromResponse}
          webSearchResults={webSearchResults}
          onReferenceFound={ref => setReferences(prev => [...prev, ref])}
        />

        {!isBrowseView && (
          <>
            <ThreadReasoning message={message} />
            {actionRequired && (
              <ChatMessageActions className="md:!right-0" message={message} />
            )}
            <ThreadReferences references={references} />
          </>
        )}
      </div>
    </div>
  )
}
