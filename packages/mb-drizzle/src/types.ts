import type { users } from './schema/auth'

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
