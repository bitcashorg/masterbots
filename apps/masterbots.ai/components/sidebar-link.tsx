'use client'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { cn } from '@/lib/utils'
import { getChatbots } from '@/services/hasura'
import { motion } from 'framer-motion'
import { Category, Chatbot, ChatbotCategory } from 'mb-genql'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'
import { IconCaretRight } from './ui/icons'
import { toSlug } from 'mb-lib'

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
        c => c.chatbot.name.toLowerCase().trim() === chatbot?.trim()
      ).length
    ) {
      setActiveChatbot(
        _prev =>
          category.chatbots.filter(
            c => c.chatbot.name.toLowerCase().trim() === chatbot?.trim()
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
          href="/c/p"
          className={cn(
            'flex items-center pr-5 py-3 cursor-pointer relative origin-left transition-all ease-in-out duration-300',
            isChatbotOfThisCategory ? 'text-xs opacity-50' : 'grow pl-5'
          )}
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
          ml-5 flex-col border-l-DEFAULT dark:border-mirage border-gray-300"
          initial={{ height: 0 }}
          animate={{
            height:
              activeCategory === category.categoryId &&
              category.chatbots.length &&
              !isChatbotOfThisCategory
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
              activeChatbot={
                activeCategory === category.categoryId &&
                isChatbotOfThisCategory
                  ? activeChatbot
                  : null
              }
              category={category}
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
  activeChatbot,
  category
}: {
  chatbot: Chatbot
  loadMore: () => void
  loading: boolean
  isLast: boolean
  hasMore: boolean
  activeChatbot: Chatbot | null
  category: Category
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
      // TODO: update expertise parameter
      href={`/c/p/${toSlug(category.name)}/expertise/${chatbot.name.toLowerCase()}`}
      className={cn(
        'flex items-center px-[20px] py-[12px] dark:hover:bg-mirage hover:bg-gray-300',
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
