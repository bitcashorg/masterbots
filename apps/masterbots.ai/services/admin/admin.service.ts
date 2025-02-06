import { db, users, type UserRole } from 'mb-drizzle'
import { eq, and, isNull } from 'drizzle-orm'
import { getServerSession } from 'next-auth'
import type { AdminUserUpdate } from '@/types/types'

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
  const user = await db.query.users.findFirst({
    where: eq(users.userId, userId)
  })

  if (!user) {
    throw new Error(`User not found with ID: ${userId}`)
  }

  return user
}

async function updateUser(userId: string, data: AdminUserUpdate) {
  await verifyAdmin()
  await verifyUserExists(userId)

  return await db
    .update(users)
    .set(data)
    .where(eq(users.userId, userId))
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
  subscriptionId: string | null
) {
  return updateUser(userId, {
    proUserSubscriptionId: subscriptionId || '',
    getFreeMonth: false
  })
}

export async function setFreeMonth(userId: string) {
  await verifyAdmin()
  const user = await verifyUserExists(userId)

  if (user.proUserSubscriptionId) {
    throw new Error('Cannot grant free month to user with active subscription')
  }

  return await db
    .update(users)
    .set({ getFreeMonth: true })
    .where(and(eq(users.userId, userId), isNull(users.proUserSubscriptionId)))
    .returning()
}

export async function updateLastLogin(userId: string) {
  await verifyUserExists(userId)

  return await db
    .update(users)
    .set({ lastLogin: new Date() })
    .where(eq(users.userId, userId))
    .returning()
}

export async function getBlockedUsers() {
  await verifyAdmin()
  return db.query.users.findMany({
    where: eq(users.isBlocked, true)
  })
}

export async function getUsersByRole(
  role: (typeof UserRole)[keyof typeof UserRole]
) {
  await verifyAdmin()
  return db.query.users.findMany({
    where: eq(users.role, role)
  })
}
