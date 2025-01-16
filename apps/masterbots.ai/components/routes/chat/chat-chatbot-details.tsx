import { OnboardingChatbotDetails } from '@/components/routes/chat/onboarding-chatbot-details'
import { OnboardingMobileChatbotDetails } from '@/components/routes/chat/onboarding-chatbot-mobile-details'
import { ChatChatbotDetailsSkeleton } from '@/components/shared/skeletons/chat-chatbot-details-skeleton'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { getCategory, getThreads } from '@/services/hasura'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ChatChatbotDetails() {
	const { data: session } = useSession()
	const { activeCategory, activeChatbot } = useSidebar()
	const { randomChatbot } = useThread()
	const { slug } = useParams()

	const [threadNum, setThreadNum] = useState<number>(0)
	const [categoryName, setCategoryName] = useState<string>('')
	const [isLoading, setIsLoading] = useState(true)

	const getThreadNum = async () => {
		if (!session?.user) return
		try {
			const threads = await getThreads({
				jwt: session?.user?.hasuraJwt as string,
				categoryId: activeCategory,
				userId: session?.user.id as string,
			})
			setThreadNum(threads?.length ?? 0)
		} catch (error) {
			console.error('Error fetching threads:', error)
		}
	}

	const getCategoryName = async () => {
		try {
			const category = await getCategory({
				categoryId: activeCategory as number,
			})
			setCategoryName(category.name)
		} catch (error) {
			console.error('Error fetching category:', error)
		}
	}

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

	const handleFollow = () => {
		// follow logic once ready goes here
		console.log('Following:', botName)
	}

	const sharedProps = {
		botName,
		avatar: activeChatbot?.avatar || randomChatbot?.avatar || '',
		description: activeChatbot?.description,
		threadCount: activeChatbot
			? (activeChatbot?.threads?.length ?? 0)
			: threadNum,
		followersCount: 3200, // This nees to be changed once following feat is ready
		isWelcomeView,
		categoryName,
		onNewChat: handleNewChat,
		onFollow: handleFollow,
	}

	return (
		<>
			<OnboardingChatbotDetails {...sharedProps} />
			<OnboardingMobileChatbotDetails {...sharedProps} />
		</>
	)
}
