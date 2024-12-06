import ShareLink from '@/components/routes/thread/thread-share-link'
import { Button } from '@/components/ui/button'
import type { Chatbot } from 'mb-genql'
import { toSlug } from 'mb-lib'
import Image from 'next/image'
import Link from 'next/link'
import {MessageSquare, Users, Bot, MessageSquareHeart, MessageSquarePlus} from 'lucide-react';
import { cn } from '@/lib/utils'

interface BrowseChatbotDetailsProps {
  chatbot?: Chatbot
  variant?: 'default' | 'selected'
}

export default function BrowseChatbotDetails({
  chatbot,
  variant = 'default'
}: BrowseChatbotDetailsProps) {
  if (!chatbot?.categories?.length) {
    return <div>No chatbot data available</div>
  }

  const primaryCategory = chatbot.categories[0].category
  const botUrl = `/c/${toSlug(primaryCategory.name)}/${chatbot.name.toLowerCase()}`
  const isWelcomeView = variant === 'default' && !chatbot.name.includes('Bot')

  const descriptionPoints =
    chatbot.description?.split(';').map(point => point.trim()) || []
  const hasMultiplePoints = descriptionPoints.length > 1

  return (
    <div className="w-full bg-gradient-to-l from-mirage via-[#2B5D91] to-[#388DE2] py-6">
      <div className="max-w-[600px] dark:bg-[#09090B] bg-white rounded-lg gap-3 mx-2 md:mx-auto p-4">
        {/* Header */}
        <Link
          href="/"
          className="items-center hidden gap-2 mb-6 text-zinc-950 dark:text-gray-300 md:flex hover:text-gray-100"
        >
          {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
          <svg
            width="11"
            height="12"
            viewBox="0 0 11 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.09973 2.15008L3.24979 6.00003L7.09973 9.84998"
              stroke="currentColor"
              strokeWidth="0.962486"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Back to browse</span>
        </Link>

        {/* Main Card */}
        <div className="relative text-gray-100 bg-white rounded-lg dark:bg-[#09090B]">
          {/* Header Section - Mobile vs Desktop */}
          <div className="flex flex-col items-start gap-3 mb-4 md:flex-row md:items-center">
            {/* Mobile Header Group */}
            <div className="flex items-start justify-between w-full md:hidden">
              <div className="space-y-2">
                <h1 className="text-xl font-bold text-zinc-950 dark:text-gray-300">{chatbot.name}</h1>
                <div className="flex items-center gap-2">
                  <MessageSquare className="size-4" />
                  <span className="text-zinc-950 dark:text-gray-300">
                    Threads: {chatbot.threads.length}
                  </span>
                </div>
              </div>

              {/* Mobile Avatar */}
              <div className={cn(
                'size-20 rounded-full border-2 overflow-hidden',
                'bg-zinc-200 dark:bg-black',
                'ring-2 ring-[#be16e8] dark:ring-[#82e46a]'
              )}>
                <Image
                  src={chatbot?.avatar || ''}
                  alt={`${chatbot.name} avatar`}
                  width={74}
                  height={74}
                  className="object-cover size-full"
                />
              </div>
            </div>

            {/* Desktop Title and Share */}
            <div className="items-center hidden gap-3 md:flex">
              <h1 className="text-2xl font-bold text-zinc-950 dark:text-gray-300">
                {isWelcomeView ? 'Welcome to Masterbots!' : chatbot.name}
              </h1>
              <ShareLink
                variant={variant === 'selected' ? 'active' : 'default'}
              />
            </div>
          </div>

          {/* Bio Label */}
          <div className="flex items-center mb-2 text-zinc-950 dark:text-gray-400">
            <Bot className="mr-2" />
            bio:
          </div>

          {/* Description Section */}
          <div className="relative pt-4 pb-6 border-t border-gray-800">
            {/* Desktop Avatar */}
            <div className="absolute right-0 hidden md:block -top-12">
            <div className={cn(
                'size-32 rounded-full border-4 overflow-hidden',
                'bg-zinc-200 dark:bg-black',
                'ring-2 ring-[#be16e8] dark:ring-[#82e46a]'
              )}>
                <Image
                  src={chatbot?.avatar || ''}
                  alt={`${chatbot.name} avatar`}
                  width={128}
                  height={128}
                  className="object-cover size-full"
                />
              </div>
            </div>

            {/* Description Content */}
            <div className="md:pr-28">
              {/* Mobile Description */}
              <div className="block space-y-4 md:hidden">
                <p className="text-zinc-500 dark:text-zinc-500">
                  Click generate ✨ to create a Masterbots biography based on
                  your thread history.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MessageSquareHeart className="text-gray-400 size-4" />
                    <span className="text-zinc-500 dark:text-gray-300">Favourite topic:</span>
                  </div>
                  <p className="text-gray-400">
                    Click &apos;generate ✨&apos; and know your most common
                    topic.
                  </p>
                </div>
              </div>

              {/* Desktop Description */}
              <div className="hidden md:block">
                {hasMultiplePoints ? (
                  <>
                    <p className="mb-2 text-zinc-500 dark:text-zinc-500">
                      {descriptionPoints[0]}
                    </p>
                    <ul className="space-y-1 list-none">
                      {descriptionPoints.slice(1).map((point, index) => (
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        <li key={index} className="text-gray-400">
                          • {point}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p className="text-gray-400">{chatbot.description}</p>
                )}
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="mt-6 space-y-4">
            {/* Desktop Layout */}
            <div className="items-center justify-between hidden md:flex">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-zinc-950 dark:text-gray-300">
                  <MessageSquare className="size-4" />
                  <span>
                    Threads:{' '}
                    <span className="text-gray-400">
                      {chatbot.threads.length}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-zinc-950 dark:text-gray-300">
                    <Users className="size-4" />
                    <span>
                      Followers: <span className="text-gray-400">3.2k</span>
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-sm border-zinc-200 dark:border-zinc-100/50 text-zinc-500"
                  >
                    Follow
                  </Button>
                </div>
              </div>

              <Button
                asChild
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-md',
                  'bg-[#be16e8] hover:bg-[#be16e8]/90',
                  'dark:bg-[#82e46a] dark:hover:bg-[#82e46a]/90',
                  'text-white dark:text-zinc-950'
                )}
              >
                <Link href={botUrl}>
                  <MessageSquare className="size-4" />
                  <span>New Chat</span>
                </Link>
              </Button>
            </div>

            {/* Mobile Layout */}
            <div className="flex flex-col items-center gap-4 md:hidden">
              <Button
                asChild
                className={cn(
                  'w-44', // Fixed width for mobile
                  'bg-[#be16e8] hover:bg-[#be16e8]/90',
                  'dark:bg-[#82e46a] dark:hover:bg-[#82e46a]/90',
                  'text-white dark:text-zinc-950',
                  'h-10', // Fixed height
                  'px-4' // Horizontal padding
                )}
              >
                <Link
                  href={botUrl}
                  className="flex items-center justify-center gap-2"
                >
                  <MessageSquarePlus className="size-4" />
                  <span className="text-sm">New Chat</span>
                </Link>
              </Button>

              {/* Stats and Follow */}
              <div className="flex items-center justify-center gap-6">
                <div className="text-center">
                <Users className="mx-auto size-4 text-zinc-950 dark:text-gray-300" />
                  <span className="block text-sm text-zinc-950 dark:text-gray-300">Following</span>
                  <span className='text-gray-400'>313</span>
                </div>
                <div className="text-center">
                <Users className="mx-auto size-4 text-zinc-950 dark:text-gray-300" />
                  <span className="block text-sm text-zinc-950 dark:text-gray-300">Followers</span>
                  <span className='text-gray-400'>3.2k</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-sm text-gray-400 border-gray-800 hover:text-gray-100"
                >
                  Follow
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
