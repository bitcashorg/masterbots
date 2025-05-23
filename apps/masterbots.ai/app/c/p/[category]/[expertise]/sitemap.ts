import { getCategories } from '@/services/hasura'
import { toSlug } from 'mb-lib'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const categories = await getCategories()
	return categories.map((category) => ({
		// TODO: updatge expertise parameter
		url: `${process.env.VERCEL_URL}/c/p/${toSlug(category.name)}/expertise`,
		lastModified: new Date(),
	}))
}
