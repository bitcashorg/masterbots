import { authOptions } from '@/auth'
import { UserThreadList } from '@/components/routes/profile/user-thread-list'
import { ErrorComponent } from '@/components/shared/error'
import { generateMetadataFromSEO } from '@/lib/metadata'
import {
	getBrowseThreads,
	getThreads,
	getUserBySlug,
	getUserInfoFromBrowse,
} from '@/services/hasura'
import type { PageProps } from '@/types'
import type { Thread, User } from 'mb-genql'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'

export default async function ProfilePage(props: {
	params: PageProps['params']
}) {
	const params = await props.params
	let threadsResults: {
		threads: Thread[]
		count: number
	} = {
		threads: [],
		count: 0,
	}
	const slug = params.userSlug as string

	const session = await getServerSession(authOptions)
	const { user, error } = await getUserBySlug({
		slug,
		isSameUser: session?.user.slug === slug,
	})

	if (error)
		return <ErrorComponent message={`Error loading profile: ${error}`} />
	if (!user) return <ErrorComponent message="User not found" />

	const fetchThreads = async () => {
		try {
			const isOwnProfile = session?.user?.id === user?.userId
			if (!isOwnProfile) {
				return await getBrowseThreads({
					userId: user.userId,
				})
			}

			if (!session?.user?.hasuraJwt) {
				throw new Error('Authentication required')
			}

			return await getThreads({
				jwt: session.user.hasuraJwt,
				userId: user.userId,
			})
		} catch (error) {
			console.error('Failed to fetch threads:', error)
			return {
				threads: [],
				count: 0,
			}
		}
	}

	threadsResults = await fetchThreads()

	return (
		<UserThreadList
			user={user as User}
			count={threadsResults.count}
			threads={threadsResults.threads}
		/>
	)
}

export async function generateMetadata(props: {
	params: PageProps['params']
}): Promise<Metadata> {
	const params = await props.params
	const user = await getUserInfoFromBrowse(params.userSlug as string)

	const seoData = {
		title: user?.username || '',
		description: user?.bio || '',
		ogType: 'website',
		ogImageUrl: user ? `/api/og?userSlug=${params.userSlug}` : '',
		twitterCard: 'summary_large_image',
	}

	return await generateMetadataFromSEO(seoData, params)
}
