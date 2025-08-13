import { authOptions } from '@/auth'
import { Preferences } from '@/components/routes/preferences/preferences'
import { ErrorComponent } from '@/components/shared/error'
import type { PageProps } from '@/types/types'
import { getServerSession } from 'next-auth'

export default async function PreferencePage(props: PageProps) {
	const params = await props.params
	const userSlug = params.userSlug
	const session = await getServerSession(authOptions)
	if (!userSlug) return <ErrorComponent message="User slug is required" />
	if (!session)
		return <ErrorComponent message="You must be logged in to view this page" />
	if (!session || !session.user || session.user.slug !== userSlug)
		return <ErrorComponent message={`Login as ${userSlug} to view this page`} />

	return (
		<div className="max-w-screen-xl pb-10 mx-auto w-full py-[120px] px-[58px]">
			<Preferences />
		</div>
	)
}
