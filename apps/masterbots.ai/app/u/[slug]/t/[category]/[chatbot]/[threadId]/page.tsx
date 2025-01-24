import { BrowseChatMessageList } from '@/components/routes/browse/browse-chat-message-list'
import { getThread } from '@/services/hasura'
import { User } from 'mb-genql'

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

  if(!thread){
    return <div>Thread not found</div>
  }
  const { user, chatbot, messages } = thread

  return (
    <BrowseChatMessageList
        user={user as User | undefined}
        chatbot={chatbot}
        messages={messages}
        isThread
      />
  )
}
