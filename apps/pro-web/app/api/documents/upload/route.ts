import { uploadWorkspaceDocument } from '@/lib/api/documents'

export async function POST(request: Request) {
	const { document, workspace, thread } = await request.json()

	if (!document || !workspace || !thread) {
		return new Response(
			JSON.stringify({
				error: 'Document, workspace, and thread data are required.',
			}),
			{
				status: 400,
				headers: {
					'Content-Type': 'application/json',
				},
			},
		)
	}

	// Validate required workspace context
	if (!workspace.organization || !workspace.department || !workspace.project) {
		return new Response(
			JSON.stringify({
				error: 'Workspace organization, department, and project are required.',
			}),
			{
				status: 400,
				headers: {
					'Content-Type': 'application/json',
				},
			},
		)
	}

	// Validate required document fields
	if (!document.name || !document.content || !document.type) {
		return new Response(
			JSON.stringify({
				error: 'Document name, content, and type are required.',
			}),
			{
				status: 400,
				headers: {
					'Content-Type': 'application/json',
				},
			},
		)
	}

	// Validate document type
	if (!['text', 'image', 'spreadsheet'].includes(document.type)) {
		return new Response(
			JSON.stringify({
				error: 'Document type must be text, image, or spreadsheet.',
			}),
			{
				status: 400,
				headers: {
					'Content-Type': 'application/json',
				},
			},
		)
	}

	const uploadResult = await uploadWorkspaceDocument(
		{
			name: document.name,
			content: document.content,
			type: document.type,
		},
		{
			organization: workspace.organization,
			department: workspace.department,
			project: workspace.project,
		},
		{ slug: thread.slug },
	)

	if (uploadResult.error) {
		return new Response(
			JSON.stringify({
				data: null,
				error: uploadResult.error,
			}),
			{
				status: 500,
				headers: {
					'Content-Type': 'application/json',
				},
			},
		)
	}

	return new Response(
		JSON.stringify({
			data: uploadResult.data,
			error: null,
		}),
		{
			status: 200,
			headers: {
				'Content-Type': 'application/json',
			},
		},
	)
}
