import { Hero } from '@/components/layout/profile/hero'
import { UserProfileSidebar } from '@/components/layout/profile/profile-page-sidebar'
import { getUserBySlug } from '@/services/hasura'
import type { PageProps } from '@/types/types'
import type { User } from 'mb-genql'
import { getServerSession } from 'next-auth'
import NextTopLoader from 'nextjs-toploader'

interface ProfileLayoutProps extends PageProps {
	children: React.ReactNode
}

export default async function ProfilePageLayout({
	children,
	params,
}: ProfileLayoutProps) {
	const session = await getServerSession()
	const { userSlug } = await params
	const { user } = await getUserBySlug({
		slug: userSlug as string,
		isSameUser: session?.user.slug === userSlug,
	})
	return (
		<main className="flex flex-col p-0">
			<NextTopLoader color="#1ED761" initialPosition={0.2} />
			<Hero user={user as User} />
			<UserProfileSidebar>
				<div className="h-full px-4 md:px-10">{children}</div>
			</UserProfileSidebar>
		</main>
	)
}
