'use server'

import { eq } from 'drizzle-orm'
import { db, message, thread } from 'mb-drizzle'

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

export async function getUserThreadsMetadata(messageId: string) {
	const results = await db
		.select({
			threadId: thread.threadId,
			metadata: thread.metadata,
		})
		.from(thread)
		.innerJoin(message, eq(thread.threadId, message.threadId))
		.where(eq(message.messageId, messageId))

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
