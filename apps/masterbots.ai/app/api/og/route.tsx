import OGImage from '@/components/shared/og-image'
import type { OgImageProps } from '@/components/shared/og-image'
import { uuidRegex } from '@/lib/regexp'
import { getUserBySlug } from '@/services/hasura'
import type { Chatbot, Thread } from 'mb-genql'
import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'
import { getChatbotForOG, getThreadForOG } from './edge-client'

export const runtime = 'edge'

const IMAGE_DIMENSIONS = {
	width: 1200,
	height: 630,
}

const defaultContent = {
	ogType: 'bot_thread',
	botName: 'masterbots',
	botAvatar: `${process.env.BASE_URL}/masterbots_og.png`,
	category: 'AI',
	question: 'MasterbotsAI',
	answer: 'Where your Ai expertise goes public',
	username: '@masterbotsai',
	user_avatar: `${process.env.BASE_URL}/images/robohash1.png`,
	isLightTheme: false,
} as const

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = req.nextUrl
		console.log('searchParams for og:', searchParams.toString())
		// Parse new OG type params
		const botProfile = searchParams.get('botProfile')
		const categoryProfile = searchParams.get('categoryProfile')
		const userThread = searchParams.get('userThread')
		// Legacy params
		const threadId = searchParams.get('threadId')
		const chatbotId = searchParams.get('chatbotId')
		const userSlug = searchParams.get('userSlug')
		const threadQuestionSlug = searchParams.get('threadQuestionSlug')

		// Determine ogType
		let ogType: OgImageProps['ogType'] = 'bot_thread'
		if (botProfile) ogType = 'bot_profile'
		else if (categoryProfile) ogType = 'category_profile'
		else if (userThread) ogType = 'user_thread'

		// Default OG image
		const defaultOgImage = new ImageResponse(
			<OGImage {...defaultContent} ogType={ogType} />,
			IMAGE_DIMENSIONS,
		)

		if (userSlug) {
			const { user: userData } = await getUserBySlug({
				slug: userSlug,
				isSameUser: false,
			})
			if (!userData) {
				return defaultOgImage
			}
			// User profile OG
			return new ImageResponse(
				<OGImage
					ogType={ogType}
					botName={userData.username}
					botAvatar={userData.profilePicture || ''}
					question={`@${userData.username.toLocaleLowerCase().replace(/\s/g, '_')}`}
					answer={userData.bio || ''}
					username={
						userData.followers.length
							? `${userData.followers.length} followers`
							: 'bot explorer'
					}
					user_avatar={defaultContent.user_avatar}
					isLightTheme={false}
				/>,
				IMAGE_DIMENSIONS,
			)
		}

		if (
			!threadId ||
			(threadId && !uuidRegex.test(threadId)) ||
			!chatbotId ||
			(chatbotId && !uuidRegex.test(chatbotId))
		) {
			return defaultOgImage
		}

		// TODO: Update this to use mb-genql package
		const { thread }: { thread: Thread[] } = await getThreadForOG(threadId)
		if (!thread?.length && !chatbotId) {
			// Use metadata when thread not found
			return defaultOgImage
		}

		// Initialize chatbot data
		let chatbotData: { chatbot: Chatbot[] } = { chatbot: [] }
		if (chatbotId) {
			chatbotData = await getChatbotForOG(chatbotId)
		}
		const { chatbot } = chatbotData

		if (chatbot?.length) {
			const { name, avatar, metadata, threads, description, categories } =
				chatbot[0]
			return new ImageResponse(
				<OGImage
					ogType={ogType}
					botName={name}
					botAvatar={avatar || ''}
					domain={metadata[0]?.domainName || ''}
					category={categories?.[0]?.category?.name || ''}
					question={name}
					answer={description || ''}
					username={metadata[0]?.domainName || 'Prompt'}
					user_avatar={avatar || ''}
					isLightTheme={false}
				/>,
				IMAGE_DIMENSIONS,
			)
		}

		const threadData = thread[0]
		const question =
			threadData?.messages?.find(
				(m) =>
					(threadQuestionSlug && m.slug === threadQuestionSlug) ||
					m.role === 'user',
			)?.content || 'not found'
		const answer =
			threadData?.messages?.find(
				(m) =>
					(threadQuestionSlug && m.slug === threadQuestionSlug) ||
					m.role === 'assistant',
			)?.content || 'not found'
		const username = threadData?.user?.username || 'Anonymous'
		const user_avatar = threadData?.user?.profilePicture || ''
		const botName = threadData?.chatbot?.name || ''
		const botAvatar = threadData?.chatbot?.avatar || ''
		const category = threadData?.chatbot?.categories?.[0]?.category?.name || ''
		const domain = threadData?.chatbot?.metadata?.[0]?.domainName || ''

		return new ImageResponse(
			<OGImage
				ogType={ogType}
				thread={threadData}
				question={question}
				answer={answer}
				username={username}
				user_avatar={user_avatar}
				botName={botName}
				botAvatar={botAvatar}
				category={category}
				domain={domain}
				isLightTheme={false}
			/>,
			IMAGE_DIMENSIONS,
		)
	} catch (e: unknown) {
		console.error('OG Image generation error:', e)
		return new Response(
			`Failed to generate the image: ${(e as Error).message}`,
			{
				status: 500,
			},
		)
	}
}
