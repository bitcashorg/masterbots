import { authOptions } from '@/auth'
import ChatThreadListPanel from '@/components/routes/chat/chat-thread-list-panel'
import ThreadPanel from '@/components/routes/thread/thread-panel'
import { PAGE_SIZE } from '@/lib/constants/hasura'
import { generateMetadataFromSEO } from '@/lib/metadata'
import { type RoleTypes, isAdminOrModeratorRole } from '@/lib/utils'
import { getThreads } from '@/services/hasura'
import type { PageProps } from '@/types/types'
import { isTokenExpired } from 'mb-lib'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
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

	return generateMetadataFromSEO(seoData, params)
}
