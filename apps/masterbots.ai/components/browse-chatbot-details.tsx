import React from 'react'
import { Chatbot } from 'mb-genql'
import Image from 'next/image'
import Link from 'next/link'
import { Separator } from './ui/separator'
import ShareLink from './thread-user-actions'

export default function BrowseChatbotDetails({
  chatbot
}: {
  chatbot?: Chatbot
}) {
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
              strokeWidth="0.962486"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>{' '}
          <span className="text-['24px'] font-normal">Back to browse</span>
        </a>
      </div>
      <div
        className="dark:bg-[#09090B] bg-white rounded-lg p-6 md:w-[600px]
      flex flex-row gap-3 relative mx-auto font-mono"
      >
        <div className="flex flex-col w-2/3 gap-3">
          <div className="text-2xl font-black">{chatbot?.name}</div>
          <Separator className="bg-gray-300 dark:bg-mirage" />
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
        <div className="relative flex items-end w-1/3">
          <div className="flex flex-col items-end w-full gap-2 text-xs">
            <Link
              style={{ wordSpacing: '4px' }}
              className="text-[#388DE2]"
              href={`/b/${chatbot?.name.toLowerCase()}`}
            >
              Chat with {chatbot?.name} &gt;
            </Link>
            <div className="flex gap-4">
              {/* <IconUpVote className="h-4 opacity-60" />
                <span className="text-[#72C255]">1.2k</span>
              <IconDownVote className="h-4 opacity-60" />
                <span className="text-[#F42F53]">375</span> */}
              {/* <span className="text-[#FAFAFA]">17</span>               */}
            </div>
          </div>
        </div>
        <div className="size-24 absolute border-4 border-[#388DE2] right-0 top-0 translate-x-1/4 rounded-full -translate-y-1/4 dark:bg-[#131316] bg-white">
          <Image
            className="transition-opacity duration-300 rounded-full select-none size-full ring-1 ring-zinc-100/10 hover:opacity-80"
            src={chatbot?.avatar || ''}
            alt={chatbot?.avatar ? `Avatar of ${chatbot?.name}` : 'Default Avatar'}
            height={96}
            width={96}
          />
        </div>
        <ShareLink />
      </div>
    </div>
  )
}
