import { parseWordwareResponse } from '@/components/shared/wordware-chat'
import {
  Card,
  initialStateSubscription,
  PlanList,
  Subscription
} from '@/types/types'

export async function checkIfCustomerHasActiveSub(email: string) {
  const response = await fetch('/api/payment/subscription', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  })

  const data: {
    error?: string
    active: boolean
  } = await response.json()

  if (data.error) {
    console.error('Error while checking customer data: ', data.error)
    return true
  }

  return Boolean(!data.active)
}

export async function getSubscriptionPlans({
  handleSetStripePublishKey,
  handleSetStripeSecret
}: {
  handleSetStripePublishKey: (key: string) => void
  handleSetStripeSecret: (key: string) => void
}) {
  let plans: PlanList[] = []

  try {
    const response = await fetch('/api/payment/plans', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: {
      plans: PlanList[]
      stripeSecret: string
      stripe_publishable: string
      error?: string
    } = await response.json()
    // remove the free plan from the list
    handleSetStripePublishKey(data.stripe_publishable)
    handleSetStripeSecret(data.stripeSecret)

    data.plans = data.plans.filter((plan: any) => plan.unit_amount !== 0)
    // show the plans in ascending order
    data.plans.sort((a: any, b: any) => b.unit_amount - a.unit_amount)

    plans = data.plans as PlanList[]
  } catch (error) {
    console.error('Error fetching plans:', error)
  }

  return plans
}

export const fetchPayment = async (intentid: string) => {
  let subscription: Subscription = initialStateSubscription
  let card: Card = { last4: '' }

  try {
    const response = await fetch(
      `/api/payment/subscription?paymentIntentId=${intentid}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data: {
      subscription: Subscription
      card: { card: Card }
    } = await response.json()

    subscription = data.subscription
    card = data.card.card
  } catch (error) {
    console.error('Error fetching plans:', error)
  }
  return { subscription, card }
}

export async function getPromptDetails(promptId: string) {
  let data = null
  let error = null
  let inputs = {}

  try {
    if (!promptId) {
      throw new Error('Prompt ID is required')
    }

    const response = await fetch(
      `/api/wordware/describe?promptId=${promptId}`
    )
    data = await response.json()
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch prompt details')
    }
    inputs = data.inputs.reduce(
      (acc: any, input: { label: any }) => ({
        ...acc,
        [input.label]: ''
      }),
      {}
    )
  } catch (error) {
    console.error('Error fetching prompt details:', error)
    error = (error as Error).message
  } finally {
    return { data, error, inputs }
  }
}

export async function runWordWarePrompt({ promptId, inputs }: { promptId: string, inputs: Record<string, any> }) {
  let fullResponse = ''
  let error = null

  try {
    const response = await fetch('/api/wordware/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ promptId, inputs })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const reader = response.body?.getReader()
    if (!reader) {
      throw new Error('No reader available')
    }

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      const chunk = new TextDecoder().decode(value)
      fullResponse += chunk
    }

    const parsed = parseWordwareResponse(fullResponse)
    return { fullResponse, parsed, error }
  } catch (err) {
    console.error('Error running prompt:', err)
    error = (err as Error).message
    return { fullResponse, parsed: null, error }
  }
}
