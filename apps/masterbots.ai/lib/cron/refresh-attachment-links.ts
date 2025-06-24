import type { FileAttachment } from '@/lib/hooks/use-chat-attachments'
import type { ThreadMetadata } from '@/lib/hooks/use-indexed-db'
import { Storage } from '@google-cloud/storage'
import { eq, isNotNull, sql } from 'drizzle-orm'
import { db, thread } from 'mb-drizzle'
import { appConfig } from 'mb-env'
import pLimit from 'p-limit'

const EXPIRATION_BUFFER_MS = 1000 * 60 * 15 // 15 minutes before expiry
const NEW_EXPIRY_DURATION_MS = 1000 * 60 * 60 * 24 * 7 // 7 days
const CONCURRENT_LIMIT = 4 // Process 4 threads concurrently
const BUCKET_KEY_PREFIX = 'attachments/' // Configurable bucket key prefix

interface ProcessResult {
	threadId: string
	slug: string
	attachmentsRefreshed: number
	errors: string[]
}

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

	// Set up concurrent processing with limit
	const limit = pLimit(CONCURRENT_LIMIT)

	// Process threads concurrently with batching
	const results = await Promise.allSettled(
		threadsWithAttachments.map((threadRecord) =>
			limit(() => processThread(threadRecord, bucket)),
		),
	)

	// Aggregate results
	let threadsUpdated = 0
	let attachmentsRefreshed = 0
	const errors: string[] = []

	for (const result of results) {
		if (result.status === 'fulfilled') {
			const processResult = result.value
			if (processResult.attachmentsRefreshed > 0) {
				threadsUpdated++
			}
			attachmentsRefreshed += processResult.attachmentsRefreshed
			errors.push(...processResult.errors)
		} else {
			errors.push(`Promise rejected: ${result.reason}`)
		}
	}

	const finalResult = {
		threadsProcessed: threadsWithAttachments.length,
		threadsUpdated,
		attachmentsRefreshed,
		errors,
	}

	console.log('Attachment link refresh job completed:', finalResult)

	return finalResult
}

async function processThread(
	threadRecord: { threadId: string; slug: string; metadata: any },
	bucket: any,
): Promise<ProcessResult> {
	const result: ProcessResult = {
		threadId: threadRecord.threadId,
		slug: threadRecord.slug,
		attachmentsRefreshed: 0,
		errors: [],
	}

	try {
		const metadata = threadRecord.metadata as ThreadMetadata | null
		if (!metadata?.attachments?.length) return result

		const attachments = metadata.attachments as FileAttachment[]
		const updatedAttachments = [...attachments] // Create a copy for updates
		let hasUpdates = false

		for (let i = 0; i < updatedAttachments.length; i++) {
			const attachment = updatedAttachments[i]

			try {
				if (!attachment.expires) continue

				const expiry = new Date(attachment.expires).getTime()
				const now = Date.now()

				// Check if the attachment link is expiring soon
				if (expiry - now < EXPIRATION_BUFFER_MS) {
					console.log(
						`Refreshing expiring link for attachment: ${attachment.name} in thread: ${threadRecord.slug}`,
					)

					const bucketKey = attachment.content as string

					if (
						typeof bucketKey !== 'string' ||
						!bucketKey.startsWith(BUCKET_KEY_PREFIX)
					) {
						const errorMsg = `Invalid bucket key for attachment ${attachment.id}: ${bucketKey}`
						console.warn(errorMsg)
						result.errors.push(errorMsg)
						continue
					}

					const file = bucket.file(bucketKey)

					// Check if file exists in bucket
					const [exists] = await file.exists()
					if (!exists) {
						const errorMsg = `File not found in bucket: ${bucketKey}`
						console.warn(errorMsg)
						result.errors.push(errorMsg)
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
					updatedAttachments[i] = {
						...attachment,
						url: signedUrl,
						expires: new Date(newExpiry).toISOString(),
					}

					hasUpdates = true
					result.attachmentsRefreshed++

					console.log(
						`Successfully refreshed link for attachment: ${attachment.name}`,
					)
				}
			} catch (attachmentError) {
				const errorMsg = `Error processing attachment ${attachment.id} in thread ${threadRecord.threadId}: ${attachmentError instanceof Error ? attachmentError.message : 'Unknown error'}`
				console.error(errorMsg)
				result.errors.push(errorMsg)
			}
		}

		// Update the thread in a transaction if any attachments were refreshed
		if (hasUpdates) {
			await db.transaction(async (tx) => {
				await tx
					.update(thread)
					.set({
						metadata: {
							...metadata,
							attachments: updatedAttachments,
						},
					})
					.where(eq(thread.threadId, threadRecord.threadId))
			})

			console.log(
				`Updated thread ${threadRecord.slug} with ${result.attachmentsRefreshed} refreshed attachment links`,
			)
		}
	} catch (threadError) {
		const errorMsg = `Error processing thread ${threadRecord.threadId}: ${threadError instanceof Error ? threadError.message : 'Unknown error'}`
		console.error(errorMsg)
		result.errors.push(errorMsg)
	}

	return result
}
