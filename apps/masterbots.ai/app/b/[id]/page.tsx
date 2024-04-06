import { getChatbot, getBrowseThreads } from '@/services/hasura'
import { botNames } from '@/lib/bots-names'
import BrowseChatbotDetails from '@/components/browse/browse-chatbot-details'
import BrowseSpecificThreadList from '@/components/browse/browse-specific-thread-list'

const PAGE_SIZE = 50

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

  // session will always be defined
  threads = await getBrowseThreads({
    chatbotName: botNames.get(params.id),
    limit: PAGE_SIZE
  })

  return (
    <div className="w-full py-5">
      {chatbot ? <BrowseChatbotDetails chatbot={chatbot} /> : ''}
      <BrowseSpecificThreadList
        initialThreads={threads}
        PAGE_SIZE={PAGE_SIZE}
        query={{
          chatbotName: botNames.get(params.id)
        }}
        pageType="bot"
      />
    </div>
  )
}
