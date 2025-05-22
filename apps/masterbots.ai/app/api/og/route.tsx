import OGImage from '@/components/shared/og-image'
import { uuidRegex } from '@/lib/utils'
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
	thread: {
		chatbot: {
			name: 'Masterbots',
			avatar: `${process.env.BASE_URL}/masterbots_og.png`,
			categories: [{ category: { name: 'AI' } }],
		},
	} as Partial<Thread>,
	question: 'Masterbots AI',
	answer:
		'Deploy with our Masterbots, dedicated experts in your field. Each Masterbot is built to deliver focused knowledge and specialized interactions superior to generic AI solutions.',
	username: 'Masterbots',
	user_avatar: `${process.env.BASE_URL}/images/robohash1.png`,
	isLightTheme: false,
}

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = req.nextUrl
		console.log('searchParams for og:', searchParams.toString())
		const threadId = searchParams.get('threadId')
		const chatbotId = searchParams.get('chatbotId')
		const userSlug = searchParams.get('userSlug')
		const threadQuestionSlug = searchParams.get('threadQuestionSlug')
		const defaultOgImage = new ImageResponse(
			<OGImage {...defaultContent} />,
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

			return new ImageResponse(
				<OGImage
					thread={defaultContent.thread}
					question={userData.username}
					answer={userData.bio || ''}
					username={`${userData.followers.length} followers`}
					user_avatar={userData.profilePicture || ''}
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
			const { name, avatar, metadata, threads, description } = chatbot[0]
			return new ImageResponse(
				<OGImage
					thread={threads[0]}
					question={name}
					answer={description || ''}
					user_avatar={avatar || ''}
					username={metadata[0]?.domainName || 'Prompt'}
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
			)?.content || 'not found' // next message after the question is (and should be) the assistant response
		const username = threadData?.user?.username || 'Anonymous'
		const user_avatar = threadData?.user?.profilePicture || ''

		return new ImageResponse(
			<OGImage
				thread={threadData}
				question={question}
				answer={answer}
				username={username}
				user_avatar={user_avatar}
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
