'use client'

import { ChatPanelPro } from '@/components/routes/pro/chat-panel-pro'
import type { MessageRendererPro } from '@/components/routes/pro/message-renderer-pro'
import { useWorkspace } from '@/lib/hooks/use-workspace'
import React, { useState } from 'react'

// Create a context to provide the convert functionality to children components
export const MessageRendererContext = React.createContext<{
	MessageRenderer: typeof MessageRendererPro | null
	onConvertToDocument: ((messageId: string) => void) | null
}>({
	MessageRenderer: null,
	onConvertToDocument: null,
})

// By monkey-patching the MessageRenderer in React's module cache, we can
// make all components that import MessageRenderer use our enhanced version instead
// This is a hack, but it allows us to avoid modifying the entire component tree
export function useEnhanceMessageRenderer(
	onConvertToDocument: (messageId: string) => void,
) {
	const [MessageRenderer, setMessageRenderer] = useState<
		typeof MessageRendererPro | null
	>(null)

	// Set up the enhanced message renderer once on first render
	React.useEffect(() => {
		// Dynamically import to ensure we have access to the module
		import('@/components/routes/pro/message-renderer-pro').then(
			({ MessageRendererPro }) => {
				// Store the enhanced renderer
				setMessageRenderer(() => MessageRendererPro)

				// This is a hack to make all components that use MessageRenderer use our version instead
				// React's module cache for the main app is accessed through the window object
				// @ts-ignore - we're deliberately monkey-patching here
				if (
					window.__webpack_require__ &&
					typeof window.__webpack_require__ === 'function'
				) {
					try {
						// Find the module that exports MessageRenderer
						// @ts-ignore
						const moduleCache = window.__webpack_require__.c

						// Look through the cache for the MessageRenderer module
						for (const moduleId in moduleCache) {
							const module = moduleCache[moduleId]
							if (module && module.exports && module.exports.MessageRenderer) {
								// Save the original to restore later
								const originalRenderer = module.exports.MessageRenderer

								// Replace with our enhanced version
								module.exports.MessageRenderer = (props: any) => {
									return (
										<MessageRendererPro
											{...props}
											onConvertToDocument={onConvertToDocument}
										/>
									)
								}

								// Clean up when component unmounts
								return () => {
									// Restore the original message renderer
									module.exports.MessageRenderer = originalRenderer
								}
							}
						}
					} catch (error) {
						console.error('Failed to monkey-patch MessageRenderer:', error)
						// Fallback approach if monkey-patching fails
					}
				}
			},
		)
	}, [onConvertToDocument])

	return MessageRenderer
}

/**
 * ProExtended component that enhances the Pro interface with document conversion capabilities
 */
export function ProExtended(props: any) {
	const { setDocumentContent, projectList, documentList } = useWorkspace()

	// Dialog state for conversion
	const [convertDialogOpen, setConvertDialogOpen] = useState(false)
	const [selectedMessageId, setSelectedMessageId] = useState<string | null>(
		null,
	)
	const [convertedText, setConvertedText] = useState('')
	const [targetProject, setTargetProject] = useState<string | null>(
		projectList[0] || null,
	)
	const [targetDocument, setTargetDocument] = useState<string | null>(null)

	// Prepare a message for conversion to a document
	const handleOpenConvertDialog = (messageId: string) => {
		// Find the message in the messages array
		const message = props.allMessages?.find((m: any) => m.id === messageId)

		if (message) {
			setSelectedMessageId(messageId)
			setConvertedText(message.content)
			setTargetProject(projectList[0] || null)
			setTargetDocument(null)
			setConvertDialogOpen(true)
		}
	}

	// Use the enhanced message renderer
	const MessageRenderer = useEnhanceMessageRenderer(handleOpenConvertDialog)

	// Create contextual value to provide
	const contextValue = React.useMemo(
		() => ({
			MessageRenderer,
			onConvertToDocument: handleOpenConvertDialog,
		}),
		[MessageRenderer],
	)

	return (
		<MessageRendererContext.Provider value={contextValue}>
			<ChatPanelPro
				{...props}
				convertDialogOpen={convertDialogOpen}
				setConvertDialogOpen={setConvertDialogOpen}
				selectedMessageId={selectedMessageId}
				convertedText={convertedText}
				setConvertedText={setConvertedText}
				targetProject={targetProject}
				setTargetProject={setTargetProject}
				targetDocument={targetDocument}
				setTargetDocument={setTargetDocument}
				onConvertToDocument={handleOpenConvertDialog}
			/>
		</MessageRendererContext.Provider>
	)
}
