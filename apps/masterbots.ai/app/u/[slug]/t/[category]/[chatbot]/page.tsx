import { authOptions } from '@/auth'
import UserThreadPanel from '@/components/routes/thread/user-thread-panel'
import { botNames } from '@/lib/constants/bots-names'
import {
	getBrowseThreads,
	getThreads,
	getUserBySlug,
} from '@/services/hasura/hasura.service'
import { getServerSession } from 'next-auth'

export default async function ProfileChatBot({
	params,
}: {
	params: {
		slug: string
		category: string
		chatbot: string
	}
}) {
	let threads = []
	const { slug, category, chatbot } = params
	const session = await getServerSession(authOptions)
	const jwt = session ? session.user?.hasuraJwt : ''
	const { user, error } = await getUserBySlug({
		slug,
		isSameUser: session?.user.slug === slug,
	})
	if (!user) return <div>No user found</div>

	const chatbotName = botNames.get(chatbot)
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
				})
			}

			if (!session?.user?.hasuraJwt) {
				throw new Error('Authentication required')
			}

			return await getThreads({
				jwt,
				userId: user.userId,
				chatbotName,
			})
		} catch (error) {
			console.error('Failed to fetch threads:', error)
			return []
		}
	}

	threads = await fetchThreads()

	return <UserThreadPanel threads={threads} chatbot={chatbot} page="profile" />
}
