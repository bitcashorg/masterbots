import { getChatbot, getBrowseThreads } from '@/services/hasura'
import { botNames } from '@/lib/bots-names'
import BrowseListItem from '@/components/browse-list-item'
import { Thread } from 'mb-genql'
import BrowseChatbotDetails from '@/components/browse-chatbot-details'
import BrowseSpecificThreadList from '@/components/browse-specific-thread-list'

const PAGE_SIZE = 50

export default async function BotThreadsPage({
  params,
  searchParams
}: {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  let chatbot, threads
  if (searchParams?.type === 'user') {
    threads = await getBrowseThreads({
      userName: params.id,
      limit: PAGE_SIZE
    })
  } else {
    chatbot = await getChatbot({
      chatbotName: botNames.get(params.id),
      jwt: '',
      threads: true
    })
    if (!chatbot)
      throw new Error(`Chatbot ${botNames.get(params.id)} not found`)

    // session will always be defined
    threads = await getBrowseThreads({
      chatbotName: botNames.get(params.id),
      limit: PAGE_SIZE
    })
  }

  return (
    <div className="w-full py-5">
      {chatbot ? <BrowseChatbotDetails chatbot={chatbot} /> : ''}
      <BrowseSpecificThreadList
        initialThreads={threads}
        PAGE_SIZE={PAGE_SIZE}
        query={
          searchParams?.type === 'user'
            ? {
                userName: params.id
              }
            : {
                chatbotName: botNames.get(params.id)
              }
        }
      />
    </div>
  )
}
