'use server'

import type { FileAttachment } from '@/lib/hooks/use-chat-attachments'
import type { ThreadMetadata as AttachmentThreadMetadata } from '@/lib/hooks/use-indexed-db'
import { Storage } from '@google-cloud/storage'
import { eq, inArray, isNotNull, sql } from 'drizzle-orm'
import { uniqBy } from 'lodash'
import { db, message, thread } from 'mb-drizzle'
import { appConfig } from 'mb-env'
import { nanoid } from 'nanoid'

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
		(result) => (result.metadata as AttachmentThreadMetadata).attachments,
	)

	return metadata
}

export async function getMissingUserThreadMetadata(
	currentAttachments: FileAttachment[],
) {
	const currentAttachmentIds = currentAttachments.map((att) => att.id)
	const currentAttachmentMessageIds = currentAttachments.flatMap(
		(att) => att.messageIds,
	)

	if (currentAttachmentIds.length === 0) return null

	// Use raw SQL to filter JSONB data at database level
	const results = await db.execute(sql`
		SELECT metadata
		FROM thread 
		WHERE metadata IS NOT NULL 
		AND metadata->'attachments' IS NOT NULL
		AND EXISTS (
			SELECT 1 
			FROM jsonb_array_elements(metadata->'attachments') AS att
			WHERE att->>'id' = ANY(ARRAY[${sql.join(currentAttachmentIds.map((id) => sql.raw(`'${id}'`)))}])
			AND att->'messageIds' <@ ${JSON.stringify(currentAttachmentMessageIds)}::jsonb
			AND jsonb_array_length(att->'messageIds') < ${currentAttachmentMessageIds.length}
		)
	`)

	if (results.rows.length === 0) return null

	const metadata = results.rows.flatMap(
		(result) => (result.metadata as AttachmentThreadMetadata).attachments,
	)

	return metadata
}

