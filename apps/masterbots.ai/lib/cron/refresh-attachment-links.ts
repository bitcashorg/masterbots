import type { FileAttachment } from '@/lib/hooks/use-chat-attachments'
import type { ThreadMetadata } from '@/lib/hooks/use-indexed-db'
import { Storage } from '@google-cloud/storage'
import { eq, isNotNull, sql } from 'drizzle-orm'
import { db, thread } from 'mb-drizzle'
import { appConfig } from 'mb-env'

const EXPIRATION_BUFFER_MS = 1000 * 60 * 15 // 15 minutes before expiry
const NEW_EXPIRY_DURATION_MS = 1000 * 60 * 60 * 24 * 7 // 7 days

export async function refreshAttachmentLinks() {
	console.log('Starting attachment link refresh job...')

	const storage = new Storage({
		projectId: appConfig.features.storageProjectId,
		credentials: {
			client_email: appConfig.features.storageClientEmail,
			private_key: appConfig.features.storageSecretAccessKey,
		},
	})
	const bucket = storage.bucket(appConfig.features.storageBucketName)

	// Get all threads that have metadata with attachments that have expiry dates
	const threadsWithAttachments = await db
		.select({
			threadId: thread.threadId,
			slug: thread.slug,
			metadata: thread.metadata,
		})
		.from(thread)
		.where(
			sql`${thread.metadata}::jsonb ? 'attachments' AND 
          jsonb_array_length(${thread.metadata}::jsonb->'attachments') > 0 AND
          EXISTS (
            SELECT 1 FROM jsonb_array_elements(${thread.metadata}::jsonb->'attachments') AS attachment
            WHERE attachment ? 'expires' 
            AND (attachment->>'expires')::timestamptz <= (NOW() + INTERVAL '${EXPIRATION_BUFFER_MS} milliseconds')
          )`,
		)

	console.log(
		`Found ${threadsWithAttachments.length} threads with metadata to update`,
	)

	let threadsUpdated = 0
	let attachmentsRefreshed = 0
	const errors: string[] = []

	for (const threadRecord of threadsWithAttachments) {
		try {
			const metadata = threadRecord.metadata as ThreadMetadata | null
			if (!metadata?.attachments?.length) continue

			const attachments = metadata.attachments as FileAttachment[]
			let threadUpdated = false

			for (const attachment of attachments) {
				try {
					if (!attachment.expires) continue

					const expiry = new Date(attachment.expires).getTime()
					const now = Date.now()

					// Check if the attachment link is expiring soon
					if (expiry - now < EXPIRATION_BUFFER_MS) {
						console.log(
							`Refreshing expiring link for attachment: ${attachment.name} in thread: ${threadRecord.slug}`,
						)

						// The content field should contain the bucket key from uploadAttachmentToBucket
						const bucketKey = attachment.content as string

						if (
							typeof bucketKey !== 'string' ||
							!bucketKey.startsWith('attachments/')
						) {
							console.warn(
								`Invalid bucket key for attachment ${attachment.id}: ${bucketKey}`,
							)
							continue
						}

						const file = bucket.file(bucketKey)

						// Check if file exists in bucket
						const [exists] = await file.exists()
						if (!exists) {
							console.warn(`File not found in bucket: ${bucketKey}`)
							continue
						}

						// Generate new signed URL
						const newExpiry = now + NEW_EXPIRY_DURATION_MS
						const [signedUrl] = await file.getSignedUrl({
							version: 'v4',
							action: 'read',
							expires: newExpiry,
						})

						// Update attachment with new URL and expiry
						attachment.url = signedUrl
						attachment.expires = new Date(newExpiry).toISOString()

						threadUpdated = true
						attachmentsRefreshed++

						console.log(
							`Successfully refreshed link for attachment: ${attachment.name}`,
						)
					}
				} catch (attachmentError) {
					const errorMsg = `Error processing attachment ${attachment.id} in thread ${threadRecord.threadId}: ${attachmentError instanceof Error ? attachmentError.message : 'Unknown error'}`
					console.error(errorMsg)
					errors.push(errorMsg)
				}
			}

			// Update the thread if any attachments were refreshed
			if (threadUpdated) {
				await db
					.update(thread)
					.set({
						metadata: {
							...metadata,
							attachments,
						},
					})
					.where(eq(thread.threadId, threadRecord.threadId))

				threadsUpdated++
				console.log(
					`Updated thread ${threadRecord.slug} with refreshed attachment links`,
				)
			}
		} catch (threadError) {
			const errorMsg = `Error processing thread ${threadRecord.threadId}: ${threadError instanceof Error ? threadError.message : 'Unknown error'}`
			console.error(errorMsg)
			errors.push(errorMsg)
		}
	}

	const result = {
		threadsProcessed: threadsWithAttachments.length,
		threadsUpdated,
		attachmentsRefreshed,
		errors,
	}

	console.log('Attachment link refresh job completed:', result)

	return result
}
