import BrowseChatbotDetails from '@/components/routes/browse/browse-chatbot-details'
import BrowseSpecificThreadList from '@/components/routes/browse/browse-specific-thread-list'
import { botNames } from '@/lib/constants/bots-names'
import { generateMetadataFromSEO } from '@/lib/metadata'
import { getBrowseThreads, getChatbot } from '@/services/hasura'
import type { Metadata } from 'next'

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
    <div className="w-full">
      {chatbot ? (
        <BrowseChatbotDetails
          chatbot={chatbot}
          variant={chatbot.name ? 'selected' : 'default'}
        />
      ) : (
        ''
      )}
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

export async function generateMetadata({
  params
}: {
  params: { id: string }
}): Promise<Metadata> {
  const chatbot = await getChatbot({
    chatbotName: botNames.get(params.id),
    jwt: '',
    threads: true
  })

  const seoData = {
    title: chatbot?.name || '',
    description: chatbot?.description || '',
    ogType: 'website',
    ogImageUrl: `${process.env.BASE_URL}/api/og?threadId=${chatbot?.threads[0].threadId}`,
    twitterCard: 'summary_large_image'
  }

  return generateMetadataFromSEO(seoData)
}
