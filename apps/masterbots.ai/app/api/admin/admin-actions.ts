import * as adminService from '@/services/admin/admin.service'
import { z } from 'zod'

type ActionHandler<T> = (data: T) => Promise<unknown>

interface AdminAction<T> {
	schema: z.ZodType<T>
	handler: ActionHandler<T>
}

export const adminActions = {
	blockUser: {
		schema: z.object({
			userId: z.string().uuid(),
		}),
		handler: ({ userId }: { userId: string }) => adminService.blockUser(userId),
	},

	unblockUser: {
		schema: z.object({
			userId: z.string().uuid(),
		}),
		handler: ({ userId }: { userId: string }) =>
			adminService.unblockUser(userId),
	},

	updateSubscription: {
		schema: z.object({
			userId: z.string().uuid(),
			subscriptionId: z.string().nullable(),
		}),
		handler: ({
			userId,
			subscriptionId,
		}: {
			userId: string
			subscriptionId: string | null
		}) => adminService.updateSubscription(userId, subscriptionId),
	},

	setFreeMonth: {
		schema: z.object({
			userId: z.string().uuid(),
		}),
		handler: ({ userId }: { userId: string }) =>
			adminService.setFreeMonth(userId),
	},
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
} satisfies Record<string, AdminAction<any>>

export type AdminActionType = keyof typeof adminActions
