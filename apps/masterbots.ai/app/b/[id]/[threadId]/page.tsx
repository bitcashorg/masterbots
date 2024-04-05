import { getThread } from '@/services/hasura'
import { BrowseThread } from '@/components/home/browse-thread'
import { ChatPageProps } from '@/app/c/[chatbot]/[threadId]/page'
import PageProps from 'next/types'

export default async function ChatPage({ params }: ChatPageProps) {
  const thread = await getThread({
    threadId: params.threadId,
    jwt: ''
  })
  return <BrowseThread thread={thread} />
}
