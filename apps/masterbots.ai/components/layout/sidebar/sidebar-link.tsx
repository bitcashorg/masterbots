'use client'

import { Checkbox } from "@/components/ui/checkbox"
import { IconCaretRight } from '@/components/ui/icons'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { cn } from '@/lib/utils'
import { Category, Chatbot } from 'mb-genql'
import { toSlug } from 'mb-lib'
import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useState } from 'react'

interface SidebarLinkProps {
  category: Category
  isFilterMode: boolean
}

export default function SidebarLink({ category, isFilterMode }: SidebarLinkProps) {
  const {
    activeCategory,
    setActiveCategory,
    activeChatbot,
    setActiveChatbot,
    selectedCategories,
    selectedChatbots,
    setSelectedCategories,
  } = useSidebar()

  const [isExpanded, setIsExpanded] = useState(false)

  const handleClickCategory = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isFilterMode) {
      setIsExpanded(prev => !prev)
      setActiveCategory(prev => prev === category.categoryId ? null : category.categoryId)
    }
  }, [category.categoryId, setActiveCategory, isFilterMode])

  const handleCheckboxChange = useCallback((checked: boolean) => {
    setSelectedCategories(prev =>
      checked
        ? [...prev, category.categoryId]
        : prev.filter(id => id !== category.categoryId)
    )
  }, [category.categoryId, setSelectedCategories])

  const isActive = activeCategory === category.categoryId
  const isSelected = selectedCategories.includes(category.categoryId)

  return (
    <div className={cn('flex flex-col mb-2')}>
      <div
        className={cn(
          'flex items-center p-2 cursor-pointer',
          isActive && 'bg-gray-200 dark:bg-mirage'
        )}
        onClick={handleClickCategory}
      >
        {isFilterMode && (
          <Checkbox
            checked={isSelected}
            onCheckedChange={handleCheckboxChange}
            onClick={(e) => e.stopPropagation()}
            className="mr-2"
          />
        )}
        <span className="flex-grow">{category.name}</span>
        <IconCaretRight
          className={cn(
            'transition-transform duration-300  stroke-[#09090b] dark:stroke-[#FAFAFA]',
            isExpanded || isFilterMode && 'rotate-90'
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
              isFilterMode={isFilterMode}
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
  isFilterMode: boolean
}

const ChatbotComponent: React.FC<ChatbotComponentProps> = React.memo(function ChatbotComponent({
  chatbot,
  category,
  isActive,
  setActiveChatbot,
  isFilterMode
}) {
  const { selectedChatbots, setSelectedChatbots } = useSidebar()

  const handleChatbotClick = useCallback((e: React.MouseEvent) => {
    if (isFilterMode) e.preventDefault()
    else setActiveChatbot(chatbot)
  }, [chatbot, setActiveChatbot, isFilterMode])

  const isSelected = selectedChatbots.includes(chatbot.chatbotId)

  const handleCheckboxChange = useCallback((checked: boolean) => {
    setSelectedChatbots(prev =>
      checked
        ? [...prev, chatbot.chatbotId]
        : prev.filter(id => id !== chatbot.chatbotId)
    )
  }, [chatbot.chatbotId])

  return isFilterMode ? (
    <div
      className={cn(
        'flex items-center p-2 w-full',
        isActive && 'bg-blue-100 dark:bg-blue-900',
        'hover:bg-gray-100 dark:hover:bg-gray-800'
      )}
    >
      <Checkbox
        checked={isSelected}
        onCheckedChange={handleCheckboxChange}
        onClick={(e) => e.stopPropagation()}
        className="mr-2"
      />
      <Image
        src={chatbot.avatar || '/path/to/default/avatar.png'}
        alt={chatbot.name}
        width={24}
        height={24}
        className="mr-2 rounded-full"
      />
      <span>{chatbot.name}</span>
    </div>
  ) : (
    <Link
      href={isFilterMode ? '#' : `/c/${toSlug(category.name)}/${chatbot.name.toLowerCase()}`}
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