import { urlBuilders } from '@/lib/url'
import { getAllChatbots, getCategories } from '@/services/hasura'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Adding main routes
  const chatbots = await getAllChatbots()
  const categories = await getCategories()
  
  // Use urlBuilders for chatbot profile URLs
  const chatbotUrls = chatbots.map(chatbot => ({
    url: urlBuilders.profilesUrl({ type: 'chatbot', chatbot: chatbot.name }),
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7
  })) as MetadataRoute.Sitemap
  
  // Use urlBuilders for category URLs
  const personalCategoryUrls = categories.map(category => ({
    url: urlBuilders.topicThreadListUrl({ type: 'personal', category: category.name }),
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6
  })) as MetadataRoute.Sitemap
  
  const publicCategoryUrls = categories.map(category => ({
    url: urlBuilders.topicThreadListUrl({ type: 'public', category: category.name }),
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6
  })) as MetadataRoute.Sitemap
  
  // Use urlBuilders for nested URLs
  const publicNestedUrls = categories.flatMap((category) =>
    category.chatbots.map((chatbot) => ({
      url: urlBuilders.chatbotThreadListUrl({
        type: 'public',
        category: category.name,
        domain: chatbot.chatbot.metadata[0]?.domainName || 'prompt',
        chatbot: chatbot.chatbot.name
      }),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
  ) as MetadataRoute.Sitemap
  
  const personalNestedUrls = categories.flatMap((category) =>
    category.chatbots.map((chatbot) => ({
      url: urlBuilders.chatbotThreadListUrl({
        type: 'personal',
        category: category.name,
        domain: chatbot.chatbot.metadata[0]?.domainName || 'prompt',
        chatbot: chatbot.chatbot.name,
      }),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    })),
  ) as MetadataRoute.Sitemap

  // Additional configurations from robots.ts
  const publicNestedRawUrls = categories.flatMap((category) =>
    category.chatbots.map((chatbot) => ({
      url: urlBuilders.chatbotThreadListUrl({
        type: 'public',
        raw: true,
        category: category.name,
        domain: chatbot.chatbot.metadata[0]?.domainName || 'prompt',
        chatbot: chatbot.chatbot.name
      }),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    })),
  ) as MetadataRoute.Sitemap
  
  const personalNestedRawUrls = categories.flatMap((category) =>
    category.chatbots.map((chatbot) => ({
      url: urlBuilders.chatbotThreadListUrl({
        type: 'personal',
        raw: true,
        category: category.name,
        domain: chatbot.chatbot.metadata[0]?.domainName || 'prompt',
        chatbot: chatbot.chatbot.name,
      }),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    })),
  ) as MetadataRoute.Sitemap

  const categoryUrls = [...personalCategoryUrls, ...publicCategoryUrls]

  return [
    {
      url: `${process.env.BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${process.env.BASE_URL}/c`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${process.env.BASE_URL}/wordware`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    ...chatbotUrls,
    ...categoryUrls,
    ...publicNestedUrls,
    ...personalNestedUrls,
    ...publicNestedRawUrls,
    ...personalNestedRawUrls,
  ]
}
