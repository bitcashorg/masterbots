import { urlBuilders } from '@/lib/url'
import { getThread } from '@/services/hasura'
import type { PageProps } from '@/types/types'
import type { Thread } from 'mb-genql'
import type { Metadata } from 'next'
import { headers } from 'next/headers'

type OgType =
	| 'website'
	| 'article'
	| 'book'
	| 'profile'
	| 'music.song'
	| 'music.album'
	| 'music.playlist'
	| 'music.radio_station'
	| 'video.movie'
	| 'video.episode'
	| 'video.tv_show'
	| 'video.other'

type TwitterCard = 'summary' | 'summary_large_image' | 'player' | 'app'

interface PageSEO extends Metadata {
	title: string
	description: string
	ogType: string
	ogImageUrl?: string
	twitterCard: string
}

export const generateMetadataFromSEO = async (
	pageSeo: PageSEO,
	params: Record<string, any>,
): Promise<Metadata> => {
	const paramKeys = Object.keys(params) as Array<keyof typeof params>
	const headersList = await headers()
	const pathname = headersList.get('x-invoke-path') || ''
	const currentUrl = process.env.BASE_URL + pathname
	const ogImageUrlDefault = '/masterbots_og.png'
	// Dynamic default canonical: The params should return in order of the URL
	const canonical = ['', ...paramKeys.map((key) => params[key])].join('/')

	return {
		title: pageSeo.title || '',
		description: pageSeo.description || '',
		metadataBase: new URL(process.env.BASE_URL || 'https://masterbots.ai'),
		openGraph: {
			type: pageSeo.ogType as OgType,
			title: pageSeo.title,
			description: pageSeo.description,
			url: currentUrl,
			images: pageSeo.ogImageUrl
				? [{ url: pageSeo.ogImageUrl }]
				: [ogImageUrlDefault],
		},
		twitter: {
			card: pageSeo.twitterCard as TwitterCard,
			site: currentUrl,
			title: pageSeo.title,
			description: pageSeo.description,
			images: pageSeo.ogImageUrl ? [pageSeo.ogImageUrl] : [ogImageUrlDefault],
		},
		alternates: {
			canonical,
		},
	}
}

export async function generateMbMetadata({
	params,
}: {
	params: PageProps['params']
}): Promise<Metadata | undefined> {
	const paramsObject = await params

	let thread: Thread | undefined
	let data = {
		title: 'not found',
		publishedAt: new Date().toISOString(),
		summary: 'not found',
		image: `${process.env.BASE_URL}/api/og?threadId=1`,
		pathname: '#',
	}

	try {
		const { threadSlug, threadQuestionSlug } = paramsObject
		thread = (await getThread({ threadSlug, jwt: '' })) as Thread

		const firstQuestion =
			thread?.messages.find(
				(m) =>
					(threadQuestionSlug && m.slug === threadQuestionSlug) ||
					m.role === 'user',
			)?.content || 'not found'
		const threadQuestionSlugIndex = thread?.messages.findIndex(
			(m) => m.slug === threadQuestionSlug,
		)
		const firstResponse = !threadQuestionSlugIndex
			? thread?.messages.find((m) => m.role === 'assistant')?.content ||
				'not found'
			: thread?.messages[threadQuestionSlugIndex + 1]?.content || 'not found' // next message after the question is (and should be) the assistant response

		const firstResponseTruncated =
			firstResponse.length > 200 ? firstResponse.slice(0, 200) : firstResponse

		const threadUrl = urlBuilders.threadUrl({
			type: 'public', // Assuming this is for public threads, adjust as needed
			category: thread?.chatbot?.categories?.[0]?.category?.name || 'AI',
			domain: thread?.chatbot?.metadata[0]?.domainName || 'General',
			chatbot: thread?.chatbot?.name || 'Masterbots',
			threadSlug: thread?.slug || (threadSlug as string),
			raw: false,
		})

		data = {
			title: firstQuestion,
			publishedAt: thread?.updatedAt,
			summary: firstResponseTruncated,
			image: `${process.env.BASE_URL}/api/og?threadId=${thread?.threadId}&threadQuestionSlug=${threadQuestionSlug}`,
			pathname: threadUrl,
		}
	} catch (error) {
		console.error('Error in getThread', error)
	}

	const paramKeys = Object.keys(paramsObject) as Array<
		keyof typeof paramsObject
	>
	const headersList = await headers()
	const pathname = headersList.get('x-invoke-path') || ''
	const currentUrl = process.env.BASE_URL + pathname
	// Dynamic default canonical: The params should return in order of the URL
	const canonical = [
		'',
		...paramKeys.map((key) => key !== 'userSlug' && paramsObject[key]),
	]
		.filter(Boolean)
		.join('/')

	return {
		title: data.title,
		description: data.summary,
		metadataBase: new URL(process.env.BASE_URL || 'https://masterbots.ai'),
		openGraph: {
			locale: 'en_US',
			title: data.title,
			description: data.summary,
			type: 'article',
			publishedTime: data.publishedAt,
			url: currentUrl,
			images: [
				{
					url: data.image,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: data.title,
			site: '@masterbotsai',
			description: data.summary,
			images: [data.image],
		},
		alternates: {
			canonical,
		},
	}
}

export const defaultContent = {
	thread: {
		chatbot: {
			name: 'Masterbots',
			avatar: null,
			categories: [{ category: { name: 'AI' } }],
		},
	},
	question:
		'Elevating AI Beyond ChatGPT: Specialized Chatbots, Social Sharing and User-Friendly Innovation',
	answer:
		'Elevating AI Beyond ChatGPT: Specialized Chatbots, Social Sharing and User-Friendly Innovation',
	username: 'Masterbots',
	user_avatar: '',
	isLightTheme: false,
}
