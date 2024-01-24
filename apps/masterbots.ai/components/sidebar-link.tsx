'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Chatbot } from 'mb-genql'
import { useParams } from 'next/navigation'
import { IconCaretRight } from './ui/icons'
import { motion } from "framer-motion"

export default function SidebarLink({ bot }: { bot: Chatbot }) {
  const { chatbot, threadId } = useParams<{ chatbot: string, threadId?: string }>()
  const [isCollapsed, setIsCollapsed] = React.useState(false)
  const [activeThreadId, setActiveThreadId] = React.useState<number | null>(null)

  const threads = [
    { id: 1, name: 'healthBot1', avatar: 'https://robohash.org/JHS.png?set=set4' },
    { id: 2, name: 'healthBot2', avatar: 'https://robohash.org/JHS.png?set=set4' },
    { id: 3, name: 'healthBot3', avatar: 'https://robohash.org/JHS.png?set=set4' }
  ]

  React.useEffect(() => {
    setIsCollapsed(false)
    if (chatbot !== bot.name.toLowerCase()) {
      setActiveThreadId(null)
    } else {
      setActiveThreadId(Number(threadId))
    }
  } , [bot, chatbot, threadId])

  const handleClickMainBot = () => {
    if (activeThreadId) {
      setActiveThreadId(null)
    } else if (chatbot === bot.name.toLowerCase()) {
      setIsCollapsed(!isCollapsed) 
    }
  }

  return (
    <div className={`flex flex-col ${isCollapsed ? 'border-b-[1px] border-[#1E293B]' : ''}`}>
      <div className={cn('flex', bot?.name.toLowerCase().trim() === chatbot?.trim() && 'bg-[#1E293B]', activeThreadId && 'justify-center')}>
        <Link
          href={`/${bot.name.toLowerCase()}`}
          className={cn(
            'flex items-center pr-5 py-3 cursor-pointer relative origin-left transition-all ease-in-out duration-300',
            activeThreadId ? 'text-xs opacity-50' : 'grow'
          )}
          onClick={handleClickMainBot}
          shallow={true}
        >
          <motion.div
          className='overflow-hidden'
          animate={{
            width: activeThreadId ? '0' : 'auto',
          }}
          >
            <Image
              src={bot.avatar || '/path/to/default/avatar.png'}
              alt={bot.name}
              width={50} // replace with your desired width
              height={50} // replace with your desired height
              className="object-cover rounded-full"
            />
          </motion.div>
          <span className="pl-3">{bot.name}</span>
          <IconCaretRight className={`transition duration-300 ease-in-out
          absolute
          stroke-[#09090b] dark:stroke-[#FAFAFA] ${isCollapsed ? 'rotate-90 right-5' : activeThreadId ? 'rotate-180 right-0 scale-75' : 'right-5'}`} />
        </Link>
        { activeThreadId ? <div
          className='flex items-center pl-2 py-3'
        >
          <Image
            src={threads.filter(i => i.id === activeThreadId)[0].avatar || '/path/to/default/avatar.png'}
            alt={bot.name}
            width={32}
            height={32}
            className="object-cover rounded-full"
          />
          <span className="pl-3">{threads.filter(i => i.id === activeThreadId)[0].name}</span>
        </div> : '' }
      </div>
      {
        <motion.div
          className='overflow-hidden
          ml-5 flex-col border-l-[1px] border-[#1E293B]'
          initial={{height: 0}}
          animate={{
            height: isCollapsed && threads?.length ? "" : "0px",
          }}
        >
          {
            threads?.length && threads.map((thread) => 
              // <Link href={`/${bot.name.toLowerCase()}/${thread?.id}`} className={cn(
              <div
              onClick={() => { setActiveThreadId(thread.id); setIsCollapsed(false) }}
              className={cn(
                'flex items-center px-[20px] py-[12px]',
                ( thread?.id === activeThreadId ) && 'dark:bg-slate-800 dark-slate-400'
              )} key={thread.id}>
                <Image
                  src={thread.avatar}
                  alt={thread.name}
                  width={30}
                  height={30}
                  className="object-cover rounded-full"
                />
                <span className="pl-3">{thread.name}</span>
              </div>
              // </Link>
            )
          }
        </motion.div>
      }
    </div>
  )
}
