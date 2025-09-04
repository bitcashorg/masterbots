import { authOptions } from '@/auth'
import { Pro } from '@/components/routes/pro/pro'
import Subscription from '@/components/routes/subscription/subscription'
import ThreadPanel from '@/components/routes/thread/thread-panel'
import { generateMetadataFromSEO } from '@/lib/metadata'
import { getThreads } from '@/services/hasura'
import type { PageProps } from '@/types'
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

	const { threads, count } = await getThreads({
		jwt,
		userId: session?.user.id,
	})

	return (
		<>
			<ThreadPanel threads={threads} count={count} />
			<Pro showChatPanel={false} />
			<Subscription />
		</>
	)
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
	const params = await props.params
	const seoData = {
		title: 'Pro page',
		description:
			'Masterbots Subscription plans, Subscribe to our service and stay updated',
		ogType: 'website',
		ogImageUrl: '',
		twitterCard: 'summary',
	}

	return await generateMetadataFromSEO(seoData, params)
}
