import BrowseChatbotDetails from '@/components/routes/browse/browse-chatbot-details'
import { BrowseSearchInput } from '@/components/routes/browse/browse-search-input'
import BrowseSpecificThreadList from '@/components/routes/browse/browse-specific-thread-list'
import { botNames } from '@/lib/constants/bots-names'
import { PAGE_SIZE } from '@/lib/constants/hasura'
import { generateMetadataFromSEO } from '@/lib/metadata'
import { getBrowseThreads, getChatbot } from '@/services/hasura'
import type { Metadata } from 'next'

export default async function BotThreadsPage({
  params
}: {
  params: { id: string }
}) {
  const chatbotName = (await botNames).get(params.id)
  let chatbot, threads

  chatbot = await getChatbot({
    chatbotName,
    jwt: '',
    threads: true
  })
  if (!chatbot) throw new Error(`Chatbot ${chatbotName} not found`)

  // session will always be defined
  threads = await getBrowseThreads({
    chatbotName,
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
       <BrowseSearchInput />
      <BrowseSpecificThreadList
        initialThreads={threads}
        PAGE_SIZE={PAGE_SIZE}
        query={{
          chatbotName
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
  const chatbotName = (await botNames).get(params.id)
  const chatbot = await getChatbot({
    chatbotName,
    jwt: '',
    threads: true
  })

  const seoData = {
    title: chatbot?.name || '',
    description: chatbot?.description || '',
    ogType: 'website',
    ogImageUrl: chatbot?.threads?.[0]?.threadId
      ? `${process.env.BASE_URL || ''}/api/og?threadId=${chatbot.threads[0].threadId}`
      : `${process.env.BASE_URL || ''}/api/og`,
    twitterCard: 'summary_large_image'
  }

  return generateMetadataFromSEO(seoData)
}
