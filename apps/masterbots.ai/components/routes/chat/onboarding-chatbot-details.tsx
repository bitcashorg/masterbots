import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { ChatbotDetailsProps } from '@/types/types'
import { PanelLeft, MessageSquarePlus, Bot } from 'lucide-react'
import Image from 'next/image'

export function OnboardingChatbotDetails({
  botName,
  avatar = '',
  description,
  isWelcomeView = true,
  onNewChat
}: ChatbotDetailsProps) {
  return (
    <div className="hidden h-[calc(100vh-196px)] md:flex items-center justify-center -translate-y-8 relative">
      {/* Background tooltip effect */}

      {isWelcomeView && (
        <div
          className="absolute left-0 w-[50rem] h-[calc(100vh-400px)] bg-gradient-to-br from-[#be16e8]/10 to-[#82e46a]/5 dark:from-[#82e46a]/10 dark:to-[#be16e8]/5 backdrop-blur-md shadow-lg transition-all duration-300 rounded-r-[50%] z-0"
          style={{
            clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 20% 100%, 0 50%)',
            borderRadius: '0.5rem'
          }}
        />
      )}

      <Card className="w-[600px] bg-white dark:bg-[#09090B] relative z-10">
        <CardHeader className="space-y-6">
          <h1 className="px-4 pt-4 text-2xl font-bold text-zinc-950 dark:text-gray-300">
            {isWelcomeView ? 'Welcome to Masterbots!' : botName}
          </h1>
          {!isWelcomeView && (
            <div className="flex items-center px-4">
              <Bot className="mr-2 size-4" />
              <span className="text-sm">bio:</span>
            </div>
          )}
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
            <div className="flex flex-col items-center justify-center space-y-4">
              <h2 className="text-2xl font-semibold text-zinc-950 dark:text-gray-300">
                Pick a Bot and Start Chatting
              </h2>
              <div className="flex items-center m-auto space-x-4">
                <PanelLeft className="size-6 text-[#be16e8] dark:text-[#82e46a]" />
                <p className="text-base text-[#be16e8] dark:text-[#82e46a]">
                  Find Your Favorite Bot in the Sidebar
                </p>
              </div>
            </div>
          )}
        </CardContent>

        {!isWelcomeView && (
          <CardFooter className="flex flex-col space-y-4">
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
                <MessageSquarePlus className="size-6 shrink-0" />
                <span className="text-base truncate whitespace-nowrap">
                  Chat With {botName} Now
                </span>
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
