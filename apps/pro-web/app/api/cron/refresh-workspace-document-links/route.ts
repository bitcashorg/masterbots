import { refreshWorkspaceDocumentLinks } from '@/lib/cron/refresh-workspace-document-links'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const result = await refreshWorkspaceDocumentLinks()
		return NextResponse.json({
			success: true,
			message: 'Workspace Document links refreshed successfully',
			...result,
		})
	} catch (error) {
		console.error('Error refreshing workspace document links:', error)
		return NextResponse.json(
			{
				success: false,
				error: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 },
		)
	}
}
