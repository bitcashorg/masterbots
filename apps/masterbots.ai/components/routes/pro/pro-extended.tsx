'use client'

import { ChatPanelPro } from '@/components/routes/pro/chat-panel-pro'
import { useWorkspace } from '@/lib/hooks/use-workspace'
import type { UseChatHelpers } from '@ai-sdk/react'
import type { Message } from 'ai'
import type { Chatbot } from 'mb-genql'
import React, { useState } from 'react'

interface ProExtendedProps
	extends Pick<
		UseChatHelpers,
		'append' | 'isLoading' | 'reload' | 'stop' | 'input' | 'setInput'
	> {
	allMessages?: Message[]
	// Required props that should be passed through
	scrollToBottom: () => void
	placeholder: string
	messages: Message[]
	// Optional props
	id?: string
	title?: string
	chatbot?: Chatbot
	showReload?: boolean
	isAtBottom?: boolean
	className?: string
	[key: string]: unknown
}

/**
 * ProExtended component that enhances the Pro interface with document conversion capabilities
 */
export function ProExtended(props: ProExtendedProps) {
	const { setDocumentContent, projectList } = useWorkspace()

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
		const message = props.allMessages?.find((m) => m.id === messageId)

		if (message) {
			setSelectedMessageId(messageId)
			setConvertedText(message.content)
			setTargetProject(projectList[0] || null)
			setTargetDocument(null)
			setConvertDialogOpen(true)
		}
	}

	// Extract the props that ChatPanelPro needs, excluding our custom ones
	const { allMessages, ...chatPanelProProps } = props

	return (
		<ChatPanelPro
			{...chatPanelProProps}
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
	)
}
