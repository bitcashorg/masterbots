'use client'

import { BrowseChatbotDesktopDetails } from '@/components/routes/browse/browse-chatbot-desktop-details'
import { BrowseChatbotMobileDetails } from '@/components/routes/browse/browse-chatbot-mobile-details'
import { userPersonalityPrompt } from '@/lib/constants/prompts'
import { useModel } from '@/lib/hooks/use-model'
import { useSonner } from '@/lib/hooks/useSonner'
import { getCanonicalDomain, urlBuilders } from '@/lib/url'
import { nanoid } from '@/lib/utils'
import { chatbotFollowOrUnfollow } from '@/services/hasura'
import type { BrowseChatbotDetailsProps } from '@/types/types'
import { useChat } from '@ai-sdk/react'
import type { SocialFollowing } from 'mb-genql'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function BrowseChatbotDetails({
	chatbot,
	variant = 'default',
}: BrowseChatbotDetailsProps) {
	const [isLoading, setIsLoading] = useState(false)
	const [generateType, setGenerateType] = useState<string | undefined>('')
	const [lastMessage, setLastMessage] = useState<string | null>(null)
	const { selectedModel, clientType } = useModel()
	const [followers, setFollowers] = useState<SocialFollowing[]>(
		chatbot?.followers || [],
	)
	const { data: session } = useSession()
	const router = useRouter()
	const { customSonner } = useSonner()

	const { append } = useChat({
		id: nanoid(),
		body: {
			id: nanoid(),
			model: selectedModel,
			clientType,
		},
		onResponse(response) {
			if (response.status === 401) {
				customSonner({ type: 'error', text: response.statusText })
			} else if (!response.ok) {
				customSonner({ type: 'error', text: 'Failed to process request' })
			}
			setIsLoading(false)
		},
		onError(error) {
			customSonner({ type: 'error', text: 'An error occurred' })
			setIsLoading(false)
		},
		async onFinish(message) {
			setLastMessage(message.content)
		},
	})

	if (!chatbot?.categories?.length) {
		return <div>No chatbot data available</div>
	}

	const primaryCategory = chatbot.categories[0].category
	const canonicalDomain = getCanonicalDomain(chatbot.name)
	const botUrl = urlBuilders.chatbotThreadListUrl({
		type: 'personal',
		category: primaryCategory.name,
		domain: canonicalDomain,
		chatbot: chatbot.name,
	})
	const isWelcomeView = variant === 'default' && !chatbot.name.includes('Bot')

	const descriptionPoints =
		chatbot.description?.split(';').map((point) => point.trim()) || []
	const hasMultiplePoints = descriptionPoints.length > 1

	const generateBio = async () => {
		try {
			setIsLoading(true)
			setGenerateType('bio')
			const promptContent = userPersonalityPrompt('bio', [])
			return append({
				id: nanoid(),
				content: promptContent,
				role: 'system',
				createdAt: new Date(),
			})
		} catch (error) {
			setIsLoading(false)
			customSonner({ type: 'error', text: 'Failed to generate content' })
			console.error('Bio generation failed:', error)
		}
	}

	const onFollow = async () => {
		try {
			if (!session) {
				// toast.error('Please sign in to follow chatbot')
				customSonner({
					type: 'error',
					text: 'Please sign in to follow chatbot',
				})
				router.push('/auth/signin')
				return
			}
			const followerId = session.user?.id
			const followeeId = chatbot?.chatbotId
			if (!followerId) {
				customSonner({ type: 'error', text: 'Invalid user data' })
				return
			}
			if (!followeeId) {
				customSonner({
					type: 'error',
					text: 'Invalid chatbot data, please select a chatbot',
				})
				return
			}
			const { success, error, follow } = await chatbotFollowOrUnfollow({
				followerId,
				followeeId,
				jwt: session.user.hasuraJwt as string,
			})
			if (!success) {
				console.error('Failed to follow/Unfolow bot:', error)
				customSonner({
					type: 'error',
					text: error || 'Failed to follow/unfollow bot',
				})
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
						__typename: 'SocialFollowing',
					} as SocialFollowing,
				])
			} else {
				setFollowers(
					followers.filter(
						(follower) =>
							!(
								follower.followerId === followerId &&
								follower.followeeIdChatbot === followeeId
							),
					),
				)
			}
			customSonner({
				type: 'success',
				text: follow
					? `You have followed ${chatbot?.name} successfully`
					: `You have  unfollowed  ${chatbot?.name}`,
			})
		} catch (error) {
			customSonner({ type: 'error', text: 'Failed to follow chatbot' })
			console.error('Failed to follow chatbot:', error)
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
