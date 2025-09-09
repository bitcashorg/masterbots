'use server'

import {
	getMessages,
	getThread,
	updateMessageShortLink,
	updateThreadShortLink,
} from '@/services/hasura'
import axios from 'axios'
import { cookies } from 'next/headers'

// generate dub.co links
export async function generateShortLink(path: string) {
	const cookieStorage = await cookies()
	try {
		const pathParts = path.split('/')
		// /b/:threadSlug/:threadQuestionSlug
		const [, _base, threadSlug, threadQuestionSlug] =
			pathParts[pathParts.length - 1]
		const thread = await getThread({ threadSlug })
		const messages = await getMessages({ threadQuestionSlug })
		const threadShortLink = thread?.shortLink
		const messagesShortLink = messages[0]?.shortLink
		if (threadShortLink || messagesShortLink) {
			return {
				data: {
					shortLink: threadShortLink || messagesShortLink || '',
				},
				error: null,
			}
		}
		const resolved: DubShareLinkResponse = await axios
			.post(
				`https://api.dub.co/links?workspaceId=${process.env.DUB_WORKSPACE_ID}`,
				{
					domain: 'mbots.to',
					url: `https://masterbots.ai${path}`,
				},
				{
					headers: {
						Authorization: `Bearer ${process.env.DUB_API_KEY}`,
						'Content-Type': 'application/json',
					},
				},
			)
			.then((res) => res.data)

		if (!resolved) throw new Error('Failed to generate short link')
		if (threadQuestionSlug) {
			await updateMessageShortLink({
				slug: threadQuestionSlug,
				shortLink: resolved.shortLink,
			})
		} else {
			await updateThreadShortLink({
				slug: threadSlug,
				shortLink: resolved.shortLink,
			})
		}

		return {
			data: {
				key: resolved.key,
				shortLink: resolved.shortLink,
				qrCode: resolved.qrCode,
			},
			error: null,
		}
	} catch (error) {
		console.log(`${path}Failed to generate short link: ==> `, error)
		return {
			data: null,
			error: (error as Error).message,
		}
	}
}

export interface DubShareLinkResponse {
	key: string
	shortLink: string
	qrCode: string
}

export type ActionState = {
	data?: string
	error?: string
}
