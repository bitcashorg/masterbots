import { authOptions } from '@/auth'
import { UserThreadList } from '@/components/routes/profile/user-thread-list'
import { botNames } from '@/lib/constants/bots-names'
import { PAGE_SM_SIZE } from '@/lib/constants/hasura'
import { generateMbMetadata } from '@/lib/metadata'
import {
	getBrowseThreads,
	getThreads,
	getUserBySlug,
} from '@/services/hasura/hasura.service'
import type { User } from 'mb-genql'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import type { AppLinks } from 'next/dist/lib/metadata/types/extra-types'
import { Suspense } from 'react'

interface ThreadPageProps {
	params: Promise<{
		username: string
		category: string
		domain: string
		chatbot: string
	}>
}

export async function generateMetadata(
	props: ThreadPageProps,
): Promise<Metadata> {
	const params = await props.params
	// Get base metadata from the shared function
	const baseMetadata = await generateMbMetadata(props)

	// Add or override with your custom link tags
	return {
		...baseMetadata,
		appLinks: [
			...((baseMetadata?.appLinks || []) as AppLinks[]),
			{
				rel: 'canonical',
				href: `${process.env.BASE_URL}/${Object.keys(params).join('/')}`,
			},
		] as AppLinks,
	}
}

export default async function ProfileChatBot(props: ThreadPageProps) {
	const params = await props.params
	let threads = []
	const { username, category, chatbot } = params
	const session = await getServerSession(authOptions)
	const jwt = session ? session.user?.hasuraJwt : ''
	const { user, error } = await getUserBySlug({
		isSameUser: session?.user.slug === username,
		slug: username,
	})
	if (!user) return <div>No user found</div>

	const chatbotName = (await botNames).get(chatbot)
	if (!chatbotName) {
		throw new Error(`Chatbot name for ${chatbot} not found`)
	}

	const fetchThreads = async () => {
		try {
			const isOwnProfile = session?.user?.id === user?.userId
			if (!isOwnProfile) {
				return await getBrowseThreads({
					userId: user.userId,
					chatbotName,
					limit: PAGE_SM_SIZE,
				})
			}

			if (!session?.user?.hasuraJwt) {
				throw new Error('Authentication required')
			}

			return await getThreads({
				jwt,
				userId: user.userId,
				chatbotName,
				limit: PAGE_SM_SIZE,
			})
		} catch (error) {
			console.error('Failed to fetch threads:', error)
			return []
		}
	}

	threads = await fetchThreads()

	return (
		<Suspense fallback={null}>
			<UserThreadList user={user as User} threads={threads} />
		</Suspense>
	)
}
