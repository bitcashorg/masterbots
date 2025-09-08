import type { FileAttachment } from '@/lib/hooks/use-chat-attachments'

export interface WorkspaceDocumentVersion {
	version: number
	content: string
	checksum: string
	size: number
	url: string
	updatedAt: string
}

export interface WorkspaceDocumentMetadata {
	id: string
	url: string
	content: string
	organization: string
	department: string
	project: string
	name: string
	type: 'text' | 'image' | 'spreadsheet'
	currentVersion: number
	threadSlug: string
	versions: WorkspaceDocumentVersion[]
	size: number
	expires: string
	messageIds?: string[]
}

export interface ThreadMetadata {
	attachments?: FileAttachment[]
	documents?: WorkspaceDocumentMetadata[]
}
