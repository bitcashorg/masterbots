'use client'

import React, { useState } from 'react'
import { Chatbot } from 'mb-genql'
import Image from 'next/image'
import Link from 'next/link'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { IconUpVote, IconDownVote, IconShare, IconChatMessage } from './ui/icons'
import { AnimatePresence } from 'framer-motion'
import { LucideCheck, LucideLoader2, LucideShare, LucideX } from 'lucide-react'
import { generateShortLink } from '@/actions'

export default function BrowseChatbotDetails({
  chatbot
}: {
  chatbot?: Chatbot
}) {

  const [status, setStatus] = useState<
  'default' | 'loading' | 'copied' | 'error'
>('default')

const copyToClipboard = async () => {
  setStatus('loading')
  try {
    const { data, error } = await generateShortLink(
      // window.location.pathname + param
      window.location.pathname

    )
    console.log("result:")
    if (error || !data) throw new Error( 'Unknown error')
    navigator.clipboard.writeText(data.shortLink)
    setStatus('copied')
    setTimeout(() => setStatus('default'), 5000)
  } catch (error) {
    console.error('Failed to copy share link:', error)
    setStatus('error')
    setTimeout(() => setStatus('default'), 5000)
  }
}
const iconsMap = {
  loading: (
    <LucideLoader2 size={26} className="animate-spin stroke-accent-secondary" />
  ),
  copied: <LucideCheck size={26} className="stroke-success" />,
  error: <LucideX size={26} className="stroke-destructive" />,
  default: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.0166 15.4186C17.6362 15.4186 16.4053 16.0764 15.6179 17.093L9.02489 13.4103C9.17938 12.9668 9.26409 12.4884 9.26409 11.995C9.26409 11.4967 9.17938 11.0233 9.01991 10.5748L15.608 6.89701C16.3903 7.9186 17.6262 8.5814 19.0116 8.5814C21.3737 8.5814 23.3023 6.65781 23.3023 4.2907C23.3023 1.92359 21.3787 0 19.0116 0C16.6445 0 14.7209 1.92359 14.7209 4.2907C14.7209 4.78904 14.8056 5.26744 14.9651 5.71096L8.38203 9.3887C7.59964 8.36213 6.36376 7.70432 4.97838 7.70432C2.61625 7.70432 0.687683 9.62791 0.687683 11.995C0.687683 14.3621 2.61625 16.2857 4.98336 16.2857C6.36875 16.2857 7.60463 15.6229 8.392 14.5963L14.98 18.2791C14.8206 18.7276 14.7309 19.211 14.7309 19.7093C14.7309 22.0714 16.6545 24 19.0216 24C21.3887 24 23.3123 22.0764 23.3123 19.7093C23.3123 17.3422 21.3837 15.4186 19.0166 15.4186ZM19.0166 1.3505C20.6412 1.3505 21.9618 2.6711 21.9618 4.29568C21.9618 5.92027 20.6412 7.24086 19.0166 7.24086C17.392 7.24086 16.0714 5.92027 16.0714 4.29568C16.0714 2.6711 17.397 1.3505 19.0166 1.3505ZM4.98336 14.9402C3.35878 14.9402 2.03818 13.6196 2.03818 11.995C2.03818 10.3704 3.35878 9.04983 4.98336 9.04983C6.60795 9.04983 7.92855 10.3704 7.92855 11.995C7.92855 13.6196 6.60297 14.9402 4.98336 14.9402ZM19.0166 22.6495C17.392 22.6495 16.0714 21.3289 16.0714 19.7043C16.0714 18.0797 17.392 16.7591 19.0166 16.7591C20.6412 16.7591 21.9618 18.0797 21.9618 19.7043C21.9618 21.3289 20.6412 22.6495 19.0166 22.6495Z" fill="#FAFAFA"/>
           </svg>
  // default: <LucideShare size={26} className="stroke-accent-secondary" />
}
  return (
    <div className="relative bg-cover py-10 bg-gradient-to-l from-mirage via-[#2B5D91] to-[#388DE2]">
      <div className="flex flex-row gap-3 relative mx-auto md:w-[600px]">
        <a className="flex items-center space-x-1" href="/">
          <svg
            width="11"
            height="12"
            viewBox="0 0 11 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.09973 2.15008L3.24979 6.00003L7.09973 9.84998"
              stroke="#FAFAFA"
              stroke-width="0.962486"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
           <span className="text-['24px'] font-normal">Back to browse</span>
        </a>
      </div>
      <div
        className="dark:bg-[#09090B] bg-white rounded-lg p-6 md:w-[600px]
      flex flex-row gap-3 relative mx-auto font-mono"
      >
        <div className="w-2/3 flex flex-col gap-3">
          <div className="text-2xl font-black">{chatbot?.name}</div>
          <Separator className="dark:bg-mirage bg-gray-300" />
          <div className="text-xl font-semibold">
            {chatbot?.categories[0].category.name}.
          </div>
          <div className="text-base">
            <div className="font-medium">
              {chatbot?.description ? <div>{chatbot?.description}</div> : ''}
            </div>
            <div className="font-light">
              Threads:{' '}
              <span className="text-[#71717A]">
                {chatbot?.threads.length ?? 1}
              </span>
            
            </div>
          </div>
        </div>
        <div className="w-1/3 relative flex items-end">
          <div className="flex flex-col text-xs items-end w-full gap-2">
            <Link
              style={{ wordSpacing: '4px' }}
              className="text-[#388DE2]"
              href={`/${chatbot?.name.toLowerCase()}`}
            >
              Chat with {chatbot?.name} &gt;
            </Link>
            <div className="flex gap-4">
              {/* <IconUpVote className="opacity-60 h-4" />
                <span className="text-[#72C255]">1.2k</span>
              <IconDownVote className="opacity-60 h-4" />
                <span className="text-[#F42F53]">375</span> */}
              {/* <Button
                onClick={copyToClipboard}
                variant="ghost"
                className="px-1"
              >              
                <IconShare className="opacity-60 size-12" />
              </Button> */}
               {/* <span className="text-[#FAFAFA]">17</span>               */}
          </div>
          </div>
        </div>
        <div className="size-24 absolute border-4 border-[#388DE2] right-0 top-0 translate-x-1/4 rounded-full -translate-y-1/4 dark:bg-[#131316] bg-white">
          <Image
            className="size-full transition-opacity duration-300 rounded-full select-none ring-1 ring-zinc-100/10 hover:opacity-80"
            src={chatbot?.avatar || ''}
            alt={chatbot?.avatar ? `Avatar of ${chatbot?.name}` : 'Default Avatar'}
            height={96}
            width={96}
          />
        </div>
        <div className="size-10 absolute right-0 top-20 translate-x-full -translate-y-1/4 dark:[#131316] white">
          <Button
                onClick={copyToClipboard}
                variant="ghost"
                className="px-1"
          >              
            <AnimatePresence>{iconsMap[status]}</AnimatePresence>
          </Button>
        </div>
      </div>
    </div>
  )
}
