import { getThread } from '@/services/hasura'

export default async function ChatPage({ params }: ChatPageProps) {
  const thread = await getThread({
    threadId: params.threadId
  })

  //TODO: handle threadId not found

  return <pre>{}</pre>
}

export interface ChatPageProps {
  params: {
    threadId: string
    chatbot: string
  }
}
