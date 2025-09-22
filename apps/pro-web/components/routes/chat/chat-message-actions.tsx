'use client'

//* ChatMessageActions component provides a copy-to-clipboard action for chat messages, with feedback on successful copy.

import { Button } from '@/components/ui/button'
import { IconCheck, IconCopy } from '@/components/ui/icons'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard'
import { useMBChat } from '@/lib/hooks/use-mb-chat'
import { useThread } from '@/lib/hooks/use-thread'
import { useWorkspace } from '@/lib/hooks/use-workspace'
import { useSonner } from '@/lib/hooks/useSonner'
import { createStructuredMarkdown } from '@/lib/markdown-utils'
import { cn } from '@/lib/utils'
import type { Message as AiMessage } from 'ai'
import { FileCheck2Icon, FileInputIcon, FilePlus2Icon } from 'lucide-react'
import type { Message } from 'mb-genql'
import { toSlug } from 'mb-lib'
import { useMemo } from 'react'

interface ChatMessageActionsProps extends React.ComponentProps<'div'> {
	message: AiMessage & Partial<Message>
	onConvertToWorkspaceDocument?: (messageId: string) => void
	onAddToActiveDocument?: (messageId: string) => void
}

export function ChatMessageActions({
	message,
	onConvertToWorkspaceDocument,
	onAddToActiveDocument,
	className,
	...props
}: ChatMessageActionsProps) {
	const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 })
	const [{ allMessages }] = useMBChat()
	const {
		activeProject,
		activeDocument,
		documentContent,
		isWorkspaceActive,
		activeDocumentType,
		addDocument,
		toggleWorkspace,
		setActiveDocument,
		setDocumentContent,
	} = useWorkspace()
	const { customSonner } = useSonner()
	const { activeThread } = useThread()
	const messageId = message?.messageId || message.id
	// Create document title from user question (first 50 chars)
	const newDocumentTitle = useMemo(() => {
		// Find the corresponding user message
		const userMessage = allMessages.find((m, index) => {
			// Find user message that comes before this assistant message
			const assistantIndex = allMessages.findIndex(
				(msg) => msg.id === messageId,
			)
			return index === assistantIndex - 1 && (m as AiMessage).role === 'user'
		})

		if (!userMessage) {
			console.error('Corresponding user message not found')
			return ''
		}

		// Create document title from user question (slug )
		const docTitle = toSlug(
			(userMessage as AiMessage).content || 'New Document',
		)
			// replace hyphens to white space
			.replace(/-/g, ' ')
			// replace initial string letter to a uppercase
			.replace(/^./, (str) => str.toUpperCase())

		return docTitle
	}, [allMessages, messageId])
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

		if (!activeProject) {
			customSonner({
				type: 'error',
				text: 'Please select a project from the breadcrumb navigation first',
			})
			return
		}

		try {
			// Generate structured markdown from assistant content
			const structuredContent = createStructuredMarkdown(
				(message as AiMessage).content,
			)

			// Add the document to workspace
			const docType = activeDocumentType === 'all' ? 'text' : activeDocumentType
			addDocument(
				activeProject,
				newDocumentTitle,
				docType as 'text' | 'image' | 'spreadsheet',
			)

			// Set document content
			setDocumentContent(activeProject, newDocumentTitle, structuredContent)
			setActiveDocument(newDocumentTitle)

			toggleWorkspace(true)

			customSonner({
				type: 'success',
				text: `Document "${newDocumentTitle}" created successfully!`,
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
	// Improved: check if any significant part of the message content is present in any document
	const MIN_MATCH_LENGTH = 32
	const normalizedMessageContent = (message.content || '').trim()
	const isMessageOnDocument = documentKeys.some(([_key, doc]) => {
		if (!normalizedMessageContent || !doc) return false
		// Check for full match
		if (doc.includes(normalizedMessageContent)) return true
		// Check for partial match (substring of at least MIN_MATCH_LENGTH)
		for (
			let i = 0;
			i < normalizedMessageContent.length - MIN_MATCH_LENGTH + 1;
			i++
		) {
			const part = normalizedMessageContent.slice(i, i + MIN_MATCH_LENGTH)
			if (part.length >= MIN_MATCH_LENGTH && doc.includes(part)) return true
		}
		return false
	})

	const onAddToActiveDocumentHandler = () => {
		if (!activeProject || !activeDocument) {
			customSonner({
				type: 'error',
				text: 'No active project or document selected.',
			})
			return
		}
		const documentKey = `${activeProject}:${activeDocument}`
		const currentContent = documentContent[documentKey] || ''
		if (currentContent.includes(message.content)) {
			customSonner({
				type: 'info',
				text: 'Message already exists in the active document.',
			})
			return
		}
		const newContent = currentContent
			? `${currentContent}

***

${message.content}`
			: message.content
		setDocumentContent(activeProject, activeDocument, newContent)
		if (!isWorkspaceActive) toggleWorkspace(true)
		customSonner({
			type: 'success',
			text: 'Message added to active document!',
		})
	}

	const messageTitle = toSlug(message.content)
		.replace(/-/g, ' ')
		.replace(/^./, (str) => str.toUpperCase())

	return (
		<div
			className={cn(
				'flex gap-1.5 items-center justify-end transition-opacity group-hover:opacity-100 md:absolute md:-right-10 md:top-2 md:opacity-0',
				className,
			)}
			key={messageId}
			{...props}
		>
			{activeThread?.metadata?.documents?.length && (
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							onClick={() =>
								(onAddToActiveDocument ?? onAddToActiveDocumentHandler)(
									message?.messageId || message.id,
								)
							}
							disabled={isMessageOnDocument}
						>
							{isMessageOnDocument ? (
								<FileCheck2Icon className="size-4" />
							) : (
								<FileInputIcon className="size-4" />
							)}
							<span className="sr-only">Add to active document</span>
						</Button>
					</TooltipTrigger>
					<TooltipContent side="bottom" align="end" className="max-w-[320px]">
						Add this message to <b>"{activeDocument}"</b> workspace document.
					</TooltipContent>
				</Tooltip>
			)}
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						onClick={onCreateDocumentWorkspace}
						disabled={isMessageOnDocument}
					>
						{isMessageOnDocument ? (
							<FileCheck2Icon className="size-4" />
						) : (
							<FilePlus2Icon className="size-4" />
						)}
						<span className="sr-only">Convert to workspace document</span>
					</Button>
				</TooltipTrigger>
				<TooltipContent side="bottom" align="end" className="max-w-[320px]">
					Convert this message into a new workspace document{' '}
					<b>"{newDocumentTitle}"</b>.
				</TooltipContent>
			</Tooltip>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button variant="ghost" size="icon" onClick={onCopy}>
						{isCopied ? <IconCheck /> : <IconCopy />}
						<span className="sr-only">Copy message</span>
					</Button>
				</TooltipTrigger>
				<TooltipContent side="bottom" align="end" className="max-w-[320px]">
					Copy <b>"{messageTitle}"</b> to clipboard.
				</TooltipContent>
			</Tooltip>
		</div>
	)
}
