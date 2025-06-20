'use server'

import type { FileAttachment } from '@/lib/hooks/use-chat-attachments'
import type { ThreadMetadata } from '@/lib/hooks/use-indexed-db'
import { Storage } from '@google-cloud/storage'
import { eq, inArray, isNotNull } from 'drizzle-orm'
import { uniqBy } from 'lodash'
import { db, message, thread } from 'mb-drizzle'
import { appConfig } from 'mb-env'
import { metadata } from '../layout'

export async function doesMessageSlugExist(slug: string) {
	const results = await db
		.select({ slug: message.slug })
		.from(message)
		.where(eq(message.slug, slug))

	return {
		exists: results.length > 0,
		slug: results[0]?.slug,
		sequence:
			Number.parseFloat(results[0]?.slug.split('-').pop() as string) || 0,
	}
}

export async function doesThreadSlugExist(slug: string) {
	const results = await db
		.select({ slug: thread.slug })
		.from(thread)
		.where(eq(thread.slug, slug))

	return {
		exists: results.length > 0,
		slug: results[0]?.slug,
		sequence:
			Number.parseFloat(results[0]?.slug.split('-').pop() as string) || 0,
	}
}

export async function getUserThreadsMetadata(messageIds: string[]) {
	const results = await db
		.select({
			threadId: thread.threadId,
			slug: thread.slug,
			metadata: thread.metadata,
		})
		.from(thread)
		.innerJoin(message, eq(thread.threadId, message.threadId))
		.where(inArray(message.messageId, messageIds))

	if (results.length === 0) return null

	return results[0]
}

export async function getAllUserThreadMetadata() {
	const results = await db
		.select({
			metadata: thread.metadata,
		})
		.from(thread)
		.where(isNotNull(thread.metadata))

	if (results.length === 0) return null

	const metadata = results.flatMap(
		(result) => (result.metadata as ThreadMetadata).attachments,
	)

	return metadata
}

export async function updateThreadMetadata(
	messagesIds: string[],
	metadata: ThreadMetadata,
) {
	// First, select the threadIds that need to be updated
	const threadsToUpdate = await db
		.selectDistinct({
			threadId: message.threadId,
			messageId: message.messageId,
		})
		.from(message)
		.where(inArray(message.messageId, messagesIds))

	if (threadsToUpdate.length === 0) {
		console.error(
			'No threads found for the provided message IDs. Cannot update metadata.',
		)
		return {
			threads: [],
			attachments: {},
		}
	}

	const threadsDataIds = threadsToUpdate.map(
		(t) => [t.threadId as string, t.messageId] as const,
	)

	const attachments: ThreadMetadata = {}

	let result: (typeof thread.$inferSelect)[] = []

	let previousThreadId: string | null = null
	let currentThread: Partial<typeof thread.$inferSelect>[] | null = null

	for (const [threadId, messageId] of threadsDataIds) {
		let relatedThreadAttachments = metadata.attachments.filter((att) =>
			att.messageIds.includes(messageId),
		)

		const isSameThread = previousThreadId === threadId

		// Fetch current thread metadata to get existing attachments
		currentThread = isSameThread
			? currentThread
			: await db
					.select({ metadata: thread.metadata })
					.from(thread)
					.where(eq(thread.threadId, threadId))
					.limit(1)

		const existingAttachments = currentThread?.length
			? (currentThread[0]?.metadata as ThreadMetadata)?.attachments || []
			: []

		if (isSameThread) {
			relatedThreadAttachments.push(...(attachments[threadId] || []))
		}

		// Merge existing attachments with new ones, prioritizing new attachments
		relatedThreadAttachments = uniqBy(
			[...relatedThreadAttachments, ...existingAttachments],
			'id',
		)

		previousThreadId = threadId

		// Then, update the threads using the selected threadIds
		result = [
			...result,
			...(await db
				.update(thread)
				.set({
					metadata: {
						attachments: relatedThreadAttachments,
					},
				})
				.where(eq(thread.threadId, threadId))
				.returning()),
		]
		currentThread = [
			{
				...(currentThread ? currentThread[0] : {}),
				metadata: {
					attachments: relatedThreadAttachments,
				},
			},
		]

		// attachments[threadId] = relatedThreadAttachments
	}

	result = uniqBy(result, 'threadId')

	return {
		success: true,
		message: 'Thread metadata updated successfully',
		// threads: result,
		// attachments,
	}
}

export async function uploadAttachmentToBucket({
	attachment,
	threadSlug,
}: {
	attachment: FileAttachment
	threadSlug: string
}) {
	const { id, name, contentType, content, size } = attachment

	if (!content) {
		throw new Error('Attachment content is required for upload')
	}

	const buffer: Buffer =
		typeof content === 'string'
			? Buffer.from(content.split(',')[1], 'base64')
			: Buffer.from(content)
	const byteSize = buffer.byteLength
	const fileExtension = name.split('.').pop() || 'txt'
	const bucketKey = `attachments/${threadSlug}/${name}`

	console.log(
		`Uploading attachment: ${name}, ID: ${id}, Size: ${size} bytes, Content-Type: ${contentType}`,
	)

	if (byteSize !== size) {
		throw new Error(
			`Attachment size mismatch: expected ${size} bytes, got ${byteSize} bytes`,
		)
	}

	const storage = new Storage({
		projectId: appConfig.features.storageProjectId,
		credentials: {
			client_email: appConfig.features.storageClientEmail,
			private_key: appConfig.features.storageSecretAccessKey,
		},
	})
	const bucket = storage.bucket(appConfig.features.storageBucketName)
	const fileUpload = bucket.file(bucketKey)

	await fileUpload.save(buffer, {
		metadata: {
			id,
			fileExtension,
			contentType,
			threadSlug,
		},
		resumable: false,
		// public: true,
	})

	const expires = Date.now() + 1000 * 60 * 60 * 24 * 7 // 7 days
	const [signedUrl] = await fileUpload.getSignedUrl({
		version: 'v4',
		action: 'read',
		expires,
	})

	return {
		id,
		name,
		contentType,
		url: signedUrl,
		size: byteSize,
		content: bucketKey, // Store the bucket key instead of the content
		expires: new Date(expires).toISOString(),
	}
}
