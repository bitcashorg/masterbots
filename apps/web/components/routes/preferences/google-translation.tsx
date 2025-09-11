'use client'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { languageOptions } from '@/lib/constants/preferences'
import type { GoogleTranslateProps } from '@/types/types'
import { useEffect, useRef, useState } from 'react'

const GoogleTranslate: React.FC<GoogleTranslateProps> = ({
	pageLanguage = 'en',
	includedLanguages = 'es,fr,de,it,pt,ru,ja,ko,zh,ar,en',
}) => {
	const initialized = useRef(false)
	const containerRef = useRef<HTMLDivElement>(null)
	const [currentLanguage, setCurrentLanguage] = useState('en')

	const handleLanguageChange = (langCode: string) => {
		setCurrentLanguage(langCode)

		// biome-ignore lint/complexity/useOptionalChain: <explanation>
		if (window.google && window.google.translate) {
			try {
				const translateInstance = window.google.translate._getInstanceIfExists()
				if (translateInstance) {
					translateInstance.translatePage(pageLanguage, langCode)
					console.log('Translation triggered via Google API')
					return
				}
			} catch (error) {
				console.log('Method 1 failed:', error)
			}
		}

		try {
			const currentUrl = window.location.href
			const baseUrl = currentUrl.split('#')[0].split('?')[0]

			if (langCode === 'en') {
				// Reset to original language
				if (currentUrl.includes('googtrans')) {
					window.location.href = baseUrl
					return
				}
			} else {
				// Redirect with Google Translate parameters
				const translateUrl = `${baseUrl}#googtrans(${pageLanguage}|${langCode})`
				window.location.href = translateUrl
				window.location.reload()
				return
			}
		} catch (error) {
			console.log('Method 2 failed:', error)
		}

		try {
			document.cookie = `googtrans=/en/${langCode}; domain=${window.location.hostname}; path=/`
			window.location.reload()
		} catch (error) {
			console.log('Method 3 failed:', error)
		}
	}

	const getSelectedLanguage = () => {
		return (
			languageOptions.find((lang) => lang.value === currentLanguage) ||
			languageOptions[0]
		)
	}

	useEffect(() => {
		if (initialized.current) return

		const initializeTranslate = () => {
			if (window.google?.translate?.TranslateElement && containerRef.current) {
				containerRef.current.innerHTML = ''

				new window.google.translate.TranslateElement(
					{
						pageLanguage: pageLanguage,
						includedLanguages: includedLanguages,
						layout:
							window.google.translate.TranslateElement.InlineLayout.SIMPLE,
						autoDisplay: false,
						multilanguagePage: true,
					},
					containerRef.current,
				)

				initialized.current = true
				console.log('Google Translate initialized')
			}
		}

		window.googleTranslateElementInit = initializeTranslate

		if (!document.querySelector('script[src*="translate.google.com"]')) {
			const script = document.createElement('script')
			script.src =
				'//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
			script.async = true
			document.head.appendChild(script)
		} else if (window.google?.translate) {
			initializeTranslate()
		}

		// Check URL on load for existing translation
		const checkCurrentTranslation = () => {
			const url = window.location.href
			const hash = window.location.hash

			if (hash.includes('googtrans')) {
				const match = hash.match(/googtrans\([^|]*\|([^)]*)\)/)
				// biome-ignore lint/complexity/useOptionalChain: <explanation>
				if (match && match[1]) {
					setCurrentLanguage(match[1])
				}
			}
		}

		checkCurrentTranslation()

		return () => {
			initialized.current = false
			if (containerRef.current) {
				containerRef.current.innerHTML = ''
			}
		}
	}, [pageLanguage, includedLanguages])

	return (
		<>
			<Select value={currentLanguage} onValueChange={handleLanguageChange}>
				<SelectTrigger>
					<SelectValue>
						<div className="flex items-center gap-2">
							<span>{getSelectedLanguage().flag}</span>
							<span>{getSelectedLanguage().label}</span>
						</div>
					</SelectValue>
				</SelectTrigger>
				<SelectContent>
					{languageOptions.map((lang) => (
						<SelectItem key={lang.value} value={lang.value}>
							<div className="flex items-center gap-2">
								<span>{lang.flag}</span>
								<span>{lang.label}</span>
							</div>
						</SelectItem>
					))}
				</SelectContent>
			</Select>

			{/* Hidden Google Translate widget - keeping it visible for debugging */}
			<div ref={containerRef} />
		</>
	)
}

export default GoogleTranslate
