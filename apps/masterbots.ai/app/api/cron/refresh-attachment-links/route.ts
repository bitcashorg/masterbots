import { refreshAttachmentLinks } from '@/lib/cron/refresh-attachment-links'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
	try {
		const result = await refreshAttachmentLinks()

		return NextResponse.json({
			success: true,
			message: 'Attachment links refreshed successfully',
			...result,
		})
	} catch (error) {
		console.error('Error refreshing attachment links:', error)
		return NextResponse.json(
			{
				success: false,
				error: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 },
		)
	}
}
