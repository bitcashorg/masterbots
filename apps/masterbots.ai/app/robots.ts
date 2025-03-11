import { urlBuilders } from '@/lib/url'
import { getAllChatbots, getCategories } from '@/services/hasura'
import type { MetadataRoute } from 'next'

export default async function robots(): Promise<MetadataRoute.Robots> {
  // Adding main routes
  // TODO: domain and slugify thread titles + thread inner questions
  const chatbots = await getAllChatbots()
  const categories = await getCategories()
  
  // Use urlBuilders for chatbot profile URLs
  const chatbotUrls = chatbots.map(chatbot =>
    urlBuilders.profilesUrl({ type: 'chatbot', chatbot: chatbot.name })
  )
  
  // Use urlBuilders for category URLs
  const personalCategoryUrls = categories.map(category =>
    urlBuilders.topicThreadListUrl({ type: 'personal', category: category.name })
  )
  
  const publicCategoryUrls = categories.map(category =>
    urlBuilders.topicThreadListUrl({ type: 'public', category: category.name })
  )
  
  // Use urlBuilders for nested URLs
  const publicNestedUrls = categories.flatMap((category) =>
    category.chatbots.map((chatbot) =>
      urlBuilders.chatbotThreadListUrl({
        type: 'public',
        category: category.name,
        domain: chatbot.chatbot.metadata[0].domainName,
        chatbot: chatbot.chatbot.name
      })
    )
  )
  const publicNestedRawUrls = categories.flatMap((category) =>
    category.chatbots.map((chatbot) =>
      urlBuilders.chatbotThreadListUrl({
        type: 'public',
        raw: true,
        category: category.name,
        domain: chatbot.chatbot.metadata[0].domainName,
        chatbot: chatbot.chatbot.name
      })
    )
  )
  
  const personalNestedUrls = categories.flatMap((category) =>
    category.chatbots.map((chatbot) =>
      urlBuilders.chatbotThreadListUrl({
        type: 'personal',
        category: category.name,
        domain: chatbot.chatbot.metadata[0].domainName,
        chatbot: chatbot.chatbot.name,
      }),
    ),
  )
  const personalNestedRawUrls = categories.flatMap((category) =>
    category.chatbots.map((chatbot) =>
      urlBuilders.chatbotThreadListUrl({
        type: 'personal',
        raw: true,
        category: category.name,
        domain: chatbot.chatbot.metadata[0].domainName,
        chatbot: chatbot.chatbot.name,
      }),
    ),
  )

  const personalPublicThreadsWildcards = personalNestedUrls.map((url) => `${url}/*`)
  const personalPublicRawThreadsWildcards = personalNestedUrls.map((url) => `${url}/*`)
  
  const publicPublicThreadsWildcards = publicNestedUrls.map((url) => `${url}/*`) 
  const publicPublicRawThreadsWildcards = publicNestedUrls.map((url) => `${url}/*`)

  const chatbotProfilesWildcards = chatbotUrls.map((url) => `${url}/*`)
  const chatbotProfilesRawWildcards = chatbotUrls.map((url) => `${url}/*`)
  
  return {
    rules: {
      userAgent: '*',
      allow: [
        ...personalNestedUrls,
        ...publicNestedUrls,
        ...personalNestedRawUrls,
        ...publicNestedRawUrls,
        ...personalCategoryUrls,
        ...publicCategoryUrls,
        ...chatbotUrls,
        ...personalPublicThreadsWildcards,
        ...personalPublicRawThreadsWildcards,
        ...publicPublicThreadsWildcards,
        ...publicPublicRawThreadsWildcards,
        ...chatbotProfilesWildcards,
        ...chatbotProfilesRawWildcards,
      ],
      disallow: '/c/p',
    },
    sitemap: `${process.env.BASE_URL}/sitemap.xml`,
  }
}