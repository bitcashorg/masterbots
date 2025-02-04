import { BrowseThreadBlog } from '@/components/routes/browse/browse-thread-blog'
import { getThread } from '@/services/hasura'
import { User } from 'mb-genql'
import { getServerSession } from 'next-auth'

interface ThreadPageProps {
  params: {
    category: string
    threadId: string
    chatbot: string
  }
}
export default async function ThreadPage({ params }: ThreadPageProps) {
  const thread = await getThread({
    threadId: params.threadId,
    jwt: ''
  })
  const session = await getServerSession()

  if (!thread) {
    return <div>Thread not found</div>
  }
  const { threadId } = thread

  return (
    <BrowseThreadBlog threadId={threadId} user={session?.user as unknown as User} />
  )
}
