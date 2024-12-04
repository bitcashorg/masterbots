// apps/masterbots.ai/services/admin/admin.service.ts
import { db, users } from 'mb-drizzle';
import { eq, and, isNull } from 'drizzle-orm';
import { getServerSession } from 'next-auth';

// Private helper function
async function verifyAdmin() {
  const session = await getServerSession();
  if (!session?.user?.email?.endsWith('@masterbots.ai')) {
    throw new Error('Unauthorized: Admin access required');
  }
}

export async function blockUser(userId: string) {
  await verifyAdmin();
  
  return await db
    .update(users)
    .set({ isBlocked: true })
    .where(eq(users.userId, userId))
    .returning();
}

export async function unblockUser(userId: string) {
  await verifyAdmin();
  
  return await db
    .update(users)
    .set({ isBlocked: false })
    .where(eq(users.userId, userId))
    .returning();
}

export async function updateSubscription(userId: string, subscriptionId: string | null) {
  await verifyAdmin();
  
  return await db
    .update(users)
    .set({ 
      proUserSubscriptionId: subscriptionId,
      getFreeMonth: false 
    })
    .where(eq(users.userId, userId))
    .returning();
}

export async function setFreeMonth(userId: string) {
  await verifyAdmin();
  
  const user = await db.query.users.findFirst({
    where: eq(users.userId, userId)
  });

  if (user?.proUserSubscriptionId) {
    throw new Error('Cannot grant free month to user with active subscription');
  }
  
  return await db
    .update(users)
    .set({ getFreeMonth: true })
    .where(
      and(
        eq(users.userId, userId),
        isNull(users.proUserSubscriptionId)
      )
    )
    .returning();
}