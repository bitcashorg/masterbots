// components/GoogleTranslate.tsx
'use client'

import { useEffect, useRef, useState } from 'react'

declare global {
	interface Window {
		googleTranslateElementInit: () => void
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		google: any
	}
}

interface GoogleTranslateProps {
	pageLanguage?: string
	includedLanguages?: string
	layout?: 'SIMPLE' | 'HORIZONTAL' | 'VERTICAL'
	autoDisplay?: boolean
	useCustomDropdown?: boolean
}

const GoogleTranslate: React.FC<GoogleTranslateProps> = ({
	pageLanguage = 'en',
	includedLanguages = 'es,fr,de,it,pt,ru,ja,ko,zh,ar',
	layout = 'SIMPLE',
	autoDisplay = false,
	useCustomDropdown = false,
}) => {
	const initialized = useRef(false)
	const containerRef = useRef<HTMLDivElement>(null)
	const [isOpen, setIsOpen] = useState(false)
	const [currentLanguage, setCurrentLanguage] = useState('English')

	// Language mapping for custom dropdown
	const languageMap: { [key: string]: string } = {
		en: 'English',
		es: 'Spanish',
		fr: 'French',
		de: 'German',
		it: 'Italian',
		pt: 'Portuguese',
		ru: 'Russian',
		ja: 'Japanese',
		ko: 'Korean',
		zh: 'Chinese',
		ar: 'Arabic',
	}

	const handleLanguageSelect = (langCode: string) => {
		const selectElement = document.querySelector(
			'.goog-te-combo',
		) as HTMLSelectElement
		if (selectElement) {
			selectElement.value = langCode
			selectElement.dispatchEvent(new Event('change'))
			setCurrentLanguage(languageMap[langCode] || 'English')
			setIsOpen(false)
		}
	}

	// Remove this redundant declaration to avoid conflicts

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		// Prevent double initialization
		if (initialized.current) return

		const initializeTranslate = () => {
			if (window.google?.translate?.TranslateElement && containerRef.current) {
				// Clear any existing content
				containerRef.current.innerHTML = ''

				new window.google.translate.TranslateElement(
					{
						pageLanguage: pageLanguage,
						includedLanguages: includedLanguages,
						layout:
							window.google.translate.TranslateElement.InlineLayout[layout],
						autoDisplay: autoDisplay,
						multilanguagePage: true,
					},
					containerRef.current,
				)

				initialized.current = true
			}
		}

		// Set up global callback
		window.googleTranslateElementInit = initializeTranslate

		// Load script if not already loaded
		if (!document.querySelector('script[src*="translate.google.com"]')) {
			const script = document.createElement('script')
			script.src =
				'//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
			script.async = true
			document.head.appendChild(script)
		} else if (window.google?.translate) {
			initializeTranslate()
		}

		return () => {
			// Reset on unmount
			initialized.current = false
			if (containerRef.current) {
				containerRef.current.innerHTML = ''
			}
		}
	}, []) // Empty dependency array

	return (
		<div className="google-translate-container">
			{useCustomDropdown ? (
				<div className="custom-translate-dropdown">
					<button
						type="button"
						onClick={() => setIsOpen(!isOpen)}
						className="translate-button"
					>
						{currentLanguage}
						<svg
							className={`dropdown-arrow ${isOpen ? 'rotate-180' : ''}`}
							width="12"
							height="12"
							viewBox="0 0 12 12"
							fill="currentColor"
						>
							<title>dropdown-arrow</title>
							<path
								d="M3 4.5L6 7.5L9 4.5"
								stroke="currentColor"
								strokeWidth="1.5"
								fill="none"
							/>
						</svg>
					</button>

					{isOpen && (
						<div className="dropdown-menu">
							{Object.entries(languageMap).map(([code, name]) => (
								<button
									type="button"
									key={code}
									onClick={() => handleLanguageSelect(code)}
									className={`dropdown-item ${currentLanguage === name ? 'active' : ''}`}
								>
									{name}
								</button>
							))}
						</div>
					)}

					{/* Hidden Google Translate widget */}
					<div ref={containerRef} style={{ display: 'none' }} />
				</div>
			) : (
				<div ref={containerRef} />
			)}

			<style jsx>{`
        .custom-translate-dropdown {
          position: relative;
          display: inline-block;
        }

        .translate-button {
          background: #1f1f1f;
          color: white;
          border: 1px solid #333;
          border-radius: 6px;
          padding: 8px 16px;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 120px;
          justify-content: space-between;
          transition: all 0.2s ease;
        }

        .translate-button:hover {
          background: #2a2a2a;
          border-color: #444;
        }

        .dropdown-arrow {
          transition: transform 0.2s ease;
        }

        .rotate-180 {
          transform: rotate(180deg);
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: #1f1f1f;
          border: 1px solid #333;
          border-radius: 6px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          z-index: 1000;
          margin-top: 4px;
        }

        .dropdown-item {
          display: block;
          width: 100%;
          padding: 10px 16px;
          background: none;
          border: none;
          color: white;
          text-align: left;
          cursor: pointer;
          font-size: 14px;
          transition: background 0.2s ease;
        }

        .dropdown-item:hover {
          background: #2a2a2a;
        }

        .dropdown-item.active {
          background: #333;
          color: #4ade80;
        }

        .dropdown-item:first-child {
          border-radius: 6px 6px 0 0;
        }

        .dropdown-item:last-child {
          border-radius: 0 0 6px 6px;
        }
      `}</style>
		</div>
	)
}

export default GoogleTranslate
