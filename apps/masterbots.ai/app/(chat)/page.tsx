import ThreadPanel from '@/components/thread-panel'
import { getThreads } from '@/services/hasura'

export default async function IndexPage() {
  const threads = await getThreads({})
  return <ThreadPanel threads={threads} />
}
