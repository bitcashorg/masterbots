import { Hero } from '@/components/layout/profile/hero'
import { ProfileLayoutContent } from '@/components/layout/profile/layout'
import { UserProfileSidebar } from '@/components/layout/profile/profile-page-sidebar'
import { BrowseProvider } from '@/lib/hooks/use-browse'
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
		// <section className="flex flex-col p-0">
		<BrowseProvider>
			<ProfileLayoutContent user={user as User}>
				{children}
			</ProfileLayoutContent>
		</BrowseProvider>
	)
}
