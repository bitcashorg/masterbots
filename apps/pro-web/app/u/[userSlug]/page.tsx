import type { PageProps } from '@/types/types'
import { redirect } from 'next/navigation'

export default async function ProfilePageDefaultRedirect(props: PageProps) {
	const params = await props.params
	// Redirect to the user's profile page
	return redirect(`/u/${params.userSlug}/t`)
}
