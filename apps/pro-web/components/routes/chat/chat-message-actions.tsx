'use client'

//* ChatMessageActions component provides a copy-to-clipboard action for chat messages, with feedback on successful copy.

import { useMBChat } from '@/lib/hooks/use-mb-chat'
import { useWorkspace } from '@/lib/hooks/use-workspace'
import { useSonner } from '@/lib/hooks/useSonner'
import { createStructuredMarkdown } from '@/lib/markdown-utils'
import { cn } from '@/lib/utils'
import { Button } from '@masterbots/mb-ui'
import { IconCheck, IconCopy } from '@masterbots/mb-ui/icons'
import type { Message as AiMessage } from 'ai'
import { motion } from 'framer-motion'
import { FileCheckIcon, FilePlusIcon } from 'lucide-react'
import type { Message } from 'mb-genql'
import { useCopyToClipboard } from 'mb-lib'

interface ChatMessageActionsProps extends React.ComponentProps<'div'> {
	message: AiMessage & Partial<Message>
	onConvertToWorkspaceDocument?: (messageId: string) => void
}

export function ChatMessageActions({
	message,
	onConvertToWorkspaceDocument,
	className,
	...props
}: ChatMessageActionsProps) {
	const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 })
	const [{ allMessages }] = useMBChat()
	const {
		activeProject,
		activeDocumentType,
		documentContent,
		addDocument,
		setActiveDocument,
		setDocumentContent,
		isWorkspaceActive,
		toggleWorkspace,
	} = useWorkspace()
	const { customSonner } = useSonner()
	const messageId = message?.messageId || message.id

	const onCopy = () => {
		if (isCopied) return
		copyToClipboard(message.content)
		customSonner({
			type: 'success',
			text: 'Message copied to clipboard!',
		})
	}
	const onCreateDocumentWorkspace = () => {
		if (isMessageOnDocument) return
		// Handle document conversion in the popup - find the message and convert it
		const matchedMessage = allMessages.find((m) => m.id === messageId)
		if (!matchedMessage || (matchedMessage as AiMessage).role !== 'assistant') {
			console.error('Message not found or not an assistant message')
			return
		}

		// Find the corresponding user message
		const userMessage = allMessages.find((m, index) => {
			// Find user message that comes before this assistant message
			const assistantIndex = allMessages.findIndex(
				(msg) => msg.id === messageId,
			)
			return index < assistantIndex && (m as AiMessage).role === 'user'
		})

		if (!userMessage) {
			console.error('Corresponding user message not found')
			return
		}

		if (!activeProject) {
			customSonner({
				type: 'error',
				text: 'Please select a project from the breadcrumb navigation first',
			})
			return
		}

		try {
			// Create document title from user question (first 50 chars)
			const docTitle =
				(userMessage as AiMessage).content
					.substring(0, 50)
					.replace(/[^\w\s-]/g, '')
					.trim() || 'New Document'

			// Generate structured markdown from assistant content
			const structuredContent = createStructuredMarkdown(
				(message as AiMessage).content,
			)

			// Add the document to workspace
			const docType = activeDocumentType === 'all' ? 'text' : activeDocumentType
			addDocument(
				activeProject,
				docTitle,
				docType as 'text' | 'image' | 'spreadsheet',
			)

			// Set document content
			setDocumentContent(activeProject, docTitle, structuredContent)
			setActiveDocument(docTitle)

			// Enable workspace mode if not already active
			if (!isWorkspaceActive) {
				toggleWorkspace()
			}

			customSonner({
				type: 'success',
				text: `Document "${docTitle}" created successfully!`,
			})
		} catch (error) {
			console.error('Error creating document:', error)
			customSonner({
				type: 'error',
				text: 'Failed to create document',
			})
		}
	}

	const documentKeys = Object.entries(documentContent)
	const isMessageOnDocument = documentKeys.some(([_key, doc]) =>
		doc.includes(message.content),
	)

	return (
		<div
			className={cn(
				'flex items-center justify-end transition-opacity group-hover:opacity-100 md:absolute md:-right-10 md:-top-2 md:opacity-0',
				className,
			)}
			key={messageId}
			{...props}
		>
			<Button
				variant="ghost"
				size="icon"
				onClick={onCreateDocumentWorkspace}
				disabled={isMessageOnDocument}
			>
				{isMessageOnDocument ? (
					<FileCheckIcon className="size-4" />
				) : (
					<FilePlusIcon className="size-4" />
				)}
				<span className="sr-only">Convert to workspace document</span>
			</Button>
			<Button variant="ghost" size="icon" onClick={onCopy}>
				{isCopied ? <IconCheck /> : <IconCopy />}
				<span className="sr-only">Copy message</span>
			</Button>
		</div>
	)
}
