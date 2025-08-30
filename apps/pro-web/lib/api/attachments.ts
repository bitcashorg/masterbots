import { uploadAttachmentToBucket } from '@/app/actions'
import type { FileAttachment } from '@/lib/hooks/use-chat-attachments'
import { logErrorToSentry } from '@/lib/sentry'
import { appConfig } from 'mb-env'

export async function uploadAttachment(
	attachment: FileAttachment,
	thread: { slug: string },
): Promise<{ data: FileAttachment | null; error: string | null }> {
	if (!attachment || !thread) {
		return {
			data: null,
			error: 'Attachment and thread data are required.',
		}
	}

	try {
		const uploadResults = (await uploadAttachmentToBucket({
			attachment,
			threadSlug: thread.slug,
		})) as FileAttachment

		if (appConfig.features.devMode) {
			console.info(
				'Attachment uploaded successfully to gCloud Bucket:',
				uploadResults,
			)
		}

		return {
			data: uploadResults,
			error: null,
		}
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

		return {
			data: null,
			error: 'Failed to upload attachment to Bucket.',
		}
	}
}
