import type { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: `${process.env.VERCEL_URL}`,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 1,
		},
		{
			url: `${process.env.VERCEL_URL}/c`,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.8,
		},
		{
			url: `${process.env.VERCEL_URL}/wordware`,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.5,
		},
	]
}
