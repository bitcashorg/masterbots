import { authOptions } from '@/auth'
import { getCategories, getUserBySlug } from '@/services/hasura'
import type { Thread } from 'mb-genql'
import { toSlug } from 'mb-lib'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function BrowseCategoryPage(
  props: {
    params: Promise<{ category: string; slug: string }>
  }
) {
  const params = await props.params;
  const session = await getServerSession(authOptions)
  const threads: Thread[] = []
  const categories = await getCategories()
  const category = categories.find((category) => toSlug(category.name) === params.category)

  const slug = params.slug
  const { user, error } = await getUserBySlug({
    slug,
    isSameUser: session?.user.slug === slug,
  })

  if (!category)
    return (
      <div className="text-center p-4">
        Category <strong>{params.category}</strong> not found
      </div>
    )
  if (error)
    return (
      <div className="text-center p-4">
        Error loading profile: <strong>{error}</strong>
      </div>
    )

  return redirect(`/u/${params.slug}/t/${params.category}`)
}
