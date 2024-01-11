import { auth } from '@/auth'
import ThreadPanel from '@/components/thread-panel'
import { getThreads } from '@/services/hasura'

export default async function IndexPage() {
  const session = await auth()
  if (!session?.user)
    throw new Error(
      'This should never happen, seems like .next cache or middleware problem'
    )

  const threads = await getThreads({
    jwt: session!.user.hasuraJwt,
    userId: session!.user.id
  })
  return <ThreadPanel threads={threads} />
}
