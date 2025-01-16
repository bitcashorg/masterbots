'use client'

import { BrowseChatbotDesktopDetails } from '@/components/routes/browse/browse-chatbot-desktop-details'
import { BrowseChatbotMobileDetails } from '@/components/routes/browse/browse-chatbot-mobile-details'
import { UserPersonalityPrompt } from '@/lib/constants/prompts'
import { useModel } from '@/lib/hooks/use-model'
import { nanoid } from '@/lib/utils'
import type { BrowseChatbotDetailsProps } from '@/types/types'
import { useChat } from 'ai/react'
import { toSlug } from 'mb-lib'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function BrowseChatbotDetails({
	chatbot,
	variant = 'default',
}: BrowseChatbotDetailsProps) {
	const [isLoading, setIsLoading] = useState(false)
	const [generateType, setGenerateType] = useState<string | undefined>('')
	const [lastMessage, setLastMessage] = useState<string | null>(null)
	const { selectedModel, clientType } = useModel()

	const { append } = useChat({
		id: nanoid(),
		body: {
			id: nanoid(),
			model: selectedModel,
			clientType,
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
		},
	})

	if (!chatbot?.categories?.length) {
		return <div>No chatbot data available</div>
	}

	const primaryCategory = chatbot.categories[0].category
	const botUrl = `/c/${toSlug(primaryCategory.name)}/${chatbot.name.toLowerCase()}`
	const isWelcomeView = variant === 'default' && !chatbot.name.includes('Bot')

	const descriptionPoints =
		chatbot.description?.split(';').map((point) => point.trim()) || []
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
				createdAt: new Date(),
			})
		} catch (error) {
			setIsLoading(false)
			toast.error('Failed to generate content')
			console.error('Bio generation failed:', error)
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
	}

	return (
		<>
			<BrowseChatbotDesktopDetails {...sharedProps} />
			<BrowseChatbotMobileDetails {...sharedProps} />
		</>
	)
}
