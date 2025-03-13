import { authOptions } from '@/auth'
import { UserThreadList } from '@/components/routes/profile/user-thread-list'
import { getBrowseThreads, getCategories, getThreads, getUserBySlug } from '@/services/hasura'
import type { Thread, User } from 'mb-genql'
import { toSlug } from 'mb-lib'
import { getServerSession } from 'next-auth'

export default async function BrowseCategoryPage(
  props: {
    params: Promise<{ category: string; slug: string }>
  }
) {
  const params = await props.params;
  const session = await getServerSession(authOptions)
  let threads: Thread[] = []
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
  if (!user)
    return (
      <div className="text-center p-4">
        User <strong>{params.slug}</strong> not found
      </div>
    )

  const fetchThreads = async () => {
    try {
      const isOwnProfile = session?.user?.id === user?.userId
      if (!isOwnProfile) {
        return await getBrowseThreads({
          userId: user.userId,
          categoryId: category?.categoryId,
        })
      }

      if (!session?.user?.hasuraJwt) {
        throw new Error('Authentication required')
      }

      return await getThreads({
        jwt: session.user.hasuraJwt,
        userId: user.userId,
        categoryId: category?.categoryId,
      })
    } catch (error) {
      console.error('Failed to fetch threads:', error)
      return []
    }
  }

  threads = await fetchThreads()

  return <UserThreadList user={user as User} threads={threads} />
}
