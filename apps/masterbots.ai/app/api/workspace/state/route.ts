import { logErrorToSentry } from '@/lib/sentry'
import { appConfig } from 'mb-env'

// In-memory cache (ephemeral per server instance)
let cachedWorkspaceState: WorkspaceStatePayload | null = null
let cachedChecksum: string | null = null

export interface WorkspaceStatePayload {
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

function computeChecksum(obj: unknown) {
	try {
		const json = JSON.stringify(obj)
		let hash = 0
		for (let i = 0; i < json.length; i++) {
			const chr = json.charCodeAt(i)
			hash = (hash << 5) - hash + chr
			hash |= 0
		}
		return hash.toString()
	} catch {
		return '0'
	}
}

export async function GET() {
	return new Response(
		JSON.stringify({
			data: cachedWorkspaceState,
			checksum: cachedChecksum,
			error: null,
		}),
		{ headers: { 'Content-Type': 'application/json' } },
	)
}

export async function POST(request: Request) {
	try {
		const body = (await request.json()) as WorkspaceStatePayload

		if (!body || typeof body !== 'object') {
			return new Response(
				JSON.stringify({ data: null, error: 'Invalid payload' }),
				{ status: 400, headers: { 'Content-Type': 'application/json' } },
			)
		}

		// Basic shape validation
		if (!Array.isArray(body.organizations) || !body.updatedAt) {
			return new Response(
				JSON.stringify({ data: null, error: 'Missing required fields' }),
				{ status: 422, headers: { 'Content-Type': 'application/json' } },
			)
		}

		// Version conflict detection (client should send newer updatedAt)
		if (
			cachedWorkspaceState &&
			body.updatedAt < cachedWorkspaceState.updatedAt
		) {
			return new Response(
				JSON.stringify({
					data: cachedWorkspaceState,
					error: 'Outdated state; newer version exists',
				}),
				{ status: 409, headers: { 'Content-Type': 'application/json' } },
			)
		}

		cachedWorkspaceState = body
		cachedChecksum = computeChecksum(body)

		if (appConfig.features.devMode) {
			console.info('Workspace state updated (server cache)', {
				updatedAt: body.updatedAt,
				checksum: cachedChecksum,
			})
		}

		return new Response(
			JSON.stringify({
				data: cachedWorkspaceState,
				checksum: cachedChecksum,
				error: null,
			}),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		)
	} catch (error) {
		logErrorToSentry('Failed to update workspace state', {
			error,
			level: 'error',
		})
		return new Response(
			JSON.stringify({ data: null, error: 'Internal Server Error' }),
			{ status: 500, headers: { 'Content-Type': 'application/json' } },
		)
	}
}
