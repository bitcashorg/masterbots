import { ChatChatbotDetailsSkeleton } from '@/components/shared/skeletons/chat-chatbot-details-skeleton'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { cn, Ifollowed, formatNumber} from '@/lib/utils'
import { getCategory, getThreads, chatbotFollowOrUnfollow } from '@/services/hasura'
import { MessageCircle, MessageSquare, Users, Loader } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import router from 'next/router'
import type { SocialFollowing } from 'mb-genql'
import { OnboardingChatbotDetails } from '@/components/routes/chat/onboarding-chatbot-details'
import { OnboardingMobileChatbotDetails } from '@/components/routes/chat/onboarding-chatbot-mobile-details'

export default function ChatChatbotDetails() {
  const { data: session } = useSession()
  const { activeCategory, activeChatbot } = useSidebar()
  const { randomChatbot } = useThread()
  const { slug } = useParams()
  const [isFollowLoading, setIsFollowLoading] = useState<boolean>(false)
  const [followers, setFollowers] = useState<SocialFollowing[]>(activeChatbot?.followers || []);

  const [threadNum, setThreadNum] = useState<number>(0)
  const [categoryName, setCategoryName] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)


  const handleFollow = async () => {
   try {
    if (!session) {
      toast.error('Please sign in to follow user')
      router.push('/auth/signin')
      return
    }

    setIsFollowLoading(true)
    const followerId = session.user?.id
    const followeeId = activeChatbot?.chatbotId
    if (!followerId) {
      toast.error('Invalid user data');
      return;
     }

    if (!followeeId) {
      toast.error('Invalid chatbot data, please select a chatbot');
      return;
      }
    const {success, error, follow} =  await chatbotFollowOrUnfollow({followerId, followeeId, jwt: session.user.hasuraJwt as string})
    if(!success){
      console.error('Failed to follow/Unfolow bot:', error)
      toast.error(error || 'Failed to follow/unfollow bot')
      return
    }
    if(follow){
      setFollowers([
        ...followers,
        {
            followerId: followerId,
            followeeId: null,
            followeeIdChatbot: followeeId,
            chatbot: null,
            createdAt: new Date().toISOString(),
            userByFollowerId: null as unknown, 
            user: null,
            __typename: 'SocialFollowing'
        } as SocialFollowing  
    ]);
   }else{
      setFollowers(followers.filter(follower => follower.followerId !== followerId))
    }
  
    toast.success(follow ? `You have followed ${activeChatbot?.name} successfully` : `You have  unfollowed  ${activeChatbot?.name}`)

   }  catch (error) {
    setIsFollowLoading(false)
    toast.error('Failed to follow user')
    console.error('Failed to follow user:', error)
  } finally {
    setIsFollowLoading(false)
  }
  }
  const getThreadNum = async () => {
    if (!session?.user) return
    try {
      const threads = await getThreads({
        jwt: session?.user?.hasuraJwt as string,
        categoryId: activeCategory,
        userId: session?.user.id as string
      })
      setThreadNum(threads?.length ?? 0)
    } catch (error) {
      console.error('Error fetching threads:', error)
    }
  }

  const getCategoryName = async () => {
    try {
      const category = await getCategory({
        categoryId: activeCategory as number
      })
      setCategoryName(category.name)
    } catch (error) {
      console.error('Error fetching category:', error)
    }
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        if (!activeCategory) {
          await getThreadNum()
        } else {
          await getCategoryName()
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [activeCategory, activeChatbot, session?.user])

  if (isLoading || !session?.user) return <ChatChatbotDetailsSkeleton />

  const botName = activeChatbot?.name || 'BuildBot'
  const isWelcomeView = !activeChatbot?.name

  // Event handlers
  const handleNewChat = () => {
    // new chat logic
    console.log('Starting new chat with:', botName)
  }


  const sharedProps = {
    botName,
    avatar: activeChatbot?.avatar || randomChatbot?.avatar || '',
    description: activeChatbot?.description,
    threadCount: activeChatbot
      ? (activeChatbot?.threads?.length ?? 0)
      : threadNum,
    followersCount: followers.length || 0, // This nees to be changed once following feat is ready
    isWelcomeView,
    categoryName,
    onNewChat: handleNewChat,
    onFollow: handleFollow
  }

  // const followed = Ifollowed({followers, userId: session?.user?.id || ''}) 


  return (
    <>
      <OnboardingChatbotDetails {...sharedProps} />
      <OnboardingMobileChatbotDetails {...sharedProps} />
    </>
  )
}
