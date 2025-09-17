import type { WorkspaceDocumentMetadata } from '@/types/thread.types'
import type { ThreadMetadata } from '@/types/thread.types'
import { Storage } from '@google-cloud/storage'
import { eq, sql } from 'drizzle-orm'
import { db, thread } from 'mb-drizzle'
import { appConfig } from 'mb-env'
import pLimit from 'p-limit'

const EXPIRATION_BUFFER_MS = 1000 * 60 * 15 // 15 minutes before expiry
const NEW_EXPIRY_DURATION_MS = 1000 * 60 * 60 * 24 * 7 // 7 days
const CONCURRENT_LIMIT = 4 // Process 4 threads concurrently
const BUCKET_KEY_PREFIX = 'documents/' // Configurable bucket key prefix for workspace documents

interface ProcessResult {
	threadId: string
	slug: string
	documentsRefreshed: number
	errors: string[]
}

export async function refreshWorkspaceDocumentLinks() {
	console.log('Starting workspace document link refresh job...')

	const storage = new Storage({
		projectId: appConfig.features.storageProjectId,
		credentials: {
			client_email: appConfig.features.storageClientEmail,
			private_key: appConfig.features.storageSecretAccessKey,
		},
	})
	const bucket = storage.bucket(appConfig.features.storageBucketName)

	// Convert milliseconds to seconds for PostgreSQL interval
	const expirationBufferSeconds = Math.floor(EXPIRATION_BUFFER_MS / 1000)

	// Get all threads that have metadata with workspace documents that have expiry dates
	const threadsWithDocuments = await db
		.select({
			threadId: thread.threadId,
			slug: thread.slug,
			metadata: thread.metadata,
		})
		.from(thread)
		.where(
			sql`${thread.metadata}::jsonb ? 'documents' AND 
          jsonb_array_length(${thread.metadata}::jsonb->'documents') > 0 AND
          EXISTS (
            SELECT 1 FROM jsonb_array_elements(${thread.metadata}::jsonb->'documents') AS doc
            WHERE doc ? 'expires' 
            AND (doc->>'expires')::timestamptz <= (NOW() + INTERVAL '${sql.raw(
							expirationBufferSeconds.toString(),
						)} seconds')
          )`,
		)

	console.log(
		`Found ${threadsWithDocuments.length} threads with workspace document metadata to update`,
	)

	// Set up concurrent processing with limit
	const limit = pLimit(CONCURRENT_LIMIT)

	// Process threads concurrently with batching
	const results = await Promise.allSettled(
		threadsWithDocuments.map((threadRecord) =>
			limit(() => processThread(threadRecord, bucket)),
		),
	)

	// Aggregate results
	let threadsUpdated = 0
	let documentsRefreshed = 0
	const errors: string[] = []

	for (const result of results) {
		if (result.status === 'fulfilled') {
			const processResult = result.value
			if (processResult.documentsRefreshed > 0) {
				threadsUpdated++
			}
			documentsRefreshed += processResult.documentsRefreshed
			errors.push(...processResult.errors)
		} else {
			errors.push(`Promise rejected: ${result.reason}`)
		}
	}

	const finalResult = {
		threadsProcessed: threadsWithDocuments.length,
		threadsUpdated,
		documentsRefreshed,
		errors,
	}

	console.log('Workspace document link refresh job completed:', finalResult)

	return finalResult
}

async function processThread(
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	threadRecord: { threadId: string; slug: string; metadata: any },
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	bucket: any,
): Promise<ProcessResult> {
	const result: ProcessResult = {
		threadId: threadRecord.threadId,
		slug: threadRecord.slug,
		documentsRefreshed: 0,
		errors: [],
	}

	try {
		const metadata = threadRecord.metadata as ThreadMetadata | null
		if (!metadata?.documents?.length) return result

		const documents = metadata.documents as WorkspaceDocumentMetadata[]
		const updatedDocuments = [...documents] // Create a copy for updates
		let hasUpdates = false

		for (let i = 0; i < updatedDocuments.length; i++) {
			const document = updatedDocuments[i]

			try {
				if (!document.expires) continue

				const expiry = new Date(document.expires).getTime()
				const now = Date.now()

				// Check if the document link is expiring soon
				if (expiry - now < EXPIRATION_BUFFER_MS) {
					console.log(
						`Refreshing expiring link for document: ${document.name} in thread: ${threadRecord.slug}`,
					)

					// Find the current version to refresh
					const currentVersion = document.versions?.find(
						(v) => v.version === document.currentVersion,
					)

					if (!currentVersion?.content) {
						const errorMsg = `No current version found for document ${document.id}`
						console.warn(errorMsg)
						result.errors.push(errorMsg)
						continue
					}

					const bucketKey = currentVersion.content as string

					if (
						typeof bucketKey !== 'string' ||
						!bucketKey.startsWith(BUCKET_KEY_PREFIX)
					) {
						const errorMsg = `Invalid bucket key for document ${document.id}: ${bucketKey}`
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

					// Update document with new URL and expiry
					const updatedVersions = document.versions?.map((v) =>
						v.version === document.currentVersion
							? {
									...v,
									url: signedUrl,
									updatedAt: new Date().toISOString(),
								}
							: v,
					)

					updatedDocuments[i] = {
						...document,
						url: signedUrl,
						expires: new Date(newExpiry).toISOString(),
						versions: updatedVersions,
					}

					hasUpdates = true
					result.documentsRefreshed++

					console.log(
						`Successfully refreshed link for document: ${document.name}`,
					)
				}
			} catch (documentError) {
				const errorMsg = `Error processing document ${document.id} in thread ${threadRecord.threadId}: ${documentError instanceof Error ? documentError.message : 'Unknown error'}`
				console.error(errorMsg)
				result.errors.push(errorMsg)
			}
		}

		// Update the thread in a transaction if any documents were refreshed
		if (hasUpdates) {
			await db.transaction(async (tx) => {
				await tx
					.update(thread)
					.set({
						metadata: {
							...metadata,
							documents: updatedDocuments,
						},
					})
					.where(eq(thread.threadId, threadRecord.threadId))
			})

			console.log(
				`Updated thread ${threadRecord.slug} with ${result.documentsRefreshed} refreshed document links`,
			)
		}
	} catch (threadError) {
		const errorMsg = `Error processing thread ${threadRecord.threadId}: ${threadError instanceof Error ? threadError.message : 'Unknown error'}`
		console.error(errorMsg)
		result.errors.push(errorMsg)
	}

	return result
}
