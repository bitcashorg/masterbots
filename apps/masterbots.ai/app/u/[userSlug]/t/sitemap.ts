import { getUsers } from '@/services/hasura'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const users = await getUsers()
  return users.map((user) => ({
    url: `${process.env.VERCEL_URL}/u/${user.slug}/t`,
    lastModified: new Date(),
  }))
}
