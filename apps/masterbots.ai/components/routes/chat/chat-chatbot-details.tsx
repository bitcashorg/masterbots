import { ChatChatbotDetailsSkeleton } from '@/components/shared/skeletons/chat-chatbot-details-skeleton'
import { Button } from '@/components/ui/button'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { cn } from '@/lib/utils'
import { getCategory, getThreads } from '@/services/hasura'
import { MessageSquarePlus, MessageSquare, Users, Bot } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { cva } from 'class-variance-authority'

const containerVariants = cva(
  'h-[calc(100vh-196px)] flex items-center justify-center -translate-y-8',
  {
    variants: {
      variant: {
        default: '',
        selected: ''
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

interface ChatChatbotDetailsProps {
  page?: string
}

export default function ChatChatbotDetails({ page }: ChatChatbotDetailsProps) {
  const { data: session } = useSession()
  const { activeCategory, activeChatbot } = useSidebar()
  const { randomChatbot } = useThread()
  const [threadNum, setThreadNum] = useState<number>(0)
  const [categoryName, setCategoryName] = useState<string>('')
  const { slug } = useParams()

  const getThreadNum = async () => {
    if (!session?.user) return
    const threads = await getThreads({
      jwt: session?.user?.hasuraJwt as string,
      categoryId: activeCategory,
      userId: session?.user.id as string
    })
    setThreadNum(threads?.length ?? 0)
  }

  const getCategoryName = async () => {
    const category = await getCategory({ categoryId: activeCategory as number })
    setCategoryName(category.name)
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!activeCategory) {
      getThreadNum()
    } else {
      getCategoryName()
    }
  }, [activeCategory, activeChatbot, session?.user])

  if (!session?.user) return <ChatChatbotDetailsSkeleton />

  const botName = activeChatbot?.name || 'BuildBot'
  const isWelcomeView = !activeChatbot?.name
  return (
    <div
      className={containerVariants({
        variant: isWelcomeView ? 'default' : 'selected'
      })}
    >
      <div className="dark:bg-[#09090B] bg-white w-full md:w-[600px] rounded-xl text-white relative">
        {/* Mobile Header - Different for default/selected */}
        <div className="px-4 pt-4 md:px-6 md:pt-6">
          {/* Title Section */}
          <div className="flex flex-col gap-2 md:flex-row">
            <div className="flex items-start justify-between w-full md:items-center">
              <div>
                <h1 className="text-xl font-bold md:text-2xl text-zinc-950 dark:text-gray-300">
                  {isWelcomeView ? 'Welcome to Masterbots!' : botName}
                </h1>
              </div>
              {/* Mobile Avatar */}
              <div className="md:hidden">
                <div
                  className={cn(
                    'size-16 rounded-full relative',
                    'bg-zinc-200 dark:bg-black',
                    'ring-2 ring-[#be16e8] dark:ring-[#82e46a]'
                  )}
                >
                  <Image
                    src={activeChatbot?.avatar || randomChatbot?.avatar || ''}
                    alt={`${botName} avatar`}
                    height={64}
                    width={64}
                    className="object-cover rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Separator & Avatar */}
        <div className="hidden md:block h-[3px] bg-zinc-200 dark:bg-slate-800 mt-6 relative">
          <div className="absolute right-4 -top-10 md:right-6 md:-top-12">
            <div
              className={cn(
                'size-32 rounded-full p-2.5 relative',
                'bg-zinc-200 dark:bg-black',
                'ring-2 ring-[#be16e8] dark:ring-[#82e46a]'
              )}
            >
              <Image
                src={activeChatbot?.avatar || randomChatbot?.avatar || ''}
                alt={`${botName} avatar`}
                height={128}
                width={128}
                className="object-cover rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="p-4 md:px-6">
          <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-500 md:pr-28">
            {isWelcomeView
              ? 'Here you can create new threads and share them to your network! Navigate with the sidebar and pick any bot of your interest.'
              : activeChatbot?.description}
          </p>
        </div>

        {/* Journey Section - Only for Welcome View */}
        {isWelcomeView && (
          <div className="px-4 text-center md:px-6">
            <h2 className="text-lg font-semibold md:text-2xl text-zinc-950 dark:text-gray-300">
              Your Journey Begins Here!
            </h2>
            <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-500">
              Try and start with: {botName}
            </p>
          </div>
        )}

        {/* Footer Section */}
        <div className="p-4 space-y-4 md:p-6">
          {/* Stats Desktop */}
          <div className="items-center justify-center hidden gap-6 md:flex">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-zinc-950 dark:text-gray-300" />
              <span className="text-zinc-950 dark:text-gray-300">
                Threads:{' '}
                <span className="text-zinc-500 dark:text-zinc-500">
                  {activeChatbot
                    ? (activeChatbot?.threads?.length ?? 0)
                    : threadNum}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-zinc-950 dark:text-gray-300" />
              <span className="text-zinc-950 dark:text-gray-300">
                Followers: <span className="text-zinc-500">3.2k</span>
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-zinc-200 dark:border-zinc-100/50 text-zinc-500"
            >
              Follow
            </Button>
          </div>

          {/* Stats Mobile */}
          <div className="md:hidden">
            <div className="h-[3px] bg-zinc-200 dark:bg-slate-800 mt-6 relative" />
            <div className="flex items-center justify-center gap-2 pt-2">
              <Bot className="size-4 text-zinc-950 dark:text-gray-300" />
              <span className="text-zinc-500 dark:text-zinc-500">
                Threads: {activeChatbot?.threads?.length ?? threadNum}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-6 md:hidden">
            <div className="flex items-center gap-2">
              <Users className="size-4" />
              <span className="text-zinc-500 dark:text-zinc-500">
                Followers: 3.2k
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-zinc-200 dark:border-zinc-100/50 text-zinc-500"
            >
              Follow
            </Button>
          </div>

          {/* CTA Button */}
          <Button
            className={cn(
              'w-3/4 md:w-1/2 mx-auto p-0 text-sm md:text-base',
              'bg-[#be16e8] hover:bg-[#be16e8]/90',
              'dark:bg-[#82e46a] dark:hover:bg-[#82e46a]/90',
              'text-white dark:text-zinc-950',
              'flex items-center justify-center gap-2'
            )}
          >
            <MessageSquarePlus className="size-6" />
            New Chat With {botName}
          </Button>
        </div>
      </div>
    </div>
  )
}
