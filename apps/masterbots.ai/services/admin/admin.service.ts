import { db, users, type UserRole } from 'mb-drizzle'
import { eq } from 'drizzle-orm'
import { getServerSession } from 'next-auth'
import type { AdminUserUpdate } from '@/types/types'

export async function verifyAdmin() {
  const session = await getServerSession()
  if (!session?.user?.email?.endsWith('@masterbots.ai')) {
    throw new Error('Unauthorized: Admin access required')
  }
}

export async function updateUser(userId: string, data: AdminUserUpdate) {
  await verifyAdmin()

  return await db
    .update(users)
    .set({
      ...data,
      lastLogin: new Date()
    })
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
  const user = await db.query.users.findFirst({
    where: eq(users.userId, userId)
  })

  if (user?.proUserSubscriptionId) {
    throw new Error('Cannot grant free month to user with active subscription')
  }

  return updateUser(userId, { getFreeMonth: true })
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
