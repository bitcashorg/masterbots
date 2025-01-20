import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { cn, numberShortener, isFollowed } from '@/lib/utils'
import type { ChatbotDetailsProps } from '@/types/types'
import { Bot, BotMessageSquareIcon, Users } from 'lucide-react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

export function OnboardingChatbotDetails({
  botName = 'BuildBot',
  avatar = '',
  description,
  threadCount = 0,
  followersCount = 3200,
  isWelcomeView = true,
  categoryName,
  onNewChat,
  onFollow,
  followers
}: ChatbotDetailsProps) {

   const { data: session } = useSession()
  const followed = isFollowed({followers, userId: session?.user?.id || ''}) 

  return (
    <div className="hidden h-[calc(100vh-196px)] md:flex items-center justify-center -translate-y-8">
      <Card className="w-[600px] bg-white dark:bg-[#09090B] relative">
        <CardHeader className="space-y-6">
          <h1 className="px-4 pt-4 text-2xl font-bold text-zinc-950 dark:text-gray-300">
            {isWelcomeView ? 'Welcome to Masterbots!' : botName}
          </h1>

          <div className="h-[3px] bg-zinc-200 dark:bg-slate-800 relative">
            <div className="absolute right-6 -top-12">
              <div
                className={cn(
                  'size-32 rounded-full relative',
                  'bg-zinc-200 dark:bg-black',
                  'ring-4 ring-[#be16e8] dark:ring-[#82e46a]'
                )}
              >
                <Image
                  src={avatar}
                  alt={`${botName} avatar`}
                  height={128}
                  width={128}
                  className="object-cover rounded-full"
                />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <p className="pt-2.5 max-w-[calc(100%-160px)] text-base text-zinc-500 dark:text-zinc-500 min-h-24">
            {isWelcomeView
              ? 'Here you can create new threads and share them to your network! Navigate with the sidebar and pick any bot of your interest.'
              : description}
          </p>

          {isWelcomeView && (
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-zinc-950 dark:text-gray-300">
                Your Journey Begins Here!
              </h2>
              <p className="text-lg text-zinc-500 dark:text-zinc-500">
                Try and start with: {botName}
              </p>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-zinc-950 dark:text-gray-300" />
              <span className="text-zinc-950 dark:text-gray-300">
                Threads: <span className="text-zinc-500">{numberShortener(threadCount)}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-zinc-950 dark:text-gray-300" />
              <span className="text-zinc-950 dark:text-gray-300">
                Followers:{' '}
                <span className="text-zinc-500">{numberShortener(followersCount)}</span>
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={!session}
              onClick={onFollow}
              className="border-zinc-200 dark:border-zinc-100/50 text-zinc-500"
            >
              {followed ? 'Following' : 'Follow'}
            </Button>
          </div>

          <div className="w-1/2 mx-auto">
            <Button
              onClick={onNewChat}
              className={cn(
                'w-full min-h-[44px] px-4',
                'bg-[#be16e8] hover:bg-[#be16e8]/90',
                'dark:bg-[#82e46a] dark:hover:bg-[#82e46a]/90',
                'text-white dark:text-zinc-950',
                'flex items-center justify-center gap-2'
              )}
            >
              <BotMessageSquareIcon className="size-6 shrink-0" />{' '}
              <span className="text-base truncate whitespace-nowrap">
                New Chat With {botName}
              </span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
