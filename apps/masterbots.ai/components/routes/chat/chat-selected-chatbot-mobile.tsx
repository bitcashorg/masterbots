import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Bot, MessageSquarePlus } from 'lucide-react'
import Image from 'next/image'

interface SelectedBotMobileViewProps {
  botName: string
  description: string
  avatar: string
  onNewChat: () => void
}

export function SelectedBotMobileView({
  botName,
  description,
  avatar,
  onNewChat
}: SelectedBotMobileViewProps) {
  return (
    <div className="md:hidden h-[calc(100vh-196px)] flex items-center justify-center -translate-y-8">
      <Card className="w-full bg-white dark:bg-[#09090B]">
        <CardHeader>
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between px-4 pt-2">
              <h1 className="text-xl font-bold text-zinc-950 dark:text-gray-300">
                {botName}
              </h1>
            </div>

            <div className="flex items-center px-4">
              <Bot className="mr-2 size-4" />
              <span className="text-sm">bio:</span>
            </div>

            <div className="relative">
              {/* Avatar container positioned absolutely */}
              <div className="absolute z-10 right-4 -top-8">
             <div  
             className={cn(
                  'size-16 rounded-full relative',
                  'bg-zinc-200 dark:bg-black',
                  'ring-4 ring-[#be16e8] dark:ring-[#82e46a]'
                )}
              >
                <Image
                  src={avatar}
                  alt={`${botName} avatar`}
                  height={64}
                  width={64}
                  className="object-cover rounded-full"
                />
                </div>
              </div>

              {/* Separator line */}
              <div className="h-[3px] bg-zinc-200 dark:bg-slate-800" />
            </div>

            <div className="flex items-start justify-between gap-4 p-6">
              <p className="flex-1 text-sm text-zinc-500 dark:text-zinc-500">
                {description}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardFooter className="py-4">
          <Button
            onClick={onNewChat}
            className={cn(
              'max-w-72 mx-auto text-base p-2',
              'bg-[#be16e8] hover:bg-[#be16e8]/90',
              'dark:bg-[#82e46a] dark:hover:bg-[#82e46a]/90',
              'text-white dark:text-zinc-950',
              'flex items-center justify-center gap-2'
            )}
          >
            <MessageSquarePlus className="size-6" />
            New Chat With {botName}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SelectedBotMobileView
