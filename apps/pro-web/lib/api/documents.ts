import { uploadWorkspaceDocumentToBucket } from '@/app/actions/thread.actions'
import { logErrorToSentry } from '@/lib/sentry'
import type { WorkspaceDocumentMetadata } from '@/types/thread.types'
import { appConfig } from 'mb-env'

export interface WorkspaceDocumentUpload {
	name: string
	content: string
	type: 'text' | 'image' | 'spreadsheet'
}

export interface WorkspaceContextUpload {
	organization: string
	department: string
	project: string
}

export async function uploadWorkspaceDocument(
	document: WorkspaceDocumentUpload,
	workspace: WorkspaceContextUpload,
	thread: { slug: string },
): Promise<{ data: WorkspaceDocumentMetadata | null; error: string | null }> {
	if (!document || !workspace || !thread) {
		return {
			data: null,
			error: 'Document, workspace, and thread data are required.',
		}
	}

	// Validate required workspace context
	if (!workspace.organization || !workspace.department || !workspace.project) {
		return {
			data: null,
			error: 'Workspace organization, department, and project are required.',
		}
	}

	// Validate required document fields
	if (!document.name || !document.content || !document.type) {
		return {
			data: null,
			error: 'Document name, content, and type are required.',
		}
	}

	// Validate document type
	if (!['text', 'image', 'spreadsheet'].includes(document.type)) {
		return {
			data: null,
			error: 'Document type must be text, image, or spreadsheet.',
		}
	}

	try {
		const uploadResults = await uploadWorkspaceDocumentToBucket({
			threadSlug: thread.slug,
			organization: workspace.organization,
			department: workspace.department,
			project: workspace.project,
			name: document.name,
			content: document.content,
			type: document.type,
		})

		if (appConfig.features.devMode) {
			console.info(
				'Workspace document uploaded successfully to gCloud Bucket:',
				uploadResults,
			)
		}

		return {
			data: uploadResults.document || null,
			error: null,
		}
	} catch (error) {
		logErrorToSentry(
			(error as Error)?.message || 'Failed to upload document to Bucket',
			{
				error,
				message: 'Failed to upload workspace document.',
				level: 'error',
				extra: {
					documentName: document.name,
					documentType: document.type,
					documentSize: document.content?.length || 0,
					organization: workspace.organization,
					department: workspace.department,
					project: workspace.project,
					threadSlug: thread.slug,
				},
			},
		)

		return {
			data: null,
			error: 'Failed to upload workspace document to Bucket.',
		}
	}
}
