import type {
	WorkspaceDocumentMetadata,
	WorkspaceDocumentVersion,
} from '@/types/thread.types'

// Helper utilities for interacting with /api/workspace/state

export type WorkspaceStatePayload = {
	organisationsVersion: number
	updatedAt: number
	organizations: string[]
	departmentsByOrg: Record<string, string[]>
	projectsByDept: Record<string, Record<string, string[]>>
	textDocuments: Record<string, string[]>
	imageDocuments: Record<string, string[]>
	spreadsheetDocuments: Record<string, string[]>
	documentContent: Record<string, string>
	activeOrganization: string | null
	activeDepartment: string | null
	activeProject: string | null
	activeDocument: string | null
	activeDocumentType: 'all' | 'text' | 'image' | 'spreadsheet'
}

export async function getWorkspaceState(): Promise<{
	data: WorkspaceStatePayload | null
	checksum: string | null
	error?: string | null
}> {
	const res = await fetch('/api/workspace/state', { cache: 'no-store' })
	if (!res.ok) {
		return { data: null, checksum: null, error: `GET failed: ${res.status}` }
	}
	return res.json()
}

export async function getDocumentPreviousVersion(
	project: string,
	document: string,
): Promise<string | null> {
	try {
		const { data: workspaceState } = await getWorkspaceState()
		if (!workspaceState) return null

		const threadMetadata = workspaceState as unknown as {
			metadata?: { documents?: WorkspaceDocumentMetadata[] }
		}
		const documents = threadMetadata?.metadata?.documents
		if (!documents) return null

		const doc = documents.find(
			(d) => d.project === project && d.name === document,
		)
		if (!doc || !doc.versions || doc.versions.length < 2) return null

		// Sort versions by version number descending
		const sortedVersions = [...doc.versions].sort(
			(a, b) => b.version - a.version,
		)

		// The latest is at index 0, so the previous is at index 1
		const previousVersion = sortedVersions[1]

		if (previousVersion?.url) {
			const res = await fetch(previousVersion.url)
			if (res.ok) {
				return res.text()
			}
		}
	} catch (error) {
		console.error('Error fetching previous document version:', error)
	}

	return null
}

export async function postWorkspaceState(
	payload: WorkspaceStatePayload,
): Promise<{
	data: WorkspaceStatePayload | null
	checksum: string | null
	error?: string | null
}> {
	const res = await fetch('/api/workspace/state', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	})
	if (!res.ok) {
		return { data: null, checksum: null, error: `POST failed: ${res.status}` }
	}
	return res.json()
}

export function upsertDocumentDraft(
	state: WorkspaceStatePayload,
	args: {
		project: string
		document: string
		content: string
		type: 'text' | 'image' | 'spreadsheet'
		activeOrganization: string | null
		activeDepartment: string | null
	},
): WorkspaceStatePayload {
	const {
		project,
		document,
		content,
		type,
		activeOrganization,
		activeDepartment,
	} = args
	return {
		...state,
		updatedAt: Date.now(),
		activeProject: project,
		activeDocument: document,
		activeOrganization,
		activeDepartment,
		activeDocumentType: type,
		documentContent: {
			...state.documentContent,
			[`${project}:${document}`]: content,
		},
	}
}
