'use client'

import { useEffect } from 'react'

export function ServiceWorkerRegistration() {
	useEffect(() => {
		if ('serviceWorker' in navigator) {
			window.addEventListener('load', () => {
				navigator.serviceWorker
					.register('/sw.js')
					.then((registration) => {
						console.log(
							'GraphQL cache service worker registered:',
							registration.scope,
						)
					})
					.catch((error) => {
						console.error('Service worker registration failed:', error)
					})
			})
		}
	}, [])

	return null
}
