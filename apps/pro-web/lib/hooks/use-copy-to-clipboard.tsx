'use client'

import * as React from 'react'

export interface useCopyToClipboardProps {
	timeout?: number
}

export function useCopyToClipboard({
	timeout = 2000,
}: useCopyToClipboardProps) {
	const [isCopied, setIsCopied] = React.useState<boolean>(false)

	const copyToClipboard = (value: string) => {
		if (typeof window === 'undefined' || !navigator.clipboard?.writeText) {
			console.log('Clipboard API not available')
			return
		}

		if (!value) {
			return
		}
		// TODO: Add html clipboard content with navigator.clipboard.write() fn.
		// ? Create the HTML based either on the MemoizedReactMarkdown ref or creating the html string programmatically.
		navigator.clipboard.writeText(value).then(() => {
			setIsCopied(true)

			setTimeout(() => {
				setIsCopied(false)
			}, timeout)
		})
	}

	return { isCopied, copyToClipboard }
}
