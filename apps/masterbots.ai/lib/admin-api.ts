import {
  type AdminResponse,
  BlockUserRequest,
  UpdateSubscriptionRequest
} from '@/app/api/admin/types'

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'An error occurred')
  }
  return response.json()
}

export const adminApi = {
  async blockUser(userId: string) {
    const response = await fetch('/api/admin/block-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    })
    return handleResponse<AdminResponse<any>>(response)
  },

  async unblockUser(userId: string) {
    const response = await fetch('/api/admin/unblock-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    })
    return handleResponse<AdminResponse<any>>(response)
  },

  async updateSubscription(userId: string, subscriptionId: string | null) {
    const response = await fetch('/api/admin/update-subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, subscriptionId })
    })
    return handleResponse<AdminResponse<any>>(response)
  },

  async setFreeMonth(userId: string) {
    const response = await fetch('/api/admin/set-free-month', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    })
    return handleResponse<AdminResponse<any>>(response)
  }
}
