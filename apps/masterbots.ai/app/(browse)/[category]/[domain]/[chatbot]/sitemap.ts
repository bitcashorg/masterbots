import { getCategories } from '@/services/hasura'
import { toSlug } from 'mb-lib'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categories = await getCategories()
  return categories.map((category) => ({
    url: `${process.env.VERCEL_URL}/${toSlug(category.name)}`,
    lastModified: new Date(),
  }))
}