export async function updateThreadMetadata(
	messagesIds: string[],
	metadata: AttachmentThreadMetadata,
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

	const attachments: AttachmentThreadMetadata = {}

	let result: (typeof thread.$inferSelect)[] = []

	let previousThreadId: string | null = null
	let currentThread: Partial<typeof thread.$inferSelect>[] | null = null

	for (const [threadId, messageId] of threadsDataIds) {
		let relatedThreadAttachments = metadata.attachments.filter(
			(att: FileAttachment) => att.messageIds.includes(messageId),
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
			? (currentThread[0]?.metadata as AttachmentThreadMetadata)?.attachments ||
				[]
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
	}

	result = uniqBy(result, 'threadId')

	return {
		success: true,
		message: 'Thread metadata updated successfully',
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

export async function getThreadBySlug(slug: string) {
	const results = await db
		.select({
			threadId: thread.threadId,
			slug: thread.slug,
			metadata: thread.metadata,
		})
		.from(thread)
		.where(eq(thread.slug, slug))
		.limit(1)
	return results[0] || null
}

export interface WorkspaceDocumentVersion {
	version: number
	content: string
	checksum: string
	size: number
	url: string
	updatedAt: string
}
export interface WorkspaceDocumentMetadata {
	id: string
	organization: string
	department: string
	project: string
	name: string
	type: 'text' | 'image' | 'spreadsheet'
	currentVersion: number
	versions: WorkspaceDocumentVersion[]
}

export interface ThreadMetadataFull {
	attachments?: FileAttachment[]
	documents?: WorkspaceDocumentMetadata[]
}

export async function uploadWorkspaceDocumentToBucket({
	threadSlug,
	organization,
	department,
	project,
	name,
	content,
	type = 'text',
}: {
	threadSlug: string
	organization: string
	department: string
	project: string
	name: string
	content: string
	type?: 'text' | 'image' | 'spreadsheet'
}) {
	if (!content) throw new Error('Document content required')
	const existingThread = await getThreadBySlug(threadSlug)
	if (!existingThread) throw new Error('Thread not found for slug')
	const existingDocs: WorkspaceDocumentMetadata[] =
		(existingThread.metadata as ThreadMetadataFull | null)?.documents || []
	const existing = existingDocs.find(
		(d) => d.project === project && d.name === name && d.type === type,
	)
	const version = existing ? existing.currentVersion + 1 : 1
	const id = existing?.id || nanoid()
	const buffer = Buffer.from(content, 'utf8')
	const size = buffer.byteLength
	// simple checksum
	let hash = 0
	for (let i = 0; i < content.length; i++) {
		hash = (hash << 5) - hash + content.charCodeAt(i)
		hash |= 0
	}
	const checksum = hash.toString()
	const {
		storageBucketName,
		storageClientEmail,
		storageSecretAccessKey,
		storageProjectId,
	} = appConfig.features
	const storage = new Storage({
		projectId: storageProjectId,
		credentials: {
			client_email: storageClientEmail,
			private_key: storageSecretAccessKey,
		},
	})
	const bucket = storage.bucket(storageBucketName)
	// Normalize name for storage path: replace spaces and illegal characters
	const safeName = name
		.trim()
		.replace(/\s+/g, '_')
		.replace(/[^a-zA-Z0-9-_]/g, '_')
	const key = `documents/${threadSlug}/${project}/${safeName}/v${version}.md`
	const fileUpload = bucket.file(key)
	await fileUpload.save(buffer, {
		metadata: {
			contentType: 'text/markdown',
			metadata: {
				id,
				project,
				docName: name,
				version: String(version),
				type,
			},
		},
		resumable: false,
	})
	const expires = Date.now() + 1000 * 60 * 60 * 24 * 7
	const [signedUrl] = await fileUpload.getSignedUrl({
		version: 'v4',
		action: 'read',
		expires,
	})
	const newVersion: WorkspaceDocumentVersion = {
		version,
		content: key,
		checksum,
		size,
		url: signedUrl,
		updatedAt: new Date().toISOString(),
	}
	let updatedDocs: WorkspaceDocumentMetadata[]
	if (existing) {
		updatedDocs = existingDocs.map((d) =>
			d.id === existing.id
				? {
						...d,
						currentVersion: version,
						versions: [...d.versions, newVersion],
					}
				: d,
		)
	} else {
		updatedDocs = [
			...existingDocs,
			{
				id,
				organization,
				department,
				project,
				name,
				type,
				currentVersion: version,
				versions: [newVersion],
			},
		]
	}
	await db
		.update(thread)
		.set({
			metadata: {
				...((existingThread.metadata as ThreadMetadataFull) || {}),
				documents: updatedDocs,
				attachments:
					(existingThread.metadata as ThreadMetadataFull)?.attachments || [],
			},
		})
		.where(eq(thread.threadId, existingThread.threadId))
		.returning()
	return {
		document: updatedDocs.find((d) => d.id === id),
		documents: updatedDocs,
	}
}

export async function updateThreadDocumentsMetadata({
	threadSlug,
	documents,
}: {
	threadSlug: string
	documents: WorkspaceDocumentMetadata[]
}) {
	const existingThread = await getThreadBySlug(threadSlug)
	if (!existingThread) throw new Error('Thread not found for slug')
	await db
		.update(thread)
		.set({
			metadata: {
				...((existingThread.metadata as ThreadMetadataFull) || {}),
				documents,
				attachments:
					(existingThread.metadata as ThreadMetadataFull)?.attachments || [],
			},
		})
		.where(eq(thread.threadId, existingThread.threadId))
		.returning()
	return { success: true }
}

// Fetch documents metadata across all user threads to support global document backfill/sync
export async function getAllUserThreadDocumentsMetadata() {
	const results = await db
		.select({
			metadata: thread.metadata,
		})
		.from(thread)
		.where(isNotNull(thread.metadata))

	if (results.length === 0) return null

	const documents = results.flatMap((result) => {
		const meta = result.metadata as ThreadMetadataFull | null
		return meta?.documents || []
	})

	return documents
}
