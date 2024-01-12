import { auth } from '@/auth'
import ThreadPanel from '@/components/thread-panel'
import { getThreads } from '@/services/hasura'
import { signOut } from 'next-auth/react'

export default async function IndexPage() {
  const session = await auth()

  const threads = await getThreads({
    jwt: session!.user.hasuraJwt,
    userId: session!.user.id
  })
  return <ThreadPanel threads={threads} />
}
