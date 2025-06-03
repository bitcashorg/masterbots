import { uploadAttachmentToBucket } from '@/app/actions'
import { logErrorToSentry } from '@/lib/sentry'
import { appConfig } from 'mb-env'

export async function POST(request: Request) {
	const { attachment, thread } = await request.json()

	if (!attachment || !thread) {
		return new Response(
			JSON.stringify({
				error: 'Attachment and thread data are required.',
			}),
			{
				status: 400,
				headers: {
					'Content-Type': 'application/json',
				},
			},
		)
	}

	try {
		const uploadResults = await uploadAttachmentToBucket({
			attachment,
			threadSlug: thread.slug,
		})

		if (appConfig.features.devMode) {
			console.info(
				'Attachment uploaded successfully to Cloudinary',
				uploadResults,
			)
		}

		return new Response(
			JSON.stringify({
				data: uploadResults,
				error: null,
			}),
		)
	} catch (error) {
		logErrorToSentry(
			(error as Error)?.message || 'Failed to upload file to Bucket',
			{
				error,
				message: 'Failed to complete chat.',
				level: 'error',
				extra: {
					attachmentName: attachment.name,
					attachmentContentType: attachment.contentType,
					attachmentMessageIds: attachment.messageIds,
					threadSlug: thread.slug,
				},
			},
		)

		return new Response(
			JSON.stringify({
				data: null,
				error: 'Failed to upload attachment to Bucket.',
			}),
			{
				status: 500,
				headers: {
					'Content-Type': 'application/json',
				},
			},
		)
	}
}
