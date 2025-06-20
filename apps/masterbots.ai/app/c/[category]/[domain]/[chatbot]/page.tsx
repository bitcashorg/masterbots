import { authOptions } from '@/auth'
import { ChatChatbot } from '@/components/routes/chat/chat-chatbot'
import ThreadPanel from '@/components/routes/thread/thread-panel'
import { botNames } from '@/lib/constants/bots-names'
import { PAGE_SIZE } from '@/lib/constants/hasura'
import { generateMetadataFromSEO } from '@/lib/metadata'
import { type RoleTypes, isAdminOrModeratorRole } from '@/lib/utils'
import { getChatbot, getThreads } from '@/services/hasura'
import { isTokenExpired } from 'mb-lib'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { notFound, redirect } from 'next/navigation'

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

	if (!chatbot) {
		console.error(`Chatbot ${chatbotName} not found`)
		return notFound()
	}

	// session will always be defined

	const userId = session?.user?.id
	if (!userId) {
		console.error('User ID is missing.')
		return notFound()
	}
	const role = session.user.role as RoleTypes
	const { threads, count } = await getThreads({
		chatbotName,
		jwt: jwt as string,
		userId,
		limit: PAGE_SIZE,
	})

	return (
		<>
			<ThreadPanel
				threads={threads}
				count={count}
				isAdminMode={isAdminOrModeratorRole(role)}
			/>
			<ChatChatbot chatbot={chatbot} />
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

	return await generateMetadataFromSEO(seoData, params)
}
