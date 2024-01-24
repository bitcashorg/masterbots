'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Category, Chatbot } from 'mb-genql'
import { useParams } from 'next/navigation'
import { IconCaretRight } from './ui/icons'
import { motion } from "framer-motion"
import { categoryAvatars } from '@/lib/categoris-avatars'

export default function SidebarLink({ category }: { category: Category }) {
  const { chatbot, threadId } = useParams<{ chatbot: string, threadId?: string }>()
  const [isCollapsed, setIsCollapsed] = React.useState(false)
  const [activeChatbot, setActiveChatbot] = React.useState<Chatbot | null>(null)

  React.useEffect(() => {
    setIsCollapsed(false)
    if (category.chatbots.length && category.chatbots.filter(c => c.chatbot.name.toLowerCase().trim() === chatbot?.trim()).length) {
      setActiveChatbot(category.chatbots.filter(c => c.chatbot.name.toLowerCase().trim() === chatbot?.trim())[0].chatbot)
    } else {
      setActiveChatbot(null)
    }
  } , [category, chatbot, threadId])

  const handleClickCategory = () => {
    if (!activeChatbot) {
      setIsCollapsed(!isCollapsed) 
    }
  }
  return (
    <div className={`flex flex-col ${isCollapsed ? 'border-b-[1px] border-[#1E293B]' : ''}`}>
      <div className={cn('flex', isCollapsed && 'bg-[#1E293B]', activeChatbot && 'justify-center')}>
        <Link
          href='/'
          className={cn(
            'flex items-center pr-5 py-3 cursor-pointer relative origin-left transition-all ease-in-out duration-300',
            activeChatbot ? 'text-xs opacity-50' : 'grow pl-5'
          )}
          onClick={handleClickCategory}
        >
          <motion.div
          className='overflow-hidden'
          animate={{
            width: activeChatbot ? '0' : 'auto',
          }}
          >
           {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={categoryAvatars.get(category.name) || '/path/to/default/avatar.png'}
              alt={category.name}
              width={50} // replace with your desired width
              height={50} // replace with your desired height
              className="object-cover rounded-full"
            />
          </motion.div>
          <span className="pl-3">{category.name}</span>
          <IconCaretRight className={`transition duration-300 ease-in-out
          absolute
          stroke-[#09090b] dark:stroke-[#FAFAFA] ${isCollapsed ? 'rotate-90 right-5 xl:right-5 lg:right-2' : activeChatbot ? 'rotate-180 right-0 scale-75' : 'right-5 xl:right-5 lg:right-2'}`} />
        </Link>
        { activeChatbot ? <div
          className='flex items-center pl-2 py-3'
        >
          <Image
            src={activeChatbot.avatar || '/path/to/default/avatar.png'}
            alt={category.name}
            width={32}
            height={32}
            className="object-cover rounded-full"
          />
          <span className="pl-3">{activeChatbot.name}</span>
        </div> : '' }
      </div>
      {
        <motion.div
          className='overflow-hidden
          ml-5 flex-col border-l-[1px] border-[#1E293B]'
          initial={{height: 0}}
          animate={{
            height: isCollapsed && category.chatbots.length ? "" : "0px",
          }}
        >
          {
            category.chatbots.map((chatbot) => 
            <Link href={`/${chatbot.chatbot.name.toLowerCase()}`}
              className={cn(
                'flex items-center px-[20px] py-[12px]',
                chatbot.chatbot.chatbotId === activeChatbot?.chatbotId && 'dark:bg-slate-800 dark-slate-400'
              )} key={chatbot.chatbotId}>
                <Image
                  src={chatbot.chatbot.avatar || '/path/to/default/avatar.png'}
                  alt={chatbot.chatbot.name}
                  width={30}
                  height={30}
                  className="object-cover rounded-full"
                />
                <span className="pl-3">{chatbot.chatbot.name}</span>
              </Link>
            )
          }
        </motion.div>
      }
    </div>
  )
}
