import { useSession } from 'next-auth/react'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { getCategory, getThreads } from '@/services/hasura'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { MessageSquare, MessageCircle, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toSlug } from 'mb-lib'

/**
 * Displays detailed information about a chatbot or welcome message in the Masterbots application.
 * It serves as both a welcome screen for new users and a details card for specific chatbots.
 *
 * @features
 * - Displays welcome message or chatbot information
 * - Shows chatbot avatar with customizable border colors for light/dark modes
 * - Presents thread count and follower statistics
 * - Provides quick actions (Follow, New Chat)
 * - Fully responsive design with mobile-first approach
 * - Supports both light and dark themes
 */

export default function ChatChatbotDetails({ page }: { page?: string }) {
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

  const botName = activeChatbot?.name || 'BuildBot'

  return (
    <div className="h-[calc(100vh-196px)] flex items-center justify-center -translate-y-8">
      <div className="dark:bg-[#09090B] bg-white w-[85%] md:w-[600px] rounded-xl text-white relative">
        {/* Card Header */}
        <div className="px-4 pt-4 md:px-6 md:pt-6">
          <div className="text-base font-bold leading-relaxed md:text-2xl text-zinc-950 dark:text-gray-300">
            Welcome to Masterbots!
          </div>
        </div>

        {/* Separator Line - Extended to edges */}
        <div className="h-[3px] bg-zinc-200 dark:bg-slate-800 mt-6 relative">
          {/* Floating Avatar - Responsive sizing */}
          <div className="absolute right-4 -top-10 md:right-6 md:-top-12">
            <div
              className={cn(
                'size-20 md:size-32 rounded-full p-2 md:p-2.5 relative', // Smaller size on mobile
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

        {/* Description with right margin to avoid avatar overlap */}
        <div className="p-2 px-4 mr-2 md:p-3 md:px-6 md:mr-4">
          <p className="pr-24 text-sm font-normal text-justify md:pr-32 md:text-base text-zinc-500 dark:text-zinc-500">
            Here you can create new threads and share them to your network!
            Navigate with the sidebar and pick any bot of your interest.
          </p>
        </div>

        {/* Card Content */}
        <div className="px-4 pb-4 md:px-6 md:pb-6 flex flex-col items-center justify-start gap-1.5">
          <div className="mb-3 text-center md:mb-4">
            <h2 className="text-lg md:text-2xl font-semibold leading-[34.08px] text-zinc-950 dark:text-gray-300">
              Your Journey Begins Here!
            </h2>
            <p className="text-base font-semibold leading-relaxed md:text-lg text-zinc-500 dark:text-zinc-500">
              Try and start with: {botName}
            </p>
          </div>

          <div className="flex flex-col items-center w-full gap-3">
            <div className="flex items-center justify-center gap-4 md:gap-6">
              <div className="flex items-center gap-1">
                <MessageSquare className="w-4 h-4 text-zinc-950 dark:text-gray-300" />
                <span className="text-xs font-normal leading-tight md:text-sm text-zinc-950 dark:text-gray-300">
                  Threads:{' '}
                  <span className="text-zinc-500 dark:text-zinc-500">
                    {activeChatbot
                      ? (activeChatbot?.threads?.length ?? 0)
                      : threadNum}
                  </span>
                </span>
              </div>

              <div className="flex items-center gap-2 md:gap-3">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-zinc-950 dark:text-gray-300" />
                  <span className="text-xs font-normal leading-tight md:text-sm text-zinc-950 dark:text-gray-300">
                    Followers:{' '}
                    <span className="text-zinc-500 dark:text-zinc-500">
                      3.2k
                    </span>
                  </span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs md:text-sm border-zinc-200 dark:border-zinc-100/50 text-zinc-500 dark:text-zinc-500"
                >
                  Follow
                </Button>
              </div>
            </div>

            <Button
              className={cn(
                'w-auto px-4 md:px-6 py-2 text-sm md:text-base',
                'bg-[#be16e8] hover:bg-[#be16e8]/90',
                'dark:bg-[#82e46a] dark:hover:bg-[#82e46a]/90',
                'text-white dark:text-zinc-950',
                'leading-none'
              )}
            >
              <MessageCircle className="mr-2 size-4" />
              New Chat With {botName}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
