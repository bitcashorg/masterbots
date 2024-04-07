import { getChatbot, getBrowseThreads } from '@/services/hasura'
import { botNames } from '@/lib/bots-names'
import BotDetails from '@/components/b/bot-details'

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

  threads = await getBrowseThreads({
    chatbotName: botNames.get(params.id),
    limit: PAGE_SIZE
  })

  return (
    <div className="w-full py-5">
      <BotDetails chatbot={chatbot} />
    </div>
  )
}
