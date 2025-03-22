import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'Masterbots.ai',
		short_name: 'Mbots',
		description:
			'Elevating AI Beyond ChatGPT: Specialized Chatbots, Social Sharing and User-Friendly Innovation',
		start_url: '/',
		display: 'standalone',
		background_color: '#0f121f',
		theme_color: '#83E56A',
		icons: [
			{
				src: '/images/robohash1.png',
				sizes: '192x192',
				type: 'image/png',
			},
			{
				src: '/images/robohash1.png',
				sizes: '512x512',
				type: 'image/png',
			},
		],
	}
}
