import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'MasterbotsAI',
		short_name: 'Masterbots',
		description: 'Where your Ai expertise goes public',
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
