import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: `${process.env.VERCEL_URL}/c/p`,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 1,
		},
	]
}
