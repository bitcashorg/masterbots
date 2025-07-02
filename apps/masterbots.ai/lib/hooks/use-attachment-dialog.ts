import type { AttachmentDialogProps } from '@/components/routes/chat/attachment-dialog'
import type { FileAttachment } from '@/lib/hooks/use-chat-attachments'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

export function useAttachmentDialog({
	attachment,
	dialogState,
	updateAttachment,
}: AttachmentDialogProps) {
	if (!attachment) return {}

	const { open, onOpenChange } = dialogState || {}
	const [contentEditable, setContentEditable] = useState(true)
	const [fetchedContent, setFetchedContent] = useState<string>('')
	const [isLoadingContent, setIsLoadingContent] = useState(false)
	const [fetchError, setFetchError] = useState<string>('')
	const textContentRef = useRef<HTMLDivElement | null>(null)

	// Function to fetch text content from URL
	const fetchTextContent = async (url: string): Promise<string> => {
		try {
			setIsLoadingContent(true)
			setFetchError('')

			const response = await fetch(url)

			if (!response.ok) {
				throw new Error(`Failed to fetch content: ${response.statusText}`)
			}

			return await response.text()
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : 'Unknown error occurred'
			setFetchError(errorMessage)
			throw error
		} finally {
			setIsLoadingContent(false)
		}
	}

	// ? This useLayoutEffect is for controlled dialogs only, if attempting to do this in a non-controlled dialog, it won't be able to interact.
	// biome-ignore lint/correctness/useExhaustiveDependencies: not required
	useLayoutEffect(() => {
		if (!open || !contentEditable || !attachment) return

		const timeout = setTimeout(() => {
			try {
				const textElement = textContentRef.current

				if (!textElement) throw new Error('Text content element not found')

				console.log('Setting focus and selection to text element', textElement)

				// Focus the element first
				textElement.focus()

				// Create and set the selection range
				const range = document.createRange()
				range.selectNodeContents(textElement)

				const selection = window.getSelection()
				if (selection) {
					selection.removeAllRanges()
					selection.addRange(range)
				}

				// Move cursor to end for better UX
				range.collapse(false) // false = collapse to end
				selection?.removeAllRanges()
				selection?.addRange(range)
			} catch (error) {
				console.warn('Failed to set text selection:', error)
			}

			clearTimeout(timeout)
		}, 120)

		return () => {
			clearTimeout(timeout)
		}
	}, [contentEditable, open, attachment?.id])

	const updateDialogState = () => {
		if (textContentRef.current) {
			textContentRef.current = null
		}
		setContentEditable(Boolean(open && attachment))

		if (!attachment || fetchedContent) return

		const { url, contentType } = attachment

		if (!shouldRenderContent && url && contentType?.includes('text')) {
			// Only fetch if it's a text file and content is not available
			fetchTextContent(url)
				.then((text) => setFetchedContent(text))
				.catch((error) => console.warn('Failed to fetch text content:', error))
		} else {
			setFetchedContent('')
			setFetchError('')
		}
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		updateDialogState()

		return () => {
			updateDialogState()
		}
	}, [open, attachment?.id])

	const { id, name, content } = attachment as FileAttachment

	const toggleDialogOpen = (isOpen: boolean) => {
		if (contentEditable) {
			toggleContentEditable()
		}

		onOpenChange?.(isOpen)
	}

	const toggleContentEditable = () => {
		const newEditableState = !contentEditable
		const textElement = textContentRef.current

		setContentEditable(newEditableState)

		if (newEditableState || !textElement) return

		const rawText = textElement.innerText

		const updateContentEditable = (
			type: 'text-encoding' | 'base64-encoding' = 'text-encoding',
		) => {
			let binaryString = ''
			let byteSize = 0

			if (type === 'text-encoding') {
				// Use TextEncoder to properly handle UTF-8 characters
				const encoder = new TextEncoder()
				const utf8Bytes = encoder.encode(rawText)

				// Convert bytes to a string that btoa can handle
				binaryString = Array.from(utf8Bytes, (byte) =>
					String.fromCharCode(byte),
				).join('')
				byteSize = utf8Bytes.length
			} else {
				// Fallback: sanitize text by removing problematic characters
				// biome-ignore lint/suspicious/noControlCharactersInRegex: <explanation>
				binaryString = rawText.replace(/[^\x00-\x7F]/g, '?') // Replace non-ASCII with ?
				byteSize = new Blob([binaryString]).size
			}

			const base64Hash = btoa(binaryString)
			const base64Content = `data:text/plain;base64,${base64Hash}`

			// set the contentType to text/plain
			const newContentType = 'text/plain'
			// set the name to the original name with .txt extension
			const newName = `${attachment.name.split('.')[0]}.txt`
			// update the state with the new values
			const newContent = base64Content

			if (updateAttachment) {
				updateAttachment(id, {
					content: newContent,
					url: newContent,
					contentType: newContentType,
					name: newName,
					size: byteSize,
				})
			}
		}

		try {
			updateContentEditable()
		} catch (error) {
			console.error('Failed to encode text content:', error)

			updateContentEditable('base64-encoding')
		}
	}

	const shouldRenderTextEditButton = Boolean(updateAttachment)

	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault()
			e.stopPropagation()

			const selection = window.getSelection()
			if (selection && selection.rangeCount > 0) {
				const range = selection.getRangeAt(0)

				// Insert a line break
				const br = document.createElement('br')
				range.deleteContents()
				range.insertNode(br)

				// Move cursor after the line break
				range.setStartAfter(br)
				range.setEndAfter(br)
				selection.removeAllRanges()
				selection.addRange(range)
			}
		}

		// ! WIP — @andler
		// Prevent default behaviour for tab and shift + tab.
		// if (e.key === 'Tab' || (e.key === 'Tab' && e.shiftKey)) {
		// 	e.preventDefault()
		// 	e.stopPropagation()

		// 	// If we have selected text, we want to make sure to keep it selected
		// 	const selection = window.getSelection()
		// 	if (selection && selection.rangeCount > 0) {
		// 		const range = selection.getRangeAt(0)

		// 		// Insert a tab character
		// 		const tabNode = document.createTextNode('\t')

		// 		// Insert the new node at the beginning of every line within the range
		// 		const lines = range.toString().split('\n')
		// 		range.deleteContents()
		// 		lines.forEach((line, index) => {
		// 			const lineNode = document.createTextNode(line)
		// 			range.insertNode(lineNode)

		// 			// If it's not the last line, insert a line break
		// 			if (index < lines.length - 1) {
		// 				range.insertNode(document.createElement('br'))
		// 			}
		// 		})

		// 		// Move cursor after the tab character
		// 		range.setStartAfter(tabNode)
		// 		range.setEndAfter(tabNode)
		// 		selection.removeAllRanges()
		// 		selection.addRange(range)
		// 	}
		// }
	}

	const contentEditablePasteControl = (
		event: React.ClipboardEvent<HTMLDivElement>,
	) => {
		if (!contentEditable) return
		if (!textContentRef.current) return

		event.preventDefault()
		event.stopPropagation()

		const text = event.clipboardData.getData('text/plain')
		const selection = window.getSelection()

		if (!selection || selection?.rangeCount === 0) return

		const range = selection.getRangeAt(0)

		range.deleteContents()
		range.insertNode(document.createTextNode(text))
		range.collapse(false) // Move cursor to end
		selection.removeAllRanges()
		selection.addRange(range)
	}

	const sizeInMB = (attachment.size / 1024 / 1024).toFixed(2)
	const sizeInKB = (attachment.size / 1024).toFixed(2)
	const attachmentLabel = `${name} | ${sizeInMB === '0.00' ? `${sizeInKB}KB` : `${sizeInMB}MB`}`

	// Determine what content to display
	const getDisplayContent = () => {
		if (shouldRenderContent) {
			try {
				return atob((content as string).split(',')[1])
			} catch (error) {
				console.error('Failed to decode base64 content:', error)
				return '🔴 Failed to process and save the new content. Please try with something different.'
			}
		}
		if (fetchedContent) {
			return fetchedContent
		}
		if (fetchError) {
			return `Error loading content: ${fetchError}`
		}
		return '[NO CONTENT AVAILABLE]'
	}

	const shouldRenderContent =
		content && !(content as string).includes('attachments/')

	return {
		open,
		contentEditable,
		fetchedContent,
		isLoadingContent,
		fetchError,
		attachmentLabel,
		textContentRef,
		shouldRenderContent,
		shouldRenderTextEditButton,
		onOpenChange,
		toggleDialogOpen,
		toggleContentEditable,
		getDisplayContent,
		setContentEditable,
		contentEditablePasteControl,
		handleKeyDown,
	}
}
