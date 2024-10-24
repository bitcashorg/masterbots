import { redirect } from 'next/navigation'
import { getThread } from '@/services/hasura'
// import { ChatPageProps } from '@/app/c/[category]/[chatbot]/page'

export { generateMbMetadata as generateMetadata } from '@/lib/metadata'

export default async function ChatPage({ params }: any) {
  const thread = await getThread({
    threadId: params.threadId,
    jwt: ''
  })
  redirect(`/b/${thread.chatbot.name}/${thread.threadId}`)
}
