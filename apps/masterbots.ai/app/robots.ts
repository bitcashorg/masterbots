import { getAllChatbots, getCategories } from '@/services/hasura'
import { toSlug } from 'mb-lib'
import type { MetadataRoute } from 'next'

export default async function robots(): Promise<MetadataRoute.Robots> {
  // Adding main routes
  // TODO: domain and slugify thread titles + thread inner questions
  const chatbots = await getAllChatbots()
  const categories = await getCategories()
  const chatbotUrls = chatbots.map(chatbot =>
    `${process.env.BASE_URL}/b/${toSlug(chatbot.name)}`,
  )
  const personalCategoryUrls = categories.map(category =>
    `${process.env.BASE_URL}/c/${toSlug(category.name)}`,
  )
  const publicCategoryUrls = categories.map(category =>
    `${process.env.BASE_URL}/${toSlug(category.name)}`,
  )
  const publicNestedUrls = categories.flatMap((category) =>
    category.chatbots.map((chatbot) =>
      // TODO: slugify domainName
      // `${process.env.BASE_URL}/${toSlug(category.name)}/${chatbot.chatbot.metadata[0].domainName}/${chatbot.chatbot.name}`,
      `${process.env.BASE_URL}/${toSlug(category.name)}/${toSlug(chatbot.chatbot.name)}`,
    ),
  )
  const personalNestedUrls = categories.flatMap((category) =>
    category.chatbots.map(
      (chatbot) =>
        // TODO: slugify domainName
        // `${process.env.BASE_URL}/c/${toSlug(category.name)}/${toSlug(chatbot.chatbot.metadata[0].domainName)}/${toSlug(chatbot.chatbot.name)}`,
        `${process.env.BASE_URL}/c/${toSlug(category.name)}/${toSlug(chatbot.chatbot.name)}`,
    ),
  )
  return {
    rules: {
      userAgent: '*',
      allow: [
        ...personalNestedUrls,
        ...publicNestedUrls,
        ...personalCategoryUrls,
        ...publicCategoryUrls,
        ...chatbotUrls,
      ],
      disallow: '/c/p',
    },
    sitemap: ['/sitemap.xml'],
  }
}