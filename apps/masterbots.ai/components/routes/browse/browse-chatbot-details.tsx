'use client'

import { toSlug } from 'mb-lib'
import { nanoid } from '@/lib/utils'
import { useState } from 'react'
import { useModel } from '@/lib/hooks/use-model'
import { useChat } from 'ai/react'
import toast from 'react-hot-toast'
import { UserPersonalityPrompt } from '@/lib/constants/prompts'
import type { BrowseChatbotDetailsProps } from '@/types/types'
import { BrowseChatbotDesktopDetails } from '@/components/routes/browse/browse-chatbot-desktop-details'
import { BrowseChatbotMobileDetails } from '@/components/routes/browse/browse-chatbot-mobile-details'
import { SocialFollowing } from 'mb-genql'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { chatbotFollowOrUnfollow } from '@/services/hasura'

export default function BrowseChatbotDetails({
  chatbot,
  variant = 'default'
}: BrowseChatbotDetailsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [generateType, setGenerateType] = useState<string | undefined>('')
  const [lastMessage, setLastMessage] = useState<string | null>(null)
  const { selectedModel, clientType } = useModel()
  const [followers, setFollowers] = useState<SocialFollowing[]>(chatbot?.followers || []);
  const { data: session } = useSession()
  const router = useRouter();
  const { append } = useChat({
    id: nanoid(),
    body: {
      id: nanoid(),
      model: selectedModel,
      clientType
    },
    onResponse(response) {
      if (response.status === 401) {
        toast.error(response.statusText)
      } else if (!response.ok) {
        toast.error('Failed to process request')
      }
      setIsLoading(false)
    },
    onError(error) {
      toast.error('An error occurred')
      setIsLoading(false)
    },
    async onFinish(message) {
      setLastMessage(message.content)
    }
  })

  if (!chatbot?.categories?.length) {
    return <div>No chatbot data available</div>
  }

  const primaryCategory = chatbot.categories[0].category
  const botUrl = `/c/${toSlug(primaryCategory.name)}/${chatbot.name.toLowerCase()}`
  const isWelcomeView = variant === 'default' && !chatbot.name.includes('Bot')

  const descriptionPoints =
    chatbot.description?.split(';').map(point => point.trim()) || []
  const hasMultiplePoints = descriptionPoints.length > 1

  const generateBio = async () => {
    try {
      setIsLoading(true)
      setGenerateType('bio')
      const promptContent = UserPersonalityPrompt('bio', [])
      return append({
        id: nanoid(),
        content: promptContent,
        role: 'system',
        createdAt: new Date()
      })
    } catch (error) {
      setIsLoading(false)
      toast.error('Failed to generate content')
      console.error('Bio generation failed:', error)
    }
  }


  const onFollow = async () => {
    try {
      if (!session) {
        toast.error('Please sign in to follow chatbot')
        router.push('/auth/signin')
        return
      }
      const followerId = session.user?.id
      const followeeId = chatbot?.chatbotId
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
      setFollowers(followers.filter(follower => !(follower.followerId === followerId && follower.followeeIdChatbot === followeeId)))
      }
    
      toast.success(follow ? `You have followed ${chatbot?.name} successfully` : `You have  unfollowed  ${chatbot?.name}`)
  

    } catch (error) {
      toast.error('Failed to follow user')
      console.error('Failed to follow user:', error)
    }

  }

  const sharedProps = {
    chatbot,
    variant,
    isLoading,
    generateType,
    lastMessage,
    onGenerateBio: generateBio,
    isWelcomeView,
    descriptionPoints,
    hasMultiplePoints,
    botUrl,
    followers,
    onFollow,
  }

  return (
    <>
      <BrowseChatbotDesktopDetails {...sharedProps} />
      <BrowseChatbotMobileDetails {...sharedProps} />
    </>
  )
}
