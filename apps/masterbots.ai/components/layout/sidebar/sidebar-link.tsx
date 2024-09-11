'use client'

import React, { useState, useCallback } from 'react'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { cn } from '@/lib/utils'
import { Category, Chatbot } from 'mb-genql'
import Image from 'next/image'
import Link from 'next/link'
import { IconCaretRight } from '@/components/ui/icons'
import { toSlug } from 'mb-lib'

interface SidebarLinkProps {
  category: Category
}

export default function SidebarLink({ category }: SidebarLinkProps) {
  const {
    activeCategory,
    setActiveCategory,
    activeChatbot,
    setActiveChatbot,
    isFilterMode,
  } = useSidebar()

  const [isExpanded, setIsExpanded] = useState(false)

  const handleClickCategory = useCallback(() => {
    setIsExpanded(prev => !prev)
    setActiveCategory(prev => prev === category.categoryId ? null : category.categoryId)
  }, [category.categoryId, setActiveCategory])

  const isActive = activeCategory === category.categoryId

  return (
    <div className={cn('flex flex-col mb-2')}>
      <div
        className={cn(
          'flex items-center p-2 cursor-pointer',
          isActive && 'bg-gray-200 dark:bg-mirage'
        )}
        onClick={handleClickCategory}
      >
        <span className="flex-grow">{category.name}</span>
        <IconCaretRight
          className={cn(
            'transition-transform duration-300',
            isExpanded && 'rotate-90'
          )}
        />
      </div>
      {(isExpanded || isFilterMode) && (
        <div className="ml-4">
          {category.chatbots.map((chatbotCategory) => (
            <ChatbotComponent
              key={chatbotCategory.chatbot.chatbotId}
              chatbot={chatbotCategory.chatbot}
              category={category}
              isActive={chatbotCategory.chatbot.chatbotId === activeChatbot?.chatbotId}
              setActiveChatbot={setActiveChatbot}
            />
          ))}
        </div>
      )}
    </div>
  )
}

interface ChatbotComponentProps {
  chatbot: Chatbot
  category: Category
  isActive: boolean
  setActiveChatbot: React.Dispatch<React.SetStateAction<Chatbot | null>>
}

const ChatbotComponent: React.FC<ChatbotComponentProps> = React.memo(function ChatbotComponent({
  chatbot,
  category,
  isActive,
  setActiveChatbot
}) {
  const handleChatbotClick = useCallback(() => {
    setActiveChatbot(chatbot)
  }, [chatbot, setActiveChatbot])

  return (
    <Link
      href={`/c/${toSlug(category.name)}/${chatbot.name.toLowerCase()}`}
      className={cn(
        'flex items-center p-2 w-full',
        isActive && 'bg-blue-100 dark:bg-blue-900',
        'hover:bg-gray-100 dark:hover:bg-gray-800'
      )}
      onClick={handleChatbotClick}
    >
      <Image
        src={chatbot.avatar || '/path/to/default/avatar.png'}
        alt={chatbot.name}
        width={24}
        height={24}
        className="mr-2 rounded-full"
      />
      <span>{chatbot.name}</span>
    </Link>
  )
})