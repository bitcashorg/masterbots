import { authOptions } from '@/auth'
import { getCategories, getUserBySlug } from '@/services/hasura'
import { ErrorComponent } from '@masterbots/mb-ui'
import type { Thread } from 'mb-genql'
import { toSlug } from 'mb-lib'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export { generateMbMetadata as generateMetadata } from '@/lib/metadata'

export default async function BrowseCategoryPage(props: {
	params: Promise<{ category: string; userSlug: string }>
}) {
	const params = await props.params
	const session = await getServerSession(authOptions)
	const threads: Thread[] = []
	const categories = await getCategories()
	const category = categories.find(
		(category) => toSlug(category.name) === params.category,
	)

	const slug = params.userSlug
	const { user, error } = await getUserBySlug({
		slug,
		isSameUser: session?.user.slug === slug,
	})

	if (!category) return <ErrorComponent message="Category not found" />
	if (error) return <ErrorComponent message={error} />

	return redirect(`/u/${slug}/t/${params.category}`)
}
