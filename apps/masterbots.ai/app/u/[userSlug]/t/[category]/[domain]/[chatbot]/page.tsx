import { authOptions } from '@/auth'
import { UserThreadList } from '@/components/routes/profile/user-thread-list'
import { botNames } from '@/lib/constants/bots-names'
import { PAGE_SM_SIZE } from '@/lib/constants/hasura'
import {
	getBrowseThreads,
	getThreads,
	getUserBySlug,
} from '@/services/hasura/hasura.service'
import type { PageProps } from '@/types/types'
import type { User } from 'mb-genql'
import { getServerSession } from 'next-auth'
import { Suspense } from 'react'

export { generateMbMetadata as generateMetadata } from '@/lib/metadata'

export default async function ProfileChatBot(props: PageProps) {
	const params = await props.params
	let threads = []
	const { userSlug, category, chatbot } = params
	const session = await getServerSession(authOptions)
	const jwt = session ? session.user?.hasuraJwt : ''
	const { user, error } = await getUserBySlug({
		isSameUser: session?.user.slug === userSlug,
		slug: userSlug as string,
	})
	if (!user) return <div>No user found</div>

	const chatbotName = (await botNames).get(chatbot as string)
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
