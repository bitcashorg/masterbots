'use server'

import type { FileAttachment } from '@/lib/hooks/use-chat-attachments'
import { Storage } from '@google-cloud/storage'
import { eq, inArray } from 'drizzle-orm'
import { db, message, thread } from 'mb-drizzle'
import { appConfig } from 'mb-env'

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

export async function updateThreadMetadata(
	threadId: string,
	metadata: Record<string, unknown>,
) {
	const result = await db
		.update(thread)
		.set({ metadata })
		.where(eq(thread.threadId, threadId))
		.returning()

	return result[0]
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
		public: true,
	})

	const [signedUrl] = await fileUpload.getSignedUrl({
		version: 'v4',
		action: 'read',
		expires: '01-01-2500', // Set a far future expiration date
	})

	return {
		id,
		name,
		contentType,
		url: signedUrl,
		size: byteSize,
		content: bucketKey, // Store the bucket key instead of the content
	}
}
