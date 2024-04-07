'use client'
import { motion } from 'framer-motion'
import type { Category, Chatbot, ChatbotCategory } from '@repo/mb-genql'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'
import { getChatbots } from '@/services/hasura'
import { cn } from '@/lib/utils'
import { useSidebar } from '@/hooks/use-sidebar'
import { IconCaretRight } from '../../ui/icons'

const PAGE_SIZE = 20

function convertChatbotCategory(chatbotCategory: ChatbotCategory[]) {
  const chatbots: Chatbot[] = []
  chatbotCategory.map(c => {
    chatbots.push(c.chatbot)
  })
  return chatbots
}

export default function SidebarLink({ category }: { category: Category }) {
  const { chatbot, threadId } = useParams<{
    chatbot: string
    threadId?: string
  }>()
  const { activeCategory, setActiveCategory, activeChatbot, setActiveChatbot } =
    useSidebar()

  const [loading, setLoading] = React.useState<boolean>(false)
  const [chatbots, setChatbots] = React.useState<Chatbot[]>(
    convertChatbotCategory(category.chatbots)
  )
  const [count, setCount] = React.useState<number>(category.chatbots.length)
  const [isChatbotOfThisCategory, setIsChatbotOfThisCategory] =
    React.useState<boolean>(false)

  React.useEffect(() => {
    if (
      category.chatbots.length &&
      category.chatbots.filter(
        c => c.chatbot.name.toLowerCase().trim() === chatbot.trim()
      ).length
    ) {
      setActiveChatbot(
        _prev =>
          category.chatbots.filter(
            c => c.chatbot.name.toLowerCase().trim() === chatbot.trim()
          )[0].chatbot
      )
      setActiveCategory(_prev => category.categoryId)
    } else if (!chatbot) {
      setActiveChatbot(_prev => null)
    }
  }, [
    category.categoryId,
    category.chatbots,
    chatbot,
    setActiveCategory,
    setActiveChatbot
  ])

  React.useEffect(() => {
    return () => {
      setActiveChatbot(null)
      setActiveCategory(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClickCategory = () => {
    // Toggle category
    if (activeCategory === category.categoryId && !activeChatbot)
      setActiveCategory(_prev => null)
    else setActiveCategory(_prev => category.categoryId)
  }

  const loadMore = async () => {
    console.log('🟡 Loading More Content')
    setLoading(true)

    const moreChatbots = await getChatbots({
      offset: chatbots.length,
      limit: PAGE_SIZE
    })

    setChatbots(prevState => [...prevState, ...moreChatbots])
    setCount(moreChatbots.length)
    setLoading(false)
  }

  React.useEffect(() => {
    const isBotOfThisCategory =
      activeChatbot &&
      category.chatbots.length &&
      category.chatbots.filter(c => c.chatbot.name === activeChatbot.name)
        .length

    setIsChatbotOfThisCategory(Boolean(isBotOfThisCategory))
  }, [activeChatbot, category.categoryId, category.chatbots])

  return (
    <div
      className={cn('flex flex-col', {
        'border-b-[1px] dark:border-mirage border-gray-300':
          activeCategory === category.categoryId && !isChatbotOfThisCategory
      })}
    >
      <div
        className={cn(
          'transition-all flex',
          activeCategory === category.categoryId &&
            'dark:bg-mirage bg-gray-300',
          isChatbotOfThisCategory && 'justify-center'
        )}
      >
        <Link
          // TODO: Improve routing for user sharing
          // href={`/${category.name.toLowerCase()}`}
          className={cn(
            'flex items-center pr-5 py-3 cursor-pointer relative origin-left transition-all ease-in-out duration-300',
            isChatbotOfThisCategory ? 'text-xs opacity-50' : 'grow pl-5'
          )}
          href="/"
          onClick={handleClickCategory}
          shallow
        >
          {/* <motion.div
            className="overflow-hidden"
            animate={{
              width: activeChatbot ? '0' : 'auto'
            }}
          >
          <img
            src={
              categoryAvatars.get(category.name) ||
              '/path/to/default/avatar.png'
            }
            alt={category.name}
            width={50} // replace with your desired width
            height={50} // replace with your desired height
            className="object-cover rounded-full"
          />
        </motion.div> */}
          <span className="pl-3">{category.name}</span>
          <IconCaretRight
            className={`transition duration-300 ease-in-out
          absolute
          stroke-[#09090b] dark:stroke-[#FAFAFA] ${activeCategory === category.categoryId && !isChatbotOfThisCategory ? 'rotate-90 right-5 xl:right-5 lg:right-2' : isChatbotOfThisCategory ? 'rotate-180 right-0 scale-75' : 'right-5 xl:right-5 lg:right-2'}`}
          />
        </Link>
        {isChatbotOfThisCategory && activeChatbot ? (
          <div className="flex items-center pl-2 py-3">
            <Image
              alt={category.name}
              className="object-cover rounded-full"
              height={32}
              src={activeChatbot.avatar || '/path/to/default/avatar.png'}
              width={32}
            />
            <span className="pl-3">{activeChatbot.name}</span>
          </div>
        ) : (
          ''
        )}
      </div>
      <motion.div
        animate={{
          height:
            activeCategory === category.categoryId &&
            category.chatbots.length &&
            !isChatbotOfThisCategory
              ? ''
              : '0px'
        }}
        className="overflow-hidden
          ml-5 flex-col border-l-DEFAULT dark:border-mirage border-gray-300"
        initial={{ height: 0 }}
      >
        {chatbots.map((chatbot, key) => (
          <ChatbotComponent
            activeChatbot={
              activeCategory === category.categoryId && isChatbotOfThisCategory
                ? activeChatbot
                : null
            }
            chatbot={chatbot}
            hasMore={count === PAGE_SIZE}
            isLast={key === chatbots.length - 1}
            key={chatbot.chatbotId}
            loadMore={loadMore}
            loading={loading}
          />
        ))}
      </motion.div>
    </div>
  )
}

function ChatbotComponent({
  chatbot,
  loadMore,
  loading,
  isLast,
  hasMore,
  activeChatbot
}: {
  chatbot: Chatbot
  loadMore: () => void
  loading: boolean
  isLast: boolean
  hasMore: boolean
  activeChatbot: Chatbot | null
}) {
  const chatbotRef = React.useRef<HTMLAnchorElement>(null)

  React.useEffect(() => {
    if (!chatbotRef.current) return
    const observer = new IntersectionObserver(([entry]) => {
      if (hasMore && isLast && entry.isIntersecting && !loading) {
        const timeout = setTimeout(() => {
          console.log('loading more content')
          loadMore()
          clearTimeout(timeout)
        }, 150)

        observer.unobserve(entry.target)
      }
    })

    observer.observe(chatbotRef.current)

    return () => {
      observer.disconnect()
    }
  }, [chatbotRef.current, isLast, hasMore, loading, loadMore])

  return (
    <Link
      className={cn(
        'flex items-center px-[20px] py-[12px] dark:hover:bg-mirage hover:bg-gray-300',
        chatbot.chatbotId === activeChatbot.chatbotId &&
          'dark:bg-slate-800 dark-slate-400'
      )}
      href={`/${chatbot.name.toLowerCase()}`}
      key={chatbot.chatbotId}
      ref={chatbotRef}
    >
      <Image
        alt={chatbot.name}
        className="object-cover rounded-full"
        height={30}
        src={chatbot.avatar || '/path/to/default/avatar.png'}
        width={30}
      />
      <span className="pl-3">{chatbot.name}</span>
    </Link>
  )
}
