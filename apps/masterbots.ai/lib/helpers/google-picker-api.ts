declare global {
	interface Window {
		gapi: {
			load: (api: string, callback: () => void) => void
			client: {
				init: (config: object) => Promise<void>
				[key: string]: any
			}
			auth2?: {
				init: (options: object) => any
				getAuthInstance: () => any
			}
			[key: string]: any
		}
		google: any
	}
}

export const loadGoogleApi = (): Promise<void> => {
	return new Promise<void>((resolve, reject) => {
		if (window.gapi) {
			resolve()
		} else {
			const script = document.createElement('script')
			script.src = 'https://apis.google.com/js/api.js'
			script.onload = () => resolve()
			script.onerror = (e) => reject(e)
			document.body.appendChild(script)
		}
	})
}

export const loadGooglePickerApi = (): Promise<void> => {
	return new Promise<void>((resolve, reject) => {
		if (window?.google.picker) {
			resolve()
		} else {
			const script = document.createElement('script')
			script.src = 'https://apis.google.com/js/platform.js'
			script.onload = () => {
				window.gapi.load('picker', { callback: resolve })
			}
			script.onerror = (e) => reject(e)
			document.body.appendChild(script)
		}
	})
}
