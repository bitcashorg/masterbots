import BrowseList from '@/components/routes/browse/browse-list'
import { BrowseSearchInput } from '@/components/routes/browse/browse-search-input'
import { botNames } from '@/lib/constants/bots-names'
import { PAGE_SIZE } from '@/lib/constants/hasura'
import { generateMetadataFromSEO } from '@/lib/metadata'
import { getChatbot, getThreads } from '@/services/hasura'
import type { Metadata } from 'next'

export default async function BrowseCategoryChatbotPage({
  params
}: {
  params: { category: string, chatbot: string }
}) {
  const chatbotName = (await botNames).get(params.chatbot);
  if (!chatbotName) {
    throw new Error(`Chatbot name for ${params.chatbot} not found`);
  }
  const chatbot = await getChatbot({ chatbotName, jwt: "" });

  if (!chatbot)
    throw new Error(`Chatbot ${chatbotName} not found`);
  
  const threads = await getThreads({ chatbotName, limit: PAGE_SIZE, jwt: '' });

  return (
    <div className="w-full max-w-screen-lg pb-10 mx-auto">
      {/* <BrowseCategoryTabs
        initialCategory={params.category}
        categories={categories}
      /> */}
      <BrowseSearchInput />
      <BrowseList 
        categoryId={chatbot.categories[0].categoryId}
        chatbot={chatbot}
        initialThreads={threads}
      />
    </div>
  )
}

export async function generateMetadata({
  params,
}: {
  params: { chatbot: string };
}): Promise<Metadata> {
  const chatbotName = (await botNames).get(params.chatbot);
  const chatbot = await getChatbot({ chatbotName, jwt: "" });

  const seoData = {
    title: chatbotName || "",
    description: chatbot.description || "",
    ogType: "website",
    ogImageUrl: `${process.env.BASE_URL}/api/og?chatbotId=${chatbot.chatbotId}`,
    twitterCard: "summary",
  };

  return generateMetadataFromSEO(seoData);
}
