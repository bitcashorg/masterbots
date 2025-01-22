import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { ChatbotDetailsProps } from '@/types/types'
import { ArrowBigLeft, ArrowBigDown, Bot } from 'lucide-react'
import Image from 'next/image'

export function OnboardingChatbotDetails({
  botName,
  avatar = '',
  description,
  isWelcomeView = true,
  onNewChat
}: ChatbotDetailsProps) {
  return (
    // <div className="hidden md:block w-full relative bg-left-bottom bg-[url('/hero-bg.png')] bg-no-repeat py-6">
    //   <div className="absolute inset-0 z-0 bg-gradient-to-l from-mirage via-[#6A0D826E]/80 to-[#9412B5BF] dark:via-[#66B252BF]/80 dark:to-[#83E56A6B]/80" />
      <div className="hidden h-[calc(100vh-196px)] md:flex items-center justify-center -translate-y-8 relative">
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
                <h2 className="flex items-center text-2xl font-semibold text-[#be16e8] dark:text-[#82e46a]">
                  <ArrowBigLeft className="mr-2 size-6 fill-[#be16e8] dark:fill-[#82e46a]" />
                  Go To Sidebar And Select One Bot
                </h2>
              </div>
            )}
          </CardContent>

          {!isWelcomeView && (
            <CardFooter className="flex flex-col space-y-4">
              <div className="w-1/2 mx-auto">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <h2 className="flex items-center text-2xl font-semibold text-[#be16e8] dark:text-[#82e46a]">
                    <ArrowBigDown className="mr-2 size-6 fill-[#be16e8] dark:fill-[#82e46a]" />
                    Start Chatting Below
                  </h2>
                </div>
              </div>
            </CardFooter>
          )}
        </Card>
      </div>
  )
}
