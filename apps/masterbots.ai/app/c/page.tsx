import { authOptions } from '@/auth'
import { MainContentSkeleton } from '@/components/shared/skeletons/chat-page-skeleton'
import { ChatPanelSkeleton } from '@/components/shared/skeletons/chat-panel-skeleton'
import { PAGE_SIZE } from '@/lib/constants/hasura'
import { generateMetadataFromSEO } from '@/lib/metadata'
import { type RoleTypes, isAdminOrModeratorRole } from '@/lib/utils'
import { getThreads } from '@/services/hasura'
import type { PageProps } from '@/types/types'
import { isTokenExpired } from 'mb-lib'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import dynamic from 'next/dynamic'
import { redirect } from 'next/navigation'

const ThreadPanel = dynamic(
	() => import('@/components/routes/thread/thread-panel'),
	{
		loading: () => <MainContentSkeleton />,
	},
)
const ChatThreadListPanel = dynamic(
	() => import('@/components/routes/chat/chat-thread-list-panel'),
	{
		loading: () => <ChatPanelSkeleton />,
	},
)

export default async function IndexPage() {
	const session = await getServerSession(authOptions)

	// NOTE: maybe we should use same expiration time
	const jwt = session?.user?.hasuraJwt

	if (!jwt || isTokenExpired(jwt)) {
		redirect('/auth/signin')
	}

	const role = session.user.role as RoleTypes
	const { threads, count } = await getThreads({
		jwt,
		userId: session.user.id,
		limit: PAGE_SIZE,
	})

	return (
		<>
			<ThreadPanel
				threads={threads}
				count={count}
				isAdminMode={isAdminOrModeratorRole(role)}
			/>
			<ChatThreadListPanel />
		</>
	)
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
	const params = await props.params
	const seoData = {
		title: 'Chat page',
		description:
			'Welcome to the chatbot page. Interact with our AI-powered chatbot and get answers to your questions.',
		ogType: 'website',
		ogImageUrl: `${process.env.BASE_URL || ''}/api/og`,
		twitterCard: 'summary',
	}

	return await generateMetadataFromSEO(seoData, params)
}
