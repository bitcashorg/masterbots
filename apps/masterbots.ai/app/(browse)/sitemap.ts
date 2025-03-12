import { getAllChatbots, getCategories } from '@/services/hasura'
import { toSlug } from 'mb-lib'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Adding main routes
  // TODO: domain and slugify thread titles + thread inner questions
  const chatbots = await getAllChatbots()
  const categories = await getCategories()
  const chatbotUrls = chatbots.map(chatbot => ({
    url: `${process.env.BASE_URL}/b/${toSlug(chatbot.name)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7
  })) as MetadataRoute.Sitemap
  const personalCategoryUrls = categories.map(category => ({
    url: `${process.env.BASE_URL}/c/${toSlug(category.name)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6
  })) as MetadataRoute.Sitemap
  const publicCategoryUrls = categories.map(category => ({
    url: `${process.env.BASE_URL}/${toSlug(category.name)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6
  })) as MetadataRoute.Sitemap
  const publicNestedUrls = categories.flatMap((category) =>
    category.chatbots.map((chatbot) => ({
      // TODO: slugify domainName
      // url: `${process.env.BASE_URL}/${toSlug(category.name)}/${chatbot.chatbot.metadata[0].domainName}/${toSlug(chatbot.chatbot.name)}`,
      url: `${process.env.BASE_URL}/${toSlug(category.name)}/${toSlug(chatbot.chatbot.name)}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
  ) as MetadataRoute.Sitemap
  const personalNestedUrls = categories.flatMap((category) =>
    category.chatbots.map((chatbot) => ({
      // TODO: slugify domainName
      // url: `${process.env.BASE_URL}/c/${toSlug(category.name)}/${chatbot.chatbot.metadata[0].domainName}/${toSlug(chatbot.chatbot.name)}`,
      url: `${process.env.BASE_URL}/c/${toSlug(category.name)}/${toSlug(chatbot.chatbot.name)}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
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
  ]
}
