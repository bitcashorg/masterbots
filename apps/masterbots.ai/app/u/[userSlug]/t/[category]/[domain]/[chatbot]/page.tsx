import { authOptions } from '@/auth'
import { UserThreadList } from '@/components/routes/profile/user-thread-list'
import { ErrorComponent } from '@/components/shared/error'
import { botNames } from '@/lib/constants/bots-names'
import { PAGE_SM_SIZE } from '@/lib/constants/hasura'
import { generateMetadataFromSEO } from '@/lib/metadata'
import { getCanonicalDomain, urlBuilders } from '@/lib/url'
import {
	getBrowseThreads,
	getChatbot,
	getThreads,
	getUserBySlug,
} from '@/services/hasura/hasura.service'
import type { PageProps } from '@/types/types'
import type { Thread, User } from 'mb-genql'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { Suspense } from 'react'

export default async function ProfileChatBot(props: PageProps) {
	const params = await props.params
	let threadsResult: {
		threads: Thread[]
		count: number
	} = {
		threads: [],
		count: 0,
	}
	const { userSlug, category, chatbot } = params
	const session = await getServerSession(authOptions)
	const jwt = session ? session.user?.hasuraJwt : ''
	const { user, error } = await getUserBySlug({
		isSameUser: session?.user.slug === userSlug,
		slug: userSlug as string,
	})
	if (!user) return <ErrorComponent message={error || 'User not found'} />

	const chatbotName = (await botNames).get(chatbot as string)
	if (!chatbotName) {
		return <ErrorComponent message={`Chatbot name for ${chatbot} not found`} />
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

	threadsResult = await fetchThreads()

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

export async function generateMetadata(props: PageProps): Promise<Metadata> {
	const params = await props.params
	const chatbotName = (await botNames).get(params.chatbot as string) || ''
	const chatbot = await getChatbot({
		chatbotName,
		jwt: '',
		threads: true,
	})

	const seoData = {
		title: chatbot?.name || '',
		description: chatbot?.description || '',
		ogType: 'website',
		ogImageUrl: `${process.env.BASE_URL || ''}/api/og?chatbotId=${chatbot.chatbotId}`,
		twitterCard: 'summary_large_image',
	}
	const domain = getCanonicalDomain(params.chatbot as string)
	return {
		...(await generateMetadataFromSEO(seoData, params)),
		alternates: {
			canonical: urlBuilders.chatbotThreadListUrl({
				type: 'public',
				category: chatbot.categories?.[0]?.category?.name || 'AI',
				domain,
				chatbot: chatbotName as string,
			}),
			// TODO: Add languages when languages are enabled.
		},
	}
}
