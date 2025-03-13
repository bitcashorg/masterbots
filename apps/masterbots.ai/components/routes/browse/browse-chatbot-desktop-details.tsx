import ShareLink from '@/components/routes/thread/thread-share-link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { cn, isFollowed, numberShortener } from '@/lib/utils'
import type { BrowseChatbotLayoutProps } from '@/types/types'
import { Bot, ChevronLeft, MessageSquareIcon, MessageSquarePlusIcon, Users } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

export function BrowseChatbotDesktopDetails({
  chatbot,
  variant,
  isWelcomeView,
  descriptionPoints,
  hasMultiplePoints,
  botUrl,
  followers,
  onFollow
}: BrowseChatbotLayoutProps) {

  const { data: session } = useSession()
  const followed = isFollowed({followers, userId: session?.user?.id || ''}) 

  return (
    <div className="hidden md:block w-full relative bg-left-bottom bg-[url('/hero-bg.png')] bg-no-repeat py-6">
      <div className="absolute inset-0 z-0 bg-gradient-to-l from-mirage via-[#6A0D826E]/80 to-[#9412B5BF] dark:via-[#66B252BF]/80 dark:to-[#83E56A6B]/80" />
      <div className="relative z-10">
        <div className="max-w-[600px] mx-auto mb-4">
          <Link
            href="/"
            rel="canonical"
            className="flex items-center leading-none gap-2 text-white/80 dark:text-[#09090BC3] hover:text-white dark:hover:text-[#09090B]"
          >
            <ChevronLeft className="size-4" />
            <span>Back to browse</span>
          </Link>
        </div>
        <Card className="relative max-w-[600px] dark:bg-[#09090B] bg-white mx-auto">
          <CardHeader>
            <div className="flex items-center gap-3">
              <h1 className="p-4 text-2xl font-bold text-zinc-950 dark:text-gray-300">
                {isWelcomeView ? 'Welcome to Masterbots!' : chatbot.name}
              </h1>
              <ShareLink
                variant={variant === 'selected' ? 'active' : 'default'}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex items-center text-zinc-950 dark:text-gray-400" />
            <div className="flex items-center p-4">
              <Bot className="size-4" />
              <span className='px-1'>bio:</span>
            </div>

            <div className="relative p-4 border-t-[3px] border-zinc-200 dark:border-gray-800">
              <div className="absolute right-0 flex flex-col items-center gap-4 px-4 -top-12">
                <div
                  className={cn(
                    'size-32 rounded-full overflow-hidden p-0 m-0',
                    'bg-iron dark:bg-mirage',
                    'ring-4 ring-[#be16e8] dark:ring-[#82e46a]'
                  )}
                >
                  <Image
                    src={chatbot?.avatar || ''}
                    alt={`${chatbot.name} avatar`}
                    className="object-cover !relative w-full h-full"
                    fill
                  />
                </div>

                <Button
                  asChild
                  className={cn(
                    'w-full flex items-center gap-2 px-4 py-2 rounded-md mt-4',
                    'bg-[#be16e8] hover:bg-[#be16e8]/90',
                    'dark:bg-[#82e46a] dark:hover:bg-[#82e46a]/90',
                    'text-white dark:text-zinc-950'
                  )}
                >
                  <Link href={botUrl} rel="canonical" className="flex items-center gap-2">
                    <MessageSquarePlusIcon className="size-4" />
                    <span>New Chat</span>
                  </Link>
                </Button>
              </div>

              <div className="max-w-[calc(100%-200px)]">
                {hasMultiplePoints ? (
                  <>
                    <p className="mb-2 text-zinc-500 dark:text-zinc-500">
                      {descriptionPoints[0]}
                    </p>
                    <ul className="space-y-1 list-none">
                      {descriptionPoints.slice(1).map((point, index) => (
                        <li
                          key={`point-${
                            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                            index
                            }`}
                          className="text-gray-400"
                        >
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
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <div className="flex items-center w-full">
              <div className="flex items-center gap-2 text-zinc-950 dark:text-gray-300">
                <MessageSquareIcon className="size-4" />
                <span>
                  Threads:{' '}
                  <span className="text-gray-400">
                    {numberShortener(chatbot.threads.length)}
                  </span>
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-zinc-950 dark:text-gray-300">
                  <Users className="size-4" />
                  <span>
                    Followers: <span className="text-gray-400">
                      {numberShortener(followers?.length || 0)}
                    </span>
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    'h-[21px] px-3 py-0.5 rounded-md shadow',
                    'border border-zinc-100/50',
                    'font-normal text-zinc-500 text-sm',
                    'flex justify-center items-center gap-1'
                  )}
                  onClick={onFollow}
                >
                  {followed ? 'Following' : 'Follow'}
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
