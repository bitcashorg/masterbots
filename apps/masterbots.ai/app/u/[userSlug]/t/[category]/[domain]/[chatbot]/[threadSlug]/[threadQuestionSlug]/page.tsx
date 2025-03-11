import { BrowseThreadBlog } from '@/components/routes/browse/browse-thread-blog'
import { getThread } from '@/services/hasura'
import type { User } from 'mb-genql'
import { getServerSession } from 'next-auth'

export { generateMbMetadata as generateMetadata } from '@/lib/metadata'

interface ThreadPageProps {
  params: {
    category: string
    domain: string
    threadSlug: string
    chatbot: string
  }
}


export default async function ThreadQuestionPage({ params }: ThreadPageProps) {
  const thread = await getThread({
    threadSlug: params.threadSlug,
    domain: params.domain,
    jwt: '',
  })
  const session = await getServerSession()

  if (!thread) {
    return <div>Thread not found</div>
  }
  const { threadId } = thread

  return <BrowseThreadBlog threadId={threadId} user={session?.user as unknown as User} />
}
