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
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	params: Record<string, any>,
): Promise<Metadata> => {
	const paramKeys = Object.keys(params) as Array<keyof typeof params>
	const headersList = await headers()
	const pathname = headersList.get('x-invoke-path') || ''
	const currentUrl = process.env.BASE_URL + pathname
	const ogImageUrlDefault = '/masterbots_og.png'
	// Dynamic default canonical: The params should return in order of the URL
	const canonical = ['', ...paramKeys.map((key) => params[key])].join('/')
	const data = {
		title: pageSeo.title || '',
		description: pageSeo.description || '',
		metadataBase: new URL(
			process.env.BASE_URL ||
				'http://localhost:3000' ||
				'https://masterbots.ai',
		),
		openGraph: {
			type: pageSeo.ogType as OgType,
			title: pageSeo.title,
			description: pageSeo.description,
			url: currentUrl,
			images: pageSeo.ogImageUrl ? [pageSeo.ogImageUrl] : [ogImageUrlDefault],
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

	return data
}

// Enhanced OG metadata generator for new layouts and canonical domains
export async function generateMbMetadata({
	params,
}: {
	params: PageProps['params']
}): Promise<Metadata> {
	const paramsObject = await params
	const paramKeys = Object.keys(paramsObject) as Array<
		keyof typeof paramsObject
	>
	const headersList = await headers()
	const pathname = headersList.get('x-invoke-path') || ''
	const currentUrl = process.env.BASE_URL + pathname

	// Helper: get canonical domain
	const getCanonicalDomain = (thread: Thread | undefined) => {
		return thread?.chatbot?.metadata?.[0]?.domainName || 'General'
	}

	// Helper: get bot avatar
	const getBotAvatar = (thread: Thread | undefined) => {
		return thread?.chatbot?.avatar || null
	}

	// Helper: get bot name
	const getBotName = (thread: Thread | undefined) => {
		return thread?.chatbot?.name || 'Masterbots'
	}

	// Helper: get category
	const getCategory = (thread: Thread | undefined) => {
		return thread?.chatbot?.categories?.[0]?.category?.name || 'AI'
	}

	// Helper: get OG type (route-based)
	const getOgType = (
		params: Record<string, unknown>,
		pathname: string,
	): 'bot_thread' | 'user_thread' | 'bot_profile' | 'category_profile' => {
		// User thread: /u/:userSlug/t/... (with threadSlug)
		if (
			pathname.startsWith('/u/') &&
			pathname.includes('/t/') &&
			params.threadSlug
		)
			return 'user_thread'
		// Bot thread: /b/... or /c/... or /... (with threadSlug)
		if (
			(pathname.startsWith('/b/') ||
				pathname.startsWith('/c/') ||
				pathname.match(/^\/[\w-]+\//)) &&
			params.threadSlug
		)
			return 'bot_thread'
		// Bot profile: /b/... (no threadSlug)
		if (pathname.startsWith('/b/') && !params.threadSlug) return 'bot_profile'
		// Category profile: /c/:category or /:category or /u/:userSlug/t/:category (no threadSlug)
		if (
			pathname.startsWith('/c/') ||
			pathname.match(/^\/[\w-]+$/) ||
			(pathname.startsWith('/u/') &&
				pathname.includes('/t/') &&
				!params.threadSlug)
		)
			return 'category_profile'
		// Fallback
		return 'bot_profile'
	}

	let thread: Thread | undefined
	let ogType:
		| 'bot_thread'
		| 'user_thread'
		| 'bot_profile'
		| 'category_profile' = 'bot_profile'
	let data = {
		title: 'not found',
		publishedAt: new Date().toISOString(),
		summary: 'not found',
		image: `${process.env.BASE_URL}/api/og?threadId=1`,
		pathname: '#',
		botName: 'Masterbots',
		botAvatar: null,
		category: 'AI',
		domain: 'General',
		description: '',
		username: '',
		user_avatar: '',
	}

	try {
		const { threadSlug, threadQuestionSlug, userSlug } = paramsObject
		if (threadSlug) {
			thread = (await getThread({ threadSlug, isSEO: true })) as Thread
		}

		// Compose question/answer for thread OGs
		let firstQuestion = 'not found'
		let firstResponse = 'not found'
		if (thread) {
			firstQuestion =
				thread?.messages.find(
					(m) =>
						(threadQuestionSlug && m.slug === threadQuestionSlug) ||
						m.role === 'user',
				)?.content || 'not found'
			const threadQuestionSlugIndex = thread?.messages.findIndex(
				(m) => m.slug === threadQuestionSlug,
			)
			firstResponse =
				threadQuestionSlugIndex === -1
					? thread?.messages.find((m) => m.role === 'assistant')?.content ||
						'not found'
					: thread?.messages[threadQuestionSlugIndex + 1]?.content ||
						'not found'
		}
		const firstResponseTruncated =
			firstResponse.length > 200 ? firstResponse.slice(0, 200) : firstResponse

		// Compose OG type
		ogType = getOgType(paramsObject, pathname)

		// Compose OG image URL
		let ogImageUrl = ''
		if (ogType === 'bot_thread') {
			ogImageUrl = `${process.env.BASE_URL}/api/og?threadId=${thread?.threadId}${threadQuestionSlug ? `&threadQuestionSlug=${threadQuestionSlug}` : ''}`
		} else if (ogType === 'user_thread') {
			ogImageUrl = `${process.env.BASE_URL}/api/og?userThread=1&threadId=${thread?.threadId}${threadQuestionSlug ? `&threadQuestionSlug=${threadQuestionSlug}` : ''}`
		} else if (ogType === 'bot_profile') {
			ogImageUrl = `${process.env.BASE_URL}/api/og?botProfile=1&bot=${encodeURIComponent(getBotName(thread))}`
		} else if (ogType === 'category_profile') {
			ogImageUrl = `${process.env.BASE_URL}/api/og?categoryProfile=1&category=${encodeURIComponent(getCategory(thread))}`
		} else {
			ogImageUrl = '/masterbots_og.png'
		}

		// Compose canonical
		const canonical = [
			'',
			...paramKeys.map((key) => key !== 'userSlug' && paramsObject[key]),
		]
			.filter(Boolean)
			.join('/')

		// Compose description for bot/category profile
		let description = ''
		if (ogType === 'bot_profile') {
			description =
				thread?.chatbot?.description || 'Explore this AI chatbot on Masterbots.'
		} else if (ogType === 'category_profile') {
			description = `Explore the best AI chatbots in ${getCategory(thread)}.`
		} else {
			description = firstResponseTruncated
		}

		// Compose username/avatar for user thread
		let username = ''
		let user_avatar = ''
		if (ogType === 'user_thread' && thread?.user) {
			username = thread.user?.username || ''
			// Try to get avatar if present (API may include it)
			user_avatar =
				typeof (thread.user as unknown as Record<string, unknown>)?.avatar ===
				'string'
					? ((thread.user as unknown as Record<string, unknown>)
							.avatar as string)
					: ''
		}

		data = {
			title: ogType === 'bot_profile' ? getBotName(thread) : firstQuestion,
			publishedAt: thread?.updatedAt || new Date().toISOString(),
			summary: description,
			image: ogImageUrl,
			pathname: pathname,
			botName: getBotName(thread),
			botAvatar: null,
			category: getCategory(thread),
			domain: getCanonicalDomain(thread),
			description,
			username,
			user_avatar,
		}
	} catch (error) {
		console.error('Error in getThread', error)
	}

	// Compose metadata
	const seoData = {
		title: data.title,
		// description: data.summary, // removed duplicate property
		metadataBase: new URL(process.env.BASE_URL || 'https://masterbots.ai'),
		openGraph: {
			locale: 'en_US',
			title: data.title,
			description: data.summary,
			type:
				ogType === 'bot_thread' || ogType === 'user_thread'
					? 'article'
					: 'website',
			publishedTime: data.publishedAt,
			url: currentUrl,
			images: [data.image],
		},
		twitter: {
			card: 'summary_large_image',
			title: data.title,
			site: '@masterbotsai',
			description: data.summary,
			images: [data.image],
		},
		alternates: {
			canonical: data.pathname,
		},
		// Custom fields for OG rendering
		ogType,
		botName: data.botName,
		botAvatar: data.botAvatar,
		category: data.category,
		domain: data.domain,
		description: data.description,
		username: data.username,
		user_avatar: data.user_avatar,
	}

	return seoData
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
