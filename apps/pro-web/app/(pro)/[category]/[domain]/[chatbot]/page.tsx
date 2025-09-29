import { authOptions } from '@/auth'
import Subscription from '@/components/routes/subscription/subscription'
import { MainContentSkeleton } from '@/components/shared/skeletons/chat-page-skeleton'
import { ChatPanelSkeleton } from '@/components/shared/skeletons/chat-panel-skeleton'
import { botNames } from '@/lib/constants/bots-names'
import { PAGE_SIZE } from '@/lib/constants/hasura'
import { generateMetadataFromSEO } from '@/lib/metadata'
import { getChatbot, getThreads } from '@/services/hasura'
import { isTokenExpired } from 'mb-lib'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import dynamic from 'next/dynamic'
import { redirect } from 'next/navigation'

const ThreadPanel = dynamic(
	() => import('@/components/routes/thread/thread-panel'),
	{
		loading: () => <MainContentSkeleton />,
	},
)
const Pro = dynamic(
	() => import('@/components/routes/pro/pro').then((mod) => mod.Pro),
	{
		loading: () => <ChatPanelSkeleton />,
	},
)

export default async function BotThreadsPage(props: {
	params: Promise<{ category: string; chatbot: string }>
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
	const params = await props.params
	const session = await getServerSession(authOptions)
	// NOTE: maybe we should use same expiration time
	const jwt = session ? session.user?.hasuraJwt : null
	if (!jwt) {
		console.error('Session JWT is missing.')
	}
	if (isTokenExpired(jwt as string)) {
		redirect('/auth/signin')
	}

	const chatbotName = (await botNames).get(params.chatbot)
	if (!chatbotName) {
		throw new Error(`Chatbot name for ${params.chatbot} not found`)
	}
	const chatbot = await getChatbot({ chatbotName, jwt: jwt as string })

	if (!chatbot) throw new Error(`Chatbot ${chatbotName} not found`)

	// session will always be defined

	const userId = session?.user?.id
	if (!userId) {
		throw new Error('User ID is missing.')
	}

	const threads = await getThreads({
		chatbotName,
		jwt: jwt as string,
		userId,
		limit: PAGE_SIZE,
	})
	const user = {
		email: session.user.email || '',
		name: session.user.name || '',
	}

	return (
		<>
			<ThreadPanel threads={threads.threads} />
			<Pro />
			<Subscription />
		</>
	)
}

export async function generateMetadata(props: {
	params: Promise<{ chatbot: string }>
}): Promise<Metadata> {
	const params = await props.params
	const chatbotName = (await botNames).get(params.chatbot)
	const chatbot = await getChatbot({ chatbotName, jwt: '' })

	const seoData = {
		title: chatbotName || '',
		description: chatbot.description || '',
		ogType: 'website',
		ogImageUrl: `${process.env.BASE_URL}/api/og?chatbotId=${chatbot.chatbotId}`,
		twitterCard: 'summary',
	}

	return generateMetadataFromSEO(seoData, params)
}
