import { OnboardingMobileView } from '@/components/routes/chat/chat-onboarding-chatbot-mobile'
import { SelectedBotMobileView } from '@/components/routes/chat/chat-selected-chatbot-mobile'
import { OnboardingChatbotDetails } from '@/components/routes/chat/onboarding-chatbot-details'
import { ChatChatbotDetailsSkeleton } from '@/components/shared/skeletons/chat-chatbot-details-skeleton'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useSonner } from '@/lib/hooks/useSonner'
import { chatbotFollowOrUnfollow } from '@/services/hasura'
import type { SocialFollowing } from 'mb-genql'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function ChatChatbotDetails() {
  const { data: session } = useSession()
  const { activeChatbot } = useSidebar()
  const [isFollowLoading, setIsFollowLoading] = useState<boolean>(false)
  const [followers, setFollowers] = useState<SocialFollowing[]>(activeChatbot?.followers || []);
  const router = useRouter();
  const { customSonner } = useSonner()

  const handleFollow = async () => {
    try {
      if (!session) {
        customSonner({ type: 'error', text: 'Please sign in to follow user' })
        router.push('/auth/signin')
        return
      }

      setIsFollowLoading(true)
      const followerId = session.user?.id
      const followeeId = activeChatbot?.chatbotId
      if (!followerId) {
        customSonner({ type: 'error', text: 'Invalid user data' })
        return;
      }

      if (!followeeId) {
        customSonner({ type: 'error', text: 'Invalid chatbot data, please select a chatbot' })
        return;
      }
      const { success, error, follow } = await chatbotFollowOrUnfollow({ followerId, followeeId, jwt: session.user.hasuraJwt as string })
      if (!success) {
        console.error('Failed to follow/Unfolow bot:', error)
        customSonner({ type: 'error', text: error || 'Failed to follow/unfollow bot' })
        return
      }
      if (follow) {
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
      } else {
        setFollowers(followers.filter(follower => !(follower.followerId === followerId && follower.followeeIdChatbot === followeeId)))
      }

      customSonner({ type: 'success', text: follow ? `You have followed ${activeChatbot?.name} successfully` : `You have  unfollowed  ${activeChatbot?.name}` })
    } catch (error) {
      setIsFollowLoading(false)
      customSonner({ type: 'error', text: 'Failed to follow user' })
      console.error('Failed to follow user:', error)
    } finally {
      setIsFollowLoading(false)
    }
  }

  if (!session?.user) return <ChatChatbotDetailsSkeleton />

  const isWelcomeView = !activeChatbot?.name

  // Event handlers
  const handleNewChat = () => {
    // new chat logic
    console.log('Starting new chat with:', activeChatbot?.name)
  }

  const sharedProps = {
    isWelcomeView,
    followers,
    onNewChat: handleNewChat,
    onFollow: handleFollow,
  }

  return (
    <>
      <OnboardingChatbotDetails {...sharedProps} />
      {isWelcomeView ? (
        <OnboardingMobileView />
      ) : (
        <SelectedBotMobileView onNewChat={handleNewChat} />
      )}{' '}
    </>
  )
}
