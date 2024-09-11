'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { cn } from '@/lib/utils'
import { getChatbots } from '@/services/hasura'
import { motion } from 'framer-motion'
import { Category, Chatbot, ChatbotCategory } from 'mb-genql'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { IconCaretRight } from '@/components/ui/icons'
import { toSlug } from 'mb-lib'
import { Checkbox } from '@/components/shared/checkbox'

const PAGE_SIZE = 20

function convertChatbotCategory(chatbotCategory: ChatbotCategory[]): Chatbot[] {
  return chatbotCategory.map(c => c.chatbot)
}

export default function SidebarLink({ category }: { category: Category }) {
  const { chatbot } = useParams<{ chatbot: string }>()
  const {
    activeCategory,
    setActiveCategory,
    activeChatbot,
    setActiveChatbot,
    isFilterMode,
    filterValue,
    selectedCategories,
    setSelectedCategories,
    selectedChatbots,
    setSelectedChatbots
  } = useSidebar()

  const [isExpanded, setIsExpanded] = useState(false)
  const [chatbots, setChatbots] = useState<Chatbot[]>(convertChatbotCategory(category.chatbots))
  const [loading, setLoading] = useState<boolean>(false)
  const [count, setCount] = useState<number>(category.chatbots.length)

  const isCategorySelected = selectedCategories.includes(category.categoryId)

  useEffect(() => {
    const matchedChatbot = category.chatbots.find(c => c.chatbot.name.toLowerCase().trim() === chatbot?.trim())
    if (matchedChatbot) {
      setActiveChatbot(matchedChatbot.chatbot)
      setActiveCategory(category.categoryId)
    } else if (!chatbot) {
      setActiveChatbot(null)
    }
  }, [category.categoryId, category.chatbots, chatbot, setActiveCategory, setActiveChatbot])

  useEffect(() => {
    return () => {
      setActiveChatbot(null)
      setActiveCategory(null)
    }
  }, [setActiveChatbot, setActiveCategory])

  const handleClickCategory = useCallback(() => {
    if (isFilterMode) {
      setSelectedCategories(prev =>
        prev.includes(category.categoryId)
          ? prev.filter(id => id !== category.categoryId)
          : [...prev, category.categoryId]
      )
    } else {
      setIsExpanded(prev => !prev)
      setActiveCategory(prev => prev === category.categoryId ? null : category.categoryId)
    }
  }, [isFilterMode, category.categoryId, setSelectedCategories, setActiveCategory])

  const loadMore = useCallback(async () => {
    setLoading(true)
    try {
      const moreChatbots = await getChatbots({
        offset: chatbots.length,
        limit: PAGE_SIZE
      })
      setChatbots(prevState => [...prevState, ...moreChatbots])
      setCount(moreChatbots.length)
    } catch (error) {
      console.error('Error loading more chatbots:', error)
    } finally {
      setLoading(false)
    }
  }, [chatbots.length])

  const filteredChatbots = useMemo(() => 
    chatbots.filter(chatbot => 
      chatbot.name.toLowerCase().includes(filterValue.toLowerCase())
    ),
    [chatbots, filterValue]
  )

  const visibleChatbots = useMemo(() => 
    isFilterMode ? filteredChatbots : filteredChatbots.filter(chatbot => selectedChatbots.includes(chatbot.chatbotId)),
    [isFilterMode, filteredChatbots, selectedChatbots]
  )

  if (!isFilterMode && !isCategorySelected) return null
  if (visibleChatbots.length === 0 && !isFilterMode) return null

  return (
    <div className={cn('flex flex-col mb-2')}>
      <div
        className={cn(
          'flex items-center p-2 cursor-pointer',
          isExpanded && 'bg-gray-200 dark:bg-mirage'
        )}
        onClick={handleClickCategory}
      >
        {isFilterMode && (
          <Checkbox
            checked={isCategorySelected}
            onCheckedChange={() => {}}
            className="mr-2"
            onClick={(e) => e.stopPropagation()}
          />
        )}
        <span className="flex-grow">{category.name}</span>
        <IconCaretRight
          className={cn(
            'transition-transform duration-300',
            isExpanded && 'rotate-90'
          )}
        />
      </div>
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isExpanded ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden ml-4"
      >
        {visibleChatbots.map((chatbot) => (
          <ChatbotComponent
            key={chatbot.chatbotId}
            chatbot={chatbot}
            category={category}
            isFilterMode={isFilterMode}
            isSelected={selectedChatbots.includes(chatbot.chatbotId)}
            onSelect={() => {
              setSelectedChatbots(prev =>
                prev.includes(chatbot.chatbotId)
                  ? prev.filter(id => id !== chatbot.chatbotId)
                  : [...prev, chatbot.chatbotId]
              )
            }}
            isActive={chatbot.chatbotId === activeChatbot?.chatbotId}
          />
        ))}
        {!isFilterMode && count === PAGE_SIZE && (
          <button
            onClick={loadMore}
            disabled={loading}
            className="w-full p-2 text-sm text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {loading ? 'Loading...' : 'Load more'}
          </button>
        )}
      </motion.div>
    </div>
  )
}

const ChatbotComponent = React.memo(function ChatbotComponent({
  chatbot,
  category,
  isFilterMode,
  isSelected,
  onSelect,
  isActive
}: {
  chatbot: Chatbot
  category: Category
  isFilterMode: boolean
  isSelected: boolean
  onSelect: () => void
  isActive: boolean
}) {
  return (
    <div
      className={cn(
        'flex items-center p-2',
        isActive && 'bg-blue-100 dark:bg-blue-900',
        !isFilterMode && 'hover:bg-gray-100 dark:hover:bg-gray-800'
      )}
    >
      {isFilterMode ? (
        <Checkbox
          checked={isSelected}
          onCheckedChange={onSelect}
          className="mr-2"
        />
      ) : (
        <Link href={`/c/${toSlug(category.name)}/${chatbot.name.toLowerCase()}`} className="flex items-center w-full">
          <Image
            src={chatbot.avatar || '/path/to/default/avatar.png'}
            alt={chatbot.name}
            width={24}
            height={24}
            className="rounded-full mr-2"
          />
          <span>{chatbot.name}</span>
        </Link>
      )}
      {isFilterMode && (
        <>
          <Image
            src={chatbot.avatar || '/path/to/default/avatar.png'}
            alt={chatbot.name}
            width={24}
            height={24}
            className="rounded-full mr-2"
          />
          <span>{chatbot.name}</span>
        </>
      )}
    </div>
  )
})