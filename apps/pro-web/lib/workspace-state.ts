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
