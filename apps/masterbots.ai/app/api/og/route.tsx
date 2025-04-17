import OGImage from '@/components/shared/og-image'
import { getUserBySlug } from '@/services/hasura'
import type { UUID } from '@/types/types'
import type { Chatbot, Thread } from 'mb-genql'
import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'
import { getChatbotForOG, getThreadForOG } from './edge-client'
export const runtime = 'edge'

const IMAGE_DIMENSIONS = {
	width: 1200,
	height: 700,
}

const defaultContent = {
	thread: {
		chatbot: {
			name: 'Masterbots',
			avatar: `${process.env.NEXT_PUBLIC_BASE_URL}/images/masterbots.png`,
			categories: [{ category: { name: 'AI' } }],
		},
	} as Partial<Thread>,
	question: 'Masterbots AI',
	answer:
		'Deploy with our domain-specific Masterbots, dedicated experts in your field. Each Masterbot is purpose-built for its role, delivering focused knowledge and specialized interactions beyond what generic AI solutions can offer.',
	username: 'Masterbots',
	user_avatar: `${process.env.NEXT_PUBLIC_BASE_URL}/images/robohash1.png`,
	isLightTheme: false,
}

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = req.nextUrl
		const rawThreadId = searchParams.get('threadId')
		const rawChatbotId = searchParams.get('chatbotId')
		const rawUserSlug = searchParams.get('userSlug')
		const rawThreadQuestionSlug = searchParams.get('threadQuestionSlug')
		const threadId = rawThreadId?.match(
			/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
		)
			? (rawThreadId as UUID)
			: null
		const chatbotId = rawChatbotId?.match(
			/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
		)
			? (rawChatbotId as UUID)
			: null
		const defaultOgImage = new ImageResponse(
			<OGImage {...defaultContent} />,
			IMAGE_DIMENSIONS,
		)

		if (rawUserSlug) {
			const { user: userData } = await getUserBySlug({
				slug: rawUserSlug,
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

		if (!threadId && !chatbotId) {
			// Use metadata when thread not found
			return defaultOgImage
		}

		// TODO: Update this to use mb-genql package
		const { thread }: { thread: Thread[] } = await getThreadForOG(
			threadId as UUID,
		)

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
					(rawThreadQuestionSlug && m.slug === rawThreadQuestionSlug) ||
					m.role === 'user',
			)?.content || 'not found'
		const answer =
			threadData?.messages?.find(
				(m) =>
					(rawThreadQuestionSlug && m.slug === rawThreadQuestionSlug) ||
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
