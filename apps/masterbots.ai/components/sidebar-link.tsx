'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Category, Chatbot, ChatbotCategory } from 'mb-genql'
import { useParams } from 'next/navigation'
import { IconCaretRight } from './ui/icons'
import { motion } from 'framer-motion'
import { categoryAvatars } from '@/lib/categoris-avatars'
import { getChatbots } from '@/services/hasura'
import { useSidebar } from '@/lib/hooks/use-sidebar'

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
  const { activeCategory, setActiveCategory } = useSidebar()

  const [activeChatbot, setActiveChatbot] = React.useState<Chatbot | null>(null)

  const [loading, setLoading] = React.useState<boolean>(false)
  const [chatbots, setChatbots] = React.useState<Chatbot[]>(
    convertChatbotCategory(category.chatbots)
  )
  const [count, setCount] = React.useState<number>(category.chatbots.length)

  React.useEffect(() => {
    if (
      category.chatbots.length &&
      category.chatbots.filter(
        c => c.chatbot.name.toLowerCase().trim() === chatbot?.trim()
      ).length
    ) {
      setActiveChatbot(
        category.chatbots.filter(
          c => c.chatbot.name.toLowerCase().trim() === chatbot?.trim()
        )[0].chatbot
      )
    } else {
      setActiveChatbot(null)
    }
  }, [category, chatbot, threadId])

  const handleClickCategory = () => {
    if (!activeChatbot) {
      if (activeCategory === category.categoryId) setActiveCategory(null)
      else setActiveCategory(category.categoryId)
    }
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

  return (
    <div
      className={`flex flex-col ${activeCategory === category.categoryId && !activeChatbot ? 'border-b-[1px] border-[#1E293B]' : ''}`}
    >
      <div
        className={cn(
          'flex',
          activeCategory === category.categoryId &&
            !activeChatbot &&
            'bg-[#1E293B]',
          activeChatbot && 'justify-center'
        )}
      >
        <Link
          href="/"
          className={cn(
            'flex items-center pr-5 py-3 cursor-pointer relative origin-left transition-all ease-in-out duration-300',
            activeChatbot ? 'text-xs opacity-50' : 'grow pl-5'
          )}
          onClick={handleClickCategory}
        >
          <motion.div
            className="overflow-hidden"
            animate={{
              width: activeChatbot ? '0' : 'auto'
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
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
          </motion.div>
          <span className="pl-3">{category.name}</span>
          <IconCaretRight
            className={`transition duration-300 ease-in-out
          absolute
          stroke-[#09090b] dark:stroke-[#FAFAFA] ${activeCategory === category.categoryId && !activeChatbot ? 'rotate-90 right-5 xl:right-5 lg:right-2' : activeChatbot ? 'rotate-180 right-0 scale-75' : 'right-5 xl:right-5 lg:right-2'}`}
          />
        </Link>
        {activeChatbot ? (
          <div className="flex items-center pl-2 py-3">
            <Image
              src={activeChatbot.avatar || '/path/to/default/avatar.png'}
              alt={category.name}
              width={32}
              height={32}
              className="object-cover rounded-full"
            />
            <span className="pl-3">{activeChatbot.name}</span>
          </div>
        ) : (
          ''
        )}
      </div>
      {
        <motion.div
          className="overflow-hidden
          ml-5 flex-col border-l-[1px] border-[#1E293B]"
          initial={{ height: 0 }}
          animate={{
            height:
              activeCategory === category.categoryId &&
              category.chatbots.length &&
              !activeChatbot
                ? ''
                : '0px'
          }}
        >
          {chatbots.map((chatbot, key) => (
            <ChatbotComponent
              loadMore={loadMore}
              loading={loading}
              hasMore={count === PAGE_SIZE}
              isLast={key === chatbots.length - 1}
              chatbot={chatbot}
              key={chatbot.chatbotId}
              activeChatbot={activeChatbot}
            />
          ))}
        </motion.div>
      }
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
      ref={chatbotRef}
      href={`/${chatbot.name.toLowerCase()}`}
      className={cn(
        'flex items-center px-[20px] py-[12px]',
        chatbot.chatbotId === activeChatbot?.chatbotId &&
          'dark:bg-slate-800 dark-slate-400'
      )}
      key={chatbot.chatbotId}
    >
      <Image
        src={chatbot.avatar || '/path/to/default/avatar.png'}
        alt={chatbot.name}
        width={30}
        height={30}
        className="object-cover rounded-full"
      />
      <span className="pl-3">{chatbot.name}</span>
    </Link>
  )
}
