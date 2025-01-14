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

import type * as AI from 'ai'
import type {  Message, User } from 'mb-genql'
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { getMessages } from '@/services/hasura'

export type MessagePair = {
  userMessage: Message
  chatGptMessage: Message[]
}
  
const formatContent = (content: string): JSX.Element[] => {
    const processText = (text: string): string => {
      return text
        // Handle links
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>')
        // Clean up multiple asterisks
        .replace(/\*{3,}/g, '**')
        // Handle bold text
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        // Handle italic text
        .replace(/\*([^*]+)\*/g, '<em>$1</em>')
        // Clean up remaining asterisks
        .replace(/\*/g, '');
    };
  
    // Preprocess content to handle nested numbering and colons
    const preprocessContent = (content: string): string => {
      return content
        // Ensure colon-separated content starts on new line
        .replace(/([^:\n])([\w\s]+:)/g, '$1\n\n$2')
        // Format nested numbered lists (e.g., 1.1., 1.2., etc.)
        .replace(/^(\d+\.\d+\.)\s/gm, '   $1 ')
        // Add proper indentation for nested items
        .replace(/^(\s*)(\d+\.\d+\.)/gm, '      $2')
        // Clean up extra spaces and newlines
        .replace(/\n{3,}/g, '\n\n')
        .trim();
    };
  
    const processedContent = preprocessContent(content);
  
    // Split by any numbered sections (both main and nested)
    const sections = processedContent
      .split(/(?=(?:\n|^)(?:\d+\.(?:\d+\.)?\s))/g)
      .filter(Boolean);
  
    return sections.map((section, index): JSX.Element => {
      // Handle numbered lists (both main and nested)
      const numberMatch = section.match(/^(\d+(?:\.\d+)?)\.\s+(.+)/s);
      
      if (numberMatch) {
        const [, number, text] = numberMatch;
        const [title, ...contentParts] = text.split(':');
        const isNested = number.includes('.');
        
        return (
          <div 
            key={`numbered-${index}`} 
            className={`mb-4 relative ${isNested ? 'pl-8' : 'pl-5'}`}
          >
            <span className="absolute left-0 font-bold">{number}.</span>
            <span
              className="font-bold"
              dangerouslySetInnerHTML={{
                __html: processText(title.trim())
              }}
            />
            {contentParts.length > 0 && (
              <>
                <span>: </span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: processText(contentParts.join(':').trim())
                  }}
                />
              </>
            )}
          </div>
        );
      }
  
      // Handle non-numbered parts
      const paragraphs = section
        .split(/\n\n+/)
        .filter(Boolean)
        .map(p => p.trim());
  
      return (
        <div key={`section-${index}`} className="mb-4">
          {paragraphs.map((paragraph, paragraphIndex) => {
            // Check for title pattern with colon
            const titleMatch = paragraph.match(/^([^:]+):\s*(.+)/s);
  
            if (titleMatch) {
              const [, title, content] = titleMatch;
              return (
                <div key={`titled-${paragraphIndex}`} className="mt-6 mb-4">
                  <span className="font-bold">{title}: </span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: processText(content.trim())
                    }}
                  />
                </div>
              );
            }
  
            // Regular paragraph
            return (
              <p
                key={`regular-${paragraphIndex}`}
                className="mb-4"
                dangerouslySetInnerHTML={{
                  __html: processText(paragraph.trim())
                }}
              />
            );
          })}
        </div>
      );
    });
  };
  
export function BrowseThreadBlog({
  threadId,
  user,
}: {
  threadId: string
  user?: User
}) {
  const [messages, setMessages] = React.useState<Message[]>([])

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
 
  const formatDate = (dateString: string | number | Date) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (error) {
      return dateString;
    }
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
                {formatContent(message.content)}
              </div>
            )}
          </article>
        );
      })}
    </div>

    {/* Thread Footer */}
    <footer className="mt-12 pt-6 border-t ">
      <div className="text-right text-sm ">
        <p>Thread ID: {threadId}</p>
        {/* <p>{formatDate(new Date())}</p> */}
      </div>
    </footer>
  </div>
  )
}
