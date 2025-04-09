import BrowseUserDetails from '@/components/routes/browse/browse-user-details'
import { Receipt } from '@/components/routes/subscription/receipt'
import { isTokenExpired } from 'mb-lib'
import { redirect } from 'next/navigation'

import { authOptions } from '@/auth'
import { generateMetadataFromSEO } from '@/lib/metadata'
import { getBrowseThreads } from '@/services/hasura'
import type { User } from 'mb-genql'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'

interface IndexPageProps {
	params: Promise<{
		intentId: string
	}>
}

export default async function IndexPage(props: IndexPageProps) {
	const { intentId } = await props.params

	const session = await getServerSession(authOptions)
	// NOTE: maybe we should use same expiration time
	const jwt = session?.user?.hasuraJwt
	if (!jwt || isTokenExpired(jwt)) {
		redirect('/auth/signin')
	}

	const { threads } = await getBrowseThreads({
		userId: session?.user.id,
		limit: 1,
	})
	let user: User | null
	if (threads.length > 0) {
		user = threads[0]?.user
	} else {
		user = {
			username: session?.user.name,
			email: session?.user.email,
			profilePicture: session?.user.image,
		} as User
	}

	const UserInfo = () => (user ? <BrowseUserDetails user={user} /> : null)

	const SubscriptionHeader = () => (
		<div className="text-center w-full dark:bg-[#09090B] bg-white py-5 ">
			<h2 className="text-[36px] font-bold">
				Masterbots Pro <br /> Subscription
			</h2>
		</div>
	)

	return (
		<div className="flex flex-col w-full">
			<UserInfo />
			<SubscriptionHeader />
			<Receipt intentid={intentId} />
		</div>
	)
}

export async function generateMetadata(
	props: IndexPageProps,
): Promise<Metadata> {
	const params = await props.params

	const seoData = {
		title: 'Masterbots Pro Subscription',
		description: 'Masterbots Pro Subscription',
		ogType: 'website',
		ogImageUrl: '',
		twitterCard: 'summary',
	}

	return generateMetadataFromSEO(seoData, params)
}
