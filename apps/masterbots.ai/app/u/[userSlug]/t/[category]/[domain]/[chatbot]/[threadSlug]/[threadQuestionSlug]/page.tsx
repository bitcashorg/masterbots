import { BrowseThreadBlog } from '@/components/routes/browse/browse-thread-blog'
import { UserThreadList } from '@/components/routes/profile/user-thread-list'
import { ErrorComponent } from '@/components/shared/error'
import { botNames } from '@/lib/constants/bots-names'
import { generateMbMetadata } from '@/lib/metadata'
import { getCanonicalDomain, urlBuilders } from '@/lib/url'
import {
	getBrowseThreads,
	getCategory,
	getThread,
	getThreads,
	getUserBySlug,
} from '@/services/hasura'
import type { User } from 'mb-genql'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { Suspense } from 'react'

interface ThreadPageProps {
	params: Promise<{
		userSlug: string
		category: string
		domain: string
		threadSlug: string
		chatbot: string
	}>
}
const PAGE_SM_SIZE = 10 // Adjust this based on your needs
export default async function ThreadQuestionPage(props: ThreadPageProps) {
	const params = await props.params
	const { chatbot: chatBotName, category, chatbot, userSlug } = params
	const thread = await getThread({
		threadSlug: params.threadSlug,
		jwt: '',
	})
	const session = await getServerSession()

	if (!thread) {
		return (
			<ErrorComponent message="The thread that you were looking for either doesn't exist or is not available." />
		)
	}

	const jwt = session ? session.user?.hasuraJwt : ''
	const { user } = await getUserBySlug({
		isSameUser: session?.user.slug === userSlug,
		slug: userSlug as string,
	})
	if (!user) return <ErrorComponent message="User not found" />

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
			return {
				threads: [],
				count: 0,
			}
		}
	}

	const threadsResult = await fetchThreads()

	return (
		<Suspense fallback={null}>
			<UserThreadList
				user={user as User}
				count={threadsResult.count}
				threads={threadsResult.threads}
			/>
		</Suspense>
	)
}

export async function generateMetadata(
	props: ThreadPageProps,
): Promise<Metadata> {
	// Get base metadata from the shared function
	const baseMetadata = await generateMbMetadata(props)
	const params = await props.params
	// Add or override with your custom link tags
	const chatbotName = (await botNames).get(params.chatbot as string) || ''
	const topic = await getCategory({ chatbotName })
	const domain = getCanonicalDomain(chatbotName)
	return {
		...baseMetadata,
		alternates: {
			canonical: urlBuilders.threadUrl({
				type: 'public',
				category: topic.name,
				domain,
				chatbot: chatbotName,
				threadSlug: params.threadSlug as string,
			}),
			// TODO: Add languages when languages are enabled.
		},
	}
}
