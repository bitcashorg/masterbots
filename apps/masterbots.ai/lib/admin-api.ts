import type { adminActions, AdminActionType } from '@/app/api/admin/admin-actions'
import type { z } from 'zod'

type ActionConfig = typeof adminActions
type ActionInput<T extends AdminActionType> = z.infer<ActionConfig[T]['schema']>
type ActionOutput<T extends AdminActionType> = Awaited<
  ReturnType<ActionConfig[T]['handler']>
>

export const adminApi = {
  async executeAction<T extends AdminActionType>(
    action: T,
    payload: ActionInput<T>
  ): Promise<ActionOutput<T>> {
    const response = await fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, payload })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'An error occurred')
    }

    const { data } = await response.json()
    return data
  },

  blockUser: (userId: string) =>
    adminApi.executeAction('blockUser', { userId }),

  unblockUser: (userId: string) =>
    adminApi.executeAction('unblockUser', { userId }),

  updateSubscription: (userId: string, subscriptionId: string | null) =>
    adminApi.executeAction('updateSubscription', { userId, subscriptionId }),

  setFreeMonth: (userId: string) =>
    adminApi.executeAction('setFreeMonth', { userId })
}
