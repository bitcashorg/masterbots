import { and, eq, isNull } from 'drizzle-orm'
import type { PgInsertValue, PgTableWithColumns } from 'drizzle-orm/pg-core'
import { db, preference, user, userRole } from 'mb-drizzle'
import { getServerSession } from 'next-auth'

const ADMIN_DOMAINS = ['masterbots.ai', 'mbots.ai', 'bitcash.org'] as const

async function verifyAdmin() {
	const session = await getServerSession()
	const email = session?.user?.email

	if (!email) {
		throw new Error('Unauthorized: No user session found')
	}

	const domain = email.split('@')[1]
	if (!ADMIN_DOMAINS.includes(domain as (typeof ADMIN_DOMAINS)[number])) {
		throw new Error('Unauthorized: Admin access required')
	}
}

async function verifyUserExists(userId: string) {
	const userData = await db.query.user.findFirst({
		where: eq(user.userId, userId),
	})

	if (!userData) {
		throw new Error(`User not found with ID: ${userId}`)
	}

	return userData
}

async function updateUser(
	userId: string,
	data: Partial<typeof user.$inferSelect>,
) {
	await verifyAdmin()
	await verifyUserExists(userId)

	return await db
		.update(user)
		.set(data)
		.where(eq(user.userId, userId))
		.returning()
}

export async function blockUser(userId: string) {
	return updateUser(userId, { isBlocked: true })
}

export async function unblockUser(userId: string) {
	return updateUser(userId, { isBlocked: false })
}

export async function updateSubscription(
	userId: string,
	subscriptionId: string | null,
) {
	return updateUser(userId, {
		proUserSubscriptionId: subscriptionId || '',
		getFreeMonth: false,
	})
}

export async function setFreeMonth(userId: string) {
	await verifyAdmin()
	const userData = await verifyUserExists(userId)

	if (userData.proUserSubscriptionId) {
		throw new Error('Cannot grant free month to user with active subscription')
	}

	return await db
		.update(user)
		.set({ getFreeMonth: true })
		.where(and(eq(user.userId, userId), isNull(user.proUserSubscriptionId)))
		.returning()
}

export async function updateLastLogin(userId: string) {
	await verifyUserExists(userId)

	return await db
		.update(user)
		.set({ lastLogin: new Date().toISOString() })
		.where(eq(user.userId, userId))
		.returning()
}

export async function getBlockedUsers() {
	await verifyAdmin()
	return db.query.user.findMany({
		where: eq(user.isBlocked, true),
	})
}

export async function getUsersByRole(
	role: 'admin' | 'user' | 'moderator' | 'anonymous',
) {
	await verifyAdmin()
	return db.query.user.findMany({
		where: eq(user.role, role),
	})
}

export async function insertAdminUserPreferences({
	userId,
	preferencesSet,
}: {
	userId: string
	preferencesSet: PgInsertValue<typeof preference>
}) {
	await verifyUserExists(userId)
	return await db
		.insert(preference)
		.values({ ...preferencesSet })
		.returning()
}
