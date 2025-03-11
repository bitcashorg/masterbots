import { authOptions } from '@/auth'
import { UserThreadList } from '@/components/routes/profile/user-thread-list'
import { botNames } from '@/lib/constants/bots-names'
import { PAGE_SM_SIZE } from '@/lib/constants/hasura'
import { getBrowseThreads, getThreads, getUserBySlug } from '@/services/hasura/hasura.service'
import type { User } from 'mb-genql'
import { getServerSession } from 'next-auth'
import { Suspense } from 'react'

export default async function ProfileChatBot({
  params,
}: {
  params: {
    slug: string
    category: string
    chatbot: string
  }
}) {
  let threads = []
  const { slug, category, chatbot } = params
  const session = await getServerSession(authOptions)
  const jwt = session ? session.user?.hasuraJwt : ''
  const { user, error } = await getUserBySlug({
    slug,
    isSameUser: session?.user.slug === slug,
  })
  if (!user) return <div>No user found</div>

  const chatbotName = (await botNames).get(chatbot)
  if (!chatbotName) {
    throw new Error(`Chatbot name for ${chatbot} not found`)
  }

  const fetchThreads = async () => {
    try {
      const isOwnProfile = session?.user?.id === user?.userId
      if (!isOwnProfile) {
        return await getBrowseThreads({
          userId: user.userId,
          chatbotName,
          limit: PAGE_SM_SIZE,
        })
      }

      if (!session?.user?.hasuraJwt) {
        throw new Error('Authentication required')
      }

      return await getThreads({
        jwt,
        userId: user.userId,
        chatbotName,
        limit: PAGE_SM_SIZE,
      })
    } catch (error) {
      console.error('Failed to fetch threads:', error)
      return []
    }
  }

  threads = await fetchThreads()

  return (
    <Suspense fallback={null}>
      <UserThreadList user={user as User} threads={threads} />
    </Suspense>
  )
}
