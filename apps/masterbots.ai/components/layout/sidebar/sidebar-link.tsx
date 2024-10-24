'use client'

import { useRouter } from 'next/navigation'
import { Checkbox } from "@/components/ui/checkbox"
import { IconCaretRight } from '@/components/ui/icons'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { cn } from '@/lib/utils'
import { Category, Chatbot } from 'mb-genql'
import { toSlug } from 'mb-lib'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from "next/navigation"
import React, { useCallback, useState } from 'react'

interface SidebarLinkProps {
  category: Category
  isFilterMode: boolean
}

export default function SidebarLink({ category, isFilterMode }: SidebarLinkProps) {
  const router = useRouter()
  const pathname = usePathname()
  const isBrowse = !pathname.includes('/c')
  
  const {
    activeCategory,
    setActiveCategory,
    activeChatbot,
    setActiveChatbot,
    selectedCategories,
    selectedChatbots,
    setSelectedCategories,
    setSelectedChatbots,
    expandedCategories,
    setExpandedCategories,
  } = useSidebar()
  const isExpanded = expandedCategories.includes(category.categoryId)

  const handleClickCategory = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isFilterMode) {
      setExpandedCategories(prev => 
        prev.includes(category.categoryId) 
          ? [] 
          : [category.categoryId]
      )
      setActiveCategory(prev => {
        const newCategory = prev === category.categoryId ? null : category.categoryId
        if (newCategory && isBrowse) {
          setActiveChatbot(null)
          router.push(`/c/${toSlug(category.name)}`)
        }
        return newCategory
      })
    }
  }, [category.categoryId, category.name, setActiveCategory, setExpandedCategories, setActiveChatbot, router, isFilterMode, isBrowse])

  const handleCheckboxChange = useCallback((checked: boolean) => {
    setSelectedCategories(prev =>
      checked
        ? [...prev, category.categoryId]
        : prev.filter(id => id !== category.categoryId)
    )
    setSelectedChatbots(prev =>
      checked
        ? [...prev, ...category.chatbots.map(chatbot => chatbot.chatbot.chatbotId)]
        : prev.filter(id => !category.chatbots.some(chatbot => chatbot.chatbot.chatbotId === id))
    )
  }, [category.categoryId, category.chatbots])

  const isActive = activeCategory === category.categoryId
  const isSelected = selectedCategories.includes(category.categoryId)

  const categoryContent = (
    <>
      {isFilterMode && (
        <Checkbox
          checked={isSelected}
          onCheckedChange={handleCheckboxChange}
          onClick={(e) => e.stopPropagation()}
          className="mr-2"
        />
      )}
      <span className="grow">{category.name}</span>
      <IconCaretRight
        className={cn(
          'transition-transform duration-300 stroke-[#09090b] dark:stroke-[#FAFAFA]',
          isExpanded || isFilterMode ? 'rotate-90' : 'rotate-0'
        )}
      />
    </>
  )

  const childrenContent = (isExpanded || isFilterMode) && (
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
  )

  if (isBrowse || isFilterMode) {
    return (
      <div className={cn('flex flex-col mb-2')}>
        <div
          className={cn(
            'flex items-center p-2 cursor-pointer',
            isActive && 'bg-gray-200 dark:bg-mirage'
          )}
          onClick={handleClickCategory}
        >
          {categoryContent}
        </div>
        {childrenContent}
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col mb-2')}>
      <Link
        href={`/c/${toSlug(category.name)}`}
        className={cn(
          'flex items-center p-2 cursor-pointer',
          isActive && 'bg-gray-200 dark:bg-mirage'
        )}
        onClick={handleClickCategory}
      >
        {categoryContent}
      </Link>
      {childrenContent}
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
  const { selectedChatbots, toggleChatbotSelection } = useSidebar()
  const pathname = usePathname()
  const isBrowse = !pathname.includes('/c')

  const handleChatbotClick = useCallback((e: React.MouseEvent) => {
    if (isFilterMode) e.preventDefault()
    else setActiveChatbot(chatbot)
  }, [chatbot, setActiveChatbot, isFilterMode])

  const isSelected = selectedChatbots.includes(chatbot.chatbotId)

  const handleCheckboxChange = useCallback(() => {
    toggleChatbotSelection(chatbot.chatbotId)
  }, [chatbot.chatbotId])

  if (!isFilterMode && !isSelected) return null

  return isFilterMode || isBrowse ? (
    <div
      className={cn(
        'flex items-center p-2 w-full',
        isActive && 'bg-blue-100 dark:bg-blue-900',
        'hover:bg-gray-100 dark:hover:bg-gray-800'
      )}
    >
      {isFilterMode && (
        <Checkbox
          checked={isSelected}
          onCheckedChange={handleCheckboxChange}
          onClick={(e) => e.stopPropagation()}
          className="mr-2"
        />
      )}
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