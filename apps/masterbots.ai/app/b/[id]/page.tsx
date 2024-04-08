import { getChatbot, getBrowseThreads } from '@/services/hasura'
import { botNames } from '@/lib/bots-names'
import ThreadList from '@/components/shared/thread-list'
import AccountDetails from '@/components/shared/account-details'

export default async function BotThreadsPage({
  params
}: {
  params: { id: string }
}) {
  let chatbot, threads

  chatbot = await getChatbot({
    chatbotName: botNames.get(params.id),
    jwt: '',
    threads: true
  })
  if (!chatbot) throw new Error(`Chatbot ${botNames.get(params.id)} not found`)

  threads = await getBrowseThreads({
    chatbotName: botNames.get(params.id),
    limit: 50
  })

  return (
    <div className="w-full py-5">
      <AccountDetails
        href={`/b/${chatbot.name.toLowerCase()}`}
        alt={chatbot.name}
        chatbotName={chatbot.name}
        avatar={chatbot.avatar}
        description={chatbot.description}
        threadNum={threads.length}
      />
      <div className="container">
        <ThreadList initialThreads={threads} />
      </div>
    </div>
  )
}
